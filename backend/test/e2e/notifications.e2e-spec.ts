import { randomUUID } from 'node:crypto';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { OutboxWorker } from '../../src/modules/jobs';
import { CardNotifications } from '../../src/modules/notifications';
import {
  TestCard,
  World,
  bearer,
  createActiveProgram,
  createCard,
  createWorld,
  login,
} from '../support/auth-fixture';

const BOT_TOKEN = '123456:e2e-notify-bot';
const WEBHOOK_SECRET = 'e2e-notify-webhook-secret';

/** Stands in for api.telegram.org: records every sendMessage and answers with `status`. */
class FakeTelegram {
  sent: Array<{ chat_id: string | number; text: string; reply_markup?: unknown }> = [];
  status = 200;
  server: Server = createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      if (req.url === `/bot${BOT_TOKEN}/sendMessage` && this.status === 200)
        this.sent.push(JSON.parse(body));
      res.writeHead(this.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: this.status === 200 }));
    });
  });
  to(chat: number) {
    return this.sent.filter((m) => String(m.chat_id) === String(chat)).map((m) => m.text);
  }
}

describe('Telegram notifications and promotions (e2e, real PostgreSQL)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let w: World;
  let program: { id: string };
  let worker: OutboxWorker;
  let tg: FakeTelegram;
  let manager: string;
  let staff: string;
  let nextTelegramId = 800_000_000 + Math.floor(Math.random() * 1_000_000);
  const saved: Record<string, string | undefined> = {};
  const http = () => request(app.getHttpServer());

  beforeAll(async () => {
    tg = new FakeTelegram();
    await new Promise<void>((r) => tg.server.listen(0, '127.0.0.1', r));
    const port = (tg.server.address() as AddressInfo).port;
    for (const [k, v] of Object.entries({
      TELEGRAM_BOT_TOKEN: BOT_TOKEN,
      TELEGRAM_WEBHOOK_SECRET: WEBHOOK_SECRET,
      TELEGRAM_API_BASE: `http://127.0.0.1:${port}`,
      TELEGRAM_MINI_APP_URL: 'https://app.example.test/tg',
    })) {
      saved[k] = process.env[k];
      process.env[k] = v;
    }
    prisma = new PrismaClient();
    // Jobs left over from other test files are none of this suite's business.
    await prisma.outboxJob.updateMany({
      where: { status: { in: ['PENDING', 'FAILED', 'PROCESSING'] } },
      data: { status: 'COMPLETED' },
    });
    w = await createWorld(prisma);
    program = await createActiveProgram(prisma, w.a.merchantId, {
      stampsRequired: 2,
      cooldownMinutes: 0,
    });
    // Rewards stay valid for 2 days, so every unlock falls inside the 3-day reminder window.
    await prisma.rewardDefinition.updateMany({
      where: { programId: program.id },
      data: { validForDays: 2 },
    });
    const { createTestApp } = await import('../support/create-test-app');
    app = await createTestApp();
    worker = app.get(OutboxWorker);
    manager = bearer(await login(app, w.a.manager.email));
    staff = bearer(await login(app, w.a.staff1.email));
  });

  afterAll(async () => {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
    await app.close();
    await prisma.$disconnect();
    tg.server.close();
  });

  beforeEach(async () => {
    await drain();
    tg.sent = [];
    tg.status = 200;
  });

  const drain = async () => {
    for (let i = 0; i < 20; i++) if ((await worker.processBatch(100)).claimed === 0) break;
  };
  /** A card whose customer uses Telegram, optionally opted in to offers. */
  const telegramCard = async (optIn = false): Promise<TestCard & { telegramId: number }> => {
    const card = await createCard(prisma, w.a.merchantId, program.id, 'Liya');
    const telegramId = (nextTelegramId += 1);
    await prisma.customer.update({
      where: { id: card.customerId },
      data: { telegramUserId: BigInt(telegramId) },
    });
    if (optIn) {
      await prisma.customerConsent.create({
        data: {
          merchantId: w.a.merchantId,
          customerId: card.customerId,
          type: 'MARKETING',
          action: 'GRANTED',
          version: 'test',
          source: 'JOIN_FORM',
        },
      });
    }
    return { ...card, telegramId };
  };
  const stamp = (token: string) =>
    http()
      .post('/api/v1/scanner/stamps')
      .set('Authorization', staff)
      .set('Idempotency-Key', randomUUID())
      .send({ cardToken: token, branchId: w.a.branches[0] })
      .expect(200);

  it('tells a Telegram customer about each stamp, once, with an Open my card button', async () => {
    const c = await telegramCard();
    await stamp(c.token);
    await drain();
    await drain();
    expect(tg.to(c.telegramId)).toEqual([
      'Stamp added at ' + (await merchantName()) + ': 1/2. 1 more to Free item.',
    ]);
    expect(JSON.stringify(tg.sent[0]?.reply_markup)).toContain(
      `https://app.example.test/tg?m=${encodeURIComponent(w.a.joinReference)}`,
    );
  });

  it('announces an unlocked reward instead of the stamp that completed the card', async () => {
    const c = await telegramCard();
    await stamp(c.token);
    await stamp(c.token);
    await drain();
    const texts = tg.to(c.telegramId);
    expect(texts).toHaveLength(2);
    expect(texts[1]).toMatch(
      /^Free item at .+ is ready! Show your card at the counter\. Use it by \d+ \w{3} \d{4}\.$/,
    );
  });

  it('sends nothing to customers without Telegram', async () => {
    const plain = await createCard(prisma, w.a.merchantId, program.id, 'NoTelegram');
    await stamp(plain.token);
    await drain();
    expect(tg.sent).toEqual([]);
  });

  it('retries a temporary Telegram failure and never sends twice', async () => {
    const c = await telegramCard();
    tg.status = 502;
    await stamp(c.token);
    await drain();
    expect(tg.to(c.telegramId)).toEqual([]);
    tg.status = 200;
    await prisma.outboxJob.updateMany({
      where: { status: 'FAILED' },
      data: { nextRunAt: new Date() },
    });
    await drain();
    await drain();
    expect(tg.to(c.telegramId)).toHaveLength(1);
  });

  it('reminds once about a reward that expires within 3 days', async () => {
    const c = await telegramCard();
    await stamp(c.token);
    await stamp(c.token);
    await drain();
    tg.sent = [];
    const notifications = app.get(CardNotifications);
    expect(await notifications.sendExpiryReminders()).toBeGreaterThanOrEqual(1);
    expect(tg.to(c.telegramId)).toEqual([
      expect.stringMatching(/^Reminder: your Free item at .+ expires/),
    ]);
    await notifications.sendExpiryReminders();
    expect(tg.to(c.telegramId)).toHaveLength(1);
  });

  it('sends promotions only to opted-in Telegram customers, once a day, and honours /stop', async () => {
    const yes = await telegramCard(true);
    const no = await telegramCard(false);
    const before = await http()
      .get('/api/v1/merchant/promotions')
      .set('Authorization', manager)
      .expect(200);
    expect(before.body.reach).toBeGreaterThanOrEqual(1);
    expect(before.body.telegramEnabled).toBe(true);

    // Branch staff may read but not send.
    await http()
      .post('/api/v1/merchant/promotions')
      .set('Authorization', staff)
      .send({ message: 'Hi' })
      .expect(403);
    const sent = await http()
      .post('/api/v1/merchant/promotions')
      .set('Authorization', manager)
      .send({ message: 'Two-for-one macchiato today' })
      .expect(202);
    expect(sent.body.audienceSize).toBe(before.body.reach);
    await drain();
    expect(tg.to(yes.telegramId)).toEqual([
      expect.stringMatching(/: Two-for-one macchiato today\n\nReply \/stop to stop offers\.$/),
    ]);
    expect(tg.to(no.telegramId)).toEqual([]);

    const again = await http()
      .post('/api/v1/merchant/promotions')
      .set('Authorization', manager)
      .send({ message: 'Another one' })
      .expect(429);
    expect(again.body.error.code).toBe('PROMOTION_TOO_SOON');

    const overview = await http()
      .get('/api/v1/merchant/promotions')
      .set('Authorization', manager)
      .expect(200);
    expect(overview.body.nextAllowedAt).not.toBeNull();
    expect(overview.body.recent[0]).toMatchObject({
      message: 'Two-for-one macchiato today',
      sent: sent.body.audienceSize,
    });

    await http()
      .post('/api/v1/telegram/webhook')
      .set('X-Telegram-Bot-Api-Secret-Token', WEBHOOK_SECRET)
      .send({
        message: { chat: { id: yes.telegramId }, from: { id: yes.telegramId }, text: '/stop' },
      })
      .expect(200);
    expect(tg.to(yes.telegramId).at(-1)).toMatch(/^Done: you will not get offers any more/);
    const after = await http()
      .get('/api/v1/merchant/promotions')
      .set('Authorization', manager)
      .expect(200);
    expect(after.body.reach).toBe(before.body.reach - 1);
  });

  async function merchantName() {
    return (await prisma.merchant.findUniqueOrThrow({ where: { id: w.a.merchantId } })).nameEn;
  }
});
