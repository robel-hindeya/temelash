import { randomUUID } from 'node:crypto';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { World, bearer, createWorld, login } from '../support/auth-fixture';
import { createTestApp } from '../support/create-test-app';

describe('Platform overview and business applications (e2e, real PostgreSQL)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let w: World;
  let admin: string;
  let owner: string;
  const http = () => request(app.getHttpServer());
  const email = () => `applicant-${randomUUID().slice(0, 8)}@example.com`;
  const apply = (over: Record<string, unknown> = {}) =>
    http()
      .post('/api/v1/merchant-applications')
      .send({
        businessName: 'Buna House',
        category: 'Cafe',
        city: 'Addis Ababa',
        contactName: 'Liya Tesfaye',
        email: email(),
        phone: '0911234567',
        ...over,
      });

  beforeAll(async () => {
    prisma = new PrismaClient();
    w = await createWorld(prisma);
    app = await createTestApp();
    admin = bearer(await login(app, w.platformAdmin.email));
    owner = bearer(await login(app, w.a.owner.email));
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('turns an application into a live business whose owner can sign in', async () => {
    const applicant = email();
    const created = await apply({ email: applicant }).expect(201);
    expect(created.body.status).toBe('PENDING');

    const pending = await http()
      .get('/api/v1/platform/applications?status=PENDING')
      .set('Authorization', admin)
      .expect(200);
    expect(pending.body.map((a: { id: string }) => a.id)).toContain(created.body.id);

    const approved = await http()
      .post(`/api/v1/platform/applications/${created.body.id}/approve`)
      .set('Authorization', admin)
      .expect(200);
    expect(approved.body.ownerEmail).toBe(applicant);
    const merchant = await prisma.merchant.findUniqueOrThrow({
      where: { id: approved.body.merchantId },
    });
    expect(merchant.nameEn).toBe('Buna House');
    expect(merchant.slug).toMatch(/^buna-house/);

    await http()
      .post('/api/v1/auth/invitations/accept')
      .send({ token: approved.body.invitationToken, password: 'Owner-Password-2026' })
      .expect(204);
    const signedIn = await http()
      .post('/api/v1/auth/login')
      .send({ email: applicant, password: 'Owner-Password-2026' })
      .expect(200);
    const me = await http()
      .get('/api/v1/merchant/profile')
      .set('Authorization', `Bearer ${signedIn.body.accessToken}`)
      .expect(200);
    expect(me.body.nameEn).toBe('Buna House');

    // Decided applications cannot be decided again.
    await http()
      .post(`/api/v1/platform/applications/${created.body.id}/reject`)
      .set('Authorization', admin)
      .send({ reason: 'Too late' })
      .expect(409);
  });

  it('rejects with a reason and creates nothing', async () => {
    const before = await prisma.merchant.count();
    const created = await apply().expect(201);
    await http()
      .post(`/api/v1/platform/applications/${created.body.id}/reject`)
      .set('Authorization', admin)
      .send({ reason: 'We could not verify the business.' })
      .expect(204);
    const row = await prisma.merchantApplication.findUniqueOrThrow({
      where: { id: created.body.id },
    });
    expect(row).toMatchObject({
      status: 'REJECTED',
      rejectionReason: 'We could not verify the business.',
    });
    expect(await prisma.merchant.count()).toBe(before);
  });

  it('accepts one pending application per email and refuses an email that already has an account', async () => {
    const same = email();
    await apply({ email: same }).expect(201);
    expect((await apply({ email: same }).expect(409)).body.error.code).toBe('APPLICATION_PENDING');

    const taken = await apply({ email: w.a.owner.email }).expect(201);
    const res = await http()
      .post(`/api/v1/platform/applications/${taken.body.id}/approve`)
      .set('Authorization', admin)
      .expect(409);
    expect(res.body.error.code).toBe('EMAIL_IN_USE');
  });

  it('validates the public form', async () => {
    await apply({ email: 'not-an-email' }).expect(400);
    await apply({ businessName: '' }).expect(400);
    await apply({ phone: '12' }).expect(400);
  });

  it('shows real platform totals and charts to admins only', async () => {
    const res = await http()
      .get('/api/v1/platform/overview')
      .set('Authorization', admin)
      .expect(200);
    expect(res.body.merchants.total).toBe(await prisma.merchant.count());
    expect(res.body.pendingApplications).toBe(
      await prisma.merchantApplication.count({ where: { status: 'PENDING' } }),
    );
    expect(res.body.stampsByDay).toHaveLength(7);
    expect(res.body.newMerchantsByWeek).toHaveLength(8);
    expect(res.body.services).toEqual(
      expect.objectContaining({ telegram: expect.any(Boolean), appleWallet: expect.any(Boolean) }),
    );

    await http().get('/api/v1/platform/overview').set('Authorization', owner).expect(403);
    await http().get('/api/v1/platform/applications').set('Authorization', owner).expect(403);
    await http().get('/api/v1/platform/overview').expect(401);
  });
});
