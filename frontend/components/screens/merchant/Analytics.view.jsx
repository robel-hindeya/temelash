'use client';
/* Markup for the Analytics screen. State and handlers live in Analytics.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';

export default function renderAnalytics(__v) {
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
                    color: '#0d7d4d',
                    background: '#e6f7ef',
                    border: '1px solid #a3e6cb',
                    borderRadius: '999px',
                    padding: '2px 10px',
                  }}
                >
                  {'LIVE DATABASE'}
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
                value={__v?.selectedBranch || ''}
                onChange={__v?.onBranchChange}
                style={{
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  minHeight: '48px',
                  background: '#ffffff',
                  color: '#101827',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                <option value="">{'All branches'}</option>
                {(__v?.branches || []).map((b, idx) => (
                  <option key={idx} value={b.branchId || b.nameEn}>
                    {b.nameEn ? `${b.nameEn} branch` : b.name}
                  </option>
                ))}
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
}
