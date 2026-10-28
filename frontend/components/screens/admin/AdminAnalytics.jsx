'use client';
import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import AdminPage from './AdminPage';

// Platform analytics from real data: totals, stamps per day, new businesses per week, and each business
// ranked by customers.
const card = { background: '#ffffff', border: '1px solid #e3e5ec', borderRadius: '16px', padding: '20px' };

function Bars({ title, rows, label }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <section style={{ ...card, flex: '1 1 320px' }}>
      <h2 style={{ margin: '0 0 12px', fontSize: '18px' }}>{title}</h2>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px' }} role="img" aria-label={title}>
        {rows.map((r) => (
          <div key={r.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '12px', fontWeight: 700 }}>{r.count}</span>
            <div title={`${label(r.key)}: ${r.count}`} style={{ width: '100%', height: `${Math.max(2, (r.count / max) * 120)}px`, background: '#4661ad', borderRadius: '6px 6px 0 0' }} />
            <span style={{ fontSize: '11px', color: '#5b6475', whiteSpace: 'nowrap' }}>{label(r.key)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AdminAnalytics() {
  const [o, setO] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.allSettled([api.platform.getOverview(), api.platform.getMerchants()]).then(([ov, ms]) => {
      if (ov.status === 'fulfilled') setO(ov.value);
      else setError(ov.reason?.message || 'Could not load platform data.');
      if (ms.status === 'fulfilled' && Array.isArray(ms.value)) setMerchants(ms.value);
    });
  }, []);

  const day = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString(undefined, { weekday: 'short', timeZone: 'UTC' });
  const week = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString(undefined, { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const ranked = [...merchants].sort((a, b) => (b._count?.customers ?? 0) - (a._count?.customers ?? 0));
  const kpi = (label, value) => (
    <div style={{ ...card, flex: '1 1 160px', padding: '16px' }}>
      <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#5b6475' }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: 800 }}>{o ? Number(value).toLocaleString('en-US') : '…'}</div>
    </div>
  );

  return (
    <AdminPage active="analytics" title="Analytics" subtitle="Live numbers across every business on Temelash.">
      {error ? <p role="alert" style={{ margin: 0, color: '#c81d29', fontWeight: 600 }}>{error}</p> : null}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {kpi('BUSINESSES', o?.merchants.total)}
        {kpi('CARD HOLDERS', o?.customers.cards)}
        {kpi('ON TELEGRAM', o?.customers.telegram)}
        {kpi('STAMPS TODAY', o?.today.stamps)}
        {kpi('REWARDS TODAY', o?.today.redemptions)}
      </div>
      {o ? (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Bars title="Stamps per day (last 7 days)" rows={o.stampsByDay.map((d) => ({ key: d.day, count: d.count }))} label={day} />
          <Bars title="New businesses per week (last 8 weeks)" rows={o.newMerchantsByWeek.map((w) => ({ key: w.week, count: w.count }))} label={week} />
        </div>
      ) : null}
      <section style={{ ...card, overflowX: 'auto' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '18px' }}>Businesses by customers</h2>
        {ranked.length === 0 ? (
          <p style={{ margin: 0, color: '#5b6475' }}>No businesses yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: '12px', letterSpacing: '0.08em', color: '#5b6475' }}>
                {['BUSINESS', 'STATUS', 'CUSTOMERS', 'STAFF', 'BRANCHES', 'JOINED'].map((h) => (
                  <th key={h} scope="col" style={{ padding: '8px 12px 8px 0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ranked.map((m) => (
                <tr key={m.id} style={{ borderTop: '1px solid #e3e5ec' }}>
                  <td style={{ padding: '10px 12px 10px 0', fontWeight: 700 }}>{m.nameEn}</td>
                  <td style={{ padding: '10px 12px 10px 0', color: '#5b6475' }}>{m.status}</td>
                  <td style={{ padding: '10px 12px 10px 0' }}>{m._count?.customers ?? 0}</td>
                  <td style={{ padding: '10px 12px 10px 0' }}>{m._count?.staffMemberships ?? 0}</td>
                  <td style={{ padding: '10px 12px 10px 0' }}>{m._count?.branches ?? 0}</td>
                  <td style={{ padding: '10px 0', color: '#5b6475' }}>{new Date(m.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </AdminPage>
  );
}
