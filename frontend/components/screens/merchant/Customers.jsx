'use client';
import React, { useCallback, useEffect, useState } from 'react';
import api from '@/lib/api';
import MerchantPage from './MerchantPage';

// The business's customers from the backend: search by name or phone, stamps and rewards per card, last
// visit, marketing consent, and switching a card off or on. Messages go out from Offers (Telegram).
const card = { background: '#ffffff', border: '1px solid #e3e5ec', borderRadius: '16px', padding: '20px' };
const btn = (primary) => ({
  border: primary ? 'none' : '1px solid #e3e5ec',
  background: primary ? '#e42330' : '#ffffff',
  color: primary ? '#ffffff' : '#101827',
  fontWeight: 700,
  borderRadius: '12px',
  padding: '10px 18px',
  minHeight: '44px',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
});
const day = (iso) => (iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—');

export default function Customers() {
  const [items, setItems] = useState(null);
  const [next, setNext] = useState(null);
  const [q, setQ] = useState('');
  const [query, setQuery] = useState('');
  const [program, setProgram] = useState(null);
  const [selId, setSelId] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (search, cursor) => {
    setError('');
    try {
      const params = { limit: '50' };
      if (search) params.q = search;
      if (cursor) params.cursor = cursor;
      const res = await api.merchant.getCustomers(params);
      const rows = res?.items || [];
      setItems((cur) => (cursor ? [...(cur || []), ...rows] : rows));
      setNext(res?.nextCursor || null);
      if (!cursor) setSelId(rows[0]?.id ?? null);
    } catch (e) {
      if (!cursor) setItems([]);
      setError(e.message || 'Could not load customers.');
    }
  }, []);

  useEffect(() => {
    load(query);
  }, [query, load]);

  useEffect(() => {
    api.merchant
      .getPrograms('ACTIVE')
      .then((p) => setProgram(Array.isArray(p) ? p[0] || null : null))
      .catch(() => {});
  }, []);

  const sel = (items || []).find((c) => c.id === selId) || null;
  const m = sel?.memberships?.find((x) => x.programId === program?.id) || sel?.memberships?.[0] || null;
  const need = program?.stampsRequired || null;
  // Stamps toward the next reward: every full set of stampsRequired unlocks a reward and starts a new card
  // (stampsRequired cannot change once customers have joined).
  const onCard = (mem) => (mem && need ? mem.stampsGiven % need : null);

  const act = async (fn) => {
    setBusy(true);
    setError('');
    try {
      await fn();
      const fresh = await api.merchant.getCustomer(sel.id);
      setItems((cur) => cur.map((c) => (c.id === fresh.id ? fresh : c)));
    } catch (e) {
      setError(e.message || 'That did not work. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <MerchantPage active="customers" title="Customers" subtitle="Everyone who has your card.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(q.trim());
        }}
        style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
      >
        <input
          type="search"
          aria-label="Search customers"
          placeholder="Name or phone number"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: '1 1 260px', border: '1px solid #e3e5ec', borderRadius: '12px', padding: '10px 14px', fontSize: '15px' }}
        />
        <button type="submit" style={btn(false)}>
          Search
        </button>
      </form>
      {error ? <p role="alert" style={{ margin: 0, color: '#c81d29', fontWeight: 600 }}>{error}</p> : null}

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <section style={{ ...card, flex: '1 1 320px', padding: '8px' }}>
          {items === null ? <p style={{ margin: '12px', color: '#5b6475' }}>Loading…</p> : null}
          {items && items.length === 0 ? (
            <p style={{ margin: '12px', color: '#5b6475' }}>
              {query ? 'No customer matches.' : 'No customers yet. Put your QR code on the counter: people who scan it appear here.'}
            </p>
          ) : null}
          {(items || []).map((c) => {
            const mem = c.memberships?.find((x) => x.programId === program?.id) || c.memberships?.[0];
            const stamps = onCard(mem);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelId(c.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  borderRadius: '12px',
                  background: c.id === selId ? '#f1f3f8' : 'transparent',
                  padding: '12px',
                  cursor: 'pointer',
                }}
              >
                <strong style={{ display: 'block' }}>{c.firstName || 'Customer'}</strong>
                <span style={{ fontSize: '14px', color: '#5b6475' }}>
                  {[c.phone, stamps !== null ? `${stamps}/${need} stamps` : null, mem?.status === 'INACTIVE' ? 'card off' : null]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </button>
            );
          })}
          {next ? (
            <div style={{ padding: '8px' }}>
              <button type="button" style={btn(false)} onClick={() => load(query, next)}>
                Show more
              </button>
            </div>
          ) : null}
        </section>

        {sel ? (
          <section style={{ ...card, flex: '2 1 380px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2 style={{ margin: 0, fontSize: '22px' }}>{sel.firstName || 'Customer'}</h2>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 16px' }}>
              {[
                ['Phone', sel.phone || '—'],
                ['Language', sel.preferredLanguage === 'AM' ? 'Amharic' : 'English'],
                ['Joined', day(sel.joinedAt)],
                ['Stamps on card', onCard(m) !== null ? `${onCard(m)} of ${need}` : '—'],
                ['Stamps received', m ? String(m.stampsGiven) : '—'],
                ['Rewards redeemed', m ? String(m.rewardsRedeemed) : '—'],
                ['Last stamp', day(m?.lastStampAt)],
                ['Card', m ? (m.status === 'ACTIVE' ? 'Working' : 'Switched off') : 'No card'],
                ['Offers by message', sel.marketingConsent ? 'Agreed' : 'Not agreed'],
              ].map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt style={{ color: '#5b6475' }}>{k}</dt>
                  <dd style={{ margin: 0, fontWeight: 600 }}>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {m ? (
                m.status === 'ACTIVE' ? (
                  <button type="button" style={btn(false)} disabled={busy} onClick={() => act(() => api.merchant.deactivateMembership(m.id))}>
                    Switch card off
                  </button>
                ) : (
                  <button type="button" style={btn(false)} disabled={busy} onClick={() => act(() => api.merchant.reactivateMembership(m.id))}>
                    Switch card back on
                  </button>
                )
              ) : null}
              {sel.marketingConsent ? (
                <button type="button" style={btn(false)} disabled={busy} onClick={() => act(() => api.merchant.withdrawCustomerMarketing(sel.id))}>
                  Stop offers (customer asked)
                </button>
              ) : null}
              <a href="/business/offers" style={btn(false)}>
                Send an offer
              </a>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#5b6475' }}>
              Switching a card off stops it working at the counter; stamps and history are kept. Offers go to customers who
              agreed, through Telegram.
            </p>
          </section>
        ) : null}
      </div>
    </MerchantPage>
  );
}
