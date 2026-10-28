'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import api, { getAppOrigin } from '@/lib/api';
import AdminPage from './AdminPage';

// Every business on the platform, from the backend: search, status, real counts, staff and programs,
// and suspend / reactivate.
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
});

export default function AdminBusinesses() {
  const [list, setList] = useState(null);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('ALL');
  const [selId, setSelId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const loadList = useCallback(async () => {
    try {
      const rows = await api.platform.getMerchants();
      setList(Array.isArray(rows) ? rows : []);
      setSelId((cur) => cur ?? rows?.[0]?.id ?? null);
    } catch (e) {
      setList([]);
      setError(e.message || 'Could not load businesses.');
    }
  }, []);

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    if (!selId) return;
    setDetail(null);
    setConfirm(false);
    api.platform
      .getMerchant(selId)
      .then(setDetail)
      .catch((e) => setError(e.message || 'Could not load this business.'));
  }, [selId]);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (list || []).filter(
      (m) =>
        (status === 'ALL' || m.status === status) &&
        (!term || `${m.nameEn} ${m.nameAm || ''} ${m.slug}`.toLowerCase().includes(term)),
    );
  }, [list, q, status]);

  const setMerchantStatus = async (next) => {
    setBusy(true);
    setError('');
    try {
      await api.platform.updateMerchantStatus(detail.id, next);
      setConfirm(false);
      setDetail(await api.platform.getMerchant(detail.id));
      await loadList();
    } catch (e) {
      setError(e.message || 'Could not change the status.');
    } finally {
      setBusy(false);
    }
  };

  const owner = detail?.staffMemberships?.find((s) => s.role?.key === 'OWNER');
  const statuses = ['ALL', 'ACTIVE', 'SUSPENDED'];

  return (
    <AdminPage active="businesses" title="Businesses" subtitle="Every business on Temelash.">
      {error ? <p role="alert" style={{ margin: 0, color: '#c81d29', fontWeight: 600 }}>{error}</p> : null}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="search"
          placeholder="Find a business"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: '1 1 240px', border: '1px solid #e3e5ec', borderRadius: '12px', padding: '10px 14px', fontSize: '15px' }}
        />
        {statuses.map((sKey) => (
          <button
            key={sKey}
            type="button"
            aria-pressed={status === sKey}
            onClick={() => setStatus(sKey)}
            style={{
              border: '1px solid ' + (status === sKey ? '#101827' : '#e3e5ec'),
              background: status === sKey ? '#101827' : '#ffffff',
              color: status === sKey ? '#ffffff' : '#101827',
              borderRadius: '999px',
              padding: '6px 14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {sKey === 'ALL' ? 'All' : sKey.charAt(0) + sKey.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <section style={{ ...card, flex: '1 1 300px', padding: '8px' }}>
          {list === null ? <p style={{ margin: '12px', color: '#5b6475' }}>Loading…</p> : null}
          {list && rows.length === 0 ? (
            <p style={{ margin: '12px', color: '#5b6475' }}>
              {list.length === 0 ? 'No businesses yet. Approve an application to add one.' : 'No business matches.'}
            </p>
          ) : null}
          {rows.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelId(m.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                border: 'none',
                borderRadius: '12px',
                background: m.id === selId ? '#f1f3f8' : 'transparent',
                padding: '12px',
                cursor: 'pointer',
              }}
            >
              <strong style={{ display: 'block' }}>{m.nameEn}</strong>
              <span style={{ fontSize: '14px', color: m.status === 'ACTIVE' ? '#5b6475' : '#c81d29' }}>
                {`${m.status === 'ACTIVE' ? 'Active' : 'Suspended'} · ${m._count?.customers ?? 0} customers`}
              </span>
            </button>
          ))}
        </section>

        {detail ? (
          <section style={{ ...card, flex: '2 1 380px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '22px' }}>{detail.nameEn}</h2>
              <span style={{ color: detail.status === 'ACTIVE' ? '#1d6b3a' : '#c81d29', fontWeight: 700 }}>
                {detail.status === 'ACTIVE' ? 'Active' : 'Suspended'}
              </span>
            </div>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 16px' }}>
              <dt style={{ color: '#5b6475' }}>Join code</dt>
              <dd style={{ margin: 0, fontWeight: 600 }}>
                <a href={`${getAppOrigin()}/p/${encodeURIComponent(detail.joinReference)}`} target="_blank" rel="noreferrer">
                  {detail.joinReference}
                </a>
              </dd>
              <dt style={{ color: '#5b6475' }}>Owner</dt>
              <dd style={{ margin: 0, fontWeight: 600 }}>
                {owner ? `${owner.user?.displayName || ''} · ${owner.user?.email || ''} (${owner.status === 'INVITED' ? 'invited, not signed up yet' : 'active'})` : '—'}
              </dd>
              <dt style={{ color: '#5b6475' }}>Joined</dt>
              <dd style={{ margin: 0 }}>{new Date(detail.createdAt).toLocaleDateString()}</dd>
              <dt style={{ color: '#5b6475' }}>Customers</dt>
              <dd style={{ margin: 0 }}>{detail._count?.customers ?? 0}</dd>
              <dt style={{ color: '#5b6475' }}>Branches</dt>
              <dd style={{ margin: 0 }}>{detail.branches?.length ?? 0}</dd>
            </dl>

            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: '16px' }}>Loyalty programs</h3>
              {detail.programs?.length ? (
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  {detail.programs.map((p) => (
                    <li key={p.id}>
                      {`${p.nameEn} · ${p.status.toLowerCase()} · ${p.stampsRequired} stamps`}
                      {p.rewardDefinitions?.[0] ? ` → ${p.rewardDefinitions[0].nameEn}` : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, color: '#5b6475' }}>None yet: the owner creates it during setup.</p>
              )}
            </div>

            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: '16px' }}>Team</h3>
              {detail.staffMemberships?.length ? (
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  {detail.staffMemberships.map((s) => (
                    <li key={s.id}>{`${s.user?.displayName || s.user?.email} · ${s.role?.name || s.role?.key} · ${s.status.toLowerCase()}`}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, color: '#5b6475' }}>No team members.</p>
              )}
            </div>

            {detail.status === 'ACTIVE' ? (
              confirm ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ margin: 0 }}>
                    Suspending closes this business's join page, so no new customers can join. Existing cards and
                    stamps are kept.
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" style={btn(true)} disabled={busy} onClick={() => setMerchantStatus('SUSPENDED')}>
                      {busy ? 'Suspending…' : 'Yes, suspend'}
                    </button>
                    <button type="button" style={btn(false)} onClick={() => setConfirm(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button type="button" style={btn(false)} onClick={() => setConfirm(true)}>
                    Suspend business
                  </button>
                </div>
              )
            ) : (
              <div>
                <button type="button" style={btn(true)} disabled={busy} onClick={() => setMerchantStatus('ACTIVE')}>
                  {busy ? 'Reactivating…' : 'Reactivate business'}
                </button>
              </div>
            )}
          </section>
        ) : null}
      </div>
    </AdminPage>
  );
}
