'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function StaffJoinFlow({ initialCode = '' }) {
  const router = useRouter();
  const [code, setCode] = useState(initialCode);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState('STAFF'); // 'STAFF' | 'MANAGER'

  useEffect(() => {
    // The invite link carries the staff member's sign-in email and, as a display hint only, the role.
    // The real role always comes from the backend after sign-in.
    if (typeof window !== 'undefined') {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const qEmail = searchParams.get('email');
        if (qEmail) setEmail(qEmail);
        if ((searchParams.get('role') || '').toLowerCase() === 'manager') setRole('MANAGER');
      } catch (e) {}
    }
    if (initialCode) setCode(initialCode);
  }, [initialCode]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    const token = (code || '').trim();
    if (token.length < 20) {
      setError('This invitation link is not valid. Ask your manager to send a new one.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter the email address your invitation was sent for.');
      return;
    }
    if (pin.length < 12 || !/[A-Za-z]/.test(pin) || !/[0-9]/.test(pin)) {
      setError('Choose a password of at least 12 characters with at least one letter and one number.');
      return;
    }

    setLoading(true);
    try {
      try {
        await api.auth.acceptInvitation(token, pin, displayName.trim() || undefined);
      } catch (acceptErr) {
        setError(
          acceptErr.status === 400
            ? 'This invitation is invalid, expired or already used, or the password is too weak. Ask your manager for a new link.'
            : acceptErr.message || 'Could not accept the invitation. Please try again.',
        );
        return;
      }

      // The invitation is accepted: sign in for real so the session carries a backend token.
      let data;
      try {
        data = await api.auth.login(email.trim(), pin);
      } catch (loginErr) {
        setError(
          `Your account is active, but signing in failed (${loginErr.message}). Sign in on the login page with ${email.trim()}.`,
        );
        return;
      }

      const backendRole = data?.user?.role;
      setRole(backendRole === 'MANAGER' || backendRole === 'OWNER' ? 'MANAGER' : 'STAFF');
      setSuccess(true);
      setTimeout(() => {
        router.push(backendRole === 'MANAGER' || backendRole === 'OWNER' ? '/business' : '/staff');
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  const isManager = role === 'MANAGER';

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
      {/* Top Bar */}
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
          }}
        >
          ← Back to home
        </Link>
      </header>

      {/* Main Container */}
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
            maxWidth: '520px',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 40px -15px rgba(16, 24, 39, 0.12), 0 0 0 1px rgba(16, 24, 39, 0.06)',
            overflow: 'hidden',
          }}
        >
          {/* Header Banner */}
          <div
            style={{
              background: isManager
                ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
                : 'linear-gradient(135deg, #101827 0%, #1e293b 100%)',
              padding: '28px 32px 24px',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: isManager ? 'rgba(99, 102, 241, 0.25)' : 'rgba(251, 169, 25, 0.2)',
                border: isManager ? '1px solid rgba(165, 180, 252, 0.4)' : '1px solid rgba(251, 169, 25, 0.4)',
                borderRadius: '999px',
                padding: '4px 14px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: isManager ? '#a5b4fc' : '#fbbf24',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              <span>{isManager ? '🛡️' : '👋'}</span>
              <span>{isManager ? 'MANAGER INVITATION ONBOARDING' : 'STAFF INVITATION ONBOARDING'}</span>
            </div>

            <h1
              style={{
                margin: '0 0 6px',
                fontSize: '24px',
                fontWeight: '800',
                lineHeight: '30px',
                color: '#ffffff',
              }}
            >
              {isManager ? 'Join as Business Manager' : 'Join the Staff Team'}
            </h1>

            <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1', lineHeight: '20px' }}>
              {isManager
                ? 'Activate your manager credentials to access the Business Dashboard, track customer visits, oversee rewards, and manage branch staff.'
                : 'Activate your staff terminal to scan customer cards, award stamps, and redeem rewards.'}
            </p>
          </div>

          {/* Form */}
          <div style={{ padding: '28px 32px' }}>
            {error && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  color: '#dc2626',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '24px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16a34a',
                    fontSize: '28px',
                  }}
                >
                  ✓
                </div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#101827' }}>
                  {isManager ? 'Manager Account Activated!' : 'Staff Terminal Activated!'}
                </h3>
                <p style={{ margin: 0, color: '#5b6475', fontSize: '14px', maxWidth: '320px' }}>
                  {isManager
                    ? 'Welcome, Manager! Opening your business dashboard...'
                    : 'Opening the QR card scanner terminal...'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Role Switcher in case user wants to toggle or verify */}
                <div
                  style={{
                    background: isManager ? '#eef2fb' : '#f8fafc',
                    border: isManager ? '1px solid #c7d7f7' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#5b6475' }}>
                      Assigned Role
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: isManager ? '#4661ad' : '#101827' }}>
                      {isManager ? '👑 Manager (Full Dashboard Access)' : '👤 Staff (POS Terminal Scanner)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRole(isManager ? 'STAFF' : 'MANAGER')}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#4661ad',
                      cursor: 'pointer',
                    }}
                  >
                    {isManager ? 'Switch to Staff' : 'Switch to Manager'}
                  </button>
                </div>

                {/* Invitation Code */}
                <div>
                  <label
                    htmlFor="staff-code"
                    style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '6px' }}
                  >
                    Invitation Code *
                  </label>
                  <input
                    id="staff-code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. hana-4811"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      background: '#f8fafc',
                      fontWeight: '600',
                    }}
                    required
                  />
                  {initialCode && (
                    <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600', marginTop: '4px', display: 'block' }}>
                      ✓ Verified invitation code loaded from link
                    </span>
                  )}
                </div>

                {/* Display Name */}
                <div>
                  <label
                    htmlFor="staff-name"
                    style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '6px' }}
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="staff-name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Hana Tadesse"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                    required
                  />
                </div>

                {/* Sign-in email */}
                <div>
                  <label
                    htmlFor="staff-email"
                    style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '6px' }}
                  >
                    Sign-in Email *
                  </label>
                  <input
                    id="staff-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* PIN / Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label
                      htmlFor="staff-pin"
                      style={{ fontSize: '13px', fontWeight: '700', color: '#101827' }}
                    >
                      {isManager ? 'Set Manager Password *' : 'Set Staff Password *'}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: '#4661ad',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {showPin ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    id="staff-pin"
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="At least 12 characters, a letter and a number"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                    required
                  />
                  <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                    {isManager
                      ? 'You will use this password to sign in to your Business Dashboard.'
                      : 'You will use this password to sign in to the QR stamp scanner.'}
                  </span>
                </div>

                {/* Destination & Access Preview */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                    {isManager ? 'Dashboard Access' : 'Terminal Destination'}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: isManager ? '#4661ad' : '#0f172a' }}>
                    {isManager ? '📊 Business Dashboard (/business)' : '☕ Bole Branch POS (/staff)'}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: isManager ? '#4661ad' : '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '15px',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: isManager
                      ? '0 4px 14px rgba(70, 97, 173, 0.3)'
                      : '0 4px 14px rgba(228, 35, 48, 0.25)',
                  }}
                >
                  {loading
                    ? 'Activating account...'
                    : isManager
                    ? 'Accept Invite & Open Dashboard →'
                    : 'Accept Invite & Open Staff Terminal →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
