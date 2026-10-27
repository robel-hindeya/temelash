import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { normalizeEthiopianPhone } from '../../../common/phone/ethiopian-phone';
import type { Env } from '../../../config/env.schema';
import { BotApiClient } from '../infrastructure/bot-api.client';
import { TelegramContactsRepository } from '../infrastructure/telegram-contacts.repository';
import { TelegramCommandRegistry } from './telegram-command.registry';

/** The parts of a Telegram update this bot reads. */
export interface TelegramUpdate {
  message?: {
    chat?: { id?: number };
    from?: { id?: number; is_bot?: boolean };
    text?: string;
    contact?: { phone_number?: string; user_id?: number };
  };
}

@Injectable()
export class TelegramWebhookService {
  constructor(
    private readonly config: ConfigService<Env, true>,
    private readonly contacts: TelegramContactsRepository,
    private readonly bot: BotApiClient,
    private readonly commands: TelegramCommandRegistry,
  ) {}

  async handle(update: TelegramUpdate, now = new Date()): Promise<void> {
    const msg = update.message;
    const chatId = msg?.chat?.id;
    const fromId = msg?.from?.id;
    if (!msg || !chatId || !fromId || msg.from?.is_bot) return;

    if (msg.contact) {
      // Only the sender's own contact proves their number: Telegram fills user_id for that case, and a
      // forwarded or typed contact of someone else carries a different (or no) user_id.
      const phone = msg.contact.phone_number
        ? normalizeEthiopianPhone(msg.contact.phone_number)
        : null;
      if (msg.contact.user_id !== fromId) {
        await this.bot.sendMessage(
          chatId,
          'Please share your own number with the button in the card.',
        );
        return;
      }
      if (!phone) {
        await this.bot.sendMessage(chatId, 'Temelash cards need an Ethiopian phone number (+251).');
        return;
      }
      await this.contacts.save(String(fromId), phone, now);
      await this.bot.sendMessage(
        chatId,
        'Thanks, your number is confirmed. Go back to your card to continue.',
      );
      return;
    }

    // Commands other modules registered (e.g. /stop for offers).
    const command = msg.text?.trim().split(/[\s@]/)[0]?.toLowerCase();
    const handler = command ? this.commands.get(command) : undefined;
    if (handler) {
      const reply = await handler(String(fromId));
      if (reply) await this.bot.sendMessage(chatId, reply);
      return;
    }

    if (msg.text?.startsWith('/start')) {
      const url = this.config.get('TELEGRAM_MINI_APP_URL', { infer: true });
      await this.bot.sendMessage(
        chatId,
        'Welcome to Temelash Card. Scan a shop QR code, or open your cards here.',
        url ? { inline_keyboard: [[{ text: 'Open my cards', web_app: { url } }]] } : undefined,
      );
    }
  }
}
