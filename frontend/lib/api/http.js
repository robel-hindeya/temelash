// Fetch wrappers for the backend, reached through the Next.js /api/v1 proxy.
import { ensureAuth } from './staff-session';

export const API_BASE = '/api/v1';

/**
 * Core HTTP fetch wrapper with authorization and JSON serialization.
 */
export async function request(path, options = {}, role = 'owner') {
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
export async function publicRequest(path, options = {}) {
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
