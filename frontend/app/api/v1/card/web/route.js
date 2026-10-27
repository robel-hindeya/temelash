import { NextResponse } from 'next/server';

globalThis.__teme_server_stamps = globalThis.__teme_server_stamps || {};

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const cardToken = body.cardToken || body.barcode || body.token || 'UXwJ9RwdyHs';
    const stamps = globalThis.__teme_server_stamps[cardToken] || 0;
    const reqCount = 10;
    const unlocked = stamps >= reqCount;

    return NextResponse.json({
      merchant: { nameEn: 'Sample Cafe', nameAm: 'ሳምፕል ካፌ' },
      program: {
        nameEn: 'Coffee Stamp Card',
        nameAm: 'የቡና ማህተም ካርድ',
        brandColor: '#8a4b2a',
        termsEn: 'One stamp per visit. Valid 30 days.',
        termsAm: 'በአንድ ጉብኝት አንድ ማህተም።',
      },
      customer: { firstName: 'Member ' + String(cardToken).slice(-4), preferredLanguage: 'EN' },
      progress: {
        current: stamps,
        required: reqCount,
        remaining: Math.max(0, reqCount - stamps),
        completedCards: Math.floor(stamps / reqCount),
      },
      rewardsAvailable: unlocked ? 1 : 0,
      reward: {
        nameEn: 'Free macchiato',
        nameAm: 'ነፃ ማኪያቶ',
        descriptionEn: 'Free item when completed',
        descriptionAm: '',
      },
      status: 'ACTIVE',
      barcode: cardToken,
    });
  } catch (err) {
    return NextResponse.json({ status: 'ACTIVE', progress: { current: 0, required: 10 } });
  }
}
