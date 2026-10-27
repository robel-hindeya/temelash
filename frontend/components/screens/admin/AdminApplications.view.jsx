'use client';
/* Markup for the AdminApplications screen. State and handlers live in AdminApplications.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t, A } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

export default function renderAdminApplications(__v) {
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
          <AdminSidebar active="applications" />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Applications'}</h1>
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
            <p style={{ margin: '0', color: '#5b6475' }}>
              {
                'New businesses wait here until someone checks their trade licence, TIN and location. Approving starts their free trial and sends them a welcome message.'
              }
            </p>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {(__v?.tiles || []).map((t, __i0) => (
              <React.Fragment key={__i0}>
                <div
                  style={{
                    flex: '1 1 160px',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
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
                  >{`${__t(t?.label)}`}</span>{' '}
                  <span style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '800' }}>{`${__t(t?.value)}`}</span>{' '}
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(t?.sub)}`}</span>
                </div>
              </React.Fragment>
            ))}
          </div>{' '}
          <div role="tablist" aria-label="Application status" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(__v?.tabs || []).map((c, __i0) => (
              <React.Fragment key={__i0}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={c?.pressed}
                  onClick={c?.pick}
                  style={{
                    borderRadius: '999px',
                    padding: '6px 14px',
                    minHeight: '40px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '14px',
                    background: `${__t(c?.bg)}`,
                    color: `${__t(c?.color)}`,
                    border: `1px solid ${__t(c?.border)}`,
                  }}
                >
                  {`${__t(c?.label)} `}
                  <span style={{ opacity: '0.8' }}>{`${__t(c?.n)}`}</span>
                </button>
              </React.Fragment>
            ))}
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
            <section
              aria-label="Application queue"
              style={{
                flex: '1 1 280px',
                minWidth: '0',
                maxWidth: '100%',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {__b(__v?.emptyList) ? (
                <>
                  <div
                    style={{ padding: '24px 16px', color: '#5b6475', textAlign: 'center' }}
                  >{`Nothing here. ${__t(__v?.emptyHint)}`}</div>
                </>
              ) : null}{' '}
              {(__v?.list || []).map((a, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    className="qi"
                    onClick={a?.pick}
                    aria-pressed={a?.pressed}
                    style={{
                      border: `1px solid ${__t(a?.border)}`,
                      background: `${__t(a?.bg)}`,
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      color: '#101827',
                    }}
                  >
                    <span
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: `${__t(a?.accent)}`,
                        color: '#ffffff',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'none',
                      }}
                    >{`${__t(a?.initials)}`}</span>{' '}
                    <span style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: '700' }}>{`${__t(a?.name)}`}</span>{' '}
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(a?.type)} · ${__t(a?.area)}`}</span>{' '}
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(a?.when)}`}</span>
                    </span>{' '}
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        borderRadius: '999px',
                        padding: '1px 8px',
                        background: `${__t(a?.pillBg)}`,
                        color: `${__t(a?.pillColor)}`,
                        whiteSpace: 'nowrap',
                      }}
                    >{`${__t(a?.pill)}`}</span>
                  </button>
                </React.Fragment>
              ))}
            </section>{' '}
            {__b(__v?.hasSel) ? (
              <>
                <section
                  aria-label="Review"
                  style={{
                    flex: '2 1 480px',
                    minWidth: '0',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                    <span
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '12px',
                        background: `${__t(__v?.sel?.accent)}`,
                        color: '#ffffff',
                        fontWeight: '800',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >{`${__t(__v?.sel?.initials)}`}</span>{' '}
                    <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
                      <h2 style={{ margin: '0', fontSize: '22px', lineHeight: '28px' }}>{`${__t(__v?.sel?.name)}`}</h2>{' '}
                      <span
                        style={{ color: '#5b6475' }}
                      >{`${__t(__v?.sel?.type)} · applied ${__t(__v?.sel?.when)}`}</span>
                    </div>{' '}
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        borderRadius: '999px',
                        padding: '3px 10px',
                        background: `${__t(__v?.sel?.pillBg)}`,
                        color: `${__t(__v?.sel?.pillColor)}`,
                      }}
                    >{`${__t(__v?.sel?.pillUp)}`}</span>
                  </div>{' '}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '12px 20px',
                    }}
                  >
                    {(__v?.facts || []).map((f, __i0) => (
                      <React.Fragment key={__i0}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '16px',
                              fontWeight: '700',
                              letterSpacing: '0.08em',
                              color: '#5b6475',
                            }}
                          >{`${__t(f?.k)}`}</span>
                          <span style={{ fontWeight: '600', overflowWrap: 'anywhere' }}>{`${__t(f?.v)}`}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '16px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          color: '#5b6475',
                        }}
                      >
                        {'LOCATION PIN'}
                      </span>{' '}
                      <svg
                        viewBox="0 0 320 180"
                        role="img"
                        aria-label={__v?.sel?.mapLabel}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '12px',
                          border: '1px solid #e3e5ec',
                          background: '#eef0f4',
                        }}
                      >
                        <path d="M0 60 L320 40" stroke="#ffffff" strokeWidth="10" />
                        <path d="M0 130 L320 150" stroke="#ffffff" strokeWidth="8" />
                        <path d="M90 0 L120 180" stroke="#ffffff" strokeWidth="10" />
                        <path d="M230 0 L210 180" stroke="#ffffff" strokeWidth="6" />{' '}
                        <rect x="140" y="70" width="50" height="40" rx="6" fill="#dfe8d8" />{' '}
                        <g transform={`translate(${__t(__v?.sel?.px)} ${__t(__v?.sel?.py)})`}>
                          <path
                            d="M0 0 C -10 -14 -12 -18 -12 -24 A 12 12 0 1 1 12 -24 C 12 -18 10 -14 0 0 Z"
                            fill="#e42330"
                          />
                          <circle cx="0" cy="-24" r="4.5" fill="#ffffff" />
                        </g>
                      </svg>{' '}
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.sel?.coords)}`}</span>
                    </div>{' '}
                    <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '16px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          color: '#5b6475',
                        }}
                      >
                        {'DOCUMENTS'}
                      </span>{' '}
                      {(__v?.docs || []).map((d, __i0) => (
                        <React.Fragment key={__i0}>
                          <div
                            style={{
                              border: '1px solid #e3e5ec',
                              borderRadius: '12px',
                              padding: '10px 12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4661ad"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M14 3H6v18h12V7z M14 3v4h4" />
                              </svg>{' '}
                              <span
                                style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minWidth: '0' }}
                              >
                                <span style={{ fontWeight: '700' }}>{`${__t(d?.label)}`}</span>
                                <span
                                  style={{ fontSize: '14px', color: `${__t(d?.subColor)}` }}
                                >{`${__t(d?.sub)}`}</span>
                              </span>{' '}
                              {__b(d?.has) ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={d?.toggle}
                                    aria-expanded={d?.expanded}
                                    style={{
                                      border: '1px solid #e3e5ec',
                                      background: '#ffffff',
                                      color: '#4661ad',
                                      fontWeight: '700',
                                      borderRadius: '12px',
                                      padding: '6px 12px',
                                      minHeight: '40px',
                                      cursor: 'pointer',
                                    }}
                                  >{`${__t(d?.btn)}`}</button>
                                </>
                              ) : null}
                            </div>{' '}
                            {__b(d?.open) ? (
                              <>
                                <div
                                  style={{
                                    background: '#ffffff',
                                    border: '1px solid #d9dce3',
                                    borderRadius: '10px',
                                    padding: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                    boxShadow: '0 4px 12px rgba(16,24,39,0.06)',
                                    marginTop: '8px',
                                  }}
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      borderBottom: '1px solid #e3e5ec',
                                      paddingBottom: '10px',
                                      flexWrap: 'wrap',
                                      gap: '8px',
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div
                                        style={{
                                          width: '32px',
                                          height: '32px',
                                          borderRadius: '999px',
                                          background: '#0d5c3a',
                                          color: '#fba919',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '16px',
                                          fontWeight: '900',
                                        }}
                                      >
                                        ★
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.04em', color: '#101827' }}>
                                          {'FDRE · OFFICIAL REGISTRATION DOCUMENT'}
                                        </span>
                                        <span style={{ fontSize: '11px', color: '#5b6475' }}>
                                          {d?.id === 'tin' ? 'Ministry of Revenues · የገቢዎች ሚኒስቴር' : 'Ministry of Trade & Industry · የንግድና ኢንዱስትሪ ሚኒስቴር'}
                                        </span>
                                      </div>
                                    </div>
                                    <span
                                      style={{
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        color: '#0d5c3a',
                                        background: '#e8f5e9',
                                        padding: '3px 8px',
                                        borderRadius: '6px',
                                        border: '1px solid #c8e6c9',
                                      }}
                                    >
                                      {'VERIFIED & FILED'}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                      gap: '10px',
                                      fontSize: '13px',
                                      background: '#f7f7f9',
                                      padding: '12px',
                                      borderRadius: '8px',
                                    }}
                                  >
                                    <div>
                                      <span style={{ color: '#5b6475', fontSize: '11px', display: 'block' }}>{'BUSINESS NAME'}</span>
                                      <strong>{`${__t(d?.docName)}`}</strong>
                                    </div>
                                    <div>
                                      <span style={{ color: '#5b6475', fontSize: '11px', display: 'block' }}>
                                        {d?.id === 'tin' ? 'TIN CERTIFICATE NUMBER' : 'TRADE LICENCE NUMBER'}
                                      </span>
                                      <strong style={{ color: '#4661ad', fontFamily: 'monospace', fontSize: '14px' }}>
                                        {`${__t(d?.number)}`}
                                      </strong>
                                    </div>
                                    <div>
                                      <span style={{ color: '#5b6475', fontSize: '11px', display: 'block' }}>{'REGISTRATION OFFICE'}</span>
                                      <span>{'Addis Ababa Sub-City Bureau'}</span>
                                    </div>
                                    <div>
                                      <span style={{ color: '#5b6475', fontSize: '11px', display: 'block' }}>{'STATUS'}</span>
                                      <span style={{ color: '#0d5c3a', fontWeight: '600' }}>{'Active · Verified Valid'}</span>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                                    <span style={{ fontSize: '12px', color: '#5b6475' }}>
                                      {'Certified uploaded copy · PDF / Image'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => __v?.openFullDoc(d)}
                                      style={{
                                        border: '1px solid #4661ad',
                                        background: '#f0f3fa',
                                        color: '#4661ad',
                                        fontWeight: '700',
                                        fontSize: '12px',
                                        borderRadius: '6px',
                                        padding: '6px 14px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {'Click to inspect file ↗'}
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : null}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      {'THEIR CARD'}
                    </span>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '240px',
                          maxWidth: '100%',
                          borderRadius: '12px',
                          background: `${__t(__v?.sel?.accent)}`,
                          color: '#ffffff',
                          padding: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                        }}
                      >
                        <span style={{ fontWeight: '700' }}>{`${__t(__v?.sel?.name)}`}</span>{' '}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {(__v?.sel?.dots || []).map((x, __i0) => (
                            <React.Fragment key={__i0}>
                              <span
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '999px',
                                  border: '2px solid rgba(255,255,255,0.7)',
                                  boxSizing: 'border-box',
                                }}
                              />
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        <span style={{ fontSize: '14px' }}>{`${__t(__v?.sel?.reward)}`}</span>
                      </div>{' '}
                      <span style={{ flex: '1 1 200px', color: '#5b6475', fontSize: '14px' }}>
                        {'Check the reward is a real thing they sell and the card name matches the licence.'}
                      </span>
                    </div>
                  </div>{' '}
                  {__b(__v?.isOpen) ? (
                    <>
                      <div
                        style={{
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}
                        >
                          <span style={{ fontWeight: '700' }}>{'Checks'}</span>
                          <span
                            style={{ color: '#5b6475', fontSize: '14px' }}
                          >{`${__t(__v?.checkCount)} of 4 done`}</span>
                        </div>{' '}
                        {(__v?.checks || []).map((c, __i0) => (
                          <React.Fragment key={__i0}>
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={c?.aria}
                              onClick={c?.toggle}
                              style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'flex-start',
                                border: '0',
                                background: 'transparent',
                                padding: '6px 0',
                                minHeight: '44px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: '#101827',
                              }}
                            >
                              <span
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  flex: 'none',
                                  borderRadius: '6px',
                                  border: `2px solid ${__t(c?.boxBorder)}`,
                                  background: `${__t(c?.boxBg)}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxSizing: 'border-box',
                                }}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#ffffff"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  style={{ display: `${__t(c?.tick)}` }}
                                >
                                  <path d="M5 12l5 5 9-10" />
                                </svg>
                              </span>{' '}
                              <span style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: '600' }}>{`${__t(c?.label)}`}</span>
                                <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(c?.help)}`}</span>
                              </span>
                            </button>
                          </React.Fragment>
                        ))}
                      </div>{' '}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' }}>
                        <label
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            fontWeight: '600',
                            fontSize: '14px',
                          }}
                        >
                          {'Free trial\n'}
                          <select
                            value={__v?.trial}
                            onChange={__v?.onTrial}
                            style={{
                              border: '1px solid #e3e5ec',
                              borderRadius: '12px',
                              padding: '10px 12px',
                              minHeight: '48px',
                              background: '#ffffff',
                              color: '#101827',
                            }}
                          >
                            <option value="14">{'14 days'}</option>
                            <option value="30">{'30 days'}</option>
                            <option value="7">{'7 days'}</option>
                          </select>
                        </label>{' '}
                        <label
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            fontWeight: '600',
                            fontSize: '14px',
                          }}
                        >
                          {'Plan after trial\n'}
                          <select
                            value={__v?.plan}
                            onChange={__v?.onPlan}
                            style={{
                              border: '1px solid #e3e5ec',
                              borderRadius: '12px',
                              padding: '10px 12px',
                              minHeight: '48px',
                              background: '#ffffff',
                              color: '#101827',
                            }}
                          >
                            <option value="Starter">{'Starter'}</option>
                            <option value="Growth">{'Growth'}</option>
                            <option value="Multi-branch">{'Multi-branch'}</option>
                          </select>
                        </label>
                      </div>{' '}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={__v?.approve}
                          aria-disabled={__v?.approveDisabled}
                          style={{
                            border: '0',
                            background: `${__t(__v?.approveBg)}`,
                            color: '#ffffff',
                            fontWeight: '700',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            minHeight: '48px',
                            cursor: `${__t(__v?.approveCursor)}`,
                          }}
                        >
                          {'Approve and start trial'}
                        </button>{' '}
                        <button
                          type="button"
                          onClick={__v?.openInfo}
                          aria-expanded={__v?.infoExpanded}
                          style={{
                            border: '1px solid #e3e5ec',
                            background: '#ffffff',
                            color: '#101827',
                            fontWeight: '700',
                            borderRadius: '12px',
                            padding: '12px 18px',
                            minHeight: '48px',
                            cursor: 'pointer',
                          }}
                        >
                          {'Ask for more info'}
                        </button>{' '}
                        <button
                          type="button"
                          onClick={__v?.openReject}
                          aria-expanded={__v?.rejectExpanded}
                          style={{
                            border: '0',
                            background: 'transparent',
                            color: '#c81d29',
                            fontWeight: '700',
                            borderRadius: '12px',
                            padding: '12px 10px',
                            minHeight: '48px',
                            cursor: 'pointer',
                          }}
                        >
                          {'Reject'}
                        </button>{' '}
                        {__b(__v?.showApproveHint) ? (
                          <>
                            <span role="status" style={{ color: '#c81d29', fontSize: '14px', fontWeight: '600' }}>
                              {'Tick all 4 checks before approving.'}
                            </span>
                          </>
                        ) : null}
                      </div>{' '}
                      {__b(__v?.infoOpen) ? (
                        <>
                          <div
                            style={{
                              border: '1px solid #e3e5ec',
                              borderRadius: '12px',
                              padding: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px',
                              background: '#f7f7f9',
                            }}
                          >
                            <span style={{ fontWeight: '700' }}>{`Message to ${__t(__v?.sel?.owner)}`}</span>{' '}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {(__v?.infoTemplates || []).map((tp, __i0) => (
                                <React.Fragment key={__i0}>
                                  <button
                                    type="button"
                                    onClick={tp?.use}
                                    style={{
                                      border: '1px solid #e3e5ec',
                                      background: '#ffffff',
                                      color: '#4661ad',
                                      fontWeight: '700',
                                      fontSize: '14px',
                                      borderRadius: '999px',
                                      padding: '6px 12px',
                                      minHeight: '36px',
                                      cursor: 'pointer',
                                    }}
                                  >{`${__t(tp?.label)}`}</button>
                                </React.Fragment>
                              ))}
                            </div>{' '}
                            <label htmlFor="ap-msg" style={{ fontSize: '14px', fontWeight: '600' }}>
                              {'They get this by SMS and in their dashboard'}
                            </label>{' '}
                            <textarea
                              id="ap-msg"
                              rows="4"
                              value={__v?.infoMsg}
                              style={{
                                border: '1px solid #e3e5ec',
                                borderRadius: '12px',
                                padding: '12px',
                                resize: 'vertical',
                                background: '#ffffff',
                              }}
                              onChange={__v?.onInfoMsg}
                            />{' '}
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={__v?.sendInfo}
                                style={{
                                  border: '0',
                                  background: '#101827',
                                  color: '#ffffff',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '10px 18px',
                                  minHeight: '44px',
                                  cursor: 'pointer',
                                }}
                              >
                                {'Send and mark "Info requested"'}
                              </button>
                              <button
                                type="button"
                                onClick={__v?.closePanels}
                                style={{
                                  border: '0',
                                  background: 'transparent',
                                  color: '#4661ad',
                                  fontWeight: '700',
                                  minHeight: '44px',
                                  cursor: 'pointer',
                                }}
                              >
                                {'Cancel'}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : null}{' '}
                      {__b(__v?.rejectOpen) ? (
                        <>
                          <div
                            style={{
                              border: '1px solid #c81d29',
                              borderRadius: '12px',
                              padding: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px',
                              background: '#fde8e9',
                            }}
                          >
                            <span style={{ fontWeight: '700' }}>{`Reject ${__t(__v?.sel?.name)}?`}</span>{' '}
                            <label
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                fontSize: '14px',
                                fontWeight: '600',
                              }}
                            >
                              {'Reason (shown to the owner)\n'}
                              <select
                                value={__v?.rejectReason}
                                onChange={__v?.onRejectReason}
                                style={{
                                  border: '1px solid #e3e5ec',
                                  borderRadius: '12px',
                                  padding: '10px 12px',
                                  minHeight: '48px',
                                  background: '#ffffff',
                                  color: '#101827',
                                }}
                              >
                                <option value="dup">{'Duplicate account'}</option>
                                <option value="licence">{"Licence doesn't match the business"}</option>
                                <option value="fake">{"Location or business couldn't be confirmed"}</option>
                                <option value="type">{"Business type we don't support yet"}</option>
                              </select>
                            </label>{' '}
                            <label
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                fontSize: '14px',
                                fontWeight: '600',
                              }}
                            >
                              {'Internal note (team only)\n'}
                              <input
                                value={__v?.rejectNote}
                                placeholder="Optional"
                                style={{
                                  border: '1px solid #e3e5ec',
                                  borderRadius: '12px',
                                  padding: '10px 12px',
                                  minHeight: '44px',
                                  background: '#ffffff',
                                }}
                                onChange={__v?.onRejectNote}
                              />
                            </label>{' '}
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={__v?.reject}
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
                                {'Reject application'}
                              </button>
                              <button
                                type="button"
                                onClick={__v?.closePanels}
                                style={{
                                  border: '0',
                                  background: 'transparent',
                                  color: '#4661ad',
                                  fontWeight: '700',
                                  minHeight: '44px',
                                  cursor: 'pointer',
                                }}
                              >
                                {'Keep it'}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}{' '}
                  {__b(__v?.isDone) ? (
                    <>
                      <div
                        style={{
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '12px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#f7f7f9',
                        }}
                      >
                        <span style={{ flex: '1 1 240px' }}>{`${__t(__v?.sel?.outcome)}`}</span>{' '}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {__b(__v?.isApproved) ? (
                            <>
                              <A
                                href="/admin/businesses"
                                style={{
                                  fontWeight: '700',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  minHeight: '44px',
                                }}
                              >
                                {'Open in Businesses'}
                              </A>
                            </>
                          ) : null}{' '}
                          <button
                            type="button"
                            onClick={__v?.reopen}
                            style={{
                              border: '1px solid #e3e5ec',
                              background: '#ffffff',
                              color: '#101827',
                              fontWeight: '700',
                              borderRadius: '12px',
                              padding: '8px 16px',
                              minHeight: '44px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Move back to waiting'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}{' '}
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
                      {'HISTORY'}
                    </span>{' '}
                    {(__v?.sel?.log || []).map((l, __i0) => (
                      <React.Fragment key={__i0}>
                        <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(l)}`}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </section>
              </>
            ) : null}
          </div>{' '}
          {__b(__v?.hasToast) ? (
            <>
              <div
                role="status"
                style={{
                  position: 'sticky',
                  bottom: '16px',
                  alignSelf: 'center',
                  background: '#101827',
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  maxWidth: '100%',
                }}
              >
                <span>{`${__t(__v?.toast)}`}</span>
                <button
                  type="button"
                  onClick={__v?.undo}
                  style={{
                    border: '0',
                    background: 'transparent',
                    color: '#8fa4e6',
                    fontWeight: '700',
                    minHeight: '44px',
                    cursor: 'pointer',
                  }}
                >
                  {'Undo'}
                </button>
              </div>
            </>
          ) : null}
        </main>
      </div>
      {__b(__v?.viewingDoc) ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(16,24,39,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            backdropFilter: 'blur(4px)',
          }}
          onClick={__v?.closeFullDoc}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '560px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
              border: '2px solid #e3e5ec',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '999px',
                    background: '#0d5c3a',
                    color: '#fba919',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '900',
                  }}
                >
                  ★
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>
                    {__v?.viewingDoc?.id === 'tin' ? 'Official TIN Certificate' : 'Official Trade Licence'}
                  </h3>
                  <span style={{ fontSize: '12px', color: '#5b6475' }}>
                    {'Federal Democratic Republic of Ethiopia'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={__v?.closeFullDoc}
                style={{
                  border: 0,
                  background: '#f7f7f9',
                  borderRadius: '999px',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '16px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Document Certificate Sheet Representation */}
            <div
              style={{
                border: '4px double #4661ad',
                borderRadius: '8px',
                padding: '20px',
                background: '#fffdfa',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                position: 'relative',
              }}
            >
              <div style={{ textAlign: 'center', borderBottom: '1px solid #d9dce3', paddingBottom: '12px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: '800', color: '#101827' }}>
                  {'FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA'}
                </span>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#4661ad', marginTop: '4px' }}>
                  {__v?.viewingDoc?.id === 'tin'
                    ? 'TAXPAYER IDENTIFICATION NUMBER (TIN) CERTIFICATE'
                    : 'COMMERCIAL REGISTRATION & BUSINESS LICENCE'}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', fontSize: '13px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#5b6475', display: 'block' }}>{'BUSINESS / HOLDER NAME'}</span>
                  <strong style={{ fontSize: '14px' }}>{`${__t(__v?.viewingDoc?.docName)}`}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#5b6475', display: 'block' }}>{'REGISTRATION NO.'}</span>
                  <strong style={{ fontSize: '14px', color: '#4661ad', fontFamily: 'monospace' }}>
                    {`${__t(__v?.viewingDoc?.number)}`}
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#5b6475', display: 'block' }}>{'JURISDICTION'}</span>
                  <span>{'City Government of Addis Ababa'}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#5b6475', display: 'block' }}>{'VALIDATION'}</span>
                  <span style={{ color: '#0d5c3a', fontWeight: '700' }}>{'VERIFIED & ACTIVE'}</span>
                </div>
              </div>

              {/* Red Stamp Badge */}
              <div
                style={{
                  alignSelf: 'flex-end',
                  border: '2px solid #c81d29',
                  borderRadius: '999px',
                  width: '90px',
                  height: '90px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c81d29',
                  fontWeight: '800',
                  fontSize: '9px',
                  textAlign: 'center',
                  transform: 'rotate(-12deg)',
                  opacity: 0.85,
                  padding: '4px',
                  boxSizing: 'border-box',
                }}
              >
                <span>{'★ FDRE ★'}</span>
                <span style={{ fontSize: '10px' }}>{'CERTIFIED'}</span>
                <span>{'ጸድቋል'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => {
                  alert('Document certified copy downloaded successfully.');
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  background: '#4661ad',
                  color: '#ffffff',
                  fontWeight: '700',
                  border: 0,
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Download Document
              </button>
              <button
                type="button"
                onClick={__v?.closeFullDoc}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  background: '#f7f7f9',
                  color: '#101827',
                  fontWeight: '600',
                  border: '1px solid #e3e5ec',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
