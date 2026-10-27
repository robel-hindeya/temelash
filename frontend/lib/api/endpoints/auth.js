// Merchant, staff and admin sign-in, plus staff invitation acceptance.
import { API_BASE, publicRequest, request } from '../http';
import { clearStoredToken, setStoredToken } from '../staff-session';

export const auth = {
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
};
