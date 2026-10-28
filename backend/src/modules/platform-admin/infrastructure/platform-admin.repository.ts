import { createHash, randomBytes } from 'node:crypto';
import { hash } from '@node-rs/argon2';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ApplicationRecord {
  id: string;
  businessName: string;
  category: string | null;
  city: string | null;
  contactName: string;
  email: string;
  phoneE164: string | null;
  status: ApplicationStatus;
  rejectionReason: string | null;
  merchantId: string | null;
  decidedAt: Date | null;
  createdAt: Date;
}

const applicationSelect = {
  id: true,
  businessName: true,
  category: true,
  city: true,
  contactName: true,
  email: true,
  phoneE164: true,
  status: true,
  rejectionReason: true,
  merchantId: true,
  decidedAt: true,
  createdAt: true,
} as const;

/** Platform-wide read model and the merchant application queue (platform administrators only). */
@Injectable()
export class PlatformAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ───────── overview ─────────

  async counts(dayStart: Date) {
    const [
      merchants,
      customers,
      telegramCustomers,
      memberships,
      stampsToday,
      redemptionsToday,
      pending,
    ] = await Promise.all([
      this.prisma.merchant.groupBy({ by: ['status'], _count: { _all: true } }),
      this.prisma.customer.count({ where: { status: 'ACTIVE' } }),
      this.prisma.customer.count({ where: { status: 'ACTIVE', telegramUserId: { not: null } } }),
      this.prisma.customerMembership.count({ where: { status: 'ACTIVE' } }),
      this.prisma.stampEvent.count({ where: { occurredAt: { gte: dayStart } } }),
      this.prisma.redemptionEvent.count({ where: { occurredAt: { gte: dayStart } } }),
      this.prisma.merchantApplication.count({ where: { status: 'PENDING' } }),
    ]);
    return {
      merchantsByStatus: Object.fromEntries(
        merchants.map((m) => [m.status, m._count._all]),
      ) as Record<string, number>,
      customers,
      telegramCustomers,
      memberships,
      stampsToday,
      redemptionsToday,
      pendingApplications: pending,
    };
  }

  /** Counts per UTC day (stamps) or per UTC week starting Monday (new merchants), oldest first. */
  stampsPerDay(since: Date): Promise<Array<{ day: Date; count: number }>> {
    return this.prisma.$queryRaw`
      SELECT date_trunc('day', occurred_at AT TIME ZONE 'UTC') AS day, count(*)::int AS count
      FROM stamp_events WHERE occurred_at >= ${since}
      GROUP BY 1 ORDER BY 1`;
  }

  merchantsPerWeek(since: Date): Promise<Array<{ week: Date; count: number }>> {
    return this.prisma.$queryRaw`
      SELECT date_trunc('week', created_at AT TIME ZONE 'UTC') AS week, count(*)::int AS count
      FROM merchants WHERE created_at >= ${since}
      GROUP BY 1 ORDER BY 1`;
  }

  async outboxHealth(): Promise<{ pending: number; failed: number; dead: number }> {
    const rows = await this.prisma.outboxJob.groupBy({
      by: ['status'],
      where: { status: { in: ['PENDING', 'FAILED', 'DEAD'] } },
      _count: { _all: true },
    });
    const n = (s: string) => rows.find((r) => r.status === s)?._count._all ?? 0;
    return { pending: n('PENDING'), failed: n('FAILED'), dead: n('DEAD') };
  }

  // ───────── applications ─────────

  async createApplication(data: {
    businessName: string;
    category: string | null;
    city: string | null;
    contactName: string;
    email: string;
    phoneE164: string | null;
  }): Promise<{ id: string }> {
    return this.prisma.merchantApplication.create({ data, select: { id: true } });
  }

  async hasPendingFor(email: string): Promise<boolean> {
    return (
      (await this.prisma.merchantApplication.count({ where: { email, status: 'PENDING' } })) > 0
    );
  }

  async listApplications(status?: ApplicationStatus): Promise<ApplicationRecord[]> {
    return this.prisma.merchantApplication.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: applicationSelect,
    }) as Promise<ApplicationRecord[]>;
  }

  async findApplication(id: string): Promise<ApplicationRecord | null> {
    return this.prisma.merchantApplication.findUnique({
      where: { id },
      select: applicationSelect,
    }) as Promise<ApplicationRecord | null>;
  }

  async emailTaken(email: string): Promise<boolean> {
    return (await this.prisma.platformUser.count({ where: { email } })) > 0;
  }

  async reject(id: string, reason: string, adminUserId: string, now: Date): Promise<boolean> {
    const res = await this.prisma.merchantApplication.updateMany({
      where: { id, status: 'PENDING' },
      data: {
        status: 'REJECTED',
        rejectionReason: reason,
        decidedByUserId: adminUserId,
        decidedAt: now,
      },
    });
    return res.count === 1;
  }

  /**
   * Approves a pending application in one transaction: the merchant, its settings, the owner account
   * (no usable password until they accept), an OWNER staff membership and a single-use invitation.
   * Returns the raw invitation token, or null when the application was no longer pending.
   */
  async approve(
    app: ApplicationRecord,
    adminUserId: string,
    now: Date,
    invitationTtlDays: number,
  ): Promise<{ merchantId: string; token: string } | null> {
    const ownerRole = await this.prisma.role.findUnique({ where: { key: 'OWNER' } });
    if (!ownerRole) throw new Error('Roles are missing: run the reference-data seed.');
    const token = randomBytes(32).toString('base64url');
    const unusablePassword = await hash(randomBytes(32).toString('base64url'));
    const slug = await this.freeSlug(app.businessName);

    return this.prisma.$transaction(async (tx) => {
      const claimed = await tx.merchantApplication.updateMany({
        where: { id: app.id, status: 'PENDING' },
        data: { status: 'APPROVED', decidedByUserId: adminUserId, decidedAt: now },
      });
      if (claimed.count !== 1) return null;

      const merchant = await tx.merchant.create({
        data: {
          slug,
          nameEn: app.businessName,
          joinReference: `${slug}-${randomBytes(6).toString('hex')}`,
        },
      });
      await tx.merchantSettings.create({ data: { merchantId: merchant.id } });
      const user = await tx.platformUser.create({
        data: {
          email: app.email,
          displayName: app.contactName,
          accountType: 'MERCHANT_USER',
          passwordHash: unusablePassword,
        },
      });
      const staff = await tx.staffMembership.create({
        data: { merchantId: merchant.id, userId: user.id, roleId: ownerRole.id, status: 'INVITED' },
      });
      await tx.staffInvitation.create({
        data: {
          merchantId: merchant.id,
          staffMembershipId: staff.id,
          tokenHash: createHash('sha256').update(token).digest('hex'),
          invitedByUserId: adminUserId,
          expiresAt: new Date(now.getTime() + invitationTtlDays * 86_400_000),
        },
      });
      await tx.merchantApplication.update({
        where: { id: app.id },
        data: { merchantId: merchant.id },
      });
      return { merchantId: merchant.id, token };
    });
  }

  /** A unique slug from the business name ("Buna House" → "buna-house", then "buna-house-2"…). */
  private async freeSlug(name: string): Promise<string> {
    const base =
      name
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40) || 'business';
    const padded = base.length < 3 ? `${base}-shop` : base;
    for (let i = 1; i < 50; i++) {
      const candidate = i === 1 ? padded : `${padded}-${i}`;
      if (
        !(await this.prisma.merchant.findUnique({
          where: { slug: candidate },
          select: { id: true },
        }))
      ) {
        return candidate;
      }
    }
    return `${padded}-${randomBytes(3).toString('hex')}`;
  }
}
