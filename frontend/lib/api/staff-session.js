// Sign-in state for merchant, staff and admin users (tokens and user records in localStorage).
import { getStorage } from './browser';

// One-click demo sign-ins for local development only. Production builds ship no demo credentials.
export const SHOW_DEMO_LOGINS = process.env.NODE_ENV !== 'production';

// Seed demo accounts matching backend .seed-output.json
export const DEMO_ACCOUNTS = SHOW_DEMO_LOGINS ? {
  owner: { email: 'owner@sample-cafe.test', password: 'password123', label: 'Sample Owner (Merchant)' },
  manager: { email: 'manager@sample-cafe.test', password: 'password123', label: 'Dawit Manager (Merchant)' },
  staff: { email: 'staff.bole@sample-cafe.test', password: 'password123', label: 'Bole Staff' },
  admin: { email: 'admin@temelashcard.test', password: 'password123', label: 'Platform Admin' },
} : {};

export function getCurrentUser() {
  const s = getStorage();
  if (!s) return null;
  try {
    const raw = s.getItem('tc_current_user');
    if (raw) return JSON.parse(raw);
    for (const r of ['admin', 'owner', 'manager', 'staff']) {
      const u = s.getItem(`tc_user_${r}`);
      if (u) return JSON.parse(u);
    }
  } catch {
    return null;
  }
  return null;
}

export function getCurrentRole() {
  const s = getStorage();
  if (!s) return null;
  const active = s.getItem('tc_active_role');
  if (active) return active;
  const user = getCurrentUser();
  if (user) {
    if (user.accountType === 'PLATFORM_ADMIN' || user.role === 'PLATFORM_ADMIN' || user.role === 'ADMIN') return 'admin';
    if (user.role === 'STAFF') return 'staff';
    if (user.role === 'MANAGER') return 'manager';
    if (user.role === 'OWNER') return 'owner';
  }
  if (s.getItem('tc_token_admin')) return 'admin';
  if (s.getItem('tc_token_manager')) return 'manager';
  if (s.getItem('tc_token_owner')) return 'owner';
  if (s.getItem('tc_token_staff')) return 'staff';
  return null;
}

export function hasRolePermission(requiredRole = 'owner') {
  const s = getStorage();
  if (!s) return false;

  const user = getCurrentUser();
  const token = getStoredToken(requiredRole);

  if (!token && !user) return false;

  if (requiredRole === 'admin') {
    if (user?.accountType === 'PLATFORM_ADMIN' || user?.role === 'PLATFORM_ADMIN' || user?.role === 'ADMIN') {
      return true;
    }
    if (s.getItem('tc_token_admin')) return true;
    return false;
  }

  if (requiredRole === 'staff') {
    if (user) {
      const r = (user.role || '').toUpperCase();
      if (r === 'STAFF' || r === 'MANAGER' || r === 'OWNER') return true;
      if (user.accountType === 'PLATFORM_ADMIN') return true;
    }
    if (s.getItem('tc_token_staff') || s.getItem('tc_token_manager') || s.getItem('tc_token_owner')) return true;
    return false;
  }

  if (requiredRole === 'owner' || requiredRole === 'manager') {
    if (user) {
      const r = (user.role || '').toUpperCase();
      if (r === 'OWNER' || r === 'MANAGER') return true;
      if (user.accountType === 'PLATFORM_ADMIN') return true;
    }
    if (s.getItem('tc_token_owner')) return true;
    if (s.getItem('tc_token_manager')) return true;
    return false;
  }

  return false;
}

export function getStoredToken(role = 'owner') {
  const s = getStorage();
  if (!s) return null;

  if (role === 'owner' || role === 'manager') {
    const ownerTok = s.getItem('tc_token_owner');
    if (ownerTok) return ownerTok;
    const managerTok = s.getItem('tc_token_manager');
    if (managerTok) return managerTok;
  }

  const roleTok = s.getItem(`tc_token_${role}`);
  if (roleTok) return roleTok;

  const activeRole = s.getItem('tc_active_role');
  const user = getCurrentUser();
  const genericTok = s.getItem('tc_access_token');

  if (genericTok) {
    if (role === 'admin') {
      if (activeRole === 'admin' || user?.accountType === 'PLATFORM_ADMIN' || user?.role === 'PLATFORM_ADMIN' || user?.role === 'ADMIN') {
        return genericTok;
      }
    } else if (role === 'staff') {
      if (activeRole === 'staff' || activeRole === 'manager' || activeRole === 'owner' || ['STAFF', 'MANAGER', 'OWNER'].includes((user?.role || '').toUpperCase())) {
        return genericTok;
      }
    } else if (role === 'owner' || role === 'manager') {
      if (activeRole === 'owner' || activeRole === 'manager' || ['OWNER', 'MANAGER'].includes((user?.role || '').toUpperCase())) {
        return genericTok;
      }
    }
  }

  return null;
}

export function setStoredToken(token, role = 'owner', user = null) {
  const s = getStorage();
  if (!s) return;
  s.setItem(`tc_token_${role}`, token);
  if (role === 'manager') {
    s.setItem('tc_token_owner', token);
  }
  s.setItem('tc_access_token', token);
  s.setItem('tc_active_role', role);
  if (user) {
    s.setItem(`tc_user_${role}`, JSON.stringify(user));
    if (role === 'manager') {
      s.setItem('tc_user_owner', JSON.stringify(user));
    }
    s.setItem('tc_current_user', JSON.stringify(user));
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('tc_auth_change'));
  }
}

export function clearStoredToken(role = null) {
  const s = getStorage();
  if (!s) return;
  if (role) {
    s.removeItem(`tc_token_${role}`);
    s.removeItem(`tc_user_${role}`);
    if (s.getItem('tc_active_role') === role) {
      s.removeItem('tc_active_role');
      s.removeItem('tc_current_user');
      s.removeItem('tc_access_token');
    }
  } else {
    ['admin', 'owner', 'staff'].forEach((r) => {
      s.removeItem(`tc_token_${r}`);
      s.removeItem(`tc_user_${r}`);
    });
    s.removeItem('tc_active_role');
    s.removeItem('tc_current_user');
    s.removeItem('tc_access_token');
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('tc_auth_change'));
  }
}

export function getStoredUser(role = 'owner') {
  const s = getStorage();
  if (!s) return null;
  try {
    const raw = s.getItem(`tc_user_${role}`) || s.getItem('tc_current_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Returns stored token for the given role.
 * Does not auto-authenticate with demo accounts behind the scenes.
 */
export async function ensureAuth(role = 'owner') {
  return getStoredToken(role);
}
