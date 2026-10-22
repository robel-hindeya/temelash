'use client';
/* Generated from the Temelash Card design (Analytics.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,select:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.bar:hover{background:#101827 !important}';
class AnalyticsView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { range: '90' };
  }
  renderVals() {
    const r = this.state.range;
    const ranges = [
      ['7', '7 days'],
      ['30', '30 days'],
      ['90', '90 days'],
    ].map(([id, label]) => ({
      label,
      pressed: id === r ? 'true' : 'false',
      bg: id === r ? '#101827' : 'transparent',
      color: id === r ? '#ffffff' : '#101827',
      pick: () => this.setState({ range: id }),
    }));
    const sets = {
      7: {
        title: 'Stamps per day',
        x: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
        v: [58, 55, 66, 108, 79, 63, 41],
        unit: 'day',
      },
      30: {
        title: 'Stamps per week',
        x: ['22 Sep', '29 Sep', '6 Oct', '13 Oct', '20 Oct'],
        v: [702, 768, 845, 921, 1036],
        unit: 'week',
      },
      90: {
        title: 'Stamps per week',
        x: [
          '28 Jul',
          '4 Aug',
          '11 Aug',
          '18 Aug',
          '25 Aug',
          '1 Sep',
          '8 Sep',
          '15 Sep',
          '22 Sep',
          '29 Sep',
          '6 Oct',
          '13 Oct',
        ],
        v: [212, 268, 301, 355, 410, 472, 540, 611, 702, 768, 845, 921],
        unit: 'week',
      },
    };
    const set = sets[r];
    const max = Math.max.apply(null, set.v) * 1.1;
    const visits = set.v.map((v, i) => ({
      v: v.toLocaleString('en-US'),
      x: set.x[i],
      h: Math.round((v / max) * 100) + '%',
      tip: set.x[i] + ': ' + v + ' stamps',
      label: true,
    }));
    const kp = {
      7: [
        ['STAMPS', '470', 'vs 412 the week before'],
        ['NEW CARDS', '18', 'Saved this week'],
        ['RETURN RATE', '64%', 'New customers back within 30 days'],
        ['REWARDS REDEEMED', '14', 'of 17 unlocked'],
      ],
      30: [
        ['STAMPS', '4,272', 'vs 3,610 last 30 days'],
        ['NEW CARDS', '76', 'Saved in 30 days'],
        ['RETURN RATE', '64%', 'New customers back within 30 days'],
        ['REWARDS REDEEMED', '58', 'of 66 unlocked'],
      ],
      90: [
        ['STAMPS', '6,405', 'Since you launched'],
        ['NEW CARDS', '412', 'Saved since launch'],
        ['RETURN RATE', '64%', 'New customers back within 30 days'],
        ['REWARDS REDEEMED', '81', 'of 96 unlocked'],
      ],
    }[r].map(([label, value, note]) => ({ label, value, note }));
    const fdef = [
      ['Scanned your QR', 520],
      ['Saved the card', 412],
      ['Came back at least once', 264],
      ['Unlocked a reward', 96],
      ['Redeemed it', 81],
    ];
    const funnel = fdef.map(([label, v]) => ({
      label,
      v: String(v),
      pct: Math.round((v / 520) * 100) + '%',
      w: Math.round((v / 520) * 100) + '%',
      tip: label + ': ' + v,
    }));
    const dScale = { 7: 470 / 4841, 30: 4272 / 4841, 90: 1 }[r];
    const dv = [610, 640, 702, 731, 868, 1290, 980].map((v) => Math.round(v * dScale));
    const dx = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dmax = Math.max.apply(null, dv) * 1.2;
    const days = dv.map((v, i) => ({
      v: v.toLocaleString('en-US'),
      x: dx[i],
      h: Math.round((v / dmax) * 100) + '%',
      tip: dx[i] + ': ' + v + ' stamps',
    }));
    const hv = [120, 410, 520, 300, 210, 260, 480, 430, 250, 220, 280, 340, 260, 140].map((v) =>
      Math.round(v * dScale),
    );
    const hmax = Math.max.apply(null, hv) * 1.25;
    const hx = ['7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8'];
    const hours = hv.map((v, i) => ({
      v: String(v),
      x: hx[i],
      h: Math.round((v / hmax) * 100) + '%',
      tip: hx[i] + (i < 5 ? 'am' : 'pm') + ': ' + v + ' stamps',
    }));
    return {
      ranges,
      kpis: kp,
      visits,
      funnel,
      days,
      hours,
      visitsTitle: set.title + ' · last ' + r + ' days',
      visitsAlt: set.title + ' over the last ' + r + ' days, rising steadily',
      rangeNote: 'Last ' + r + ' days',
      staff: (() => {
        const S = {
          7: [
            ['Meron', 214],
            ['Yonas', 183],
            ['Owner', 73],
          ],
          30: [
            ['Meron', 1938],
            ['Yonas', 1601],
            ['Owner', 733],
          ],
          90: [
            ['Meron', 2904],
            ['Yonas', 2388],
            ['Owner', 1113],
          ],
        }[r];
        const tot = S.reduce((a, x) => a + x[1], 0);
        const top = S[0][1];
        return S.map(([name, v]) => ({
          name,
          v: v.toLocaleString('en-US'),
          pct: Math.round((v / tot) * 100) + '%',
          w: Math.round((v / top) * 100) + '%',
          tip: name + ': ' + v.toLocaleString('en-US') + ' stamps in the last ' + r + ' days',
        }));
      })(),
    };
  }
}

AnalyticsView.defaultProps = {};
AnalyticsView.prototype.__template = function (__v) {
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
          <Sidebar active="analytics" />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Analytics'}</h1>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    border: '1px solid #e3e5ec',
                    borderRadius: '999px',
                    padding: '2px 10px',
                  }}
                >
                  {'SAMPLE DATA'}
                </span>
              </div>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>{"Are customers coming back? Here's the answer."}</p>
            </div>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <div
                role="group"
                aria-label="Date range"
                style={{
                  display: 'inline-flex',
                  border: '1px solid #e3e5ec',
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '4px',
                  gap: '4px',
                }}
              >
                {(__v?.ranges || []).map((r, __i0) => (
                  <React.Fragment key={__i0}>
                    <button
                      type="button"
                      aria-pressed={r?.pressed}
                      onClick={r?.pick}
                      style={{
                        border: '0',
                        borderRadius: '8px',
                        padding: '8px 14px',
                        minHeight: '40px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px',
                        background: `${__t(r?.bg)}`,
                        color: `${__t(r?.color)}`,
                      }}
                    >{`${__t(r?.label)}`}</button>
                  </React.Fragment>
                ))}
              </div>{' '}
              <label
                htmlFor="an-loc"
                style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
              >
                {'Branch'}
              </label>{' '}
              <select
                id="an-loc"
                style={{
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  minHeight: '48px',
                  background: '#ffffff',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <option>{'All branches'}</option>
                <option>{'Bole branch'}</option>
              </select>
            </div>
          </div>{' '}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px' }}>
            {(__v?.kpis || []).map((k, __i0) => (
              <React.Fragment key={__i0}>
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
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
                  >{`${__t(k?.label)}`}</span>{' '}
                  <span
                    style={{
                      fontSize: '32px',
                      lineHeight: '32px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(k?.value)}`}</span>{' '}
                  <span style={{ fontSize: '14px', lineHeight: '20px', color: '#5b6475' }}>{`${__t(k?.note)}`}</span>
                </div>
              </React.Fragment>
            ))}
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'stretch' }}>
            <section
              style={{
                flex: '2 1 520px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <h2
                style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}
              >{`${__t(__v?.visitsTitle)}`}</h2>{' '}
              <div
                role="img"
                aria-label={__v?.visitsAlt}
                style={{
                  position: 'relative',
                  height: '240px',
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'flex-end',
                  borderBottom: '1px solid #e3e5ec',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '0', right: '0', top: '0', borderTop: '1px dashed #e3e5ec' }}
                />{' '}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '0', right: '0', top: '50%', borderTop: '1px dashed #e3e5ec' }}
                />{' '}
                {(__v?.visits || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      title={b?.tip}
                      style={{
                        flex: '1 1 0',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {__b(b?.label) ? (
                        <>
                          <span
                            style={{ fontSize: '12px', lineHeight: '14px', fontWeight: '700' }}
                          >{`${__t(b?.v)}`}</span>
                        </>
                      ) : null}{' '}
                      <div
                        className="bar"
                        style={{
                          width: '100%',
                          maxWidth: '36px',
                          height: `${__t(b?.h)}`,
                          background: '#4661ad',
                          borderRadius: '4px 4px 0 0',
                        }}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>{' '}
              <div
                aria-hidden="true"
                style={{ display: 'flex', gap: '6px', fontSize: '11px', lineHeight: '16px', color: '#5b6475' }}
              >
                {(__v?.visits || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <span
                      style={{ flex: '1 1 0', minWidth: '0', textAlign: 'center', whiteSpace: 'nowrap' }}
                    >{`${__t(b?.x)}`}</span>
                  </React.Fragment>
                ))}
              </div>
            </section>{' '}
            <section
              style={{
                flex: '1 1 320px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                {'From scan to reward'}
              </h2>{' '}
              {(__v?.funnel || []).map((f, __i0) => (
                <React.Fragment key={__i0}>
                  <div title={f?.tip} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontWeight: '600' }}>{`${__t(f?.label)}`}</span>
                      <span style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}>
                        {`${__t(f?.v)} `}
                        <span style={{ fontWeight: '600', color: '#5b6475' }}>{`${__t(f?.pct)}`}</span>
                      </span>
                    </div>{' '}
                    <div style={{ height: '12px', background: '#f7f7f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        className="bar"
                        style={{
                          height: '100%',
                          width: `${__t(f?.w)}`,
                          background: '#4661ad',
                          borderRadius: '0 4px 4px 0',
                        }}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </section>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'stretch' }}>
            <section
              style={{
                flex: '1 1 360px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Busiest days'}</h2>{' '}
              <div
                role="img"
                aria-label="Stamps by weekday, busiest on Saturday"
                style={{
                  height: '160px',
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'flex-end',
                  borderBottom: '1px solid #e3e5ec',
                }}
              >
                {(__v?.days || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      title={b?.tip}
                      style={{
                        flex: '1 1 0',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          lineHeight: '13px',
                          fontWeight: '700',
                          color: '#101827',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >{`${__t(b?.v)}`}</span>
                      <div
                        className="bar"
                        style={{
                          width: '100%',
                          maxWidth: '32px',
                          height: `${__t(b?.h)}`,
                          background: '#4661ad',
                          borderRadius: '4px 4px 0 0',
                        }}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>{' '}
              <div aria-hidden="true" style={{ display: 'flex', gap: '6px', fontSize: '11px', color: '#5b6475' }}>
                {(__v?.days || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <span
                      style={{ flex: '1 1 0', minWidth: '0', textAlign: 'center', whiteSpace: 'nowrap' }}
                    >{`${__t(b?.x)}`}</span>
                  </React.Fragment>
                ))}
              </div>
            </section>{' '}
            <section
              style={{
                flex: '1 1 360px',
                minWidth: '0',
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
                {'Busiest hours'}
              </h2>{' '}
              <div
                role="img"
                aria-label="Stamps by hour, peaks at 8am and 1pm"
                style={{
                  height: '160px',
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'flex-end',
                  borderBottom: '1px solid #e3e5ec',
                }}
              >
                {(__v?.hours || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      title={b?.tip}
                      style={{
                        flex: '1 1 0',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          lineHeight: '12px',
                          fontWeight: '700',
                          color: '#101827',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >{`${__t(b?.v)}`}</span>
                      <div
                        className="bar"
                        style={{
                          width: '100%',
                          maxWidth: '24px',
                          height: `${__t(b?.h)}`,
                          background: '#4661ad',
                          borderRadius: '4px 4px 0 0',
                        }}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>{' '}
              <div aria-hidden="true" style={{ display: 'flex', gap: '6px', fontSize: '12px', color: '#5b6475' }}>
                {(__v?.hours || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <span style={{ flex: '1 1 0', textAlign: 'center' }}>{`${__t(b?.x)}`}</span>
                  </React.Fragment>
                ))}
              </div>
            </section>{' '}
            <section
              style={{
                flex: '1 1 300px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Stamps by staff'}
                </h2>
                <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.rangeNote)}`}</span>
              </div>{' '}
              {(__v?.staff || []).map((s, __i0) => (
                <React.Fragment key={__i0}>
                  <div
                    title={s?.tip}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      padding: '10px 0',
                      borderBottom: '1px solid #e3e5ec',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontWeight: '600' }}>{`${__t(s?.name)}`}</span>
                      <span style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}>
                        {`${__t(s?.v)} `}
                        <span style={{ fontWeight: '600', color: '#5b6475' }}>{`${__t(s?.pct)}`}</span>
                      </span>
                    </div>{' '}
                    <div style={{ height: '8px', background: '#f7f7f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        className="bar"
                        style={{
                          height: '100%',
                          width: `${__t(s?.w)}`,
                          background: '#4661ad',
                          borderRadius: '0 4px 4px 0',
                        }}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}{' '}
              <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                {'Helps you spot stamps given without a visit.'}
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default withDCStyle(AnalyticsView, 'Analytics', __CSS);
