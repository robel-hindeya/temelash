import { timingSafeEqual } from 'node:crypto';
import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from '../../../common/decorators/access.decorators';
import { DomainError } from '../../../common/errors/domain-error';
import type { Env } from '../../../config/env.schema';
import {
  TelegramWebhookService,
  type TelegramUpdate,
} from '../application/telegram-webhook.service';

const sameSecret = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/**
 * Telegram calls this for every bot update (register it with setWebhook and `secret_token`).
 * Only requests carrying the webhook secret are processed; everything else gets a bare 404.
 */
@ApiExcludeController()
@SkipThrottle()
@Controller('telegram')
export class TelegramWebhookController {
  constructor(
    private readonly webhook: TelegramWebhookService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  @Public()
  @Post('webhook')
  @HttpCode(200)
  async receive(
    @Headers('x-telegram-bot-api-secret-token') secret: string | undefined,
    @Body() update: TelegramUpdate,
  ): Promise<{ ok: true }> {
    const expected = this.config.get('TELEGRAM_WEBHOOK_SECRET', { infer: true });
    if (!expected || !secret || !sameSecret(secret, expected)) {
      throw new DomainError('NOT_FOUND', 'Not found.', 404);
    }
    await this.webhook.handle(update ?? {});
    return { ok: true };
  }
}
