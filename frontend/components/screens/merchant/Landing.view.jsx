'use client';
/* Markup for the Landing screen. State and handlers live in Landing.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import Sidebar from './Sidebar';
import ColorPicker from './ColorPicker';

export default function renderLanding(__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1600px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <Sidebar active="landing" />
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
                {'QR LANDING PAGE'}
              </span>{' '}
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                {'Customise what customers see when they scan'}
              </h1>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>
                {'One page behind your QR: the stamp card first, then where to follow you.'}
              </p>
            </div>{' '}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.savedNote)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.save}
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
                {'Save changes'}
              </button>
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ flex: '3 1 460px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      <path d="M5 5h14M12 5v14" />
                    </svg>
                  </span>
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {'Title and tagline'}
                  </h2>
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="lp-title" style={{ fontWeight: '700' }}>
                    {'Page title'}
                  </label>{' '}
                  <input
                    id="lp-title"
                    type="text"
                    value={__v?.title}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      color: '#101827',
                    }}
                    onChange={__v?.onTitle}
                  />{' '}
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>
                    {'Shown instead of your business name. Leave blank to use the business name.'}
                  </span>
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="lp-tag" style={{ fontWeight: '700' }}>
                    {'Tagline'}
                  </label>{' '}
                  <input
                    id="lp-tag"
                    type="text"
                    value={__v?.tagline}
                    placeholder="e.g. Fresh coffee, every visit"
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      color: '#101827',
                    }}
                    onChange={__v?.onTag}
                  />{' '}
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>
                    {'Optional. Shown under the title. Leave blank for none.'}
                  </span>
                </div>
              </section>{' '}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      <path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8z" />
                      <circle cx="7.5" cy="11" r="1" />
                      <circle cx="10" cy="7" r="1" />
                      <circle cx="15" cy="7" r="1" />
                    </svg>
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                      {'Page colour'}
                    </h2>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'The page background. Text and buttons adjust to stay readable.'}
                    </span>
                  </div>
                </div>{' '}
                <ColorPicker
                  value={__v?.color}
                  onChange={__v?.pickColor}
                  presets={__v?.swPresets}
                  idPrefix="lp-color"
                />{' '}
                <button
                  type="button"
                  onClick={__v?.resetColor}
                  style={{
                    alignSelf: 'flex-start',
                    border: '0',
                    background: 'transparent',
                    fontWeight: '700',
                    color: '#4661ad',
                    padding: '6px 0',
                    minHeight: '40px',
                    cursor: 'pointer',
                  }}
                >
                  {'Reset to brand colour'}
                </button>
              </section>{' '}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3v18" />
                    </svg>
                  </span>
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {'Button tint'}
                  </h2>
                </div>{' '}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                  {(__v?.tints || []).map((t, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        aria-pressed={t?.pressed}
                        onClick={t?.pick}
                        style={{
                          borderRadius: '12px',
                          padding: '14px 8px',
                          minHeight: '52px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          background: `${__t(t?.bg)}`,
                          color: '#101827',
                          border: `2px solid ${__t(t?.border)}`,
                        }}
                      >{`${__t(t?.label)}`}</button>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.tintNote)}`}</span>
              </section>{' '}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '14px',
                      color: '#4661ad',
                    }}
                  >
                    {'Aa'}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                      {'Lettering style'}
                    </h2>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'For your title and buttons. The card itself always uses Temelash type.'}
                    </span>
                  </div>
                </div>{' '}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                  {(__v?.styles || []).map((st, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        aria-pressed={st?.pressed}
                        onClick={st?.pick}
                        style={{
                          textAlign: 'left',
                          borderRadius: '12px',
                          padding: '16px',
                          minHeight: '84px',
                          cursor: 'pointer',
                          background: `${__t(st?.bg)}`,
                          color: '#101827',
                          border: `2px solid ${__t(st?.border)}`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        <strong>{`${__t(st?.label)}`}</strong>{' '}
                        <span
                          style={{
                            fontSize: '18px',
                            color: '#5b6475',
                            fontFamily: `${__t(st?.font)}`,
                            fontVariant: `${__t(st?.variant)}`,
                            textTransform: `${__t(st?.transform)}`,
                            letterSpacing: `${__t(st?.spacing)}`,
                          }}
                        >{`${__t(st?.sample)}`}</span>
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </section>{' '}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      background: '#f7f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 15l5-5 5 5 3-3 5 5" />
                    </svg>
                  </span>
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Images'}</h2>
                </div>{' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 0',
                    borderTop: '1px solid #e3e5ec',
                  }}
                >
                  <input
                    type="file"
                    id="landing-cover-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={__v?.onCoverUpload}
                  />
                  {__b(__v?.coverImg) ? (
                    <img
                      src={__v?.coverImg}
                      alt="Cover preview"
                      onClick={() => __v?.viewImage('cover')}
                      title="Click to view full size"
                      style={{
                        width: '72px',
                        height: '48px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        flex: 'none',
                        border: '1px solid #d9dce3',
                      }}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      style={{
                        width: '72px',
                        height: '48px',
                        borderRadius: '8px',
                        flex: 'none',
                        background: `${__t(__v?.coverThumbBg)}`,
                        border: '1px dashed #d9dce3',
                      }}
                    />
                  )}{' '}
                  <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                    <strong>{'Cover photo'}</strong>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {__v?.coverImg
                        ? __v?.coverFileName || 'Cover image uploaded and saved'
                        : 'Wide photo of your counter or product, 1200 × 600 px.'}
                    </span>
                  </span>{' '}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {__b(__v?.coverImg) ? (
                      <>
                        <button
                          type="button"
                          onClick={() => __v?.viewImage('cover')}
                          style={{
                            border: '1px solid #e3e5ec',
                            background: '#ffffff',
                            color: '#101827',
                            fontWeight: '600',
                            fontSize: '13px',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                          }}
                        >
                          {'View'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof document !== 'undefined') {
                              document.getElementById('landing-cover-input')?.click();
                            }
                          }}
                          style={{
                            border: '1px solid #4661ad',
                            background: '#ffffff',
                            color: '#4661ad',
                            fontWeight: '600',
                            fontSize: '13px',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                          }}
                        >
                          {'Change'}
                        </button>
                        <button
                          type="button"
                          onClick={__v?.removeCover}
                          style={{
                            border: '1px solid #fecaca',
                            background: '#fef2f2',
                            color: '#b91c1c',
                            fontWeight: '600',
                            fontSize: '13px',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                          }}
                        >
                          {'Remove'}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof document !== 'undefined') {
                            document.getElementById('landing-cover-input')?.click();
                          }
                        }}
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#101827',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '8px 14px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Upload image'}
                      </button>
                    )}
                  </div>
                </div>{' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 0',
                    borderTop: '1px solid #e3e5ec',
                  }}
                >
                  <input
                    type="file"
                    id="landing-logo-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={__v?.onLogoUpload}
                  />
                  {__b(__v?.logoImg) ? (
                    <img
                      src={__v?.logoImg}
                      alt="Logo preview"
                      onClick={() => __v?.viewImage('logo')}
                      title="Click to view full size"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '999px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        flex: 'none',
                        border: '1px solid #d9dce3',
                      }}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '999px',
                        flex: 'none',
                        background: `${__t(__v?.logoThumbBg)}`,
                        color: '#ffffff',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed #d9dce3',
                      }}
                    >{`${__t(__v?.logoThumbText)}`}</span>
                  )}{' '}
                  <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                    <strong>{'Logo'}</strong>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {__v?.logoImg
                        ? __v?.logoFileName || 'Logo image uploaded and saved'
                        : 'Square, 512 px or larger.'}
                    </span>
                  </span>{' '}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {__b(__v?.logoImg) ? (
                      <>
                        <button
                          type="button"
                          onClick={() => __v?.viewImage('logo')}
                          style={{
                            border: '1px solid #e3e5ec',
                            background: '#ffffff',
                            color: '#101827',
                            fontWeight: '600',
                            fontSize: '13px',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                          }}
                        >
                          {'View'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof document !== 'undefined') {
                              document.getElementById('landing-logo-input')?.click();
                            }
                          }}
                          style={{
                            border: '1px solid #4661ad',
                            background: '#ffffff',
                            color: '#4661ad',
                            fontWeight: '600',
                            fontSize: '13px',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                          }}
                        >
                          {'Change'}
                        </button>
                        <button
                          type="button"
                          onClick={__v?.removeLogo}
                          style={{
                            border: '1px solid #fecaca',
                            background: '#fef2f2',
                            color: '#b91c1c',
                            fontWeight: '600',
                            fontSize: '13px',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                          }}
                        >
                          {'Remove'}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof document !== 'undefined') {
                            document.getElementById('landing-logo-input')?.click();
                          }
                        }}
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#101827',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '8px 14px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Upload image'}
                      </button>
                    )}
                  </div>
                </div>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginBottom: '6px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                      {'Buttons on the page'}
                    </h2>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'Put what earns you the most at the top. The stamp card always stays first.'}
                    </span>
                  </div>{' '}
                  <button
                    type="button"
                    onClick={__v?.addLink}
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      color: '#4661ad',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'+ Add a link'}
                  </button>
                </div>{' '}
                {(__v?.rows || []).map((r, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '12px 0',
                        borderTop: '1px solid #e3e5ec',
                        opacity: `${__t(r?.opacity)}`,
                      }}
                    >
                      <span
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '999px',
                          background: '#f7f7f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 'none',
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
                          <path d={r?.icon} />
                        </svg>
                      </span>{' '}
                      <span style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                        <label
                          htmlFor={r?.inputId}
                          style={{
                            position: 'absolute',
                            width: '1px',
                            height: '1px',
                            overflow: 'hidden',
                            clip: 'rect(0 0 0 0)',
                          }}
                        >
                          {'Button label'}
                        </label>{' '}
                        <input
                          id={r?.inputId}
                          type="text"
                          value={r?.label}
                          style={{
                            border: '1px solid transparent',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            marginLeft: '-6px',
                            fontWeight: '700',
                            color: '#101827',
                            background: 'transparent',
                            minWidth: '0',
                          }}
                          onChange={r?.onLabel}
                        />{' '}
                        <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(r?.sub)}`}</span>{' '}
                        {__b(r?.hasUrl) ? (
                          <>
                            <label
                              htmlFor={r?.urlId}
                              style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px' }}
                            >{`${__t(r?.urlLabel)}`}</label>{' '}
                            <input
                              id={r?.urlId}
                              type="text"
                              value={r?.url}
                              placeholder={r?.urlPh}
                              style={{
                                border: `1px solid ${__t(r?.urlBorder)}`,
                                borderRadius: '6px',
                                padding: '8px 10px',
                                minHeight: '40px',
                                boxSizing: 'border-box',
                                color: '#101827',
                                marginTop: '4px',
                              }}
                              onChange={r?.onUrl}
                            />{' '}
                            {__b(r?.urlMissing) ? (
                              <>
                                <span style={{ fontSize: '13px', color: '#c81d29', marginTop: '4px' }}>
                                  {'Add a link so this button works. Until then it stays hidden on the page.'}
                                </span>
                              </>
                            ) : null}
                          </>
                        ) : null}
                      </span>{' '}
                      <button
                        type="button"
                        aria-label="Move up"
                        disabled={__b(r?.upDisabled)}
                        onClick={r?.up}
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '1px solid #e3e5ec',
                          borderRadius: '8px',
                          background: '#ffffff',
                          cursor: 'pointer',
                          color: `${__t(r?.upColor)}`,
                        }}
                      >
                        {'↑'}
                      </button>{' '}
                      <button
                        type="button"
                        aria-label="Move down"
                        disabled={__b(r?.downDisabled)}
                        onClick={r?.down}
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '1px solid #e3e5ec',
                          borderRadius: '8px',
                          background: '#ffffff',
                          cursor: 'pointer',
                          color: `${__t(r?.downColor)}`,
                        }}
                      >
                        {'↓'}
                      </button>{' '}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={r?.checked}
                        aria-label="Show button"
                        disabled={__b(r?.locked)}
                        onClick={r?.toggle}
                        style={{
                          width: '48px',
                          height: '28px',
                          borderRadius: '999px',
                          border: '0',
                          padding: '3px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: `${__t(r?.justify)}`,
                          background: `${__t(r?.track)}`,
                          flex: 'none',
                        }}
                      >
                        <span
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '999px',
                            background: '#ffffff',
                            display: 'block',
                          }}
                        />
                      </button>{' '}
                      {__b(r?.canDelete) ? (
                        <>
                          <button
                            type="button"
                            aria-label={r?.delLabel}
                            onClick={r?.remove}
                            style={{
                              width: '36px',
                              height: '36px',
                              border: '1px solid #e3e5ec',
                              borderRadius: '8px',
                              background: '#ffffff',
                              cursor: 'pointer',
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
                              stroke="#c81d29"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                            </svg>
                          </button>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </div>{' '}
            <aside
              aria-label="Preview"
              className="pv-sticky"
              style={{ flex: '2 1 340px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 4px 12px rgba(16,24,39,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    onClick={__v?.openQrModal}
                    title="Click to enlarge QR code"
                    role="button"
                    tabIndex={0}
                    style={{
                      width: '96px',
                      height: '96px',
                      flex: 'none',
                      background: '#ffffff',
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '8px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                  >
                    <QRCodeDisplay value={__v?.liveLandingUrl} size={80} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '11px',
                          fontWeight: '700',
                          color: '#059669',
                          background: '#ecfdf5',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          border: '1px solid #a7f3d0',
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                        PUBLIC MERCHANT LINK
                      </span>
                    </div>
                    <strong style={{ fontSize: '16px', color: '#101827', fontWeight: '700' }}>
                      Try your live page
                    </strong>
                    <span style={{ fontSize: '13px', color: '#64748b', lineHeight: '18px' }}>
                      Scan or share with customers to view stamp card & links.
                    </span>
                  </div>
                </div>

                {/* Link URL pill & actions */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      color: '#0f172a',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      flex: 1,
                      minWidth: 0,
                    }}
                    title={__v?.liveLandingUrl}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {__v?.liveLandingUrl}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={__v?.copyLink}
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '6px',
                        background: __v?.copied ? '#059669' : '#ffffff',
                        color: __v?.copied ? '#ffffff' : '#0f172a',
                        border: __v?.copied ? '1px solid #059669' : '1px solid #cbd5e1',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {__v?.copied ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                          Copy
                        </>
                      )}
                    </button>
                    <a
                      href={__v?.liveLandingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '6px',
                        background: '#101827',
                        color: '#ffffff',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'opacity 0.15s ease',
                      }}
                    >
                      Open
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </a>
                  </div>
                </div>
              </div>{' '}
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'PREVIEW'}
              </span>{' '}
              <div
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  maxWidth: '340px',
                  background: '#101827',
                  borderRadius: '48px',
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    background: `${__t(__v?.color)}`,
                    borderRadius: '40px',
                    minHeight: '640px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {__b(__v?.cover) ? (
                    <>
                      <div
                        style={{
                          height: '130px',
                          background: __v?.coverImg
                            ? `url(${__v.coverImg}) center / cover no-repeat`
                            : `${__t(__v?.coverBg)}`,
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-start',
                          padding: '10px 14px',
                          boxSizing: 'border-box',
                        }}
                      >
                        {!__v?.coverImg ? (
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: '700',
                              letterSpacing: '0.08em',
                              color: '#ffffff',
                              background: 'rgba(16,24,39,0.55)',
                              borderRadius: '999px',
                              padding: '2px 8px',
                            }}
                          >
                            {'COVER PHOTO'}
                          </span>
                        ) : null}
                      </div>
                    </>
                  ) : null}{' '}
                  <div
                    style={{
                      padding: `${__t(__v?.headPad)}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      textAlign: 'center',
                    }}
                  >
                    {__b(__v?.logo) ? (
                      <>
                        {__v?.logoImg ? (
                          <img
                            src={__v?.logoImg}
                            alt="Logo"
                            style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '999px',
                              objectFit: 'cover',
                              marginBottom: '4px',
                              boxShadow: `0 0 0 3px ${__t(__v?.logoRing)}`,
                              marginTop: `${__t(__v?.logoLift)}`,
                              background: '#ffffff',
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '999px',
                              background: '#ffffff',
                              color: `${__t(__v?.color)}`,
                              fontWeight: '800',
                              fontSize: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '4px',
                              boxShadow: `0 0 0 3px ${__t(__v?.logoRing)}`,
                              marginTop: `${__t(__v?.logoLift)}`,
                            }}
                          >{`${__t(__v?.initial)}`}</span>
                        )}
                      </>
                    ) : null}{' '}
                    <span
                      style={{
                        fontSize: '26px',
                        lineHeight: '32px',
                        fontWeight: '700',
                        color: `${__t(__v?.ink)}`,
                        fontFamily: `${__t(__v?.sFont)}`,
                        fontVariant: `${__t(__v?.sVariant)}`,
                        textTransform: `${__t(__v?.sTransform)}`,
                        letterSpacing: `${__t(__v?.sSpacing)}`,
                      }}
                    >{`${__t(__v?.shownTitle)}`}</span>{' '}
                    {__b(__v?.hasTagline) ? (
                      <>
                        <span
                          style={{
                            fontSize: '16px',
                            lineHeight: '22px',
                            color: `${__t(__v?.ink)}`,
                            opacity: '0.85',
                            fontFamily: `${__t(__v?.sFont)}`,
                            fontVariant: `${__t(__v?.sVariant)}`,
                            textTransform: `${__t(__v?.sTransform)}`,
                            letterSpacing: `${__t(__v?.sSpacing)}`,
                          }}
                        >{`${__t(__v?.tagline)}`}</span>
                      </>
                    ) : null}
                  </div>{' '}
                  <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(__v?.pvButtons || []).map((b, __i0) => (
                      <React.Fragment key={__i0}>
                        <div
                          style={{
                            background: `${__t(b?.bg)}`,
                            color: `${__t(b?.fg)}`,
                            borderRadius: '14px',
                            padding: '12px 14px',
                            minHeight: '64px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 1px 0 rgba(16,24,39,0.06)',
                          }}
                        >
                          <span
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '999px',
                              background: `${__t(b?.tile)}`,
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
                              stroke={b?.iconColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d={b?.icon} />
                            </svg>
                          </span>{' '}
                          <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minWidth: '0' }}>
                            <span
                              style={{
                                fontWeight: '700',
                                fontSize: '16px',
                                lineHeight: '20px',
                                fontFamily: `${__t(__v?.sFont)}`,
                                fontVariant: `${__t(__v?.sVariant)}`,
                                textTransform: `${__t(__v?.sTransform)}`,
                                letterSpacing: `${__t(__v?.sSpacing)}`,
                              }}
                            >{`${__t(b?.label)}`}</span>
                            {__b(b?.hasSub) ? (
                              <>
                                <span
                                  style={{ fontSize: '12px', lineHeight: '16px', opacity: '0.75' }}
                                >{`${__t(b?.sub)}`}</span>
                              </>
                            ) : null}
                          </span>{' '}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{ opacity: '0.6' }}
                          >
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <div style={{ flex: '1 1 auto' }} />{' '}
                  <div
                    style={{
                      padding: '24px 0 28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: `${__t(__v?.ink)}`,
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
                        stroke={__v?.markRed}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>{' '}
                    <span style={{ fontWeight: '800', letterSpacing: '0.03em', fontSize: '13px' }}>
                      {'TEMELASH CARD'}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
      {__b(__v?.viewImgModal) ? (
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
          onClick={__v?.closeImgModal}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '520px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={{ fontWeight: '700', fontSize: '18px' }}>
                {__v?.viewImgModal === 'cover' ? 'Saved Cover Photo' : 'Saved Business Logo'}
              </span>
              <button
                type="button"
                onClick={__v?.closeImgModal}
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
            <img
              src={__v?.viewImgModal === 'cover' ? __v?.coverImg : __v?.logoImg}
              alt="Full Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '340px',
                borderRadius: '12px',
                border: '1px solid #e3e5ec',
                objectFit: 'contain',
              }}
            />
            <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'flex-end' }}>
              <a
                href={__v?.viewImgModal === 'cover' ? __v?.coverImg : __v?.logoImg}
                download={__v?.viewImgModal === 'cover' ? 'cover-photo.png' : 'brand-logo.png'}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#4661ad',
                  color: '#ffffff',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                Download File
              </a>
              <button
                type="button"
                onClick={__v?.closeImgModal}
                style={{
                  padding: '8px 16px',
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
      {__v?.qrModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={__v?.closeQrModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(16,24,39,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '28px',
              maxWidth: '380px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <strong style={{ fontSize: '18px', color: '#101827' }}>Customer Landing QR</strong>
              <button
                type="button"
                onClick={__v?.closeQrModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Scan with any mobile camera to open your live merchant landing page:
              </p>
              <span style={{ fontSize: '11px', color: '#4661ad', background: '#eef2ff', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', fontFamily: 'monospace' }}>
                Merchant · {__v?.merchantCode}
              </span>
            </div>
            <div
              style={{
                background: '#ffffff',
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px',
                display: 'inline-flex',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <QRCodeDisplay value={__v?.liveLandingUrl} size={220} />
            </div>
            <div
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontFamily: 'monospace',
                color: '#334155',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {__v?.liveLandingUrl}
            </div>
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <button
                type="button"
                onClick={__v?.copyLink}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: __v?.copied ? '#059669' : '#ffffff',
                  color: __v?.copied ? '#ffffff' : '#101827',
                  border: __v?.copied ? '1px solid #059669' : '1px solid #cbd5e1',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {__v?.copied ? '✓ Copied URL' : '📋 Copy URL'}
              </button>
              <a
                href={__v?.liveLandingUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: '#101827',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '13px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                Open Page ↗
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
