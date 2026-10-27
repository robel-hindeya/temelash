import { Injectable } from '@nestjs/common';

/** Handles a bot command for a Telegram user; returns the reply text, if any. */
export type TelegramCommandHandler = (telegramUserId: string) => Promise<string | null>;

/** Feature modules register bot commands here; the telegram module never depends on them. */
@Injectable()
export class TelegramCommandRegistry {
  private readonly handlers = new Map<string, TelegramCommandHandler>();

  register(command: string, handler: TelegramCommandHandler): void {
    if (this.handlers.has(command))
      throw new Error(`Telegram command "${command}" is already registered`);
    this.handlers.set(command, handler);
  }

  get(command: string): TelegramCommandHandler | undefined {
    return this.handlers.get(command);
  }
}
