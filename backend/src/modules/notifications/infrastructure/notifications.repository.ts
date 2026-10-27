import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

/** Who a card message goes to, and what it should say about the shop and reward. */
export interface CardRecipient {
  customerId: string;
  telegramUserId: string;
  merchantName: string;
  joinReference: string;
  rewardName: string | null;
}

export interface ExpiringReward {
  unlockId: string;
  merchantId: string;
  membershipId: string;
  expiresAt: Date;
}

export interface PromotionSummary {
  id: string;
  message: string;
  audienceSize: number;
  sent: number;
  createdAt: Date;
}

/** Read model for customer messages (Telegram) plus the at-most-once delivery log and promotions. */
@Injectable()
export class NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** The Telegram user behind a membership, or null when the customer has not linked Telegram. */
  async cardRecipient(merchantId: string, membershipId: string): Promise<CardRecipient | null> {
    const m = await this.prisma.customerMembership.findFirst({
      where: { id: membershipId, merchantId, status: 'ACTIVE' },
      select: {
        customer: { select: { id: true, telegramUserId: true, status: true } },
        program: {
          select: {
            merchant: { select: { nameEn: true, joinReference: true } },
            rewardDefinitions: { where: { status: 'ACTIVE' }, take: 1, select: { nameEn: true } },
          },
        },
      },
    });
    if (!m || m.customer.status !== 'ACTIVE' || m.customer.telegramUserId == null) return null;
    return {
      customerId: m.customer.id,
      telegramUserId: String(m.customer.telegramUserId),
      merchantName: m.program.merchant.nameEn,
      joinReference: m.program.merchant.joinReference,
      rewardName: m.program.rewardDefinitions[0]?.nameEn ?? null,
    };
  }

  async rewardExpiry(merchantId: string, unlockId: string): Promise<Date | null> {
    const u = await this.prisma.rewardUnlock.findFirst({
      where: { id: unlockId, merchantId },
      select: { expiresAt: true },
    });
    return u?.expiresAt ?? null;
  }

  /**
   * Rewards expiring in (now, until] that are still redeemable (no redemption, or every redemption
   * reversed), whose customer uses Telegram and has not had this reminder yet.
   */
  expiringRewards(now: Date, until: Date, limit: number): Promise<ExpiringReward[]> {
    return this.prisma.$queryRaw<ExpiringReward[]>`
      SELECT u.id AS "unlockId", u.merchant_id AS "merchantId", u.membership_id AS "membershipId",
             u.expires_at AS "expiresAt"
      FROM reward_unlocks u
      JOIN customer_memberships m ON m.id = u.membership_id AND m.status = 'ACTIVE'
      JOIN customers c ON c.id = m.customer_id AND c.status = 'ACTIVE' AND c.telegram_user_id IS NOT NULL
      WHERE u.expires_at > ${now} AND u.expires_at <= ${until}
        AND NOT EXISTS (
          SELECT 1 FROM redemption_events r
          WHERE r.reward_unlock_id = u.id
            AND NOT EXISTS (SELECT 1 FROM reversal_events v WHERE v.redemption_event_id = r.id)
        )
        AND NOT EXISTS (SELECT 1 FROM notification_deliveries d WHERE d.key = 'expiry:' || u.id::text)
      ORDER BY u.expires_at
      LIMIT ${limit}`;
  }

  /**
   * Customers who may receive offers: active, linked to Telegram, and whose latest marketing consent
   * row is GRANTED. `excludePromotionId` skips those who already got that promotion.
   */
  promotionAudience(
    merchantId: string,
    limit: number,
    excludePromotionId?: string,
  ): Promise<Array<{ customerId: string; telegramUserId: string; firstName: string | null }>> {
    const exclude = excludePromotionId
      ? Prisma.sql`AND NOT EXISTS (
          SELECT 1 FROM notification_deliveries d
          WHERE d.promotion_id = ${excludePromotionId}::uuid AND d.customer_id = c.id)`
      : Prisma.empty;
    return this.prisma.$queryRaw<
      Array<{ customerId: string; telegramUserId: string; firstName: string | null }>
    >`
      SELECT c.id AS "customerId", c.telegram_user_id::text AS "telegramUserId", c.first_name AS "firstName"
      FROM customers c
      JOIN LATERAL (
        SELECT action FROM customer_consents cc
        WHERE cc.customer_id = c.id AND cc.merchant_id = c.merchant_id AND cc.type = 'MARKETING'
        ORDER BY cc.occurred_at DESC LIMIT 1
      ) latest ON latest.action = 'GRANTED'
      WHERE c.merchant_id = ${merchantId}::uuid AND c.status = 'ACTIVE' AND c.telegram_user_id IS NOT NULL
      ${exclude}
      ORDER BY c.id
      LIMIT ${limit}`;
  }

  async promotionAudienceSize(merchantId: string): Promise<number> {
    return (await this.promotionAudience(merchantId, 1_000_000)).length;
  }

  async merchantName(merchantId: string): Promise<string | null> {
    const m = await this.prisma.merchant.findUnique({
      where: { id: merchantId },
      select: { nameEn: true },
    });
    return m?.nameEn ?? null;
  }

  async merchantJoinReference(merchantId: string): Promise<string | null> {
    const m = await this.prisma.merchant.findUnique({
      where: { id: merchantId },
      select: { joinReference: true },
    });
    return m?.joinReference ?? null;
  }

  /**
   * Reserves a message by its key. False means it was already reserved (sent, or being sent): the
   * caller must not send. This is what makes retries safe.
   */
  async claimDelivery(input: {
    key: string;
    kind: string;
    merchantId: string;
    customerId: string;
    promotionId?: string;
  }): Promise<boolean> {
    try {
      await this.prisma.notificationDelivery.create({ data: input });
      return true;
    } catch (err) {
      if ((err as { code?: string }).code === 'P2002') return false;
      throw err;
    }
  }

  /** Frees a reservation whose send failed temporarily, so a retry can send it. */
  async releaseDelivery(key: string): Promise<void> {
    await this.prisma.notificationDelivery.deleteMany({ where: { key, sentAt: null } });
  }

  async markSent(key: string, at: Date): Promise<void> {
    await this.prisma.notificationDelivery.updateMany({ where: { key }, data: { sentAt: at } });
  }

  async createPromotion(data: {
    merchantId: string;
    message: string;
    createdByUserId: string;
    audienceSize: number;
  }): Promise<{ id: string; createdAt: Date }> {
    return this.prisma.promotion.create({ data, select: { id: true, createdAt: true } });
  }

  async findPromotion(
    merchantId: string,
    id: string,
  ): Promise<{ id: string; message: string } | null> {
    return this.prisma.promotion.findFirst({
      where: { id, merchantId },
      select: { id: true, message: true },
    });
  }

  async lastPromotionAt(merchantId: string): Promise<Date | null> {
    const p = await this.prisma.promotion.findFirst({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    });
    return p?.createdAt ?? null;
  }

  async recentPromotions(merchantId: string, take: number): Promise<PromotionSummary[]> {
    const rows = await this.prisma.promotion.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
      take,
      select: { id: true, message: true, audienceSize: true, createdAt: true },
    });
    const sent = await this.prisma.notificationDelivery.groupBy({
      by: ['promotionId'],
      where: { merchantId, promotionId: { in: rows.map((r) => r.id) }, sentAt: { not: null } },
      _count: { _all: true },
    });
    const counts = new Map(sent.map((s) => [s.promotionId, s._count._all]));
    return rows.map((r) => ({ ...r, sent: counts.get(r.id) ?? 0 }));
  }

  /** Every active customer (any merchant) linked to this Telegram user: used by /stop. */
  async customersForTelegramUser(
    telegramUserId: string,
  ): Promise<Array<{ id: string; merchantId: string }>> {
    return this.prisma.customer.findMany({
      where: { telegramUserId: BigInt(telegramUserId), status: 'ACTIVE' },
      select: { id: true, merchantId: true },
    });
  }
}
