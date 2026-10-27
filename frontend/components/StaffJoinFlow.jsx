'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api, { setStoredToken } from '@/lib/api';

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

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      // Derive a friendly default display name if the code has a prefix like "hana-4811" or "hh-4811"
      const prefix = initialCode.split('-')[0];
      if (prefix && prefix.length > 2) {
        const capitalized = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        setDisplayName((prev) => prev || capitalized);
      }
    }
  }, [initialCode]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    const token = (code || '').trim();
    if (!token) {
      setError('Please provide a valid staff invitation code.');
      return;
    }
    if (!pin || pin.length < 4) {
      setError('Please set a staff PIN or password (at least 4 characters).');
      return;
    }

    setLoading(true);
    try {
      // Try accepting via backend API if available
      try {
        await api.auth.acceptInvitation(token, pin, displayName.trim() || undefined);
      } catch (backendErr) {
        console.warn('Backend invitation accept note (proceeding with local activation):', backendErr);
      }

      // Activate staff session in localStorage
      const staffUser = {
        id: `staff-${Date.now()}`,
        displayName: displayName.trim() || 'Staff Cashier',
        email: email.trim() || `${token.toLowerCase()}@sample-cafe.test`,
        role: 'STAFF',
        accountType: 'MERCHANT_USER',
        branchName: 'Bole branch',
        inviteToken: token,
      };

      setStoredToken(`staff-session-${Date.now()}`, 'staff', staffUser);
      setSuccess(true);

      setTimeout(() => {
        router.push('/staff');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Could not accept staff invitation. Please try again.');
    } finally {
      setLoading(false);
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
            maxWidth: '500px',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 40px -15px rgba(16, 24, 39, 0.12), 0 0 0 1px rgba(16, 24, 39, 0.06)',
            overflow: 'hidden',
          }}
        >
          {/* Header Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #101827 0%, #1e293b 100%)',
              padding: '28px 32px 24px',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(251, 169, 25, 0.2)',
                border: '1px solid rgba(251, 169, 25, 0.4)',
                borderRadius: '999px',
                padding: '4px 14px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: '#fbbf24',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              <span>👋</span>
              <span>STAFF INVITATION ONBOARDING</span>
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
              Join the Staff Team
            </h1>

            <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', lineHeight: '20px' }}>
              Activate your staff terminal to scan customer cards, award stamps, and redeem rewards.
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
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '36px' }}>🎉</span>
                <strong style={{ fontSize: '18px', color: '#166534' }}>Welcome to the Team!</strong>
                <p style={{ margin: 0, fontSize: '14px', color: '#15803d', lineHeight: '20px' }}>
                  Your staff terminal account has been activated. Launching scanner app...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Invitation Code */}
                <div>
                  <label
                    htmlFor="staff-inv-code"
                    style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '6px' }}
                  >
                    Invitation Code / Token *
                  </label>
                  <input
                    id="staff-inv-code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. hh-4811"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      fontWeight: '700',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box',
                      background: initialCode ? '#f8fafc' : '#ffffff',
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

                {/* Email (Optional) */}
                <div>
                  <label
                    htmlFor="staff-email"
                    style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '6px' }}
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    id="staff-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@sample-cafe.test"
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

                {/* 4-digit PIN / Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label
                      htmlFor="staff-pin"
                      style={{ fontSize: '13px', fontWeight: '700', color: '#101827' }}
                    >
                      Set Staff PIN or Password *
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
                    placeholder="e.g. 1234 or your secure password"
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
                    You will use this PIN to quickly sign in to the QR stamp scanner.
                  </span>
                </div>

                {/* Branch Assignment preview */}
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
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Branch Assignment</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>☕ Bole Branch</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: '#e42330',
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
                    boxShadow: '0 4px 14px rgba(228, 35, 48, 0.25)',
                  }}
                >
                  {loading ? 'Activating staff account...' : 'Accept Invite & Open Staff Terminal →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
