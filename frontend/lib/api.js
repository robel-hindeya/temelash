/**
 * TemelashCard Client API
 * Connects frontend screens directly to NestJS backend / PostgreSQL database via /api/v1.
 */

const API_BASE = '/api/v1';

// One-click demo sign-ins for local development only. Production builds ship no demo credentials.
export const SHOW_DEMO_LOGINS = process.env.NODE_ENV !== 'production';

// Seed demo accounts matching backend .seed-output.json
export const DEMO_ACCOUNTS = SHOW_DEMO_LOGINS ? {
  owner: { email: 'owner@sample-cafe.test', password: 'password123', label: 'Sample Owner (Merchant)' },
  manager: { email: 'manager@sample-cafe.test', password: 'password123', label: 'Dawit Manager (Merchant)' },
  staff: { email: 'staff.bole@sample-cafe.test', password: 'password123', label: 'Bole Staff' },
  admin: { email: 'admin@temelashcard.test', password: 'password123', label: 'Platform Admin' },
} : {};

function getStorage() {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

export function getAppOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'https://frontend-phi-one-57.vercel.app';
}

export function getCurrentUser() {
  const s = getStorage();
  if (!s) return null;
  try {
    const raw = s.getItem('tc_current_user');
    if (raw) return JSON.parse(raw);
    for (const r of ['admin', 'owner', 'manager', 'staff']) {
      const u = s.getItem(`tc_user_${r}`);
      if (u) return JSON.parse(u);
    }
  } catch {
    return null;
  }
  return null;
}

export function getCurrentRole() {
  const s = getStorage();
  if (!s) return null;
  const active = s.getItem('tc_active_role');
  if (active) return active;
  const user = getCurrentUser();
  if (user) {
    if (user.accountType === 'PLATFORM_ADMIN' || user.role === 'PLATFORM_ADMIN' || user.role === 'ADMIN') return 'admin';
    if (user.role === 'STAFF') return 'staff';
    if (user.role === 'MANAGER') return 'manager';
    if (user.role === 'OWNER') return 'owner';
  }
  if (s.getItem('tc_token_admin')) return 'admin';
  if (s.getItem('tc_token_manager')) return 'manager';
  if (s.getItem('tc_token_owner')) return 'owner';
  if (s.getItem('tc_token_staff')) return 'staff';
  return null;
}

export function hasRolePermission(requiredRole = 'owner') {
  const s = getStorage();
  if (!s) return false;

  const user = getCurrentUser();
  const token = getStoredToken(requiredRole);

  if (!token && !user) return false;

  if (requiredRole === 'admin') {
    if (user?.accountType === 'PLATFORM_ADMIN' || user?.role === 'PLATFORM_ADMIN' || user?.role === 'ADMIN') {
      return true;
    }
    if (s.getItem('tc_token_admin')) return true;
    return false;
  }

  if (requiredRole === 'staff') {
    if (user) {
      const r = (user.role || '').toUpperCase();
      if (r === 'STAFF' || r === 'MANAGER' || r === 'OWNER') return true;
      if (user.accountType === 'PLATFORM_ADMIN') return true;
    }
    if (s.getItem('tc_token_staff') || s.getItem('tc_token_manager') || s.getItem('tc_token_owner')) return true;
    return false;
  }

  if (requiredRole === 'owner' || requiredRole === 'manager') {
    if (user) {
      const r = (user.role || '').toUpperCase();
      if (r === 'OWNER' || r === 'MANAGER') return true;
      if (user.accountType === 'PLATFORM_ADMIN') return true;
    }
    if (s.getItem('tc_token_owner')) return true;
    if (s.getItem('tc_token_manager')) return true;
    if (s.getItem('tc_registered_merchant')) return true;
    return false;
  }

  return false;
}

export function getStoredToken(role = 'owner') {
  const s = getStorage();
  if (!s) return null;

  if (role === 'owner' || role === 'manager') {
    const ownerTok = s.getItem('tc_token_owner');
    if (ownerTok) return ownerTok;
    const managerTok = s.getItem('tc_token_manager');
    if (managerTok) return managerTok;
  }

  const roleTok = s.getItem(`tc_token_${role}`);
  if (roleTok) return roleTok;

  const activeRole = s.getItem('tc_active_role');
  const user = getCurrentUser();
  const genericTok = s.getItem('tc_access_token');

  if (genericTok) {
    if (role === 'admin') {
      if (activeRole === 'admin' || user?.accountType === 'PLATFORM_ADMIN' || user?.role === 'PLATFORM_ADMIN' || user?.role === 'ADMIN') {
        return genericTok;
      }
    } else if (role === 'staff') {
      if (activeRole === 'staff' || activeRole === 'manager' || activeRole === 'owner' || ['STAFF', 'MANAGER', 'OWNER'].includes((user?.role || '').toUpperCase())) {
        return genericTok;
      }
    } else if (role === 'owner' || role === 'manager') {
      if (activeRole === 'owner' || activeRole === 'manager' || ['OWNER', 'MANAGER'].includes((user?.role || '').toUpperCase())) {
        return genericTok;
      }
    }
  }

  return null;
}

export function setStoredToken(token, role = 'owner', user = null) {
  const s = getStorage();
  if (!s) return;
  s.setItem(`tc_token_${role}`, token);
  if (role === 'manager') {
    s.setItem('tc_token_owner', token);
  }
  s.setItem('tc_access_token', token);
  s.setItem('tc_active_role', role);
  if (user) {
    s.setItem(`tc_user_${role}`, JSON.stringify(user));
    if (role === 'manager') {
      s.setItem('tc_user_owner', JSON.stringify(user));
    }
    s.setItem('tc_current_user', JSON.stringify(user));
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('tc_auth_change'));
  }
}

export function clearStoredToken(role = null) {
  const s = getStorage();
  if (!s) return;
  if (role) {
    s.removeItem(`tc_token_${role}`);
    s.removeItem(`tc_user_${role}`);
    if (s.getItem('tc_active_role') === role) {
      s.removeItem('tc_active_role');
      s.removeItem('tc_current_user');
      s.removeItem('tc_access_token');
    }
  } else {
    ['admin', 'owner', 'staff'].forEach((r) => {
      s.removeItem(`tc_token_${r}`);
      s.removeItem(`tc_user_${r}`);
    });
    s.removeItem('tc_active_role');
    s.removeItem('tc_current_user');
    s.removeItem('tc_access_token');
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('tc_auth_change'));
  }
}

export function getStoredUser(role = 'owner') {
  const s = getStorage();
  if (!s) return null;
  try {
    const raw = s.getItem(`tc_user_${role}`) || s.getItem('tc_current_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Returns stored token for the given role.
 * Does not auto-authenticate with demo accounts behind the scenes.
 */
export async function ensureAuth(role = 'owner') {
  return getStoredToken(role);
}

/**
 * Core HTTP fetch wrapper with authorization and JSON serialization.
 */
async function request(path, options = {}, role = 'owner') {
  const token = await ensureAuth(role);
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errBody = null;
    try {
      errBody = await res.json();
    } catch {
      errBody = { message: res.statusText };
    }
    const err = new Error(errBody?.error?.message || errBody?.message || `Request failed with status ${res.status}`);
    err.status = res.status;
    err.details = errBody;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json();
}

/**
 * Public request without auth token header.
 */
async function publicRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errBody = null;
    try {
      errBody = await res.json();
    } catch {
      errBody = { message: res.statusText };
    }
    const err = new Error(errBody?.error?.message || errBody?.message || `Request failed: ${res.status}`);
    err.status = res.status;
    err.details = errBody;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json();
}

// ──────────────────────────────────────────
// API CLIENT OBJECT
// ──────────────────────────────────────────

export const api = {
  auth: {
    async login(email, password) {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || err.message || 'Login failed');
      }
      const data = await res.json();
      const role = data.user?.accountType === 'PLATFORM_ADMIN' ? 'admin' : (data.user?.role === 'STAFF' ? 'staff' : 'owner');
      setStoredToken(data.accessToken, role, data.user);
      return data;
    },
    async getMe(role = 'owner') {
      return request('/auth/me', { method: 'GET' }, role);
    },
    async acceptInvitation(token, password, displayName = undefined) {
      const payload = { token, password };
      if (displayName) payload.displayName = displayName;
      return publicRequest('/auth/invitations/accept', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    logout(role = null) {
      clearStoredToken(role);
    },
  },

  merchant: {
    // Profile
    getProfile() {
      return request('/merchant/profile', { method: 'GET' }, 'owner');
    },
    updateProfile(data) {
      return request('/merchant/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }, 'owner');
    },

    // Loyalty Programs
    // Staff may read programs too (program:read), so the staff app passes its own role.
    getPrograms(status, role = 'owner') {
      const q = status ? `?status=${status}` : '';
      return request(`/merchant/programs${q}`, { method: 'GET' }, role);
    },
    getProgram(id) {
      return request(`/merchant/programs/${id}`, { method: 'GET' }, 'owner');
    },
    createProgram(data) {
      return request('/merchant/programs', {
        method: 'POST',
        body: JSON.stringify(data),
      }, 'owner');
    },
    updateProgram(id, data) {
      return request(`/merchant/programs/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }, 'owner');
    },
    activateProgram(id) {
      return request(`/merchant/programs/${id}/activate`, { method: 'POST' }, 'owner');
    },
    pauseProgram(id) {
      return request(`/merchant/programs/${id}/pause`, { method: 'POST' }, 'owner');
    },
    archiveProgram(id) {
      return request(`/merchant/programs/${id}/archive`, { method: 'POST' }, 'owner');
    },

    // Branches
    getBranches() {
      return request('/merchant/branches', { method: 'GET' }, 'owner');
    },
    getBranch(id) {
      return request(`/merchant/branches/${id}`, { method: 'GET' }, 'owner');
    },
    createBranch(data) {
      const payload = {
        nameEn: data.nameEn || data.name,
        nameAm: data.nameAm || null,
        addressText: data.addressText || data.address || null,
        city: data.city || null,
        phone: data.phone || null,
      };
      return request('/merchant/branches', {
        method: 'POST',
        body: JSON.stringify(payload),
      }, 'owner');
    },
    updateBranch(id, data) {
      const payload = {};
      if (data.nameEn || data.name) payload.nameEn = data.nameEn || data.name;
      if (data.nameAm !== undefined) payload.nameAm = data.nameAm;
      if (data.addressText !== undefined || data.address !== undefined) payload.addressText = data.addressText || data.address;
      if (data.city !== undefined) payload.city = data.city;
      if (data.phone !== undefined) payload.phone = data.phone;
      return request(`/merchant/branches/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }, 'owner');
    },
    deactivateBranch(id) {
      return request(`/merchant/branches/${id}/deactivate`, { method: 'POST' }, 'owner');
    },
    activateBranch(id) {
      return request(`/merchant/branches/${id}/activate`, { method: 'POST' }, 'owner');
    },

    // Staff
    getStaff() {
      return request('/merchant/staff', { method: 'GET' }, 'owner');
    },
    getStaffMember(id) {
      return request(`/merchant/staff/${id}`, { method: 'GET' }, 'owner');
    },
    inviteStaff(data) {
      return request('/merchant/staff', {
        method: 'POST',
        body: JSON.stringify(data),
      }, 'owner');
    },
    changeStaffRole(id, role) {
      return request(`/merchant/staff/${id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      }, 'owner');
    },
    setStaffBranches(id, branchIds) {
      return request(`/merchant/staff/${id}/branches`, {
        method: 'PUT',
        body: JSON.stringify({ branchIds }),
      }, 'owner');
    },
    deactivateStaff(id) {
      return request(`/merchant/staff/${id}/deactivate`, { method: 'POST' }, 'owner');
    },
    activateStaff(id) {
      return request(`/merchant/staff/${id}/activate`, { method: 'POST' }, 'owner');
    },

    // Customers
    getCustomers(params = {}) {
      const q = new URLSearchParams(params).toString();
      return request(`/merchant/customers${q ? `?${q}` : ''}`, { method: 'GET' }, 'owner');
    },
    getCustomer(id) {
      return request(`/merchant/customers/${id}`, { method: 'GET' }, 'owner');
    },
    deactivateMembership(membershipId) {
      return request(`/merchant/memberships/${membershipId}/deactivate`, { method: 'POST' }, 'owner');
    },

    // Analytics
    getAnalyticsOverview(params = {}) {
      const q = new URLSearchParams(params).toString();
      return request(`/merchant/analytics/overview${q ? `?${q}` : ''}`, { method: 'GET' }, 'owner');
    },
    getMonthlyReturning(params = {}) {
      const q = new URLSearchParams(params).toString();
      return request(`/merchant/analytics/monthly-returning-customers${q ? `?${q}` : ''}`, { method: 'GET' }, 'owner');
    },
    getReturningCustomers(params = {}) {
      const q = new URLSearchParams(params).toString();
      return request(`/merchant/analytics/returning-customers${q ? `?${q}` : ''}`, { method: 'GET' }, 'owner');
    },
    getBranchAnalytics(params = {}) {
      const q = new URLSearchParams(params).toString();
      return request(`/merchant/analytics/branches${q ? `?${q}` : ''}`, { method: 'GET' }, 'owner');
    },
    getStaffAnalytics(params = {}) {
      const q = new URLSearchParams(params).toString();
      return request(`/merchant/analytics/staff${q ? `?${q}` : ''}`, { method: 'GET' }, 'owner');
    },
  },

  scanner: {
    validate(data) {
      const payload = typeof data === 'string' ? { cardToken: data } : { ...data };
      if (payload.barcode && !payload.cardToken) payload.cardToken = payload.barcode;
      delete payload.barcode;
      return request('/scanner/validate', {
        method: 'POST',
        body: JSON.stringify(payload),
      }, 'staff');
    },
    stamp(data) {
      const idKey = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `stamp-${Date.now()}-${Math.random()}`;
      const payload = typeof data === 'string' ? { cardToken: data } : { ...data };
      if (payload.barcode && !payload.cardToken) payload.cardToken = payload.barcode;
      delete payload.barcode;
      return request('/scanner/stamps', {
        method: 'POST',
        headers: { 'Idempotency-Key': idKey },
        body: JSON.stringify(payload),
      }, 'staff');
    },
    lookupRewards(data) {
      const payload = typeof data === 'string' ? { cardToken: data } : { ...data };
      if (payload.barcode && !payload.cardToken) payload.cardToken = payload.barcode;
      delete payload.barcode;
      return request('/scanner/rewards/lookup', {
        method: 'POST',
        body: JSON.stringify(payload),
      }, 'staff');
    },
    redeem(data) {
      const idKey = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `redeem-${Date.now()}-${Math.random()}`;
      const payload = typeof data === 'string' ? { cardToken: data } : { ...data };
      if (payload.barcode && !payload.cardToken) payload.cardToken = payload.barcode;
      delete payload.barcode;
      return request('/scanner/redemptions', {
        method: 'POST',
        headers: { 'Idempotency-Key': idKey },
        body: JSON.stringify(payload),
      }, 'staff');
    },
  },

  public: {
    getJoinInfo(joinReference) {
      return publicRequest(`/join/${encodeURIComponent(joinReference)}`, { method: 'GET' });
    },
    enroll(joinReference, data) {
      return publicRequest(`/join/${encodeURIComponent(joinReference)}/enroll`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    getWebCard(cardToken) {
      return publicRequest('/card/web', {
        method: 'POST',
        body: JSON.stringify({ cardToken }),
      });
    },
    getWalletLink(cardToken, provider = 'GOOGLE') {
      return publicRequest('/card/wallet/links', {
        method: 'POST',
        body: JSON.stringify({ cardToken, provider }),
      });
    },
    withdrawMarketing(cardToken) {
      return publicRequest('/card/consent/marketing/withdraw', {
        method: 'POST',
        body: JSON.stringify({ cardToken }),
      });
    },
  },

  platform: {
    getMerchants() {
      return request('/platform/merchants', { method: 'GET' }, 'admin');
    },
    getMerchant(id) {
      return request(`/platform/merchants/${id}`, { method: 'GET' }, 'admin');
    },
    createMerchant(data) {
      return request('/platform/merchants', {
        method: 'POST',
        body: JSON.stringify(data),
      }, 'admin');
    },
    updateMerchantStatus(id, status) {
      return request(`/platform/merchants/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }, 'admin');
    },
    getOutboxStatus() {
      return request('/platform/outbox/status', { method: 'GET' }, 'admin');
    },
  },
};

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
export function getOrAssignMerchantCode(merchantNameOrId = null) {
  if (typeof window === 'undefined') return 'UXwJ9RwdyHs';
  try {
    const existing = window.localStorage.getItem('tm-merchant-code');
    if (existing && /^[A-Za-z0-9_-]{10,14}$/.test(existing)) {
      return existing;
    }
    const u = getCurrentUser();
    if (u?.merchantCode && /^[A-Za-z0-9_-]{10,14}$/.test(u.merchantCode)) {
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

/**
 * The single merchant loyalty card program (ID: UXwJ9RwdyHs)
 */
export const DEFAULT_MERCHANT_CARD = {
  id: 'UXwJ9RwdyHs',
  name: 'Coffee Stamp Card',
  nameAm: 'የቡና ማህተም ካርድ',
  accent: '#8a4b2a',
  icon: 'coffee',
  stampsRequired: 10,
  rewardName: 'Free macchiato',
  rewardNameAm: 'ነፃ ማኪያቶ',
  description: 'Collect 10 stamps for a fresh hot macchiato',
  isDefault: true,
};

export const DEFAULT_MERCHANT_CARDS = [DEFAULT_MERCHANT_CARD];

let _memoryMerchantCard = { ...DEFAULT_MERCHANT_CARD };

/**
 * Get the merchant's single loyalty card program
 */
export function getMerchantLoyaltyCard(cardId = null) {
  if (typeof window === 'undefined') return _memoryMerchantCard;
  try {
    const raw = window.localStorage.getItem('tm-merchant-card');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id) {
        _memoryMerchantCard = parsed;
        return parsed;
      }
    }
  } catch {}
  return _memoryMerchantCard;
}

/**
 * Get merchant loyalty cards list (returns array with the single card)
 */
export function getMerchantLoyaltyCards() {
  const card = getMerchantLoyaltyCard();
  return [card];
}

/**
 * Update the merchant's single loyalty card
 */
export function updateMerchantLoyaltyCard(cardIdOrUpdates, maybeUpdates = null) {
  const updates = (maybeUpdates && typeof maybeUpdates === 'object') ? maybeUpdates : (cardIdOrUpdates || {});
  const current = getMerchantLoyaltyCard();
  const updated = {
    ...current,
    ...updates,
    id: current.id || 'UXwJ9RwdyHs',
  };
  _memoryMerchantCard = updated;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('tm-merchant-card', JSON.stringify(updated));
      window.localStorage.setItem('tm-merchant-cards', JSON.stringify([updated]));
    } catch {}
  }
  return updated;
}

export function addMerchantLoyaltyCard(data) {
  return updateMerchantLoyaltyCard(data);
}

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

/**
 * Join a merchant's program. Returns the new card session.
 * The backend returns a card token only for a new membership; an existing member gets no token back.
 */
export async function registerCustomer({
  joinReference,
  firstName,
  phone,
  email,
  preferredLanguage = 'EN',
  marketingConsent = false,
  consentVersion,
}) {
  const name = String(firstName || '').trim();
  const cleanPhone = String(phone || '').replace(/[\s-]/g, '').trim();
  if (!name) throw new Error('Please enter your first name.');
  if (!cleanPhone) throw new Error('Please enter your phone number.');
  if (!joinReference) throw new Error('This join link is missing the shop. Please scan the shop QR code again.');

  // The backend requires an email; customers are not asked for one, so a per-phone placeholder is used.
  const digits = cleanPhone.replace(/[^0-9]/g, '');
  const payload = {
    firstName: name,
    phone: cleanPhone,
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
      throw new Error(
        'This phone number already has a card at this shop. Open it from the link you saved when you joined, or ask staff for help.',
      );
    }
    throw new Error('Could not create your card. Please try again.');
  }

  const session = { token, firstName: name, phone: cleanPhone, joinReference };
  setCustomerSession(session);
  return session;
}

export default api;
