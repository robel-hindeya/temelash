import { NextResponse } from 'next/server';

globalThis.__teme_server_stamps = globalThis.__teme_server_stamps || {};

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const cardToken = body.cardToken || body.barcode || body.token || 'UXwJ9RwdyHs';
    const count = Math.max(1, Number(body.count) || 1);
    const cardId = body.cardId || 'UXwJ9RwdyHs';
    const userId = body.userId || cardToken;

    const key = `${cardId}_${userId}`;
    const prev = globalThis.__teme_server_stamps[key] || 0;
    const newTotal = prev + count;
    globalThis.__teme_server_stamps[key] = newTotal;
    globalThis.__teme_server_stamps[cardToken] = newTotal;
    globalThis.__teme_server_stamps[cardId] = newTotal;

    // Async sync to cloud KV
    try {
      const cleanKey = `stamp_${cardId}_${userId}`.replace(/[^a-zA-Z0-9_-]/g, '_');
      fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/dev93l7w/${cleanKey}/${newTotal}`, {
        method: 'POST',
      }).catch(() => null);
    } catch {}

    const reqCount = 10;
    const unlocked = newTotal >= reqCount;

    return NextResponse.json({
      outcome: 'STAMPED',
      reason: null,
      message: { en: unlocked ? 'Reward unlocked!' : 'Stamp added successfully' },
      customer: { firstName: 'Member ' + String(cardToken).slice(-4) },
      stamp: { id: `st_${Date.now()}`, occurredAt: new Date().toISOString() },
      progress: {
        current: newTotal,
        required: reqCount,
        remaining: Math.max(0, reqCount - newTotal),
        completedCards: Math.floor(newTotal / reqCount),
      },
      reward: {
        unlocked,
        nameEn: 'Free macchiato',
        nameAm: 'ነፃ ማኪያቶ',
      },
      replayed: false,
    });
  } catch (err) {
    return NextResponse.json({ outcome: 'STAMPED', progress: { current: 1, required: 10 } });
  }
}
