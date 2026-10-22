'use client';
/* Generated from the Temelash Card design (AdminAnalytics.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-hide-sm{display:none !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.bar:hover{background:#101827 !important}\n.lbl{font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.08em;color:#5b6475}\n.card{background:#ffffff;border:1px solid #e3e5ec;border-radius:12px;padding:20px 24px;display:flex;flex-direction:column;gap:14px;min-width:0}';
class AdminAnalyticsView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { range: 30, type: 'all', measure: 'holders', table: false, topSort: 'stamps' };
  }
  renderVals() {
    const s = this.state;
    const typeShare = { all: 1, Café: 0.38, Restaurant: 0.22, Salon: 0.18, Spa: 0.1, 'Car wash': 0.12 }[s.type];
    const fmt = (n) => Math.round(n).toLocaleString('en-US');
    const noise = (i, k) => {
      const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    const base = { holders: 260, stamps: 4700, rewards: 410 }[s.measure];
    const today = new Date(2026, 9, 21);
    const day = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    let bars = [];
    if (s.range === 7) {
      bars = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - 6 + i);
        const wk = d.getDay();
        const v = base * typeShare * (0.8 + noise(i, 1) * 0.4) * (wk === 0 ? 1.25 : 1);
        return { v, m: d.toLocaleDateString('en-GB', { weekday: 'short' }), title: day(d) };
      });
    } else {
      const weeks = s.range === 30 ? 5 : 13;
      bars = Array.from({ length: weeks }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (weeks - 1 - i) * 7);
        const growth = 0.7 + (i / weeks) * 0.4;
        const v = base * 7 * typeShare * growth * (0.9 + noise(i, 2) * 0.2);
        return { v, m: 'Wk ' + day(d), title: 'Week of ' + day(d) };
      });
    }
    const max =
      Math.max.apply(
        null,
        bars.map((b) => b.v),
      ) * 1.2;
    const total = bars.reduce((a, b) => a + b.v, 0);
    bars = bars.map((b, i) => ({
      v: fmt(b.v),
      m: b.m,
      title: b.title,
      h: Math.round((b.v / max) * 170) + 'px',
      color: i === bars.length - 1 ? '#e42330' : '#4661ad',
    }));
    const mLabels = { holders: 'New card holders', stamps: 'Stamps given', rewards: 'Rewards redeemed' };
    const measures = ['holders', 'stamps', 'rewards'].map((id) => {
      const on = s.measure === id;
      return {
        label: mLabels[id],
        pressed: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
        pick: () => this.setState({ measure: id }),
      };
    });
    const ranges = [7, 30, 90].map((r) => {
      const on = s.range === r;
      return {
        label: r + ' days',
        pressed: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
        pick: () => this.setState({ range: r }),
      };
    });
    const f = s.range / 30;
    const kpis = [
      {
        label: 'ACTIVE BUSINESSES',
        value: fmt(128 * typeShare),
        delta: '+' + fmt(9 * f * typeShare) + ' in ' + s.range + ' days',
        deltaColor: '#1d6b3a',
      },
      {
        label: 'CARD HOLDERS',
        value: fmt(18420 * typeShare),
        delta: '+' + fmt(260 * s.range * typeShare) + ' new',
        deltaColor: '#1d6b3a',
      },
      {
        label: 'STAMPS GIVEN',
        value: fmt(4700 * s.range * typeShare),
        delta: '+12% vs previous ' + s.range + ' days',
        deltaColor: '#1d6b3a',
      },
      {
        label: 'REWARDS REDEEMED',
        value: fmt(410 * s.range * typeShare),
        delta: '+8% vs previous',
        deltaColor: '#1d6b3a',
      },
      {
        label: 'MERCHANTS LEFT',
        value: String(Math.max(1, Math.round(3 * f * typeShare))),
        delta: 'Churn ' + (2.3 * (s.range === 7 ? 0.3 : f)).toFixed(1) + '%',
        deltaColor: '#c81d29',
      },
    ];
    const wsplit = [
      ['Apple Wallet', 0.46, '#101827'],
      ['Google Wallet', 0.37, '#4661ad'],
      ['Web card', 0.17, '#5b6475'],
    ];
    const holders = 18420 * typeShare;
    const wallets = wsplit.map(([label, p, color]) => ({
      label,
      pct: Math.round(p * 100) + '%',
      n: fmt(holders * p),
      color,
    }));
    const signups = Math.max(4, Math.round(30 * f * typeShare));
    const steps = [
      ['Signed up', 1],
      ['Approved', 0.83],
      ['Card live', 0.7],
      ['First stamp', 0.6],
      ['Paid plan', 0.37],
    ];
    const funnel = steps.map(([label, p], i) => ({
      label,
      n: String(Math.round(signups * p)),
      pct: Math.round(p * 100) + '%',
      w: Math.round(p * 100) + '%',
      color: i === steps.length - 1 ? '#e42330' : '#4661ad',
    }));
    let drop = { d: 0, label: '' };
    for (let i = 1; i < steps.length; i++) {
      const d = steps[i - 1][1] - steps[i][1];
      if (d > drop.d)
        drop = { d, label: steps[i - 1][0] + ' → ' + steps[i][0] + ' (' + Math.round(d * signups) + ' businesses)' };
    }
    const types = [
      ['Café', 49, 0.64],
      ['Restaurant', 28, 0.52],
      ['Salon', 23, 0.71],
      ['Spa', 13, 0.58],
      ['Car wash', 15, 0.66],
    ];
    const byType = types.map(([label, b, r]) => ({
      label,
      biz: String(b),
      stamps: fmt(4700 * s.range * (b / 128)),
      ret: Math.round(r * 100) + '%',
      bg: s.type === label ? '#f7f7f9' : '#ffffff',
    }));
    const bizs = [
      ['Buna House', 'Café', 2140, 96, 0.74],
      ['Abyssinia Car Wash', 'Car wash', 1810, 71, 0.69],
      ['Selam Salon', 'Salon', 1420, 40, 0.81],
      ['Habesha Bites', 'Restaurant', 1390, 88, 0.55],
      ['Entoto Spa', 'Spa', 980, 33, 0.62],
      ['Arada Coffee', 'Café', 870, 64, 0.6],
      ['Sheba Beauty', 'Salon', 760, 29, 0.77],
      ['Gebeya Burger', 'Restaurant', 700, 52, 0.48],
    ].filter((b) => s.type === 'all' || b[1] === s.type);
    const key = { stamps: 2, new: 3, ret: 4 }[s.topSort];
    const top = bizs
      .slice()
      .sort((a, b) => b[key] - a[key])
      .slice(0, 5)
      .map((b, i) => ({
        rank: String(i + 1),
        name: b[0],
        type: b[1],
        metric: s.topSort === 'ret' ? Math.round(b[4] * 100) + '%' : fmt(b[key] * f),
      }));
    const left = Math.max(1, Math.round(3 * f * typeShare));
    const churn = [
      {
        n: String(Math.max(1, Math.round(left * 0.4))),
        reason: 'Closed or moved',
        example: 'e.g. a café that shut its Piassa branch',
      },
      { n: String(Math.round(left * 0.3)), reason: 'Price', example: 'Asked for a cheaper plan' },
      { n: String(Math.round(left * 0.2)), reason: 'Staff stopped stamping', example: 'Low use after the first month' },
      { n: String(Math.round(left * 0.1)), reason: 'Other', example: 'Switched to paper cards' },
    ];
    return {
      ranges,
      type: s.type,
      onType: (e) => this.setState({ type: e.target.value }),
      kpis,
      chartTitle: mLabels[s.measure],
      chartSub: (s.range === 7 ? 'Per day' : 'Per week') + ' · ' + fmt(total) + ' total in ' + s.range + ' days',
      measures,
      measureUp: mLabels[s.measure].toUpperCase(),
      bars,
      gap: s.range === 90 ? '6px' : '12px',
      minW: s.range === 90 ? '640px' : '0',
      showTable: s.table,
      tableExpanded: s.table ? 'true' : 'false',
      tableLabel: s.table ? 'Hide the numbers table' : 'Show the numbers as a table',
      toggleTable: () => this.setState({ table: !s.table }),
      wallets,
      funnel,
      biggestDrop: drop.label,
      byType,
      topSort: s.topSort,
      onTopSort: (e) => this.setState({ topSort: e.target.value }),
      top,
      churnLine: left + ' in ' + s.range + ' days',
      churn,
    };
  }
}

AdminAnalyticsView.defaultProps = {};
AdminAnalyticsView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1400px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <AdminSidebar active="analytics" />
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
            gap: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                  {'Platform analytics'}
                </h1>
                <span
                  className="lbl"
                  style={{ border: '1px solid #e3e5ec', borderRadius: '999px', padding: '2px 10px' }}
                >
                  {'SAMPLE DATA'}
                </span>
              </div>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>
                {
                  'How Temelash is growing across every merchant: card holders, stamps, rewards and which businesses stick.'
                }
              </p>
            </div>{' '}
            <div role="group" aria-label="Date range" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(__v?.ranges || []).map((r, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    aria-pressed={r?.pressed}
                    onClick={r?.pick}
                    style={{
                      borderRadius: '999px',
                      padding: '6px 14px',
                      minHeight: '44px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      background: `${__t(r?.bg)}`,
                      color: `${__t(r?.color)}`,
                      border: `1px solid ${__t(r?.border)}`,
                    }}
                  >{`${__t(r?.label)}`}</button>
                </React.Fragment>
              ))}{' '}
              <select
                value={__v?.type}
                onChange={__v?.onType}
                aria-label="Business type"
                style={{
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  minHeight: '44px',
                  background: '#ffffff',
                  color: '#101827',
                }}
              >
                <option value="all">{'All types'}</option>
                <option value="Café">{'Cafés'}</option>
                <option value="Restaurant">{'Restaurants'}</option>
                <option value="Salon">{'Salons'}</option>
                <option value="Spa">{'Spas'}</option>
                <option value="Car wash">{'Car washes'}</option>
              </select>
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {(__v?.kpis || []).map((k, __i0) => (
              <React.Fragment key={__i0}>
                <div
                  style={{
                    flex: '1 1 170px',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <span className="lbl">{`${__t(k?.label)}`}</span>
                  <span style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '800' }}>{`${__t(k?.value)}`}</span>
                  <span
                    style={{ fontSize: '14px', fontWeight: '600', color: `${__t(k?.deltaColor)}` }}
                  >{`${__t(k?.delta)}`}</span>
                </div>
              </React.Fragment>
            ))}
          </div>{' '}
          <section className="card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <div>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{`${__t(__v?.chartTitle)}`}</h2>
                <span style={{ color: '#5b6475', fontSize: '14px' }}>{`${__t(__v?.chartSub)}`}</span>
              </div>{' '}
              <div role="tablist" aria-label="Measure" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(__v?.measures || []).map((m, __i0) => (
                  <React.Fragment key={__i0}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={m?.pressed}
                      onClick={m?.pick}
                      style={{
                        borderRadius: '999px',
                        padding: '6px 12px',
                        minHeight: '40px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px',
                        background: `${__t(m?.bg)}`,
                        color: `${__t(m?.color)}`,
                        border: `1px solid ${__t(m?.border)}`,
                      }}
                    >{`${__t(m?.label)}`}</button>
                  </React.Fragment>
                ))}
              </div>
            </div>{' '}
            <div style={{ overflowX: 'auto' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: `${__t(__v?.gap)}`,
                  height: '210px',
                  minWidth: `${__t(__v?.minW)}`,
                }}
              >
                {(__v?.bars || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        flex: '1 1 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px',
                        height: '100%',
                        minWidth: '0',
                      }}
                    >
                      <span
                        style={{ fontWeight: '700', fontSize: '13px', whiteSpace: 'nowrap' }}
                      >{`${__t(b?.v)}`}</span>{' '}
                      <div
                        className="bar"
                        title={b?.title}
                        style={{
                          width: '100%',
                          maxWidth: '56px',
                          height: `${__t(b?.h)}`,
                          background: `${__t(b?.color)}`,
                          borderRadius: '6px 6px 0 0',
                        }}
                      />{' '}
                      <span style={{ fontSize: '12px', color: '#5b6475', whiteSpace: 'nowrap' }}>{`${__t(b?.m)}`}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>{' '}
            <button
              type="button"
              onClick={__v?.toggleTable}
              aria-expanded={__v?.tableExpanded}
              style={{
                alignSelf: 'flex-start',
                border: '0',
                background: 'transparent',
                color: '#4661ad',
                fontWeight: '700',
                minHeight: '44px',
                cursor: 'pointer',
                padding: '0',
              }}
            >{`${__t(__v?.tableLabel)}`}</button>{' '}
            {__b(__v?.showTable) ? (
              <>
                <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '420px', fontSize: '14px' }}>
                  <thead>
                    <tr>
                      <th scope="col" className="lbl" style={{ textAlign: 'left', padding: '6px 0' }}>
                        {'PERIOD'}
                      </th>
                      <th
                        scope="col"
                        className="lbl"
                        style={{ textAlign: 'right', padding: '6px 0' }}
                      >{`${__t(__v?.measureUp)}`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(__v?.bars || []).map((b, __i0) => (
                      <React.Fragment key={__i0}>
                        <tr style={{ borderTop: '1px solid #e3e5ec' }}>
                          <td style={{ padding: '6px 0' }}>{`${__t(b?.title)}`}</td>
                          <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: '700' }}>{`${__t(b?.v)}`}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </>
            ) : null}
          </section>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'stretch' }}>
            <section className="card" style={{ flex: '1 1 320px' }}>
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Where customers keep their card'}</h2>{' '}
              {(__v?.wallets || []).map((w, __i0) => (
                <React.Fragment key={__i0}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>{`${__t(w?.label)}`}</span>
                      <span style={{ fontWeight: '700' }}>{`${__t(w?.pct)} · ${__t(w?.n)}`}</span>
                    </div>{' '}
                    <div style={{ height: '12px', background: '#f7f7f9', borderRadius: '999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${__t(w?.pct)}`,
                          background: `${__t(w?.color)}`,
                          borderRadius: '999px',
                        }}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}{' '}
              <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                {
                  'Web card users get no lock-screen offers. The "Move to wallet" prompt in the customer card is how they switch.'
                }
              </p>
            </section>{' '}
            <section className="card" style={{ flex: '1 1 320px' }}>
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Merchant journey'}</h2>{' '}
              <span style={{ color: '#5b6475', fontSize: '14px', marginTop: '-8px' }}>
                {'Businesses that signed up in this period and how far they got'}
              </span>{' '}
              {(__v?.funnel || []).map((f, __i0) => (
                <React.Fragment key={__i0}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ flex: '0 0 120px', fontSize: '14px', fontWeight: '600' }}>{`${__t(f?.label)}`}</span>{' '}
                    <div
                      style={{
                        flex: '1 1 auto',
                        height: '28px',
                        background: '#f7f7f9',
                        borderRadius: '6px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${__t(f?.w)}`,
                          background: `${__t(f?.color)}`,
                          borderRadius: '6px',
                        }}
                      />
                    </div>{' '}
                    <span style={{ flex: '0 0 64px', textAlign: 'right', fontWeight: '700', fontSize: '14px' }}>
                      {`${__t(f?.n)} `}
                      <span style={{ color: '#5b6475', fontWeight: '600' }}>{`${__t(f?.pct)}`}</span>
                    </span>
                  </div>
                </React.Fragment>
              ))}{' '}
              <p
                style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}
              >{`Biggest drop: ${__t(__v?.biggestDrop)}.`}</p>
            </section>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'stretch' }}>
            <section className="card" style={{ flex: '1 1 320px' }}>
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'By business type'}</h2>{' '}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '380px', fontSize: '15px' }}>
                  <thead>
                    <tr>
                      <th scope="col" className="lbl" style={{ textAlign: 'left', padding: '8px 0' }}>
                        {'TYPE'}
                      </th>
                      <th scope="col" className="lbl" style={{ textAlign: 'right', padding: '8px 6px' }}>
                        {'BUSINESSES'}
                      </th>
                      <th scope="col" className="lbl" style={{ textAlign: 'right', padding: '8px 6px' }}>
                        {'STAMPS'}
                      </th>
                      <th scope="col" className="lbl" style={{ textAlign: 'right', padding: '8px 0' }}>
                        {'COME BACK'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(__v?.byType || []).map((t, __i0) => (
                      <React.Fragment key={__i0}>
                        <tr style={{ borderTop: '1px solid #e3e5ec', background: `${__t(t?.bg)}` }}>
                          <td style={{ padding: '8px 0', fontWeight: '600' }}>{`${__t(t?.label)}`}</td>
                          <td style={{ padding: '8px 6px', textAlign: 'right' }}>{`${__t(t?.biz)}`}</td>
                          <td style={{ padding: '8px 6px', textAlign: 'right' }}>{`${__t(t?.stamps)}`}</td>
                          <td
                            style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}
                          >{`${__t(t?.ret)}`}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>{' '}
              <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                {'"Come back" is the share of card holders with 2 or more visits in the period.'}
              </p>
            </section>{' '}
            <section className="card" style={{ flex: '1 1 320px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Top businesses'}</h2>{' '}
                <select
                  value={__v?.topSort}
                  onChange={__v?.onTopSort}
                  aria-label="Rank by"
                  style={{
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '6px 10px',
                    minHeight: '40px',
                    background: '#ffffff',
                    color: '#101827',
                  }}
                >
                  <option value="stamps">{'Most stamps'}</option>
                  <option value="new">{'Most new card holders'}</option>
                  <option value="ret">{'Best come-back rate'}</option>
                </select>
              </div>{' '}
              <ol style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                {(__v?.top || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <li
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        borderTop: '1px solid #e3e5ec',
                        padding: '8px 0',
                      }}
                    >
                      <span style={{ width: '24px', fontWeight: '800', color: '#5b6475' }}>{`${__t(b?.rank)}`}</span>
                      <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                        <A
                          href="/admin/businesses"
                          style={{ fontWeight: '700', textDecoration: 'none', color: '#101827' }}
                        >{`${__t(b?.name)}`}</A>
                        <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(b?.type)}`}</span>
                      </span>
                      <span style={{ fontWeight: '700' }}>{`${__t(b?.metric)}`}</span>
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </section>
          </div>{' '}
          <section className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Businesses that left'}</h2>
              <span style={{ fontWeight: '700' }}>{`${__t(__v?.churnLine)}`}</span>
            </div>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {(__v?.churn || []).map((c, __i0) => (
                <React.Fragment key={__i0}>
                  <div
                    style={{
                      flex: '1 1 200px',
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    <span style={{ fontSize: '22px', fontWeight: '800' }}>{`${__t(c?.n)}`}</span>
                    <span style={{ fontWeight: '600' }}>{`${__t(c?.reason)}`}</span>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(c?.example)}`}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default withDCStyle(AdminAnalyticsView, 'AdminAnalytics', __CSS);
