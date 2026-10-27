'use client';
/* Markup for the CustomerFlow screen. State and handlers live in CustomerFlow.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t, A } from '@/lib/dc-runtime';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default function renderCustomerFlow(__v) {
  return (
    <>
      <div
        style={{
          width: '390px',
          height: '844px',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          fontSize: '16px',
          lineHeight: '24px',
          background: '#e9ebf0',
        }}
      >
        {__b(__v?.is?.landing) ? (
          <>
            <div
              style={{
                height: '100%',
                overflowY: 'auto',
                background: '#8a4b2a',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                <div
                  role="group"
                  aria-label="Language"
                  style={{
                    display: 'flex',
                    background: 'rgba(255,255,255,0.14)',
                    borderRadius: '999px',
                    padding: '3px',
                  }}
                >
                  <button
                    type="button"
                    aria-pressed={__v?.enPressed}
                    onClick={__v?.setEn}
                    style={{
                      border: '0',
                      borderRadius: '999px',
                      padding: '6px 12px',
                      minHeight: '36px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      background: `${__t(__v?.enBg)}`,
                      color: `${__t(__v?.enFg)}`,
                    }}
                  >
                    {'EN'}
                  </button>{' '}
                  <button
                    type="button"
                    aria-pressed={__v?.amPressed}
                    onClick={__v?.setAm}
                    style={{
                      border: '0',
                      borderRadius: '999px',
                      padding: '6px 12px',
                      minHeight: '36px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      background: `${__t(__v?.amBg)}`,
                      color: `${__t(__v?.amFg)}`,
                    }}
                  >
                    {'አማ'}
                  </button>
                </div>
              </div>{' '}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 24px 24px',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '999px',
                    background: '#ffffff',
                    color: '#8a4b2a',
                    fontWeight: '800',
                    fontSize: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 4px rgba(255,255,255,0.25)',
                    marginBottom: '8px',
                  }}
                >
                  {'B'}
                </span>{' '}
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontVariant: 'small-caps',
                    fontSize: '32px',
                    lineHeight: '38px',
                    fontWeight: '700',
                  }}
                >
                  {'Buna House'}
                </span>{' '}
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontVariant: 'small-caps',
                    fontSize: '17px',
                    opacity: '0.9',
                  }}
                >{`${__t(__v?.t?.tagline)}`}</span>
              </div>{' '}
              <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#1b2436', color: '#ffffff', borderRadius: '14px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={__v?.toggleJoin}
                    aria-expanded={__v?.joinExpanded}
                    aria-controls="cf-join"
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      border: '0',
                      background: 'transparent',
                      color: '#ffffff',
                      padding: '14px',
                      minHeight: '72px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.08)',
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
                        stroke="#fba919"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                      </svg>
                    </span>{' '}
                    <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontVariant: 'small-caps',
                          fontWeight: '700',
                          fontSize: '18px',
                        }}
                      >{`${__t(__v?.t?.getCard)}`}</span>
                      <span style={{ fontSize: '13px', opacity: '0.8' }}>{`${__t(__v?.t?.getCardSub)}`}</span>
                    </span>{' '}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ opacity: '0.6' }}
                    >
                      <path d={__v?.joinChevron} />
                    </svg>
                  </button>{' '}
                  {__b(__v?.joinOpen) ? (
                    <>
                      <div
                        id="cf-join"
                        style={{
                          borderTop: '1px solid #2c3650',
                          padding: '20px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                        }}
                      >
                        {__b(__v?.notJoined) ? (
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: '4px',
                                  textAlign: 'center',
                                }}
                              >
                                <span
                                  style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '999px',
                                    background: '#fba919',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '4px',
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
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
                                <strong style={{ fontSize: '20px', lineHeight: '26px' }}>{'Buna House'}</strong>{' '}
                                <span style={{ color: '#9aa3b5' }}>{`${__t(__v?.t?.collect)}`}</span>
                              </div>{' '}
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                  gap: '10px',
                                }}
                              >
                                {(__v?.tiles || []).map((tl, __i0) => (
                                  <React.Fragment key={__i0}>
                                    <div
                                      style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        borderRadius: '12px',
                                        padding: '14px 8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px',
                                        textAlign: 'center',
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: '36px',
                                          height: '36px',
                                          borderRadius: '999px',
                                          background: '#fba919',
                                          color: '#101827',
                                          fontWeight: '800',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontVariantNumeric: 'tabular-nums',
                                        }}
                                      >{`${__t(tl?.at)}`}</span>
                                      <strong
                                        style={{ fontSize: '14px', lineHeight: '18px' }}
                                      >{`${__t(tl?.name)}`}</strong>
                                    </div>
                                  </React.Fragment>
                                ))}
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label
                                  htmlFor="cfl-name"
                                  style={{
                                    position: 'absolute',
                                    width: '1px',
                                    height: '1px',
                                    overflow: 'hidden',
                                    clip: 'rect(0 0 0 0)',
                                  }}
                                >{`${__t(__v?.t?.name)}`}</label>{' '}
                                <input
                                  id="cfl-name"
                                  type="text"
                                  autoComplete="given-name"
                                  value={__v?.f?.name}
                                  placeholder={__v?.t?.namePh}
                                  style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: `1px solid ${__t(__v?.errD?.name)}`,
                                    borderRadius: '10px',
                                    padding: '14px',
                                    minHeight: '52px',
                                    boxSizing: 'border-box',
                                    color: '#ffffff',
                                  }}
                                  onChange={__v?.onName}
                                />{' '}
                                {__b(__v?.err?.name) ? (
                                  <>
                                    <span
                                      style={{ fontSize: '14px', color: '#ff5a63' }}
                                    >{`${__t(__v?.t?.nameErr)}`}</span>
                                  </>
                                ) : null}
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label
                                  htmlFor="cfl-phone"
                                  style={{
                                    position: 'absolute',
                                    width: '1px',
                                    height: '1px',
                                    overflow: 'hidden',
                                    clip: 'rect(0 0 0 0)',
                                  }}
                                >{`${__t(__v?.t?.phone)}`}</label>{' '}
                                <input
                                  id="cfl-phone"
                                  type="tel"
                                  autoComplete="tel"
                                  value={__v?.f?.phone}
                                  placeholder={__v?.t?.phone}
                                  style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: `1px solid ${__t(__v?.errD?.phone)}`,
                                    borderRadius: '10px',
                                    padding: '14px',
                                    minHeight: '52px',
                                    boxSizing: 'border-box',
                                    color: '#ffffff',
                                  }}
                                  onChange={__v?.onPhone}
                                />{' '}
                                {__b(__v?.err?.phone) ? (
                                  <>
                                    <span
                                      style={{ fontSize: '14px', color: '#ff5a63' }}
                                    >{`${__t(__v?.t?.phoneErr)}`}</span>
                                  </>
                                ) : null}
                              </div>{' '}
                              {__b(__v?.showEmail) ? (
                                <>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label
                                      htmlFor="cfl-email"
                                      style={{
                                        position: 'absolute',
                                        width: '1px',
                                        height: '1px',
                                        overflow: 'hidden',
                                        clip: 'rect(0 0 0 0)',
                                      }}
                                    >{`${__t(__v?.t?.email)}`}</label>{' '}
                                    <input
                                      id="cfl-email"
                                      type="email"
                                      autoComplete="email"
                                      value={__v?.f?.email}
                                      placeholder={__v?.t?.emailPh}
                                      style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: `1px solid ${__t(__v?.errD?.email)}`,
                                        borderRadius: '10px',
                                        padding: '14px',
                                        minHeight: '52px',
                                        boxSizing: 'border-box',
                                        color: '#ffffff',
                                      }}
                                      onChange={__v?.onEmail}
                                    />{' '}
                                    {__b(__v?.err?.email) ? (
                                      <>
                                        <span
                                          style={{ fontSize: '14px', color: '#ff5a63' }}
                                        >{`${__t(__v?.emailErrText)}`}</span>
                                      </>
                                    ) : null}
                                  </div>
                                </>
                              ) : null}{' '}
                              {__b(__v?.showBday) ? (
                                <>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label
                                      htmlFor="cfl-bday"
                                      style={{
                                        position: 'absolute',
                                        width: '1px',
                                        height: '1px',
                                        overflow: 'hidden',
                                        clip: 'rect(0 0 0 0)',
                                      }}
                                    >{`${__t(__v?.t?.bday)}`}</label>{' '}
                                    <input
                                      id="cfl-bday"
                                      type="text"
                                      value={__v?.f?.bday}
                                      placeholder={__v?.bdayPh}
                                      style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: `1px solid ${__t(__v?.errD?.bday)}`,
                                        borderRadius: '10px',
                                        padding: '14px',
                                        minHeight: '52px',
                                        boxSizing: 'border-box',
                                        color: '#ffffff',
                                      }}
                                      onChange={__v?.onBday}
                                    />{' '}
                                    {__b(__v?.err?.bday) ? (
                                      <>
                                        <span
                                          style={{ fontSize: '14px', color: '#ff5a63' }}
                                        >{`${__t(__v?.bdayErrText)}`}</span>
                                      </>
                                    ) : null}{' '}
                                    <span
                                      style={{
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'flex-start',
                                        background: 'rgba(251,169,25,0.14)',
                                        borderRadius: '10px',
                                        padding: '10px 12px',
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: '26px',
                                          height: '26px',
                                          borderRadius: '999px',
                                          background: '#fba919',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          flex: 'none',
                                        }}
                                      >
                                        <svg
                                          width="14"
                                          height="14"
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
                                      </span>
                                      <span
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          fontSize: '13px',
                                          lineHeight: '18px',
                                        }}
                                      >
                                        <strong style={{ fontSize: '14px' }}>{`${__t(__v?.t?.surpriseT)}`}</strong>
                                        <span style={{ color: '#9aa3b5' }}>{`${__t(__v?.t?.surpriseB)}`}</span>
                                      </span>
                                    </span>
                                  </div>
                                </>
                              ) : null}{' '}
                              <span style={{ fontSize: '14px', lineHeight: '20px', color: '#9aa3b5' }}>
                                {`${__t(__v?.t?.privacyShort)} `}
                                <A href="#privacy" style={{ color: '#ffffff' }}>{`${__t(__v?.t?.privacyLink)}`}</A>
                              </span>{' '}
                              <button
                                type="button"
                                onClick={__v?.submitJoin}
                                style={{
                                  border: '0',
                                  background: '#e42330',
                                  color: '#ffffff',
                                  fontWeight: '700',
                                  fontSize: '18px',
                                  borderRadius: '12px',
                                  padding: '14px',
                                  minHeight: '52px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(__v?.t?.joinBtn)}`}</button>
                            </div>
                          </>
                        ) : null}{' '}
                        {__b(__v?.joined) ? (
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span
                                  style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '999px',
                                    background: '#fba919',
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
                                    stroke="#101827"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M5 12l5 5L20 7" />
                                  </svg>
                                </span>{' '}
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                  <strong
                                    style={{ fontSize: '18px', lineHeight: '24px' }}
                                  >{`${__t(__v?.joinedTitle)}`}</strong>
                                  <span
                                    style={{ fontSize: '14px', color: '#9aa3b5' }}
                                  >{`${__t(__v?.t?.joinedSub)}`}</span>
                                </span>
                              </div>{' '}
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: `repeat(${__t(__v?.miniCols)}, minmax(0, 1fr))`,
                                  gap: '4px',
                                  padding: '4px 0',
                                }}
                              >
                                {(__v?.miniDark || []).map((m, __i0) => (
                                  <React.Fragment key={__i0}>
                                    <span
                                      style={{
                                        aspectRatio: '1',
                                        borderRadius: '999px',
                                        boxSizing: 'border-box',
                                        background: `${__t(m?.bg)}`,
                                        border: `2px ${__t(m?.bs)} ${__t(m?.border)}`,
                                      }}
                                    />
                                  </React.Fragment>
                                ))}
                              </div>{' '}
                              <span style={{ fontSize: '14px', color: '#9aa3b5' }}>{`${__t(__v?.t?.whereSave)}`}</span>{' '}
                              <button
                                type="button"
                                onClick={__v?.saveApple}
                                style={{
                                  border: '0',
                                  background: '#ffffff',
                                  color: '#101827',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '14px',
                                  minHeight: '52px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(__v?.t?.addApple)}`}</button>{' '}
                              <button
                                type="button"
                                onClick={__v?.saveGoogle}
                                style={{
                                  border: '1px solid #9aa3b5',
                                  background: 'transparent',
                                  color: '#ffffff',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '14px',
                                  minHeight: '52px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(__v?.t?.addGoogle)}`}</button>{' '}
                              <button
                                type="button"
                                onClick={__v?.saveWeb}
                                style={{
                                  background: 'transparent',
                                  color: '#8fa4e6',
                                  border: '1px dashed #8fa4e6',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '12px',
                                  minHeight: '48px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(__v?.t?.useWeb)}`}</button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>{' '}
                <button
                  type="button"
                  onClick={__v?.openInsta}
                  style={{
                    textAlign: 'left',
                    border: '0',
                    background: '#1b2436',
                    color: '#ffffff',
                    borderRadius: '14px',
                    padding: '14px',
                    minHeight: '72px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.08)',
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
                      stroke="#8fa4e6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01" />
                    </svg>
                  </span>{' '}
                  <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontVariant: 'small-caps',
                        fontWeight: '700',
                        fontSize: '18px',
                      }}
                    >{`${__t(__v?.t?.follow)}`}</span>
                    <span style={{ fontSize: '13px', opacity: '0.8' }}>{'@bunahouse'}</span>
                  </span>{' '}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ opacity: '0.6' }}
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>{' '}
              <div style={{ flex: '1 1 auto' }} />{' '}
              <div
                style={{
                  padding: '28px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
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
                    stroke="#ff5a63"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{' '}
                <span style={{ fontWeight: '800', letterSpacing: '0.03em', fontSize: '13px' }}>{'TEMELASH CARD'}</span>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.join) ? (
          <>
            <div style={{ height: '100%', overflowY: 'auto', background: '#f7f7f9' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 8px',
                  background: '#ffffff',
                  borderBottom: '1px solid #e3e5ec',
                  position: 'sticky',
                  top: '0',
                }}
              >
                <button
                  type="button"
                  onClick={__v?.goLanding}
                  aria-label="Back"
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '0',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#101827"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>{' '}
                <span style={{ fontWeight: '700' }}>{`${__t(__v?.t?.step1)}`}</span>
              </div>{' '}
              <div style={{ padding: '20px 16px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: '#8a4b2a',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {'B'}
                  </span>{' '}
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{ fontSize: '22px', lineHeight: '28px', fontWeight: '700' }}
                    >{`${__t(__v?.t?.joinTitle)}`}</span>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.t?.joinSub)}`}</span>
                  </span>
                </div>{' '}
                <span
                  style={{ background: '#fff3dc', borderRadius: '12px', padding: '10px 14px', fontWeight: '600' }}
                >{`${__t(__v?.t?.joinReward)}`}</span>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cf-name" style={{ fontWeight: '700' }}>{`${__t(__v?.t?.name)}`}</label>{' '}
                  <input
                    id="cf-name"
                    type="text"
                    autoComplete="given-name"
                    value={__v?.f?.name}
                    placeholder={__v?.t?.namePh}
                    style={{
                      border: `1px solid ${__t(__v?.err?.nameBorder)}`,
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                    onChange={__v?.onName}
                  />{' '}
                  {__b(__v?.err?.name) ? (
                    <>
                      <span style={{ fontSize: '14px', color: '#c81d29' }}>{`${__t(__v?.t?.nameErr)}`}</span>
                    </>
                  ) : null}
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cf-phone" style={{ fontWeight: '700' }}>{`${__t(__v?.t?.phone)}`}</label>{' '}
                  <input
                    id="cf-phone"
                    type="tel"
                    autoComplete="tel"
                    value={__v?.f?.phone}
                    placeholder="09__ ___ ___"
                    style={{
                      border: `1px solid ${__t(__v?.err?.phoneBorder)}`,
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                    onChange={__v?.onPhone}
                  />{' '}
                  {__b(__v?.err?.phone) ? (
                    <>
                      <span style={{ fontSize: '14px', color: '#c81d29' }}>{`${__t(__v?.t?.phoneErr)}`}</span>
                    </>
                  ) : null}{' '}
                  <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(__v?.t?.phoneWhy)}`}</span>
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cf-email" style={{ fontWeight: '700' }}>
                    {`${__t(__v?.t?.email)} `}
                    <span style={{ fontWeight: '600', color: '#5b6475' }}>{`${__t(__v?.t?.optional)}`}</span>
                  </label>{' '}
                  <input
                    id="cf-email"
                    type="email"
                    autoComplete="email"
                    value={__v?.f?.email}
                    placeholder="name@example.com"
                    style={{
                      border: `1px solid ${__t(__v?.err?.emailBorder)}`,
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                    onChange={__v?.onEmail}
                  />{' '}
                  {__b(__v?.err?.email) ? (
                    <>
                      <span style={{ fontSize: '14px', color: '#c81d29' }}>{`${__t(__v?.t?.emailErr)}`}</span>
                    </>
                  ) : null}
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cf-bday" style={{ fontWeight: '700' }}>
                    {`${__t(__v?.t?.bday)} `}
                    <span style={{ fontWeight: '600', color: '#5b6475' }}>{`${__t(__v?.t?.optional)}`}</span>
                  </label>{' '}
                  <input
                    id="cf-bday"
                    type="text"
                    value={__v?.f?.bday}
                    placeholder={__v?.t?.bdayPh}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                    onChange={__v?.onBday}
                  />{' '}
                  <span
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      background: '#fff3dc',
                      borderRadius: '10px',
                      padding: '10px 12px',
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
                    <span style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', lineHeight: '18px' }}>
                      <strong style={{ fontSize: '14px' }}>{`${__t(__v?.t?.surpriseT)}`}</strong>
                      <span>{`${__t(__v?.t?.surpriseB)}`}</span>
                    </span>
                  </span>
                </div>{' '}
                <label
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    fontSize: '14px',
                    lineHeight: '20px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={__b(__v?.f?.consent)}
                    onChange={__v?.onConsent}
                    style={{ width: '20px', height: '20px', margin: '0', flex: 'none' }}
                  />{' '}
                  <span>{`${__t(__v?.t?.consent)}`}</span>
                </label>{' '}
                <button
                  type="button"
                  onClick={__v?.submitJoin}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '18px',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.continue)}`}</button>{' '}
                <span
                  style={{ fontSize: '12px', lineHeight: '16px', color: '#5b6475', textAlign: 'center' }}
                >{`${__t(__v?.t?.privacy)}`}</span>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.save) ? (
          <>
            <div style={{ height: '100%', overflowY: 'auto', background: '#f7f7f9' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 8px',
                  background: '#ffffff',
                  borderBottom: '1px solid #e3e5ec',
                }}
              >
                <button
                  type="button"
                  onClick={__v?.goJoin}
                  aria-label="Back"
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '0',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#101827"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>{' '}
                <span style={{ fontWeight: '700' }}>{`${__t(__v?.t?.step2)}`}</span>
              </div>{' '}
              <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span
                  style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '700' }}
                >{`${__t(__v?.t?.whereSave)}`}</span>{' '}
                <span style={{ color: '#5b6475' }}>{`${__t(__v?.t?.whereSub)}`}</span>{' '}
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    margin: '8px 0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{'Buna House'}</strong>
                    <span style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}>{'1/10'}</span>
                  </div>{' '}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, minmax(0, 1fr))', gap: '4px' }}>
                    {(__v?.mini || []).map((m, __i0) => (
                      <React.Fragment key={__i0}>
                        <span
                          style={{
                            aspectRatio: '1',
                            borderRadius: '999px',
                            boxSizing: 'border-box',
                            background: `${__t(m?.bg)}`,
                            border: `2px ${__t(m?.bs)} ${__t(m?.border)}`,
                          }}
                        />
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(__v?.t?.welcomeStamp)}`}</span>
                </div>{' '}
                <button
                  type="button"
                  onClick={__v?.saveApple}
                  style={{
                    border: '0',
                    background: '#101827',
                    color: '#ffffff',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.addApple)}`}</button>{' '}
                <button
                  type="button"
                  onClick={__v?.saveGoogle}
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#101827',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.addGoogle)}`}</button>{' '}
                <button
                  type="button"
                  onClick={__v?.saveWeb}
                  style={{
                    background: 'transparent',
                    color: '#4661ad',
                    border: '1px dashed #4661ad',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
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
                  {`${__t(__v?.t?.useWeb)}`}
                </button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.ready) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '32px 24px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '999px',
                  background: '#fba919',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>{' '}
              <span
                style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '700' }}
              >{`${__t(__v?.t?.readyT)}`}</span>{' '}
              <span style={{ color: '#5b6475', maxWidth: '300px' }}>{`${__t(__v?.readyBody)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.goCard}
                style={{
                  marginTop: '16px',
                  alignSelf: 'stretch',
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '12px',
                  padding: '14px',
                  minHeight: '52px',
                  cursor: 'pointer',
                }}
              >{`${__t(__v?.t?.openCard)}`}</button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.card) ? (
          <>
            <div style={{ height: '100%', overflowY: 'auto', background: '#e9ebf0' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px 10px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                      stroke="#e42330"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{ fontSize: '13px', fontWeight: '700', color: '#5b6475' }}
                  >{`${__t(__v?.walletChip)}`}</span>
                </span>{' '}
                <button
                  type="button"
                  onClick={__v?.toggleMenu}
                  aria-haspopup="menu"
                  aria-expanded={__v?.menuExpanded}
                  aria-label={__v?.t?.cardMenu}
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '0',
                    borderRadius: '999px',
                    background: '#101827',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                    <circle cx="6" cy="12" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <circle cx="18" cy="12" r="1.8" />
                  </svg>
                </button>
              </div>{' '}
              <div
                style={{
                  margin: '0 12px',
                  background: '#ffffff',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  padding: '20px 18px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '999px',
                        background: '#8a4b2a',
                        color: '#ffffff',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {'B'}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '11px',
                        lineHeight: '11px',
                        fontWeight: '800',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {'BUNA'}
                      <span>{'HOUSE'}</span>
                    </span>
                  </span>{' '}
                  <span
                    style={{ fontSize: '14px', fontWeight: '600', fontVariantNumeric: 'tabular-nums' }}
                  >{`${__t(__v?.stampsLabel)}`}</span>
                </div>{' '}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                    gap: '12px',
                    padding: '0 4px',
                  }}
                >
                  {(__v?.slots || []).map((s, __i0) => (
                    <React.Fragment key={__i0}>
                      <span
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          boxSizing: 'border-box',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${__t(s?.bg)}`,
                          border: `1.5px ${__t(s?.bs)} ${__t(s?.border)}`,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={s?.check}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d={s?.path} />
                        </svg>
                      </span>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', color: '#5b6475' }}>{`${__t(__v?.t?.expiry)}`}</span>
                    <span style={{ fontSize: '15px', fontWeight: '700' }}>{'30 Nov 2026'}</span>
                  </span>{' '}
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '12px', color: '#5b6475' }}>{`${__t(__v?.t?.last)}`}</span>
                    <span
                      style={{ fontSize: '15px', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}
                    >{`${__t(__v?.lastUpdate)}`}</span>
                  </span>
                </div>{' '}
                <span
                  style={{ background: '#fff3dc', borderRadius: '8px', padding: '10px 12px', fontWeight: '600' }}
                >{`${__t(__v?.rewardLine)}`}</span>{' '}
                <button
                  type="button"
                  onClick={__v?.goCounter}
                  aria-label={__v?.t?.showCounter}
                  style={{
                    alignSelf: 'center',
                    border: '0',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '108px',
                      height: '108px',
                      padding: '4px',
                      background: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e3e5ec',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    <QRCodeDisplay value={__v?.cardToken} size={96} />
                  </div>{' '}
                  <span
                    style={{ fontSize: '13px', color: '#4661ad', fontWeight: '700' }}
                  >{`${__t(__v?.t?.tapEnlarge)}`}</span>
                </button>
              </div>{' '}
              <div style={{ padding: '16px 12px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="button"
                  onClick={__v?.goCounter}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.showCounter)}`}</button>{' '}
                <button
                  type="button"
                  onClick={__v?.demoStamp}
                  style={{
                    border: '1px dashed #5b6475',
                    background: 'transparent',
                    color: '#5b6475',
                    fontWeight: '700',
                    fontSize: '14px',
                    borderRadius: '12px',
                    padding: '10px',
                    minHeight: '44px',
                    cursor: 'pointer',
                  }}
                >
                  {'Demo only: staff adds a stamp'}
                </button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.counter) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 24px 28px',
                boxSizing: 'border-box',
                gap: '14px',
                textAlign: 'center',
              }}
            >
              <div
                style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ fontWeight: '700' }}>{'Buna House'}</span>
                <button
                  type="button"
                  onClick={__v?.goCard}
                  style={{
                    border: '0',
                    background: 'transparent',
                    color: '#4661ad',
                    fontWeight: '700',
                    padding: '0 4px',
                    minHeight: '44px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.done)}`}</button>
              </div>{' '}
              <span
                style={{ fontSize: '24px', lineHeight: '30px', fontWeight: '700', marginTop: '24px' }}
              >{`${__t(__v?.counterTitle)}`}</span>{' '}
              <div
                style={{
                  width: '240px',
                  height: '240px',
                  padding: '16px',
                  border: '1px solid #e3e5ec',
                  borderRadius: '20px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.06)',
                }}
              >
                <QRCodeDisplay value={__v?.cardToken} size={208} />
              </div>{' '}
              <span
                style={{
                  fontSize: '12px',
                  color: '#64748b',
                  letterSpacing: '0.04em',
                  fontFamily: 'monospace',
                  background: '#f1f5f9',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  maxWidth: '260px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={__v?.cardToken}
              >
                {__v?.cardToken}
              </span>{' '}
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >{`0412 · ${__t(__v?.firstName)}`}</span>{' '}
              <span
                style={{ fontSize: '14px', color: '#5b6475', maxWidth: '280px' }}
              >{`${__t(__v?.t?.brightTip)}`}</span>{' '}
              <div style={{ flex: '1 1 auto' }} />{' '}
              {__b(__v?.isRewardCounter) ? (
                <>
                  <button
                    type="button"
                    onClick={__v?.demoRedeem}
                    style={{
                      alignSelf: 'stretch',
                      border: '1px dashed #5b6475',
                      background: 'transparent',
                      color: '#5b6475',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderRadius: '12px',
                      padding: '10px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Demo only: staff redeems the reward'}
                  </button>
                </>
              ) : null}{' '}
              {__b(__v?.notRewardCounter) ? (
                <>
                  <button
                    type="button"
                    onClick={__v?.demoStampBack}
                    style={{
                      alignSelf: 'stretch',
                      border: '1px dashed #5b6475',
                      background: 'transparent',
                      color: '#5b6475',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderRadius: '12px',
                      padding: '10px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Demo only: staff scans and adds a stamp'}
                  </button>
                </>
              ) : null}
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.unlocked) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#101827',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '32px 24px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: '112px',
                  height: '112px',
                  borderRadius: '999px',
                  background: '#fba919',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="56"
                  height="56"
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
                style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', color: '#fba919' }}
              >{`${__t(__v?.unlockedFrac)}`}</span>{' '}
              <span
                style={{
                  fontSize: '30px',
                  lineHeight: '36px',
                  fontWeight: '800',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >{`${__t(__v?.t?.unlockT)}`}</span>{' '}
              <span style={{ color: '#9aa3b5', maxWidth: '280px' }}>{`${__t(__v?.t?.unlockB)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.goRewardCounter}
                style={{
                  marginTop: '16px',
                  alignSelf: 'stretch',
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '12px',
                  padding: '14px',
                  minHeight: '52px',
                  cursor: 'pointer',
                }}
              >{`${__t(__v?.t?.showReward)}`}</button>{' '}
              <button
                type="button"
                onClick={__v?.goCard}
                style={{
                  alignSelf: 'stretch',
                  border: '1px solid #2c3650',
                  background: 'transparent',
                  color: '#ffffff',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '12px',
                  minHeight: '48px',
                  cursor: 'pointer',
                }}
              >{`${__t(__v?.t?.saveLater)}`}</button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.redeemed) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '32px 24px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '999px',
                  background: '#fba919',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>{' '}
              <span
                style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '700' }}
              >{`${__t(__v?.t?.enjoyT)}`}</span>{' '}
              <span style={{ color: '#5b6475', maxWidth: '300px' }}>{`${__t(__v?.t?.enjoyB)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.goCard}
                style={{
                  marginTop: '16px',
                  alignSelf: 'stretch',
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '12px',
                  padding: '14px',
                  minHeight: '52px',
                  cursor: 'pointer',
                }}
              >{`${__t(__v?.t?.backCard)}`}</button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.removed) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '32px 24px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <span
                style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '700' }}
              >{`${__t(__v?.t?.removedT)}`}</span>{' '}
              <span style={{ color: '#5b6475', maxWidth: '300px' }}>{`${__t(__v?.t?.removedB)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.undoRemove}
                style={{
                  marginTop: '12px',
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
              >{`${__t(__v?.t?.undo)}`}</button>{' '}
              <button
                type="button"
                onClick={__v?.restart}
                style={{
                  border: '0',
                  background: 'transparent',
                  color: '#5b6475',
                  fontWeight: '700',
                  padding: '10px',
                  minHeight: '44px',
                  cursor: 'pointer',
                }}
              >
                {'Restart the demo'}
              </button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.menuOpen) ? (
          <>
            <button
              type="button"
              aria-label="Close menu"
              onClick={__v?.closeMenu}
              style={{
                position: 'absolute',
                inset: '0',
                border: '0',
                background: 'rgba(16,24,39,0.25)',
                cursor: 'default',
              }}
            />{' '}
            <div
              role="menu"
              aria-label={__v?.t?.cardMenu}
              style={{
                position: 'absolute',
                top: '64px',
                right: '12px',
                width: '260px',
                background: '#ffffff',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                border: '1px solid #e3e5ec',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <button
                type="button"
                role="menuitem"
                className="mi"
                onClick={__v?.openDetails}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v6M12 7.5h.01" />
                </svg>
                {`${__t(__v?.t?.details)}`}
              </button>{' '}
              <button
                type="button"
                role="menuitem"
                className="mi"
                onClick={__v?.goCounter}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3z" />
                </svg>
                {`${__t(__v?.t?.showCounter)}`}
              </button>{' '}
              <button
                type="button"
                role="menuitemcheckbox"
                aria-checked={__v?.notifChecked}
                className="mi"
                onClick={__v?.toggleNotif}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />
                </svg>
                <span style={{ flex: '1 1 auto' }}>{`${__t(__v?.t?.notif)}`}</span>
                <span
                  aria-hidden="true"
                  style={{
                    width: '40px',
                    height: '24px',
                    borderRadius: '999px',
                    padding: '3px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: `${__t(__v?.notifJustify)}`,
                    background: `${__t(__v?.notifTrack)}`,
                  }}
                >
                  <span style={{ width: '18px', height: '18px', borderRadius: '999px', background: '#ffffff' }} />
                </span>
              </button>{' '}
              <button
                type="button"
                role="menuitem"
                aria-expanded={__v?.langExpanded}
                className="mi"
                onClick={__v?.toggleLangSub}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
                </svg>
                <span style={{ flex: '1 1 auto' }}>{`${__t(__v?.t?.language)}`}</span>
                <span style={{ color: '#5b6475', fontSize: '14px' }}>{`${__t(__v?.langName)}`}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5b6475"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={__v?.langChevron} />
                </svg>
              </button>{' '}
              {__b(__v?.langOpen) ? (
                <>
                  <div
                    role="group"
                    aria-label={__v?.t?.language}
                    style={{ display: 'flex', flexDirection: 'column', padding: '0 6px 6px 44px' }}
                  >
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={__v?.enPressed}
                      className="mi"
                      onClick={__v?.setEnClose}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        border: '0',
                        background: 'transparent',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        minHeight: '40px',
                        cursor: 'pointer',
                        color: '#101827',
                        fontWeight: '600',
                      }}
                    >
                      {'English'}
                      <span style={{ color: '#4661ad' }}>{`${__t(__v?.enMark)}`}</span>
                    </button>{' '}
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={__v?.amPressed}
                      className="mi"
                      onClick={__v?.setAmClose}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        border: '0',
                        background: 'transparent',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        minHeight: '40px',
                        cursor: 'pointer',
                        color: '#101827',
                        fontWeight: '600',
                      }}
                    >
                      {'አማርኛ'}
                      <span style={{ color: '#4661ad' }}>{`${__t(__v?.amMark)}`}</span>
                    </button>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.showAddWallet) ? (
                <>
                  <button
                    type="button"
                    role="menuitem"
                    className="mi"
                    onClick={__v?.moveToWallet}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      border: '0',
                      background: 'transparent',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      minHeight: '44px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#101827',
                      fontWeight: '600',
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#101827"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 7h18v12H3zM3 11h18M16 15h2" />
                    </svg>
                    {`${__t(__v?.t?.moveWallet)}`}
                  </button>
                </>
              ) : null}{' '}
              <button
                type="button"
                role="menuitem"
                className="mi"
                onClick={__v?.share}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" />
                </svg>
                {`${__t(__v?.t?.share)}`}
              </button>{' '}
              <div style={{ height: '1px', background: '#e3e5ec', margin: '4px 6px' }} />{' '}
              <button
                type="button"
                role="menuitem"
                className="mi"
                onClick={__v?.askRemove}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#c81d29',
                  fontWeight: '700',
                }}
              >
                <svg
                  width="20"
                  height="20"
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
                {`${__t(__v?.t?.remove)}`}
              </button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.sheetDetails) ? (
          <>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background: 'rgba(16,24,39,0.45)',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <div
                role="dialog"
                aria-label={__v?.t?.details}
                style={{
                  background: '#ffffff',
                  width: '100%',
                  borderRadius: '20px 20px 0 0',
                  padding: '20px 20px 28px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Buna House'}</span>
                  <button
                    type="button"
                    onClick={__v?.closeSheet}
                    style={{
                      border: '0',
                      background: 'transparent',
                      color: '#4661ad',
                      fontWeight: '700',
                      padding: '0 4px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >{`${__t(__v?.t?.done)}`}</button>
                </div>{' '}
                <dl
                  style={{
                    margin: '0',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '10px 16px',
                    fontSize: '15px',
                  }}
                >
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dReward)}`}</dt>
                  <dd style={{ margin: '0', fontWeight: '700' }}>{`${__t(__v?.t?.dRewardV)}`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dMember)}`}</dt>
                  <dd style={{ margin: '0' }}>{`${__t(__v?.firstName)} · 0412`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dAddress)}`}</dt>
                  <dd style={{ margin: '0' }}>{'[Street, Bole, Addis Ababa]'}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dOpen)}`}</dt>
                  <dd style={{ margin: '0' }}>{'Mon–Sat 7:00–21:00'}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dTerms)}`}</dt>
                  <dd style={{ margin: '0', color: '#5b6475' }}>{`${__t(__v?.t?.dTermsV)}`}</dd>
                </dl>{' '}
                <button
                  type="button"
                  onClick={__v?.openInsta}
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#4661ad',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '12px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.follow)} · @bunahouse`}</button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.sheetRemove) ? (
          <>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background: 'rgba(16,24,39,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                boxSizing: 'border-box',
              }}
            >
              <div
                role="alertdialog"
                aria-label={__v?.t?.removeQ}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  width: '100%',
                }}
              >
                <span
                  style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}
                >{`${__t(__v?.t?.removeQ)}`}</span>{' '}
                <span style={{ color: '#5b6475' }}>{`${__t(__v?.removeBody)}`}</span>{' '}
                <button
                  type="button"
                  onClick={__v?.confirmRemove}
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
                >{`${__t(__v?.t?.removeYes)}`}</button>{' '}
                <button
                  type="button"
                  onClick={__v?.closeSheet}
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#101827',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '12px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.keep)}`}</button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.hasToast) ? (
          <>
            <div
              role="status"
              style={{
                position: 'absolute',
                left: '16px',
                right: '16px',
                bottom: '24px',
                background: '#101827',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '600',
              }}
            >
              <span
                style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#fba919', flex: 'none' }}
              />
              {`${__t(__v?.toast)}`}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
