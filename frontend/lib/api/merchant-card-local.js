// Legacy card settings kept in the merchant's browser (name, colour, reward copy). Customers never see
// these: the customer card reads the program from the backend.

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
