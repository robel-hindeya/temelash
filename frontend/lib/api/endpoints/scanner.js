// Staff scanner: validate, stamp, look up and redeem rewards.
import { request } from '../http';

export const scanner = {
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
};
