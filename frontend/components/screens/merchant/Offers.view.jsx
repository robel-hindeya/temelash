'use client';
/* Markup for the Offers screen. State and handlers live in Offers.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default function renderOffers(__v) {
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
          <Sidebar active="offers" />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
              {'Offers and reminders'}
            </h1>{' '}
            <p style={{ margin: '0', color: '#5b6475' }}>
              {'Reach customers on their lock screen through the saved card. Email and SMS are coming soon.'}
            </p>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <section
              aria-label="New message"
              style={{
                flex: '3 1 460px',
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
              <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'New message'}</h2>{' '}
              <fieldset
                style={{
                  border: '0',
                  padding: '0',
                  margin: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>
                  {'1. What do you want customers to do?'}
                </legend>{' '}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}
                >
                  {(__v?.kinds || []).map((k, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        aria-pressed={k?.pressed}
                        onClick={k?.pick}
                        style={{
                          textAlign: 'left',
                          borderRadius: '12px',
                          padding: '14px',
                          cursor: 'pointer',
                          background: `${__t(k?.bg)}`,
                          color: '#101827',
                          border: `2px solid ${__t(k?.border)}`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
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
                          <path d={k?.icon} />
                        </svg>{' '}
                        <strong>{`${__t(k?.label)}`}</strong>
                        <span
                          style={{ fontSize: '14px', lineHeight: '20px', color: '#5b6475' }}
                        >{`${__t(k?.desc)}`}</span>
                      </button>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <div
                  style={{
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
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
                    {'WHAT HAPPENS WHEN YOU SEND'}
                  </span>{' '}
                  {(__v?.effects || []).map((e, __i0) => (
                    <React.Fragment key={__i0}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
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
                          style={{ flex: 'none', marginTop: '2px' }}
                        >
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                        <span>{`${__t(e?.t)}`}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>{' '}
                {__b(__v?.isOffer) ? (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="of-until" style={{ fontWeight: '700' }}>
                          {'Offer ends'}
                        </label>
                        <input
                          id="of-until"
                          type="date"
                          defaultValue="2026-10-25"
                          style={{
                            border: '1px solid #e3e5ec',
                            borderRadius: '6px',
                            padding: '12px 14px',
                            minHeight: '48px',
                            boxSizing: 'border-box',
                            color: '#101827',
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : null}{' '}
                {__b(__v?.isDouble) ? (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="of-from" style={{ fontWeight: '700' }}>
                          {'Double stamps from'}
                        </label>
                        <input
                          id="of-from"
                          type="date"
                          defaultValue="2026-10-21"
                          style={{
                            border: '1px solid #e3e5ec',
                            borderRadius: '6px',
                            padding: '12px 14px',
                            minHeight: '48px',
                            boxSizing: 'border-box',
                            color: '#101827',
                          }}
                        />
                      </div>{' '}
                      <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="of-to" style={{ fontWeight: '700' }}>
                          {'Until'}
                        </label>
                        <input
                          id="of-to"
                          type="date"
                          defaultValue="2026-10-25"
                          style={{
                            border: '1px solid #e3e5ec',
                            borderRadius: '6px',
                            padding: '12px 14px',
                            minHeight: '48px',
                            boxSizing: 'border-box',
                            color: '#101827',
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : null}
              </fieldset>{' '}
              <fieldset
                style={{ border: '0', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>{'2. Who gets it?'}</legend>{' '}
                {(__v?.audiences || []).map((a, __i0) => (
                  <React.Fragment key={__i0}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: `1px solid ${__t(a?.border)}`,
                        borderRadius: '12px',
                        padding: '12px 14px',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="radio"
                        name="aud"
                        checked={__b(a?.checked)}
                        onChange={a?.pick}
                        style={{ width: '18px', height: '18px' }}
                      />{' '}
                      <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <strong>{`${__t(a?.label)}`}</strong>
                          {__b(a?.suggested) ? (
                            <>
                              <span
                                style={{
                                  fontSize: '12px',
                                  lineHeight: '16px',
                                  fontWeight: '700',
                                  letterSpacing: '0.08em',
                                  color: '#4661ad',
                                  border: '1px solid #4661ad',
                                  borderRadius: '999px',
                                  padding: '0 8px',
                                }}
                              >
                                {'SUGGESTED'}
                              </span>
                            </>
                          ) : null}
                        </span>
                        <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(a?.desc)}`}</span>
                      </span>{' '}
                      <span style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}>{`${__t(a?.n)}`}</span>
                    </label>
                  </React.Fragment>
                ))}
              </fieldset>{' '}
              <fieldset
                style={{ border: '0', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>{'3. Send it as'}</legend>{' '}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <label
                    style={{
                      flex: '1 1 200px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={__b(__v?.chWallet)}
                      onChange={__v?.toggleWallet}
                      style={{ width: '18px', height: '18px', marginTop: '3px' }}
                    />
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong>{'Wallet notification'}</strong>
                      <span
                        style={{ fontSize: '14px', color: '#5b6475' }}
                      >{`Apple and Google Wallet · ${__t(__v?.walletN)} people`}</span>
                    </span>
                  </label>{' '}
                  <div
                    aria-disabled="true"
                    style={{
                      flex: '1 1 200px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      border: '1px dashed #e3e5ec',
                      background: '#f7f7f9',
                      borderRadius: '12px',
                      padding: '12px 14px',
                    }}
                  >
                    <input
                      type="checkbox"
                      disabled={true}
                      aria-label="Email, coming soon"
                      style={{ width: '18px', height: '18px', marginTop: '3px' }}
                    />
                    <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <strong style={{ color: '#5b6475' }}>{'Email'}</strong>
                        <span
                          style={{
                            fontSize: '12px',
                            lineHeight: '16px',
                            fontWeight: '700',
                            letterSpacing: '0.08em',
                            color: '#4661ad',
                            border: '1px solid #4661ad',
                            borderRadius: '999px',
                            padding: '0 8px',
                          }}
                        >
                          {'COMING SOON'}
                        </span>
                      </span>
                      <span
                        style={{ fontSize: '14px', color: '#5b6475' }}
                      >{`${__t(__v?.emailN)} people have shared an email`}</span>
                    </span>
                  </div>{' '}
                  <div
                    aria-disabled="true"
                    style={{
                      flex: '1 1 200px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      border: '1px dashed #e3e5ec',
                      background: '#f7f7f9',
                      borderRadius: '12px',
                      padding: '12px 14px',
                    }}
                  >
                    <input
                      type="checkbox"
                      disabled={true}
                      aria-label="SMS, coming soon"
                      style={{ width: '18px', height: '18px', marginTop: '3px' }}
                    />
                    <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <strong style={{ color: '#5b6475' }}>{'SMS'}</strong>
                        <span
                          style={{
                            fontSize: '12px',
                            lineHeight: '16px',
                            fontWeight: '700',
                            letterSpacing: '0.08em',
                            color: '#4661ad',
                            border: '1px solid #4661ad',
                            borderRadius: '999px',
                            padding: '0 8px',
                          }}
                        >
                          {'COMING SOON'}
                        </span>
                      </span>
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>
                        {'Reach any phone, even without a wallet app'}
                      </span>
                    </span>
                  </div>
                </div>
              </fieldset>{' '}
              <fieldset
                style={{
                  border: '0',
                  padding: '0',
                  margin: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>{'4. Message'}</legend>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="of-en" style={{ fontWeight: '700', fontSize: '14px' }}>
                    {'English'}
                  </label>{' '}
                  <textarea
                    id="of-en"
                    rows="2"
                    value={__v?.en}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      resize: 'vertical',
                      color: '#101827',
                    }}
                    onChange={__v?.onEn}
                  />
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="of-am" style={{ fontWeight: '700', fontSize: '14px' }}>
                    {'Amharic'}
                  </label>{' '}
                  <textarea
                    id="of-am"
                    rows="2"
                    value={__v?.am}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      resize: 'vertical',
                      color: '#101827',
                      fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                      lineHeight: '27px',
                    }}
                    onChange={__v?.onAm}
                  />
                </div>{' '}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={__v?.addName}
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
                  >
                    {'+ First name'}
                  </button>{' '}
                  <button
                    type="button"
                    onClick={__v?.addStamps}
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
                  >
                    {'+ Stamps to go'}
                  </button>{' '}
                  <button
                    type="button"
                    onClick={__v?.resetMsg}
                    style={{
                      border: '0',
                      background: 'transparent',
                      color: '#5b6475',
                      fontWeight: '700',
                      fontSize: '14px',
                      padding: '6px 4px',
                      minHeight: '36px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Reset to suggested text'}
                  </button>
                </div>{' '}
                <span style={{ fontSize: '14px', color: '#5b6475' }}>
                  {'Each customer sees their own name and count. The preview shows Liya, who has 7 of 10 stamps.'}
                </span>
              </fieldset>{' '}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="of-when" style={{ fontWeight: '700' }}>
                    {'Send'}
                  </label>
                  <select
                    id="of-when"
                    value={__v?.when}
                    onChange={__v?.onWhen}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                  >
                    <option value="now">{'Now'}</option>
                    <option value="tomorrow">{'Tomorrow at 8:00'}</option>
                    <option value="pick">{'Pick a date and time…'}</option>
                  </select>
                </div>{' '}
                {__b(__v?.isPick) ? (
                  <>
                    <div style={{ flex: '1 1 160px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="of-date" style={{ fontWeight: '700' }}>
                        {'Date'}
                      </label>
                      <input
                        id="of-date"
                        type="date"
                        min="2026-10-21"
                        value={__v?.pickDate}
                        style={{
                          border: '1px solid #e3e5ec',
                          borderRadius: '6px',
                          padding: '12px 14px',
                          minHeight: '48px',
                          boxSizing: 'border-box',
                          color: '#101827',
                        }}
                        onChange={__v?.onDate}
                      />
                    </div>{' '}
                    <div style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="of-time" style={{ fontWeight: '700' }}>
                        {'Time'}
                      </label>
                      <input
                        id="of-time"
                        type="time"
                        value={__v?.pickTime}
                        style={{
                          border: '1px solid #e3e5ec',
                          borderRadius: '6px',
                          padding: '12px 14px',
                          minHeight: '48px',
                          boxSizing: 'border-box',
                          color: '#101827',
                        }}
                        onChange={__v?.onTime}
                      />
                    </div>{' '}
                    <div
                      style={{ flex: '1 1 100%', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}
                    >
                      <span style={{ fontSize: '14px', color: '#5b6475', marginRight: '4px' }}>{'Quick picks:'}</span>{' '}
                      {(__v?.quick || []).map((qp, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            onClick={qp?.pick}
                            style={{
                              border: '1px solid #e3e5ec',
                              background: '#ffffff',
                              color: '#101827',
                              fontWeight: '700',
                              fontSize: '14px',
                              borderRadius: '999px',
                              padding: '6px 12px',
                              minHeight: '36px',
                              cursor: 'pointer',
                            }}
                          >{`${__t(qp?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : null}{' '}
                <div
                  style={{
                    flex: '1 1 100%',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '10px 14px',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4661ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  <span style={{ fontWeight: '600' }}>{`${__t(__v?.whenSummary)}`}</span>
                </div>
              </div>{' '}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  borderTop: '1px solid #e3e5ec',
                  paddingTop: '20px',
                }}
              >
                <button
                  type="button"
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#4661ad',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '12px 18px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >
                  {'Send me a test'}
                </button>{' '}
                <button
                  type="button"
                  onClick={__v?.send}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '12px 22px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.sendLabel)}`}</button>
              </div>{' '}
              {__b(__v?.justSent) ? (
                <>
                  <div
                    role="status"
                    style={{ background: '#f7f7f9', borderRadius: '12px', padding: '12px 14px', fontWeight: '700' }}
                  >{`${__t(__v?.sentNote)}`}</div>
                </>
              ) : null}
            </section>{' '}
            <aside
              aria-label="Preview"
              className="pv-sticky"
              style={{
                flex: '2 1 340px',
                minWidth: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                  }}
                >
                  {'PREVIEW · WHAT LIYA SEES'}
                </span>{' '}
                <div
                  role="tablist"
                  aria-label="Preview on"
                  style={{
                    display: 'flex',
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '4px',
                    gap: '4px',
                  }}
                >
                  {(__v?.devices || []).map((d, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={d?.sel}
                        onClick={d?.pick}
                        style={{
                          flex: '1 1 0',
                          border: '0',
                          borderRadius: '8px',
                          padding: '8px 6px',
                          minHeight: '40px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          fontSize: '14px',
                          background: `${__t(d?.bg)}`,
                          color: `${__t(d?.color)}`,
                        }}
                      >{`${__t(d?.label)}`}</button>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <div
                  role="group"
                  aria-label="Preview language"
                  style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}
                >
                  {(__v?.langs || []).map((l, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        aria-pressed={l?.pressed}
                        onClick={l?.pick}
                        style={{
                          borderRadius: '999px',
                          padding: '4px 12px',
                          minHeight: '32px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          fontSize: '13px',
                          background: `${__t(l?.bg)}`,
                          color: `${__t(l?.color)}`,
                          border: `1px solid ${__t(l?.border)}`,
                        }}
                      >{`${__t(l?.label)}`}</button>
                    </React.Fragment>
                  ))}
                </div>
              </div>{' '}
              {__b(__v?.isApple) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      background: '#101827',
                      borderRadius: '40px',
                      padding: '44px 14px 28px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      minHeight: '560px',
                    }}
                  >
                    <span style={{ alignSelf: 'center', fontSize: '13px', color: '#9aa3b5', fontWeight: '600' }}>
                      {'iPhone · lock screen'}
                    </span>{' '}
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.92)',
                        borderRadius: '20px',
                        padding: '12px 14px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          background: '#8a4b2a',
                          color: '#ffffff',
                          fontWeight: '800',
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
                          color: '#101827',
                          minWidth: '0',
                        }}
                      >
                        <span style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                          <strong>{'Buna House'}</strong>
                          <span style={{ color: '#5b6475', fontSize: '12px' }}>{'now'}</span>
                        </span>
                        <span
                          style={{ whiteSpace: 'pre-wrap', fontFamily: `${__t(__v?.pvFont)}` }}
                        >{`${__t(__v?.pv)}`}</span>
                      </span>
                    </div>{' '}
                    <div style={{ marginTop: 'auto', background: '#ffffff', borderRadius: '20px', overflow: 'hidden' }}>
                      <div style={{ height: '8px', background: '#8a4b2a' }} />{' '}
                      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong>{'Buna House'}</strong>
                          <span style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}>{'7/10'}</span>
                        </div>{' '}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, minmax(0, 1fr))', gap: '4px' }}>
                          {(__v?.dots || []).map((o, __i0) => (
                            <React.Fragment key={__i0}>
                              <span
                                style={{
                                  aspectRatio: '1',
                                  borderRadius: '999px',
                                  boxSizing: 'border-box',
                                  background: `${__t(o?.bg)}`,
                                  border: `2px solid ${__t(o?.border)}`,
                                }}
                              />
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        <div
                          style={{
                            background: `${__t(__v?.bannerBg)}`,
                            color: '#101827',
                            borderRadius: '10px',
                            padding: '8px 10px',
                            fontSize: '13px',
                            lineHeight: '18px',
                            fontWeight: '700',
                          }}
                        >{`${__t(__v?.banner)}`}</div>{' '}
                        <div
                          style={{
                            alignSelf: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '6px',
                            background: '#ffffff',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            marginTop: '2px',
                          }}
                          onClick={__v?.openQrModal}
                          title="Click to enlarge QR code"
                        >
                          <QRCodeDisplay
                            value={__v?.cardUrl || 'https://frontend-phi-one-57.vercel.app/card?token=demo-card-liya-01'}
                            size={72}
                            darkColor="#101827"
                          />
                          <span style={{ fontSize: '10px', color: '#5b6475', fontFamily: 'monospace', fontWeight: '700', marginTop: '2px' }}>
                            {`${__t(__v?.memberCode || 'SAMPLE-8842')}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.isGoogle) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      background: '#1b2436',
                      borderRadius: '32px',
                      padding: '40px 14px 28px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      minHeight: '560px',
                    }}
                  >
                    <span style={{ alignSelf: 'center', fontSize: '13px', color: '#9aa3b5', fontWeight: '600' }}>
                      {'Android · notification'}
                    </span>{' '}
                    <div
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        padding: '12px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
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
                        <span style={{ width: '16px', height: '16px', borderRadius: '999px', background: '#8a4b2a' }} />
                        {'Google Wallet · Buna House · now'}
                      </span>{' '}
                      <span
                        style={{
                          fontSize: '14px',
                          lineHeight: '19px',
                          color: '#101827',
                          whiteSpace: 'pre-wrap',
                          fontFamily: `${__t(__v?.pvFont)}`,
                        }}
                      >{`${__t(__v?.pv)}`}</span>
                    </div>{' '}
                    <div
                      style={{
                        marginTop: 'auto',
                        background: '#8a4b2a',
                        borderRadius: '24px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        color: '#ffffff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '999px',
                            background: '#ffffff',
                            color: '#8a4b2a',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {'B'}
                        </span>
                        <strong>{'Buna House'}</strong>
                      </div>{' '}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span
                          style={{ fontSize: '12px', lineHeight: '16px', fontWeight: '700', letterSpacing: '0.08em' }}
                        >
                          {'STAMPS'}
                        </span>
                        <span
                          style={{
                            fontSize: '28px',
                            lineHeight: '32px',
                            fontWeight: '800',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {'7/10'}
                        </span>
                      </div>{' '}
                      <div
                        style={{
                          background: `${__t(__v?.bannerBg)}`,
                          color: '#101827',
                          borderRadius: '10px',
                          padding: '8px 10px',
                          fontSize: '13px',
                          lineHeight: '18px',
                          fontWeight: '700',
                        }}
                      >{`${__t(__v?.banner)}`}</div>{' '}
                      <div
                        style={{
                          background: '#ffffff',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          cursor: 'pointer',
                        }}
                        onClick={__v?.openQrModal}
                        title="Click to enlarge QR code"
                      >
                        <QRCodeDisplay
                          value={__v?.cardUrl || 'https://frontend-phi-one-57.vercel.app/card?token=demo-card-liya-01'}
                          size={46}
                          darkColor="#101827"
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '10px', color: '#5b6475', fontWeight: '700', letterSpacing: '0.04em' }}>
                            MEMBER QR CODE
                          </span>
                          <span style={{ fontSize: '13px', color: '#101827', fontWeight: '800', fontFamily: 'monospace' }}>
                            {`${__t(__v?.memberCode || 'SAMPLE-8842')}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.isWeb) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '330px',
                      background: '#f4f5f7',
                      border: '1px solid #e3e5ec',
                      borderRadius: '52px',
                      padding: '12px',
                      boxSizing: 'border-box',
                      boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                    }}
                  >
                    <div
                      style={{
                        background: '#e9ebf0',
                        borderRadius: '42px',
                        minHeight: '600px',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '150px',
                          height: '28px',
                          background: '#f4f5f7',
                          borderRadius: '0 0 18px 18px',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '10px',
                            transform: 'translateX(-50%)',
                            width: '40px',
                            height: '4px',
                            borderRadius: '999px',
                            background: '#e3e5ec',
                          }}
                        />
                      </div>{' '}
                      <div
                        style={{
                          padding: '12px 22px 0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          fontSize: '13px',
                          lineHeight: '15px',
                          fontWeight: '700',
                        }}
                      >
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                          {'4:16'}
                          <span style={{ fontSize: '10px', fontWeight: '600' }}>{'◂ Safari'}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          style={{ display: 'flex', gap: '4px', alignItems: 'center', paddingTop: '2px' }}
                        >
                          <span style={{ display: 'flex', gap: '1px', alignItems: 'flex-end' }}>
                            <span style={{ width: '3px', height: '4px', background: '#101827' }} />
                            <span style={{ width: '3px', height: '6px', background: '#101827' }} />
                            <span style={{ width: '3px', height: '8px', background: '#101827' }} />
                            <span style={{ width: '3px', height: '10px', background: '#101827' }} />
                          </span>
                          <span
                            style={{
                              width: '20px',
                              height: '10px',
                              border: '1.5px solid #101827',
                              borderRadius: '3px',
                              boxSizing: 'border-box',
                              padding: '1px',
                            }}
                          >
                            <span
                              style={{
                                display: 'block',
                                width: '70%',
                                height: '100%',
                                background: '#101827',
                                borderRadius: '1px',
                              }}
                            />
                          </span>
                        </span>
                      </div>{' '}
                      <div
                        style={{
                          padding: '14px 18px 12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontWeight: '700', fontSize: '16px' }}>{'Done'}</span>
                        <span
                          aria-hidden="true"
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '999px',
                            background: '#101827',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '2px',
                          }}
                        >
                          <span style={{ width: '3px', height: '3px', borderRadius: '999px', background: '#ffffff' }} />
                          <span style={{ width: '3px', height: '3px', borderRadius: '999px', background: '#ffffff' }} />
                          <span style={{ width: '3px', height: '3px', borderRadius: '999px', background: '#ffffff' }} />
                        </span>
                      </div>{' '}
                      <div
                        style={{
                          margin: '0 12px',
                          background: '#ffffff',
                          borderRadius: '8px',
                          boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                          padding: '18px 16px 20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '18px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '999px',
                                background: '#101827',
                                color: '#ffffff',
                                fontWeight: '800',
                                fontSize: '14px',
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
                                fontSize: '10px',
                                lineHeight: '10px',
                                fontWeight: '800',
                                letterSpacing: '0.03em',
                              }}
                            >
                              {'BUNA'}
                              <span>{'HOUSE'}</span>
                            </span>
                          </span>{' '}
                          <span style={{ fontSize: '13px', fontWeight: '600', fontVariantNumeric: 'tabular-nums' }}>
                            {'07 Stamps'}
                          </span>
                        </div>{' '}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                            gap: '10px',
                            padding: '0 4px',
                          }}
                        >
                          {(__v?.webSlots || []).map((w, __i0) => (
                            <React.Fragment key={__i0}>
                              <span
                                style={{
                                  aspectRatio: '1',
                                  borderRadius: '999px',
                                  boxSizing: 'border-box',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: `${__t(w?.bg)}`,
                                  border: `1.5px solid ${__t(w?.border)}`,
                                }}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke={w?.check}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d={w?.path} />
                                </svg>
                              </span>
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontSize: '11px', color: '#5b6475' }}>{'Expiry Date'}</span>
                            <span style={{ fontSize: '13px', fontWeight: '700' }}>{'30 Nov 2026'}</span>
                          </span>{' '}
                          <span
                            style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' }}
                          >
                            <span style={{ fontSize: '11px', color: '#5b6475' }}>{'Last Update'}</span>
                            <span style={{ fontSize: '13px', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}>
                              {'10:42 20/10'}
                            </span>
                          </span>
                        </div>{' '}
                        <div
                          style={{
                            minHeight: '88px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '6px',
                          }}
                        >
                          <span style={{ fontSize: '11px', color: '#5b6475' }}>{'Message from Buna House'}</span>{' '}
                          <span
                            style={{
                              background: `${__t(__v?.bannerBg)}`,
                              borderRadius: '8px',
                              padding: '8px 10px',
                              fontSize: '13px',
                              lineHeight: '18px',
                              fontWeight: '600',
                              whiteSpace: 'pre-wrap',
                              fontFamily: `${__t(__v?.pvFont)}`,
                            }}
                          >{`${__t(__v?.pv)}`}</span>
                        </div>{' '}
                        <div
                          style={{
                            alignSelf: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            background: '#ffffff',
                            borderRadius: '14px',
                            border: '1px solid #e3e5ec',
                            boxShadow: '0 4px 12px rgba(16, 24, 39, 0.08)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onClick={__v?.openQrModal}
                          title="Click to enlarge QR code or open live card"
                        >
                          <QRCodeDisplay
                            value={__v?.cardUrl || 'https://frontend-phi-one-57.vercel.app/card?token=demo-card-liya-01'}
                            size={100}
                            darkColor="#101827"
                          />
                          <span
                            style={{
                              fontSize: '11px',
                              color: '#5b6475',
                              fontFamily: 'monospace',
                              letterSpacing: '0.04em',
                              marginTop: '6px',
                              fontWeight: '700',
                            }}
                          >
                            {`${__t(__v?.memberCode || 'SAMPLE-8842')}`}
                          </span>
                        </div>
                      </div>{' '}
                      <div style={{ flex: '1 1 auto' }} />{' '}
                      <span
                        aria-hidden="true"
                        style={{
                          alignSelf: 'center',
                          width: '120px',
                          height: '5px',
                          borderRadius: '999px',
                          background: '#101827',
                          margin: '16px 0 10px',
                        }}
                      />
                    </div>
                  </div>{' '}
                  <p
                    style={{ margin: '0', fontSize: '14px', color: '#5b6475', textAlign: 'center', maxWidth: '320px' }}
                  >
                    {
                      'Web cards get no lock-screen alert. Liya sees the message on her card the next time she opens it.'
                    }
                  </p>
                </>
              ) : null}{' '}
              {__b(__v?.isEmail) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '340px',
                      background: '#ffffff',
                      border: '1px solid #e3e5ec',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        padding: '14px 16px',
                        borderBottom: '1px solid #e3e5ec',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        fontSize: '14px',
                        lineHeight: '20px',
                      }}
                    >
                      <span>
                        <strong>{'Buna House'}</strong> <span style={{ color: '#5b6475' }}>{'via Temelash Card'}</span>
                      </span>{' '}
                      <span style={{ color: '#5b6475' }}>{'To: liya.m@[email]'}</span>{' '}
                      <strong style={{ fontSize: '16px' }}>{`${__t(__v?.subject)}`}</strong>
                    </div>{' '}
                    <div style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ height: '6px', width: '48px', background: '#8a4b2a', borderRadius: '999px' }} />{' '}
                      <span
                        style={{ whiteSpace: 'pre-wrap', fontFamily: `${__t(__v?.pvFont)}` }}
                      >{`${__t(__v?.pv)}`}</span>{' '}
                      <div
                        style={{
                          background: '#f7f7f9',
                          borderRadius: '12px',
                          padding: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontWeight: '700' }}>{'Your card'}</span>
                        <span style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}>{'7/10 stamps'}</span>
                      </div>{' '}
                      <span
                        style={{
                          alignSelf: 'flex-start',
                          background: '#101827',
                          color: '#ffffff',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 16px',
                        }}
                      >
                        {'Open my card'}
                      </span>{' '}
                      <span style={{ fontSize: '12px', lineHeight: '16px', color: '#5b6475' }}>
                        {"You get this because you joined Buna House's card. Unsubscribe."}
                      </span>
                    </div>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.emailOff) ? (
                <>
                  <p style={{ margin: '0', fontSize: '14px', color: '#5b6475', textAlign: 'center' }}>
                    {'Email is off for this message. Tick Email in step 3 to send it there too.'}
                  </p>
                </>
              ) : null}
            </aside>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Sent'}</h2>
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
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '680px' }}>
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
                    <th scope="col" style={{ padding: '8px 12px 8px 0', fontWeight: '700' }}>
                      {'MESSAGE'}
                    </th>
                    <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                      {'TYPE'}
                    </th>
                    <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                      {'TO'}
                    </th>
                    <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                      {'VIA'}
                    </th>
                    <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                      {'SENT'}
                    </th>
                    <th scope="col" style={{ padding: '8px 0 8px 12px', fontWeight: '700', textAlign: 'right' }}>
                      {'CAME IN WITHIN 7 DAYS'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(__v?.sent || []).map((r, __i0) => (
                    <React.Fragment key={__i0}>
                      <tr style={{ borderTop: '1px solid #e3e5ec' }}>
                        <td style={{ padding: '12px 12px 12px 0', fontWeight: '700' }}>{`${__t(r?.msg)}`}</td>
                        <td style={{ padding: '12px', color: '#5b6475' }}>{`${__t(r?.type)}`}</td>
                        <td style={{ padding: '12px', color: '#5b6475' }}>{`${__t(r?.to)}`}</td>
                        <td style={{ padding: '12px', color: '#5b6475' }}>{`${__t(r?.via)}`}</td>
                        <td style={{ padding: '12px', color: '#5b6475' }}>{`${__t(r?.when)}`}</td>
                        <td
                          style={{
                            padding: '12px 0 12px 12px',
                            textAlign: 'right',
                            fontVariantNumeric: 'tabular-nums',
                            fontWeight: '700',
                          }}
                        >{`${__t(r?.back)}`}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {__b(__v?.qrModalOpen) ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(16, 24, 39, 0.72)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={__v?.closeQrModal}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              maxWidth: '380px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(16, 24, 39, 0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '999px',
                background: '#fef2f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '12px',
              }}
            >
              📱
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '800', color: '#101827' }}>
              Live Customer Card QR
            </h3>
            <p style={{ margin: '0 0 18px', fontSize: '14px', color: '#5b6475', lineHeight: '20px' }}>
              Scan with your phone camera or the Staff Scanner terminal to test this customer card and offer.
            </p>
            <div
              style={{
                padding: '14px',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '16px',
                boxShadow: '0 4px 14px rgba(16, 24, 39, 0.08)',
              }}
            >
              <QRCodeDisplay
                value={__v?.cardUrl || 'https://frontend-phi-one-57.vercel.app/card?token=demo-card-liya-01'}
                size={180}
                darkColor="#101827"
              />
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#101827',
                fontFamily: 'monospace',
                marginTop: '12px',
                background: '#f1f5f9',
                padding: '4px 12px',
                borderRadius: '6px',
                letterSpacing: '0.04em',
              }}
            >
              {`${__t(__v?.memberCode || 'SAMPLE-8842')}`}
            </span>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', width: '100%' }}>
              <a
                href={__v?.cardUrl || '/card'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  boxShadow: '0 2px 8px rgba(228, 35, 48, 0.25)',
                }}
              >
                Open Card ↗
              </a>
              <button
                type="button"
                onClick={__v?.closeQrModal}
                style={{
                  flex: 1,
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  color: '#101827',
                  fontWeight: '700',
                  padding: '12px 16px',
                  borderRadius: '12px',
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
