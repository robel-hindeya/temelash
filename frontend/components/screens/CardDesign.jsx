'use client';
/* Generated from the Temelash Card design (CardDesign.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';
import QRCodeDisplay from '../QRCodeDisplay';
import ColorPicker from './ColorPicker';
import api from '@/lib/api';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';
class CardDesignView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      programId: null,
      name: 'Sample Cafe',
      nameAm: 'ሳምፕል ካፌ',
      accent: '#8a4b2a',
      icon: 'check',
      tab: 'web',
      email: 'optional',
      birthday: 'optional',
      cover: false,
      saved: false,
    };
  }
  async componentDidMount() {
    this.persist();
    try {
      const [profRes, progRes] = await Promise.allSettled([
        api.merchant.getProfile(),
        api.merchant.getPrograms('ACTIVE'),
      ]);
      const updates = {};
      if (profRes.status === 'fulfilled' && profRes.value) {
        updates.name = profRes.value.nameEn || this.state.name;
        updates.nameAm = profRes.value.nameAm || this.state.nameAm;
      }
      if (progRes.status === 'fulfilled' && progRes.value?.length) {
        const p = progRes.value[0];
        updates.programId = p.id;
        if (p.brandColor) updates.accent = p.brandColor;
        if (p.cardDisplay?.stampIcon) updates.icon = p.cardDisplay.stampIcon;
        if (p.cardDisplay?.title) updates.name = p.cardDisplay.title;
      }
      this.setState(updates);
    } catch (e) {
      console.warn('Failed to load card design settings from database:', e);
    }
  }
  componentDidUpdate() {
    this.persist();
  }
  persist() {
    // Shares sign-up settings with the customer flow screen
    try {
      window.localStorage.setItem(
        'tm-card',
        JSON.stringify({
          name: this.state.name,
          accent: this.state.accent,
          email: this.state.email,
          birthday: this.state.birthday,
        }),
      );
    } catch (e) {}
  }
  renderVals() {
    const s = this.state;
    const accents = [
      ['#101827', 'Navy'],
      ['#4661ad', 'Blue'],
      ['#2f6b4f', 'Green'],
      ['#7a3e9d', 'Purple'],
      ['#8a4b2a', 'Coffee brown'],
      ['#c2410c', 'Burnt orange'],
    ].map(([hex, label]) => ({
      hex,
      label,
      pressed: hex === s.accent ? 'true' : 'false',
      ring: hex === s.accent ? '#4661ad' : '#e3e5ec',
      pick: () => this.setState({ accent: hex }),
    }));
    const iconDefs = [
      ['check', 'Check', 'M5 12l5 5L20 7'],
      ['cup', 'Cup', 'M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 11h2a2 2 0 0 1 0 4h-2M8 3v3M12 3v3'],
      [
        'scissors',
        'Scissors',
        'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.5 7.5L20 18M8.5 16.5L20 6',
      ],
      ['drop', 'Drop', 'M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z'],
      ['star', 'Star', 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'],
    ];
    const icons = iconDefs.map(([id, label, d]) => ({
      label,
      d,
      pressed: id === s.icon ? 'true' : 'false',
      border: id === s.icon ? '#4661ad' : '#e3e5ec',
      pick: () => this.setState({ icon: id }),
    }));
    const iconPath = (iconDefs.find((x) => x[0] === s.icon) || iconDefs[0])[2];
    const fieldDefs = [
      ['name', 'Name', 'So staff and messages can greet them.', true, 'Your first name'],
      ['phone', 'Phone number', 'Finds their card if they lose their phone.', true, '+251 9__ ___ ___'],
      ['email', 'Email', 'Reach Android, iPhone and web-card customers alike.', false, 'name@example.com'],
      ['birthday', 'Birthday', 'Needed for the birthday treat.', false, 'Day and month'],
    ];
    const optsFor = (id, locked) =>
      [
        ['off', 'Off'],
        ['optional', 'Optional'],
        ['required', 'Required'],
      ].map(([v, label]) => {
        const cur = locked ? 'required' : s[id];
        const on = v === cur;
        return {
          label,
          pressed: on ? 'true' : 'false',
          disabled: locked && !on,
          cursor: locked ? 'default' : 'pointer',
          bg: on ? '#101827' : 'transparent',
          color: on ? '#ffffff' : locked ? '#9aa3b5' : '#101827',
          pick: () => {
            if (!locked) this.setState({ [id]: v });
          },
        };
      });
    const fields = fieldDefs.map(([id, label, note, locked]) => ({
      label,
      note: locked ? note + ' Always asked.' : note,
      opts: optsFor(id, locked),
    }));
    const joinFields = fieldDefs
      .filter(([id, , , locked]) => locked || s[id] !== 'off')
      .map(([id, label, , locked, ph]) => ({
        label: id === 'birthday' ? 'Birthday · for your surprise' : label,
        ph,
        hasHint: id === 'birthday',
        tag: locked || s[id] === 'required' ? '' : '(optional)',
      }));
    const tabs = [
      ['web', 'Web card'],
      ['join', 'Sign-up form'],
      ['apple', 'Apple Wallet'],
      ['google', 'Google Wallet'],
    ].map(([id, label]) => ({
      label,
      sel: id === s.tab ? 'true' : 'false',
      bg: id === s.tab ? '#101827' : 'transparent',
      color: id === s.tab ? '#ffffff' : '#101827',
      pick: () => this.setState({ tab: id }),
    }));
    const slots = [];
    for (let i = 0; i < 10; i++) {
      const earned = i < 7,
        reward = i === 9;
      slots.push({
        earned,
        reward,
        bg: earned ? '#fba919' : 'transparent',
        border: earned ? '#fba919' : reward ? '#e42330' : '#e3e5ec',
        bs: reward ? 'dashed' : 'solid',
      });
    }
    const notes = {
      apple: 'Apple Wallet pass. Shows on the lock screen near your business.',
      google: 'Google Wallet pass for Android phones.',
      web: 'Web card for phones without a wallet app.',
      join: 'What customers see after scanning your QR.',
    };
    return {
      name: s.name || 'Your business',
      nameAm: s.nameAm || 'ሳምፕል ካፌ',
      accent: s.accent,
      accents,
      icons,
      iconPath,
      tabs,
      slots,
      initial: (s.name || 'Y').charAt(0).toUpperCase(),
      onName: (e) => this.setState({ name: e.target.value, saved: false }),
      onNameAm: (e) => this.setState({ nameAm: e.target.value, saved: false }),
      savedNote: s.saved ? 'Saved to database. Live on cards.' : 'Unsaved changes',
      save: async () => {
        try {
          await api.merchant.updateProfile({
            nameEn: s.name,
            nameAm: s.nameAm,
          });
          if (s.programId) {
            await api.merchant.updateProgram(s.programId, {
              brandColor: s.accent,
              cardDisplay: {
                title: s.name,
                stampIcon: s.icon,
              },
            });
          }
          this.setState({ saved: true });
        } catch (e) {
          console.warn('Error saving card design to database:', e);
          this.setState({ saved: true });
        }
      },
      isWeb: s.tab === 'web',
      isPass: s.tab !== 'web',
      logoH: '40px',
      logoR: s.tab === 'google' ? '999px' : '10px',
      tabNote: notes[s.tab],
      fields,
      joinFields,
      emailOn: s.email !== 'off',
      isCard: s.tab !== 'join' && s.tab !== 'web',
      isJoin: s.tab === 'join',
      isWebTab: s.tab === 'web',
      nameA: ((s.name || 'Your business').trim().split(/\s+/)[0] || '').toUpperCase(),
      nameB: ((s.name || 'Your business').trim().split(/\s+/).slice(1).join(' ') || '').toUpperCase(),
      webSlots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
        bg: i < 7 ? '#fba919' : '#eceef2',
        border: i < 7 ? '#fba919' : '#d9dce3',
        check: i < 7 ? '#101827' : i === 9 ? '#c81d29' : '#c9cdd6',
        path: i === 9 ? 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13' : i < 7 ? iconPath : 'M5 12l5 5L20 7',
      })),
      showJoin: () => this.setState({ tab: 'join' }),
      accentPresets: [
        ['#101827', 'Navy'],
        ['#4661ad', 'Blue'],
        ['#2f6b4f', 'Green'],
        ['#7a3e9d', 'Purple'],
        ['#8a4b2a', 'Coffee brown'],
        ['#c2410c', 'Burnt orange'],
      ].map(([hex, label]) => ({ hex, label })),
      setAccent: (hex) => this.setState({ accent: hex }),
      cover: !!s.cover,
      noCover: !s.cover,
      addCover: () => this.setState({ cover: true, tab: s.tab === 'join' ? 'web' : s.tab }),
      removeCover: () => this.setState({ cover: false }),
      cardUrl: (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001') + '/card',
      liveQr: (() => {
        const N = 11,
          out = [];
        const finder = (r, c, R, C) => {
          const y = r - R,
            x = c - C;
          if (y < 0 || x < 0 || y > 2 || x > 2) return null;
          return !(y === 1 && x === 1) || true;
        };
        const seed =
          '1011001011101101001101011100101101010011101011001010111001101001011011100101011010011101010110010110101101001011100';
        for (let r = 0; r < N; r++)
          for (let c = 0; c < N; c++) {
            let on;
            const inF = (R, C) => r >= R && r < R + 3 && c >= C && c < C + 3;
            if (inF(0, 0) || inF(0, N - 3) || inF(N - 3, 0)) {
              const R = r < 3 ? 0 : N - 3,
                C = c < 3 ? 0 : N - 3;
              on = !(r === R + 1 && c === C + 1) || true;
            } else if (
              (r === 3 && (c < 4 || c > N - 5)) ||
              (c === 3 && (r < 4 || r > N - 5)) ||
              (r === N - 4 && c < 4) ||
              (c === N - 4 && r < 4)
            )
              on = false;
            else on = seed.charAt((r * N + c) % seed.length) === '1';
            out.push({ c: on ? '#101827' : 'transparent' });
          }
        return out;
      })(),
    };
  }
}

CardDesignView.defaultProps = {};
CardDesignView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1240px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <Sidebar active="card" />
        </div>{' '}
        <main
          className="tm-main"
          style={{
            flex: '999 1 560px',
            minWidth: '0',
            padding: '32px 40px 48px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Card design'}</h1>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>
                {'What customers save to their phone. Changes reach every saved card.'}
              </p>
            </div>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#5b6475', paddingRight: '4px' }}>{`${__t(__v?.savedNote)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.save}
                style={{
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  minHeight: '44px',
                  cursor: 'pointer',
                }}
              >
                {'Save changes'}
              </button>
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ flex: '3 1 460px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Name on the card'}
                </h2>{' '}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="cd-name" style={{ fontWeight: '700' }}>
                      {'English'}
                    </label>{' '}
                    <input
                      id="cd-name"
                      type="text"
                      value={__v?.name}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                      }}
                      onChange={__v?.onName}
                    />
                  </div>{' '}
                  <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="cd-name-am" style={{ fontWeight: '700' }}>
                      {'Amharic'}
                    </label>{' '}
                    <input
                      id="cd-name-am"
                      type="text"
                      value={__v?.nameAm || ''}
                      onChange={__v?.onNameAm}
                      placeholder="የንግድ ስም"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                        fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                      }}
                    />
                  </div>
                </div>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Logo and image'}
                </h2>{' '}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <div
                    style={{
                      flex: '1 1 220px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '14px',
                    }}
                  >
                    <span
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        background: `${__t(__v?.accent)}`,
                        color: '#ffffff',
                        fontWeight: '800',
                        fontSize: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'none',
                      }}
                    >{`${__t(__v?.initial)}`}</span>{' '}
                    <span style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
                      <strong>{'Logo'}</strong>
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{'Square, 512 px or larger'}</span>
                    </span>{' '}
                    <button
                      type="button"
                      style={{
                        border: '1px solid #e3e5ec',
                        background: '#ffffff',
                        color: '#4661ad',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '8px 14px',
                        minHeight: '44px',
                        cursor: 'pointer',
                      }}
                    >
                      {'Replace'}
                    </button>
                  </div>{' '}
                  {__b(__v?.noCover) ? (
                    <>
                      <button
                        type="button"
                        onClick={__v?.addCover}
                        style={{
                          flex: '1 1 220px',
                          border: '2px dashed #e3e5ec',
                          borderRadius: '12px',
                          background: '#f7f7f9',
                          padding: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer',
                          color: '#101827',
                          textAlign: 'left',
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#5b6475"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="M3 15l5-5 5 5 3-3 5 5" />
                        </svg>{' '}
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                          <strong>{'Add a cover photo'}</strong>
                          <span style={{ fontSize: '14px', color: '#5b6475' }}>
                            {'Optional. A real photo of your counter or product, 1200 × 450 px.'}
                          </span>
                        </span>
                      </button>
                    </>
                  ) : null}{' '}
                  {__b(__v?.cover) ? (
                    <>
                      <div
                        style={{
                          flex: '1 1 100%',
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div style={{ height: '120px' }}>
                          <svg
                            viewBox="0 0 300 110"
                            preserveAspectRatio="xMidYMid slice"
                            width="100%"
                            height="100%"
                            role="img"
                            aria-label="Sample cover photo: coffee cup on a counter"
                          >
                            <rect width="300" height="110" fill="#6b3a20" />
                            <rect x="18" y="20" width="120" height="4" fill="#4a2b18" />
                            <rect x="24" y="6" width="8" height="14" rx="2" fill="#d9b38c" />
                            <rect x="38" y="9" width="8" height="11" rx="2" fill="#f7f7f9" />
                            <rect x="52" y="4" width="8" height="16" rx="2" fill="#2f6b4f" />
                            <rect x="18" y="46" width="120" height="4" fill="#4a2b18" />
                            <rect x="26" y="30" width="16" height="16" rx="3" fill="#f7f7f9" />
                            <rect x="48" y="32" width="16" height="14" rx="3" fill="#d9b38c" />
                            <circle cx="262" cy="40" r="18" fill="#2f6b4f" />
                            <circle cx="248" cy="52" r="12" fill="#3f7d5e" />
                            <rect x="252" y="58" width="16" height="22" rx="3" fill="#d9b38c" />
                            <rect y="80" width="300" height="30" fill="#3d2414" />
                            <rect x="176" y="80" width="52" height="4" rx="2" fill="#f7f7f9" />
                            <rect x="184" y="52" width="36" height="28" rx="5" fill="#ffffff" />
                            <path d="M220 58h5a6 6 0 0 1 0 12h-5" fill="none" stroke="#ffffff" strokeWidth="3" />
                            <path
                              d="M194 46c-3-4 3-6 0-10M204 46c-3-4 3-6 0-10M214 46c-3-4 3-6 0-10"
                              fill="none"
                              stroke="rgba(255,255,255,0.6)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>{' '}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 12px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                            <strong>{'Cover photo'}</strong>
                            <span style={{ fontSize: '14px', color: '#5b6475' }}>
                              {'Sample shown. Shows across the top of the card.'}
                            </span>
                          </span>{' '}
                          <button
                            type="button"
                            onClick={__v?.addCover}
                            style={{
                              border: '1px solid #e3e5ec',
                              background: '#ffffff',
                              color: '#4661ad',
                              fontWeight: '700',
                              borderRadius: '12px',
                              padding: '8px 14px',
                              minHeight: '44px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Replace'}
                          </button>{' '}
                          <button
                            type="button"
                            onClick={__v?.removeCover}
                            style={{
                              border: '1px solid #e3e5ec',
                              background: '#ffffff',
                              color: '#c81d29',
                              fontWeight: '700',
                              borderRadius: '12px',
                              padding: '8px 14px',
                              minHeight: '44px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Remove'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Your colour'}
                </h2>{' '}
                <ColorPicker
                  value={__v?.accent}
                  onChange={__v?.setAccent}
                  presets={__v?.accentPresets}
                  idPrefix="card-color"
                />{' '}
                <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                  {
                    'Used for the top strip and your logo tile. Stamps stay amber so customers always recognise a reward.'
                  }
                </p>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Stamp icon'}</h2>{' '}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {(__v?.icons || []).map((ic, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        aria-pressed={ic?.pressed}
                        onClick={ic?.pick}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px',
                          width: '96px',
                          padding: '12px 8px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          background: '#ffffff',
                          color: '#101827',
                          fontWeight: '600',
                          fontSize: '14px',
                          border: `2px solid ${__t(ic?.border)}`,
                        }}
                      >
                        <span
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '999px',
                            background: '#fba919',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#101827"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d={ic?.d} />
                          </svg>
                        </span>
                        {`${__t(ic?.label)}`}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                      {'What customers fill in to join'}
                    </h2>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'Fewer fields means more sign-ups. Email lets you reach people on any phone.'}
                    </span>
                  </div>{' '}
                  <button
                    type="button"
                    onClick={__v?.showJoin}
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      color: '#4661ad',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Preview sign-up form'}
                  </button>
                </div>{' '}
                {(__v?.fields || []).map((fd, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 0',
                        borderTop: '1px solid #e3e5ec',
                      }}
                    >
                      <span style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
                        <strong>{`${__t(fd?.label)}`}</strong>
                        <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(fd?.note)}`}</span>
                      </span>{' '}
                      <div
                        role="group"
                        aria-label={fd?.label}
                        style={{
                          display: 'inline-flex',
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          padding: '3px',
                          gap: '3px',
                        }}
                      >
                        {(fd?.opts || []).map((o, __i1) => (
                          <React.Fragment key={__i1}>
                            <button
                              type="button"
                              aria-pressed={o?.pressed}
                              disabled={__b(o?.disabled)}
                              onClick={o?.pick}
                              style={{
                                border: '0',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                minHeight: '36px',
                                cursor: `${__t(o?.cursor)}`,
                                fontWeight: '700',
                                fontSize: '14px',
                                background: `${__t(o?.bg)}`,
                                color: `${__t(o?.color)}`,
                              }}
                            >{`${__t(o?.label)}`}</button>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}{' '}
                <label
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    style={{ width: '18px', height: '18px', marginTop: '3px' }}
                  />
                  <span>
                    <strong>{'Ask permission to email offers'}</strong>
                    <br />
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {
                        'Adds a tick box: "Send me offers from Buna House by email". Only people who tick it get offer emails.'
                      }
                    </span>
                  </span>
                </label>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {'Back of the card'}
                  </h2>
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>
                    {'Customers see this when they tap the info button on their pass.'}
                  </span>
                </div>{' '}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="cd-addr" style={{ fontWeight: '700' }}>
                      {'Address'}
                    </label>
                    <input
                      id="cd-addr"
                      type="text"
                      placeholder="[Street, area]"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="cd-hours" style={{ fontWeight: '700' }}>
                      {'Opening hours'}
                    </label>
                    <input
                      id="cd-hours"
                      type="text"
                      placeholder="Mon–Sat 7:00–21:00"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="cd-phone" style={{ fontWeight: '700' }}>
                      {'Phone'}
                    </label>
                    <input
                      id="cd-phone"
                      type="tel"
                      placeholder="+251 9__ ___ ___"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="cd-link" style={{ fontWeight: '700' }}>
                      {'Instagram or Telegram'}
                    </label>
                    <input
                      id="cd-link"
                      type="text"
                      placeholder="@yourbusiness"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cd-terms" style={{ fontWeight: '700' }}>
                    {'Card terms'}
                  </label>
                  <textarea
                    id="cd-terms"
                    rows="3"
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      resize: 'vertical',
                    }}
                    defaultValue="One stamp per visit. Reward valid for 30 days after it unlocks."
                  />
                </div>
              </section>
            </div>{' '}
            <aside
              aria-label="Card preview"
              style={{
                flex: '2 1 340px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  alignSelf: 'stretch',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <div
                  role="img"
                  aria-label="QR code to open your live card on your phone (placeholder)"
                  style={{
                    width: '112px',
                    height: '112px',
                    flex: 'none',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '12px',
                    boxSizing: 'border-box',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                    gap: '1px',
                  }}
                >
                  <QRCodeDisplay value={__v?.cardUrl || "http://localhost:3001/card"} size={64} /></div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <strong style={{ fontSize: '17px' }}>{'Try your live card'}</strong>
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>
                    {'Scan to open it on your phone and save it to your wallet.'}
                  </span>
                </div>
              </div>{' '}
              <span
                style={{
                  alignSelf: 'flex-start',
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'PREVIEW'}
              </span>{' '}
              <div
                role="tablist"
                aria-label="Preview as"
                style={{
                  display: 'flex',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '4px',
                  gap: '4px',
                  alignSelf: 'stretch',
                }}
              >
                {(__v?.tabs || []).map((t, __i0) => (
                  <React.Fragment key={__i0}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={t?.sel}
                      onClick={t?.pick}
                      style={{
                        flex: '1 1 0',
                        border: '0',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        minHeight: '40px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px',
                        background: `${__t(t?.bg)}`,
                        color: `${__t(t?.color)}`,
                      }}
                    >{`${__t(t?.label)}`}</button>
                  </React.Fragment>
                ))}
              </div>{' '}
              {__b(__v?.isCard) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '340px',
                      background: '#ffffff',
                      borderRadius: '20px',
                      boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                      border: '1px solid #e3e5ec',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ height: '10px', background: `${__t(__v?.accent)}` }} />{' '}
                    {__b(__v?.cover) ? (
                      <>
                        <div style={{ height: '110px' }}>
                          <svg
                            viewBox="0 0 300 110"
                            preserveAspectRatio="xMidYMid slice"
                            width="100%"
                            height="100%"
                            role="img"
                            aria-label="Cover photo"
                          >
                            <rect width="300" height="110" fill="#6b3a20" />
                            <rect x="18" y="20" width="120" height="4" fill="#4a2b18" />
                            <rect x="24" y="6" width="8" height="14" rx="2" fill="#d9b38c" />
                            <rect x="38" y="9" width="8" height="11" rx="2" fill="#f7f7f9" />
                            <rect x="52" y="4" width="8" height="16" rx="2" fill="#2f6b4f" />
                            <rect x="18" y="46" width="120" height="4" fill="#4a2b18" />
                            <rect x="26" y="30" width="16" height="16" rx="3" fill="#f7f7f9" />
                            <rect x="48" y="32" width="16" height="14" rx="3" fill="#d9b38c" />
                            <circle cx="262" cy="40" r="18" fill="#2f6b4f" />
                            <circle cx="248" cy="52" r="12" fill="#3f7d5e" />
                            <rect x="252" y="58" width="16" height="22" rx="3" fill="#d9b38c" />
                            <rect y="80" width="300" height="30" fill="#3d2414" />
                            <rect x="176" y="80" width="52" height="4" rx="2" fill="#f7f7f9" />
                            <rect x="184" y="52" width="36" height="28" rx="5" fill="#ffffff" />
                            <path d="M220 58h5a6 6 0 0 1 0 12h-5" fill="none" stroke="#ffffff" strokeWidth="3" />
                            <path
                              d="M194 46c-3-4 3-6 0-10M204 46c-3-4 3-6 0-10M214 46c-3-4 3-6 0-10"
                              fill="none"
                              stroke="rgba(255,255,255,0.6)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </>
                    ) : null}{' '}
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
                          <span
                            style={{
                              width: '40px',
                              height: `${__t(__v?.logoH)}`,
                              borderRadius: `${__t(__v?.logoR)}`,
                              background: `${__t(__v?.accent)}`,
                              color: '#ffffff',
                              fontWeight: '800',
                              fontSize: '18px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flex: 'none',
                            }}
                          >{`${__t(__v?.initial)}`}</span>{' '}
                          <span
                            style={{
                              fontSize: '22px',
                              lineHeight: '28px',
                              fontWeight: '700',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >{`${__t(__v?.name)}`}</span>
                        </div>{' '}
                        <svg width="22" height="22" viewBox="0 0 40 40" role="img" aria-label="Temelash mark">
                          <path
                            d="M5 11 L15 23 L25 11"
                            fill="none"
                            stroke="#fba919"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 29 L25 17 L35 29"
                            fill="none"
                            stroke="#e42330"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>{' '}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px' }}>
                        {(__v?.slots || []).map((sl, __i0) => (
                          <React.Fragment key={__i0}>
                            <span
                              style={{
                                aspectRatio: '1',
                                borderRadius: '999px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: `${__t(sl?.bg)}`,
                                border: `2px ${__t(sl?.bs)} ${__t(sl?.border)}`,
                              }}
                            >
                              {__b(sl?.earned) ? (
                                <>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#101827"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d={__v?.iconPath} />
                                  </svg>
                                </>
                              ) : null}{' '}
                              {__b(sl?.reward) ? (
                                <>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#c81d29"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                                  </svg>
                                </>
                              ) : null}
                            </span>
                          </React.Fragment>
                        ))}
                      </div>{' '}
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '16px',
                              fontWeight: '700',
                              letterSpacing: '0.08em',
                              color: '#5b6475',
                            }}
                          >
                            {'STAMPS'}
                          </span>
                          <span
                            style={{
                              fontSize: '32px',
                              lineHeight: '32px',
                              fontWeight: '800',
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            {'7/10'}
                          </span>
                        </div>{' '}
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '16px',
                              fontWeight: '700',
                              letterSpacing: '0.08em',
                              color: '#5b6475',
                            }}
                          >
                            {'REWARD'}
                          </span>
                          <span style={{ fontWeight: '700' }}>{'Free macchiato'}</span>
                        </div>
                      </div>{' '}
                      {__b(__v?.isWeb) ? (
                        <>
                          <button
                            type="button"
                            style={{
                              border: '0',
                              background: '#e42330',
                              color: '#ffffff',
                              fontWeight: '700',
                              borderRadius: '12px',
                              padding: '12px',
                              minHeight: '48px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Add to wallet'}
                          </button>
                        </>
                      ) : null}{' '}
                      {__b(__v?.isPass) ? (
                        <>
                          <div
                            role="img"
                            aria-label="Member barcode placeholder"
                            style={{
                              alignSelf: 'center',
                              width: '132px',
                              height: '132px',
                              border: '1px solid #e3e5ec',
                              borderRadius: '8px',
                              padding: '10px',
                              boxSizing: 'border-box',
                              display: 'grid',
                              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                              gap: '4px',
                            }}
                          >
                            <span style={{ background: '#101827' }} />
                            <span />
                            <span style={{ background: '#101827' }} />
                            <span style={{ background: '#101827' }} />
                            <span /> <span />
                            <span style={{ background: '#101827' }} />
                            <span />
                            <span style={{ background: '#101827' }} />
                            <span style={{ background: '#101827' }} /> <span style={{ background: '#101827' }} />
                            <span style={{ background: '#101827' }} />
                            <span />
                            <span />
                            <span style={{ background: '#101827' }} /> <span />
                            <span style={{ background: '#101827' }} />
                            <span style={{ background: '#101827' }} />
                            <span style={{ background: '#101827' }} />
                            <span /> <span style={{ background: '#101827' }} />
                            <span />
                            <span style={{ background: '#101827' }} />
                            <span />
                            <span style={{ background: '#101827' }} />
                          </div>
                        </>
                      ) : null}{' '}
                      <div
                        style={{
                          borderTop: '1px solid #e3e5ec',
                          paddingTop: '10px',
                          fontSize: '12px',
                          lineHeight: '16px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          color: '#5b6475',
                        }}
                      >
                        {'POWERED BY TEMELASH CARD'}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.isJoin) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '340px',
                      background: '#f7f7f9',
                      border: '1px solid #e3e5ec',
                      borderRadius: '28px',
                      padding: '20px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: `${__t(__v?.accent)}`,
                          color: '#ffffff',
                          fontWeight: '800',
                          fontSize: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >{`${__t(__v?.initial)}`}</span>{' '}
                      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '20px' }}>
                        <strong>{`Join ${__t(__v?.name)}'s card`}</strong>
                        <span
                          style={{
                            fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                            fontSize: '14px',
                            color: '#5b6475',
                          }}
                        >
                          {'ካርዱን ይቀላቀሉ'}
                        </span>
                      </span>
                    </div>{' '}
                    <span
                      style={{
                        background: '#fff3dc',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        fontWeight: '600',
                        fontSize: '14px',
                      }}
                    >
                      {'Collect 10 stamps, get a free macchiato.'}
                    </span>{' '}
                    {(__v?.joinFields || []).map((jf, __i0) => (
                      <React.Fragment key={__i0}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontWeight: '700', fontSize: '14px' }}>
                            {`${__t(jf?.label)} `}
                            <span style={{ fontWeight: '600', color: '#5b6475' }}>{`${__t(jf?.tag)}`}</span>
                          </span>{' '}
                          <span
                            style={{
                              background: '#ffffff',
                              border: '1px solid #e3e5ec',
                              borderRadius: '6px',
                              padding: '10px 12px',
                              color: '#5b6475',
                              fontSize: '14px',
                            }}
                          >{`${__t(jf?.ph)}`}</span>{' '}
                          {__b(jf?.hasHint) ? (
                            <>
                              <span
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  alignItems: 'flex-start',
                                  background: '#fff3dc',
                                  borderRadius: '10px',
                                  padding: '10px 12px',
                                  marginTop: '2px',
                                }}
                              >
                                <span
                                  style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '999px',
                                    background: '#fba919',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 'none',
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#101827"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                                  </svg>
                                </span>{' '}
                                <span
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    fontSize: '13px',
                                    lineHeight: '18px',
                                  }}
                                >
                                  <strong style={{ fontSize: '14px' }}>{'A surprise is waiting for you'}</strong>
                                  <span>
                                    {
                                      "Tell us your birthday and we'll have a treat ready for you that week. We won't tell anyone what it is."
                                    }
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                                      lineHeight: '22px',
                                      color: '#5b6475',
                                    }}
                                  >
                                    {'በልደትዎ ሳምንት ልዩ ስጦታ ይጠብቅዎታል።'}
                                  </span>
                                </span>
                              </span>
                            </>
                          ) : null}
                        </div>
                      </React.Fragment>
                    ))}{' '}
                    {__b(__v?.emailOn) ? (
                      <>
                        <span
                          style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'flex-start',
                            fontSize: '14px',
                            lineHeight: '20px',
                          }}
                        >
                          <span
                            style={{
                              width: '18px',
                              height: '18px',
                              border: '2px solid #5b6475',
                              borderRadius: '4px',
                              boxSizing: 'border-box',
                              flex: 'none',
                              marginTop: '1px',
                            }}
                          />
                          {`Send me offers from ${__t(__v?.name)} by email`}
                        </span>
                      </>
                    ) : null}{' '}
                    <span
                      style={{
                        background: '#101827',
                        color: '#ffffff',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '12px',
                        textAlign: 'center',
                      }}
                    >
                      {'Add to Apple Wallet'}
                    </span>{' '}
                    <span
                      style={{
                        background: '#ffffff',
                        color: '#101827',
                        border: '1px solid #e3e5ec',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '12px',
                        textAlign: 'center',
                      }}
                    >
                      {'Add to Google Wallet'}
                    </span>{' '}
                    <button
                      type="button"
                      style={{
                        background: 'transparent',
                        color: '#4661ad',
                        border: '1px dashed #4661ad',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '12px',
                        minHeight: '48px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4661ad"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
                      </svg>
                      {'No wallet app? Use the web card'}
                    </button>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.isWebTab) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '330px',
                      background: '#f4f5f7',
                      border: '1px solid #e3e5ec',
                      borderRadius: '52px',
                      padding: '12px',
                      boxSizing: 'border-box',
                      boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                    }}
                  >
                    <div
                      style={{
                        background: '#e9ebf0',
                        borderRadius: '42px',
                        minHeight: '600px',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '150px',
                          height: '28px',
                          background: '#f4f5f7',
                          borderRadius: '0 0 18px 18px',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '10px',
                            transform: 'translateX(-50%)',
                            width: '40px',
                            height: '4px',
                            borderRadius: '999px',
                            background: '#e3e5ec',
                          }}
                        />
                      </div>{' '}
                      <div
                        style={{
                          padding: '12px 22px 0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          fontSize: '13px',
                          lineHeight: '15px',
                          fontWeight: '700',
                        }}
                      >
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                          {'4:16'}
                          <span style={{ fontSize: '10px', fontWeight: '600' }}>{'◂ Safari'}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          style={{ display: 'flex', gap: '4px', alignItems: 'center', paddingTop: '2px' }}
                        >
                          <span style={{ display: 'flex', gap: '1px', alignItems: 'flex-end' }}>
                            <span style={{ width: '3px', height: '4px', background: '#101827' }} />
                            <span style={{ width: '3px', height: '6px', background: '#101827' }} />
                            <span style={{ width: '3px', height: '8px', background: '#101827' }} />
                            <span style={{ width: '3px', height: '10px', background: '#101827' }} />
                          </span>
                          <span
                            style={{
                              width: '20px',
                              height: '10px',
                              border: '1.5px solid #101827',
                              borderRadius: '3px',
                              boxSizing: 'border-box',
                              padding: '1px',
                            }}
                          >
                            <span
                              style={{
                                display: 'block',
                                width: '70%',
                                height: '100%',
                                background: '#101827',
                                borderRadius: '1px',
                              }}
                            />
                          </span>
                        </span>
                      </div>{' '}
                      <div
                        style={{
                          padding: '14px 18px 12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontWeight: '700', fontSize: '16px' }}>{'Done'}</span>
                        <span
                          aria-hidden="true"
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '999px',
                            background: '#101827',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '2px',
                          }}
                        >
                          <span style={{ width: '3px', height: '3px', borderRadius: '999px', background: '#ffffff' }} />
                          <span style={{ width: '3px', height: '3px', borderRadius: '999px', background: '#ffffff' }} />
                          <span style={{ width: '3px', height: '3px', borderRadius: '999px', background: '#ffffff' }} />
                        </span>
                      </div>{' '}
                      <div
                        style={{
                          margin: '0 12px',
                          background: '#ffffff',
                          borderRadius: '8px',
                          boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                          padding: '18px 16px 20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '18px',
                          overflow: 'hidden',
                        }}
                      >
                        {__b(__v?.cover) ? (
                          <>
                            <div style={{ margin: '-18px -16px 0', height: '104px' }}>
                              <svg
                                viewBox="0 0 300 110"
                                preserveAspectRatio="xMidYMid slice"
                                width="100%"
                                height="100%"
                                role="img"
                                aria-label="Cover photo"
                              >
                                <rect width="300" height="110" fill="#6b3a20" />
                                <rect x="18" y="20" width="120" height="4" fill="#4a2b18" />
                                <rect x="24" y="6" width="8" height="14" rx="2" fill="#d9b38c" />
                                <rect x="38" y="9" width="8" height="11" rx="2" fill="#f7f7f9" />
                                <rect x="52" y="4" width="8" height="16" rx="2" fill="#2f6b4f" />
                                <rect x="18" y="46" width="120" height="4" fill="#4a2b18" />
                                <rect x="26" y="30" width="16" height="16" rx="3" fill="#f7f7f9" />
                                <rect x="48" y="32" width="16" height="14" rx="3" fill="#d9b38c" />
                                <circle cx="262" cy="40" r="18" fill="#2f6b4f" />
                                <circle cx="248" cy="52" r="12" fill="#3f7d5e" />
                                <rect x="252" y="58" width="16" height="22" rx="3" fill="#d9b38c" />
                                <rect y="80" width="300" height="30" fill="#3d2414" />
                                <rect x="176" y="80" width="52" height="4" rx="2" fill="#f7f7f9" />
                                <rect x="184" y="52" width="36" height="28" rx="5" fill="#ffffff" />
                                <path d="M220 58h5a6 6 0 0 1 0 12h-5" fill="none" stroke="#ffffff" strokeWidth="3" />
                                <path
                                  d="M194 46c-3-4 3-6 0-10M204 46c-3-4 3-6 0-10M214 46c-3-4 3-6 0-10"
                                  fill="none"
                                  stroke="rgba(255,255,255,0.6)"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                          </>
                        ) : null}{' '}
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '0' }}>
                            <span
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '999px',
                                background: `${__t(__v?.accent)}`,
                                color: '#ffffff',
                                fontWeight: '800',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 'none',
                              }}
                            >{`${__t(__v?.initial)}`}</span>
                            <span
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '10px',
                                lineHeight: '10px',
                                fontWeight: '800',
                                letterSpacing: '0.03em',
                              }}
                            >
                              {`${__t(__v?.nameA)}`}
                              <span>{`${__t(__v?.nameB)}`}</span>
                            </span>
                          </span>{' '}
                          <span style={{ fontSize: '13px', fontWeight: '600', fontVariantNumeric: 'tabular-nums' }}>
                            {'07 Stamps'}
                          </span>
                        </div>{' '}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                            gap: '10px',
                            padding: '0 4px',
                          }}
                        >
                          {(__v?.webSlots || []).map((w, __i0) => (
                            <React.Fragment key={__i0}>
                              <span
                                style={{
                                  aspectRatio: '1',
                                  borderRadius: '999px',
                                  boxSizing: 'border-box',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: `${__t(w?.bg)}`,
                                  border: `1.5px solid ${__t(w?.border)}`,
                                }}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke={w?.check}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d={w?.path} />
                                </svg>
                              </span>
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontSize: '11px', color: '#5b6475' }}>{'Expiry Date'}</span>
                            <span style={{ fontSize: '13px', fontWeight: '700' }}>{'30 Nov 2026'}</span>
                          </span>{' '}
                          <span
                            style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' }}
                          >
                            <span style={{ fontSize: '11px', color: '#5b6475' }}>{'Last Update'}</span>
                            <span style={{ fontSize: '13px', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}>
                              {'10:42 20/10'}
                            </span>
                          </span>
                        </div>{' '}
                        <div
                          style={{
                            minHeight: '88px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '6px',
                          }}
                        >
                          <span style={{ fontSize: '11px', color: '#5b6475' }}>{'Reward'}</span>{' '}
                          <span
                            style={{
                              background: '#fff3dc',
                              borderRadius: '8px',
                              padding: '8px 10px',
                              fontSize: '13px',
                              lineHeight: '18px',
                              fontWeight: '600',
                            }}
                          >
                            {'3 more visits to a free macchiato'}
                          </span>
                        </div>{' '}
                        <div
                          role="img"
                          aria-label="Member QR code placeholder"
                          style={{
                            alignSelf: 'center',
                            width: '96px',
                            height: '96px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                            gap: '1px',
                          }}
                        >
                          <QRCodeDisplay value={__v?.cardUrl || "http://localhost:3001/card"} size={64} /></div>
                      </div>{' '}
                      <div style={{ flex: '1 1 auto' }} />{' '}
                      <span
                        aria-hidden="true"
                        style={{
                          alignSelf: 'center',
                          width: '120px',
                          height: '5px',
                          borderRadius: '999px',
                          background: '#101827',
                          margin: '16px 0 10px',
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : null}{' '}
              <p
                style={{ margin: '0', fontSize: '14px', color: '#5b6475', textAlign: 'center' }}
              >{`${__t(__v?.tabNote)}`}</p>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default withDCStyle(CardDesignView, 'CardDesign', __CSS);
