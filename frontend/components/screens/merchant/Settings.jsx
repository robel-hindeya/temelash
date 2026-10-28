'use client';
import React, { useCallback, useEffect, useState } from 'react';
import api, { getAppOrigin, getStoredUser } from '@/lib/api';
import MerchantPage, { NotAvailableYet } from './MerchantPage';

// Staff and settings, all from the backend: team and invitations, stamping activity per person, business
// profile, branches and the signed-in account. Billing is not built yet.
const TABS = [
  ['staff', 'Staff'],
  ['biz', 'Business'],
  ['branches', 'Branches'],
  ['billing', 'Plan and billing'],
  ['profile', 'My profile'],
];
const ROLE_LABEL = { OWNER: 'Owner', MANAGER: 'Manager', STAFF: 'Staff' };
const ROLE_CAN = {
  OWNER: 'Full access, including business settings',
  MANAGER: 'Business dashboard: overview, customers, offers and staff',
  STAFF: 'Staff scanner: adds stamps and redeems rewards',
};

const card = { background: '#ffffff', border: '1px solid #e3e5ec', borderRadius: '16px', padding: '20px' };
const input = { border: '1px solid #e3e5ec', borderRadius: '10px', padding: '10px 12px', fontSize: '15px', font: 'inherit', width: '100%', boxSizing: 'border-box' };
const label = { display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: 700, fontSize: '14px' };
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
const pill = (on) => ({
  border: '1px solid ' + (on ? '#101827' : '#e3e5ec'),
  background: on ? '#101827' : '#ffffff',
  color: on ? '#ffffff' : '#101827',
  borderRadius: '999px',
  padding: '6px 14px',
  fontWeight: 700,
  cursor: 'pointer',
});

function Note({ text, error }) {
  if (!text) return null;
  return (
    <p role={error ? 'alert' : 'status'} style={{ margin: 0, color: error ? '#c81d29' : '#1d6b3a', fontWeight: 600 }}>
      {text}
    </p>
  );
}

function inviteLink(token, email, role) {
  const params = new URLSearchParams({ email });
  if (role === 'MANAGER') params.set('role', 'manager');
  return `${getAppOrigin()}/staff/join/${token}?${params.toString()}`;
}

function InviteBox({ invite, onDone }) {
  const [copied, setCopied] = useState(false);
  return (
    <section role="status" style={{ ...card, borderColor: '#4661ad' }}>
      <h2 style={{ margin: '0 0 6px', fontSize: '18px' }}>{`Invite link for ${invite.name}`}</h2>
      <p style={{ margin: '0 0 12px', color: '#374151' }}>
        {`Send it to ${invite.email} (Telegram, SMS or email). It works once and is shown only now; you can make a new one later from the team list.`}
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input readOnly value={invite.link} aria-label="Invite link" style={{ ...input, flex: '1 1 320px', width: 'auto' }} />
        <button type="button" style={btn(true)} onClick={() => navigator.clipboard?.writeText(invite.link).then(() => setCopied(true), () => {})}>
          {copied ? 'Copied' : 'Copy link'}
        </button>
        <button type="button" style={btn(false)} onClick={onDone}>
          Done
        </button>
      </div>
    </section>
  );
}

function StaffTab({ branches }) {
  const [team, setTeam] = useState(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [iv, setIv] = useState({ name: '', email: '', role: 'STAFF', branchId: '' });
  const [busy, setBusy] = useState(false);
  const [invite, setInvite] = useState(null);
  const [range, setRange] = useState(7);
  const [activity, setActivity] = useState(null);

  const load = useCallback(async () => {
    try {
      const rows = await api.merchant.getStaff();
      setTeam(Array.isArray(rows) ? rows : []);
    } catch (e) {
      setTeam([]);
      setError(e.message || 'Could not load your team.');
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setActivity(null);
    const from = new Date(Date.now() - (range - 1) * 86400000).toISOString().slice(0, 10);
    api.merchant
      .getStaffAnalytics({ from, limit: '100' })
      .then((res) => setActivity(res?.items || []))
      .catch(() => setActivity([]));
  }, [range]);

  const act = async (fn, okText) => {
    setBusy(true);
    setError('');
    try {
      const res = await fn();
      await load();
      return res ?? okText ?? true;
    } catch (e) {
      setError(e.message || 'That did not work. Try again.');
      return null;
    } finally {
      setBusy(false);
    }
  };

  const sendInvite = async () => {
    const name = iv.name.trim();
    const email = iv.email.trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter their name and a valid email (they sign in with it).');
      return;
    }
    const branchId = iv.branchId || branches[0]?.id;
    if (iv.role === 'STAFF' && !branchId) {
      setError('Add a branch first: staff work at a branch.');
      return;
    }
    const res = await act(() =>
      api.merchant.inviteStaff({ displayName: name, email, role: iv.role, branchIds: branchId ? [branchId] : [], preferredLanguage: 'EN' }),
    );
    const token = res?.invitation?.token;
    if (token) {
      setInvite({ name, email, link: inviteLink(token, email, iv.role) });
      setIv({ name: '', email: '', role: 'STAFF', branchId: '' });
      setOpen(false);
    }
  };

  const newLink = async (m) => {
    const res = await act(() => api.merchant.reissueInvitation(m.id));
    if (res?.token) setInvite({ name: m.displayName, email: m.email, link: inviteLink(res.token, m.email, m.roleKey) });
  };

  const visible = (team || []).filter((m) => m.status !== 'DEACTIVATED');
  const removed = (team || []).filter((m) => m.status === 'DEACTIVATED');

  return (
    <>
      {invite ? <InviteBox invite={invite} onDone={() => setInvite(null)} /> : null}
      <Note text={error} error />
      <section style={{ ...card, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Your team</h2>
          <button type="button" style={btn(!open)} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Invite staff'}
          </button>
        </div>

        {open ? (
          <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', background: '#f7f7f9', borderRadius: '12px', padding: '16px' }}>
            <label style={label}>
              Name
              <input style={input} value={iv.name} onChange={(e) => setIv({ ...iv, name: e.target.value })} />
            </label>
            <label style={label}>
              Email (their sign-in)
              <input type="email" style={input} value={iv.email} onChange={(e) => setIv({ ...iv, email: e.target.value })} />
            </label>
            <label style={label}>
              Role
              <select style={input} value={iv.role} onChange={(e) => setIv({ ...iv, role: e.target.value })}>
                <option value="STAFF">Staff: {ROLE_CAN.STAFF}</option>
                <option value="MANAGER">Manager: {ROLE_CAN.MANAGER}</option>
              </select>
            </label>
            {branches.length > 1 ? (
              <label style={label}>
                Branch
                <select style={input} value={iv.branchId || branches[0].id} onChange={(e) => setIv({ ...iv, branchId: e.target.value })}>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.nameEn}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            <div style={{ alignSelf: 'end' }}>
              <button type="button" style={btn(true)} disabled={busy} onClick={sendInvite}>
                {busy ? 'Creating…' : 'Create invite link'}
              </button>
            </div>
          </div>
        ) : null}

        {team === null ? <p style={{ margin: 0, color: '#5b6475' }}>Loading…</p> : null}
        {visible.map((m) => (
          <div key={m.id} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid #e3e5ec', paddingTop: '12px' }}>
            <div style={{ flex: '1 1 240px' }}>
              <strong style={{ display: 'block' }}>{m.displayName || m.email}</strong>
              <span style={{ fontSize: '14px', color: '#5b6475' }}>
                {`${ROLE_LABEL[m.roleKey] || m.roleKey} · ${m.email} · ${m.status === 'INVITED' ? 'invited, not joined yet' : 'active'}`}
              </span>
              <span style={{ display: 'block', fontSize: '13px', color: '#5b6475' }}>{ROLE_CAN[m.roleKey]}</span>
            </div>
            {m.roleKey !== 'OWNER' ? (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {m.status === 'INVITED' ? (
                  <button type="button" style={btn(false)} disabled={busy} onClick={() => newLink(m)}>
                    New invite link
                  </button>
                ) : null}
                <button
                  type="button"
                  style={btn(false)}
                  disabled={busy}
                  onClick={() => act(() => api.merchant.changeStaffRole(m.id, m.roleKey === 'MANAGER' ? 'STAFF' : 'MANAGER'))}
                >
                  {m.roleKey === 'MANAGER' ? 'Make staff' : 'Make manager'}
                </button>
                <button type="button" style={btn(false)} disabled={busy} onClick={() => act(() => api.merchant.deactivateStaff(m.id))}>
                  Remove access
                </button>
              </div>
            ) : null}
          </div>
        ))}
        {removed.length ? (
          <details>
            <summary style={{ cursor: 'pointer', color: '#5b6475' }}>{`Removed (${removed.length})`}</summary>
            {removed.map((m) => (
              <div key={m.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '8px 0' }}>
                <span style={{ flex: 1 }}>{`${m.displayName || m.email} · ${m.email}`}</span>
                <button type="button" style={btn(false)} disabled={busy} onClick={() => act(() => api.merchant.activateStaff(m.id))}>
                  Give access back
                </button>
              </div>
            ))}
          </details>
        ) : null}
      </section>

      <section style={{ ...card, overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Activity</h2>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 7, 30, 60].map((d) => (
              <button key={d} type="button" aria-pressed={range === d} style={pill(range === d)} onClick={() => setRange(d)}>
                {d === 1 ? 'Today' : `${d} days`}
              </button>
            ))}
          </div>
        </div>
        {activity === null ? <p style={{ margin: 0, color: '#5b6475' }}>Loading…</p> : null}
        {activity && activity.length === 0 ? <p style={{ margin: 0, color: '#5b6475' }}>No activity yet.</p> : null}
        {activity && activity.length ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: '12px', letterSpacing: '0.08em', color: '#5b6475' }}>
                {['PERSON', 'STAMPS GIVEN', 'CUSTOMERS', 'REWARDS REDEEMED', 'STAMPS UNDONE'].map((h) => (
                  <th key={h} scope="col" style={{ padding: '8px 12px 8px 0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activity.map((r) => (
                <tr key={r.staffId} style={{ borderTop: '1px solid #e3e5ec' }}>
                  <td style={{ padding: '10px 12px 10px 0', fontWeight: 700 }}>{`${r.displayName} (${ROLE_LABEL[r.role] || r.role})`}</td>
                  <td style={{ padding: '10px 12px 10px 0' }}>{r.stamps}</td>
                  <td style={{ padding: '10px 12px 10px 0' }}>{r.uniqueCustomers}</td>
                  <td style={{ padding: '10px 12px 10px 0' }}>{r.redemptions}</td>
                  <td style={{ padding: '10px 0' }}>{r.stampsReversed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </section>
    </>
  );
}

function BusinessTab({ profile, onSaved }) {
  const [f, setF] = useState(null);
  const [note, setNote] = useState({ text: '', error: false });
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (profile)
      setF({
        nameEn: profile.nameEn || '',
        nameAm: profile.nameAm || '',
        defaultLanguage: profile.defaultLanguage || 'EN',
        supportEmail: profile.supportEmail || '',
        supportPhone: profile.supportPhone || '',
      });
  }, [profile]);
  if (!f) return <p style={{ margin: 0, color: '#5b6475' }}>Loading…</p>;

  const save = async () => {
    if (!f.nameEn.trim()) {
      setNote({ text: 'Your business needs a name.', error: true });
      return;
    }
    setBusy(true);
    setNote({ text: '', error: false });
    try {
      const next = await api.merchant.updateProfile({
        nameEn: f.nameEn.trim(),
        nameAm: f.nameAm.trim() || null,
        defaultLanguage: f.defaultLanguage,
        supportEmail: f.supportEmail.trim() || null,
        supportPhone: f.supportPhone.trim() || null,
      });
      onSaved(next);
      setNote({ text: 'Saved.', error: false });
    } catch (e) {
      setNote({ text: e.message || 'Could not save.', error: true });
    } finally {
      setBusy(false);
    }
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <section style={{ ...card, display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
      <label style={label}>
        Business name (English)
        <input style={input} value={f.nameEn} onChange={set('nameEn')} />
      </label>
      <label style={label}>
        Business name (Amharic)
        <input style={input} value={f.nameAm} onChange={set('nameAm')} />
      </label>
      <label style={label}>
        Card language
        <select style={input} value={f.defaultLanguage} onChange={set('defaultLanguage')}>
          <option value="EN">English</option>
          <option value="AM">Amharic</option>
        </select>
      </label>
      <label style={label}>
        Support email (shown to customers)
        <input type="email" style={input} value={f.supportEmail} onChange={set('supportEmail')} />
      </label>
      <label style={label}>
        Support phone (+251…)
        <input type="tel" style={input} value={f.supportPhone} onChange={set('supportPhone')} />
      </label>
      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button type="button" style={btn(true)} disabled={busy} onClick={save}>
          {busy ? 'Saving…' : 'Save'}
        </button>
        <Note text={note.text} error={note.error} />
      </div>
    </section>
  );
}

function BranchesTab({ branches, reload }) {
  const [edit, setEdit] = useState(null); // 'new' | branch id
  const [f, setF] = useState({ nameEn: '', addressText: '', city: '', phone: '' });
  const [note, setNote] = useState({ text: '', error: false });
  const [busy, setBusy] = useState(false);

  const start = (b) => {
    setNote({ text: '', error: false });
    setEdit(b ? b.id : 'new');
    setF({ nameEn: b?.nameEn || '', addressText: b?.addressText || '', city: b?.city || '', phone: b?.phoneE164 || '' });
  };
  const run = async (fn, okText) => {
    setBusy(true);
    setNote({ text: '', error: false });
    try {
      await fn();
      await reload();
      setEdit(null);
      setNote({ text: okText, error: false });
    } catch (e) {
      setNote({ text: e.message || 'That did not work. Try again.', error: true });
    } finally {
      setBusy(false);
    }
  };
  const save = () => {
    const name = f.nameEn.trim();
    if (!name) {
      setNote({ text: 'Give the branch a name.', error: true });
      return;
    }
    const data = { nameEn: name, addressText: f.addressText.trim() || null, city: f.city.trim() || null, phone: f.phone.trim() || null };
    return edit === 'new'
      ? run(() => api.merchant.createBranch(data), `${name} added.`)
      : run(() => api.merchant.updateBranch(edit, data), `${name} saved.`);
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const form = (
    <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', background: '#f7f7f9', borderRadius: '12px', padding: '16px' }}>
      <label style={label}>
        Name
        <input style={input} value={f.nameEn} onChange={set('nameEn')} />
      </label>
      <label style={label}>
        Address
        <input style={input} value={f.addressText} onChange={set('addressText')} />
      </label>
      <label style={label}>
        City
        <input style={input} value={f.city} onChange={set('city')} />
      </label>
      <label style={label}>
        Phone (+251…)
        <input type="tel" style={input} value={f.phone} onChange={set('phone')} />
      </label>
      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '8px' }}>
        <button type="button" style={btn(true)} disabled={busy} onClick={save}>
          {busy ? 'Saving…' : edit === 'new' ? 'Add branch' : 'Save changes'}
        </button>
        <button type="button" style={btn(false)} onClick={() => setEdit(null)}>
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <section style={{ ...card, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>Branches</h2>
        {edit === null ? (
          <button type="button" style={btn(true)} onClick={() => start(null)}>
            Add branch
          </button>
        ) : null}
      </div>
      <Note text={note.text} error={note.error} />
      {edit === 'new' ? form : null}
      {branches.length === 0 && edit !== 'new' ? <p style={{ margin: 0, color: '#5b6475' }}>No branches yet.</p> : null}
      {branches.map((b) => (
        <div key={b.id} style={{ borderTop: '1px solid #e3e5ec', paddingTop: '12px' }}>
          {edit === b.id ? (
            form
          ) : (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 240px' }}>
                <strong style={{ display: 'block' }}>{b.nameEn}</strong>
                <span style={{ fontSize: '14px', color: b.status === 'ACTIVE' ? '#5b6475' : '#c81d29' }}>
                  {[b.status === 'ACTIVE' ? null : 'Closed', b.addressText, b.city, b.phoneE164].filter(Boolean).join(' · ') || 'No address yet'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" style={btn(false)} onClick={() => start(b)}>
                  Edit
                </button>
                {b.status === 'ACTIVE' ? (
                  <button type="button" style={btn(false)} disabled={busy} onClick={() => run(() => api.merchant.deactivateBranch(b.id), `${b.nameEn} closed.`)}>
                    Close branch
                  </button>
                ) : (
                  <button type="button" style={btn(false)} disabled={busy} onClick={() => run(() => api.merchant.activateBranch(b.id), `${b.nameEn} reopened.`)}>
                    Reopen
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

function ProfileTab() {
  const [me, setMe] = useState(null);
  useEffect(() => {
    const stored = getStoredUser('owner');
    setMe(stored || {});
    api.auth
      .getMe('owner')
      .then((m) => setMe((cur) => ({ ...m, ...cur, email: m?.email || cur?.email })))
      .catch(() => {});
  }, []);
  if (!me) return <p style={{ margin: 0, color: '#5b6475' }}>Loading…</p>;
  return (
    <>
      <section style={card}>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 16px' }}>
          <dt style={{ color: '#5b6475' }}>Name</dt>
          <dd style={{ margin: 0, fontWeight: 600 }}>{me.displayName || '—'}</dd>
          <dt style={{ color: '#5b6475' }}>Email (sign-in)</dt>
          <dd style={{ margin: 0, fontWeight: 600 }}>{me.email || '—'}</dd>
        </dl>
      </section>
      <NotAvailableYet
        what="Changing your name, email or password"
        plan="Editing your own account is not available yet. To change it, contact Temelash support."
      />
    </>
  );
}

export default function Settings() {
  const [tab, setTab] = useState('staff');
  const [profile, setProfile] = useState(null);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState('');

  // The sidebar's account menu opens a tab here (Plan and billing, My profile).
  useEffect(() => {
    try {
      const t = window.sessionStorage.getItem('tm-settings-tab');
      if (t) {
        window.sessionStorage.removeItem('tm-settings-tab');
        setTab(t);
      }
    } catch (e) {}
    const onTab = (e) => {
      try {
        window.sessionStorage.removeItem('tm-settings-tab');
      } catch (x) {}
      setTab(e.detail);
    };
    window.addEventListener('tm-settings-tab', onTab);
    return () => window.removeEventListener('tm-settings-tab', onTab);
  }, []);

  const loadBranches = useCallback(async () => {
    const rows = await api.merchant.getBranches();
    setBranches(Array.isArray(rows) ? rows : []);
  }, []);

  useEffect(() => {
    api.merchant
      .getProfile()
      .then(setProfile)
      .catch((e) => setError(e.message || 'Could not load your business.'));
    loadBranches().catch(() => {});
  }, [loadBranches]);

  const activeBranches = branches.filter((b) => b.status === 'ACTIVE');

  return (
    <MerchantPage active="settings" title="Staff and settings">
      <div role="tablist" aria-label="Settings sections" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', borderBottom: '1px solid #e3e5ec' }}>
        {TABS.map(([id, text]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            style={{
              border: 0,
              background: 'transparent',
              padding: '12px 16px',
              minHeight: '44px',
              cursor: 'pointer',
              fontWeight: 700,
              color: tab === id ? '#101827' : '#5b6475',
              borderBottom: `3px solid ${tab === id ? '#e42330' : 'transparent'}`,
              marginBottom: '-1px',
            }}
          >
            {text}
          </button>
        ))}
      </div>
      <Note text={error} error />
      {tab === 'staff' ? <StaffTab branches={activeBranches} /> : null}
      {tab === 'biz' ? <BusinessTab profile={profile} onSaved={(p) => p && setProfile(p)} /> : null}
      {tab === 'branches' ? <BranchesTab branches={branches} reload={loadBranches} /> : null}
      {tab === 'billing' ? (
        <NotAvailableYet
          what="Plans and payments"
          plan="Temelash does not charge for plans yet, so there is nothing to pay. Telebirr and CBE Birr billing will appear here when it launches."
        />
      ) : null}
      {tab === 'profile' ? <ProfileTab /> : null}
    </MerchantPage>
  );
}
