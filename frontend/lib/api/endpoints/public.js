// Public customer calls: join page, enrollment, phone + PIN sign-in, web card, wallet, consent.
import { publicRequest } from '../http';

export const publicApi = {
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
  signIn(joinReference, data) {
    return publicRequest(`/join/${encodeURIComponent(joinReference)}/sign-in`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  telegramSession(joinReference, initData) {
    return publicRequest(`/join/${encodeURIComponent(joinReference)}/telegram/session`, {
      method: 'POST',
      body: JSON.stringify({ initData }),
    });
  },
  telegramJoin(joinReference, data) {
    return publicRequest(`/join/${encodeURIComponent(joinReference)}/telegram/join`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  /** "Register your business": a pending application an admin reviews. */
  applyAsMerchant(data) {
    return publicRequest('/merchant-applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  withdrawMarketing(cardToken) {
    return publicRequest('/card/consent/marketing/withdraw', {
      method: 'POST',
      body: JSON.stringify({ cardToken }),
    });
  },
};
