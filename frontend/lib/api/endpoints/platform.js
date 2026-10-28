// Platform admin calls.
import { request } from '../http';

export const platform = {
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
  /** Totals, today's activity, 7-day stamps, 8-week new businesses, service status. */
  getOverview() {
    return request('/platform/overview', { method: 'GET' }, 'admin');
  },
  getApplications(status) {
    const q = status ? `?status=${status}` : '';
    return request(`/platform/applications${q}`, { method: 'GET' }, 'admin');
  },
  /** Creates the business + owner invitation; returns { invitationToken, ownerEmail, expiresInDays }. */
  approveApplication(id) {
    return request(`/platform/applications/${id}/approve`, { method: 'POST' }, 'admin');
  },
  rejectApplication(id, reason) {
    return request(`/platform/applications/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    }, 'admin');
  },
};
