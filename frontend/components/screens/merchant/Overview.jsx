'use client';
import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import MerchantPage from './MerchantPage';

// The merchant's home: real setup progress, the last 30 days in numbers, stamps per day over two weeks,
// newest customers and who is one stamp from a reward.
const card = { background: '#ffffff', border: '1px solid #e3e5ec', borderRadius: '16px', padding: '20px' };
const btn = (primary) => ({
  border: primary ? 'none' : '1px solid #e3e5ec',
  background: primary ? '#e42330' : '#ffffff',
  color: primary ? '#ffffff' : '#101827',
  fontWeight: 700,
  borderRadius: '12px',
  padding: '10px 18px',
  minHeight: '44px',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
});
const isoDay = (t) => new Date(t).toISOString().slice(0, 10);
const utc = (d, opts) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });

export default function Overview() {
  const [d, setD] = useState(null);

  useEffect(() => {
    const from30 = isoDay(Date.now() - 29 * 86400000);
    const from14 = isoDay(Date.now() - 13 * 86400000);
    Promise.allSettled([
      api.merchant.getProfile(),
      api.merchant.getPrograms('ACTIVE'),
      api.merchant.getStaff(),
      api.merchant.getPromotions(),
      api.merchant.getAnalyticsOverview({ from: from30 }),
      api.merchant.getAnalyticsOverview({ from: from14 }),
      api.merchant.getCustomers({ limit: '100' }),
    ]).then((r) => {
      const v = (i) => (r[i].status === 'fulfilled' ? r[i].value : null);
      setD({
        profile: v(0),
        program: Array.isArray(v(1)) ? v(1)[0] || null : null,
        staff: Array.isArray(v(2)) ? v(2) : [],
        promotions: v(3),
        month: v(4),
        twoWeeks: v(5),
        customers: v(6)?.items || [],
        error: r[4].status === 'rejected' ? r[4].reason?.message || 'Could not load your numbers.' : '',
      });
    });
  }, []);

  if (!d) {
    return (
      <MerchantPage active="overview" title="Overview">
        <p style={{ margin: 0, color: '#5b6475' }}>Loading…</p>
      </MerchantPage>
    );
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  const m = d.month || {};
  const active = m.activeMembers ?? 0;
  const returning = m.returningCustomers ?? 0;
  const need = d.program?.stampsRequired || null;

  const steps = [
    ['Set up your card and reward', !!d.program, '/business/setup'],
    ['Put your QR code on the counter', null, '/business/shop'],
    ['Invite your staff', d.staff.some((s) => s.roleKey !== 'OWNER'), '/business/settings'],
    ['Send your first offer', (d.promotions?.recent?.length ?? 0) > 0, '/business/offers'],
  ];
  const done = steps.filter((s) => s[1]).length;

  // Stamps per day over the last 14 days, zeros where nothing happened.
  const perDay = new Map((d.twoWeeks?.stampsByDay || []).map((x) => [x.day, x.count]));
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const day = isoDay(Date.now() - i * 86400000);
    days.push({ day, v: perDay.get(day) || 0 });
  }
  const max = Math.max(1, ...days.map((x) => x.v));
  const thisWeek = days.slice(7).reduce((a, x) => a + x.v, 0);
  const lastWeek = days.slice(0, 7).reduce((a, x) => a + x.v, 0);
  const busiest = days.reduce((a, x) => (x.v > a.v ? x : a), days[days.length - 1]);

  const membership = (c) => c.memberships?.find((x) => x.programId === d.program?.id);
  const close = need
    ? d.customers.filter((c) => {
        const mem = membership(c);
        return mem && mem.status === 'ACTIVE' && mem.stampsGiven % need === need - 1;
      })
    : [];

  const kpis = [
    ['CARD HOLDERS', m.totalCustomers ?? 0, `${m.newMembers ?? 0} joined in 30 days`],
    ['STAMPS', m.stampsIssued?.count ?? 0, 'Last 30 days'],
    ['REWARDS REDEEMED', m.rewardsRedeemed ?? 0, `of ${m.rewardsUnlocked ?? 0} unlocked`],
    ['CAME BACK', active ? `${Math.round((returning / active) * 100)}%` : '0%', `${returning} of ${active} visitors had been before`],
  ];

  return (
    <MerchantPage active="overview" title="Overview" subtitle={[today, d.profile?.nameEn].filter(Boolean).join(' · ')}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <a href="/business/shop" style={btn(false)}>
          Your QR code
        </a>
        <a href="/business/offers" style={btn(true)}>
          Send an offer
        </a>
      </div>
      {d.error ? <p role="alert" style={{ margin: 0, color: '#c81d29', fontWeight: 600 }}>{d.error}</p> : null}

      {done < steps.filter((s) => s[1] !== null).length ? (
        <section style={{ ...card, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>Finish setting up</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {steps.map(([text, ok, href]) => (
              <li key={text} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span aria-hidden="true" style={{ width: '22px', textAlign: 'center', fontWeight: 800, color: ok ? '#1d6b3a' : '#5b6475' }}>
                  {ok ? '✓' : '○'}
                </span>
                {ok ? <span style={{ color: '#5b6475' }}>{text}</span> : <a href={href}>{text}</a>}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
        {kpis.map(([label, value, note]) => (
          <div key={label} style={{ ...card, padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#5b6475' }}>{label}</div>
            <div style={{ fontSize: '28px', fontWeight: 800 }}>{typeof value === 'number' ? value.toLocaleString('en-US') : value}</div>
            <div style={{ fontSize: '14px', color: '#5b6475' }}>{note}</div>
          </div>
        ))}
      </div>

      <section style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Stamps per day · last 14 days</h2>
          <a href="/business/analytics">Open analytics</a>
        </div>
        <div role="img" aria-label={`Stamps per day over the last 14 days, ${thisWeek} this week`} style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '150px' }}>
          {days.map((x) => (
            <div key={x.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', height: '100%' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>{x.v || ''}</span>
              <div title={`${utc(x.day, { day: 'numeric', month: 'short' })}: ${x.v} stamps`} style={{ width: '100%', height: `${Math.max(2, (x.v / max) * 110)}px`, background: '#4661ad', borderRadius: '6px 6px 0 0' }} />
              <span style={{ fontSize: '11px', color: '#5b6475' }}>{utc(x.day, { weekday: 'narrow' })}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '14px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#5b6475' }}>THIS WEEK</div>
            <strong>{thisWeek}</strong> <span style={{ color: '#5b6475' }}>{`vs ${lastWeek} the week before`}</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#5b6475' }}>BUSIEST DAY</div>
            <strong>{busiest.v ? utc(busiest.day, { weekday: 'long', day: 'numeric', month: 'short' }) : 'No stamps yet'}</strong>
            {busiest.v ? <span style={{ color: '#5b6475' }}>{` · ${busiest.v} stamps`}</span> : null}
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#5b6475' }}>DAILY AVERAGE</div>
            <strong>{(thisWeek / 7).toFixed(1)}</strong> <span style={{ color: '#5b6475' }}>stamps this week</span>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <section style={{ ...card, flex: '1 1 320px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Newest customers</h2>
            <a href="/business/customers">All customers</a>
          </div>
          {d.customers.length === 0 ? <p style={{ margin: 0, color: '#5b6475' }}>No customers yet.</p> : null}
          {d.customers.slice(0, 6).map((c) => {
            const mem = membership(c);
            return (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', borderTop: '1px solid #e3e5ec', padding: '10px 0' }}>
                <strong>{c.firstName || 'Customer'}</strong>
                <span style={{ color: '#5b6475', fontSize: '14px' }}>
                  {[mem && need ? `${mem.stampsGiven % need}/${need}` : null, `joined ${new Date(c.joinedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </div>
            );
          })}
        </section>

        <section style={{ ...card, flex: '1 1 320px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '20px' }}>One stamp from a reward</h2>
          {close.length === 0 ? (
            <p style={{ margin: 0, color: '#5b6475' }}>Nobody right now.</p>
          ) : (
            <>
              {close.slice(0, 8).map((c) => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', borderTop: '1px solid #e3e5ec', padding: '10px 0' }}>
                  <strong>{c.firstName || 'Customer'}</strong>
                  <span style={{ color: '#5b6475', fontSize: '14px' }}>
                    {membership(c)?.lastStampAt ? `last visit ${new Date(membership(c).lastStampAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}` : ''}
                  </span>
                </div>
              ))}
              <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#5b6475' }}>
                Messages to single customers are not available yet. An offer from <a href="/business/offers">Offers</a> reaches
                everyone who agreed to hear from you on Telegram.
              </p>
            </>
          )}
        </section>
      </div>
    </MerchantPage>
  );
}
