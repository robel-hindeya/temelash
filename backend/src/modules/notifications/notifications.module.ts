import { Module } from '@nestjs/common';
import { CustomersModule } from '../customers';
import { TelegramModule } from '../telegram';
import { PromotionsController } from './api/promotions.controller';
import { CardNotifications } from './application/card-notifications';
import { CustomerMessenger } from './application/customer-messenger';
import { PromotionsService } from './application/promotions.service';
import { NotificationsRepository } from './infrastructure/notifications.repository';

@Module({
  imports: [CustomersModule, TelegramModule],
  controllers: [PromotionsController],
  providers: [NotificationsRepository, CustomerMessenger, CardNotifications, PromotionsService],
})
export class NotificationsModule {}
