'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api, { checkCardPin, getCustomerSession, getTelegramCardLink, registerCustomer, signInCustomer } from '@/lib/api';

// The page every merchant QR code opens. Shop, program and reward come from the backend join info;
// customers join here (name, phone, PIN) or sign back in with phone + PIN, then their card opens.
export default function PublicLandingPage({ slug }) {
  const router = useRouter();
  const [info, setInfo] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'missing' | 'error'
  const [mode, setMode] = useState('join'); // 'join' | 'signin'
  const [form, setForm] = useState({ firstName: '', phone: '', pin: '', consent: false });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [existing, setExisting] = useState(null);

  useEffect(() => {
    let alive = true;
    const session = getCustomerSession();
    if (session?.joinReference === slug) setExisting(session);
    api.public
      .getJoinInfo(slug)
      .then((res) => {
        if (!alive) return;
        setInfo(res);
        setStatus('ready');
      })
      .catch((err) => {
        if (!alive) return;
        setStatus(err.status === 404 ? 'missing' : 'error');
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  const cardUrl = (isNew) => `/card?m=${encodeURIComponent(slug)}${isNew ? '&new=1' : ''}`;
  const set = (k) => (e) => {
    const v = k === 'consent' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: k === 'pin' ? v.replace(/\D/g, '').slice(0, 6) : v }));
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'join') {
        await registerCustomer({
          joinReference: slug,
          firstName: form.firstName,
          phone: form.phone,
          pin: form.pin,
          marketingConsent: form.consent,
          consentVersion: info?.consent?.version,
        });
        router.push(cardUrl(true));
      } else {
        await signInCustomer({ joinReference: slug, phone: form.phone, pin: form.pin });
        router.push(cardUrl(false));
      }
    } catch (err) {
      if (err.code === 'ALREADY_MEMBER') setMode('signin');
      setError(err.message || 'Something went wrong. Please try again.');
      setBusy(false);
    }
  };

  const merchantName = info?.merchant?.nameEn || '';
  const program = info?.program || {};
  const color = program.brandColor || '#8a4b2a';
  const reward = program.reward?.nameEn;
  const stamps = program.stampsRequired;
  const pinHint = mode === 'join' && form.pin.length === 6 ? checkCardPin(form.pin) : null;

  const isDarkBg = (() => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) || 0;
    const g = parseInt(hex.substr(2, 2), 16) || 0;
    const b = parseInt(hex.substr(4, 2), 16) || 0;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55;
  })();
  const textColor = isDarkBg ? '#ffffff' : '#101827';
  const subTextColor = isDarkBg ? 'rgba(255, 255, 255, 0.85)' : '#4b5563';

  const input = {
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    background: '#ffffff',
    color: '#101827',
  };
  const label = { fontSize: '13px', fontWeight: '700', color: '#374151' };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: color,
        display: 'flex',
        justifyContent: 'center',
        fontFamily: "'Source Sans 3', system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ width: '100%', maxWidth: '480px', padding: '36px 16px 32px', boxSizing: 'border-box' }}>
        {status === 'loading' ? (
          <p style={{ color: textColor, textAlign: 'center' }}>Loading…</p>
        ) : status !== 'ready' ? (
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', textAlign: 'center' }}>
            <h1 style={{ margin: '0 0 8px', fontSize: '20px', color: '#101827' }}>
              {status === 'missing' ? 'This card link is not active' : 'Could not load this page'}
            </h1>
            <p style={{ margin: 0, color: '#5b6475', fontSize: '15px' }}>
              {status === 'missing'
                ? 'Ask the shop for their current QR code.'
                : 'Check your connection and try again.'}
            </p>
          </div>
        ) : (
          <>
            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div
                aria-hidden="true"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '999px',
                  background: '#ffffff',
                  color,
                  fontWeight: '800',
                  fontSize: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                }}
              >
                {(merchantName || 'S').charAt(0).toUpperCase()}
              </div>
              <h1 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: '800', color: textColor }}>
                {merchantName}
              </h1>
              <p style={{ margin: 0, fontSize: '15px', color: subTextColor }}>
                {reward && stamps ? `Collect ${stamps} stamps, get ${reward}.` : program.nameEn}
              </p>
            </header>

            <main style={{ background: '#ffffff', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}>
              {existing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  <Link
                    href={cardUrl(false)}
                    style={{
                      background: '#101827',
                      color: '#ffffff',
                      borderRadius: '12px',
                      padding: '14px',
                      textAlign: 'center',
                      fontWeight: '700',
                      textDecoration: 'none',
                    }}
                  >
                    {`Open my card${existing.firstName ? `, ${existing.firstName}` : ''}`}
                  </Link>
                  <span style={{ fontSize: '13px', color: '#5b6475', textAlign: 'center' }}>Not you? Join or sign in below.</span>
                </div>
              ) : null}

              {getTelegramCardLink(slug) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                  <a
                    href={getTelegramCardLink(slug)}
                    style={{
                      background: '#2aabee',
                      color: '#ffffff',
                      borderRadius: '12px',
                      padding: '14px',
                      textAlign: 'center',
                      fontWeight: '700',
                      textDecoration: 'none',
                    }}
                  >
                    Open my card in Telegram
                  </a>
                  <span style={{ fontSize: '13px', color: '#5b6475', textAlign: 'center' }}>
                    No PIN to remember. No Telegram? Use the form below.
                  </span>
                </div>
              ) : null}

              <div role="tablist" style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', gap: '4px', marginBottom: '16px' }}>
                {[
                  ['join', 'Get my card'],
                  ['signin', 'I already have one'],
                ].map(([m, text]) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => {
                      setMode(m);
                      setError('');
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 8px',
                      border: 'none',
                      borderRadius: '8px',
                      background: mode === m ? '#ffffff' : 'transparent',
                      color: mode === m ? '#101827' : '#64748b',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {text}
                  </button>
                ))}
              </div>

              {error ? (
                <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', marginBottom: '14px' }}>
                  {error}
                </div>
              ) : null}

              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {mode === 'join' ? (
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={label}>First name</span>
                    <input style={input} value={form.firstName} onChange={set('firstName')} autoComplete="given-name" placeholder="e.g. Abebe" required />
                  </label>
                ) : null}
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={label}>Phone number</span>
                  <input style={input} type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="e.g. 0912 345 678" required />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={label}>{mode === 'join' ? 'Choose a 6-digit PIN' : 'Your 6-digit PIN'}</span>
                  <input
                    style={{ ...input, letterSpacing: '0.3em' }}
                    type="password"
                    inputMode="numeric"
                    autoComplete={mode === 'join' ? 'new-password' : 'current-password'}
                    value={form.pin}
                    onChange={set('pin')}
                    placeholder="••••••"
                    required
                  />
                  <span style={{ fontSize: '12px', color: pinHint ? '#b91c1c' : '#64748b' }}>
                    {pinHint ||
                      (mode === 'join'
                        ? 'With your phone number, this PIN opens your card on any phone.'
                        : 'The PIN you chose when you got your card.')}
                  </span>
                </label>
                {mode === 'join' ? (
                  <>
                    <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: '#374151' }}>
                      <input type="checkbox" checked={form.consent} onChange={set('consent')} style={{ marginTop: '3px' }} />
                      <span>{`Send me offers from ${merchantName} (optional)`}</span>
                    </label>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                      {`By joining you accept the card terms${program.termsEn ? `: ${program.termsEn}` : '.'}`}
                    </p>
                  </>
                ) : null}
                <button
                  type="submit"
                  disabled={busy}
                  style={{
                    background: '#101827',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: busy ? 'wait' : 'pointer',
                  }}
                >
                  {busy ? 'Please wait…' : mode === 'join' ? 'Get my card' : 'Open my card'}
                </button>
                {mode === 'signin' ? (
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
                    Forgot your PIN? Ask staff at the counter to reissue your card.
                  </p>
                ) : null}
              </form>
            </main>
          </>
        )}

        <footer style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/" style={{ color: textColor, opacity: 0.85, fontSize: '12px', fontWeight: '700', letterSpacing: '0.04em', textDecoration: 'none' }}>
            TEMELASH CARD
          </Link>
        </footer>
      </div>
    </div>
  );
}
