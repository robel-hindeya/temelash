import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Permissions, Public } from '../../../common/decorators/access.decorators';
import { ReqMeta, type RequestMeta } from '../../../common/decorators/request-context.decorator';
import { CurrentPlatformActor, type PlatformActor } from '../../tenancy';
import { PlatformAdminService } from '../application/platform-admin.service';

export class MerchantApplicationDto {
  @ApiProperty({ example: 'Buna House' })
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  businessName!: string;
  @ApiPropertyOptional({ example: 'Cafe' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  category?: string;
  @ApiPropertyOptional({ example: 'Addis Ababa' })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  city?: string;
  @ApiProperty({ example: 'Liya Tesfaye' })
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  contactName!: string;
  @ApiProperty({ example: 'liya@example.com' })
  @IsString()
  @MaxLength(120)
  @IsEmail({}, { message: 'email must be an email' })
  email!: string;
  @ApiPropertyOptional({ example: '0911 234 567' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  phone?: string;
}

export class ListApplicationsQuery {
  @ApiPropertyOptional({ enum: ['PENDING', 'APPROVED', 'REJECTED'] })
  @IsOptional()
  @IsIn(['PENDING', 'APPROVED', 'REJECTED'])
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export class RejectApplicationDto {
  @ApiProperty({ example: 'We could not verify the business.' })
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  reason!: string;
}

@ApiTags('Platform administration')
@Controller()
export class PlatformAdminController {
  constructor(private readonly platform: PlatformAdminService) {}

  @Public()
  @Post('merchant-applications')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Apply to join as a business (public sign-up form)',
    description:
      'Creates a PENDING application for a platform administrator to review. No account is created until it is ' +
      'approved. One pending application per email (409 APPLICATION_PENDING). Rate limited per IP.',
  })
  @ApiConflictResponse({ description: 'APPLICATION_PENDING' })
  @ApiTooManyRequestsResponse()
  apply(@Body() dto: MerchantApplicationDto, @ReqMeta() meta: RequestMeta) {
    return this.platform.apply(dto, meta);
  }

  @ApiBearerAuth()
  @Permissions('platform:manage')
  @Get('platform/overview')
  @ApiOperation({
    summary: 'Platform totals, recent activity and service status (platform administrators only)',
  })
  overview() {
    return this.platform.overview();
  }

  @ApiBearerAuth()
  @Permissions('platform:manage')
  @Get('platform/applications')
  @ApiOperation({ summary: 'Business applications, newest first (platform administrators only)' })
  list(@Query() query: ListApplicationsQuery) {
    return this.platform.list(query.status);
  }

  @ApiBearerAuth()
  @Permissions('platform:manage')
  @Post('platform/applications/:id/approve')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Approve: create the business and an owner invitation (platform administrators only)',
    description:
      'Returns a one-time invitation token (7 days). Send the owner /staff/join/<token>?email=<email>; email ' +
      'delivery is not built yet. 409 EMAIL_IN_USE when the email already has an account.',
  })
  @ApiConflictResponse({ description: 'EMAIL_IN_USE or already decided' })
  approve(
    @CurrentPlatformActor() actor: PlatformActor,
    @Param('id', ParseUUIDPipe) id: string,
    @ReqMeta() meta: RequestMeta,
  ) {
    return this.platform.approve(id, actor.userId, meta);
  }

  @ApiBearerAuth()
  @Permissions('platform:manage')
  @Post('platform/applications/:id/reject')
  @HttpCode(204)
  @ApiOperation({ summary: 'Reject an application with a reason (platform administrators only)' })
  async reject(
    @CurrentPlatformActor() actor: PlatformActor,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RejectApplicationDto,
    @ReqMeta() meta: RequestMeta,
  ): Promise<void> {
    await this.platform.reject(id, dto.reason, actor.userId, meta);
  }
}
