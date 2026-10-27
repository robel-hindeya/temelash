import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Public } from '../../../common/decorators/access.decorators';
import { ReqMeta, type RequestMeta } from '../../../common/decorators/request-context.decorator';
import { CardSignInService } from '../application/card-sign-in.service';
import { EnrollmentService } from '../application/enrollment.service';
import { TelegramCardService } from '../application/telegram-card.service';

// Printable names only: no control characters or markup.
const SAFE_NAME = /^[\p{L}\p{M}\p{N} .'’/-]+$/u;

export class EnrollDto {
  @ApiPropertyOptional({
    example: '0911 234 567',
    description:
      'Any common Ethiopian format; stored as E.164. Optional when enrolling by name and email.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  phone?: string;

  @ApiProperty({ example: 'Abebe' })
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  @Matches(SAFE_NAME, { message: 'firstName contains invalid characters' })
  firstName!: string;

  @ApiProperty({ example: 'abebe@example.com' })
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  @IsEmail({}, { message: 'email must be an email' })
  email!: string;

  @ApiProperty({ enum: ['EN', 'AM'] }) @IsIn(['EN', 'AM']) preferredLanguage!: 'EN' | 'AM';

  @ApiProperty({ description: 'Must be true: acceptance of the program terms and privacy notice.' })
  @IsBoolean()
  @Equals(true, { message: 'acceptTerms must be true' })
  acceptTerms!: boolean;

  @ApiPropertyOptional({
    default: false,
    description: 'Explicit, optional opt-in to marketing messages.',
  })
  @IsOptional()
  @IsBoolean()
  marketingConsent?: boolean;

  @ApiPropertyOptional({
    description:
      'The consent version the customer saw (from the join info). A stale version is rejected with 409.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  consentVersion?: string;

  @ApiPropertyOptional({
    example: '482915',
    description:
      'Six-digit card PIN the customer chooses. With their phone it reopens the card on a new device. ' +
      'Set only when this request issues the card; an existing PIN is never replaced.',
  })
  @IsOptional()
  @Matches(/^\d{6}$/, { message: 'pin must be six digits' })
  pin?: string;
}

export class TelegramSessionDto {
  @ApiProperty({
    description: 'Telegram.WebApp.initData exactly as Telegram gave it to the Mini App.',
  })
  @IsString()
  @MinLength(20)
  @MaxLength(4096)
  initData!: string;
}

export class TelegramJoinDto extends TelegramSessionDto {
  @ApiPropertyOptional({ example: 'Abebe', description: 'Defaults to the Telegram first name.' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  @Matches(SAFE_NAME, { message: 'firstName contains invalid characters' })
  firstName?: string;

  @ApiPropertyOptional({ default: false }) @IsOptional() @IsBoolean() marketingConsent?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(40) consentVersion?: string;
}

export class CardSignInDto {
  @ApiProperty({ example: '0911 234 567' })
  @IsString()
  @MaxLength(32)
  phone!: string;

  @ApiProperty({ example: '482915' })
  @IsString()
  @MaxLength(12)
  pin!: string;
}

class WalletOptionDto {
  @ApiProperty({ enum: ['WEB', 'APPLE', 'GOOGLE'] }) provider!: string;
  @ApiProperty() available!: boolean;
  @ApiProperty({ enum: ['NOT_CONFIGURED'], nullable: true }) reason!: string | null;
  @ApiProperty({
    nullable: true,
    description: 'Add-to-wallet link (filled in by the wallet integration).',
  })
  addUrl!: string | null;
}

class JoinInfoDto {
  @ApiProperty() merchant!: { nameEn: string; nameAm: string | null; defaultLanguage: string };
  @ApiProperty() program!: Record<string, unknown>;
  @ApiProperty({ example: { version: '2026-10-v1' } }) consent!: { version: string };
  @ApiProperty({ type: [WalletOptionDto] }) wallet!: WalletOptionDto[];
}

class EnrollmentResultDto extends JoinInfoDto {
  @ApiProperty({ enum: ['CREATED', 'EXISTING'] }) status!: string;
  @ApiProperty({ description: 'Echo of the submitted values.' }) customer!: {
    firstName: string;
    email?: string;
    preferredLanguage: string;
  };
  @ApiProperty({
    nullable: true,
    description:
      'Opaque card token for the QR code / wallet barcode. Returned once, only when status is CREATED.',
  })
  card!: { token: string } | null;
}

class CardSignInResultDto extends JoinInfoDto {
  @ApiProperty() customer!: { firstName: string | null };
  @ApiProperty({ description: 'A new card token. Any earlier token for this card stops working.' })
  card!: { token: string };
}

@ApiTags('Customer enrollment (public)')
@Controller('join')
export class JoinController {
  constructor(
    private readonly enrollment: EnrollmentService,
    private readonly signIn: CardSignInService,
    private readonly telegram: TelegramCardService,
  ) {}

  @Public()
  @Get(':joinReference')
  @ApiOperation({
    summary: 'Public join page data',
    description:
      'What a customer sees before joining: merchant name, the active program, reward, terms and the consent version. ' +
      'Contains no internal ids. Unknown references and merchants without an active program give the same 404.',
  })
  @ApiOkResponse({ type: JoinInfoDto })
  @ApiNotFoundResponse()
  info(@Param('joinReference') joinReference: string) {
    return this.enrollment.joinInfo(joinReference);
  }

  @Public()
  @Post(':joinReference/enroll')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Enroll a customer in the merchant’s active program',
    description:
      'Creates or reuses the customer **within this merchant only** and creates the membership. Returns wallet options ' +
      '(web card always; Apple/Google when configured). Nothing is ever revealed about other merchants. A repeat ' +
      'enrollment is safe: it returns status EXISTING, issues no new card, and cannot change the stored name or consent. ' +
      'Rate limited per IP.',
  })
  @ApiCreatedResponse({ type: EnrollmentResultDto })
  @ApiConflictResponse({ description: 'CONSENT_VERSION_STALE' })
  @ApiNotFoundResponse({ description: 'Join link not available' })
  @ApiTooManyRequestsResponse()
  enroll(
    @Param('joinReference') joinReference: string,
    @Body() dto: EnrollDto,
    @ReqMeta() meta: RequestMeta,
  ) {
    return this.enrollment.enroll(joinReference, dto, meta);
  }

  @Public()
  @Post(':joinReference/sign-in')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Reopen a card with phone + PIN',
    description:
      'For a customer on a new device (or after clearing the browser). Issues a new card token and invalidates the ' +
      'previous one. Wrong phone and wrong PIN give the same 401. Five wrong PINs lock the PIN for 15 minutes (429). ' +
      'Customers without a PIN need staff-assisted reissue. Rate limited per IP.',
  })
  @ApiOkResponse({ type: CardSignInResultDto })
  @ApiUnauthorizedResponse({ description: 'INVALID_CREDENTIALS' })
  @ApiNotFoundResponse({ description: 'Join link not available, or no active card' })
  @ApiTooManyRequestsResponse({ description: 'PIN_LOCKED or rate limited' })
  signInWithPin(
    @Param('joinReference') joinReference: string,
    @Body() dto: CardSignInDto,
    @ReqMeta() meta: RequestMeta,
  ) {
    return this.signIn.signIn(joinReference, dto, meta);
  }

  @Public()
  @Post(':joinReference/telegram/session')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Open the card inside the Telegram Mini App',
    description:
      'Verifies Telegram initData. SIGNED_IN returns a fresh card token (the old one stops working); NEEDS_PHONE asks ' +
      'the user to share their number with the bot; READY_TO_JOIN means a verified number is on file. Rate limited per IP.',
  })
  @ApiUnauthorizedResponse({ description: 'TELEGRAM_AUTH_FAILED' })
  @ApiNotFoundResponse({ description: 'Join link not available, or Telegram not configured' })
  telegramSession(
    @Param('joinReference') joinReference: string,
    @Body() dto: TelegramSessionDto,
    @ReqMeta() meta: RequestMeta,
  ) {
    return this.telegram.session(joinReference, dto.initData, meta);
  }

  @Public()
  @Post(':joinReference/telegram/join')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Join, or link a web card, from the Telegram Mini App',
    description:
      'Uses the phone number the Telegram user shared with the bot in the last 30 minutes. Creates the card, or links ' +
      'the existing card for that phone and issues it a fresh token. A card linked to another Telegram account gives ' +
      '409 TELEGRAM_CONFLICT. Rate limited per IP.',
  })
  @ApiConflictResponse({
    description: 'PHONE_NOT_VERIFIED, TELEGRAM_CONFLICT or CONSENT_VERSION_STALE',
  })
  @ApiUnauthorizedResponse({ description: 'TELEGRAM_AUTH_FAILED' })
  telegramJoin(
    @Param('joinReference') joinReference: string,
    @Body() dto: TelegramJoinDto,
    @ReqMeta() meta: RequestMeta,
  ) {
    return this.telegram.join(joinReference, dto, meta);
  }
}
