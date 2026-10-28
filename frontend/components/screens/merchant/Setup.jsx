'use client';
import React, { useEffect, useState } from 'react';
import api, { getMerchantJoinUrl } from '@/lib/api';
import MerchantPage from './MerchantPage';

// First-time setup, saved to the backend: business name, then the stamp card and its reward, then going live
// (creates and activates the loyalty program). If a program is already live it shows that instead.
const card = { background: '#ffffff', border: '1px solid #e3e5ec', borderRadius: '16px', padding: '24px' };
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
const COLORS = [
  ['#101827', 'Navy'],
  ['#4661ad', 'Blue'],
  ['#2f6b4f', 'Green'],
  ['#7a3e9d', 'Purple'],
  ['#8a4b2a', 'Coffee brown'],
  ['#c2410c', 'Burnt orange'],
];
const STEPS = ['Business', 'Card and reward', 'Go live'];

function CardPreview({ name, color, count, reward }) {
  return (
    <div style={{ background: color, color: '#ffffff', borderRadius: '18px', padding: '20px', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '12px' }} aria-label="Card preview">
      <strong style={{ fontSize: '18px' }}>{name || 'Your business'}</strong>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              border: `2px ${i === count - 1 ? 'dashed' : 'solid'} rgba(255,255,255,0.7)`,
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: '14px' }}>{`${count} stamps → ${reward || 'your reward'}`}</span>
    </div>
  );
}

export default function Setup() {
  const [loaded, setLoaded] = useState(false);
  const [live, setLive] = useState(null); // the active program, if any
  const [draft, setDraft] = useState(null); // an unfinished program to reuse
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ nameEn: '', nameAm: '', count: 10, reward: '', color: '#101827' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.allSettled([api.merchant.getProfile(), api.merchant.getPrograms()]).then(([prof, progs]) => {
      const p = prof.status === 'fulfilled' ? prof.value : null;
      const list = progs.status === 'fulfilled' && Array.isArray(progs.value) ? progs.value : [];
      const active = list.find((x) => x.status === 'ACTIVE');
      const unfinished = list.find((x) => x.status === 'DRAFT');
      setLive(active || null);
      setDraft(unfinished || null);
      setF((cur) => ({
        ...cur,
        nameEn: p?.nameEn || '',
        nameAm: p?.nameAm || '',
        count: unfinished?.stampsRequired || p?.programDefaults?.stampsRequired || cur.count,
        reward: unfinished?.reward?.nameEn || '',
        color: unfinished?.brandColor || cur.color,
      }));
      if (prof.status === 'rejected') setError(prof.reason?.message || 'Could not load your business.');
      setLoaded(true);
    });
  }, []);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const saveBusiness = async () => {
    if (!f.nameEn.trim()) {
      setError('Your business needs a name.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await api.merchant.updateProfile({ nameEn: f.nameEn.trim(), nameAm: f.nameAm.trim() || null });
      setStep(2);
    } catch (e) {
      setError(e.message || 'Could not save.');
    } finally {
      setBusy(false);
    }
  };

  const toGoLive = () => {
    const n = Number(f.count);
    if (!Number.isInteger(n) || n < 2 || n > 50) {
      setError('Choose between 2 and 50 stamps.');
      return;
    }
    if (!f.reward.trim()) {
      setError('Say what the reward is, for example "a free macchiato".');
      return;
    }
    setError('');
    setStep(3);
  };

  const goLive = async () => {
    setBusy(true);
    setError('');
    const data = {
      nameEn: `${f.nameEn.trim()} card`,
      stampsRequired: Number(f.count),
      brandColor: f.color,
      reward: { nameEn: f.reward.trim() },
    };
    try {
      const program = draft ? await api.merchant.updateProgram(draft.id, data) : await api.merchant.createProgram(data);
      setDraft(program);
      const activated = await api.merchant.activateProgram(program.id);
      setLive(activated || { ...program, status: 'ACTIVE' });
    } catch (e) {
      setError(e.message || 'Could not go live. Try again.');
    } finally {
      setBusy(false);
    }
  };

  if (!loaded) {
    return (
      <MerchantPage active="overview" title="Set up your card">
        <p style={{ margin: 0, color: '#5b6475' }}>Loading…</p>
      </MerchantPage>
    );
  }

  if (live) {
    return (
      <MerchantPage active="overview" title="Your card is live" subtitle="Customers can join by scanning your QR code.">
        <section style={{ ...card, display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <CardPreview name={f.nameEn} color={live.brandColor || f.color} count={live.stampsRequired} reward={live.reward?.nameEn} />
          <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ margin: 0 }}>{`${live.nameEn}: ${live.stampsRequired} stamps earn ${live.reward?.nameEn || 'the reward'}.`}</p>
            <code style={{ fontSize: '13px', color: '#5b6475', overflowWrap: 'anywhere' }}>{getMerchantJoinUrl()}</code>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <a href="/business/shop" style={btn(true)}>
                Get your QR code
              </a>
              <a href="/business/rewards" style={btn(false)}>
                Change the reward
              </a>
              <a href="/business/settings" style={btn(false)}>
                Invite staff
              </a>
            </div>
          </div>
        </section>
      </MerchantPage>
    );
  }

  return (
    <MerchantPage active="overview" title="Set up your card" subtitle="Three steps, and customers can start collecting stamps.">
      <ol aria-label="Setup steps" style={{ display: 'flex', gap: '16px', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap' }}>
        {STEPS.map((s, i) => (
          <li key={s} aria-current={step === i + 1 ? 'step' : undefined} style={{ fontWeight: step === i + 1 ? 800 : 600, color: step >= i + 1 ? '#101827' : '#5b6475' }}>
            {`${step > i + 1 ? '✓' : i + 1}. ${s}`}
          </li>
        ))}
      </ol>
      {error ? <p role="alert" style={{ margin: 0, color: '#c81d29', fontWeight: 600 }}>{error}</p> : null}

      {step === 1 ? (
        <section style={{ ...card, display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <label style={label}>
            Business name (English)
            <input style={input} value={f.nameEn} onChange={set('nameEn')} />
          </label>
          <label style={label}>
            Business name (Amharic, optional)
            <input style={input} value={f.nameAm} onChange={set('nameAm')} />
          </label>
          <div style={{ gridColumn: '1 / -1' }}>
            <button type="button" style={btn(true)} disabled={busy} onClick={saveBusiness}>
              {busy ? 'Saving…' : 'Next'}
            </button>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section style={{ ...card, display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={label}>
              Stamps needed for the reward
              <input type="number" min={2} max={50} style={input} value={f.count} onChange={set('count')} />
            </label>
            <label style={label}>
              Reward
              <input style={input} placeholder="a free macchiato" value={f.reward} onChange={set('reward')} />
            </label>
            <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
              <legend style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>Card colour</legend>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {COLORS.map(([hex, name]) => (
                  <button
                    key={hex}
                    type="button"
                    aria-label={name}
                    aria-pressed={f.color === hex}
                    onClick={() => setF({ ...f, color: hex })}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: hex, border: `3px solid ${f.color === hex ? '#e42330' : '#e3e5ec'}`, cursor: 'pointer' }}
                  />
                ))}
              </div>
            </fieldset>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" style={btn(false)} onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" style={btn(true)} onClick={toGoLive}>
                Next
              </button>
            </div>
          </div>
          <CardPreview name={f.nameEn} color={f.color} count={Math.min(50, Math.max(2, Number(f.count) || 2))} reward={f.reward} />
        </section>
      ) : null}

      {step === 3 ? (
        <section style={{ ...card, display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <CardPreview name={f.nameEn} color={f.color} count={Number(f.count)} reward={f.reward} />
          <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ margin: 0 }}>
              Going live opens your join page. Once customers join, the number of stamps can no longer change; the reward can.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" style={btn(false)} onClick={() => setStep(2)}>
                Back
              </button>
              <button type="button" style={btn(true)} disabled={busy} onClick={goLive}>
                {busy ? 'Going live…' : 'Go live'}
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </MerchantPage>
  );
}
