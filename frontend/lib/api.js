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
// CUSTOMER AUTH & DATA REGISTRY
// ──────────────────────────────────────────

/**
 * Get list of all customers enrolled in this merchant's loyalty program
 */
export function getRegisteredCustomers() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem('tm-merchant-customers');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

/**
 * Save / update customer in the merchant's customer registry
 */
export function saveRegisteredCustomer(customer) {
  if (typeof window === 'undefined' || !customer) return;
  try {
    const existing = getRegisteredCustomers();
    const idx = existing.findIndex((c) => (customer.phone && c.phone === customer.phone) || (customer.id && c.id === customer.id));
    const updatedCustomer = {
      ...customer,
      updatedAt: new Date().toISOString(),
    };
    let list;
    if (idx >= 0) {
      list = existing.map((c, i) => (i === idx ? { ...c, ...updatedCustomer } : c));
    } else {
      list = [updatedCustomer, ...existing];
    }
    window.localStorage.setItem('tm-merchant-customers', JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('tm-customers-updated', { detail: list }));
  } catch {}
}

/**
 * Get active customer session (if customer is logged in on this browser)
 */
export function getCustomerSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem('tm-customer-session');
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

/**
 * Set active customer session (or null on logout)
 */
export function setCustomerSession(user) {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      window.localStorage.setItem('tm-customer-session', JSON.stringify(user));
      window.localStorage.setItem('tm-user-code', user.id || user.userId);
      window.localStorage.setItem('tm-customer-id', user.id || user.userId);
      window.localStorage.setItem('tm-customer-token', user.token || user.id);
    } else {
      window.localStorage.removeItem('tm-customer-session');
    }
    window.dispatchEvent(new CustomEvent('tm-customer-session-change', { detail: user }));
  } catch {}
}

/**
 * Customer sign-out: logs user out without deleting their account or stamps
 */
export function logoutCustomer() {
  setCustomerSession(null);
}

/**
 * Customer registration with phone and password
 * Automatically derives email (user never enters email)
 */
export async function registerCustomer({ firstName, phone, password }) {
  if (!phone || !password) throw new Error('Phone number and password are required');
  const cleanPhone = String(phone).replace(/[\s-]/g, '').trim();
  const digitsOnly = cleanPhone.replace(/[^0-9]/g, '');
  
  // Auto-generate email without asking user
  const autoEmail = `${digitsOnly || 'user'}@customer.temelash.et`;
  const name = (firstName || 'Customer').trim();
  const userId = getOrAssignUserCode();
  const token = userId;

  const newCustomer = {
    id: userId,
    firstName: name,
    phone: cleanPhone,
    email: autoEmail,
    password: String(password).trim(),
    token,
    stamps: 0,
    visits: 1,
    joinedAt: new Date().toISOString(),
    status: 'ACTIVE',
  };

  if (typeof window !== 'undefined') {
    try {
      const accountsRaw = window.localStorage.getItem('tm-customer-accounts') || '{}';
      const accounts = JSON.parse(accountsRaw);
      accounts[cleanPhone] = newCustomer;
      accounts[digitsOnly] = newCustomer;
      window.localStorage.setItem('tm-customer-accounts', JSON.stringify(accounts));
    } catch {}
  }

  // Cloud KV backup for cross-device authentication
  try {
    const cleanKey = `user_acc_${digitsOnly}`.replace(/[^a-zA-Z0-9_-]/g, '_');
    fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${CLOUD_SYNC_APP_KEY}/${cleanKey}/${encodeURIComponent(JSON.stringify(newCustomer))}`, {
      method: 'POST',
    }).catch(() => null);
  } catch {}

  // Save to merchant registry and create session
  saveRegisteredCustomer(newCustomer);
  setCustomerSession(newCustomer);

  // Auto-enroll in backend database if reachable
  try {
    api.public.enroll('sample-cafe', {
      firstName: name,
      phone: cleanPhone,
      email: autoEmail,
      acceptTerms: true,
      preferredLanguage: 'EN',
      marketingConsent: true,
    }).catch(() => null);
  } catch {}

  return newCustomer;
}

/**
 * Customer login with phone and password
 */
export async function loginCustomer({ phone, password }) {
  if (!phone || !password) throw new Error('Phone number and password are required');
  const cleanPhone = String(phone).replace(/[\s-]/g, '').trim();
  const digitsOnly = cleanPhone.replace(/[^0-9]/g, '');
  const pass = String(password).trim();

  let user = null;
  if (typeof window !== 'undefined') {
    try {
      const accountsRaw = window.localStorage.getItem('tm-customer-accounts') || '{}';
      const accounts = JSON.parse(accountsRaw);
      user = accounts[cleanPhone] || accounts[digitsOnly] || null;
    } catch {}
  }

  // Fallback to cloud KV if on a different device
  if (!user) {
    try {
      const cleanKey = `user_acc_${digitsOnly}`.replace(/[^a-zA-Z0-9_-]/g, '_');
      const res = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${CLOUD_SYNC_APP_KEY}/${cleanKey}`);
      if (res.ok) {
        const raw = await res.text();
        const clean = (raw || '').replace(/^"|"$/g, '').trim();
        user = JSON.parse(decodeURIComponent(clean));
      }
    } catch {}
  }

  if (!user) {
    throw new Error('No account found for this phone number. Please click "New Member? Join" to create your card.');
  }

  if (user.password && user.password !== pass) {
    throw new Error('Incorrect password. Please try again.');
  }

  setCustomerSession(user);
  saveRegisteredCustomer(user);
  return user;
}

let _memoryStamps = {};
export const CLOUD_SYNC_APP_KEY = 'dev93l7w';

function getStampStorageKeys(cardId, userId) {
  const keys = [];
  if (cardId && userId) keys.push(`tm-stamps-${cardId}-${userId}`);
  if (userId) keys.push(`tm-stamps-${userId}`);
  if (cardId) keys.push(`tm-stamps-${cardId}`);
  return keys;
}

/**
 * Broadcast channel for instant cross-tab / cross-window sync on the same device
 */
let _loyaltyBroadcastChannel = null;
function getLoyaltyChannel() {
  if (typeof window === 'undefined' || typeof window.BroadcastChannel === 'undefined') return null;
  if (!_loyaltyBroadcastChannel) {
    try {
      _loyaltyBroadcastChannel = new window.BroadcastChannel('teme_loyalty_sync');
    } catch {
      _loyaltyBroadcastChannel = null;
    }
  }
  return _loyaltyBroadcastChannel;
}

/**
 * Fetch stamp count from cloud KV store for cross-device real-time sync
 */
export async function fetchCloudCardStamps(cardId, userId) {
  if (!cardId && !userId) return null;
  const cleanKey = (cardId && userId ? `stamp_${cardId}_${userId}` : `stamp_${userId || cardId}`).replace(/[^a-zA-Z0-9_-]/g, '_');
  try {
    const res = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${CLOUD_SYNC_APP_KEY}/${cleanKey}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const raw = await res.text();
      const clean = (raw || '').replace(/"/g, '').trim();
      const num = parseInt(clean, 10);
      if (!isNaN(num) && num >= 0) {
        // Cache locally
        const memKey = cardId && userId ? `${cardId}-${userId}` : cardId || userId || 'default';
        _memoryStamps[memKey] = num;
        if (typeof window !== 'undefined') {
          const keys = getStampStorageKeys(cardId, userId);
          keys.forEach((k) => {
            try { window.localStorage.setItem(k, String(num)); } catch {}
          });
        }
        return num;
      }
    }
  } catch (e) {
    // Graceful offline fallback
  }
  return null;
}

/**
 * Save stamp count to cloud KV store for cross-device real-time sync
 */
export async function syncCardStampsToCloud(cardId, userId, stamps) {
  if (!cardId && !userId) return;
  const val = String(Math.max(0, Number(stamps) || 0));
  const keysToUpdate = [];
  if (cardId && userId) {
    keysToUpdate.push(`stamp_${cardId}_${userId}`);
  }
  if (userId) {
    keysToUpdate.push(`stamp_${userId}`);
  }
  if (cardId && !userId) {
    keysToUpdate.push(`stamp_${cardId}`);
  }

  for (const k of keysToUpdate) {
    const cleanKey = k.replace(/[^a-zA-Z0-9_-]/g, '_');
    try {
      fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${CLOUD_SYNC_APP_KEY}/${cleanKey}/${val}`, {
        method: 'POST',
      }).catch(() => null);
    } catch {}
  }
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
  const memKey = cardId && userId ? `${cardId}-${userId}` : cardId || userId || 'default';
  return _memoryStamps[memKey] || 0;
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

      // 1. Dispatch custom event for same window
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

      // 2. Broadcast across tabs/windows
      const channel = getLoyaltyChannel();
      if (channel) {
        channel.postMessage({
          type: 'STAMP_RECORDED',
          cardId,
          userId: userId || cardToken,
          cardToken,
          count: addCount,
          newStamps: newTotal,
          maxStamps,
          timestamp: Date.now(),
        });
      }
    } catch {}
  }

  // 3. Sync to cloud KV store for cross-device support (fire-and-forget)
  syncCardStampsToCloud(cardId, userId || cardToken, newTotal);

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
      const channel = getLoyaltyChannel();
      if (channel) {
        channel.postMessage({
          type: 'STAMPS_RESET',
          cardId,
          userId,
          newStamps: 0,
          timestamp: Date.now(),
        });
      }
    } catch {}
  }

  syncCardStampsToCloud(cardId, userId, 0);

  return 0;
}

export default api;



