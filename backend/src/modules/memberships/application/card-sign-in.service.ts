import { Injectable } from '@nestjs/common';
import type { RequestMeta } from '../../../common/decorators/request-context.decorator';
import { DomainError } from '../../../common/errors/domain-error';
import { ErrorCode } from '../../../common/errors/error-codes';
import { normalizeEthiopianPhone } from '../../../common/phone/ethiopian-phone';
import { TransactionManager } from '../../../database/transaction-manager';
import { AuditService } from '../../audit';
import { PasswordService } from '../../auth';
import {
  CustomersRepository,
  PIN_LOCK_MINUTES,
  PIN_MAX_FAILED_ATTEMPTS,
  isWellFormedPin,
} from '../../customers';
import { ProgramsRepository, type ProgramRecord } from '../../loyalty-programs';
import { type JoinTarget, MerchantDirectory } from '../../merchants';
import { newCardToken } from '../domain/card-token';
import { MembershipsRepository } from '../infrastructure/memberships.repository';
import { EnrollmentService, type JoinInfo } from './enrollment.service';

export interface CardSignInResult extends JoinInfo {
  customer: { firstName: string | null };
  card: { token: string };
}

/** Wrong phone, no PIN on file and wrong PIN all look the same to the caller. */
const invalidCredentials = () =>
  new DomainError(
    'INVALID_CREDENTIALS',
    'That phone number and PIN do not match a card here.',
    401,
  );

const pinLocked = () =>
  new DomainError(
    'PIN_LOCKED',
    `Too many wrong PINs. Try again in ${PIN_LOCK_MINUTES} minutes, or ask staff to reissue your card.`,
    429,
  );

/**
 * Phone + PIN reopens a customer's card on a new device. The stored token is only a hash, so the card
 * gets a new token; the old one stops working (which also cuts off a lost phone).
 */
@Injectable()
export class CardSignInService {
  constructor(
    private readonly directory: MerchantDirectory,
    private readonly programs: ProgramsRepository,
    private readonly customers: CustomersRepository,
    private readonly memberships: MembershipsRepository,
    private readonly enrollment: EnrollmentService,
    private readonly passwords: PasswordService,
    private readonly audit: AuditService,
    private readonly transactions: TransactionManager,
  ) {}

  async signIn(
    joinReference: string,
    input: { phone: string; pin: string },
    meta: RequestMeta,
  ): Promise<CardSignInResult> {
    const target = await this.directory.findJoinTarget(joinReference);
    if (!target)
      throw new DomainError(ErrorCode.NOT_FOUND, 'This join link is not available.', 404);

    const phone = normalizeEthiopianPhone(input.phone);
    const credential =
      phone && isWellFormedPin(input.pin)
        ? await this.customers.findPinCredential(target.id, phone)
        : null;
    if (!credential?.pinHash || credential.status !== 'ACTIVE') {
      await this.passwords.verifyAgainstDummy(input.pin);
      throw invalidCredentials();
    }

    const now = new Date();
    if (credential.pinLockedUntil && credential.pinLockedUntil > now) throw pinLocked();

    if (!(await this.passwords.verify(credential.pinHash, input.pin))) {
      const lockUntil = new Date(now.getTime() + PIN_LOCK_MINUTES * 60_000);
      const locked = await this.customers.recordPinFailure(
        target.id,
        credential.id,
        PIN_MAX_FAILED_ATTEMPTS,
        lockUntil,
      );
      if (locked) {
        await this.audit.record({
          action: 'customer.pin_locked',
          actorType: 'SYSTEM',
          merchantId: target.id,
          targetType: 'customer',
          targetId: credential.id,
          requestId: meta.requestId,
        });
        throw pinLocked();
      }
      throw invalidCredentials();
    }

    const { program, token } = await this.reopenCard(target, credential.id, 'phone_pin', meta);
    return {
      ...this.enrollment.describe(target, program),
      customer: { firstName: credential.firstName },
      card: { token },
    };
  }

  /**
   * Issues a fresh token for the customer's card at this merchant (the old one stops working) and
   * audits how the customer proved who they are. 404 when they have no active card here.
   */
  async reopenCard(
    target: JoinTarget,
    customerId: string,
    source: 'phone_pin' | 'telegram',
    meta: RequestMeta,
  ): Promise<{ program: ProgramRecord; token: string }> {
    const issued = newCardToken();
    const program = await this.transactions.run(async (db) => {
      const active = await this.programs.findActiveDefault(target.id, db);
      const membership = active
        ? await this.memberships.findByCustomerAndProgram(target.id, customerId, active.id, db)
        : null;
      if (!active || !membership || membership.status !== 'ACTIVE') {
        throw new DomainError(
          ErrorCode.NOT_FOUND,
          'There is no active card for this phone number here. Join again or ask staff for help.',
          404,
        );
      }
      await this.memberships.rotateToken(target.id, membership.id, issued.hash, db);
      if (source === 'phone_pin') await this.customers.clearPinFailures(target.id, customerId, db);
      await this.audit.record(
        {
          action: 'membership.card_recovered',
          actorType: 'SYSTEM',
          merchantId: target.id,
          targetType: 'membership',
          targetId: membership.id,
          requestId: meta.requestId,
          metadata: { source },
        },
        db,
      );
      return active;
    });
    return { program, token: issued.token };
  }
}
