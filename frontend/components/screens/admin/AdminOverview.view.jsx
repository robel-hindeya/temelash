'use client';
/* Markup for the AdminOverview screen. State and handlers live in AdminOverview.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t, A } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

export default function renderAdminOverview(__v) {
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
          <AdminSidebar active="overview" />
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
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                  {'Today on Temelash'}
                </h1>
                
              </div>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>{`${__t(__v?.todayText)} · ${__t(__v?.doneText)}`}</p>
            </div>{' '}
            <A
              href="/admin/businesses"
              style={{
                border: '1px solid #e3e5ec',
                background: '#ffffff',
                color: '#4661ad',
                fontWeight: '700',
                borderRadius: '12px',
                padding: '10px 18px',
                textDecoration: 'none',
                minHeight: '44px',
                boxSizing: 'border-box',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {'Find a business'}
            </A>
          </div>{' '}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
            {(__v?.kpis || []).map((k, __i0) => (
              <React.Fragment key={__i0}>
                <A
                  href={k?.href}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    textDecoration: 'none',
                    color: '#101827',
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
                      fontSize: '28px',
                      lineHeight: '32px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(k?.value)}`}</span>{' '}
                  <span style={{ fontSize: '13px', lineHeight: '18px', color: '#5b6475' }}>{`${__t(k?.note)}`}</span>
                </A>
              </React.Fragment>
            ))}
          </div>{' '}
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
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Needs attention'}
                </h2>
                <span style={{ fontSize: '14px', color: '#5b6475' }}>
                  {'Work through this list and nothing slips. Each action takes effect straight away.'}
                </span>
              </div>{' '}
              <div role="group" aria-label="Filter" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(__v?.filters || []).map((f, __i0) => (
                  <React.Fragment key={__i0}>
                    <button
                      type="button"
                      aria-pressed={f?.pressed}
                      onClick={f?.pick}
                      style={{
                        borderRadius: '999px',
                        padding: '6px 12px',
                        minHeight: '36px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px',
                        background: `${__t(f?.bg)}`,
                        color: `${__t(f?.color)}`,
                        border: `1px solid ${__t(f?.border)}`,
                      }}
                    >
                      {`${__t(f?.label)} `}
                      <span style={{ opacity: '0.8' }}>{`${__t(f?.n)}`}</span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>{' '}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {(__v?.queue || []).map((q, __i0) => (
                <React.Fragment key={__i0}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 0',
                      borderTop: '1px solid #e3e5ec',
                      opacity: `${__t(q?.opacity)}`,
                    }}
                  >
                    <span
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#f7f7f9',
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
                        stroke={q?.iconColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={q?.icon} />
                      </svg>
                    </span>{' '}
                    <span style={{ flex: '1 1 280px', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            lineHeight: '16px',
                            fontWeight: '700',
                            letterSpacing: '0.08em',
                            color: `${__t(q?.tagColor)}`,
                          }}
                        >{`${__t(q?.tag)}`}</span>
                        <strong>{`${__t(q?.title)}`}</strong>
                      </span>{' '}
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(q?.detail)}`}</span>
                    </span>{' '}
                    {__b(q?.open) ? (
                      <>
                        <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {__b(q?.hasSecondary) ? (
                            <>
                              <A
                                href={q?.secHref}
                                onClick={q?.secAct}
                                style={{
                                  border: '1px solid #e3e5ec',
                                  background: '#ffffff',
                                  color: '#4661ad',
                                  fontWeight: '700',
                                  borderRadius: '10px',
                                  padding: '8px 14px',
                                  minHeight: '40px',
                                  boxSizing: 'border-box',
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                }}
                              >{`${__t(q?.secLabel)}`}</A>
                            </>
                          ) : null}{' '}
                          <button
                            type="button"
                            onClick={q?.primary}
                            style={{
                              border: '0',
                              background: '#101827',
                              color: '#ffffff',
                              fontWeight: '700',
                              borderRadius: '10px',
                              padding: '8px 14px',
                              minHeight: '40px',
                              cursor: 'pointer',
                            }}
                          >{`${__t(q?.primaryLabel)}`}</button>
                        </span>
                      </>
                    ) : null}{' '}
                    {__b(q?.done) ? (
                      <>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '700',
                            color: '#4661ad',
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4661ad"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                          {`${__t(q?.result)} `}
                          <button
                            type="button"
                            onClick={q?.undo}
                            style={{
                              border: '0',
                              background: 'transparent',
                              color: '#5b6475',
                              fontWeight: '700',
                              padding: '4px',
                              minHeight: '36px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Undo'}
                          </button>
                        </span>
                      </>
                    ) : null}
                  </div>
                </React.Fragment>
              ))}{' '}
              {__b(__v?.queueEmpty) ? (
                <>
                  <p style={{ margin: '0', padding: '16px 0', color: '#5b6475', borderTop: '1px solid #e3e5ec' }}>
                    {'Nothing here. Nice work.'}
                  </p>
                </>
              ) : null}
            </div>
          </section>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'stretch' }}>
            <section
              style={{
                flex: '1 1 380px',
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
                {'New businesses per week'}
              </h2>{' '}
              <div
                role="img"
                aria-label="New businesses per week over the last 8 weeks"
                style={{
                  height: '180px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-end',
                  borderBottom: '1px solid #e3e5ec',
                }}
              >
                {(__v?.weekBars || []).map((b, __i0) => (
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
                        style={{ fontSize: '12px', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}
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
              <div aria-hidden="true" style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#5b6475' }}>
                {(__v?.weekBars || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <span style={{ flex: '1 1 0', textAlign: 'center' }}>{`${__t(b?.x)}`}</span>
                  </React.Fragment>
                ))}
              </div>
            </section>{' '}
            <section
              style={{
                flex: '1 1 380px',
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
                {'Stamps across all businesses · 7 days'}
              </h2>{' '}
              <div
                role="img"
                aria-label="Stamps per day across all businesses over the last 7 days"
                style={{
                  height: '180px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-end',
                  borderBottom: '1px solid #e3e5ec',
                }}
              >
                {(__v?.dayBars || []).map((b, __i0) => (
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
                        style={{ fontSize: '12px', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}
                      >{`${__t(b?.v)}`}</span>
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
              <div aria-hidden="true" style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#5b6475' }}>
                {(__v?.dayBars || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <span style={{ flex: '1 1 0', textAlign: 'center' }}>{`${__t(b?.x)}`}</span>
                  </React.Fragment>
                ))}
              </div>
            </section>
          </div>{' '}
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
            <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Service status'}</h2>{' '}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {(__v?.services || []).map((v, __i0) => (
                <React.Fragment key={__i0}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#f7f7f9',
                      borderRadius: '12px',
                      padding: '12px 14px',
                    }}
                  >
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '999px',
                        background: `${__t(v?.dot)}`,
                        flex: 'none',
                      }}
                    />{' '}
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '15px' }}>{`${__t(v?.name)}`}</strong>
                      <span style={{ fontSize: '13px', color: `${__t(v?.color)}` }}>{`${__t(v?.state)}`}</span>
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
