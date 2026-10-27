import { Injectable } from '@nestjs/common';
import type { RequestMeta } from '../../../common/decorators/request-context.decorator';
import { DomainError } from '../../../common/errors/domain-error';
import { CustomersRepository } from '../../customers';
import { type JoinTarget, MerchantDirectory } from '../../merchants';
import { TelegramIdentityService } from '../../telegram';
import { CardSignInService } from './card-sign-in.service';
import { EnrollmentService, type JoinInfo } from './enrollment.service';

export type TelegramSessionResult =
  | (JoinInfo & {
      status: 'SIGNED_IN';
      customer: { firstName: string | null };
      card: { token: string };
    })
  | (JoinInfo & { status: 'NEEDS_PHONE' })
  | (JoinInfo & { status: 'READY_TO_JOIN'; phone: string });

export interface TelegramJoinInput {
  initData: string;
  firstName?: string;
  marketingConsent?: boolean;
  consentVersion?: string;
}

const notJoinable = () => new DomainError('NOT_FOUND', 'This join link is not available.', 404);

/** Shows only the last three digits, e.g. "+251 ••• ••• 567". */
const maskPhone = (e164: string) => `+251 ••• ••• ${e164.slice(-3)}`;

/**
 * The card inside the Telegram Mini App. Telegram vouches for who the user is (signed initData) and,
 * through the bot, for their phone number; no PIN is needed. Each sign-in issues a fresh card token.
 */
@Injectable()
export class TelegramCardService {
  constructor(
    private readonly directory: MerchantDirectory,
    private readonly customers: CustomersRepository,
    private readonly enrollment: EnrollmentService,
    private readonly cards: CardSignInService,
    private readonly telegram: TelegramIdentityService,
  ) {}

  /** Opens the card when this Telegram user already has one here; otherwise says what is missing. */
  async session(
    joinReference: string,
    initData: string,
    meta: RequestMeta,
  ): Promise<TelegramSessionResult> {
    const identity = this.telegram.verify(initData);
    const target = await this.target(joinReference);
    const info = await this.enrollment.joinInfo(joinReference);

    const linked = await this.customers.findByTelegramUser(target.id, identity.userId);
    if (linked && linked.status === 'ACTIVE') {
      const { token } = await this.cards.reopenCard(target, linked.id, 'telegram', meta);
      return {
        ...info,
        status: 'SIGNED_IN',
        customer: { firstName: linked.firstName },
        card: { token },
      };
    }
    const phone = await this.telegram.verifiedPhone(identity.userId);
    return phone
      ? { ...info, status: 'READY_TO_JOIN', phone: maskPhone(phone) }
      : { ...info, status: 'NEEDS_PHONE' };
  }

  /**
   * Joins (or links an existing web card) using the phone number this Telegram user shared with the bot.
   * A card already linked to a different Telegram account is never taken over.
   */
  async join(joinReference: string, input: TelegramJoinInput, meta: RequestMeta) {
    const identity = this.telegram.verify(input.initData);
    const target = await this.target(joinReference);

    // Already has a card here through Telegram: open that one.
    const linked = await this.customers.findByTelegramUser(target.id, identity.userId);
    if (linked && linked.status === 'ACTIVE') {
      const { program, token } = await this.cards.reopenCard(target, linked.id, 'telegram', meta);
      return {
        ...this.enrollment.describe(target, program),
        status: 'EXISTING' as const,
        customer: { firstName: linked.firstName },
        card: { token },
      };
    }

    const phone = await this.telegram.verifiedPhone(identity.userId);
    if (!phone) {
      throw new DomainError(
        'PHONE_NOT_VERIFIED',
        'Share your phone number with the bot first, using the button on the card.',
        409,
      );
    }

    const firstName = (input.firstName || identity.firstName || 'Member').trim().slice(0, 60);
    const result = await this.enrollment.enroll(
      joinReference,
      {
        phone,
        firstName,
        // The backend keys customers by phone; Telegram users have no email, so a per-phone placeholder is used.
        email: `${phone.replace(/\D/g, '')}@customer.temelash.et`,
        preferredLanguage: identity.languageCode === 'am' ? 'AM' : 'EN',
        acceptTerms: true,
        marketingConsent: Boolean(input.marketingConsent),
        consentVersion: input.consentVersion,
      },
      meta,
    );

    const customer = await this.customers.findByPhone(target.id, phone);
    if (!customer) throw notJoinable();
    if (!(await this.customers.linkTelegramUser(target.id, customer.id, identity.userId))) {
      throw new DomainError(
        'TELEGRAM_CONFLICT',
        'This phone number is already linked to another Telegram account. Ask staff for help.',
        409,
      );
    }

    // A new card comes with its token; an existing (web) card gets a fresh one.
    const token =
      result.card?.token ??
      (await this.cards.reopenCard(target, customer.id, 'telegram', meta)).token;
    return {
      merchant: result.merchant,
      program: result.program,
      consent: result.consent,
      wallet: result.wallet,
      status: result.status,
      customer: { firstName: customer.firstName ?? firstName },
      card: { token },
    };
  }

  private async target(joinReference: string): Promise<JoinTarget> {
    const target = await this.directory.findJoinTarget(joinReference);
    if (!target) throw notJoinable();
    return target;
  }
}
