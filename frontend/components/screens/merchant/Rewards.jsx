'use client';
import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import MerchantPage, { NotAvailableYet } from './MerchantPage';

// The live program's reward, saved to the backend: stamps needed (locked once customers have joined), the
// reward in English and Amharic, and how long an unlocked reward stays valid.
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
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
});

export default function Rewards() {
  const [program, setProgram] = useState(undefined);
  const [f, setF] = useState(null);
  const [note, setNote] = useState({ text: '', error: false });
  const [busy, setBusy] = useState(false);

  const fill = (p) => {
    setProgram(p);
    if (p)
      setF({
        count: String(p.stampsRequired),
        nameEn: p.reward?.nameEn || '',
        nameAm: p.reward?.nameAm || '',
        descriptionEn: p.reward?.descriptionEn || '',
        days: p.reward?.validForDays ? String(p.reward.validForDays) : '',
      });
  };

  useEffect(() => {
    api.merchant
      .getPrograms('ACTIVE')
      .then((list) => fill(Array.isArray(list) ? list[0] || null : null))
      .catch((e) => {
        setProgram(null);
        setNote({ text: e.message || 'Could not load your program.', error: true });
      });
  }, []);

  if (program === undefined) {
    return (
      <MerchantPage active="rewards" title="Rewards">
        <p style={{ margin: 0, color: '#5b6475' }}>Loading…</p>
      </MerchantPage>
    );
  }

  if (!program) {
    return (
      <MerchantPage active="rewards" title="Rewards">
        {note.text ? <p role="alert" style={{ margin: 0, color: '#c81d29', fontWeight: 600 }}>{note.text}</p> : null}
        <section style={card}>
          <p style={{ margin: '0 0 12px' }}>Your card is not live yet. Set the stamps and the reward, then go live.</p>
          <a href="/business/setup" style={btn(true)}>
            Set up your card
          </a>
        </section>
      </MerchantPage>
    );
  }

  const save = async () => {
    const count = Number(f.count);
    const days = f.days.trim() ? Number(f.days) : null;
    if (!program.stampsRequiredLocked && (!Number.isInteger(count) || count < 2 || count > 50)) {
      setNote({ text: 'Choose between 2 and 50 stamps.', error: true });
      return;
    }
    if (!f.nameEn.trim()) {
      setNote({ text: 'Say what the reward is.', error: true });
      return;
    }
    if (days !== null && (!Number.isInteger(days) || days < 1 || days > 3650)) {
      setNote({ text: 'Valid days must be a whole number from 1 to 3650, or empty for no expiry.', error: true });
      return;
    }
    setBusy(true);
    setNote({ text: '', error: false });
    try {
      const data = {
        reward: {
          nameEn: f.nameEn.trim(),
          nameAm: f.nameAm.trim() || null,
          descriptionEn: f.descriptionEn.trim() || null,
          validForDays: days,
        },
      };
      if (!program.stampsRequiredLocked) data.stampsRequired = count;
      fill(await api.merchant.updateProgram(program.id, data));
      setNote({ text: 'Saved. Every card shows it now.', error: false });
    } catch (e) {
      setNote({ text: e.message || 'Could not save.', error: true });
    } finally {
      setBusy(false);
    }
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <MerchantPage active="rewards" title="Rewards" subtitle={`${program.nameEn} · ${program.memberCount} customers`}>
      <section style={{ ...card, display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <label style={label}>
          Stamps needed
          <input type="number" min={2} max={50} style={input} value={f.count} disabled={program.stampsRequiredLocked} onChange={set('count')} />
          {program.stampsRequiredLocked ? (
            <span style={{ fontWeight: 400, color: '#5b6475' }}>Fixed now that customers have joined, so nobody loses stamps.</span>
          ) : null}
        </label>
        <label style={label}>
          Reward (English)
          <input style={input} placeholder="Free macchiato" value={f.nameEn} onChange={set('nameEn')} />
        </label>
        <label style={label}>
          Reward (Amharic, optional)
          <input style={input} value={f.nameAm} onChange={set('nameAm')} />
        </label>
        <label style={label}>
          Details (optional)
          <input style={input} placeholder="Any size, dine in or take away" value={f.descriptionEn} onChange={set('descriptionEn')} />
        </label>
        <label style={label}>
          Valid for (days after unlocking)
          <input type="number" min={1} max={3650} style={input} placeholder="No expiry" value={f.days} onChange={set('days')} />
        </label>
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" style={btn(true)} disabled={busy} onClick={save}>
            {busy ? 'Saving…' : 'Save'}
          </button>
          {note.text ? (
            <p role={note.error ? 'alert' : 'status'} style={{ margin: 0, color: note.error ? '#c81d29' : '#1d6b3a', fontWeight: 600 }}>
              {note.text}
            </p>
          ) : null}
        </div>
      </section>
      <NotAvailableYet
        what="Extra rewards along the way, and birthday or welcome-back rewards"
        plan="A card has one reward for now. Telegram customers already get a message when they earn a stamp, unlock the reward, and before it expires."
      />
    </MerchantPage>
  );
}
