import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const cardToken = body.cardToken || body.barcode || body.token || 'UXwJ9RwdyHs';
    
    return NextResponse.json({
      outcome: 'ELIGIBLE',
      reason: null,
      message: { en: 'Card eligible for stamping' },
      customer: { firstName: 'Member ' + String(cardToken).slice(-4) },
      progress: {
        current: 0,
        required: 10,
        remaining: 10,
        completedCards: 0,
      },
      wouldUnlockReward: false,
      replayed: false,
    });
  } catch (err) {
    return NextResponse.json({ outcome: 'ELIGIBLE', progress: { current: 0, required: 10 } });
  }
}
