'use client';
/* Generated from the Temelash Card design (Landing.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';
import ColorPicker from './ColorPicker';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n@media (min-width: 1024px){.pv-sticky{position:sticky;top:24px;align-self:flex-start}}';
class LandingView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Buna House',
      tagline: 'Fresh coffee, every visit',
      color: '#8a4b2a',
      hexText: '8A4B2A',
      tint: 'auto',
      style: 'classic',
      cover: false,
      logo: true,
      saved: false,
      buttons: [
        {
          id: 'card',
          label: 'Get your stamp card',
          sub: 'Free macchiato at 10 stamps',
          icon: 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z',
          on: true,
          locked: true,
        },
        {
          id: 'insta',
          label: 'Follow us on Instagram',
          sub: '',
          url: '',
          icon: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01',
          on: true,
        },
      ],
    };
  }
  lum(hex) {
    const h = hex.replace('#', '');
    const ch = [0, 2, 4].map((i) => {
      const v = parseInt(h.substr(i, 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  }
  renderVals() {
    const s = this.state;
    const dark = this.lum(s.color) < 0.18;
    const ink = dark ? '#ffffff' : '#101827';
    const set = (o) => this.setState(Object.assign({ saved: false }, o));
    const swDefs = [
      ['#8a4b2a', 'Coffee brown'],
      ['#101827', 'Navy'],
      ['#4661ad', 'Blue'],
      ['#2f6b4f', 'Green'],
      ['#7a3e9d', 'Purple'],
      ['#f7f7f9', 'Off-white'],
      ['#fff3dc', 'Cream'],
    ];
    const swatches = swDefs.map(([hex, label]) => ({
      hex,
      label,
      pressed: hex === s.color ? 'true' : 'false',
      ring: hex === s.color ? '#4661ad' : '#e3e5ec',
      pick: () => set({ color: hex, hexText: hex.slice(1).toUpperCase() }),
    }));
    const tints = [
      ['auto', 'Auto'],
      ['light', 'Light'],
      ['dark', 'Dark'],
    ].map(([id, label]) => ({
      label,
      pressed: id === s.tint ? 'true' : 'false',
      bg: id === s.tint ? '#f7f7f9' : '#ffffff',
      border: id === s.tint ? '#4661ad' : '#e3e5ec',
      pick: () => set({ tint: id }),
    }));
    const useDarkBtn = s.tint === 'dark' || (s.tint === 'auto' && !dark);
    const SD = {
      default: {
        label: 'Default',
        font: "'Source Sans 3', sans-serif",
        variant: 'normal',
        transform: 'none',
        spacing: '0',
        sample: 'Buna House',
      },
      classic: {
        label: 'Classic',
        font: "'Playfair Display', Georgia, serif",
        variant: 'small-caps',
        transform: 'none',
        spacing: '0.02em',
        sample: 'Buna House',
      },
      editorial: {
        label: 'Editorial',
        font: "'Lora', Georgia, serif",
        variant: 'normal',
        transform: 'none',
        spacing: '0',
        sample: 'Buna House',
      },
      modern: {
        label: 'Modern',
        font: "'Source Sans 3', sans-serif",
        variant: 'normal',
        transform: 'uppercase',
        spacing: '0.12em',
        sample: 'Buna House',
      },
    };
    const styles = Object.keys(SD).map((id) =>
      Object.assign({}, SD[id], {
        pressed: id === s.style ? 'true' : 'false',
        bg: id === s.style ? '#f7f7f9' : '#ffffff',
        border: id === s.style ? '#4661ad' : '#e3e5ec',
        pick: () => set({ style: id }),
      }),
    );
    const st = SD[s.style];
    const btns = s.buttons;
    const move = (i, d) => () => {
      const j = i + d;
      if (j < 1 || j >= btns.length || i === 0) return;
      const a = btns.slice();
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
      set({ buttons: a });
    };
    const rows = btns.map((b, i) => ({
      label: b.label,
      icon: b.icon,
      inputId: 'lp-btn-' + i,
      sub: b.locked ? 'Always first and always shown' : b.on ? 'Shown' : 'Hidden',
      opacity: b.on ? '1' : '0.55',
      onLabel: (e) => {
        const a = btns.slice();
        a[i] = Object.assign({}, b, { label: e.target.value });
        set({ buttons: a });
      },
      upDisabled: i <= 1,
      downDisabled: i === 0 || i === btns.length - 1,
      upColor: i <= 1 ? '#c9cdd6' : '#101827',
      downColor: i === 0 || i === btns.length - 1 ? '#c9cdd6' : '#101827',
      up: move(i, -1),
      down: move(i, 1),
      locked: !!b.locked,
      checked: b.on ? 'true' : 'false',
      track: b.on ? '#101827' : '#e3e5ec',
      justify: b.on ? 'flex-end' : 'flex-start',
      toggle: () => {
        if (b.locked) return;
        const a = btns.slice();
        a[i] = Object.assign({}, b, { on: !b.on });
        set({ buttons: a });
      },
      hasUrl: !b.locked,
      urlId: 'lp-url-' + i,
      url: b.url || '',
      urlLabel: b.id === 'insta' ? 'Instagram username or link' : 'Link',
      urlPh: b.id === 'insta' ? '@yourbusiness or instagram.com/yourbusiness' : 'https://… or t.me/yourbusiness',
      urlMissing: !b.locked && b.on && !(b.url || '').trim(),
      urlBorder: !b.locked && b.on && !(b.url || '').trim() ? '#c81d29' : '#e3e5ec',
      onUrl: (e) => {
        const a = btns.slice();
        a[i] = Object.assign({}, b, { url: e.target.value });
        set({ buttons: a });
      },
      canDelete: !b.locked && b.id !== 'insta',
      delLabel: 'Remove ' + (b.label || 'link'),
      remove: () => set({ buttons: btns.filter((x, k) => k !== i) }),
    }));
    const handle = (u) => {
      const v = (u || '').trim();
      if (!v) return '';
      const m = v.match(/instagram\.com\/([^/?#]+)/i);
      if (m) return '@' + m[1];
      return v.charAt(0) === '@' ? v : v.indexOf('.') === -1 ? '@' + v : v.replace(/^https?:\/\//, '');
    };
    const pvButtons = btns
      .filter((b) => b.on && (b.locked || (b.url || '').trim()))
      .map((b) => ({
        label: b.label || 'Untitled link',
        sub: b.locked ? b.sub : handle(b.url),
        hasSub: b.locked ? !!b.sub : true,
        icon: b.icon,
        bg: useDarkBtn ? '#1b2436' : '#ffffff',
        fg: useDarkBtn ? '#ffffff' : '#101827',
        tile: useDarkBtn ? 'rgba(255,255,255,0.08)' : '#f7f7f9',
        iconColor: b.id === 'card' ? '#fba919' : useDarkBtn ? '#8fa4e6' : '#4661ad',
      }));
    const N = 11,
      qr = [];
    const seed =
      '1011001011101101001101011100101101010011101011001010111001101001011011100101011010011101010110010110101101001011100';
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) {
        const inF = (R, C) => r >= R && r < R + 3 && c >= C && c < C + 3;
        let on;
        if (inF(0, 0) || inF(0, N - 3) || inF(N - 3, 0)) on = true;
        else if (
          (r === 3 && (c < 4 || c > N - 5)) ||
          (c === 3 && (r < 4 || r > N - 5)) ||
          (r === N - 4 && c < 4) ||
          (c === N - 4 && r < 4)
        )
          on = false;
        else on = seed.charAt((r * N + c) % seed.length) === '1';
        qr.push({ c: on ? '#101827' : 'transparent' });
      }
    const shownTitle = (s.title || '').trim() || 'Buna House';
    return {
      title: s.title,
      tagline: s.tagline,
      hasTagline: !!(s.tagline || '').trim(),
      shownTitle,
      onTitle: (e) => set({ title: e.target.value }),
      onTag: (e) => set({ tagline: e.target.value }),
      color: s.color,
      hexText: s.hexText,
      hexBad: !/^#?[0-9a-fA-F]{6}$/.test(s.hexText),
      onHex: (e) => {
        const v = e.target.value.replace('#', '');
        const o = { hexText: v };
        if (/^[0-9a-fA-F]{6}$/.test(v)) o.color = '#' + v.toLowerCase();
        set(o);
      },
      resetColor: () => set({ color: '#8a4b2a', hexText: '8A4B2A' }),
      swatches,
      tints,
      styles,
      rows,
      pvButtons,
      qr,
      swPresets: swDefs.map(([hex, label]) => ({ hex, label })),
      pickColor: (hex) => set({ color: hex, hexText: hex.slice(1).toUpperCase() }),
      tintNote:
        s.tint === 'auto'
          ? 'Auto picks dark or light buttons to match your page colour.'
          : s.tint === 'light'
            ? 'White buttons on any page colour.'
            : 'Dark buttons on any page colour.',
      sFont: st.font,
      sVariant: st.variant,
      sTransform: st.transform,
      sSpacing: st.spacing,
      ink,
      markRed: dark ? '#ff5a63' : '#e42330',
      cover: s.cover,
      coverBg: dark ? 'rgba(255,255,255,0.18)' : 'rgba(16,24,39,0.18)',
      coverThumbBg: s.cover ? '#c9cdd6' : '#f7f7f9',
      coverBtn: s.cover ? 'Remove' : 'Upload image',
      toggleCover: () => set({ cover: !s.cover }),
      logo: s.logo,
      initial: shownTitle.charAt(0).toUpperCase(),
      logoThumbBg: s.logo ? s.color : '#f7f7f9',
      logoThumbText: s.logo ? shownTitle.charAt(0).toUpperCase() : '',
      logoBtn: s.logo ? 'Remove' : 'Upload image',
      toggleLogo: () => set({ logo: !s.logo }),
      logoRing: dark ? 'rgba(255,255,255,0.25)' : 'rgba(16,24,39,0.12)',
      logoLift: s.cover ? '-40px' : '0',
      headPad: s.cover ? '0 20px 12px' : '44px 20px 12px',
      addLink: () =>
        set({
          buttons: btns.concat([
            {
              id: 'custom' + Date.now(),
              label: 'New link',
              sub: '',
              url: '',
              icon: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
              on: true,
            },
          ]),
        }),
      save: () => this.setState({ saved: true }),
      savedNote: s.saved ? 'Saved. Live on your QR now.' : 'Unsaved changes',
    };
  }
}

LandingView.defaultProps = {};
LandingView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1600px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <Sidebar active="landing" />
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '640px' }}>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'QR LANDING PAGE'}
              </span>{' '}
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                {'Customise what customers see when they scan'}
              </h1>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>
                {'One page behind your QR: the stamp card first, then where to follow you.'}
              </p>
            </div>{' '}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.savedNote)}`}</span>{' '}
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
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      <path d="M5 5h14M12 5v14" />
                    </svg>
                  </span>
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {'Title and tagline'}
                  </h2>
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="lp-title" style={{ fontWeight: '700' }}>
                    {'Page title'}
                  </label>{' '}
                  <input
                    id="lp-title"
                    type="text"
                    value={__v?.title}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      color: '#101827',
                    }}
                    onChange={__v?.onTitle}
                  />{' '}
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>
                    {'Shown instead of your business name. Leave blank to use the business name.'}
                  </span>
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="lp-tag" style={{ fontWeight: '700' }}>
                    {'Tagline'}
                  </label>{' '}
                  <input
                    id="lp-tag"
                    type="text"
                    value={__v?.tagline}
                    placeholder="e.g. Fresh coffee, every visit"
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      color: '#101827',
                    }}
                    onChange={__v?.onTag}
                  />{' '}
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>
                    {'Optional. Shown under the title. Leave blank for none.'}
                  </span>
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
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      <path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8z" />
                      <circle cx="7.5" cy="11" r="1" />
                      <circle cx="10" cy="7" r="1" />
                      <circle cx="15" cy="7" r="1" />
                    </svg>
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                      {'Page colour'}
                    </h2>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'The page background. Text and buttons adjust to stay readable.'}
                    </span>
                  </div>
                </div>{' '}
                <ColorPicker
                  value={__v?.color}
                  onChange={__v?.pickColor}
                  presets={__v?.swPresets}
                  idPrefix="lp-color"
                />{' '}
                <button
                  type="button"
                  onClick={__v?.resetColor}
                  style={{
                    alignSelf: 'flex-start',
                    border: '0',
                    background: 'transparent',
                    fontWeight: '700',
                    color: '#4661ad',
                    padding: '6px 0',
                    minHeight: '40px',
                    cursor: 'pointer',
                  }}
                >
                  {'Reset to brand colour'}
                </button>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3v18" />
                    </svg>
                  </span>
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {'Button tint'}
                  </h2>
                </div>{' '}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                  {(__v?.tints || []).map((t, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        aria-pressed={t?.pressed}
                        onClick={t?.pick}
                        style={{
                          borderRadius: '12px',
                          padding: '14px 8px',
                          minHeight: '52px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          background: `${__t(t?.bg)}`,
                          color: '#101827',
                          border: `2px solid ${__t(t?.border)}`,
                        }}
                      >{`${__t(t?.label)}`}</button>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.tintNote)}`}</span>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '14px',
                      color: '#4661ad',
                    }}
                  >
                    {'Aa'}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                      {'Lettering style'}
                    </h2>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'For your title and buttons. The card itself always uses Temelash type.'}
                    </span>
                  </div>
                </div>{' '}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                  {(__v?.styles || []).map((st, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        aria-pressed={st?.pressed}
                        onClick={st?.pick}
                        style={{
                          textAlign: 'left',
                          borderRadius: '12px',
                          padding: '16px',
                          minHeight: '84px',
                          cursor: 'pointer',
                          background: `${__t(st?.bg)}`,
                          color: '#101827',
                          border: `2px solid ${__t(st?.border)}`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        <strong>{`${__t(st?.label)}`}</strong>{' '}
                        <span
                          style={{
                            fontSize: '18px',
                            color: '#5b6475',
                            fontFamily: `${__t(st?.font)}`,
                            fontVariant: `${__t(st?.variant)}`,
                            textTransform: `${__t(st?.transform)}`,
                            letterSpacing: `${__t(st?.spacing)}`,
                          }}
                        >{`${__t(st?.sample)}`}</span>
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
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 15l5-5 5 5 3-3 5 5" />
                    </svg>
                  </span>
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Images'}</h2>
                </div>{' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 0',
                    borderTop: '1px solid #e3e5ec',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '72px',
                      height: '48px',
                      borderRadius: '8px',
                      flex: 'none',
                      background: `${__t(__v?.coverThumbBg)}`,
                      border: '1px dashed #d9dce3',
                    }}
                  />{' '}
                  <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                    <strong>{'Cover photo'}</strong>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'Wide photo of your counter or product, 1200 × 600 px.'}
                    </span>
                  </span>{' '}
                  <button
                    type="button"
                    onClick={__v?.toggleCover}
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      color: '#101827',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >{`${__t(__v?.coverBtn)}`}</button>
                </div>{' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 0',
                    borderTop: '1px solid #e3e5ec',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '999px',
                      flex: 'none',
                      background: `${__t(__v?.logoThumbBg)}`,
                      color: '#ffffff',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px dashed #d9dce3',
                    }}
                  >{`${__t(__v?.logoThumbText)}`}</span>{' '}
                  <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                    <strong>{'Logo'}</strong>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{'Square, 512 px or larger.'}</span>
                  </span>{' '}
                  <button
                    type="button"
                    onClick={__v?.toggleLogo}
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      color: '#101827',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >{`${__t(__v?.logoBtn)}`}</button>
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
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginBottom: '6px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                      {'Buttons on the page'}
                    </h2>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'Put what earns you the most at the top. The stamp card always stays first.'}
                    </span>
                  </div>{' '}
                  <button
                    type="button"
                    onClick={__v?.addLink}
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
                    {'+ Add a link'}
                  </button>
                </div>{' '}
                {(__v?.rows || []).map((r, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '12px 0',
                        borderTop: '1px solid #e3e5ec',
                        opacity: `${__t(r?.opacity)}`,
                      }}
                    >
                      <span
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '999px',
                          background: '#f7f7f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 'none',
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#101827"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d={r?.icon} />
                        </svg>
                      </span>{' '}
                      <span style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                        <label
                          htmlFor={r?.inputId}
                          style={{
                            position: 'absolute',
                            width: '1px',
                            height: '1px',
                            overflow: 'hidden',
                            clip: 'rect(0 0 0 0)',
                          }}
                        >
                          {'Button label'}
                        </label>{' '}
                        <input
                          id={r?.inputId}
                          type="text"
                          value={r?.label}
                          style={{
                            border: '1px solid transparent',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            marginLeft: '-6px',
                            fontWeight: '700',
                            color: '#101827',
                            background: 'transparent',
                            minWidth: '0',
                          }}
                          onChange={r?.onLabel}
                        />{' '}
                        <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(r?.sub)}`}</span>{' '}
                        {__b(r?.hasUrl) ? (
                          <>
                            <label
                              htmlFor={r?.urlId}
                              style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px' }}
                            >{`${__t(r?.urlLabel)}`}</label>{' '}
                            <input
                              id={r?.urlId}
                              type="text"
                              value={r?.url}
                              placeholder={r?.urlPh}
                              style={{
                                border: `1px solid ${__t(r?.urlBorder)}`,
                                borderRadius: '6px',
                                padding: '8px 10px',
                                minHeight: '40px',
                                boxSizing: 'border-box',
                                color: '#101827',
                                marginTop: '4px',
                              }}
                              onChange={r?.onUrl}
                            />{' '}
                            {__b(r?.urlMissing) ? (
                              <>
                                <span style={{ fontSize: '13px', color: '#c81d29', marginTop: '4px' }}>
                                  {'Add a link so this button works. Until then it stays hidden on the page.'}
                                </span>
                              </>
                            ) : null}
                          </>
                        ) : null}
                      </span>{' '}
                      <button
                        type="button"
                        aria-label="Move up"
                        disabled={__b(r?.upDisabled)}
                        onClick={r?.up}
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '1px solid #e3e5ec',
                          borderRadius: '8px',
                          background: '#ffffff',
                          cursor: 'pointer',
                          color: `${__t(r?.upColor)}`,
                        }}
                      >
                        {'↑'}
                      </button>{' '}
                      <button
                        type="button"
                        aria-label="Move down"
                        disabled={__b(r?.downDisabled)}
                        onClick={r?.down}
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '1px solid #e3e5ec',
                          borderRadius: '8px',
                          background: '#ffffff',
                          cursor: 'pointer',
                          color: `${__t(r?.downColor)}`,
                        }}
                      >
                        {'↓'}
                      </button>{' '}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={r?.checked}
                        aria-label="Show button"
                        disabled={__b(r?.locked)}
                        onClick={r?.toggle}
                        style={{
                          width: '48px',
                          height: '28px',
                          borderRadius: '999px',
                          border: '0',
                          padding: '3px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: `${__t(r?.justify)}`,
                          background: `${__t(r?.track)}`,
                          flex: 'none',
                        }}
                      >
                        <span
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '999px',
                            background: '#ffffff',
                            display: 'block',
                          }}
                        />
                      </button>{' '}
                      {__b(r?.canDelete) ? (
                        <>
                          <button
                            type="button"
                            aria-label={r?.delLabel}
                            onClick={r?.remove}
                            style={{
                              width: '36px',
                              height: '36px',
                              border: '1px solid #e3e5ec',
                              borderRadius: '8px',
                              background: '#ffffff',
                              cursor: 'pointer',
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
                              stroke="#c81d29"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                            </svg>
                          </button>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </div>{' '}
            <aside
              aria-label="Preview"
              className="pv-sticky"
              style={{ flex: '2 1 340px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div
                style={{
                  background: '#ffffff',
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
                  aria-label="QR code to open your live landing page (placeholder)"
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
                  {(__v?.qr || []).map((q, __i0) => (
                    <React.Fragment key={__i0}>
                      <span style={{ background: `${__t(q?.c)}` }} />
                    </React.Fragment>
                  ))}
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <strong style={{ fontSize: '17px' }}>{'Try the live page'}</strong>
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>{'Scan to open it on your phone.'}</span>
                </div>
              </div>{' '}
              <span
                style={{
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
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  maxWidth: '340px',
                  background: '#101827',
                  borderRadius: '48px',
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    background: `${__t(__v?.color)}`,
                    borderRadius: '40px',
                    minHeight: '640px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {__b(__v?.cover) ? (
                    <>
                      <div
                        style={{
                          height: '130px',
                          background: `${__t(__v?.coverBg)}`,
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-start',
                          padding: '10px 14px',
                          boxSizing: 'border-box',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            letterSpacing: '0.08em',
                            color: '#ffffff',
                            background: 'rgba(16,24,39,0.55)',
                            borderRadius: '999px',
                            padding: '2px 8px',
                          }}
                        >
                          {'COVER PHOTO'}
                        </span>
                      </div>
                    </>
                  ) : null}{' '}
                  <div
                    style={{
                      padding: `${__t(__v?.headPad)}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      textAlign: 'center',
                    }}
                  >
                    {__b(__v?.logo) ? (
                      <>
                        <span
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '999px',
                            background: '#ffffff',
                            color: `${__t(__v?.color)}`,
                            fontWeight: '800',
                            fontSize: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '4px',
                            boxShadow: `0 0 0 3px ${__t(__v?.logoRing)}`,
                            marginTop: `${__t(__v?.logoLift)}`,
                          }}
                        >{`${__t(__v?.initial)}`}</span>
                      </>
                    ) : null}{' '}
                    <span
                      style={{
                        fontSize: '26px',
                        lineHeight: '32px',
                        fontWeight: '700',
                        color: `${__t(__v?.ink)}`,
                        fontFamily: `${__t(__v?.sFont)}`,
                        fontVariant: `${__t(__v?.sVariant)}`,
                        textTransform: `${__t(__v?.sTransform)}`,
                        letterSpacing: `${__t(__v?.sSpacing)}`,
                      }}
                    >{`${__t(__v?.shownTitle)}`}</span>{' '}
                    {__b(__v?.hasTagline) ? (
                      <>
                        <span
                          style={{
                            fontSize: '16px',
                            lineHeight: '22px',
                            color: `${__t(__v?.ink)}`,
                            opacity: '0.85',
                            fontFamily: `${__t(__v?.sFont)}`,
                            fontVariant: `${__t(__v?.sVariant)}`,
                            textTransform: `${__t(__v?.sTransform)}`,
                            letterSpacing: `${__t(__v?.sSpacing)}`,
                          }}
                        >{`${__t(__v?.tagline)}`}</span>
                      </>
                    ) : null}
                  </div>{' '}
                  <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(__v?.pvButtons || []).map((b, __i0) => (
                      <React.Fragment key={__i0}>
                        <div
                          style={{
                            background: `${__t(b?.bg)}`,
                            color: `${__t(b?.fg)}`,
                            borderRadius: '14px',
                            padding: '12px 14px',
                            minHeight: '64px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 1px 0 rgba(16,24,39,0.06)',
                          }}
                        >
                          <span
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '999px',
                              background: `${__t(b?.tile)}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flex: 'none',
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={b?.iconColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d={b?.icon} />
                            </svg>
                          </span>{' '}
                          <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minWidth: '0' }}>
                            <span
                              style={{
                                fontWeight: '700',
                                fontSize: '16px',
                                lineHeight: '20px',
                                fontFamily: `${__t(__v?.sFont)}`,
                                fontVariant: `${__t(__v?.sVariant)}`,
                                textTransform: `${__t(__v?.sTransform)}`,
                                letterSpacing: `${__t(__v?.sSpacing)}`,
                              }}
                            >{`${__t(b?.label)}`}</span>
                            {__b(b?.hasSub) ? (
                              <>
                                <span
                                  style={{ fontSize: '12px', lineHeight: '16px', opacity: '0.75' }}
                                >{`${__t(b?.sub)}`}</span>
                              </>
                            ) : null}
                          </span>{' '}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{ opacity: '0.6' }}
                          >
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <div style={{ flex: '1 1 auto' }} />{' '}
                  <div
                    style={{
                      padding: '24px 0 28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: `${__t(__v?.ink)}`,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 40 40" aria-hidden="true">
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
                        stroke={__v?.markRed}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>{' '}
                    <span style={{ fontWeight: '800', letterSpacing: '0.03em', fontSize: '13px' }}>
                      {'TEMELASH CARD'}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default withDCStyle(LandingView, 'Landing', __CSS);
