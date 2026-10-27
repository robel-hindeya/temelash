import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Telegram Mini App sign-in. The app receives `initData` from Telegram: URL-encoded fields plus a
 * `hash` that is an HMAC of the other fields, keyed by the bot token. Only Telegram and this server
 * know the bot token, so a valid hash proves the user id came from Telegram.
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
export interface TelegramIdentity {
  /** Telegram user id (fits in 52 bits; kept as a string to stay exact). */
  userId: string;
  firstName: string | null;
  languageCode: string | null;
  /** The `startapp` value from the link that opened the app, e.g. a merchant join reference. */
  startParam: string | null;
  authDate: Date;
}

export type InitDataCheck =
  | { ok: true; identity: TelegramIdentity }
  | { ok: false; reason: 'MALFORMED' | 'BAD_SIGNATURE' | 'EXPIRED' };

export function verifyInitData(
  initData: string,
  botToken: string,
  maxAgeSeconds: number,
  now: Date = new Date(),
): InitDataCheck {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(initData);
  } catch {
    return { ok: false, reason: 'MALFORMED' };
  }
  const hash = params.get('hash');
  if (!hash || !/^[0-9a-f]{64}$/.test(hash)) return { ok: false, reason: 'MALFORMED' };

  const checkString = [...params.entries()]
    .filter(([key]) => key !== 'hash')
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  const secret = createHmac('sha256', 'WebAppData').update(botToken).digest();
  const expected = createHmac('sha256', secret).update(checkString).digest();
  if (!timingSafeEqual(expected, Buffer.from(hash, 'hex')))
    return { ok: false, reason: 'BAD_SIGNATURE' };

  const authSeconds = Number(params.get('auth_date'));
  if (!Number.isInteger(authSeconds) || authSeconds <= 0) return { ok: false, reason: 'MALFORMED' };
  const ageSeconds = now.getTime() / 1000 - authSeconds;
  if (ageSeconds > maxAgeSeconds || ageSeconds < -300) return { ok: false, reason: 'EXPIRED' };

  let user: { id?: unknown; first_name?: unknown; language_code?: unknown };
  try {
    user = JSON.parse(params.get('user') ?? '');
  } catch {
    return { ok: false, reason: 'MALFORMED' };
  }
  if (typeof user?.id !== 'number' || !Number.isSafeInteger(user.id) || user.id <= 0) {
    return { ok: false, reason: 'MALFORMED' };
  }
  return {
    ok: true,
    identity: {
      userId: String(user.id),
      firstName: typeof user.first_name === 'string' ? user.first_name : null,
      languageCode: typeof user.language_code === 'string' ? user.language_code : null,
      startParam: params.get('start_param'),
      authDate: new Date(authSeconds * 1000),
    },
  };
}

/** Builds valid initData for tests and local simulation (the same algorithm Telegram uses). */
export function signInitData(fields: Record<string, string>, botToken: string): string {
  const checkString = Object.keys(fields)
    .sort()
    .map((key) => `${key}=${fields[key]}`)
    .join('\n');
  const secret = createHmac('sha256', 'WebAppData').update(botToken).digest();
  const hash = createHmac('sha256', secret).update(checkString).digest('hex');
  return new URLSearchParams({ ...fields, hash }).toString();
}
