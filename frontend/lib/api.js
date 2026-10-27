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

export function getCurrentUser() {
  const s = getStorage();
  if (!s) return null;
  try {
    const raw = s.getItem('tc_current_user');
    if (raw) return JSON.parse(raw);
    for (const r of ['admin', 'owner', 'staff']) {
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
    if (user.role === 'OWNER' || user.role === 'MANAGER') return 'owner';
  }
  if (s.getItem('tc_token_admin')) return 'admin';
  if (s.getItem('tc_token_staff')) return 'staff';
  if (s.getItem('tc_token_owner')) return 'owner';
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
    if (s.getItem('tc_token_staff') || s.getItem('tc_token_owner')) return true;
    return false;
  }

  if (requiredRole === 'owner') {
    if (user) {
      const r = (user.role || '').toUpperCase();
      if (r === 'OWNER' || r === 'MANAGER') return true;
      if (user.accountType === 'PLATFORM_ADMIN') return true;
    }
    if (s.getItem('tc_token_owner')) return true;
    if (s.getItem('tc_registered_merchant')) return true;
    return false;
  }

  return false;
}

export function getStoredToken(role = 'owner') {
  const s = getStorage();
  if (!s) return null;

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
      if (activeRole === 'staff' || activeRole === 'owner' || ['STAFF', 'MANAGER', 'OWNER'].includes((user?.role || '').toUpperCase())) {
        return genericTok;
      }
    } else if (role === 'owner') {
      if (activeRole === 'owner' || ['OWNER', 'MANAGER'].includes((user?.role || '').toUpperCase())) {
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
  s.setItem('tc_access_token', token);
  s.setItem('tc_active_role', role);
  if (user) {
    s.setItem(`tc_user_${role}`, JSON.stringify(user));
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

export default api;
