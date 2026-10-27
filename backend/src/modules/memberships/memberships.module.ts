import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { CustomersModule } from '../customers';
import { LoyaltyProgramsModule } from '../loyalty-programs';
import { MerchantsModule } from '../merchants';
import { TelegramModule } from '../telegram';
import { CardController, MembershipsController } from './api/card.controller';
import { JoinController } from './api/join.controller';
import { CardService } from './application/card.service';
import { CardSignInService } from './application/card-sign-in.service';
import { TelegramCardService } from './application/telegram-card.service';
import { MembershipLifecycleService } from './application/membership-lifecycle.service';
import { EnrollmentService } from './application/enrollment.service';
import { MembershipsRepository } from './infrastructure/memberships.repository';

@Module({
  imports: [AuthModule, CustomersModule, LoyaltyProgramsModule, MerchantsModule, TelegramModule],
  controllers: [JoinController, CardController, MembershipsController],
  providers: [
    EnrollmentService,
    CardSignInService,
    TelegramCardService,
    CardService,
    MembershipLifecycleService,
    MembershipsRepository,
  ],
  exports: [MembershipsRepository],
})
export class MembershipsModule {}
