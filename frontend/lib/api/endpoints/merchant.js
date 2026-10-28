// Merchant dashboard calls (owner/manager token unless a role is passed).
import { request } from '../http';

export const merchant = {
  // Profile
  async getProfile() {
    const profile = await request('/merchant/profile', { method: 'GET' }, 'owner');
    // Remember the merchant's real join reference: every customer QR code is built from it.
    if (profile?.joinReference && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('tm-merchant-code', profile.joinReference);
      } catch {}
    }
    return profile;
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
  // New one-time invite link for a member who has not joined yet (the old link stops working).
  reissueInvitation(id) {
    return request(`/merchant/staff/${id}/invitation`, { method: 'POST' }, 'owner');
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
  reactivateMembership(membershipId) {
    return request(`/merchant/memberships/${membershipId}/reactivate`, { method: 'POST' }, 'owner');
  },
  withdrawCustomerMarketing(customerId) {
    return request(`/merchant/customers/${customerId}/consents/marketing/withdraw`, { method: 'POST' }, 'owner');
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

  // Promotions (Telegram, opted-in customers only)
  getPromotions() {
    return request('/merchant/promotions', { method: 'GET' }, 'owner');
  },
  sendPromotion(message) {
    return request('/merchant/promotions', { method: 'POST', body: JSON.stringify({ message }) }, 'owner');
  },
};
