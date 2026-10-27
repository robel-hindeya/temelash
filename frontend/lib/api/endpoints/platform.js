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
  getOutboxStatus() {
    return request('/platform/outbox/status', { method: 'GET' }, 'admin');
  },
};
