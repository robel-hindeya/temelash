import { getStorage } from './browser';
import { api } from './client';

// ──────────────────────────────────────────
// CUSTOMER CARD SESSION
// ──────────────────────────────────────────
//
// A customer has no password. The backend issues an opaque card token at enrollment; this browser keeps
// that token (and the first name and phone the customer typed) so the card opens again on the next visit.
// Stamps and rewards always come from the backend web card, never from local storage.

const CUSTOMER_SESSION_KEY = 'tm-customer-session';

// Keys written by the old client-side account system, which kept plaintext passwords and local stamp counts.
const LEGACY_CUSTOMER_KEYS = [
  'tm-customer-accounts',
  'tm-merchant-customers',
  'tm-customer-id',
  'tm-user-code',
  'tm-last-stamp-time',
];

function purgeLegacyCustomerData(s) {
  try {
    LEGACY_CUSTOMER_KEYS.forEach((k) => s.removeItem(k));
    for (let i = s.length - 1; i >= 0; i--) {
      const k = s.key(i);
      if (k && k.startsWith('tm-stamps-')) s.removeItem(k);
    }
  } catch {}
}

/**
 * The card session on this browser: { token, firstName, phone, joinReference }, or null.
 */
export function getCustomerSession() {
  const s = getStorage();
  if (!s) return null;
  purgeLegacyCustomerData(s);
  try {
    const raw = s.getItem(CUSTOMER_SESSION_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    // Sessions from the old account system carry a password and a client-made token: drop them.
    if (!parsed || parsed.password !== undefined || typeof parsed.token !== 'string' || parsed.token.length < 20) {
      if (raw) s.removeItem(CUSTOMER_SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setCustomerSession(session) {
  const s = getStorage();
  if (!s) return;
  try {
    if (session) {
      const { token, firstName, phone, joinReference } = session;
      s.setItem(CUSTOMER_SESSION_KEY, JSON.stringify({ token, firstName, phone, joinReference }));
      s.setItem('tm-customer-token', token);
    } else {
      s.removeItem(CUSTOMER_SESSION_KEY);
      s.removeItem('tm-customer-token');
    }
    window.dispatchEvent(new CustomEvent('tm-customer-session-change', { detail: session }));
  } catch {}
}

/**
 * Forget the card on this browser. The membership and its stamps stay in the backend.
 */
export function logoutCustomer() {
  setCustomerSession(null);
}

/** Six digits, and not one repeated digit or a straight run: the same rule the backend enforces. */
export function checkCardPin(pin) {
  const p = String(pin || '');
  if (!/^\d{6}$/.test(p)) return 'Your PIN must be exactly 6 digits.';
  if (/^(\d)\1{5}$/.test(p)) return 'Choose a PIN that is not one repeated digit.';
  const steps = new Set();
  for (let i = 1; i < p.length; i++) steps.add(Number(p[i]) - Number(p[i - 1]));
  if (steps.size === 1 && (steps.has(1) || steps.has(-1))) return 'Choose a PIN that is not a straight run like 123456.';
  return null;
}

/**
 * Join a merchant's program. Returns the new card session.
 * The backend returns a card token only for a new membership; an existing member gets no token back.
 * The PIN lets the customer reopen the card later with their phone number.
 */
export async function registerCustomer({
  joinReference,
  firstName,
  phone,
  pin,
  email,
  preferredLanguage = 'EN',
  marketingConsent = false,
  consentVersion,
}) {
  const name = String(firstName || '').trim();
  const cleanPhone = String(phone || '').replace(/[\s-]/g, '').trim();
  if (!name) throw new Error('Please enter your first name.');
  if (!cleanPhone) throw new Error('Please enter your phone number.');
  const pinProblem = checkCardPin(pin);
  if (pinProblem) throw new Error(pinProblem);
  if (!joinReference) throw new Error('This join link is missing the shop. Please scan the shop QR code again.');

  // The backend requires an email; customers are not asked for one, so a per-phone placeholder is used.
  const digits = cleanPhone.replace(/[^0-9]/g, '');
  const payload = {
    firstName: name,
    phone: cleanPhone,
    pin: String(pin),
    email: email || `${digits}@customer.temelash.et`,
    preferredLanguage,
    acceptTerms: true,
    marketingConsent: !!marketingConsent,
  };
  if (consentVersion) payload.consentVersion = consentVersion;

  const res = await api.public.enroll(joinReference, payload);
  const token = res?.card?.token;
  if (!token) {
    if (res?.status === 'EXISTING') {
      const err = new Error('This phone number already has a card here. Sign in with your phone number and PIN instead.');
      err.code = 'ALREADY_MEMBER';
      throw err;
    }
    throw new Error('Could not create your card. Please try again.');
  }

  const session = { token, firstName: name, phone: cleanPhone, joinReference };
  setCustomerSession(session);
  return session;
}

/**
 * Reopen a card on this device with phone + PIN. The backend issues a fresh card token, so a copy of
 * the card on a lost or old phone stops working.
 */
export async function signInCustomer({ joinReference, phone, pin }) {
  const cleanPhone = String(phone || '').replace(/[\s-]/g, '').trim();
  if (!cleanPhone) throw new Error('Please enter your phone number.');
  if (!/^\d{6}$/.test(String(pin || ''))) throw new Error('Enter your 6-digit PIN.');
  if (!joinReference) throw new Error('This link is missing the shop. Please scan the shop QR code again.');

  const res = await api.public.signIn(joinReference, { phone: cleanPhone, pin: String(pin) });
  const token = res?.card?.token;
  if (!token) throw new Error('Could not open your card. Please try again.');
  const session = { token, firstName: res.customer?.firstName || '', phone: cleanPhone, joinReference };
  setCustomerSession(session);
  return session;
}
