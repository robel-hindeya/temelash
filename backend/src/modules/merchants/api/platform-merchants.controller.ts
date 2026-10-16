import { Body, Controller, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Permissions } from '../../../common/decorators/access.decorators';
import { PlatformMerchantsRepository } from '../infrastructure/platform-merchants.repository';

export class MerchantSummaryDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() slug!: string;
  @ApiProperty() nameEn!: string;
  @ApiProperty({ nullable: true }) nameAm!: string | null;
  @ApiProperty({ enum: ['ACTIVE', 'SUSPENDED', 'DEACTIVATED'] }) status!: string;
}

export class UpdateMerchantStatusDto {
  @ApiProperty({ enum: ['ACTIVE', 'SUSPENDED', 'DEACTIVATED'] })
  status!: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
}

@ApiTags('Platform')
@ApiBearerAuth()
@Controller('platform/merchants')
export class PlatformMerchantsController {
  constructor(private readonly merchants: PlatformMerchantsRepository) {}

  @Permissions('platform:manage')
  @Get()
  @ApiOperation({
    summary: 'List merchants (platform administrators only)',
    description:
      'Returns organisation-level data only. Customer, stamp and audit data of a merchant is not reachable from here.',
  })
  @ApiOkResponse({ type: [MerchantSummaryDto] })
  @ApiForbiddenResponse({ description: 'Merchant users can never call platform routes' })
  list() {
    return this.merchants.list();
  }

  @Permissions('platform:manage')
  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update merchant status (platform administrators only)',
  })
  @ApiOkResponse({ type: MerchantSummaryDto })
  @ApiForbiddenResponse({ description: 'Merchant users can never call platform routes' })
  updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateMerchantStatusDto,
  ) {
    return this.merchants.updateStatus(id, body.status);
  }
}
