import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PlatformMerchantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.merchant.findMany({
      orderBy: { createdAt: 'asc' },
      select: { id: true, slug: true, nameEn: true, nameAm: true, status: true },
    });
  }

  updateStatus(id: string, status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED') {
    return this.prisma.merchant.update({
      where: { id },
      data: { status },
      select: { id: true, slug: true, nameEn: true, nameAm: true, status: true },
    });
  }
}
