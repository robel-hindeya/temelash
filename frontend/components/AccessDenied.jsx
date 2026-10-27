'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/AuthModal';
import api, { clearStoredToken, getCurrentUser, getCurrentRole } from '@/lib/api';

const ROLE_INFO = {
  admin: {
    title: 'Platform Administrator Permission Required',
    badge: 'PLATFORM ADMIN',
    requiredKey: 'PLATFORM_ADMIN',
    summary: 'This route is reserved for Temelash Card platform administrators.',
    scope: 'System administration, merchant approvals, global billing, and platform settings.',
    allowedRoles: ['PLATFORM_ADMIN', 'ADMIN'],
  },
  staff: {
    title: 'Staff Terminal Permission Required',
    badge: 'STAFF TERMINAL',
    requiredKey: 'STAFF',
    summary: 'This route is reserved for branch staff and cashiers.',
    scope: 'Scanning customer cards, issuing loyalty stamps, and redeeming customer rewards.',
    allowedRoles: ['STAFF', 'MANAGER', 'OWNER'],
  },
  owner: {
    title: 'Merchant Owner Permission Required',
    badge: 'MERCHANT DASHBOARD',
    requiredKey: 'OWNER',
    summary: 'This route is reserved for merchant business owners and managers.',
    scope: 'Configuring loyalty cards, branch locations, staff members, and business analytics.',
    allowedRoles: ['OWNER', 'MANAGER'],
  },
};

export default function AccessDenied({
  requiredRole = 'admin',
  currentPath = '',
  onSuccessAuth,
}) {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = getCurrentUser();
  const activeRole = getCurrentRole();
  const roleMeta = ROLE_INFO[requiredRole] || ROLE_INFO.admin;

  const handleSignOut = () => {
    clearStoredToken(null);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f7f9',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, -apple-system, sans-serif",
        color: '#101827',
      }}
    >
      {/* Top Header */}
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e3e5ec',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#101827' }}
        >
          <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
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
          <span style={{ fontWeight: '800', letterSpacing: '0.02em', fontSize: '15px' }}>
            TEMELASH <span style={{ color: '#e42330' }}>CARD</span>
          </span>
        </Link>
        <Link
          href="/"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#5b6475',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← Return to Home
        </Link>
      </header>

      {/* Main Blocked Container */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 16px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '560px',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 40px -15px rgba(16, 24, 39, 0.12), 0 0 0 1px rgba(16, 24, 39, 0.06)',
            overflow: 'hidden',
          }}
        >
          {/* Card Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #101827 0%, #1e293b 100%)',
              padding: '28px 32px 24px',
              color: '#ffffff',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(228, 35, 48, 0.2)',
                border: '1px solid rgba(228, 35, 48, 0.4)',
                borderRadius: '999px',
                padding: '4px 14px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: '#ff6b75',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              <span>🔒</span>
              <span>ACCESS RESTRICTED · PERMISSION REQUIRED</span>
            </div>

            <h1
              style={{
                margin: '0 0 8px',
                fontSize: '24px',
                fontWeight: '800',
                lineHeight: '30px',
                color: '#ffffff',
              }}
            >
              {roleMeta.title}
            </h1>

            <p style={{ margin: 0, fontSize: '15px', color: '#94a3b8', lineHeight: '22px' }}>
              {roleMeta.summary}
            </p>
          </div>

          {/* Details Body */}
          <div style={{ padding: '28px 32px' }}>
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '18px 20px',
                marginBottom: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Requested URL
                </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    fontWeight: '700',
                    background: '#e2e8f0',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    color: '#0f172a',
                  }}
                >
                  {currentPath || (requiredRole === 'admin' ? '/admin' : requiredRole === 'staff' ? '/staff' : '/business')}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Required Permission
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '800',
                    color: '#e42330',
                    background: '#fff1f2',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    border: '1px solid #fecdd3',
                  }}
                >
                  {roleMeta.requiredKey}
                </span>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Permission Scope
                </span>
                <span style={{ fontSize: '13px', color: '#334155', lineHeight: '18px' }}>
                  {roleMeta.scope}
                </span>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Current Authentication State
                </span>
                {user ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '999px', background: '#f59e0b' }} />
                    <span style={{ fontSize: '13px', color: '#334155' }}>
                      Signed in as <strong>{user.displayName || user.email}</strong>{' '}
                      <span style={{ color: '#64748b', fontSize: '12px' }}>({user.role || user.accountType || activeRole || 'Unknown'})</span>
                    </span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '999px', background: '#ef4444' }} />
                    <span style={{ fontSize: '13px', color: '#64748b' }}>
                      Not signed in (Anonymous guest). Please authenticate with an authorized account.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Explanatory Alert */}
            <div
              style={{
                background: '#fff7ed',
                border: '1px solid #ffedd5',
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '16px' }}>⚠️</span>
              <div style={{ fontSize: '13px', color: '#9a3412', lineHeight: '18px' }}>
                {user ? (
                  <span>
                    Your current account does not have permission to access this page. Please sign in with an account assigned the <strong>{roleMeta.badge}</strong> role.
                  </span>
                ) : (
                  <span>
                    Direct access without verified credentials is prohibited. Sign in using an account with <strong>{roleMeta.badge}</strong> access to continue.
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                style={{
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '15px',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(228, 35, 48, 0.3)',
                  transition: 'background 0.15s ease',
                }}
              >
                <span>🔑</span>
                <span>{user ? 'Switch Account / Sign In as Authorized User' : `Sign In with ${roleMeta.badge} Account`}</span>
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  style={{
                    flex: 1,
                    background: '#ffffff',
                    color: '#334155',
                    fontWeight: '700',
                    fontSize: '14px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  Return to Home
                </button>

                {user && (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    style={{
                      background: '#f1f5f9',
                      color: '#dc2626',
                      fontWeight: '700',
                      fontSize: '14px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                    }}
                  >
                    Sign Out
                  </button>
                )}
              </div>

              {/* Quick shortcut if user has access to another dashboard */}
              {user && (
                <div style={{ marginTop: '4px', textAlign: 'center' }}>
                  {activeRole === 'owner' && requiredRole !== 'owner' && (
                    <Link
                      href="/business"
                      style={{ fontSize: '13px', fontWeight: '700', color: '#4661ad', textDecoration: 'none' }}
                    >
                      ← Go back to your Business Dashboard
                    </Link>
                  )}
                  {activeRole === 'staff' && requiredRole !== 'staff' && (
                    <Link
                      href="/staff"
                      style={{ fontSize: '13px', fontWeight: '700', color: '#4661ad', textDecoration: 'none' }}
                    >
                      ← Go back to Staff Scanner App
                    </Link>
                  )}
                </div>
              )}
            </div>

            <p style={{ margin: '20px 0 0', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
              Temelash Card Security · Unauthorized access attempts are monitored and recorded.
            </p>
          </div>
        </div>
      </main>

      {/* Embedded Login Modal when user clicks Sign In */}
      {showLoginModal && (
        <AuthModal
          isOpen={true}
          initialTab="signin"
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            if (onSuccessAuth) {
              onSuccessAuth();
            } else if (typeof window !== 'undefined') {
              window.location.reload();
            }
          }}
        />
      )}
    </div>
  );
}
