import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClaimedJob,
  JobScheduler,
  OutboxHandlerRegistry,
  OutboxJobType,
  OutboxService,
  PermanentJobError,
} from '../../jobs';
import { BotApiClient } from '../../telegram';
import { rewardExpiringText, rewardUnlockedText, stampText } from '../domain/messages';
import { NotificationsRepository } from '../infrastructure/notifications.repository';
import { CustomerMessenger } from './customer-messenger';

/** Remind this long before a reward expires. */
const EXPIRY_WINDOW_MS = 3 * 86_400_000;
const EXPIRY_SCAN_INTERVAL_MS = 60 * 60_000;
const EXPIRY_BATCH = 200;

interface CardEventPayload {
  event?: 'stamp' | 'reward_unlocked';
  stampId?: string;
  unlockId?: string | null;
  effectiveStamps?: number;
  stampsRequired?: number;
}

/**
 * Telegram messages about a customer's own card: a stamp was added, a reward unlocked, a reward is
 * about to expire. Customers without a linked Telegram account are skipped.
 */
@Injectable()
export class CardNotifications implements OnModuleInit {
  constructor(
    private readonly registry: OutboxHandlerRegistry,
    private readonly scheduler: JobScheduler,
    private readonly outbox: OutboxService,
    private readonly repository: NotificationsRepository,
    private readonly messenger: CustomerMessenger,
    private readonly bot: BotApiClient,
  ) {}

  onModuleInit(): void {
    this.registry.register(OutboxJobType.CARD_NOTIFY, {
      handle: (job) => this.handleCardEvent(job),
    });
    this.registry.register(OutboxJobType.REWARD_EXPIRY_SCAN, {
      handle: async () => {
        await this.sendExpiryReminders();
      },
    });
    this.scheduler.register('notifications.reward-expiry', EXPIRY_SCAN_INTERVAL_MS, async () => {
      await this.enqueueExpiryScan();
    });
  }

  async handleCardEvent(job: ClaimedJob, now = new Date()): Promise<void> {
    if (!job.merchantId) throw new PermanentJobError('Card event has no merchant');
    if (!this.bot.isConfigured()) return;
    const p = (job.payload ?? {}) as CardEventPayload;
    const to = await this.repository.cardRecipient(job.merchantId, job.aggregateId);
    if (!to) return;

    if (p.event === 'reward_unlocked' && p.unlockId) {
      await this.messenger.send(
        {
          key: `unlock:${p.unlockId}`,
          kind: 'reward_unlocked',
          merchantId: job.merchantId,
          customerId: to.customerId,
          telegramUserId: to.telegramUserId,
          joinReference: to.joinReference,
          text: rewardUnlockedText({
            merchantName: to.merchantName,
            rewardName: to.rewardName,
            expiresAt: await this.repository.rewardExpiry(job.merchantId, p.unlockId),
          }),
        },
        now,
      );
      return;
    }
    if (p.stampId && p.effectiveStamps && p.stampsRequired) {
      await this.messenger.send(
        {
          key: `stamp:${p.stampId}`,
          kind: 'stamp',
          merchantId: job.merchantId,
          customerId: to.customerId,
          telegramUserId: to.telegramUserId,
          joinReference: to.joinReference,
          text: stampText({
            merchantName: to.merchantName,
            effectiveStamps: p.effectiveStamps,
            stampsRequired: p.stampsRequired,
            rewardName: to.rewardName,
          }),
        },
        now,
      );
    }
  }

  /** One scan job per interval, however many instances run the scheduler. */
  async enqueueExpiryScan(now = new Date()): Promise<boolean> {
    if (!this.bot.isConfigured()) return false;
    const bucket = Math.floor(now.getTime() / EXPIRY_SCAN_INTERVAL_MS);
    return this.outbox.enqueueUnique(
      {
        type: OutboxJobType.REWARD_EXPIRY_SCAN,
        aggregateType: 'platform',
        aggregateId: 'reward-expiry',
      },
      `reward-expiry:${bucket}`,
    );
  }

  /** Public so tests can run it on demand. Returns how many reminders went out. */
  async sendExpiryReminders(now = new Date()): Promise<number> {
    if (!this.bot.isConfigured()) return 0;
    const due = await this.repository.expiringRewards(
      now,
      new Date(now.getTime() + EXPIRY_WINDOW_MS),
      EXPIRY_BATCH,
    );
    let sent = 0;
    for (const r of due) {
      const to = await this.repository.cardRecipient(r.merchantId, r.membershipId);
      if (!to) continue;
      const ok = await this.messenger.send(
        {
          key: `expiry:${r.unlockId}`,
          kind: 'reward_expiring',
          merchantId: r.merchantId,
          customerId: to.customerId,
          telegramUserId: to.telegramUserId,
          joinReference: to.joinReference,
          text: rewardExpiringText({
            merchantName: to.merchantName,
            rewardName: to.rewardName,
            expiresAt: new Date(r.expiresAt),
            now,
          }),
        },
        now,
      );
      if (ok) sent++;
    }
    return sent;
  }
}
