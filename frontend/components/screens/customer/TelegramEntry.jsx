'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api, { getCustomerSession, getTelegramCardLink, loadTelegramWebApp, setCustomerSession } from '@/lib/api';

// Entry point of the Telegram Mini App (/tg). Telegram vouches for who the user is (initData) and, via the
// bot, for their phone number, so there is no PIN here. Opened from t.me/<bot>/<app>?startapp=<joinRef>;
// startapp=staff opens the staff scanner instead.
export default function TelegramEntry() {
  const router = useRouter();
  const [tg, setTg] = useState(null);
  const [joinRef, setJoinRef] = useState(null);
  const [state, setState] = useState({ step: 'loading' }); // loading | outside | noshop | phone | waiting | join | error
  const [info, setInfo] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);

  const openCard = useCallback(
    (ref, res) => {
      setCustomerSession({
        token: res.card.token,
        firstName: res.customer?.firstName || '',
        phone: '',
        joinReference: ref,
      });
      router.replace(`/card?m=${encodeURIComponent(ref)}`);
    },
    [router],
  );

  // Asks the backend where this Telegram user stands with this shop.
  const check = useCallback(
    async (webApp, ref) => {
      const res = await api.public.telegramSession(ref, webApp.initData);
      setInfo(res);
      if (res.status === 'SIGNED_IN') openCard(ref, res);
      else if (res.status === 'READY_TO_JOIN') setState({ step: 'join', phone: res.phone });
      else setState({ step: 'phone' });
      return res.status;
    },
    [openCard],
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      const webApp = await loadTelegramWebApp();
      if (!alive) return;
      const urlRef = new URLSearchParams(window.location.search).get('m');
      if (!webApp) {
        setJoinRef(urlRef);
        setState({ step: 'outside' });
        return;
      }
      webApp.ready();
      webApp.expand();
      setTg(webApp);
      setFirstName(webApp.initDataUnsafe?.user?.first_name || '');
      const ref = webApp.initDataUnsafe?.start_param || urlRef;
      if (ref === 'staff') {
        router.replace('/staff');
        return;
      }
      if (!ref) {
        setState({ step: 'noshop' });
        return;
      }
      setJoinRef(ref);
      // Opened before on this phone: go straight to the card (it re-checks with Telegram if the token is stale).
      if (getCustomerSession()?.joinReference === ref) {
        router.replace(`/card?m=${encodeURIComponent(ref)}`);
        return;
      }
      try {
        await check(webApp, ref);
      } catch (err) {
        if (alive) setState({ step: 'error', message: err.message });
      }
    })();
    return () => {
      alive = false;
    };
  }, [check, router]);

  // Telegram sends the shared contact to the bot; the backend sees it a moment later.
  const sharePhone = () => {
    tg.requestContact(async (shared) => {
      if (!shared) return;
      setState({ step: 'waiting' });
      for (let i = 0; i < 8; i++) {
        await new Promise((r) => setTimeout(r, 1500));
        try {
          const status = await check(tg, joinRef);
          if (status !== 'NEEDS_PHONE') return;
        } catch {}
      }
      setState({ step: 'phone', error: 'We have not received your number yet. Please try again.' });
    });
  };

  const join = async () => {
    setBusy(true);
    try {
      const res = await api.public.telegramJoin(joinRef, {
        initData: tg.initData,
        firstName: firstName.trim() || undefined,
        marketingConsent: consent,
        consentVersion: info?.consent?.version,
      });
      openCard(joinRef, res);
    } catch (err) {
      setBusy(false);
      setState((s) => ({ ...s, error: err.message }));
    }
  };

  const merchant = info?.merchant?.nameEn;
  const reward = info?.program?.reward?.nameEn;
  const stamps = info?.program?.stampsRequired;
  const button = {
    background: '#2aabee',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
  };
  const card = {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '22px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f7', fontFamily: "'Source Sans 3', system-ui, sans-serif", padding: '24px 16px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        {merchant ? (
          <header style={{ textAlign: 'center', marginBottom: '18px' }}>
            <h1 style={{ margin: '0 0 4px', fontSize: '22px', color: '#101827' }}>{merchant}</h1>
            {reward && stamps ? (
              <p style={{ margin: 0, color: '#5b6475', fontSize: '15px' }}>{`Collect ${stamps} stamps, get ${reward}.`}</p>
            ) : null}
          </header>
        ) : null}

        <main style={card}>
          {state.step === 'loading' || state.step === 'waiting' ? (
            <p style={{ margin: 0, textAlign: 'center', color: '#5b6475' }}>
              {state.step === 'waiting' ? 'Confirming your number…' : 'Opening your card…'}
            </p>
          ) : null}

          {state.step === 'outside' ? (
            <>
              <h2 style={{ margin: 0, fontSize: '19px', color: '#101827' }}>Open this in Telegram</h2>
              <p style={{ margin: 0, color: '#5b6475' }}>This page is the Telegram version of your loyalty card.</p>
              {getTelegramCardLink(joinRef) ? (
                <a href={getTelegramCardLink(joinRef)} style={{ ...button, textAlign: 'center', textDecoration: 'none' }}>
                  Open in Telegram
                </a>
              ) : null}
              {joinRef ? (
                <a href={`/p/${encodeURIComponent(joinRef)}`} style={{ color: '#4661ad', textAlign: 'center' }}>
                  Use the web card instead
                </a>
              ) : null}
            </>
          ) : null}

          {state.step === 'noshop' ? (
            <p style={{ margin: 0, color: '#374151' }}>Scan the QR code at a shop to open its card here.</p>
          ) : null}

          {state.step === 'phone' ? (
            <>
              <h2 style={{ margin: 0, fontSize: '19px', color: '#101827' }}>Get your card</h2>
              <p style={{ margin: 0, color: '#374151', lineHeight: '21px' }}>
                Share your phone number once so the shop can find your stamps. No password, no PIN.
              </p>
              {state.error ? <p role="alert" style={{ margin: 0, color: '#b91c1c' }}>{state.error}</p> : null}
              <button type="button" style={button} onClick={sharePhone}>
                Share my phone number
              </button>
            </>
          ) : null}

          {state.step === 'join' ? (
            <>
              <h2 style={{ margin: 0, fontSize: '19px', color: '#101827' }}>Almost there</h2>
              <p style={{ margin: 0, color: '#374151' }}>{`Phone confirmed: ${state.phone}`}</p>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#374151' }}>Your first name</span>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '12px 14px', fontSize: '16px' }}
                />
              </label>
              <label style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#374151' }}>
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>{`Send me offers from ${merchant || 'this shop'} in Telegram (optional)`}</span>
              </label>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                {`By joining you accept the card terms${info?.program?.termsEn ? `: ${info.program.termsEn}` : '.'}`}
              </p>
              {state.error ? <p role="alert" style={{ margin: 0, color: '#b91c1c' }}>{state.error}</p> : null}
              <button type="button" style={button} onClick={join} disabled={busy}>
                {busy ? 'Please wait…' : 'Open my card'}
              </button>
            </>
          ) : null}

          {state.step === 'error' ? (
            <p role="alert" style={{ margin: 0, color: '#b91c1c' }}>{state.message || 'Something went wrong.'}</p>
          ) : null}
        </main>
      </div>
    </div>
  );
}
