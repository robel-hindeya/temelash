'use client';
/* Markup for the QRStand screen. State and handlers live in QRStand.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default function renderQRStand(__v) {
  return (
    <>
      <div
        style={{
          position: 'relative',
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
          <Sidebar active="qr" />
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
              alignItems: 'flex-start',
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
                {'SHOP'}
              </span>{' '}
              <h1
                style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}
              >{`${__t(__v?.pageTitle)}`}</h1>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>{`${__t(__v?.pageSub)}`}</p>
            </div>{' '}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={__v?.toggleOrders}
                aria-pressed={__v?.ordersPressed}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: `1px solid ${__t(__v?.ordersBorder)}`,
                  background: '#ffffff',
                  color: '#101827',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  minHeight: '44px',
                  cursor: 'pointer',
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
                  <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" />
                </svg>
                {`${__t(__v?.ordersLabel)}`}
              </button>{' '}
              <button
                type="button"
                onClick={__v?.openCart}
                aria-label={__v?.cartAria}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
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
                  <path d="M5 7h14l-1 13H6zM9 7V5a3 3 0 0 1 6 0v2" />
                </svg>
                {'Cart'}
                {__b(__v?.hasItems) ? (
                  <>
                    <span
                      style={{
                        minWidth: '22px',
                        height: '22px',
                        borderRadius: '999px',
                        background: '#e42330',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 6px',
                        boxSizing: 'border-box',
                      }}
                    >{`${__t(__v?.cartCount)}`}</span>
                  </>
                ) : null}
              </button>
            </div>
          </div>{' '}
          {__b(__v?.isShop) ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <section
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                    <span
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '999px',
                        background: '#f7f7f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'none',
                      }}
                    >
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
                        <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4zM19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8zM5 15l.6 1.4 1.4.6-1.4.6L5 19l-.6-1.4L3 17l1.4-.6z" />
                      </svg>
                    </span>{' '}
                    <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '18px' }}>{'Not sure what you need?'}</strong>
                      <span style={{ color: '#5b6475' }}>
                        {
                          "Tell us about your space and we'll suggest the right mix of stands, stickers and table tents."
                        }
                      </span>
                    </div>{' '}
                    <button
                      type="button"
                      onClick={__v?.toggleRec}
                      aria-expanded={__v?.recExpanded}
                      style={{
                        border: '0',
                        background: '#e42330',
                        color: '#ffffff',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '12px 18px',
                        minHeight: '48px',
                        cursor: 'pointer',
                      }}
                    >{`${__t(__v?.recBtn)}`}</button>
                  </div>{' '}
                  {__b(__v?.recOpen) ? (
                    <>
                      <div
                        style={{
                          borderTop: '1px solid #e3e5ec',
                          paddingTop: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                        }}
                      >
                        {__b(__v?.recNotSent) ? (
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                  gap: '12px',
                                }}
                              >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  <label htmlFor="sh-counters" style={{ fontWeight: '700' }}>
                                    {'Counters / tills'}
                                  </label>
                                  <input
                                    id="sh-counters"
                                    type="number"
                                    min="0"
                                    defaultValue="1"
                                    style={{
                                      border: '1px solid #e3e5ec',
                                      borderRadius: '6px',
                                      padding: '10px 12px',
                                      minHeight: '44px',
                                      boxSizing: 'border-box',
                                    }}
                                  />
                                </div>{' '}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  <label htmlFor="sh-tables" style={{ fontWeight: '700' }}>
                                    {'Tables or chairs'}
                                  </label>
                                  <input
                                    id="sh-tables"
                                    type="number"
                                    min="0"
                                    defaultValue="8"
                                    style={{
                                      border: '1px solid #e3e5ec',
                                      borderRadius: '6px',
                                      padding: '10px 12px',
                                      minHeight: '44px',
                                      boxSizing: 'border-box',
                                    }}
                                  />
                                </div>{' '}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  <label htmlFor="sh-window" style={{ fontWeight: '700' }}>
                                    {'Street-facing window?'}
                                  </label>
                                  <select
                                    id="sh-window"
                                    style={{
                                      border: '1px solid #e3e5ec',
                                      borderRadius: '6px',
                                      padding: '10px 12px',
                                      minHeight: '44px',
                                      background: '#ffffff',
                                      color: '#101827',
                                    }}
                                  >
                                    <option>{'Yes'}</option>
                                    <option>{'No'}</option>
                                  </select>
                                </div>
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor="sh-notes" style={{ fontWeight: '700' }}>
                                  {'Anything else? '}
                                  <span style={{ fontWeight: '600', color: '#5b6475' }}>{'(optional)'}</span>
                                </label>
                                <textarea
                                  id="sh-notes"
                                  rows="2"
                                  placeholder="e.g. Salon with 6 chairs and a waiting area"
                                  style={{
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    resize: 'vertical',
                                  }}
                                />
                              </div>{' '}
                              <button
                                type="button"
                                onClick={__v?.sendRec}
                                style={{
                                  alignSelf: 'flex-start',
                                  border: '1px solid #e3e5ec',
                                  background: '#ffffff',
                                  color: '#4661ad',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '10px 18px',
                                  minHeight: '44px',
                                  cursor: 'pointer',
                                }}
                              >
                                {'Send my details'}
                              </button>
                            </div>
                          </>
                        ) : null}{' '}
                        {__b(__v?.recSent) ? (
                          <>
                            <div
                              role="status"
                              style={{
                                background: '#f7f7f9',
                                borderRadius: '12px',
                                padding: '14px 16px',
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
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
                              <span>
                                <strong>{'Thanks.'}</strong>
                                {" We'll call you within 24 hours with a suggestion."}
                              </span>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </section>{' '}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {'Printed for your business'}
                  </h2>
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
                    {'SAMPLE PRICES'}
                  </span>
                </div>{' '}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}
                >
                  {(__v?.products || []).map((p, __i0) => (
                    <React.Fragment key={__i0}>
                      <article
                        style={{
                          background: '#ffffff',
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div
                          role="img"
                          aria-label={p?.alt}
                          style={{
                            height: '210px',
                            background: `${__t(p?.sceneBg)}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {__b(p?.isStand) ? (
                            <>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div
                                  style={{
                                    width: '120px',
                                    background: '#101827',
                                    borderRadius: '10px',
                                    padding: '12px 10px',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: '#ffffff',
                                    boxShadow: '0 8px 24px rgba(16,24,39,0.35)',
                                  }}
                                >
                                  <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.03em' }}>
                                    {'BUNA HOUSE'}
                                  </span>{' '}
                                  <span style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif", fontSize: '9px' }}>
                                    {'ስካን ያድርጉ · Scan'}
                                  </span>{' '}
                                  <span
                                    style={{
                                      width: '64px',
                                      height: '64px',
                                      background: '#ffffff',
                                      borderRadius: '6px',
                                      padding: '5px',
                                      boxSizing: 'border-box',
                                      display: 'grid',
                                      gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                                      gap: '0',
                                    }}
                                  >
                                    <QRCodeDisplay value={__v?.joinUrl || "http://localhost:3001/join/sample-cafe"} size={58} /></span>{' '}
                                  <span
                                    style={{
                                      fontSize: '8px',
                                      color: '#fba919',
                                      fontWeight: '800',
                                      letterSpacing: '0.03em',
                                    }}
                                  >
                                    {'BUY 9, THE 10TH IS ON US'}
                                  </span>
                                </div>{' '}
                                <div
                                  style={{
                                    width: '150px',
                                    height: '26px',
                                    background: '#8a5a3a',
                                    borderRadius: '4px',
                                    marginTop: '-4px',
                                    boxShadow: '0 6px 12px rgba(16,24,39,0.25)',
                                  }}
                                />
                              </div>
                            </>
                          ) : null}{' '}
                          {__b(p?.isTent) ? (
                            <>
                              <div style={{ display: 'flex', gap: '0', transform: 'perspective(300px) rotateX(8deg)' }}>
                                <div
                                  style={{
                                    width: '104px',
                                    height: '140px',
                                    background: '#ffffff',
                                    borderRadius: '6px 0 0 6px',
                                    padding: '10px',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '6px',
                                    boxShadow: '0 8px 24px rgba(16,24,39,0.25)',
                                  }}
                                >
                                  <span style={{ fontSize: '10px', fontWeight: '800' }}>{'BUNA HOUSE'}</span>{' '}
                                  <span
                                    style={{
                                      width: '58px',
                                      height: '58px',
                                      display: 'grid',
                                      gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                                    }}
                                  >
                                    <QRCodeDisplay value={__v?.joinUrl || "http://localhost:3001/join/sample-cafe"} size={52} /></span>{' '}
                                  <span style={{ fontSize: '8px', textAlign: 'center', lineHeight: '10px' }}>
                                    {'Scan to save your stamp card'}
                                  </span>
                                </div>{' '}
                                <div
                                  style={{
                                    width: '104px',
                                    height: '140px',
                                    background: '#fff3dc',
                                    borderRadius: '0 6px 6px 0',
                                    padding: '10px',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '6px',
                                    boxShadow: '0 8px 24px rgba(16,24,39,0.25)',
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '999px',
                                      background: '#fba919',
                                    }}
                                  />{' '}
                                  <span
                                    style={{
                                      fontSize: '9px',
                                      fontWeight: '800',
                                      textAlign: 'center',
                                      lineHeight: '11px',
                                    }}
                                  >
                                    {'FREE MACCHIATO AT 10 STAMPS'}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : null}{' '}
                          {__b(p?.isSticker) ? (
                            <>
                              <div
                                style={{
                                  width: '150px',
                                  height: '150px',
                                  borderRadius: '16px',
                                  background: '#ffffff',
                                  border: '6px solid #101827',
                                  boxSizing: 'border-box',
                                  padding: '12px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: '6px',
                                  boxShadow: '0 8px 24px rgba(16,24,39,0.25)',
                                }}
                              >
                                <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.03em' }}>
                                  {'COLLECT STAMPS HERE'}
                                </span>{' '}
                                <span
                                  style={{
                                    width: '72px',
                                    height: '72px',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                                  }}
                                >
                                  <QRCodeDisplay value={__v?.joinUrl || "http://localhost:3001/join/sample-cafe"} size={66} /></span>{' '}
                                <span style={{ fontSize: '9px', fontWeight: '700' }}>{'Buna House'}</span>
                              </div>
                            </>
                          ) : null}{' '}
                          {__b(p?.isDome) ? (
                            <>
                              <div
                                style={{
                                  width: '200px',
                                  height: '110px',
                                  borderRadius: '18px',
                                  background: '#2f6b4f',
                                  padding: '12px',
                                  boxSizing: 'border-box',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  boxShadow: '0 10px 24px rgba(16,24,39,0.35), inset 0 2px 0 rgba(255,255,255,0.25)',
                                }}
                              >
                                <span
                                  style={{
                                    width: '74px',
                                    height: '86px',
                                    background: '#ffffff',
                                    borderRadius: '8px',
                                    padding: '6px',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '2px',
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '60px',
                                      height: '60px',
                                      display: 'grid',
                                      gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                                    }}
                                  >
                                    <QRCodeDisplay value={__v?.joinUrl || "http://localhost:3001/join/sample-cafe"} size={56} /></span>
                                  <span style={{ fontSize: '7px', fontWeight: '700' }}>{'Just scan'}</span>
                                </span>{' '}
                                <span
                                  style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#ffffff' }}
                                >
                                  <span style={{ fontSize: '15px', fontWeight: '800' }}>{'Buna House'}</span>
                                  <span style={{ fontSize: '9px' }}>{'Stamp card · rewards'}</span>
                                  <span style={{ fontSize: '8px', opacity: '0.8' }}>{'Temelash Card'}</span>
                                </span>
                              </div>
                            </>
                          ) : null}{' '}
                          <span
                            style={{
                              position: 'absolute',
                              left: '12px',
                              top: '12px',
                              background: 'rgba(255,255,255,0.92)',
                              borderRadius: '999px',
                              padding: '2px 10px',
                              fontSize: '12px',
                              fontWeight: '700',
                            }}
                          >{`${__t(p?.tag)}`}</span>
                        </div>{' '}
                        <div
                          style={{
                            padding: '18px 20px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            flex: '1 1 auto',
                          }}
                        >
                          <h3
                            style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '700' }}
                          >{`${__t(p?.name)}`}</h3>{' '}
                          <p style={{ margin: '0', color: '#5b6475' }}>{`${__t(p?.desc)}`}</p>{' '}
                          <button
                            type="button"
                            onClick={p?.toggleInfo}
                            aria-expanded={p?.infoExpanded}
                            style={{
                              alignSelf: 'flex-start',
                              border: '0',
                              background: 'transparent',
                              color: '#4661ad',
                              fontWeight: '700',
                              padding: '4px 0',
                              minHeight: '36px',
                              cursor: 'pointer',
                            }}
                          >{`${__t(p?.infoLabel)}`}</button>{' '}
                          {__b(p?.infoOpen) ? (
                            <>
                              <ul
                                style={{
                                  margin: '0',
                                  paddingLeft: '18px',
                                  color: '#5b6475',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '4px',
                                }}
                              >
                                {(p?.features || []).map((f, __i1) => (
                                  <React.Fragment key={__i1}>
                                    <li>{`${__t(f?.t)}`}</li>
                                  </React.Fragment>
                                ))}
                              </ul>
                            </>
                          ) : null}{' '}
                          <div style={{ flex: '1 1 auto' }} />{' '}
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '10px',
                              paddingTop: '6px',
                            }}
                          >
                            <span style={{ display: 'flex', flexDirection: 'column' }}>
                              <strong
                                style={{ fontSize: '18px', fontVariantNumeric: 'tabular-nums' }}
                              >{`${__t(p?.priceText)}`}</strong>
                              <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(p?.unit)}`}</span>
                            </span>{' '}
                            {__b(p?.notInCart) ? (
                              <>
                                <button
                                  type="button"
                                  onClick={p?.add}
                                  style={{
                                    border: '0',
                                    background: '#101827',
                                    color: '#ffffff',
                                    fontWeight: '700',
                                    borderRadius: '12px',
                                    padding: '10px 16px',
                                    minHeight: '44px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {'Add to cart'}
                                </button>
                              </>
                            ) : null}{' '}
                            {__b(p?.inCart) ? (
                              <>
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '12px',
                                  }}
                                >
                                  <button
                                    type="button"
                                    aria-label={p?.decLabel}
                                    onClick={p?.dec}
                                    style={{
                                      width: '40px',
                                      height: '44px',
                                      border: '0',
                                      background: 'transparent',
                                      cursor: 'pointer',
                                      fontSize: '18px',
                                      color: '#101827',
                                    }}
                                  >
                                    {'−'}
                                  </button>{' '}
                                  <span
                                    style={{
                                      minWidth: '28px',
                                      textAlign: 'center',
                                      fontWeight: '800',
                                      fontVariantNumeric: 'tabular-nums',
                                    }}
                                  >{`${__t(p?.qty)}`}</span>{' '}
                                  <button
                                    type="button"
                                    aria-label={p?.incLabel}
                                    onClick={p?.inc}
                                    style={{
                                      width: '40px',
                                      height: '44px',
                                      border: '0',
                                      background: 'transparent',
                                      cursor: 'pointer',
                                      fontSize: '18px',
                                      color: '#101827',
                                    }}
                                  >
                                    {'+'}
                                  </button>
                                </span>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <section
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                      {'Print it yourself, free'}
                    </h2>
                    <span style={{ color: '#5b6475' }}>
                      {'Your QR and join link, ready for any printer or your social posts.'}
                    </span>
                  </div>{' '}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <label
                      htmlFor="sh-link"
                      style={{
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        overflow: 'hidden',
                        clip: 'rect(0 0 0 0)',
                      }}
                    >
                      {'Join link'}
                    </label>{' '}
                    <input
                      id="sh-link"
                      type="text"
                      readOnly={true}
                      defaultValue="temelash.card/j/buna-house"
                      style={{
                        flex: '1 1 240px',
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        minHeight: '44px',
                        boxSizing: 'border-box',
                        background: '#f7f7f9',
                        color: '#101827',
                      }}
                    />{' '}
                    <button
                      type="button"
                      onClick={__v?.copy}
                      style={{
                        border: '1px solid #e3e5ec',
                        background: '#ffffff',
                        color: '#4661ad',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '10px 16px',
                        minHeight: '44px',
                        cursor: 'pointer',
                      }}
                    >{`${__t(__v?.copyLabel)}`}</button>{' '}
                    <button
                      type="button"
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
                      {'QR image'}
                    </button>{' '}
                    <button
                      type="button"
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
                      {'A5 print PDF'}
                    </button>
                  </div>
                </section>
              </div>
            </>
          ) : null}{' '}
          {__b(__v?.isOrders) ? (
            <>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '8px 24px',
                }}
              >
                {(__v?.orders || []).map((o, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '18px 0',
                        borderBottom: '1px solid #e3e5ec',
                      }}
                    >
                      <span style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column' }}>
                        <strong>{`Order ${__t(o?.id)} · ${__t(o?.date)}`}</strong>
                        <span style={{ color: '#5b6475', fontSize: '14px' }}>{`${__t(o?.items)}`}</span>
                      </span>{' '}
                      <span
                        style={{ fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}
                      >{`${__t(o?.total)}`}</span>{' '}
                      <span
                        style={{
                          borderRadius: '999px',
                          padding: '2px 12px',
                          fontSize: '14px',
                          fontWeight: '700',
                          background: `${__t(o?.bg)}`,
                          color: `${__t(o?.fg)}`,
                          border: `1px solid ${__t(o?.border)}`,
                        }}
                      >{`${__t(o?.status)}`}</span>{' '}
                      <div style={{ flex: '1 1 100%', display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {(o?.steps || []).map((st, __i1) => (
                          <React.Fragment key={__i1}>
                            <span style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{ height: '6px', borderRadius: '999px', background: `${__t(st?.bar)}` }} />
                              <span
                                style={{ fontSize: '12px', color: `${__t(st?.color)}`, fontWeight: '600' }}
                              >{`${__t(st?.label)}`}</span>
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}{' '}
                {__b(__v?.noOrders) ? (
                  <>
                    <p style={{ margin: '0', padding: '24px 0', color: '#5b6475' }}>{'No orders yet.'}</p>
                  </>
                ) : null}
              </section>
            </>
          ) : null}
        </main>{' '}
        {__b(__v?.cartOpen) ? (
          <>
            <button
              type="button"
              aria-label="Close cart"
              onClick={__v?.closeCart}
              style={{
                position: 'fixed',
                inset: '0',
                zIndex: '20',
                border: '0',
                background: 'rgba(16,24,39,0.45)',
                cursor: 'default',
              }}
            />{' '}
            <div
              role="dialog"
              aria-label="Cart"
              className="tm-drawer"
              style={{
                position: 'fixed',
                zIndex: '21',
                top: '0',
                right: '0',
                bottom: '0',
                maxWidth: '100%',
                width: '420px',
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  borderBottom: '1px solid #e3e5ec',
                  position: 'sticky',
                  top: '0',
                  background: '#ffffff',
                }}
              >
                <strong style={{ fontSize: '20px' }}>{`${__t(__v?.drawerTitle)}`}</strong>{' '}
                <button
                  type="button"
                  onClick={__v?.closeCart}
                  aria-label="Close cart"
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '0',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '22px',
                    color: '#5b6475',
                  }}
                >
                  {'×'}
                </button>
              </div>{' '}
              <div
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  flex: '1 1 auto',
                }}
              >
                {__b(__v?.stepCart) ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {(__v?.lines || []).map((l, __i0) => (
                        <React.Fragment key={__i0}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              paddingBottom: '14px',
                              borderBottom: '1px solid #e3e5ec',
                            }}
                          >
                            <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                              <strong>{`${__t(l?.name)}`}</strong>
                              <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(l?.each)}`}</span>
                            </span>{' '}
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '1px solid #e3e5ec',
                                borderRadius: '10px',
                              }}
                            >
                              <button
                                type="button"
                                aria-label={l?.decLabel}
                                onClick={l?.dec}
                                style={{
                                  width: '36px',
                                  height: '40px',
                                  border: '0',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  color: '#101827',
                                }}
                              >
                                {'−'}
                              </button>{' '}
                              <span
                                style={{ minWidth: '24px', textAlign: 'center', fontWeight: '800' }}
                              >{`${__t(l?.qty)}`}</span>{' '}
                              <button
                                type="button"
                                aria-label={l?.incLabel}
                                onClick={l?.inc}
                                style={{
                                  width: '36px',
                                  height: '40px',
                                  border: '0',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  color: '#101827',
                                }}
                              >
                                {'+'}
                              </button>
                            </span>{' '}
                            <span
                              style={{
                                minWidth: '84px',
                                textAlign: 'right',
                                fontWeight: '700',
                                fontVariantNumeric: 'tabular-nums',
                              }}
                            >{`${__t(l?.total)}`}</span>
                          </div>
                        </React.Fragment>
                      ))}{' '}
                      {__b(__v?.cartEmpty) ? (
                        <>
                          <p style={{ margin: '0', color: '#5b6475' }}>
                            {'Your cart is empty. Add a stand or stickers to get started.'}
                          </p>
                        </>
                      ) : null}{' '}
                      {__b(__v?.hasItems) ? (
                        <>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: '#5b6475' }}>{'Subtotal'}</span>
                              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{`${__t(__v?.subtotal)}`}</span>
                            </div>{' '}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: '#5b6475' }}>{'Delivery in Addis Ababa'}</span>
                              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{`${__t(__v?.delivery)}`}</span>
                            </div>{' '}
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '18px',
                                fontWeight: '800',
                                paddingTop: '8px',
                                borderTop: '1px solid #e3e5ec',
                              }}
                            >
                              <span>{'Total'}</span>
                              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{`${__t(__v?.total)}`}</span>
                            </div>{' '}
                            <span style={{ fontSize: '13px', color: '#5b6475' }}>
                              {'Printed with your logo, colour and QR. Ready in about 3 working days.'}
                            </span>
                          </div>{' '}
                          <button
                            type="button"
                            onClick={__v?.toCheckout}
                            style={{
                              border: '0',
                              background: '#e42330',
                              color: '#ffffff',
                              fontWeight: '700',
                              fontSize: '17px',
                              borderRadius: '12px',
                              padding: '14px',
                              minHeight: '52px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Checkout'}
                          </button>
                        </>
                      ) : null}
                    </div>
                  </>
                ) : null}{' '}
                {__b(__v?.stepCheckout) ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <button
                        type="button"
                        onClick={__v?.backToCart}
                        style={{
                          alignSelf: 'flex-start',
                          border: '0',
                          background: 'transparent',
                          color: '#4661ad',
                          fontWeight: '700',
                          padding: '4px 0',
                          minHeight: '36px',
                          cursor: 'pointer',
                        }}
                      >
                        {'← Back to cart'}
                      </button>{' '}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="co-addr" style={{ fontWeight: '700' }}>
                          {'Delivery address'}
                        </label>
                        <input
                          id="co-addr"
                          type="text"
                          value={__v?.addr}
                          placeholder="Building, street, area"
                          style={{
                            border: `1px solid ${__t(__v?.addrBorder)}`,
                            borderRadius: '6px',
                            padding: '12px 14px',
                            minHeight: '48px',
                            boxSizing: 'border-box',
                          }}
                          onChange={__v?.onAddr}
                        />
                      </div>{' '}
                      {__b(__v?.addrErr) ? (
                        <>
                          <span style={{ fontSize: '14px', color: '#c81d29', marginTop: '-8px' }}>
                            {'Add where we should deliver.'}
                          </span>
                        </>
                      ) : null}{' '}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="co-phone" style={{ fontWeight: '700' }}>
                          {'Phone for the driver'}
                        </label>
                        <input
                          id="co-phone"
                          type="tel"
                          defaultValue="+251 91 *** 0001"
                          style={{
                            border: '1px solid #e3e5ec',
                            borderRadius: '6px',
                            padding: '12px 14px',
                            minHeight: '48px',
                            boxSizing: 'border-box',
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
                          gap: '8px',
                        }}
                      >
                        <legend style={{ fontWeight: '700', padding: '0', marginBottom: '8px' }}>{'Pay with'}</legend>{' '}
                        {(__v?.payments || []).map((pm, __i0) => (
                          <React.Fragment key={__i0}>
                            <label
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                border: `1px solid ${__t(pm?.border)}`,
                                borderRadius: '12px',
                                padding: '12px 14px',
                                cursor: 'pointer',
                              }}
                            >
                              <input
                                type="radio"
                                name="pay"
                                checked={__b(pm?.checked)}
                                onChange={pm?.pick}
                                style={{ width: '18px', height: '18px' }}
                              />
                              <span style={{ flex: '1 1 auto', fontWeight: '600' }}>{`${__t(pm?.label)}`}</span>
                            </label>
                          </React.Fragment>
                        ))}{' '}
                        <span style={{ fontSize: '13px', color: '#5b6475' }}>{'[Confirm payment options]'}</span>
                      </fieldset>{' '}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '18px',
                          fontWeight: '800',
                          paddingTop: '8px',
                          borderTop: '1px solid #e3e5ec',
                        }}
                      >
                        <span>{'Total'}</span>
                        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{`${__t(__v?.total)}`}</span>
                      </div>{' '}
                      <button
                        type="button"
                        onClick={__v?.placeOrder}
                        style={{
                          border: '0',
                          background: '#e42330',
                          color: '#ffffff',
                          fontWeight: '700',
                          fontSize: '17px',
                          borderRadius: '12px',
                          padding: '14px',
                          minHeight: '52px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Place order'}
                      </button>
                    </div>
                  </>
                ) : null}{' '}
                {__b(__v?.stepDone) ? (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'center',
                        paddingTop: '24px',
                      }}
                    >
                      <span
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '999px',
                          background: '#f7f7f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="36"
                          height="36"
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
                      </span>{' '}
                      <strong style={{ fontSize: '22px' }}>{`Order ${__t(__v?.lastOrderId)} placed`}</strong>{' '}
                      <span style={{ color: '#5b6475' }}>
                        {"We'll print it with your logo and QR, then call before delivery. Follow it under Orders."}
                      </span>{' '}
                      <button
                        type="button"
                        onClick={__v?.seeOrders}
                        style={{
                          marginTop: '8px',
                          alignSelf: 'stretch',
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#4661ad',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '12px',
                          minHeight: '48px',
                          cursor: 'pointer',
                        }}
                      >
                        {'See my orders'}
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
