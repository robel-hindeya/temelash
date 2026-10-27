/**
 * The card PIN lets a customer reopen their card on a new device with phone + PIN. Six digits, so it is
 * as familiar as a mobile-money PIN; guessing is held back by the per-customer lockout below and the
 * per-IP rate limit on the public card routes.
 */
export const PIN_MAX_FAILED_ATTEMPTS = 5;
export const PIN_LOCK_MINUTES = 15;

export function isWellFormedPin(pin: string): boolean {
  return /^\d{6}$/.test(pin);
}

/** Rejects the PINs people guess first: one repeated digit and straight runs (123456, 654321). */
export function isGuessablePin(pin: string): boolean {
  if (/^(\d)\1{5}$/.test(pin)) return true;
  const steps = new Set<number>();
  for (let i = 1; i < pin.length; i++) steps.add(Number(pin[i]) - Number(pin[i - 1]));
  return steps.size === 1 && (steps.has(1) || steps.has(-1));
}
