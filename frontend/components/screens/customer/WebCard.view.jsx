'use client';
/* Markup for the WebCard screen. State and handlers live in WebCard.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default function renderWebCard(__v) {
  return (
    <>
      <div
        style={{
          width: '390px',
          height: '940px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#e9ebf0',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header
          style={{
            padding: '16px 20px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            </svg>{' '}
            <span style={{ fontWeight: '700', fontSize: '15px', color: '#5b6475' }}>{'temelash.card'}</span>
          </div>{' '}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              onClick={__v?.toggleLang}
              aria-label="Switch language"
              style={{
                border: '0',
                background: 'transparent',
                padding: '0 10px',
                minHeight: '44px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '14px',
                color: '#101827',
              }}
            >{`${__t(__v?.langLabel)}`}</button>{' '}
            <button
              type="button"
              onClick={__v?.openMenu}
              aria-label="Card details"
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
          </div>
        </header>{' '}
        <main
          style={{ flex: '1 1 auto', padding: '4px 16px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {__b(__v?.walletMsg) ? (
            <div
              style={{
                background: '#101827',
                color: '#ffffff',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{`${__t(__v?.walletMsg)}`}</span>
              <button
                type="button"
                onClick={__v?.clearWalletMsg}
                style={{
                  background: 'transparent',
                  border: 0,
                  color: '#fba919',
                  cursor: 'pointer',
                  fontWeight: '700',
                }}
              >
                ✕
              </button>
            </div>
          ) : null}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${__t(__v?.brandColor || '#8a4b2a')}`,
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none',
                  }}
                >
                  {`${__t(__v?.initial)}`}
                </span>{' '}
                <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '16px' }}>
                  <span style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.03em' }}>
                    {`${__t(__v?.nameA)}`}
                  </span>
                  <span style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.03em' }}>
                    {`${__t(__v?.nameB)}`}
                  </span>
                  {__v?.programTitle ? (
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>
                      {`${__t(__v?.programTitle)}`}
                    </span>
                  ) : null}
                </span>
              </div>{' '}
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                  }}
                >{`${__t(__v?.t?.stamps)}`}</span>
                <span
                  style={{
                    fontSize: '32px',
                    lineHeight: '32px',
                    fontWeight: '800',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >{`${__t(__v?.countLabel)}`}</span>
              </span>
            </div>{' '}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '12px' }}>
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
                      border: `2px ${__t(sl?.bs)} ${__t(sl?.border)}`,
                    }}
                  >
                    {__b(sl?.earned) ? (
                      <>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2.5"
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
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={sl?.icon}
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
            <div
              style={{
                background: `${__t(__v?.bannerBg)}`,
                color: `${__t(__v?.bannerFg)}`,
                borderRadius: '12px',
                padding: '10px 14px',
                fontWeight: '700',
                fontFamily: `${__t(__v?.font)}`,
              }}
            >{`${__t(__v?.banner)}`}</div>{' '}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    fontFamily: `${__t(__v?.font)}`,
                  }}
                >{`${__t(__v?.t?.expires)}`}</span>
                <span style={{ fontWeight: '700', fontSize: '17px' }}>{'30 Nov 2026'}</span>
              </div>{' '}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    fontFamily: `${__t(__v?.font)}`,
                  }}
                >{`${__t(__v?.t?.last)}`}</span>
                <span style={{ fontWeight: '700', fontSize: '17px', fontVariantNumeric: 'tabular-nums' }}>
                  {`${__t(__v?.lastVisitText)}`}
                </span>
              </div>
            </div>{' '}
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingTop: '4px' }}
            >
              <div
                style={{
                  width: '156px',
                  height: '156px',
                  padding: '8px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(16,24,39,0.06)',
                  border: '1px solid #e3e5ec',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                <QRCodeDisplay
                  value={__v?.qrValue || __v?.cardToken}
                  size={140}
                  darkColor={__v?.brandColor || '#101827'}
                />
              </div>{' '}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
                <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700', letterSpacing: '0.04em' }}>
                  LIVE REAL-TIME SYNC
                </span>
              </div>
              <span
                style={{ fontSize: '14px', color: '#5b6475', fontFamily: `${__t(__v?.font)}` }}
              >{`${__t(__v?.t?.show)}`}</span>{' '}
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#101827', fontVariantNumeric: 'tabular-nums' }}>
                {`${__t(__v?.memberLabel)}`}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#2563eb',
                    fontWeight: '700',
                    fontFamily: 'monospace',
                    background: '#eff6ff',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid #bfdbfe',
                  }}
                >
                  Card ID: {__v?.cardId}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#64748b',
                    fontFamily: 'monospace',
                    background: '#f1f5f9',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  Member: {__v?.memberId}
                </span>
              </div>
            </div>{' '}
            <div
              style={{
                borderTop: '1px solid #e3e5ec',
                paddingTop: '12px',
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                color: '#5b6475',
                textAlign: 'center',
              }}
            >
              {'POWERED BY TEMELASH CARD'}
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={__v?.onAppleWallet}
              style={{
                background: '#101827',
                color: '#ffffff',
                fontWeight: '700',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                border: 0,
                cursor: 'pointer',
                fontFamily: `${__t(__v?.font)}`,
              }}
            >{`${__t(__v?.t?.apple)}`}</button>{' '}
            <button
              type="button"
              onClick={__v?.onGoogleWallet}
              style={{
                background: '#ffffff',
                color: '#101827',
                border: '1px solid #e3e5ec',
                fontWeight: '700',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                fontFamily: `${__t(__v?.font)}`,
              }}
            >{`${__t(__v?.t?.google)}`}</button>
          </div>
        </main>{' '}
        {__b(__v?.menuOpen) ? (
          <>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background: 'rgba(16,24,39,0.45)',
                display: 'flex',
                alignItems: 'flex-end',
                zIndex: 9000,
              }}
            >
              <div
                role="dialog"
                aria-label="Card details"
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
                  <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {`${__t(__v?.merchantFullName)}`}
                  </span>
                  <button
                    type="button"
                    onClick={__v?.closeMenu}
                    style={{
                      border: '0',
                      background: 'transparent',
                      color: '#4661ad',
                      fontWeight: '700',
                      padding: '0 4px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Done'}
                  </button>
                </div>{' '}

                {__v?.currentUser ? (
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#101827' }}>
                        👤 {__v?.currentUser?.firstName || 'Member'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        {__v?.currentUser?.phone}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={__v?.logout}
                      style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                ) : null}

                {__v?.canOfferInstall && __v?.currentUser ? (
                  <button
                    type="button"
                    onClick={__v?.offerInstall}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: '700',
                      background: '#ffffff',
                      color: '#101827',
                      cursor: 'pointer',
                    }}
                  >
                    {'Add this card to your home screen'}
                  </button>
                ) : null}

                <dl
                  style={{
                    margin: '0',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '10px 16px',
                    fontSize: '15px',
                  }}
                >
                  <dt style={{ color: '#5b6475' }}>{'Reward'}</dt>
                  <dd style={{ margin: '0', fontWeight: '700' }}>{`${__t(__v?.rewardDescription)}`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{'Address'}</dt>
                  <dd style={{ margin: '0' }}>{`${__t(__v?.merchantAddress)}`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{'Open'}</dt>
                  <dd style={{ margin: '0' }}>{`${__t(__v?.merchantHours)}`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{'Phone'}</dt>
                  <dd style={{ margin: '0' }}>{`${__t(__v?.merchantPhone)}`}</dd> <dt style={{ color: '#5b6475' }}>{'Terms'}</dt>
                  <dd style={{ margin: '0', color: '#5b6475' }}>{`${__t(__v?.termsText)}`}</dd>
                </dl>{' '}
                <button
                  type="button"
                  onClick={__v?.closeMenu}
                  style={{
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: '700',
                    background: '#ffffff',
                    color: '#4661ad',
                    cursor: 'pointer',
                  }}
                >
                  {'Close'}
                </button>
              </div>
            </div>
          </>
        ) : null}

        {__v?.showInstall && !__v?.authModalOpen ? (
          <div
            role="dialog"
            aria-label="Add your card to the home screen"
            style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.55)', zIndex: 99998, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          >
            <div style={{ background: '#ffffff', width: '100%', maxWidth: '420px', borderRadius: '20px 20px 0 0', padding: '22px 20px 28px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={{ margin: 0, fontSize: '19px', fontWeight: '800', color: '#101827' }}>
                {'Keep your card one tap away'}
              </h2>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '20px', color: '#374151' }}>
                {__v?.installMethod === 'prompt'
                  ? 'Add it to your home screen and it opens like an app, ready to show at the counter.'
                  : __v?.installMethod === 'ios'
                    ? 'In Safari, tap the Share button, then "Add to Home Screen".'
                    : 'Open your browser menu (⋮) and choose "Add to Home screen" or "Install app".'}
              </p>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: '18px', color: '#64748b' }}>
                {'If the icon asks you to sign in, use your phone number and PIN.'}
              </p>
              {__v?.installMethod === 'prompt' ? (
                <button
                  type="button"
                  onClick={__v?.install}
                  style={{ background: '#101827', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '13px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}
                >
                  {'Add to home screen'}
                </button>
              ) : null}
              <button
                type="button"
                onClick={__v?.dismissInstall}
                style={{ background: 'transparent', color: '#4661ad', border: '1px solid #e3e5ec', borderRadius: '12px', padding: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
              >
                {__v?.installMethod === 'prompt' ? 'Not now' : 'Done'}
              </button>
            </div>
          </div>
        ) : null}

        {/* Customer Auth Modal (First-time scan OR after Logout) */}
        {__v?.authModalOpen ? (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.78)',
              backdropFilter: 'blur(8px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '28px 24px',
                maxWidth: '380px',
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    background: __v?.brandColor || '#8a4b2a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    boxShadow: '0 4px 12px rgba(138, 75, 42, 0.25)',
                    color: '#ffffff',
                  }}
                >
                  ☕
                </div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#101827' }}>
                  {__v?.programTitle || 'Stamp card'}
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '18px' }}>
                  {__v?.authTab === 'signin'
                    ? 'Sign in with your phone number and the 6-digit PIN you chose.'
                    : 'Enter your name and phone number, and choose a 6-digit PIN to open your card on any phone.'}
                </p>
              </div>

              <div role="tablist" style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', gap: '4px' }}>
                {[
                  ['register', 'New member'],
                  ['signin', 'Sign in'],
                ].map(([tab, text]) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={__v?.authTab === tab}
                    onClick={() => __v?.setAuthTab(tab)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '8px',
                      background: __v?.authTab === tab ? '#ffffff' : 'transparent',
                      color: __v?.authTab === tab ? '#101827' : '#64748b',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: __v?.authTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {text}
                  </button>
                ))}
              </div>

              {__v?.authError ? (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    lineHeight: '18px',
                  }}
                >
                  {__v?.authError}
                </div>
              ) : null}

              <form onSubmit={__v?.handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {__v?.authTab === 'register' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151' }}>
                      Your First Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Abebe"
                      value={__v?.authFirstName || ''}
                      onChange={__v?.onAuthFirstName}
                      required
                      style={{
                        border: '1px solid #cbd5e1',
                        borderRadius: '10px',
                        padding: '11px 14px',
                        fontSize: '14px',
                        outline: 'none',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                ) : null}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0912 345 678"
                    value={__v?.authPhone || ''}
                    onChange={__v?.onAuthPhone}
                    required
                    style={{
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '11px 14px',
                      fontSize: '14px',
                      outline: 'none',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151' }}>
                    {__v?.authTab === 'signin' ? 'Your 6-digit PIN *' : 'Choose a 6-digit PIN *'}
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    autoComplete={__v?.authTab === 'signin' ? 'current-password' : 'new-password'}
                    placeholder="••••••"
                    value={__v?.authPin || ''}
                    onChange={__v?.onAuthPin}
                    required
                    style={{
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '11px 14px',
                      fontSize: '16px',
                      letterSpacing: '0.3em',
                      outline: 'none',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  />
                  {__v?.authTab === 'signin' ? (
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      {'Forgot your PIN? Ask staff at the counter to reissue your card.'}
                    </span>
                  ) : null}
                </div>

                {__v?.authTab === 'register' ? (
                  <div
                    style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: '#166534',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>⚡</span>
                    <span>Not 123456 or 111111. With your phone number, this PIN opens your card on a new phone.</span>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={__v?.authLoading}
                  style={{
                    background: '#101827',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '13px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: __v?.authLoading ? 'wait' : 'pointer',
                    boxShadow: '0 4px 12px rgba(16,24,39,0.2)',
                    marginTop: '4px',
                  }}
                >
                  {__v?.authLoading
                    ? 'Processing...'
                    : __v?.authTab === 'signin'
                      ? 'Open My Card ➔'
                      : 'Get My Loyalty Card ➔'}
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
