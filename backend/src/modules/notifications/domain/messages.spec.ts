import {
  formatDay,
  promotionText,
  rewardExpiringText,
  rewardUnlockedText,
  stampText,
} from './messages';

describe('notification messages', () => {
  it('shows progress on the current card', () => {
    expect(
      stampText({
        merchantName: 'Buna',
        effectiveStamps: 11,
        stampsRequired: 8,
        rewardName: 'Free coffee',
      }),
    ).toBe('Stamp added at Buna: 3/8. 5 more to Free coffee.');
  });

  it('announces an unlocked reward with its last day', () => {
    expect(
      rewardUnlockedText({
        merchantName: 'Buna',
        rewardName: 'Free coffee',
        expiresAt: new Date('2026-11-05T10:00:00Z'),
      }),
    ).toBe('Free coffee at Buna is ready! Show your card at the counter. Use it by 5 Nov 2026.');
  });

  it('counts days left until expiry', () => {
    const now = new Date('2026-11-02T10:00:00Z');
    expect(
      rewardExpiringText({
        merchantName: 'Buna',
        rewardName: 'Free coffee',
        expiresAt: new Date('2026-11-05T09:00:00Z'),
        now,
      }),
    ).toBe('Reminder: your Free coffee at Buna expires in 3 days (5 Nov 2026).');
    expect(
      rewardExpiringText({
        merchantName: 'Buna',
        rewardName: null,
        expiresAt: new Date('2026-11-03T09:00:00Z'),
        now,
      }),
    ).toBe('Reminder: your reward at Buna expires tomorrow (3 Nov 2026).');
  });

  it('greets each customer by first name', () => {
    expect(
      promotionText({
        merchantName: 'Buna',
        message: '{first name}, free cookie today',
        firstName: 'Liya',
      }),
    ).toBe('Buna: Liya, free cookie today\n\nReply /stop to stop offers.');
    expect(
      promotionText({ merchantName: 'Buna', message: 'Hi {First Name}!', firstName: null }),
    ).toBe('Buna: Hi there!\n\nReply /stop to stop offers.');
  });

  it('always tells customers how to stop offers', () => {
    expect(promotionText({ merchantName: 'Buna', message: '  2-for-1 macchiato today ' })).toBe(
      'Buna: 2-for-1 macchiato today\n\nReply /stop to stop offers.',
    );
  });

  it('formats dates in UTC', () => {
    expect(formatDay(new Date('2026-12-31T23:30:00Z'))).toBe('31 Dec 2026');
  });
});
