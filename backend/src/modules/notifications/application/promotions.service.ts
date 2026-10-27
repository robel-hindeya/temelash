import { Injectable, OnModuleInit } from '@nestjs/common';
import type { RequestMeta } from '../../../common/decorators/request-context.decorator';
import { DomainError } from '../../../common/errors/domain-error';
import { TransactionManager } from '../../../database/transaction-manager';
import { AuditService } from '../../audit';
import { ConsentService } from '../../customers';
import {
  ClaimedJob,
  OutboxHandlerRegistry,
  OutboxJobType,
  OutboxService,
  PermanentJobError,
} from '../../jobs';
import type { MerchantActor } from '../../tenancy';
import { BotApiClient, TelegramCommandRegistry } from '../../telegram';
import { promotionText } from '../domain/messages';
import {
  NotificationsRepository,
  type PromotionSummary,
} from '../infrastructure/notifications.repository';
import { CustomerMessenger } from './customer-messenger';

/** At most one promotion per merchant in this window, so customers are not spammed. */
export const PROMOTION_MIN_INTERVAL_MS = 24 * 3_600_000;
const BATCH = 200;
/** Telegram allows about 30 messages a second; stay well under it. */
const PAUSE_MS = 50;

export interface PromotionsOverview {
  /** Customers who would receive a promotion now (Telegram linked + opted in to offers). */
  reach: number;
  /** When the next promotion may be sent; null = now. */
  nextAllowedAt: string | null;
  telegramEnabled: boolean;
  recent: PromotionSummary[];
}

/**
 * Merchant promotions over Telegram, sent only to customers who opted in to offers. Every message ends
 * with how to opt out, and /stop in the bot withdraws marketing consent at every shop.
 */
@Injectable()
export class PromotionsService implements OnModuleInit {
  constructor(
    private readonly repository: NotificationsRepository,
    private readonly messenger: CustomerMessenger,
    private readonly outbox: OutboxService,
    private readonly registry: OutboxHandlerRegistry,
    private readonly commands: TelegramCommandRegistry,
    private readonly consent: ConsentService,
    private readonly audit: AuditService,
    private readonly transactions: TransactionManager,
    private readonly bot: BotApiClient,
  ) {}

  onModuleInit(): void {
    this.registry.register(OutboxJobType.PROMOTION_SEND, {
      handle: async (job) => {
        await this.deliver(job);
      },
    });
    this.commands.register('/stop', (telegramUserId) => this.stopOffers(telegramUserId));
  }

  async overview(actor: MerchantActor, now = new Date()): Promise<PromotionsOverview> {
    const [reach, last, recent] = await Promise.all([
      this.repository.promotionAudienceSize(actor.merchantId),
      this.repository.lastPromotionAt(actor.merchantId),
      this.repository.recentPromotions(actor.merchantId, 10),
    ]);
    const next = last ? new Date(last.getTime() + PROMOTION_MIN_INTERVAL_MS) : null;
    return {
      reach,
      nextAllowedAt: next && next > now ? next.toISOString() : null,
      telegramEnabled: this.bot.isConfigured(),
      recent,
    };
  }

  async send(
    actor: MerchantActor,
    message: string,
    meta: RequestMeta,
    now = new Date(),
  ): Promise<{ id: string; audienceSize: number }> {
    if (!this.bot.isConfigured()) {
      throw new DomainError(
        'TELEGRAM_NOT_CONFIGURED',
        'Telegram messages are not set up yet.',
        409,
      );
    }
    const last = await this.repository.lastPromotionAt(actor.merchantId);
    if (last && now.getTime() - last.getTime() < PROMOTION_MIN_INTERVAL_MS) {
      throw new DomainError(
        'PROMOTION_TOO_SOON',
        'You can send one promotion every 24 hours. Try again later.',
        429,
      );
    }
    const audienceSize = await this.repository.promotionAudienceSize(actor.merchantId);
    if (audienceSize === 0) {
      throw new DomainError(
        'NO_AUDIENCE',
        'No customers can receive offers yet: they need the Telegram card and to opt in to offers.',
        409,
      );
    }
    const promotion = await this.repository.createPromotion({
      merchantId: actor.merchantId,
      message: message.trim(),
      createdByUserId: actor.userId,
      audienceSize,
    });
    await this.outbox.enqueue({
      merchantId: actor.merchantId,
      type: OutboxJobType.PROMOTION_SEND,
      aggregateType: 'promotion',
      aggregateId: promotion.id,
    });
    await this.audit.record({
      action: 'promotion.sent',
      actorUserId: actor.userId,
      merchantId: actor.merchantId,
      targetType: 'promotion',
      targetId: promotion.id,
      requestId: meta.requestId,
      metadata: { audienceSize },
    });
    return { id: promotion.id, audienceSize };
  }

  /** Sends one batch; queues the next batch until everyone in the audience has it. */
  async deliver(job: ClaimedJob, now = new Date()): Promise<number> {
    if (!job.merchantId) throw new PermanentJobError('Promotion job has no merchant');
    this.messenger.requireTelegram();
    const promotion = await this.repository.findPromotion(job.merchantId, job.aggregateId);
    if (!promotion) throw new PermanentJobError('Promotion not found');
    const [merchantName, joinReference] = await Promise.all([
      this.repository.merchantName(job.merchantId),
      this.repository.merchantJoinReference(job.merchantId),
    ]);
    const batch = await this.repository.promotionAudience(job.merchantId, BATCH, promotion.id);
    let sent = 0;
    for (const to of batch) {
      if (
        await this.messenger.send(
          {
            key: `promo:${promotion.id}:${to.customerId}`,
            kind: 'promotion',
            merchantId: job.merchantId,
            customerId: to.customerId,
            telegramUserId: to.telegramUserId,
            joinReference,
            promotionId: promotion.id,
            text: promotionText({
              merchantName: merchantName ?? 'Your shop',
              message: promotion.message,
              firstName: to.firstName,
            }),
          },
          now,
        )
      ) {
        sent++;
      }
      await new Promise((r) => setTimeout(r, PAUSE_MS));
    }
    if (batch.length === BATCH) {
      await this.outbox.enqueue({
        merchantId: job.merchantId,
        type: OutboxJobType.PROMOTION_SEND,
        aggregateType: 'promotion',
        aggregateId: promotion.id,
      });
    }
    return sent;
  }

  /** /stop in the bot: withdraw marketing consent at every shop linked to this Telegram user. */
  async stopOffers(telegramUserId: string): Promise<string> {
    const customers = await this.repository.customersForTelegramUser(telegramUserId);
    for (const c of customers) {
      await this.transactions.run((db) =>
        this.consent.withdrawMarketing(
          {
            merchantId: c.merchantId,
            customerId: c.id,
            source: 'PRIVACY_REQUEST',
            actorUserId: null,
          },
          db,
        ),
      );
    }
    return 'Done: you will not get offers any more. Stamp and reward messages continue.';
  }
}
