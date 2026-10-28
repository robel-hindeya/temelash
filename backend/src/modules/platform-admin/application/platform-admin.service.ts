import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { RequestMeta } from '../../../common/decorators/request-context.decorator';
import { DomainError } from '../../../common/errors/domain-error';
import { ErrorCode } from '../../../common/errors/error-codes';
import { normalizeEthiopianPhone } from '../../../common/phone/ethiopian-phone';
import type { Env } from '../../../config/env.schema';
import { AuditService } from '../../audit';
import {
  type ApplicationRecord,
  type ApplicationStatus,
  PlatformAdminRepository,
} from '../infrastructure/platform-admin.repository';

const INVITATION_TTL_DAYS = 7;
const DAY_MS = 86_400_000;

export interface PlatformOverview {
  merchants: { total: number; active: number; suspended: number };
  customers: { total: number; telegram: number; cards: number };
  today: { stamps: number; redemptions: number };
  pendingApplications: number;
  outbox: { pending: number; failed: number; dead: number };
  /** Last 7 UTC days, oldest first, zero-filled. */
  stampsByDay: Array<{ day: string; count: number }>;
  /** Last 8 UTC weeks (starting Monday), oldest first, zero-filled. */
  newMerchantsByWeek: Array<{ week: string; count: number }>;
  services: { telegram: boolean; appleWallet: boolean; googleWallet: boolean };
}

export interface ApplicationInput {
  businessName: string;
  category?: string;
  city?: string;
  contactName: string;
  email: string;
  phone?: string;
}

const isoDay = (d: Date) => d.toISOString().slice(0, 10);

@Injectable()
export class PlatformAdminService {
  constructor(
    private readonly repository: PlatformAdminRepository,
    private readonly audit: AuditService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async overview(now = new Date()): Promise<PlatformOverview> {
    const dayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const weekDay = (dayStart.getUTCDay() + 6) % 7; // Monday = 0
    const weekStart = new Date(dayStart.getTime() - weekDay * DAY_MS);
    const daysFrom = new Date(dayStart.getTime() - 6 * DAY_MS);
    const weeksFrom = new Date(weekStart.getTime() - 7 * 7 * DAY_MS);

    const [c, perDay, perWeek, outbox] = await Promise.all([
      this.repository.counts(dayStart),
      this.repository.stampsPerDay(daysFrom),
      this.repository.merchantsPerWeek(weeksFrom),
      this.repository.outboxHealth(),
    ]);
    const dayCounts = new Map(perDay.map((r) => [isoDay(new Date(r.day)), r.count]));
    const weekCounts = new Map(perWeek.map((r) => [isoDay(new Date(r.week)), r.count]));
    const byStatus = c.merchantsByStatus;

    return {
      merchants: {
        total: Object.values(byStatus).reduce((a, b) => a + b, 0),
        active: byStatus.ACTIVE ?? 0,
        suspended: byStatus.SUSPENDED ?? 0,
      },
      customers: { total: c.customers, telegram: c.telegramCustomers, cards: c.memberships },
      today: { stamps: c.stampsToday, redemptions: c.redemptionsToday },
      pendingApplications: c.pendingApplications,
      outbox,
      stampsByDay: Array.from({ length: 7 }, (_, i) => {
        const day = isoDay(new Date(daysFrom.getTime() + i * DAY_MS));
        return { day, count: dayCounts.get(day) ?? 0 };
      }),
      newMerchantsByWeek: Array.from({ length: 8 }, (_, i) => {
        const week = isoDay(new Date(weeksFrom.getTime() + i * 7 * DAY_MS));
        return { week, count: weekCounts.get(week) ?? 0 };
      }),
      services: {
        telegram: Boolean(this.config.get('TELEGRAM_BOT_TOKEN', { infer: true })),
        appleWallet: this.config.get('WALLET_APPLE_ENABLED', { infer: true }),
        googleWallet: this.config.get('WALLET_GOOGLE_ENABLED', { infer: true }),
      },
    };
  }

  /** Public "Register your business" form. Creates a PENDING application only. */
  async apply(
    input: ApplicationInput,
    meta: RequestMeta,
  ): Promise<{ id: string; status: 'PENDING' }> {
    const email = input.email.trim().toLowerCase();
    const phone = input.phone?.trim() ? normalizeEthiopianPhone(input.phone) : null;
    if (input.phone?.trim() && !phone) {
      throw new DomainError(
        ErrorCode.VALIDATION_FAILED,
        'Enter a valid Ethiopian phone number.',
        400,
      );
    }
    if (await this.repository.hasPendingFor(email)) {
      throw new DomainError(
        'APPLICATION_PENDING',
        'We already have your application and will be in touch soon.',
        409,
      );
    }
    const created = await this.repository.createApplication({
      businessName: input.businessName.trim(),
      category: input.category?.trim() || null,
      city: input.city?.trim() || null,
      contactName: input.contactName.trim(),
      email,
      phoneE164: phone,
    });
    await this.audit.record({
      action: 'platform.merchant_application_received',
      actorType: 'SYSTEM',
      targetType: 'merchant_application',
      targetId: created.id,
      requestId: meta.requestId,
    });
    return { id: created.id, status: 'PENDING' };
  }

  list(status?: ApplicationStatus): Promise<ApplicationRecord[]> {
    return this.repository.listApplications(status);
  }

  /**
   * Creates the merchant and an owner invitation. The admin hands the returned link to the owner
   * (email delivery is not built yet); the owner sets a password there and signs in.
   */
  async approve(
    id: string,
    adminUserId: string,
    meta: RequestMeta,
    now = new Date(),
  ): Promise<{
    merchantId: string;
    invitationToken: string;
    ownerEmail: string;
    expiresInDays: number;
  }> {
    const app = await this.pending(id);
    if (await this.repository.emailTaken(app.email)) {
      throw new DomainError(
        'EMAIL_IN_USE',
        `${app.email} already has an account. Ask the applicant for another email, or reject this application.`,
        409,
      );
    }
    const result = await this.repository.approve(app, adminUserId, now, INVITATION_TTL_DAYS);
    if (!result)
      throw new DomainError(ErrorCode.CONFLICT, 'This application was already decided.', 409);
    await this.audit.record({
      action: 'platform.merchant_application_approved',
      actorUserId: adminUserId,
      merchantId: result.merchantId,
      targetType: 'merchant_application',
      targetId: app.id,
      requestId: meta.requestId,
    });
    return {
      merchantId: result.merchantId,
      invitationToken: result.token,
      ownerEmail: app.email,
      expiresInDays: INVITATION_TTL_DAYS,
    };
  }

  async reject(id: string, reason: string, adminUserId: string, meta: RequestMeta): Promise<void> {
    await this.pending(id);
    if (!(await this.repository.reject(id, reason.trim(), adminUserId, new Date()))) {
      throw new DomainError(ErrorCode.CONFLICT, 'This application was already decided.', 409);
    }
    await this.audit.record({
      action: 'platform.merchant_application_rejected',
      actorUserId: adminUserId,
      targetType: 'merchant_application',
      targetId: id,
      requestId: meta.requestId,
    });
  }

  private async pending(id: string): Promise<ApplicationRecord> {
    const app = await this.repository.findApplication(id);
    if (!app) throw new DomainError(ErrorCode.NOT_FOUND, 'Application not found.', 404);
    if (app.status !== 'PENDING') {
      throw new DomainError(ErrorCode.CONFLICT, 'This application was already decided.', 409);
    }
    return app;
  }
}
