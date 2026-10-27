// Public API of the telegram module. Other modules may import only from here.
export { TelegramModule } from './telegram.module';
export { TelegramIdentityService } from './application/telegram-identity.service';
export { BotApiClient, type SendResult } from './infrastructure/bot-api.client';
export { TelegramCommandRegistry } from './application/telegram-command.registry';
export type { TelegramIdentity } from './domain/init-data';
export { signInitData } from './domain/init-data';
