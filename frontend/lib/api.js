/**
 * TemelashCard Client API
 * Connects frontend screens directly to NestJS backend / PostgreSQL database via /api/v1.
 */

const API_BASE = '/api/v1';

// Seed demo accounts matching backend .seed-output.json
export const DEMO_ACCOUNTS = {
  owner: { email: 'owner@sample-cafe.test', password: 'password123', label: 'Sample Owner (Merchant)' },
  manager: { email: 'manager@sample-cafe.test', password: 'password123', label: 'Dawit Manager (Merchant)' },
  staff: { email: 'staff.bole@sample-cafe.test', password: 'password123', label: 'Bole Staff' },
  admin: { email: 'admin@temelashcard.test', password: 'password123', label: 'Platform Admin' },
};

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
    getPrograms(status) {
      const q = status ? `?status=${status}` : '';
      return request(`/merchant/programs${q}`, { method: 'GET' }, 'owner');
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
 * Default merchant loyalty cards if none saved
 */
export const DEFAULT_MERCHANT_CARDS = [
  {
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
  },
  {
    id: 'kP7mQ9xRtL2',
    name: 'Pastry & Breakfast Card',
    nameAm: 'የቁርስ እና ኬክ ካርድ',
    accent: '#c2410c',
    icon: 'croissant',
    stampsRequired: 8,
    rewardName: 'Free croissant or pastry',
    rewardNameAm: 'ነፃ ክሩአሳን ወይም ኬክ',
    description: '8 morning visits earns any specialty pastry',
    isDefault: false,
  },
  {
    id: 'mK7vB2xP9Lq',
    name: 'Lunch Combo Loyalty',
    nameAm: 'የምሳ ኮምቦ ካርድ',
    accent: '#2f6b4f',
    icon: 'fork',
    stampsRequired: 6,
    rewardName: 'Free combo meal',
    rewardNameAm: 'ነፃ የምሳ ኮምቦ ምግብ',
    description: 'Order 6 lunch combos and get the 7th on the house',
    isDefault: false,
  },
];

let _memoryMerchantCards = [...DEFAULT_MERCHANT_CARDS];

/**
 * Get all loyalty cards for the merchant
 */
export function getMerchantLoyaltyCards() {
  if (typeof window === 'undefined') return _memoryMerchantCards;
  try {
    const raw = window.localStorage.getItem('tm-merchant-cards');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        _memoryMerchantCards = parsed;
        return parsed;
      }
    }
    window.localStorage.setItem('tm-merchant-cards', JSON.stringify(DEFAULT_MERCHANT_CARDS));
    return DEFAULT_MERCHANT_CARDS;
  } catch {
    return _memoryMerchantCards;
  }
}

/**
 * Add a new loyalty card with an assigned 11-character ID like UXwJ9RwdyHs
 */
export function addMerchantLoyaltyCard(data) {
  const cards = getMerchantLoyaltyCards();
  const id = data?.id || generateShortId(11);
  const newCard = {
    id,
    name: data?.name || 'New Loyalty Card',
    nameAm: data?.nameAm || 'አዲስ የማህተም ካርድ',
    accent: data?.accent || '#4661ad',
    icon: data?.icon || 'star',
    stampsRequired: Number(data?.stampsRequired) || 10,
    rewardName: data?.rewardName || 'Special Reward',
    rewardNameAm: data?.rewardNameAm || 'ልዩ ሽልማት',
    description: data?.description || 'Collect stamps to unlock rewards',
    isDefault: false,
    createdAt: new Date().toISOString(),
  };
  const updated = [...cards, newCard];
  _memoryMerchantCards = updated;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('tm-merchant-cards', JSON.stringify(updated));
    } catch {}
  }
  return newCard;
}

/**
 * Update an existing loyalty card by its 11-char ID
 */
export function updateMerchantLoyaltyCard(cardId, updates) {
  const cards = getMerchantLoyaltyCards();
  const updated = cards.map((c) => (c.id === cardId ? { ...c, ...updates } : c));
  _memoryMerchantCards = updated;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('tm-merchant-cards', JSON.stringify(updated));
    } catch {}
  }
  return updated.find((c) => c.id === cardId) || null;
}

/**
 * Get a specific loyalty card by its 11-char ID
 */
export function getMerchantLoyaltyCard(cardId) {
  if (!cardId) return null;
  const cards = getMerchantLoyaltyCards();
  return cards.find((c) => c.id === cardId) || null;
}

let _memoryStamps = {};

function getStampStorageKeys(cardId, userId) {
  const keys = [];
  if (cardId && userId) keys.push(`tm-stamps-${cardId}-${userId}`);
  if (userId) keys.push(`tm-stamps-${userId}`);
  if (cardId) keys.push(`tm-stamps-${cardId}`);
  return keys;
}

/**
 * Get current recorded stamp count for a user and loyalty card
 */
export function getUserCardStamps(cardId, userId) {
  if (typeof window === 'undefined') {
    const key = cardId && userId ? `${cardId}-${userId}` : cardId || userId || 'default';
    return _memoryStamps[key] || 0;
  }
  try {
    const keys = getStampStorageKeys(cardId, userId);
    for (const k of keys) {
      const val = window.localStorage.getItem(k);
      if (val !== null && val !== undefined) {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 0) return num;
      }
    }
  } catch {}
  return 0;
}

/**
 * Record stamps added by staff scanner for a user's loyalty card
 */
export function recordCardStamp({ cardId, userId, cardToken, count = 1, maxStamps = 10 }) {
  const addCount = Math.max(1, Number(count) || 1);
  const cur = getUserCardStamps(cardId, userId || cardToken);
  const newTotal = cur + addCount;

  const memKey = cardId && (userId || cardToken) ? `${cardId}-${userId || cardToken}` : cardId || userId || cardToken || 'default';
  _memoryStamps[memKey] = newTotal;

  if (typeof window !== 'undefined') {
    try {
      const keys = getStampStorageKeys(cardId, userId || cardToken);
      if (cardToken && !keys.includes(`tm-stamps-${cardToken}`)) {
        keys.push(`tm-stamps-${cardToken}`);
      }
      keys.forEach((k) => {
        window.localStorage.setItem(k, String(newTotal));
      });
      window.localStorage.setItem('tm-last-stamp-time', String(Date.now()));

      window.dispatchEvent(
        new CustomEvent('teme-card-stamp-updated', {
          detail: {
            cardId,
            userId: userId || cardToken,
            cardToken,
            count: addCount,
            newStamps: newTotal,
            maxStamps,
          },
        })
      );
    } catch {}
  }
  return newTotal;
}

/**
 * Reset stamps upon reward redemption
 */
export function resetUserCardStamps(cardId, userId) {
  const memKey = cardId && userId ? `${cardId}-${userId}` : cardId || userId || 'default';
  _memoryStamps[memKey] = 0;

  if (typeof window !== 'undefined') {
    try {
      const keys = getStampStorageKeys(cardId, userId);
      keys.forEach((k) => {
        window.localStorage.setItem(k, '0');
      });
      window.dispatchEvent(
        new CustomEvent('teme-card-stamp-updated', {
          detail: { cardId, userId, count: 0, newStamps: 0 },
        })
      );
    } catch {}
  }
  return 0;
}

export default api;


