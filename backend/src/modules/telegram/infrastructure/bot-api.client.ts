import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../../../config/env.schema';

/**
 * Outcome of a send. `retry` is true for failures worth trying again later (rate limit, Telegram or
 * network trouble) and false when the message can never arrive (bot blocked, chat unknown, bad request).
 */
export type SendResult = { ok: true } | { ok: false; retry: boolean };

/** Minimal Telegram Bot API client. It never throws: callers decide what a failed send means. */
@Injectable()
export class BotApiClient {
  private readonly logger = new Logger(BotApiClient.name);

  constructor(private readonly config: ConfigService<Env, true>) {}

  isConfigured(): boolean {
    return Boolean(this.config.get('TELEGRAM_BOT_TOKEN', { infer: true }));
  }

  async sendMessage(
    chatId: number | string,
    text: string,
    replyMarkup?: unknown,
  ): Promise<SendResult> {
    const token = this.config.get('TELEGRAM_BOT_TOKEN', { infer: true });
    if (!token) return { ok: false, retry: false };
    const base = this.config.get('TELEGRAM_API_BASE', { infer: true });
    try {
      const res = await fetch(`${base}/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, reply_markup: replyMarkup }),
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) return { ok: true };
      this.logger.warn(`sendMessage failed with HTTP ${res.status}`);
      return { ok: false, retry: res.status === 429 || res.status >= 500 };
    } catch (err) {
      this.logger.warn(`sendMessage failed: ${(err as Error).message}`);
      return { ok: false, retry: true };
    }
  }

  /** "Open my card" button that opens the Mini App on this shop's card, when the Mini App URL is set. */
  openCardButton(joinReference: string): unknown {
    const url = this.config.get('TELEGRAM_MINI_APP_URL', { infer: true });
    if (!url) return undefined;
    const sep = url.includes('?') ? '&' : '?';
    return {
      inline_keyboard: [
        [
          {
            text: 'Open my card',
            web_app: { url: `${url}${sep}m=${encodeURIComponent(joinReference)}` },
          },
        ],
      ],
    };
  }
}
