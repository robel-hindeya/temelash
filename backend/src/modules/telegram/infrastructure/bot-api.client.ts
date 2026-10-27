import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../../../config/env.schema';

/** Minimal Telegram Bot API client. Sending is best effort: a failed message never fails a request. */
@Injectable()
export class BotApiClient {
  private readonly logger = new Logger(BotApiClient.name);

  constructor(private readonly config: ConfigService<Env, true>) {}

  async sendMessage(
    chatId: number | string,
    text: string,
    replyMarkup?: unknown,
  ): Promise<boolean> {
    const token = this.config.get('TELEGRAM_BOT_TOKEN', { infer: true });
    if (!token) return false;
    const base = this.config.get('TELEGRAM_API_BASE', { infer: true });
    try {
      const res = await fetch(`${base}/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, reply_markup: replyMarkup }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) this.logger.warn(`sendMessage failed with HTTP ${res.status}`);
      return res.ok;
    } catch (err) {
      this.logger.warn(`sendMessage failed: ${(err as Error).message}`);
      return false;
    }
  }
}
