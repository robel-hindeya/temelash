import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DomainError } from '../../../common/errors/domain-error';
import type { Env } from '../../../config/env.schema';
import { type TelegramIdentity, verifyInitData } from '../domain/init-data';
import { TelegramContactsRepository } from '../infrastructure/telegram-contacts.repository';

/** How long a shared contact counts as fresh proof of the phone number when joining. */
const CONTACT_MAX_AGE_MS = 30 * 60_000;

@Injectable()
export class TelegramIdentityService {
  constructor(
    private readonly config: ConfigService<Env, true>,
    private readonly contacts: TelegramContactsRepository,
  ) {}

  isEnabled(): boolean {
    return Boolean(this.config.get('TELEGRAM_BOT_TOKEN', { infer: true }));
  }

  /** The Telegram user behind a Mini App request, or a 401 when the data is not from Telegram. */
  verify(initData: string): TelegramIdentity {
    const token = this.config.get('TELEGRAM_BOT_TOKEN', { infer: true });
    if (!token) {
      throw new DomainError('TELEGRAM_NOT_CONFIGURED', 'Telegram sign-in is not available.', 404);
    }
    const res = verifyInitData(
      initData,
      token,
      this.config.get('TELEGRAM_INIT_DATA_MAX_AGE_SECONDS', { infer: true }),
    );
    if (!res.ok) {
      throw new DomainError(
        'TELEGRAM_AUTH_FAILED',
        res.reason === 'EXPIRED'
          ? 'Your Telegram session expired. Close and reopen the card from Telegram.'
          : 'Could not confirm your Telegram account. Reopen the card from Telegram.',
        401,
      );
    }
    return res.identity;
  }

  /** The phone this Telegram user shared with the bot recently, if any. */
  async verifiedPhone(telegramUserId: string, now = new Date()): Promise<string | null> {
    const contact = await this.contacts.find(telegramUserId);
    if (!contact || now.getTime() - contact.verifiedAt.getTime() > CONTACT_MAX_AGE_MS) return null;
    return contact.phoneE164;
  }
}
