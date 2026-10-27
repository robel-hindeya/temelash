// Browser-only helpers shared by the API modules.

export function getStorage() {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

export function getAppOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'https://frontend-phi-one-57.vercel.app';
}
