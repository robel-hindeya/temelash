'use client';
/* Markup for the StaffApp screen. State and handlers live in StaffApp.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import api from '@/lib/api';

export default function renderStaffApp(__v) {
  return (
    <>
      <div
        style={{
          width: '390px',
          height: '844px',
          boxSizing: 'border-box',
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <header
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e3e5ec',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 40 40" aria-hidden="true">
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
          <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', lineHeight: '18px' }}>
            <strong>{`${__t(__v?.bizName)}`}</strong>
            <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.staffSubtitle || 'Staff')}`}</span>
          </span>{' '}
          <span
            style={{
              fontSize: '12px',
              lineHeight: '16px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              color: '#5b6475',
              textAlign: 'right',
            }}
          >
            {'TODAY'}
            <br />
            <span
              style={{
                fontSize: '20px',
                lineHeight: '22px',
                fontWeight: '800',
                color: '#101827',
                letterSpacing: '0',
                fontVariantNumeric: 'tabular-nums',
              }}
            >{`${__t(__v?.today)}`}</span>
          </span>
          <button
            type="button"
            title="Sign out of staff terminal"
            onClick={() => {
              api.auth.logout();
              window.location.href = '/';
            }}
            style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '6px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '4px',
              color: '#5b6475',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </button>
        </header>{' '}
        {__b(__v?.isScan) ? (
          <>
            <div style={{ flex: '1 1 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Scan a card'}</h1>{' '}
              {/* Scan & Batch Counter Toolbar */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>⚡</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#101827' }}>
                      Scanner Stamp Counter
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      Default batch: <strong>+{__v?.stampCounter} {__v?.stampCounter === 1 ? 'stamp' : 'stamps'}</strong>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[1, 2, 3, 5].map((amt) => {
                    const isSel = __v?.stampCounter === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => __v?.setStampCounter && __v.setStampCounter(amt)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: isSel ? '2px solid #101827' : '1px solid #cbd5e1',
                          background: isSel ? '#101827' : '#f8fafc',
                          color: isSel ? '#ffffff' : '#101827',
                          fontWeight: '700',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        +{amt}
                      </button>
                    );
                  })}
                </div>
              </div>{' '}
              <div
                style={{
                  position: 'relative',
                  height: '350px',
                  background: '#090d16',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                  border: '1px solid #1e293b',
                }}
              >
                {/* Hidden File Input for QR Image Upload */}
                <input
                  ref={(el) => {
                    this.fileInputEl = el;
                  }}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={__v?.onImageUpload}
                />

                {/* Live Video Camera Stream */}
                <video
                  ref={(el) => {
                    this.videoEl = el;
                    if (el && this.stream && el.srcObject !== this.stream) {
                      el.srcObject = this.stream;
                    }
                  }}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: __v?.cameraActive ? 'block' : 'none',
                  }}
                />

                {/* Dark Vignette Overlay when Camera is Active */}
                {__b(__v?.cameraActive) ? (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: 'radial-gradient(circle at center, transparent 45%, rgba(9, 13, 22, 0.7) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                ) : null}

                {/* Animated Targeting Reticle & Laser Sweep */}
                {__b(__v?.cameraActive && !__v?.scannedSuccess) ? (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      width: '210px',
                      height: '210px',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Top-Left Corner */}
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        width: '36px',
                        height: '36px',
                        borderLeft: '4px solid #ffffff',
                        borderTop: '4px solid #ffffff',
                        borderRadius: '12px 0 0 0',
                        filter: 'drop-shadow(0 0 6px rgba(251, 169, 25, 0.8))',
                      }}
                    />
                    {/* Top-Right Corner */}
                    <span
                      style={{
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        width: '36px',
                        height: '36px',
                        borderRight: '4px solid #ffffff',
                        borderTop: '4px solid #ffffff',
                        borderRadius: '0 12px 0 0',
                        filter: 'drop-shadow(0 0 6px rgba(251, 169, 25, 0.8))',
                      }}
                    />
                    {/* Bottom-Left Corner */}
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        bottom: '0',
                        width: '36px',
                        height: '36px',
                        borderLeft: '4px solid #ffffff',
                        borderBottom: '4px solid #ffffff',
                        borderRadius: '0 0 0 12px',
                        filter: 'drop-shadow(0 0 6px rgba(251, 169, 25, 0.8))',
                      }}
                    />
                    {/* Bottom-Right Corner */}
                    <span
                      style={{
                        position: 'absolute',
                        right: '0',
                        bottom: '0',
                        width: '36px',
                        height: '36px',
                        borderRight: '4px solid #ffffff',
                        borderBottom: '4px solid #ffffff',
                        borderRadius: '0 0 12px 0',
                        filter: 'drop-shadow(0 0 6px rgba(251, 169, 25, 0.8))',
                      }}
                    />
                    {/* Center Crosshair Subtlety */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '18px',
                        height: '18px',
                        opacity: 0.35,
                      }}
                    >
                      <span style={{ position: 'absolute', left: '8px', top: '0', bottom: '0', width: '2px', background: '#ffffff' }} />
                      <span style={{ position: 'absolute', top: '8px', left: '0', right: '0', height: '2px', background: '#ffffff' }} />
                    </div>
                    {/* Glowing Red-Gold Laser Sweep Line */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '6px',
                        right: '6px',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, #e42330 25%, #fba919 50%, #e42330 75%, transparent)',
                        boxShadow: '0 0 14px #e42330, 0 0 6px #fba919',
                        borderRadius: '3px',
                        animation: 'tmScanLaser 2.2s ease-in-out infinite',
                      }}
                    />
                  </div>
                ) : null}

                {/* Top Overlay Controls Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 10,
                  }}
                >
                  {/* Status Indicator */}
                  {__b(__v?.cameraActive) ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(16, 24, 39, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#ffffff',
                        letterSpacing: '0.03em',
                      }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#10b981',
                          boxShadow: '0 0 8px #10b981',
                          animation: 'tmPulseDot 1.6s ease-in-out infinite',
                        }}
                      />
                      <span>{'LIVE SCANNER'}</span>
                    </div>
                  ) : (
                    <div
                      style={{
                        background: 'rgba(16, 24, 39, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#9ca3af',
                      }}
                    >
                      {__b(__v?.cameraLoading) ? 'CONNECTING...' : 'CAMERA IDLE'}
                    </div>
                  )}

                  {/* Camera Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {__b(__v?.torchSupported) ? (
                      <button
                        type="button"
                        onClick={__v?.toggleTorch}
                        title={__v?.torchOn ? 'Turn flashlight off' : 'Turn flashlight on'}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          background: __v?.torchOn ? '#fba919' : 'rgba(16, 24, 39, 0.75)',
                          color: __v?.torchOn ? '#101827' : '#ffffff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backdropFilter: 'blur(8px)',
                          boxShadow: __v?.torchOn ? '0 0 12px rgba(251, 169, 25, 0.6)' : 'none',
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      </button>
                    ) : null}

                    <button
                      type="button"
                      onClick={__v?.flipCamera}
                      title="Switch camera (rear / front)"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(16, 24, 39, 0.75)',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 1.25.29 2.43.8 3.49L3 15h5v-5L6.34 11.66A6 6 0 1 1 18 10z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={__v?.toggleCamera}
                      title={__v?.cameraActive ? 'Pause camera' : 'Start camera'}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: __v?.cameraActive ? 'rgba(16, 24, 39, 0.75)' : '#e42330',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {__b(__v?.cameraActive) ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Instant Success Flash Animation */}
                {__b(__v?.scannedSuccess) ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: 'rgba(16, 185, 129, 0.92)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      zIndex: 20,
                      animation: 'tmSuccessFlash 0.35s ease-out forwards',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                      }}
                    >
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: '800' }}>{'Card Detected!'}</span>
                    <span style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>{'Opening customer profile...'}</span>
                  </div>
                ) : null}

                {/* Camera Loading Spinner State */}
                {__b(__v?.cameraLoading) ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: '#090d16',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      color: '#ffffff',
                      zIndex: 5,
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(255, 255, 255, 0.15)',
                        borderTopColor: '#e42330',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                      }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>
                      {'Starting camera stream...'}
                    </span>
                  </div>
                ) : null}

                {/* Camera Permission / Error Card */}
                {__b(__v?.cameraError && !__v?.cameraLoading) ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: '#090d16',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px',
                      textAlign: 'center',
                      zIndex: 8,
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f87171',
                        marginBottom: '10px',
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>
                      {'Camera Unavailable'}
                    </span>
                    <span style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '18px', maxWidth: '280px', marginBottom: '16px' }}>
                      {`${__t(__v?.cameraError)}`}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={__v?.startCamera}
                        style={{
                          background: '#e42330',
                          color: '#ffffff',
                          border: '0',
                          borderRadius: '8px',
                          padding: '8px 14px',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        {'Try Again'}
                      </button>
                      <button
                        type="button"
                        onClick={__v?.triggerUpload}
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          padding: '8px 14px',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        {'Upload QR'}
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* Paused State */}
                {__b(!__v?.cameraActive && !__v?.cameraLoading && !__v?.cameraError) ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: '#090d16',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      color: '#ffffff',
                      zIndex: 6,
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>
                      {'Scanner camera paused'}
                    </span>
                    <button
                      type="button"
                      onClick={__v?.startCamera}
                      style={{
                        background: '#e42330',
                        color: '#ffffff',
                        border: '0',
                        borderRadius: '8px',
                        padding: '10px 18px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      {'Start Camera'}
                    </button>
                  </div>
                ) : null}

                {/* Floating Bottom Instruction Banner */}
                {__b(__v?.cameraActive) ? (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(9, 13, 22, 0.78)',
                      backdropFilter: 'blur(8px)',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      zIndex: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#e2e8f0',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {"Point at customer's card QR"}
                    </span>
                    <button
                      type="button"
                      onClick={__v?.triggerUpload}
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      {'Upload QR'}
                    </button>
                  </div>
                ) : null}
              </div>{' '}
              {__b(__v?.scanError) ? (
                <div
                  style={{
                    background: '#fde8e9',
                    color: '#c81d29',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  {`${__t(__v?.scanError)}`}
                </div>
              ) : null}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="sa-token" style={{ fontWeight: '700', fontSize: '14px' }}>
                  {'Card Token (from customer QR)'}
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="sa-token"
                    type="text"
                    value={__v?.cardTokenInput || ''}
                    onChange={__v?.onCardTokenChange}
                    placeholder="Enter or paste 43-char card token..."
                    style={{
                      flex: '1 1 auto',
                      minWidth: '0',
                      border: '1px solid #e3e5ec',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      minHeight: '44px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                    }}
                  />
                  <button
                    type="button"
                    onClick={__v?.scanCardNow}
                    style={{
                      border: '0',
                      background: '#e42330',
                      color: '#ffffff',
                      fontWeight: '700',
                      borderRadius: '8px',
                      padding: '0 16px',
                      minHeight: '44px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    {'Validate'}
                  </button>
                </div>
              </div>
              {__b((__v?.testCards || []).length > 0) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#5b6475' }}>
                    {'Active Test Cards:'}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(__v?.testCards || []).map((tc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => __v?.onPickTestCard(tc.token)}
                        style={{
                          border: '1px solid #4661ad',
                          background: '#eef2fb',
                          color: '#4661ad',
                          fontWeight: '600',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        {`⚡ ${tc.name}`}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              {__b(__v?.showTestTools) ? (
                <button
                  type="button"
                  onClick={__v?.createQuickTestCard}
                  style={{
                    border: '1px dashed #4661ad',
                    background: 'transparent',
                    color: '#4661ad',
                    fontWeight: '700',
                    fontSize: '13px',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  {'+ Enroll New Customer for Testing'}
                </button>
              ) : null}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="sa-phone" style={{ fontWeight: '700', fontSize: '14px' }}>
                  {'Or find by registered phone'}
                </label>{' '}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="sa-phone"
                    type="tel"
                    value={__v?.phoneInput || ''}
                    onChange={__v?.onPhoneChange}
                    placeholder="09__ ___ ___"
                    style={{
                      flex: '1 1 auto',
                      minWidth: '0',
                      border: '1px solid #e3e5ec',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      minHeight: '44px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                    }}
                  />{' '}
                  <button
                    type="button"
                    onClick={__v?.toCustomer}
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      color: '#4661ad',
                      fontWeight: '700',
                      borderRadius: '8px',
                      padding: '0 16px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Find'}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.isCustomer) ? (
          <>
            <div style={{ flex: '1 1 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button
                type="button"
                onClick={__v?.toScan}
                style={{
                  alignSelf: 'flex-start',
                  border: '0',
                  background: 'transparent',
                  color: '#4661ad',
                  fontWeight: '700',
                  padding: '8px 0',
                  minHeight: '44px',
                  cursor: 'pointer',
                }}
              >
                {'← Back to scan'}
              </button>{' '}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '999px',
                    background: '#101827',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {`${__t(__v?.custInitials || 'AB')}`}
                </span>{' '}
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '24px', lineHeight: '30px', fontWeight: '700' }}>{`${__t(__v?.custName || 'Customer')}`}</span>
                  <span style={{ color: '#5b6475' }}>{`${__t(__v?.custMeta)}`}</span>
                </span>
              </div>{' '}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                      fontSize: '32px',
                      lineHeight: '32px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {`${__t(__v?.custStampsFraction)}`}
                  </span>
                </div>{' '}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px' }}>
                  {(__v?.slots9 || []).map((sl, __i0) => (
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
                        {__b(sl?.reward) ? (
                          <>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={sl?.iconColor}
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
                <div style={{ background: '#fff3dc', borderRadius: '12px', padding: '12px 14px', fontWeight: '600' }}>
                  {`${__t(__v?.stampsToGo)} more ${__v?.stampsToGo === 1 ? 'visit' : 'visits'} to ${__t(__v?.rewardTitle || 'the reward')}`}
                </div>
              </div>{' '}
              {__b(__v?.cooldownNotice) ? (
                <div style={{ background: '#fff8e6', border: '1px solid #fba919', color: '#8a5a00', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', fontWeight: '600' }}>
                  {`⚠️ ${__t(__v?.cooldownNotice)}`}
                </div>
              ) : null}
              {__b(__v?.scanError) ? (
                <div style={{ background: '#fde8e9', color: '#c81d29', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', fontWeight: '600' }}>
                  {`❌ ${__t(__v?.scanError)}`}
                </div>
              ) : null}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Stamp Counter Controller */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 4px 12px rgba(16,24,39,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#101827' }}>
                      Stamps to Issue
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Current: <strong>{__v?.currentStamps}/{__v?.maxStamps}</strong>
                    </span>
                  </div>

                  {/* Stepper with - and + */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <button
                      type="button"
                      onClick={__v?.decStampCounter}
                      disabled={__v?.stampCounter <= 1}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        background: __v?.stampCounter <= 1 ? '#f8fafc' : '#ffffff',
                        color: __v?.stampCounter <= 1 ? '#94a3b8' : '#101827',
                        fontSize: '22px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: __v?.stampCounter <= 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      −
                    </button>
                    <div style={{ minWidth: '80px', textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: '#101827', lineHeight: '32px' }}>
                        +{__v?.stampCounter}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {__v?.stampCounter === 1 ? 'Stamp' : 'Stamps'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={__v?.incStampCounter}
                      disabled={__v?.stampCounter >= 10}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        background: __v?.stampCounter >= 10 ? '#f8fafc' : '#ffffff',
                        color: __v?.stampCounter >= 10 ? '#94a3b8' : '#101827',
                        fontSize: '22px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: __v?.stampCounter >= 10 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Quick Presets */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 5].map((amt) => {
                      const isSel = __v?.stampCounter === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => __v?.setStampCounter && __v.setStampCounter(amt)}
                          style={{
                            flex: 1,
                            padding: '6px 0',
                            borderRadius: '8px',
                            border: isSel ? '2px solid #101827' : '1px solid #e2e8f0',
                            background: isSel ? '#101827' : '#f8fafc',
                            color: isSel ? '#ffffff' : '#101827',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                          }}
                        >
                          +{amt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => __v?.addStamp && __v.addStamp(__v?.stampCounter)}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '17px',
                    borderRadius: '12px',
                    padding: '16px',
                    minHeight: '56px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 14px rgba(228, 35, 48, 0.35)',
                  }}
                >
                  <span>✓ Issue +{__v?.stampCounter} {__v?.stampCounter === 1 ? 'Stamp' : 'Stamps'}</span>
                  <span style={{ fontSize: '13px', opacity: 0.9, background: 'rgba(0,0,0,0.18)', padding: '2px 8px', borderRadius: '6px' }}>
                    {__v?.currentStamps + __v?.stampCounter}/{__v?.maxStamps}
                  </span>
                </button>{' '}
                <button
                  type="button"
                  onClick={__v?.toScan}
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
                >
                  {'Cancel'}
                </button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.isUnlocked) ? (
          <>
            <div style={{ flex: '1 1 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '8px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                  }}
                >
                  {`STAMP ADDED · ${__t(__v?.custName || 'CUSTOMER')}`}
                </span>{' '}
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                  {`${__t(__v?.rewardTitle || 'Reward')} unlocked`}
                </h1>
              </div>{' '}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                      fontSize: '32px',
                      lineHeight: '32px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {`${__v?.maxStamps}/${__v?.maxStamps}`}
                  </span>
                </div>{' '}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px' }}>
                  {(__v?.slots10 || []).map((sl, __i0) => (
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
                        {__b(sl?.reward) ? (
                          <>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={sl?.iconColor}
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
                    background: '#fba919',
                    color: '#101827',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    fontWeight: '700',
                  }}
                >
                  {'Reward ready. Give it now or save it for later.'}
                </div>
              </div>{' '}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={__v?.redeemReward}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '18px',
                    borderRadius: '12px',
                    padding: '16px',
                    minHeight: '56px',
                    cursor: 'pointer',
                  }}
                >
                  {'Redeem now'}
                </button>{' '}
                <button
                  type="button"
                  onClick={__v?.toScan}
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
                >
                  {'Save for next visit'}
                </button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.isRedeemed) ? (
          <>
            <div
              style={{
                flex: '1 1 auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'center',
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
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                {'Reward redeemed'}
              </h1>{' '}
              <p style={{ margin: '0', color: '#5b6475', maxWidth: '280px' }}>
                {`Hand ${__t(__v?.custName || 'customer')} their ${__t(__v?.rewardTitle || 'reward')}. Their card is now at ${__v?.currentStamps}/${__v?.maxStamps}.`}
              </p>{' '}
              <p
                style={{
                  margin: '0',
                  fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                  lineHeight: '27px',
                  color: '#5b6475',
                }}
              >
                {'ሽልማቱ ተሰጥቷል።'}
              </p>{' '}
              <button
                type="button"
                onClick={__v?.toScan}
                style={{
                  marginTop: '24px',
                  alignSelf: 'stretch',
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '12px',
                  padding: '16px',
                  minHeight: '56px',
                  cursor: 'pointer',
                }}
              >
                {'Next customer'}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
