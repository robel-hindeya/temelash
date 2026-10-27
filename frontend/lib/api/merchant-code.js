// Merchant join reference (used in every customer QR code) and generated short ids.
import { getAppOrigin } from './browser';
import { getCurrentUser } from './staff-session';

/**
 * Generate an 11-character URL-safe alphanumeric ID like 'UXwJ9RwdyHs'
 * Matches base62 / nanoid(11) structure.
 */
export function generateShortId(length = 11) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const values = new Uint8Array(length);
    crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      result += chars[values[i] % chars.length];
    }
    return result;
  }
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/**
 * Get or assign the merchant's 11-character code like 'UXwJ9RwdyHs'
 */
const JOIN_REFERENCE = /^[A-Za-z0-9_-]{6,80}$/;

/**
 * The one link every customer QR code points to: the merchant's public landing page, where customers
 * join or sign back in before their card opens.
 */
export function getMerchantJoinUrl() {
  return `${getAppOrigin()}/p/${encodeURIComponent(getOrAssignMerchantCode())}`;
}

export function getOrAssignMerchantCode(merchantNameOrId = null) {
  if (typeof window === 'undefined') return 'UXwJ9RwdyHs';
  try {
    const existing = window.localStorage.getItem('tm-merchant-code');
    if (existing && JOIN_REFERENCE.test(existing)) {
      return existing;
    }
    const u = getCurrentUser();
    if (u?.merchantCode && JOIN_REFERENCE.test(u.merchantCode)) {
      window.localStorage.setItem('tm-merchant-code', u.merchantCode);
      return u.merchantCode;
    }
    // Canonical 11-char default code
    const code = 'UXwJ9RwdyHs';
    window.localStorage.setItem('tm-merchant-code', code);
    return code;
  } catch {
    return 'UXwJ9RwdyHs';
  }
}

/**
 * Get or assign the user/customer's 11-character ID like 'UXwJ9RwdyHs'
 */
export function getOrAssignUserCode() {
  if (typeof window === 'undefined') return generateShortId(11);
  try {
    const existing = window.localStorage.getItem('tm-user-code') || window.localStorage.getItem('tm-customer-id');
    if (existing && /^[A-Za-z0-9_-]{10,14}$/.test(existing) && !existing.startsWith('TC-')) {
      return existing;
    }
    const newCode = generateShortId(11);
    window.localStorage.setItem('tm-user-code', newCode);
    window.localStorage.setItem('tm-customer-id', newCode);
    return newCode;
  } catch {
    return generateShortId(11);
  }
}
