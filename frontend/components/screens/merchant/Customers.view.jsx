'use client';
/* Markup for the Customers screen. State and handlers live in Customers.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t, A } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';

export default function renderCustomers(__v) {
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
          <Sidebar active="customers" />
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
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Customers'}</h1>
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
              <p style={{ margin: '0', color: '#5b6475' }}>{`${__t(__v?.custSubtitle)}`}</p>
            </div>{' '}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={__v?.enrollTestCustomer}
                style={{
                  background: '#101827',
                  color: '#ffffff',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  border: '0',
                  minHeight: '44px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {'+ Enroll Customer'}
              </button>
              <A
                href="/business/offers"
                style={{
                  background: '#e42330',
                  color: '#ffffff',
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
                {'Message a group'}
              </A>
            </div>
          </div>{' '}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
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
                {'APPLE WALLET'}
              </span>
              <span
                style={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
              >
                {`${__t(__v?.appleCount)}`}
              </span>
            </div>{' '}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
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
                {'GOOGLE WALLET'}
              </span>
              <span
                style={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
              >
                {`${__t(__v?.googleCount)}`}
              </span>
            </div>{' '}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
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
                {'WEB CARD'}
              </span>
              <span
                style={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
              >
                {`${__t(__v?.webCount)}`}
              </span>
            </div>{' '}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
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
                {'SHARED AN EMAIL'}
              </span>
              <span
                style={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
              >
                {`${__t(__v?.emailCount)} `}
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#5b6475' }}>{`· ${__t(__v?.emailPct)}`}</span>
              </span>
              <A href="/business/card-design" style={{ fontSize: '14px', fontWeight: '700' }}>
                {'Change what we ask at sign-up'}
              </A>
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 260px', position: 'relative', maxWidth: '360px' }}>
              <label
                htmlFor="cu-search"
                style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
              >
                {'Search customers'}
              </label>{' '}
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
                id="cu-search"
                type="search"
                value={__v?.searchQuery || ''}
                onChange={__v?.onSearch}
                placeholder="Name, phone or email"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '12px 14px 12px 40px',
                  minHeight: '48px',
                  background: '#ffffff',
                }}
              />
            </div>{' '}
            <div role="group" aria-label="Filter" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(__v?.filters || []).map((f, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    aria-pressed={f?.pressed}
                    onClick={f?.pick}
                    style={{
                      borderRadius: '999px',
                      padding: '8px 14px',
                      minHeight: '40px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      background: `${__t(f?.bg)}`,
                      color: `${__t(f?.color)}`,
                      border: `1px solid ${__t(f?.border)}`,
                    }}
                  >
                    {`${__t(f?.label)} `}
                    <span style={{ fontWeight: '600', opacity: '0.8' }}>{`${__t(f?.n)}`}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <section
              aria-label="Customer list"
              style={{
                flex: '3 1 560px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                overflowX: 'auto',
              }}
            >
              <table className="tm-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
                <thead>
                  <tr
                    style={{
                      textAlign: 'left',
                      fontSize: '12px',
                      lineHeight: '16px',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    <th scope="col" style={{ padding: '14px 16px', fontWeight: '700' }}>
                      {'CUSTOMER'}
                    </th>
                    <th scope="col" style={{ padding: '14px 12px', fontWeight: '700' }}>
                      {'CARD IN'}
                    </th>
                    <th scope="col" style={{ padding: '14px 12px', fontWeight: '700' }}>
                      {'STAMPS'}
                    </th>
                    <th
                      scope="col"
                      className="tm-hide-sm"
                      style={{ padding: '14px 12px', fontWeight: '700', textAlign: 'right' }}
                    >
                      {'VISITS'}
                    </th>
                    <th scope="col" className="tm-hide-sm" style={{ padding: '14px 12px', fontWeight: '700' }}>
                      {'LAST VISIT'}
                    </th>
                    <th scope="col" style={{ padding: '14px 16px', fontWeight: '700' }}>
                      {'STATUS'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(__v?.rows || []).map((r, __i0) => (
                    <React.Fragment key={__i0}>
                      <tr className="row" style={{ borderTop: '1px solid #e3e5ec', background: `${__t(r?.rowBg)}` }}>
                        <td style={{ padding: '12px 16px' }}>
                          <button
                            type="button"
                            onClick={r?.pick}
                            style={{
                              border: '0',
                              background: 'transparent',
                              padding: '0',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              color: '#101827',
                              textAlign: 'left',
                            }}
                          >
                            <span
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '999px',
                                background: '#f7f7f9',
                                border: '1px solid #e3e5ec',
                                fontWeight: '700',
                                fontSize: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 'none',
                              }}
                            >{`${__t(r?.ini)}`}</span>{' '}
                            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '20px' }}>
                              <strong>{`${__t(r?.name)}`}</strong>
                              <span
                                style={{ fontSize: '14px', color: '#5b6475', fontVariantNumeric: 'tabular-nums' }}
                              >{`${__t(r?.phone)}`}</span>
                              <span
                                style={{ fontSize: '14px', color: `${__t(r?.emailColor)}` }}
                              >{`${__t(r?.email)}`}</span>
                            </span>
                          </button>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '14px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
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
                              <path d={r?.walletIcon} />
                            </svg>
                            {`${__t(r?.wallet)}`}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              style={{
                                width: '72px',
                                height: '8px',
                                background: '#e3e5ec',
                                borderRadius: '999px',
                                overflow: 'hidden',
                              }}
                            >
                              <div
                                style={{
                                  height: '100%',
                                  width: `${__t(r?.pct)}`,
                                  background: '#fba919',
                                  borderRadius: '999px',
                                }}
                              />
                            </div>
                            <span
                              style={{ fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}
                            >{`${__t(r?.stamps)}`}</span>
                          </div>
                        </td>
                        <td
                          className="tm-hide-sm"
                          style={{ padding: '12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
                        >{`${__t(r?.visits)}`}</td>
                        <td
                          className="tm-hide-sm"
                          style={{ padding: '12px', color: '#5b6475' }}
                        >{`${__t(r?.last)}`}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              borderRadius: '999px',
                              padding: '2px 10px',
                              fontSize: '14px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
                              background: `${__t(r?.sBg)}`,
                              color: `${__t(r?.sFg)}`,
                              border: `1px solid ${__t(r?.sBorder)}`,
                            }}
                          >{`${__t(r?.status)}`}</span>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>{' '}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderTop: '1px solid #e3e5ec',
                  fontSize: '14px',
                  color: '#5b6475',
                }}
              >
                <span>{`Showing ${__t(__v?.shown)}`}</span>
                <span style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      minHeight: '36px',
                      cursor: 'pointer',
                      color: '#101827',
                    }}
                  >
                    {'Previous'}
                  </button>
                  <button
                    type="button"
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      minHeight: '36px',
                      cursor: 'pointer',
                      color: '#101827',
                    }}
                  >
                    {'Next'}
                  </button>
                </span>
              </div>
            </section>{' '}
            <aside
              aria-label="Customer details"
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
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '999px',
                    background: '#101827',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none',
                  }}
                >{`${__t(__v?.sel?.ini)}`}</span>{' '}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}
                  >{`${__t(__v?.sel?.name)}`}</span>
                  <span style={{ color: '#5b6475' }}>{`Joined ${__t(__v?.sel?.joined)}`}</span>
                </div>
              </div>{' '}
              <dl
                style={{
                  margin: '0',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '8px 16px',
                  fontSize: '15px',
                }}
              >
                <dt style={{ color: '#5b6475' }}>{'Phone'}</dt>
                <dd style={{ margin: '0', fontVariantNumeric: 'tabular-nums' }}>{`${__t(__v?.sel?.phone)}`}</dd>{' '}
                <dt style={{ color: '#5b6475' }}>{'Email'}</dt>
                <dd
                  style={{ margin: '0', color: `${__t(__v?.sel?.emailColor)}` }}
                >{`${__t(__v?.sel?.emailShown)}`}</dd>{' '}
                <dt style={{ color: '#5b6475' }}>{'Card in'}</dt>
                <dd style={{ margin: '0', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                    <path d={__v?.sel?.walletIcon} />
                  </svg>
                  {`${__t(__v?.sel?.walletLong)}`}
                </dd>
              </dl>{' '}
              {__b(__v?.noEmail) ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      background: '#f7f7f9',
                      borderRadius: '12px',
                      padding: '12px 14px',
                    }}
                  >
                    <label
                      htmlFor="cu-add-email"
                      style={{ fontWeight: '700', fontSize: '14px' }}
                    >{`Add ${__t(__v?.sel?.first)}'s email`}</label>{' '}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        id="cu-add-email"
                        type="email"
                        placeholder="name@example.com"
                        value={__v?.newEmail}
                        style={{
                          flex: '1 1 auto',
                          minWidth: '0',
                          border: '1px solid #e3e5ec',
                          borderRadius: '6px',
                          padding: '10px 12px',
                          minHeight: '44px',
                          boxSizing: 'border-box',
                          background: '#ffffff',
                        }}
                        onChange={__v?.onNewEmail}
                      />{' '}
                      <button
                        type="button"
                        onClick={__v?.saveEmail}
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#4661ad',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '0 14px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Save'}
                      </button>
                    </div>{' '}
                    <span style={{ fontSize: '13px', color: '#5b6475' }}>
                      {'Only with their permission. Or ask for it at sign-up in Card design.'}
                    </span>
                  </div>
                </>
              ) : null}{' '}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
                <div
                  style={{
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
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
                    {'STAMPS'}
                  </span>
                  <span
                    style={{
                      fontSize: '28px',
                      lineHeight: '28px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(__v?.sel?.stamps)}`}</span>
                </div>{' '}
                <div
                  style={{
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
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
                    {'VISITS'}
                  </span>
                  <span
                    style={{
                      fontSize: '28px',
                      lineHeight: '28px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(__v?.sel?.visits)}`}</span>
                </div>{' '}
                <div
                  style={{
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
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
                    {'REWARDS'}
                  </span>
                  <span
                    style={{
                      fontSize: '28px',
                      lineHeight: '28px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(__v?.sel?.rewards)}`}</span>
                </div>
              </div>{' '}
              {__b(__v?.justSent) ? (
                <>
                  <div
                    role="status"
                    style={{
                      background: '#f7f7f9',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      fontWeight: '700',
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
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
                    {`${__t(__v?.sentNote)}`}
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.notComposing) ? (
                <>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={__v?.addStamp}
                      style={{
                        flex: '1 1 140px',
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
                      {'Add a stamp'}
                    </button>{' '}
                    <button
                      type="button"
                      onClick={__v?.openCompose}
                      style={{
                        flex: '1 1 140px',
                        border: '1px solid #e3e5ec',
                        background: '#ffffff',
                        color: '#4661ad',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        minHeight: '44px',
                        cursor: 'pointer',
                      }}
                    >{`Send ${__t(__v?.sel?.first)} a message`}</button>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.composing) ? (
                <>
                  <div
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '700' }}>
                        {'To '}
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f7f7f9',
                            border: '1px solid #e3e5ec',
                            borderRadius: '999px',
                            padding: '2px 10px 2px 4px',
                            marginLeft: '4px',
                          }}
                        >
                          <span
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '999px',
                              background: '#101827',
                              color: '#ffffff',
                              fontSize: '11px',
                              fontWeight: '800',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >{`${__t(__v?.sel?.ini)}`}</span>
                          {`${__t(__v?.sel?.name)}`}
                        </span>
                      </span>{' '}
                      <button
                        type="button"
                        aria-label="Close message"
                        onClick={__v?.closeCompose}
                        style={{
                          border: '0',
                          background: 'transparent',
                          width: '44px',
                          height: '44px',
                          cursor: 'pointer',
                          color: '#5b6475',
                          fontSize: '20px',
                        }}
                      >
                        {'×'}
                      </button>
                    </div>{' '}
                    <div
                      role="group"
                      aria-label="Message type"
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
                    >
                      {(__v?.tpls || []).map((t, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            aria-pressed={t?.pressed}
                            onClick={t?.pick}
                            style={{
                              borderRadius: '999px',
                              padding: '6px 12px',
                              minHeight: '36px',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '14px',
                              background: `${__t(t?.bg)}`,
                              color: `${__t(t?.color)}`,
                              border: `1px solid ${__t(t?.border)}`,
                            }}
                          >{`${__t(t?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.suggestion)}`}</span>{' '}
                    <div
                      role="group"
                      aria-label="Send as"
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}
                    >
                      <span style={{ fontWeight: '700', fontSize: '14px', marginRight: '4px' }}>{'Send as'}</span>{' '}
                      {(__v?.channels || []).map((c, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            aria-pressed={c?.pressed}
                            disabled={__b(c?.disabled)}
                            onClick={c?.pick}
                            style={{
                              borderRadius: '999px',
                              padding: '6px 12px',
                              minHeight: '36px',
                              cursor: `${__t(c?.cursor)}`,
                              fontWeight: '700',
                              fontSize: '14px',
                              background: `${__t(c?.bg)}`,
                              color: `${__t(c?.color)}`,
                              border: `1px solid ${__t(c?.border)}`,
                            }}
                          >{`${__t(c?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    <label htmlFor="cu-en" style={{ fontWeight: '700', fontSize: '14px' }}>
                      {'English'}
                    </label>{' '}
                    <textarea
                      id="cu-en"
                      rows="3"
                      value={__v?.en}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        resize: 'vertical',
                        color: '#101827',
                      }}
                      onChange={__v?.onEn}
                    />{' '}
                    <label htmlFor="cu-am" style={{ fontWeight: '700', fontSize: '14px' }}>
                      {'Amharic'}
                    </label>{' '}
                    <textarea
                      id="cu-am"
                      rows="2"
                      value={__v?.am}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        resize: 'vertical',
                        color: '#101827',
                        fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                        lineHeight: '27px',
                      }}
                      onChange={__v?.onAm}
                    />{' '}
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >{`PREVIEW · ${__t(__v?.previewLabel)}`}</span>{' '}
                    <div
                      role="tablist"
                      aria-label="Preview on"
                      style={{
                        display: 'flex',
                        border: '1px solid #e3e5ec',
                        borderRadius: '10px',
                        padding: '3px',
                        gap: '3px',
                      }}
                    >
                      {(__v?.pvTabs || []).map((t, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={t?.sel}
                            onClick={t?.pick}
                            style={{
                              flex: '1 1 0',
                              border: '0',
                              borderRadius: '7px',
                              padding: '6px',
                              minHeight: '36px',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '13px',
                              background: `${__t(t?.bg)}`,
                              color: `${__t(t?.color)}`,
                            }}
                          >{`${__t(t?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    {__b(__v?.pvApple) ? (
                      <>
                        <div
                          style={{
                            background: '#101827',
                            borderRadius: '18px',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                          }}
                        >
                          <div
                            style={{
                              background: 'rgba(255,255,255,0.94)',
                              borderRadius: '14px',
                              padding: '10px 12px',
                              display: 'flex',
                              gap: '10px',
                              alignItems: 'flex-start',
                            }}
                          >
                            <span
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
                                background: '#8a4b2a',
                                color: '#ffffff',
                                fontWeight: '800',
                                fontSize: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 'none',
                              }}
                            >
                              {'B'}
                            </span>{' '}
                            <span
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '14px',
                                lineHeight: '19px',
                                minWidth: '0',
                              }}
                            >
                              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{'Buna House'}</strong>
                                <span style={{ color: '#5b6475', fontSize: '12px' }}>{'now'}</span>
                              </span>
                              <span style={{ whiteSpace: 'pre-wrap' }}>{`${__t(__v?.en)}`}</span>
                              <span
                                style={{
                                  whiteSpace: 'pre-wrap',
                                  color: '#5b6475',
                                  fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                                }}
                              >{`${__t(__v?.am)}`}</span>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}{' '}
                    {__b(__v?.pvGoogle) ? (
                      <>
                        <div style={{ background: '#1b2436', borderRadius: '18px', padding: '12px' }}>
                          <div
                            style={{
                              background: '#ffffff',
                              borderRadius: '12px',
                              padding: '10px 12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              fontSize: '14px',
                              lineHeight: '19px',
                            }}
                          >
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                color: '#5b6475',
                              }}
                            >
                              <span
                                style={{ width: '14px', height: '14px', borderRadius: '999px', background: '#8a4b2a' }}
                              />
                              {'Google Wallet · Buna House · now'}
                            </span>{' '}
                            <span style={{ whiteSpace: 'pre-wrap' }}>{`${__t(__v?.en)}`}</span>
                            <span
                              style={{
                                whiteSpace: 'pre-wrap',
                                color: '#5b6475',
                                fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                              }}
                            >{`${__t(__v?.am)}`}</span>
                          </div>
                        </div>
                      </>
                    ) : null}{' '}
                    {__b(__v?.pvEmail) ? (
                      <>
                        <div
                          style={{
                            border: '1px solid #e3e5ec',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            fontSize: '14px',
                            lineHeight: '20px',
                          }}
                        >
                          <div
                            style={{
                              padding: '10px 12px',
                              borderBottom: '1px solid #e3e5ec',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <span>
                              <strong>{'Buna House'}</strong>{' '}
                              <span style={{ color: '#5b6475' }}>{'via Temelash Card'}</span>
                            </span>
                            <span style={{ color: '#5b6475' }}>{`To: ${__t(__v?.sel?.email)}`}</span>
                            <strong>{`${__t(__v?.subject)}`}</strong>
                          </div>{' '}
                          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ whiteSpace: 'pre-wrap' }}>{`${__t(__v?.en)}`}</span>
                            <span
                              style={{
                                whiteSpace: 'pre-wrap',
                                color: '#5b6475',
                                fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                              }}
                            >{`${__t(__v?.am)}`}</span>
                            <span
                              style={{
                                alignSelf: 'flex-start',
                                background: '#101827',
                                color: '#ffffff',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '8px 12px',
                              }}
                            >
                              {'Open my card'}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}{' '}
                    {__b(__v?.pvWeb) ? (
                      <>
                        <div
                          style={{
                            background: '#e9ebf0',
                            borderRadius: '16px',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                          }}
                        >
                          <div
                            style={{
                              background: '#ffffff',
                              borderRadius: '8px',
                              padding: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                              boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                            }}
                          >
                            <span
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '12px',
                                color: '#5b6475',
                              }}
                            >
                              <span>{'Buna House · web card'}</span>
                              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{`${__t(__v?.sel?.stamps)}`}</span>
                            </span>{' '}
                            <span
                              style={{
                                background: '#fff3dc',
                                borderRadius: '8px',
                                padding: '8px 10px',
                                fontSize: '14px',
                                lineHeight: '19px',
                                fontWeight: '600',
                                whiteSpace: 'pre-wrap',
                              }}
                            >{`${__t(__v?.en)}`}</span>{' '}
                            <span
                              style={{
                                fontSize: '13px',
                                color: '#5b6475',
                                whiteSpace: 'pre-wrap',
                                fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                              }}
                            >{`${__t(__v?.am)}`}</span>
                          </div>{' '}
                          <span
                            style={{ fontSize: '12px', color: '#5b6475', textAlign: 'center' }}
                          >{`No lock-screen alert on web cards. ${__t(__v?.sel?.first)} sees this next time they open the card${__t(__v?.webHint)}`}</span>
                        </div>
                      </>
                    ) : null}{' '}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={__v?.closeCompose}
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#101827',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 16px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Cancel'}
                      </button>{' '}
                      <button
                        type="button"
                        onClick={__v?.send}
                        style={{
                          border: '0',
                          background: '#4661ad',
                          color: '#ffffff',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 16px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >{`Send to ${__t(__v?.sel?.first)}`}</button>
                    </div>
                  </div>
                </>
              ) : null}{' '}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                {(__v?.history || []).map((h, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '10px 0',
                        borderBottom: '1px solid #e3e5ec',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '999px',
                          background: `${__t(h?.dot)}`,
                          flex: 'none',
                        }}
                      />{' '}
                      <span style={{ flex: '1 1 auto' }}>{`${__t(h?.what)}`}</span>{' '}
                      <span
                        style={{ fontSize: '14px', color: '#5b6475', whiteSpace: 'nowrap' }}
                      >{`${__t(h?.when)}`}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
