'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { hasRolePermission } from '@/lib/api';
import AccessDenied from './AccessDenied';

export default function AuthGuard({ requiredRole = 'owner', children }) {
  const pathname = usePathname();
  const [status, setStatus] = useState('checking'); // 'checking' | 'authorized' | 'unauthorized'

  const check = useCallback(() => {
    if (typeof window === 'undefined') return;
    const allowed = hasRolePermission(requiredRole);
    setStatus(allowed ? 'authorized' : 'unauthorized');
  }, [requiredRole]);

  useEffect(() => {
    check();

    const handleAuthChange = () => check();
    window.addEventListener('tc_auth_change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('tc_auth_change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [check]);

  // Prevent flash of protected content during initial check
  if (status === 'checking') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#f7f7f9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
          color: '#5b6475',
          gap: '16px',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <path
            d="M5 11 L15 23 L25 11"
            fill="none"
            stroke="#fba919"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 29 L25 17 L35 29"
            fill="none"
            stroke="#e42330"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ fontSize: '14px', fontWeight: '600' }}>Verifying permissions...</span>
      </div>
    );
  }

  // Block the page if unauthorized and tell permission
  if (status === 'unauthorized') {
    return (
      <AccessDenied
        requiredRole={requiredRole}
        currentPath={pathname}
        onSuccessAuth={check}
      />
    );
  }

  // Render protected content only when authorized
  return <>{children}</>;
}
