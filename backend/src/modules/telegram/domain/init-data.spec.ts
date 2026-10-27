import { signInitData, verifyInitData } from './init-data';

describe('Telegram initData verification', () => {
  const token = '123456:test-bot-token';
  const now = new Date('2026-10-27T12:00:00Z');
  const authDate = String(Math.floor(now.getTime() / 1000) - 60);
  const fields = {
    auth_date: authDate,
    query_id: 'AAH',
    start_param: 'UXwJ9RwdyHs',
    user: JSON.stringify({ id: 777000123, first_name: 'Liya', language_code: 'am' }),
  };

  it('accepts data signed with the bot token and reads the user', () => {
    const res = verifyInitData(signInitData(fields, token), token, 86400, now);
    expect(res).toEqual({
      ok: true,
      identity: {
        userId: '777000123',
        firstName: 'Liya',
        languageCode: 'am',
        startParam: 'UXwJ9RwdyHs',
        authDate: new Date(Number(authDate) * 1000),
      },
    });
  });

  it('rejects data signed with another bot token', () => {
    const res = verifyInitData(signInitData(fields, '999:other'), token, 86400, now);
    expect(res).toEqual({ ok: false, reason: 'BAD_SIGNATURE' });
  });

  it('rejects any changed field, such as a swapped user id', () => {
    const signed = new URLSearchParams(signInitData(fields, token));
    signed.set('user', JSON.stringify({ id: 1, first_name: 'Liya' }));
    expect(verifyInitData(signed.toString(), token, 86400, now)).toEqual({
      ok: false,
      reason: 'BAD_SIGNATURE',
    });
  });

  it('rejects stale sign-ins', () => {
    const old = { ...fields, auth_date: String(Math.floor(now.getTime() / 1000) - 90000) };
    expect(verifyInitData(signInitData(old, token), token, 86400, now)).toEqual({
      ok: false,
      reason: 'EXPIRED',
    });
  });

  it('rejects malformed input', () => {
    for (const bad of [
      '',
      'hash=zz',
      'user=x&auth_date=1',
      `${signInitData({ auth_date: authDate }, token)}`,
    ]) {
      expect(verifyInitData(bad, token, 86400, now).ok).toBe(false);
    }
  });
});
