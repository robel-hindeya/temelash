import { Module } from '@nestjs/common';
import { PlatformAdminController } from './api/platform-admin.controller';
import { PlatformAdminService } from './application/platform-admin.service';
import { PlatformAdminRepository } from './infrastructure/platform-admin.repository';

@Module({
  controllers: [PlatformAdminController],
  providers: [PlatformAdminService, PlatformAdminRepository],
})
export class PlatformAdminModule {}
