import { Injectable } from '@nestjs/common';
import { PermanentJobError } from '../../jobs';
import { BotApiClient } from '../../telegram';
import { NotificationsRepository } from '../infrastructure/notifications.repository';

export interface CustomerMessage {
  /** Unique per message, e.g. "stamp:<stampId>". The same key is never sent twice. */
  key: string;
  kind: 'stamp' | 'reward_unlocked' | 'reward_expiring' | 'promotion';
  merchantId: string;
  customerId: string;
  telegramUserId: string;
  text: string;
  joinReference: string | null;
  promotionId?: string;
}

/**
 * Sends one Telegram message at most once. The delivery key is reserved first; a temporary failure
 * releases it and throws so the outbox retries later, a permanent one (bot blocked) keeps it.
 */
@Injectable()
export class CustomerMessenger {
  constructor(
    private readonly repository: NotificationsRepository,
    private readonly bot: BotApiClient,
  ) {}

  /** Returns whether the message was delivered now. */
  async send(msg: CustomerMessage, now = new Date()): Promise<boolean> {
    const claimed = await this.repository.claimDelivery({
      key: msg.key,
      kind: msg.kind,
      merchantId: msg.merchantId,
      customerId: msg.customerId,
      promotionId: msg.promotionId,
    });
    if (!claimed) return false;
    const res = await this.bot.sendMessage(
      msg.telegramUserId,
      msg.text,
      msg.joinReference ? this.bot.openCardButton(msg.joinReference) : undefined,
    );
    if (res.ok) {
      await this.repository.markSent(msg.key, now);
      return true;
    }
    if (res.retry) {
      await this.repository.releaseDelivery(msg.key);
      throw new Error('Telegram send failed; will retry');
    }
    return false;
  }

  /** For jobs that make sense only with Telegram configured. */
  requireTelegram(): void {
    if (!this.bot.isConfigured()) throw new PermanentJobError('Telegram is not configured');
  }
}
