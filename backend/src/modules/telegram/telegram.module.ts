import { Module } from '@nestjs/common';
import { TelegramWebhookController } from './api/telegram-webhook.controller';
import { TelegramCommandRegistry } from './application/telegram-command.registry';
import { TelegramIdentityService } from './application/telegram-identity.service';
import { TelegramWebhookService } from './application/telegram-webhook.service';
import { BotApiClient } from './infrastructure/bot-api.client';
import { TelegramContactsRepository } from './infrastructure/telegram-contacts.repository';

@Module({
  controllers: [TelegramWebhookController],
  providers: [
    TelegramCommandRegistry,
    TelegramIdentityService,
    TelegramWebhookService,
    BotApiClient,
    TelegramContactsRepository,
  ],
  exports: [TelegramIdentityService, BotApiClient, TelegramCommandRegistry],
})
export class TelegramModule {}
