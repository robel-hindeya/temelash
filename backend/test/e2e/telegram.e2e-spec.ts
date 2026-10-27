import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { signInitData } from '../../src/modules/telegram';
import { World, createActiveProgram, createWorld, randomPhone } from '../support/auth-fixture';

const BOT_TOKEN = '123456:e2e-test-bot-token';
const WEBHOOK_SECRET = 'e2e-webhook-secret-123456';

describe('Telegram Mini App card (e2e, real PostgreSQL)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let w: World;
  let nextUserId = 900_000_000 + Math.floor(Math.random() * 1_000_000);
  const http = () => request(app.getHttpServer());

  beforeAll(async () => {
    // Config is read when the app module loads, so set Telegram up before importing it.
    process.env.TELEGRAM_BOT_TOKEN = BOT_TOKEN;
    process.env.TELEGRAM_WEBHOOK_SECRET = WEBHOOK_SECRET;
    process.env.TELEGRAM_API_BASE = 'http://127.0.0.1:9'; // bot replies fail fast; they are best effort
    prisma = new PrismaClient();
    w = await createWorld(prisma);
    await createActiveProgram(prisma, w.a.merchantId);
    await createActiveProgram(prisma, w.b.merchantId);
    const { createTestApp } = await import('../support/create-test-app');
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  const newUser = () => (nextUserId += 1);
  const initData = (userId: number, token = BOT_TOKEN) =>
    signInitData(
      {
        auth_date: String(Math.floor(Date.now() / 1000)),
        user: JSON.stringify({ id: userId, first_name: 'Selam', language_code: 'en' }),
      },
      token,
    );
  const session = (ref: string, userId: number) =>
    http().post(`/api/v1/join/${ref}/telegram/session`).send({ initData: initData(userId) });
  const join = (ref: string, userId: number, over: Record<string, unknown> = {}) =>
    http()
      .post(`/api/v1/join/${ref}/telegram/join`)
      .send({ initData: initData(userId), ...over });
  const shareContact = (userId: number, phone: string, contactUserId = userId) =>
    http()
      .post('/api/v1/telegram/webhook')
      .set('X-Telegram-Bot-Api-Secret-Token', WEBHOOK_SECRET)
      .send({
        message: {
          chat: { id: userId },
          from: { id: userId, is_bot: false },
          contact: { phone_number: phone.replace(/^0/, '251'), user_id: contactUserId },
        },
      });
  const webCard = (token: string) => http().post('/api/v1/card/web').send({ cardToken: token });

  it('ignores webhook calls without the secret', async () => {
    await http().post('/api/v1/telegram/webhook').send({}).expect(404);
    await http()
      .post('/api/v1/telegram/webhook')
      .set('X-Telegram-Bot-Api-Secret-Token', 'wrong-secret-wrong-secret')
      .send({})
      .expect(404);
  });

  it('refuses initData that Telegram did not sign', async () => {
    const res = await http()
      .post(`/api/v1/join/${w.a.joinReference}/telegram/session`)
      .send({ initData: initData(newUser(), '999:someone-else') })
      .expect(401);
    expect(res.body.error.code).toBe('TELEGRAM_AUTH_FAILED');
  });

  it('asks for the phone, joins with the shared number, then signs in with a fresh token', async () => {
    const user = newUser();
    const phone = randomPhone();
    expect((await session(w.a.joinReference, user).expect(200)).body.status).toBe('NEEDS_PHONE');
    const notYet = await join(w.a.joinReference, user).expect(409);
    expect(notYet.body.error.code).toBe('PHONE_NOT_VERIFIED');

    await shareContact(user, phone).expect(200);
    const ready = await session(w.a.joinReference, user).expect(200);
    expect(ready.body.status).toBe('READY_TO_JOIN');
    expect(ready.body.phone).toMatch(new RegExp(`${phone.slice(-3)}$`));

    const joined = await join(w.a.joinReference, user).expect(200);
    expect(joined.body.status).toBe('CREATED');
    expect(joined.body.customer.firstName).toBe('Selam');
    const first: string = joined.body.card.token;
    await webCard(first).expect(200);

    const again = await session(w.a.joinReference, user).expect(200);
    expect(again.body.status).toBe('SIGNED_IN');
    await webCard(again.body.card.token).expect(200);
    await webCard(first).expect(404);
  });

  it('never accepts a contact that is not the sender’s own number', async () => {
    const user = newUser();
    await shareContact(user, randomPhone(), newUser()).expect(200);
    expect((await session(w.a.joinReference, user).expect(200)).body.status).toBe('NEEDS_PHONE');
  });

  it('links an existing web card by its phone and keeps that card', async () => {
    const phone = randomPhone();
    const web = await http()
      .post(`/api/v1/join/${w.a.joinReference}/enroll`)
      .send({
        phone,
        firstName: 'Hanna',
        email: `hanna-${phone}@example.com`,
        preferredLanguage: 'EN',
        acceptTerms: true,
        pin: '482915',
      })
      .expect(201);
    const user = newUser();
    await shareContact(user, phone).expect(200);
    const linked = await join(w.a.joinReference, user).expect(200);
    expect(linked.body.status).toBe('EXISTING');
    expect(linked.body.customer.firstName).toBe('Hanna');
    await webCard(linked.body.card.token).expect(200);
    await webCard(web.body.card.token).expect(404);
    // The web fallback still works for the same customer.
    await http()
      .post(`/api/v1/join/${w.a.joinReference}/sign-in`)
      .send({ phone, pin: '482915' })
      .expect(200);
  });

  it('never moves a card to a second Telegram account', async () => {
    const phone = randomPhone();
    const owner = newUser();
    const intruder = newUser();
    await shareContact(owner, phone).expect(200);
    await join(w.a.joinReference, owner).expect(200);
    await shareContact(intruder, phone).expect(200);
    const res = await join(w.a.joinReference, intruder).expect(409);
    expect(res.body.error.code).toBe('TELEGRAM_CONFLICT');
  });

  it('keeps each merchant’s card separate for one Telegram user', async () => {
    const user = newUser();
    await shareContact(user, randomPhone()).expect(200);
    await join(w.a.joinReference, user).expect(200);
    expect((await session(w.b.joinReference, user).expect(200)).body.status).toBe('READY_TO_JOIN');
  });
});
