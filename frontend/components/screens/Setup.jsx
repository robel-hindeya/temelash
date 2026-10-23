'use client';
/* Generated from the Temelash Card design (Setup.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import ColorPicker from './ColorPicker';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n@media (max-width:640px){.tm-steplabel{display:none}.tm-stepline{width:12px !important}.tm-setup-main{padding:20px 16px 32px !important;gap:24px !important}.tm-setup-card{padding:20px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';
class SetupView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      step: null,
      name: 'Buna House',
      type: 'Café',
      accent: '#101827',
      count: 10,
      reward: 'a free macchiato',
      lat: 8.996,
      lng: 38.789,
      locQuery: '',
      locOpen: false,
      mapDrag: false,
      myLoc: false,
    };
  }
  componentDidMount() {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem('tc_registered_merchant');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.name) {
            this.setState({
              name: parsed.name,
              type: parsed.type || this.state.type,
            });
          }
        }
      } catch (e) {}
    }
  }
  places() {
    // Approximate centres, for the prototype map only
    return [
      { name: 'Bole Medhanialem', sub: 'Bole, Addis Ababa', lat: 8.996, lng: 38.789 },
      { name: 'Bole Atlas', sub: 'Bole, Addis Ababa', lat: 9.001, lng: 38.78 },
      { name: 'Kazanchis', sub: 'Kirkos, Addis Ababa', lat: 9.018, lng: 38.766 },
      { name: 'Piassa', sub: 'Arada, Addis Ababa', lat: 9.035, lng: 38.752 },
      { name: 'Megenagna', sub: 'Yeka, Addis Ababa', lat: 9.02, lng: 38.802 },
      { name: 'Sarbet', sub: 'Nifas Silk-Lafto, Addis Ababa', lat: 9.0, lng: 38.74 },
      { name: 'Mexico Square', sub: 'Kirkos, Addis Ababa', lat: 9.01, lng: 38.746 },
    ];
  }
  mapFromPointer(e) {
    if (!this.mapEl) return;
    const r = this.mapEl.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    this.setState({ lng: 38.72 + x * 0.1, lat: 9.06 - y * 0.08, myLoc: false });
  }
  renderVals() {
    const step = this.state.step ?? this.props.startStep ?? 1;
    const go = (n) => () => this.setState({ step: n });
    const labels = ['Business', 'Card', 'Reward', 'Go live'];
    const steps = labels.map((label, i) => {
      const n = i + 1,
        done = n < step,
        cur = n === step;
      return {
        num: done ? '✓' : String(n),
        label,
        go: go(n),
        notLast: n < 4,
        current: cur ? 'step' : 'false',
        dotBg: cur ? '#e42330' : done ? '#101827' : '#ffffff',
        dotColor: cur || done ? '#ffffff' : '#5b6475',
        dotBorder: cur ? '#e42330' : done ? '#101827' : '#e3e5ec',
        labelColor: cur || done ? '#101827' : '#5b6475',
        weight: cur ? '700' : '600',
        labelCls: cur ? '' : 'tm-steplabel',
      };
    });
    const types = ['Café', 'Restaurant', 'Salon', 'Spa', 'Car wash'].map((label) => {
      const on = label === this.state.type;
      return {
        label,
        pressed: on ? 'true' : 'false',
        pick: () => this.setState({ type: label }),
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
      };
    });
    const accents = [
      ['#101827', 'Navy'],
      ['#4661ad', 'Blue'],
      ['#2f6b4f', 'Green'],
      ['#7a3e9d', 'Purple'],
      ['#8a4b2a', 'Coffee brown'],
      ['#c2410c', 'Burnt orange'],
    ].map(([hex, label]) => {
      const on = hex === this.state.accent;
      return {
        hex,
        label,
        pressed: on ? 'true' : 'false',
        ring: on ? '#4661ad' : '#e3e5ec',
        pick: () => this.setState({ accent: hex }),
      };
    });
    const counts = [6, 8, 10].map((n) => {
      const on = n === this.state.count;
      return {
        n: String(n),
        pressed: on ? 'true' : 'false',
        pick: () => this.setState({ count: n }),
        bg: on ? '#101827' : 'transparent',
        color: on ? '#ffffff' : '#101827',
      };
    });
    const count = this.state.count,
      earned = 3;
    const slots = [];
    for (let i = 0; i < count; i++) {
      const isReward = i === count - 1,
        isEarned = i < earned;
      slots.push({
        earned: isEarned,
        reward: isReward,
        bg: isEarned ? '#fba919' : 'transparent',
        border: isEarned ? '#fba919' : isReward ? '#e42330' : '#e3e5ec',
        borderStyle: isReward ? 'dashed' : 'solid',
      });
    }
    const name = this.state.name || '';
    return {
      steps,
      types,
      accents,
      counts,
      slots,
      isStep1: step === 1,
      isStep2: step === 2,
      isStep3: step === 3,
      isStep4: step === 4,
      hasBack: step > 1,
      isLast: step === 4,
      notLast: step < 4,
      next: () => this.setState({ step: Math.min(4, step + 1) }),
      back: () => this.setState({ step: Math.max(1, step - 1) }),
      name,
      reward: this.state.reward,
      onName: (e) => this.setState({ name: e.target.value }),
      onReward: (e) => this.setState({ reward: e.target.value }),
      displayName: name || 'Your business',
      initial: (name || 'Y').trim().charAt(0).toUpperCase() || 'Y',
      accentHex: this.state.accent,
      countLabel: earned + '/' + count,
      rewardLine: count - earned + ' more visits to ' + (this.state.reward || 'your reward'),
      accentPresets: [
        ['#101827', 'Navy'],
        ['#4661ad', 'Blue'],
        ['#2f6b4f', 'Green'],
        ['#7a3e9d', 'Purple'],
        ['#8a4b2a', 'Coffee brown'],
        ['#c2410c', 'Burnt orange'],
      ].map(([hex, label]) => ({ hex, label })),
      setAccent: (hex) => this.setState({ accent: hex }),
      ...(() => {
        const st = this.state;
        const P = this.places();
        const q = (st.locQuery || '').trim().toLowerCase();
        const suggest = st.locOpen
          ? P.filter((p) => !q || (p.name + ' ' + p.sub).toLowerCase().indexOf(q) !== -1)
              .slice(0, 5)
              .map((p) => ({
                name: p.name,
                sub: p.sub,
                pick: () =>
                  this.setState({
                    lat: p.lat,
                    lng: p.lng,
                    locQuery: p.name + ', ' + p.sub,
                    locOpen: false,
                    myLoc: false,
                  }),
              }))
          : [];
        let near = P[0],
          best = 1e9;
        P.forEach((p) => {
          const d = Math.pow(p.lat - st.lat, 2) + Math.pow(p.lng - st.lng, 2);
          if (d < best) {
            best = d;
            near = p;
          }
        });
        const toX = (lng) => ((lng - 38.72) / 0.1) * 100 + '%';
        const toY = (lat) => ((9.06 - lat) / 0.08) * 100 + '%';
        return {
          locQuery: st.locQuery,
          onLocQuery: (e) => this.setState({ locQuery: e.target.value, locOpen: true }),
          hasSuggest: suggest.length > 0,
          suggest,
          setMap: (el) => {
            this.mapEl = el;
          },
          mapDown: (e) => {
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch (x) {}
            this.setState({ mapDrag: true, locOpen: false });
            this.mapFromPointer(e);
          },
          mapMove: (e) => {
            if (this.state.mapDrag) this.mapFromPointer(e);
          },
          mapUp: () => this.setState({ mapDrag: false }),
          mapLabels: P.map((p) => ({ name: p.name, x: toX(p.lng), y: toY(p.lat - 0.004) })),
          pinX: toX(st.lng),
          pinY: toY(st.lat),
          shortName: st.name || 'Your business',
          latText: st.lat.toFixed(4),
          lngText: st.lng.toFixed(4),
          onLat: (e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) this.setState({ lat: Math.min(9.06, Math.max(8.98, v)) });
          },
          onLng: (e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) this.setState({ lng: Math.min(38.82, Math.max(38.72, v)) });
          },
          useMyLoc: () =>
            this.setState({ lat: 8.9978, lng: 38.7871, myLoc: true, locOpen: false, locQuery: 'Current location' }),
          locSummary:
            (st.myLoc ? 'Using your current location (sample). ' : '') +
            'Pin near ' +
            near.name +
            ', ' +
            near.sub +
            ' · ' +
            st.lat.toFixed(4) +
            ', ' +
            st.lng.toFixed(4) +
            '. Customers see this on the back of the card.',
        };
      })(),
    };
  }
}

SetupView.defaultProps = { startStep: 1 };
SetupView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '960px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header style={{ background: '#ffffff', borderBottom: '1px solid #e3e5ec' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '14px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
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
              </svg>{' '}
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontWeight: '800',
                  letterSpacing: '0.03em',
                  fontSize: '13px',
                  lineHeight: '13px',
                }}
              >
                {'TEMELASH'}
                <span style={{ color: '#e42330' }}>{'CARD'}</span>
              </span>
            </div>{' '}
            <ol
              style={{
                listStyle: 'none',
                margin: '0',
                padding: '0',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {(__v?.steps || []).map((s, __i0) => (
                <React.Fragment key={__i0}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={s?.go}
                      aria-current={s?.current}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'transparent',
                        border: '0',
                        padding: '8px',
                        minHeight: '44px',
                        cursor: 'pointer',
                        color: `${__t(s?.labelColor)}`,
                        fontWeight: `${__t(s?.weight)}`,
                      }}
                    >
                      <span
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '999px',
                          boxSizing: 'border-box',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: '800',
                          background: `${__t(s?.dotBg)}`,
                          color: `${__t(s?.dotColor)}`,
                          border: `2px solid ${__t(s?.dotBorder)}`,
                        }}
                      >{`${__t(s?.num)}`}</span>
                      <span className={s?.labelCls}>{`${__t(s?.label)}`}</span>
                    </button>{' '}
                    {__b(s?.notLast) ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="tm-stepline"
                          style={{ width: '32px', height: '2px', background: '#e3e5ec' }}
                        />
                      </>
                    ) : null}
                  </li>
                </React.Fragment>
              ))}
            </ol>{' '}
            <A
              href="/business"
              style={{ fontWeight: '700', color: '#5b6475', textDecoration: 'none', padding: '10px 8px' }}
            >
              {'Save and exit'}
            </A>
          </div>
        </header>{' '}
        <main
          className="tm-setup-main"
          style={{
            flex: '1 1 auto',
            maxWidth: '1200px',
            width: '100%',
            boxSizing: 'border-box',
            margin: '0 auto',
            padding: '48px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            alignItems: 'flex-start',
          }}
        >
          <section
            className="tm-setup-card"
            style={{
              flex: '999 1 520px',
              minWidth: '0',
              background: '#ffffff',
              border: '1px solid #e3e5ec',
              borderRadius: '12px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {__b(__v?.isStep1) ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      {'STEP 1 OF 4'}
                    </span>{' '}
                    <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                      {'Tell us about your business'}
                    </h1>{' '}
                    <p style={{ margin: '0', color: '#5b6475' }}>
                      {'Customers see this name at the top of their card.'}
                    </p>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="biz-name" style={{ fontWeight: '700' }}>
                      {'Business name'}
                    </label>{' '}
                    <input
                      id="biz-name"
                      type="text"
                      value={__v?.name}
                      onChange={__v?.onName}
                      placeholder="e.g. Buna House"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                      }}
                    />
                  </div>{' '}
                  <fieldset
                    style={{
                      border: '0',
                      padding: '0',
                      margin: '0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>
                      {'Type of business'}
                    </legend>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {(__v?.types || []).map((t, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            aria-pressed={t?.pressed}
                            onClick={t?.pick}
                            style={{
                              borderRadius: '999px',
                              padding: '10px 18px',
                              minHeight: '44px',
                              cursor: 'pointer',
                              fontWeight: '700',
                              background: `${__t(t?.bg)}`,
                              color: `${__t(t?.color)}`,
                              border: `1px solid ${__t(t?.border)}`,
                            }}
                          >{`${__t(t?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>
                  </fieldset>{' '}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="biz-phone" style={{ fontWeight: '700' }}>
                        {'Phone'}
                      </label>{' '}
                      <input
                        id="biz-phone"
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
                    </div>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <label htmlFor="biz-loc" style={{ fontWeight: '700' }}>
                        {'Where is your business?'}
                      </label>{' '}
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '16px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          color: '#5b6475',
                        }}
                      >
                        {'GOOGLE MAPS IN THE LIVE APP'}
                      </span>
                    </div>{' '}
                    <div style={{ position: 'relative' }}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#5b6475"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ position: 'absolute', left: '14px', top: '15px' }}
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="M20 20l-3.5-3.5" />
                      </svg>{' '}
                      <input
                        id="biz-loc"
                        type="search"
                        autoComplete="off"
                        value={__v?.locQuery}
                        placeholder="Search an area, street or landmark"
                        aria-controls="loc-suggest"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          border: '1px solid #e3e5ec',
                          borderRadius: '6px',
                          padding: '12px 14px 12px 40px',
                          minHeight: '48px',
                          color: '#101827',
                        }}
                        onChange={__v?.onLocQuery}
                      />{' '}
                      {__b(__v?.hasSuggest) ? (
                        <>
                          <div
                            id="loc-suggest"
                            role="listbox"
                            aria-label="Places"
                            style={{
                              position: 'absolute',
                              left: '0',
                              right: '0',
                              top: '52px',
                              zIndex: '5',
                              background: '#ffffff',
                              border: '1px solid #e3e5ec',
                              borderRadius: '12px',
                              boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                              padding: '6px',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            {(__v?.suggest || []).map((g, __i0) => (
                              <React.Fragment key={__i0}>
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected="false"
                                  onClick={g?.pick}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    border: '0',
                                    background: 'transparent',
                                    borderRadius: '8px',
                                    padding: '10px 12px',
                                    minHeight: '44px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    color: '#101827',
                                  }}
                                >
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#5b6475"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                  </svg>
                                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong>{`${__t(g?.name)}`}</strong>
                                    <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(g?.sub)}`}</span>
                                  </span>
                                </button>
                              </React.Fragment>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>{' '}
                    <div
                      ref={(el) => {
                        const f = __v?.setMap;
                        if (typeof f === 'function') f(el);
                      }}
                      aria-hidden="true"
                      onPointerDown={__v?.mapDown}
                      onPointerMove={__v?.mapMove}
                      onPointerUp={__v?.mapUp}
                      onPointerCancel={__v?.mapUp}
                      style={{
                        position: 'relative',
                        height: '260px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #e3e5ec',
                        background: '#eef0f3',
                        cursor: 'crosshair',
                        touchAction: 'none',
                        userSelect: 'none',
                      }}
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 1000 800"
                        preserveAspectRatio="none"
                        style={{ position: 'absolute', inset: '0' }}
                      >
                        <rect x="0" y="0" width="1000" height="800" fill="#eef0f3" />{' '}
                        <rect x="60" y="80" width="180" height="120" rx="8" fill="#e3e5ec" />
                        <rect x="300" y="60" width="220" height="140" rx="8" fill="#e3e5ec" />
                        <rect x="600" y="90" width="160" height="120" rx="8" fill="#e3e5ec" />{' '}
                        <rect x="80" y="300" width="200" height="160" rx="8" fill="#e3e5ec" />
                        <rect x="380" y="320" width="160" height="120" rx="8" fill="#e3e5ec" />
                        <rect x="660" y="300" width="240" height="150" rx="8" fill="#e3e5ec" />{' '}
                        <rect x="100" y="560" width="200" height="160" rx="8" fill="#e3e5ec" />
                        <rect x="420" y="560" width="220" height="150" rx="8" fill="#e3e5ec" />
                        <rect x="720" y="580" width="200" height="140" rx="8" fill="#e3e5ec" />{' '}
                        <path
                          d="M560 230 C 600 300, 560 360, 600 420 S 640 520, 610 600"
                          fill="none"
                          stroke="#c9d6ef"
                          strokeWidth="22"
                        />{' '}
                        <rect x="250" y="440" width="120" height="90" rx="20" fill="#d7e6dc" />{' '}
                        <path d="M0 250 L1000 230" stroke="#d9dce3" strokeWidth="30" />
                        <path d="M0 250 L1000 230" stroke="#ffffff" strokeWidth="22" />{' '}
                        <path d="M0 520 L1000 540" stroke="#d9dce3" strokeWidth="26" />
                        <path d="M0 520 L1000 540" stroke="#ffffff" strokeWidth="18" />{' '}
                        <path d="M330 0 L360 800" stroke="#d9dce3" strokeWidth="26" />
                        <path d="M330 0 L360 800" stroke="#ffffff" strokeWidth="18" />{' '}
                        <path d="M640 0 L700 800" stroke="#d9dce3" strokeWidth="30" />
                        <path d="M640 0 L700 800" stroke="#ffffff" strokeWidth="22" />{' '}
                        <path d="M0 760 L520 420 L1000 120" stroke="#d9dce3" strokeWidth="20" />
                        <path d="M0 760 L520 420 L1000 120" stroke="#ffffff" strokeWidth="13" />
                      </svg>{' '}
                      {(__v?.mapLabels || []).map((l, __i0) => (
                        <React.Fragment key={__i0}>
                          <span
                            style={{
                              position: 'absolute',
                              left: `${__t(l?.x)}`,
                              top: `${__t(l?.y)}`,
                              transform: 'translate(-50%, -50%)',
                              fontSize: '12px',
                              fontWeight: '700',
                              color: '#5b6475',
                              background: 'rgba(247,247,249,0.85)',
                              borderRadius: '4px',
                              padding: '0 4px',
                              pointerEvents: 'none',
                              whiteSpace: 'nowrap',
                            }}
                          >{`${__t(l?.name)}`}</span>
                        </React.Fragment>
                      ))}{' '}
                      <span
                        style={{
                          position: 'absolute',
                          left: `${__t(__v?.pinX)}`,
                          top: `${__t(__v?.pinY)}`,
                          transform: 'translate(-50%, -100%)',
                          pointerEvents: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            background: '#101827',
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: '700',
                            borderRadius: '6px',
                            padding: '2px 8px',
                            marginBottom: '4px',
                            whiteSpace: 'nowrap',
                          }}
                        >{`${__t(__v?.shortName)}`}</span>{' '}
                        <svg width="34" height="42" viewBox="0 0 24 30" aria-hidden="true">
                          <path
                            d="M12 29s-10-9-10-17a10 10 0 0 1 20 0c0 8-10 17-10 17z"
                            fill="#e42330"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <circle cx="12" cy="12" r="4" fill="#ffffff" />
                        </svg>
                      </span>{' '}
                      <span
                        style={{
                          position: 'absolute',
                          right: '8px',
                          bottom: '8px',
                          fontSize: '11px',
                          color: '#5b6475',
                          background: 'rgba(255,255,255,0.9)',
                          borderRadius: '4px',
                          padding: '0 6px',
                          pointerEvents: 'none',
                        }}
                      >
                        {'Drag or tap to place the pin'}
                      </span>
                    </div>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' }}>
                      <div style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label htmlFor="biz-lat" style={{ fontSize: '14px', fontWeight: '700' }}>
                          {'Latitude'}
                        </label>
                        <input
                          id="biz-lat"
                          type="number"
                          step="0.0001"
                          value={__v?.latText}
                          onChange={__v?.onLat}
                          style={{
                            border: '1px solid #e3e5ec',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            minHeight: '44px',
                            boxSizing: 'border-box',
                            fontVariantNumeric: 'tabular-nums',
                            color: '#101827',
                          }}
                        />
                      </div>{' '}
                      <div style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label htmlFor="biz-lng" style={{ fontSize: '14px', fontWeight: '700' }}>
                          {'Longitude'}
                        </label>
                        <input
                          id="biz-lng"
                          type="number"
                          step="0.0001"
                          value={__v?.lngText}
                          onChange={__v?.onLng}
                          style={{
                            border: '1px solid #e3e5ec',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            minHeight: '44px',
                            boxSizing: 'border-box',
                            fontVariantNumeric: 'tabular-nums',
                            color: '#101827',
                          }}
                        />
                      </div>{' '}
                      <button
                        type="button"
                        onClick={__v?.useMyLoc}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#4661ad',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 14px',
                          minHeight: '44px',
                          cursor: 'pointer',
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
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                          <circle cx="12" cy="12" r="8" />
                        </svg>
                        {'Use my location'}
                      </button>
                    </div>{' '}
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.locSummary)}`}</span>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="biz-lang" style={{ fontWeight: '700' }}>
                      {'Card language'}
                    </label>{' '}
                    <select
                      id="biz-lang"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        background: '#ffffff',
                        color: '#101827',
                      }}
                    >
                      <option>{'Amharic first, English second'}</option>
                      <option>{'English first, Amharic second'}</option>
                    </select>
                  </div>
                </div>
              </>
            ) : null}{' '}
            {__b(__v?.isStep2) ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      {'STEP 2 OF 4'}
                    </span>{' '}
                    <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                      {'Make the card yours'}
                    </h1>{' '}
                    <p style={{ margin: '0', color: '#5b6475' }}>
                      {'Your logo and colour lead. Temelash stays small in the corner.'}
                    </p>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontWeight: '700' }}>{'Logo'}</span>{' '}
                    <button
                      type="button"
                      style={{
                        border: '2px dashed #e3e5ec',
                        borderRadius: '12px',
                        background: '#f7f7f9',
                        padding: '28px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        color: '#101827',
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
                        <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
                      </svg>{' '}
                      <span style={{ fontWeight: '700' }}>{'Upload logo'}</span>
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>
                        {'PNG or SVG, square, at least 512 px'}
                      </span>
                    </button>
                  </div>{' '}
                  <fieldset style={{ border: '0', padding: '0', margin: '0' }}>
                    <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>
                      {'Your brand colour'}
                    </legend>{' '}
                    <ColorPicker
                      value={__v?.accentHex}
                      onChange={__v?.setAccent}
                      presets={__v?.accentPresets}
                      idPrefix="setup-color"
                    />
                  </fieldset>{' '}
                  <fieldset style={{ border: '0', padding: '0', margin: '0' }}>
                    <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>{'Card style'}</legend>{' '}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                      <label
                        style={{
                          border: '2px solid #4661ad',
                          borderRadius: '12px',
                          padding: '14px',
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                          cursor: 'pointer',
                        }}
                      >
                        <input type="radio" name="style" defaultChecked={true} style={{ marginTop: '4px' }} />
                        <span>
                          <strong>{'Light'}</strong>
                          <br />
                          <span style={{ color: '#5b6475', fontSize: '14px' }}>{'White card, your colour on top'}</span>
                        </span>
                      </label>{' '}
                      <label
                        style={{
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          padding: '14px',
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                          cursor: 'pointer',
                        }}
                      >
                        <input type="radio" name="style" style={{ marginTop: '4px' }} />
                        <span>
                          <strong>{'Bold'}</strong>
                          <br />
                          <span style={{ color: '#5b6475', fontSize: '14px' }}>{'Your colour fills the header'}</span>
                        </span>
                      </label>
                    </div>
                  </fieldset>
                </div>
              </>
            ) : null}{' '}
            {__b(__v?.isStep3) ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      {'STEP 3 OF 4'}
                    </span>{' '}
                    <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                      {'Choose the reward'}
                    </h1>{' '}
                    <p style={{ margin: '0', color: '#5b6475' }}>
                      {'One stamp per visit. The last slot is the reward.'}
                    </p>
                  </div>{' '}
                  <fieldset style={{ border: '0', padding: '0', margin: '0' }}>
                    <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>
                      {'Stamps to earn the reward'}
                    </legend>{' '}
                    <div
                      style={{
                        display: 'inline-flex',
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        padding: '4px',
                        gap: '4px',
                      }}
                    >
                      {(__v?.counts || []).map((c, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            aria-pressed={c?.pressed}
                            onClick={c?.pick}
                            style={{
                              border: '0',
                              borderRadius: '8px',
                              padding: '10px 22px',
                              minHeight: '44px',
                              cursor: 'pointer',
                              fontWeight: '800',
                              fontVariantNumeric: 'tabular-nums',
                              background: `${__t(c?.bg)}`,
                              color: `${__t(c?.color)}`,
                            }}
                          >{`${__t(c?.n)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>
                  </fieldset>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="reward" style={{ fontWeight: '700' }}>
                      {'Reward'}
                    </label>{' '}
                    <input
                      id="reward"
                      type="text"
                      value={__v?.reward}
                      onChange={__v?.onReward}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                      }}
                    />{' '}
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'Keep it concrete: "a free macchiato", "a free wash".'}
                    </span>
                  </div>{' '}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="expiry" style={{ fontWeight: '700' }}>
                        {'Reward expires after'}
                      </label>{' '}
                      <select
                        id="expiry"
                        style={{
                          border: '1px solid #e3e5ec',
                          borderRadius: '6px',
                          padding: '12px 14px',
                          minHeight: '48px',
                          background: '#ffffff',
                          color: '#101827',
                        }}
                      >
                        <option>{'30 days'}</option>
                        <option>{'60 days'}</option>
                        <option>{'Never'}</option>
                      </select>
                    </div>{' '}
                    <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="minspend" style={{ fontWeight: '700' }}>
                        {'Minimum spend per stamp'}
                      </label>{' '}
                      <input
                        id="minspend"
                        type="text"
                        placeholder="[ETB amount] or leave blank"
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
                  <label
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      style={{ marginTop: '4px', width: '18px', height: '18px' }}
                    />
                    <span>
                      <strong>{'Give a welcome stamp'}</strong>
                      <br />
                      <span style={{ color: '#5b6475', fontSize: '14px' }}>
                        {'New customers start with their first stamp when they save the card.'}
                      </span>
                    </span>
                  </label>
                </div>
              </>
            ) : null}{' '}
            {__b(__v?.isStep4) ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      {'STEP 4 OF 4'}
                    </span>{' '}
                    <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                      {'Your card is ready. Put it on the counter.'}
                    </h1>{' '}
                    <p style={{ margin: '0', color: '#5b6475' }}>
                      {'Customers scan this code to save the card. First stamp on their next visit.'}
                    </p>
                  </div>{' '}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
                    <div
                      role="img"
                      aria-label="QR code placeholder"
                      style={{
                        width: '180px',
                        height: '180px',
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        padding: '14px',
                        boxSizing: 'border-box',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                        gap: '4px',
                      }}
                    >
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />{' '}
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} /> <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span /> <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span style={{ background: '#101827', borderRadius: '2px' }} /> <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />{' '}
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span /> <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                      <span />
                      <span style={{ background: '#101827', borderRadius: '2px' }} />
                    </div>{' '}
                    <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <A
                        href="/business/shop"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          padding: '12px 16px',
                          textDecoration: 'none',
                          color: '#101827',
                          fontWeight: '700',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#4661ad"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 4v12M7 11l5 5 5-5M4 20h16" />
                        </svg>
                        {'Download counter stand (A5 PDF)'}
                      </A>{' '}
                      <A
                        href="/business/shop"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          padding: '12px 16px',
                          textDecoration: 'none',
                          color: '#101827',
                          fontWeight: '700',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#4661ad"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 7h18v13H3zM8 7V4h8v3" />
                        </svg>
                        {'Order printed stands'}
                      </A>
                    </div>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="invite" style={{ fontWeight: '700' }}>
                      {'Invite your staff to the stamping app'}
                    </label>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <input
                        id="invite"
                        type="tel"
                        placeholder="Staff phone number"
                        style={{
                          flex: '1 1 220px',
                          border: '1px solid #e3e5ec',
                          borderRadius: '6px',
                          padding: '12px 14px',
                          minHeight: '48px',
                          boxSizing: 'border-box',
                        }}
                      />{' '}
                      <button
                        type="button"
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#4661ad',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 20px',
                          minHeight: '48px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Send invite'}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : null}{' '}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
                borderTop: '1px solid #e3e5ec',
                paddingTop: '20px',
              }}
            >
              {__b(__v?.hasBack) ? (
                <>
                  <button
                    type="button"
                    onClick={__v?.back}
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      color: '#101827',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '12px 22px',
                      minHeight: '48px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Back'}
                  </button>
                </>
              ) : null}{' '}
              <span style={{ flex: '1 1 auto' }} />{' '}
              {__b(__v?.isLast) ? (
                <>
                  <A
                    href="/business"
                    style={{
                      background: '#e42330',
                      color: '#ffffff',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                    }}
                  >
                    {'Go to my dashboard'}
                  </A>
                </>
              ) : null}{' '}
              {__b(__v?.notLast) ? (
                <>
                  <button
                    type="button"
                    onClick={__v?.next}
                    style={{
                      border: '0',
                      background: '#e42330',
                      color: '#ffffff',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      minHeight: '48px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Continue'}
                  </button>
                </>
              ) : null}
            </div>
          </section>{' '}
          <aside
            aria-label="Card preview"
            style={{
              flex: '1 1 380px',
              minWidth: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                color: '#5b6475',
              }}
            >
              {'LIVE PREVIEW · WHAT CUSTOMERS SAVE'}
            </span>{' '}
            <div
              style={{
                width: '100%',
                maxWidth: '380px',
                background: '#ffffff',
                borderRadius: '20px',
                boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                overflow: 'hidden',
              }}
            >
              <div style={{ height: '10px', background: `${__t(__v?.accentHex)}` }} />{' '}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '0' }}>
                    <span
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: `${__t(__v?.accentHex)}`,
                        color: '#ffffff',
                        fontWeight: '800',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'none',
                      }}
                    >{`${__t(__v?.initial)}`}</span>{' '}
                    <span
                      style={{
                        fontSize: '24px',
                        lineHeight: '30px',
                        fontWeight: '700',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >{`${__t(__v?.displayName)}`}</span>
                  </div>{' '}
                  <svg width="24" height="24" viewBox="0 0 40 40" role="img" aria-label="Temelash mark">
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      flex: '1 1 auto',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                      gap: '10px',
                    }}
                  >
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
                            border: `2px ${__t(sl?.borderStyle)} ${__t(sl?.border)}`,
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
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M5 12l5 5L20 7" />
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
                  <span
                    style={{
                      fontSize: '32px',
                      lineHeight: '32px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(__v?.countLabel)}`}</span>
                </div>{' '}
                <div
                  style={{ background: '#fff3dc', borderRadius: '12px', padding: '12px 16px', fontWeight: '600' }}
                >{`${__t(__v?.rewardLine)}`}</div>{' '}
                <div
                  style={{
                    borderTop: '1px solid #e3e5ec',
                    paddingTop: '12px',
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
            </div>{' '}
            <p style={{ margin: '0', fontSize: '14px', color: '#5b6475', textAlign: 'center' }}>
              {'Shown as an Apple Wallet pass, Google Wallet pass or web card.'}
            </p>
          </aside>
        </main>
      </div>
    </>
  );
};

export default withDCStyle(SetupView, 'Setup', __CSS);
