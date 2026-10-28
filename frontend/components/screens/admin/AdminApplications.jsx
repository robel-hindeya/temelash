'use client';
import React, { useCallback, useEffect, useState } from 'react';
import api, { getAppOrigin } from '@/lib/api';
import AdminPage from './AdminPage';

// Business applications from the public "Register your business" form. Approving creates the business
// and an owner invitation; the admin sends the owner the link (email delivery is not built yet).
const TABS = [
  ['PENDING', 'Waiting'],
  ['APPROVED', 'Approved'],
  ['REJECTED', 'Rejected'],
];

const card = { background: '#ffffff', border: '1px solid #e3e5ec', borderRadius: '16px', padding: '20px' };
const button = (primary) => ({
  border: primary ? 'none' : '1px solid #e3e5ec',
  background: primary ? '#e42330' : '#ffffff',
  color: primary ? '#ffffff' : '#101827',
  fontWeight: 700,
  borderRadius: '12px',
  padding: '10px 18px',
  minHeight: '44px',
  cursor: 'pointer',
});

export default function AdminApplications() {
  const [tab, setTab] = useState('PENDING');
  const [apps, setApps] = useState(null);
  const [selId, setSelId] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [reason, setReason] = useState('');
  const [rejecting, setRejecting] = useState(false);
  const [invite, setInvite] = useState(null); // { link, email, days, business }
  const [copied, setCopied] = useState(false);

  const load = useCallback(async (status) => {
    setApps(null);
    setError('');
    try {
      const list = await api.platform.getApplications(status);
      setApps(list);
      setSelId(list[0]?.id ?? null);
    } catch (e) {
      setApps([]);
      setError(e.message || 'Could not load applications.');
    }
  }, []);

  useEffect(() => {
    load(tab);
  }, [tab, load]);

  const sel = (apps || []).find((a) => a.id === selId) || null;

  const approve = async () => {
    setBusy(true);
    setError('');
    try {
      const res = await api.platform.approveApplication(sel.id);
      const link = `${getAppOrigin()}/staff/join/${res.invitationToken}?email=${encodeURIComponent(res.ownerEmail)}`;
      setInvite({ link, email: res.ownerEmail, days: res.expiresInDays, business: sel.businessName });
      setCopied(false);
      await load(tab);
    } catch (e) {
      setError(e.message || 'Could not approve.');
    } finally {
      setBusy(false);
    }
  };

  const reject = async () => {
    if (reason.trim().length < 3) {
      setError('Write a short reason the applicant will understand.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await api.platform.rejectApplication(sel.id, reason.trim());
      setRejecting(false);
      setReason('');
      await load(tab);
    } catch (e) {
      setError(e.message || 'Could not reject.');
    } finally {
      setBusy(false);
    }
  };

  const fmt = (iso) => (iso ? new Date(iso).toLocaleString() : '');

  return (
    <AdminPage active="applications" title="Applications" subtitle="Businesses that asked to join from the website.">
      {invite ? (
        <section role="status" style={{ ...card, borderColor: '#4661ad' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '18px' }}>{`${invite.business} is approved`}</h2>
          <p style={{ margin: '0 0 12px', color: '#374151' }}>
            {`Send this link to ${invite.email} (by email, Telegram or SMS). It lets them set a password and open their dashboard. It works once and expires in ${invite.days} days.`}
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input readOnly value={invite.link} style={{ flex: '1 1 320px', border: '1px solid #e3e5ec', borderRadius: '10px', padding: '10px 12px', fontSize: '14px' }} />
            <button
              type="button"
              style={button(true)}
              onClick={() => {
                navigator.clipboard?.writeText(invite.link).then(() => setCopied(true), () => {});
              }}
            >
              {copied ? 'Copied' : 'Copy link'}
            </button>
            <button type="button" style={button(false)} onClick={() => setInvite(null)}>
              Done
            </button>
          </div>
        </section>
      ) : null}

      <div role="tablist" style={{ display: 'flex', gap: '6px' }}>
        {TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            style={{
              border: '1px solid ' + (tab === id ? '#101827' : '#e3e5ec'),
              background: tab === id ? '#101827' : '#ffffff',
              color: tab === id ? '#ffffff' : '#101827',
              borderRadius: '999px',
              padding: '6px 14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {error ? <p role="alert" style={{ margin: 0, color: '#c81d29', fontWeight: 600 }}>{error}</p> : null}

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <section style={{ ...card, flex: '1 1 300px', padding: '8px' }}>
          {apps === null ? <p style={{ margin: '12px', color: '#5b6475' }}>Loading…</p> : null}
          {apps && apps.length === 0 ? (
            <p style={{ margin: '12px', color: '#5b6475' }}>
              {tab === 'PENDING' ? 'No applications waiting. New sign-ups appear here.' : 'Nothing here yet.'}
            </p>
          ) : null}
          {(apps || []).map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => {
                setSelId(a.id);
                setRejecting(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                border: 'none',
                borderRadius: '12px',
                background: a.id === selId ? '#f1f3f8' : 'transparent',
                padding: '12px',
                cursor: 'pointer',
              }}
            >
              <strong style={{ display: 'block' }}>{a.businessName}</strong>
              <span style={{ fontSize: '14px', color: '#5b6475' }}>
                {[a.category, a.city, fmt(a.createdAt)].filter(Boolean).join(' · ')}
              </span>
            </button>
          ))}
        </section>

        {sel ? (
          <section style={{ ...card, flex: '2 1 380px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '22px' }}>{sel.businessName}</h2>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 16px' }}>
              {[
                ['Type', sel.category],
                ['City', sel.city],
                ['Contact', sel.contactName],
                ['Email', sel.email],
                ['Phone', sel.phoneE164],
                ['Applied', fmt(sel.createdAt)],
                ['Decided', fmt(sel.decidedAt)],
                ['Reason', sel.rejectionReason],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt style={{ color: '#5b6475' }}>{k}</dt>
                    <dd style={{ margin: 0, fontWeight: 600, overflowWrap: 'anywhere' }}>{v}</dd>
                  </React.Fragment>
                ))}
            </dl>

            {sel.status === 'PENDING' ? (
              <>
                <p style={{ margin: 0, color: '#374151', fontSize: '14px' }}>
                  Check the business is real (call the number, look it up) before approving. Approving creates the
                  business and gives you a sign-up link for the owner.
                </p>
                {rejecting ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="reject-reason" style={{ fontWeight: 700 }}>
                      Reason (kept on record)
                    </label>
                    <textarea
                      id="reject-reason"
                      rows={3}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      style={{ border: '1px solid #e3e5ec', borderRadius: '10px', padding: '10px 12px', font: 'inherit' }}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button type="button" style={button(true)} disabled={busy} onClick={reject}>
                        {busy ? 'Rejecting…' : 'Reject application'}
                      </button>
                      <button type="button" style={button(false)} onClick={() => setRejecting(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" style={button(true)} disabled={busy} onClick={approve}>
                      {busy ? 'Approving…' : 'Approve and create business'}
                    </button>
                    <button type="button" style={button(false)} onClick={() => setRejecting(true)}>
                      Reject
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </section>
        ) : null}
      </div>
    </AdminPage>
  );
}
