import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Permissions } from '../../../common/decorators/access.decorators';
import { ReqMeta, type RequestMeta } from '../../../common/decorators/request-context.decorator';
import { CurrentMerchantActor, type MerchantActor } from '../../tenancy';
import { PromotionsService } from '../application/promotions.service';

export class SendPromotionDto {
  @ApiProperty({ example: 'Two-for-one macchiato today until 6pm.', maxLength: 500 })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  message!: string;
}

@ApiTags('Promotions')
@ApiBearerAuth()
@Controller('merchant/promotions')
export class PromotionsController {
  constructor(private readonly promotions: PromotionsService) {}

  @Permissions('customer:read')
  @Get()
  @ApiOperation({
    summary: 'Promotion reach, when the next one may be sent, and recent promotions',
    description: 'Reach = customers with the Telegram card who opted in to offers.',
  })
  overview(@CurrentMerchantActor() actor: MerchantActor) {
    return this.promotions.overview(actor);
  }

  @Permissions('customer:manage')
  @Post()
  @HttpCode(202)
  @ApiOperation({
    summary: 'Send a promotion over Telegram to customers who opted in to offers',
    description:
      'One per 24 hours per merchant (429 PROMOTION_TOO_SOON). Delivered in the background; each message ends ' +
      'with how to opt out. 409 NO_AUDIENCE when nobody can receive it, TELEGRAM_NOT_CONFIGURED when the bot is off.',
  })
  send(
    @CurrentMerchantActor() actor: MerchantActor,
    @Body() dto: SendPromotionDto,
    @ReqMeta() meta: RequestMeta,
  ) {
    return this.promotions.send(actor, dto.message, meta);
  }
}
