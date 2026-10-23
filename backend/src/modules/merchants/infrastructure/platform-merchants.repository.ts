import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PlatformMerchantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.merchant.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        nameEn: true,
        nameAm: true,
        status: true,
        timezone: true,
        defaultLanguage: true,
        joinReference: true,
        createdAt: true,
        _count: {
          select: {
            branches: true,
            staffMemberships: true,
            customers: true,
            programs: true,
          },
        },
      },
    });
  }

  getById(id: string) {
    return this.prisma.merchant.findUnique({
      where: { id },
      include: {
        branches: true,
        staffMemberships: {
          include: {
            user: { select: { displayName: true, email: true } },
            role: { select: { key: true, name: true } },
          },
        },
        programs: {
          include: { rewardDefinitions: true },
        },
        _count: {
          select: { customers: true },
        },
      },
    });
  }

  async create(data: { nameEn: string; nameAm?: string | null; slug?: string; defaultLanguage?: 'EN' | 'AM' }) {
    const rawSlug = data.slug || data.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = rawSlug || `merchant-${Date.now()}`;
    const joinRef = `${slug}-join-${Math.random().toString(36).substring(2, 8)}`;
    const merchant = await this.prisma.merchant.create({
      data: {
        slug,
        nameEn: data.nameEn,
        nameAm: data.nameAm ?? null,
        joinReference: joinRef,
        defaultLanguage: data.defaultLanguage || 'EN',
      },
    });
    await this.prisma.merchantSettings.create({
      data: {
        merchantId: merchant.id,
      },
    });
    await this.prisma.branch.create({
      data: {
        merchantId: merchant.id,
        nameEn: 'Main Branch',
        nameAm: 'ዋና ቅርንጫፍ',
        city: 'Addis Ababa',
      },
    });
    return merchant;
  }

  updateStatus(id: string, status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED') {
    return this.prisma.merchant.update({
      where: { id },
      data: { status },
      select: { id: true, slug: true, nameEn: true, nameAm: true, status: true },
    });
  }
}
