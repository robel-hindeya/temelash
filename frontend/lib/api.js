/**
 * TemelashCard Client API
 * Connects frontend screens directly to NestJS backend / PostgreSQL database via /api/v1.
 */

const API_BASE = '/api/v1';

// Seed demo accounts matching backend .seed-output.json
export const DEMO_ACCOUNTS = {
  owner: { email: 'owner@sample-cafe.test', password: 'password123', label: 'Sample Owner (Merchant)' },
  staff: { email: 'staff.bole@sample-cafe.test', password: 'password123', label: 'Bole Staff' },
  admin: { email: 'admin@temelashcard.test', password: 'password123', label: 'Platform Admin' },
};

function getStorage() {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

export function getStoredToken(role = 'owner') {
  const s = getStorage();
  if (!s) return null;
  return s.getItem(`tc_token_${role}`) || s.getItem('tc_access_token');
}

export function setStoredToken(token, role = 'owner', user = null) {
  const s = getStorage();
  if (!s) return;
  s.setItem(`tc_token_${role}`, token);
  s.setItem('tc_access_token', token);
  if (user) {
    s.setItem(`tc_user_${role}`, JSON.stringify(user));
    s.setItem('tc_current_user', JSON.stringify(user));
  }
}

export function clearStoredToken(role = 'owner') {
  const s = getStorage();
  if (!s) return;
  s.removeItem(`tc_token_${role}`);
  s.removeItem(`tc_user_${role}`);
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
 * Ensures a valid token exists for the given role, logging in automatically if not cached.
 */
export async function ensureAuth(role = 'owner') {
  let token = getStoredToken(role);
  if (token) return token;

  const creds = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.owner;
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    if (res.ok) {
      const data = await res.json();
      setStoredToken(data.accessToken, role, data.user);
      return data.accessToken;
    }
  } catch (err) {
    console.warn(`Failed to auto-authenticate as ${role}:`, err);
  }
  return null;
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
    logout(role = 'owner') {
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

export default api;
