import { Injectable } from '@nestjs/common';
import type { DbClient } from '../../../database/db-client';
import { PrismaService } from '../../../database/prisma.service';

/** Phone numbers Telegram users shared with the bot as their own contact. */
@Injectable()
export class TelegramContactsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(telegramUserId: string, phoneE164: string, verifiedAt: Date): Promise<void> {
    const id = BigInt(telegramUserId);
    await this.prisma.telegramContact.upsert({
      where: { telegramUserId: id },
      create: { telegramUserId: id, phoneE164, verifiedAt },
      update: { phoneE164, verifiedAt },
    });
  }

  async find(
    telegramUserId: string,
    db: DbClient = this.prisma,
  ): Promise<{ phoneE164: string; verifiedAt: Date } | null> {
    return db.telegramContact.findUnique({
      where: { telegramUserId: BigInt(telegramUserId) },
      select: { phoneE164: true, verifiedAt: true },
    });
  }
}
