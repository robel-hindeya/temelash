'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api, { setStoredToken, DEMO_ACCOUNTS } from '@/lib/api';

export default function AuthModal({
  isOpen,
  initialTab = 'signin',
  onClose,
  onSuccess,
}) {
  const router = useRouter();
  const [tab, setTab] = useState(initialTab); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sign In fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign Up / Create Merchant fields
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Café');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [city, setCity] = useState('Bole, Addis Ababa');

  useEffect(() => {
    setTab(initialTab);
    setError('');
    setSuccessMsg('');
  }, [initialTab, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.auth.login(email.trim(), password);
      setSuccessMsg('Signed in successfully! Redirecting to your dashboard...');
      setTimeout(() => {
        onClose?.();
        const role = data?.user?.accountType === 'PLATFORM_ADMIN' ? 'admin' : (data?.user?.role === 'STAFF' ? 'staff' : 'owner');
        if (role === 'admin') router.push('/admin');
        else if (role === 'staff') router.push('/staff');
        else router.push('/business');
      }, 700);
    } catch (err) {
      // In case backend is offline, check demo accounts as fallback
      const matchingDemo = Object.values(DEMO_ACCOUNTS).find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
      );
      if (matchingDemo) {
        const isStaff = matchingDemo.email.includes('staff');
        const isAdmin = matchingDemo.email.includes('admin');
        const role = isAdmin ? 'admin' : (isStaff ? 'staff' : 'owner');
        setStoredToken(`demo-tok-${Date.now()}`, role, {
          email: matchingDemo.email,
          displayName: matchingDemo.label,
          role: role.toUpperCase(),
        });
        setSuccessMsg('Signed in with demo session! Redirecting...');
        setTimeout(() => {
          onClose?.();
          if (role === 'admin') router.push('/admin');
          else if (role === 'staff') router.push('/staff');
          else router.push('/business');
        }, 700);
      } else {
        setError(err.message || 'Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (accountKey) => {
    const creds = DEMO_ACCOUNTS[accountKey];
    if (!creds) return;
    setEmail(creds.email);
    setPassword(creds.password);
    setError('');
    setLoading(true);
    try {
      const data = await api.auth.login(creds.email, creds.password);
      setSuccessMsg(`Signed in as ${creds.label}! Redirecting...`);
      setTimeout(() => {
        onClose?.();
        if (accountKey === 'admin') router.push('/admin');
        else if (accountKey === 'staff') router.push('/staff');
        else router.push('/business');
      }, 600);
    } catch (err) {
      // Offline fallback
      setStoredToken(`demo-tok-${accountKey}-${Date.now()}`, accountKey, {
        email: creds.email,
        displayName: creds.label,
        role: accountKey.toUpperCase(),
      });
      setSuccessMsg(`Signed in as ${creds.label}! Redirecting...`);
      setTimeout(() => {
        onClose?.();
        if (accountKey === 'admin') router.push('/admin');
        else if (accountKey === 'staff') router.push('/staff');
        else router.push('/business');
      }, 600);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!businessName.trim()) {
      setError('Please enter your business name.');
      return;
    }
    if (!regEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      // Try to create merchant in backend
      const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `merchant-${Date.now()}`;
      try {
        await api.platform.createMerchant({
          nameEn: businessName.trim(),
          slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
          defaultLanguage: 'EN',
        });
      } catch (err) {
        console.warn('Backend merchant create skipped or offline, proceeding with local registration:', err);
      }

      // Save new merchant registration info into localStorage so Setup wizard picks it up
      const merchantInfo = {
        name: businessName.trim(),
        type: category,
        contactName: contactName.trim() || 'Owner',
        phone: phone.trim(),
        email: regEmail.trim(),
        city: city.trim(),
      };
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tc_registered_merchant', JSON.stringify(merchantInfo));
        // Also save owner token
        setStoredToken(`reg-tok-${Date.now()}`, 'owner', {
          email: regEmail.trim(),
          displayName: contactName.trim() || businessName.trim(),
          businessName: businessName.trim(),
          role: 'OWNER',
        });
      }

      setSuccessMsg(`Merchant account for "${businessName}" created successfully! Opening setup wizard...`);
      setTimeout(() => {
        onClose?.();
        router.push('/business/setup');
      }, 800);
    } catch (err) {
      setError(err.message || 'Could not create merchant account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(16, 24, 39, 0.72)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(16, 24, 39, 0.35), 0 0 0 1px rgba(16, 24, 39, 0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '24px 28px 16px',
            borderBottom: '1px solid #f0f1f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="28" height="28" viewBox="0 0 40 40" aria-hidden="true">
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
            <div style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.02em' }}>
              TEMELASH <span style={{ color: '#e42330' }}>CARD</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '999px',
              border: '1px solid #e3e5ec',
              background: '#f7f7f9',
              color: '#5b6475',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              lineHeight: 1,
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#eef0f6')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#f7f7f9')}
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ padding: '16px 28px 0', display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '12px',
              border: tab === 'signin' ? '2px solid #e42330' : '1px solid #e3e5ec',
              background: tab === 'signin' ? '#fff5f5' : '#ffffff',
              color: tab === 'signin' ? '#e42330' : '#5b6475',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '12px',
              border: tab === 'signup' ? '2px solid #e42330' : '1px solid #e3e5ec',
              background: tab === 'signup' ? '#fff5f5' : '#ffffff',
              color: tab === 'signup' ? '#e42330' : '#5b6475',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Create Merchant Account
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '20px 28px 28px' }}>
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
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>⚠️</span>
              <span style={{ flex: 1 }}>{error}</span>
            </div>
          )}

          {successMsg && (
            <div
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#15803d',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>✅</span>
              <span style={{ flex: 1 }}>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN TAB */}
          {tab === 'signin' && (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '800', color: '#101827' }}>
                  Welcome back
                </h2>
                <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                  Sign in to access your business stamp cards and analytics.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="owner@sample-cafe.test"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#e42330')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#101827' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#e42330')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '16px',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(228, 35, 48, 0.25)',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In to Dashboard'}
              </button>

              {/* Quick Demo Credentials */}
              <div style={{ marginTop: '12px', borderTop: '1px dashed #e3e5ec', paddingTop: '16px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#5b6475',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  Quick 1-Click Demo Logins
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('owner')}
                    disabled={loading}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '8px 6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#0f172a',
                      cursor: 'pointer',
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    ☕ Merchant<br />
                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '500' }}>Sample Café</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('staff')}
                    disabled={loading}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '8px 6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#0f172a',
                      cursor: 'pointer',
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    📱 Staff App<br />
                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '500' }}>QR Scanner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin')}
                    disabled={loading}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '8px 6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#0f172a',
                      cursor: 'pointer',
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    🛡️ Admin<br />
                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '500' }}>Platform</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* CREATE MERCHANT ACCOUNT TAB */}
          {tab === 'signup' && (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h2 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '800', color: '#101827' }}>
                  Create your merchant card
                </h2>
                <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                  Start your 14-day free trial. No card machine required.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                  Business Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Buna House Café, Selam Salon"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                    Business Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      outline: 'none',
                    }}
                  >
                    <option value="Café">Café</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Salon & Spa">Salon & Spa</option>
                    <option value="Retail">Retail / Boutique</option>
                    <option value="Car Wash">Car Wash</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                    City / Neighborhood
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bole, Addis Ababa"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                    Contact Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hana Tadesse"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+251 91 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                  Login Email *
                </label>
                <input
                  type="email"
                  placeholder="owner@yourbusiness.et"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                  Password (min 6 characters) *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '16px',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(228, 35, 48, 0.25)',
                }}
              >
                {loading ? 'Creating merchant account...' : 'Create Merchant Account & Continue →'}
              </button>

              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#5b6475', textAlign: 'center' }}>
                By creating an account, you agree to the Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
