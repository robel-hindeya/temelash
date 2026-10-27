'use client';
/* Markup for the Settings screen. State and handlers live in Settings.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';

export default function renderSettings(__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1500px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <Sidebar active="settings" />
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
          <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
            {'Staff and settings'}
          </h1>{' '}
          <div
            role="tablist"
            aria-label="Settings sections"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', borderBottom: '1px solid #e3e5ec' }}
          >
            {(__v?.tabs || []).map((t, __i0) => (
              <React.Fragment key={__i0}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={t?.sel}
                  onClick={t?.pick}
                  style={{
                    border: '0',
                    background: 'transparent',
                    padding: '12px 16px',
                    minHeight: '44px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    color: `${__t(t?.color)}`,
                    borderBottom: `3px solid ${__t(t?.line)}`,
                    marginBottom: '-1px',
                  }}
                >{`${__t(t?.label)}`}</button>
              </React.Fragment>
            ))}
          </div>{' '}
          {__b(__v?.isStaff) ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <section
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                        {'Your team'}
                      </h2>
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>
                        {'Staff sign in to the stamping app with their phone number and a 4-digit PIN.'}
                      </span>
                    </div>{' '}
                    <button
                      type="button"
                      onClick={__v?.toggleInvite}
                      aria-expanded={__v?.inviteExpanded}
                      aria-controls="invite-panel"
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
                    >{`${__t(__v?.inviteBtn)}`}</button>
                  </div>{' '}
                  {__b(__v?.inviteOpen) ? (
                    <>
                      <div
                        id="invite-panel"
                        style={{
                          background: '#f7f7f9',
                          borderRadius: '12px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                        }}
                      >
                        <strong style={{ fontSize: '18px' }}>{'Invite someone to your team'}</strong>{' '}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '14px',
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label htmlFor="iv-name" style={{ fontWeight: '700' }}>
                              {'Name'}
                            </label>
                            <input
                              id="iv-name"
                              type="text"
                              value={__v?.iv?.name}
                              placeholder="e.g. Hana"
                              style={{
                                border: `1px solid ${__t(__v?.ivErr?.nameBorder)}`,
                                borderRadius: '6px',
                                padding: '12px 14px',
                                minHeight: '48px',
                                boxSizing: 'border-box',
                                background: '#ffffff',
                                color: '#101827',
                              }}
                              onChange={__v?.onIvName}
                            />
                            {__b(__v?.ivErr?.name) ? (
                              <>
                                <span style={{ fontSize: '14px', color: '#c81d29' }}>{'Add their name.'}</span>
                              </>
                            ) : null}
                          </div>{' '}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label htmlFor="iv-phone" style={{ fontWeight: '700' }}>
                              {'Phone number'}
                            </label>
                            <input
                              id="iv-phone"
                              type="tel"
                              value={__v?.iv?.phone}
                              placeholder="09__ ___ ___"
                              style={{
                                border: `1px solid ${__t(__v?.ivErr?.phoneBorder)}`,
                                borderRadius: '6px',
                                padding: '12px 14px',
                                minHeight: '48px',
                                boxSizing: 'border-box',
                                background: '#ffffff',
                                color: '#101827',
                              }}
                              onChange={__v?.onIvPhone}
                            />
                            {__b(__v?.ivErr?.phone) ? (
                              <>
                                <span style={{ fontSize: '14px', color: '#c81d29' }}>
                                  {'Enter a phone number with at least 9 digits.'}
                                </span>
                              </>
                            ) : null}
                            {__b(__v?.inviteError) ? (
                              <span role="alert" style={{ fontSize: '14px', color: '#c81d29' }}>
                                {`${__t(__v?.inviteError)}`}
                              </span>
                            ) : null}
                          </div>{' '}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label htmlFor="iv-branch" style={{ fontWeight: '700' }}>
                              {'Branch'}
                            </label>
                            <select
                              id="iv-branch"
                              style={{
                                border: '1px solid #e3e5ec',
                                borderRadius: '6px',
                                padding: '12px 14px',
                                minHeight: '48px',
                                background: '#ffffff',
                                color: '#101827',
                              }}
                            >
                              <option>{'Bole branch'}</option>
                            </select>
                          </div>
                        </div>{' '}
                        <fieldset style={{ border: '0', padding: '0', margin: '0' }}>
                          <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>{'Role'}</legend>{' '}
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: '10px',
                            }}
                          >
                            {(__v?.roleOpts || []).map((r, __i0) => (
                              <React.Fragment key={__i0}>
                                <label
                                  style={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'flex-start',
                                    background: '#ffffff',
                                    border: `2px solid ${__t(r?.border)}`,
                                    borderRadius: '12px',
                                    padding: '12px 14px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="iv-role"
                                    checked={__b(r?.checked)}
                                    onChange={r?.pick}
                                    style={{ width: '18px', height: '18px', marginTop: '3px' }}
                                  />
                                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong>{`${__t(r?.label)}`}</strong>
                                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(r?.desc)}`}</span>
                                  </span>
                                </label>
                              </React.Fragment>
                            ))}
                          </div>
                        </fieldset>{' '}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={__v?.toggleInvite}
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
                            onClick={__v?.sendInvite}
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
                          >
                            {'Create invite'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}{' '}
                  {__b(__v?.hasLastInvite) ? (
                    <>
                      <div
                        role="status"
                        style={{
                          border: '1px solid #4661ad',
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <span style={{ display: 'flex', gap: '10px', alignItems: 'center', fontWeight: '700' }}>
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
                          {`Invite ready for ${__t(__v?.lastInvite?.name)}`}
                        </span>{' '}
                        <span
                          style={{ color: '#5b6475', fontSize: '14px' }}
                        >{`Send this link to ${__t(__v?.lastInvite?.name)} on Telegram or WhatsApp. They open it, set a 4-digit PIN and can start stamping. The link works for 7 days.`}</span>{' '}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          <label
                            htmlFor="iv-link"
                            style={{
                              position: 'absolute',
                              width: '1px',
                              height: '1px',
                              overflow: 'hidden',
                              clip: 'rect(0 0 0 0)',
                            }}
                          >
                            {'Invite link'}
                          </label>{' '}
                          <input
                            id="iv-link"
                            type="text"
                            readOnly={true}
                            value={__v?.lastInvite?.link}
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
                            readOnly={true}
                          />{' '}
                          <button
                            type="button"
                            onClick={__v?.copyInvite}
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
                            onClick={__v?.dismissInvite}
                            style={{
                              border: '0',
                              background: 'transparent',
                              color: '#5b6475',
                              fontWeight: '700',
                              padding: '10px 8px',
                              minHeight: '44px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Done'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}{' '}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
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
                            {'NAME'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                            {'ROLE'}
                          </th>
                          <th scope="col" className="tm-hide-sm" style={{ padding: '8px 12px', fontWeight: '700' }}>
                            {'CAN DO'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                            {'STATUS'}
                          </th>
                          <th scope="col" style={{ padding: '8px 0', fontWeight: '700' }}>
                            <span
                              style={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                overflow: 'hidden',
                                clip: 'rect(0 0 0 0)',
                              }}
                            >
                              {'Actions'}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(__v?.team || []).map((s, __i0) => (
                          <React.Fragment key={__i0}>
                            <tr style={{ borderTop: '1px solid #e3e5ec' }}>
                              <td style={{ padding: '12px 12px 12px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                                  >{`${__t(s?.ini)}`}</span>
                                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong>{`${__t(s?.name)}`}</strong>
                                    <span
                                      style={{ fontSize: '14px', color: '#5b6475', fontVariantNumeric: 'tabular-nums' }}
                                    >{`${__t(s?.phone)}`}</span>
                                  </span>
                                </div>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span
                                  style={{
                                    border: `1px solid ${s?.roleBorder || '#e3e5ec'}`,
                                    background: s?.roleBg || '#f8fafc',
                                    color: s?.roleFg || '#0f172a',
                                    borderRadius: '999px',
                                    padding: '3px 12px',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                  }}
                                >
                                  {`${__t(s?.roleBadge || s?.role)}`}
                                </span>
                              </td>
                              <td
                                className="tm-hide-sm"
                                style={{ padding: '12px', color: '#5b6475' }}
                              >{`${__t(s?.can)}`}</td>
                              <td style={{ padding: '12px' }}>
                                <span
                                  style={{ fontSize: '14px', fontWeight: '700', color: `${__t(s?.statusColor)}` }}
                                >{`${__t(s?.status)}`}</span>
                              </td>
                              <td style={{ padding: '12px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                {__b(s?.isInvited) ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={s?.resend}
                                      style={{
                                        border: '0',
                                        background: 'transparent',
                                        color: '#4661ad',
                                        fontWeight: '700',
                                        padding: '8px',
                                        minHeight: '44px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {'Copy link'}
                                    </button>{' '}
                                    <button
                                      type="button"
                                      onClick={s?.cancel}
                                      style={{
                                        border: '0',
                                        background: 'transparent',
                                        color: '#c81d29',
                                        fontWeight: '700',
                                        padding: '8px',
                                        minHeight: '44px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {'Cancel invite'}
                                    </button>
                                  </>
                                ) : null}{' '}
                                {__b(!s?.isOwner) ? (
                                  <>
                                    {__b(s?.isManager) ? (
                                      <button
                                        type="button"
                                        onClick={s?.openDashboard}
                                        title="Open Business Dashboard as Manager"
                                        style={{
                                          border: '1px solid #c7d2fe',
                                          background: '#eef2ff',
                                          color: '#3730a3',
                                          fontWeight: '700',
                                          borderRadius: '8px',
                                          padding: '6px 12px',
                                          marginRight: '6px',
                                          cursor: 'pointer',
                                          fontSize: '13px',
                                        }}
                                      >
                                        {'📊 Dashboard'}
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={s?.openTerminal}
                                        title="Open Staff POS Scanner Terminal"
                                        style={{
                                          border: '1px solid #cbd5e1',
                                          background: '#f8fafc',
                                          color: '#475569',
                                          fontWeight: '700',
                                          borderRadius: '8px',
                                          padding: '6px 12px',
                                          marginRight: '6px',
                                          cursor: 'pointer',
                                          fontSize: '13px',
                                        }}
                                      >
                                        {'📱 Terminal'}
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={s?.toggleRole}
                                      title={s?.isManager ? 'Switch to Staff role' : 'Promote to Manager role'}
                                      style={{
                                        border: '0',
                                        background: 'transparent',
                                        color: '#4661ad',
                                        fontWeight: '700',
                                        padding: '6px 10px',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                      }}
                                    >
                                      {s?.isManager ? 'Make Staff' : 'Make Manager'}
                                    </button>
                                  </>
                                ) : null}{' '}
                                {__b(s?.isActiveStaff) ? (
                                  <button
                                    type="button"
                                    onClick={s?.view}
                                    style={{
                                      border: '0',
                                      background: 'transparent',
                                      color: '#4661ad',
                                      fontWeight: '700',
                                      padding: '8px',
                                      minHeight: '44px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {'Activity'}
                                  </button>
                                ) : null}
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
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
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                          {'Staff activity'}
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
                          {'SAMPLE DATA'}
                        </span>
                      </div>
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.rangeText)}`}</span>
                    </div>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                      <div
                        role="group"
                        aria-label="Period"
                        style={{
                          display: 'inline-flex',
                          border: '1px solid #e3e5ec',
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
                      {__b(__v?.isDay) ? (
                        <>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <button
                              type="button"
                              aria-label="Previous day"
                              onClick={__v?.prevDay}
                              style={{
                                width: '40px',
                                height: '44px',
                                border: '1px solid #e3e5ec',
                                borderRadius: '10px',
                                background: '#ffffff',
                                cursor: 'pointer',
                                color: '#101827',
                              }}
                            >
                              {'‹'}
                            </button>{' '}
                            <label
                              htmlFor="act-date"
                              style={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                overflow: 'hidden',
                                clip: 'rect(0 0 0 0)',
                              }}
                            >
                              {'Day'}
                            </label>{' '}
                            <input
                              id="act-date"
                              type="date"
                              max="2026-10-21"
                              value={__v?.date}
                              style={{
                                border: '1px solid #e3e5ec',
                                borderRadius: '10px',
                                padding: '8px 10px',
                                minHeight: '44px',
                                boxSizing: 'border-box',
                                color: '#101827',
                              }}
                              onChange={__v?.onDate}
                            />{' '}
                            <button
                              type="button"
                              aria-label="Next day"
                              disabled={__b(__v?.nextDisabled)}
                              onClick={__v?.nextDay}
                              style={{
                                width: '40px',
                                height: '44px',
                                border: '1px solid #e3e5ec',
                                borderRadius: '10px',
                                background: '#ffffff',
                                cursor: 'pointer',
                                color: `${__t(__v?.nextColor)}`,
                              }}
                            >
                              {'›'}
                            </button>
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>{' '}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                      gap: '12px',
                    }}
                  >
                    {(__v?.totals || []).map((k, __i0) => (
                      <React.Fragment key={__i0}>
                        <div
                          style={{
                            background: '#f7f7f9',
                            borderRadius: '12px',
                            padding: '14px 16px',
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
                          >{`${__t(k?.label)}`}</span>
                          <span
                            style={{
                              fontSize: '28px',
                              lineHeight: '32px',
                              fontWeight: '800',
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >{`${__t(k?.value)}`}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
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
                            {'STAFF'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                            {'STAMPS'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700', textAlign: 'right' }}>
                            {'REWARDS GIVEN'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700', textAlign: 'right' }}>
                            {'NEW CARDS'}
                          </th>
                          <th
                            scope="col"
                            className="tm-hide-sm"
                            style={{ padding: '8px 0 8px 12px', fontWeight: '700' }}
                          >{`${__t(__v?.busyHead)}`}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(__v?.perStaff || []).map((p, __i0) => (
                          <React.Fragment key={__i0}>
                            <tr
                              className="srow"
                              style={{ borderTop: '1px solid #e3e5ec', background: `${__t(p?.rowBg)}` }}
                            >
                              <td style={{ padding: '12px 12px 12px 0' }}>
                                <button
                                  type="button"
                                  onClick={p?.pick}
                                  aria-pressed={p?.pressed}
                                  style={{
                                    border: '0',
                                    background: 'transparent',
                                    padding: '0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    color: '#101827',
                                    textAlign: 'left',
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '32px',
                                      height: '32px',
                                      borderRadius: '999px',
                                      background: `${__t(p?.dotBg)}`,
                                      color: `${__t(p?.dotFg)}`,
                                      fontWeight: '700',
                                      fontSize: '12px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >{`${__t(p?.ini)}`}</span>
                                  <strong>{`${__t(p?.name)}`}</strong>
                                </button>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div
                                    style={{
                                      width: '100px',
                                      height: '8px',
                                      background: '#f7f7f9',
                                      borderRadius: '4px',
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: '100%',
                                        width: `${__t(p?.w)}`,
                                        background: '#4661ad',
                                        borderRadius: '0 4px 4px 0',
                                      }}
                                    />
                                  </div>
                                  <span
                                    style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
                                  >{`${__t(p?.stamps)}`}</span>
                                </div>
                              </td>
                              <td
                                style={{ padding: '12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
                              >{`${__t(p?.rewards)}`}</td>
                              <td
                                style={{ padding: '12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
                              >{`${__t(p?.joins)}`}</td>
                              <td
                                className="tm-hide-sm"
                                style={{ padding: '12px 0 12px 12px', color: '#5b6475' }}
                              >{`${__t(p?.busy)}`}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>{' '}
                  <div
                    style={{
                      borderTop: '1px solid #e3e5ec',
                      paddingTop: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '8px',
                      }}
                    >
                      <h3
                        style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '700' }}
                      >{`${__t(__v?.chartTitle)}`}</h3>
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.chartNote)}`}</span>
                    </div>{' '}
                    {__b(__v?.hasData) ? (
                      <>
                        <div
                          role="img"
                          aria-label={__v?.chartAlt}
                          style={{
                            height: '180px',
                            display: 'flex',
                            gap: `${__t(__v?.barGap)}`,
                            alignItems: 'flex-end',
                            borderBottom: '1px solid #e3e5ec',
                          }}
                        >
                          {(__v?.bars || []).map((b, __i0) => (
                            <React.Fragment key={__i0}>
                              <div
                                title={b?.tip}
                                style={{
                                  flex: '1 1 0',
                                  minWidth: '0',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                  gap: '3px',
                                }}
                              >
                                {__b(__v?.showVals) ? (
                                  <>
                                    <span
                                      style={{
                                        fontSize: `${__t(__v?.valSize)}`,
                                        lineHeight: '12px',
                                        fontWeight: '700',
                                        color: '#101827',
                                        fontVariantNumeric: 'tabular-nums',
                                      }}
                                    >{`${__t(b?.v)}`}</span>
                                  </>
                                ) : null}
                                <div
                                  className="bar"
                                  style={{
                                    width: '100%',
                                    maxWidth: '28px',
                                    height: `${__t(b?.h)}`,
                                    background: '#4661ad',
                                    borderRadius: '3px 3px 0 0',
                                  }}
                                />
                              </div>
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        <div
                          aria-hidden="true"
                          style={{
                            display: 'flex',
                            gap: `${__t(__v?.barGap)}`,
                            fontSize: '11px',
                            lineHeight: '14px',
                            color: '#5b6475',
                          }}
                        >
                          {(__v?.bars || []).map((b, __i0) => (
                            <React.Fragment key={__i0}>
                              <span
                                style={{ flex: '1 1 0', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}
                              >{`${__t(b?.x)}`}</span>
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        {__b(__v?.isSixty) ? (
                          <>
                            <button
                              type="button"
                              onClick={__v?.toggleTable}
                              aria-expanded={__v?.tableExpanded}
                              style={{
                                alignSelf: 'flex-start',
                                border: '1px solid #e3e5ec',
                                background: '#ffffff',
                                color: '#4661ad',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '8px 14px',
                                minHeight: '40px',
                                cursor: 'pointer',
                              }}
                            >{`${__t(__v?.tableLabel)}`}</button>
                          </>
                        ) : null}{' '}
                        {__b(__v?.tableOpen) ? (
                          <>
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                gap: '6px',
                              }}
                            >
                              {(__v?.bars || []).map((b, __i0) => (
                                <React.Fragment key={__i0}>
                                  <span
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      gap: '6px',
                                      fontSize: '13px',
                                      background: '#f7f7f9',
                                      borderRadius: '6px',
                                      padding: '4px 8px',
                                    }}
                                  >
                                    <span style={{ color: '#5b6475' }}>{`${__t(b?.d)}`}</span>
                                    <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{`${__t(b?.v)}`}</strong>
                                  </span>
                                </React.Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </>
                    ) : null}{' '}
                    {__b(__v?.noData) ? (
                      <>
                        <p
                          style={{
                            margin: '0',
                            color: '#5b6475',
                            background: '#f7f7f9',
                            borderRadius: '12px',
                            padding: '14px',
                          }}
                        >
                          {'No stamps recorded on this day. The shop was closed or nobody was on shift.'}
                        </p>
                      </>
                    ) : null}
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
                    gap: '12px',
                  }}
                >
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Roles'}</h2>{' '}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                    }}
                  >
                    <div style={{ background: '#f7f7f9', borderRadius: '12px', padding: '16px' }}>
                      <strong>{'Owner'}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#5b6475' }}>
                        {'Everything, including billing and deleting the card.'}
                      </p>
                    </div>{' '}
                    <div style={{ background: '#f7f7f9', borderRadius: '12px', padding: '16px' }}>
                      <strong>{'Manager'}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#5b6475' }}>
                        {'Stamps, rewards, offers and customers. No billing.'}
                      </p>
                    </div>{' '}
                    <div style={{ background: '#f7f7f9', borderRadius: '12px', padding: '16px' }}>
                      <strong>{'Staff'}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#5b6475' }}>
                        {'Add stamps and redeem rewards in the staff app only.'}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : null}{' '}
          {__b(__v?.isBiz) ? (
            <>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  maxWidth: '760px',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Business profile'}
                </h2>{' '}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="st-name" style={{ fontWeight: '700' }}>
                      {'Legal name'}
                    </label>
                    <input
                      id="st-name"
                      type="text"
                      value={__v?.bizProfile?.nameEn || ''}
                      onChange={__v?.onBizName}
                      placeholder="Registered business name"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="st-tin" style={{ fontWeight: '700' }}>
                      {'TIN (for receipts)'}
                    </label>
                    <input
                      id="st-tin"
                      type="text"
                      value={__v?.bizProfile?.tin || ''}
                      onChange={__v?.onBizTin}
                      placeholder="e.g. 0012345678"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="st-type" style={{ fontWeight: '700' }}>
                      {'Type'}
                    </label>
                    <select
                      id="st-type"
                      value={__v?.bizProfile?.type || 'Café'}
                      onChange={__v?.onBizType}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        background: '#ffffff',
                        color: '#101827',
                      }}
                    >
                      <option>{'Café'}</option>
                      <option>{'Restaurant'}</option>
                      <option>{'Salon'}</option>
                      <option>{'Spa'}</option>
                      <option>{'Car wash'}</option>
                    </select>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="st-lang" style={{ fontWeight: '700' }}>
                      {'Dashboard language'}
                    </label>
                    <select
                      id="st-lang"
                      value={__v?.bizProfile?.defaultLanguage || 'EN'}
                      onChange={__v?.onBizLang}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        background: '#ffffff',
                        color: '#101827',
                      }}
                    >
                      <option value="EN">{'English'}</option>
                      <option value="AM">{'አማርኛ'}</option>
                    </select>
                  </div>
                </div>{' '}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={__v?.saveBiz}
                    style={{
                      alignSelf: 'flex-start',
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
                    {'Save to Database'}
                  </button>
                  {__b(__v?.bizSaved) ? (
                    <span style={{ color: '#0d7d4d', fontWeight: '700', fontSize: '14px' }}>
                      {'✓ Business profile saved to database.'}
                    </span>
                  ) : null}
                </div>
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.isBranches) ? (
            <>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  maxWidth: '820px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Branches'}</h2>{' '}
                  {__b(__v?.canAddBranch) ? (
                    <>
                      <button
                        type="button"
                        onClick={__v?.addBranch}
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
                        {'+ Add a branch'}
                      </button>
                    </>
                  ) : null}
                </div>{' '}
                <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                  {
                    'One card works at every branch. Stamps count wherever the customer visits. Each branch gets its own QR so you can see where people join.'
                  }
                </p>{' '}
                {__b(__v?.branchNote) ? (
                  <>
                    <div
                      role="status"
                      style={{ background: '#f7f7f9', borderRadius: '12px', padding: '12px 14px', fontWeight: '700' }}
                    >{`${__t(__v?.branchNoteText)}`}</div>
                  </>
                ) : null}{' '}
                {(__v?.branchRows || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <div style={{ borderTop: '1px solid #e3e5ec', padding: '14px 0' }}>
                      {__b(b?.viewing) ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
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
                                stroke="#101827"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                              </svg>
                            </span>{' '}
                            <span style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column' }}>
                              <strong>{`${__t(b?.name)}`}</strong>
                              <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(b?.line)}`}</span>
                            </span>{' '}
                            <button
                              type="button"
                              onClick={b?.edit}
                              style={{
                                border: '1px solid #e3e5ec',
                                background: '#ffffff',
                                color: '#4661ad',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '6px 12px',
                                minHeight: '40px',
                                cursor: 'pointer',
                              }}
                            >
                              {'Edit'}
                            </button>{' '}
                            {__b(b?.canDelete) ? (
                              <>
                                <button
                                  type="button"
                                  onClick={b?.remove}
                                  aria-label={b?.delLabel}
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '10px',
                                    background: '#ffffff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
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
                        </>
                      ) : null}{' '}
                      {__b(b?.editing) ? (
                        <>
                          <div
                            style={{
                              background: '#f7f7f9',
                              borderRadius: '12px',
                              padding: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px',
                            }}
                          >
                            <strong>{`${__t(b?.formTitle)}`}</strong>{' '}
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '12px',
                              }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor={b?.idName} style={{ fontWeight: '700', fontSize: '14px' }}>
                                  {'Branch name'}
                                </label>
                                <input
                                  id={b?.idName}
                                  type="text"
                                  value={__v?.bd?.name}
                                  placeholder="e.g. Kazanchis branch"
                                  style={{
                                    border: `1px solid ${__t(__v?.bdBorder)}`,
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    minHeight: '44px',
                                    boxSizing: 'border-box',
                                    background: '#ffffff',
                                    color: '#101827',
                                  }}
                                  onChange={__v?.onBdName}
                                />
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor={b?.idAddr} style={{ fontWeight: '700', fontSize: '14px' }}>
                                  {'Address'}
                                </label>
                                <input
                                  id={b?.idAddr}
                                  type="text"
                                  value={__v?.bd?.address}
                                  placeholder="Building, street, area"
                                  style={{
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    minHeight: '44px',
                                    boxSizing: 'border-box',
                                    background: '#ffffff',
                                    color: '#101827',
                                  }}
                                  onChange={__v?.onBdAddr}
                                />
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor={b?.idPhone} style={{ fontWeight: '700', fontSize: '14px' }}>
                                  {'Branch phone'}
                                </label>
                                <input
                                  id={b?.idPhone}
                                  type="tel"
                                  value={__v?.bd?.phone}
                                  placeholder="+251 9__ ___ ___"
                                  style={{
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    minHeight: '44px',
                                    boxSizing: 'border-box',
                                    background: '#ffffff',
                                    color: '#101827',
                                  }}
                                  onChange={__v?.onBdPhone}
                                />
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor={b?.idHours} style={{ fontWeight: '700', fontSize: '14px' }}>
                                  {'Opening hours'}
                                </label>
                                <input
                                  id={b?.idHours}
                                  type="text"
                                  value={__v?.bd?.hours}
                                  placeholder="Mon–Sat 7:00–21:00"
                                  style={{
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    minHeight: '44px',
                                    boxSizing: 'border-box',
                                    background: '#ffffff',
                                    color: '#101827',
                                  }}
                                  onChange={__v?.onBdHours}
                                />
                              </div>
                            </div>{' '}
                            {__b(__v?.bdErr) ? (
                              <>
                                <span style={{ fontSize: '14px', color: '#c81d29' }}>{'Give the branch a name.'}</span>
                              </>
                            ) : null}{' '}
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={__v?.cancelBranch}
                                style={{
                                  border: '1px solid #e3e5ec',
                                  background: '#ffffff',
                                  color: '#101827',
                                  fontWeight: '700',
                                  borderRadius: '10px',
                                  padding: '8px 14px',
                                  minHeight: '40px',
                                  cursor: 'pointer',
                                }}
                              >
                                {'Cancel'}
                              </button>{' '}
                              <button
                                type="button"
                                onClick={__v?.saveBranch}
                                style={{
                                  border: '0',
                                  background: '#4661ad',
                                  color: '#ffffff',
                                  fontWeight: '700',
                                  borderRadius: '10px',
                                  padding: '8px 14px',
                                  minHeight: '40px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(b?.saveLabel)}`}</button>
                            </div>
                          </div>
                        </>
                      ) : null}{' '}
                      {__b(b?.confirming) ? (
                        <>
                          <div
                            style={{
                              background: '#fde8e9',
                              borderRadius: '12px',
                              padding: '14px 16px',
                              display: 'flex',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              gap: '10px',
                            }}
                          >
                            <span style={{ flex: '1 1 240px', color: '#101827' }}>
                              <strong>{`Delete ${__t(b?.name)}?`}</strong>
                              {' Its QR stops working. Customers keep their stamps.'}
                            </span>{' '}
                            <button
                              type="button"
                              onClick={__v?.cancelBranch}
                              style={{
                                border: '1px solid #e3e5ec',
                                background: '#ffffff',
                                color: '#101827',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '8px 14px',
                                minHeight: '40px',
                                cursor: 'pointer',
                              }}
                            >
                              {'Keep it'}
                            </button>{' '}
                            <button
                              type="button"
                              onClick={b?.confirmDelete}
                              style={{
                                border: '0',
                                background: '#e42330',
                                color: '#ffffff',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '8px 14px',
                                minHeight: '40px',
                                cursor: 'pointer',
                              }}
                            >
                              {'Delete branch'}
                            </button>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.isBilling) ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
                <section
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      {'CURRENT PLAN'}
                    </span>{' '}
                    <span
                      style={{ fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}
                    >{`${__t(__v?.planName)}`}</span>{' '}
                    <span style={{ color: '#5b6475' }}>{`${__t(__v?.planLine)}`}</span>
                  </div>{' '}
                  {__b(__v?.onTrial) ? (
                    <>
                      <div
                        style={{
                          flex: '1 1 220px',
                          height: '8px',
                          background: '#e3e5ec',
                          borderRadius: '999px',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ width: '40%', height: '100%', background: '#101827' }} />
                      </div>
                    </>
                  ) : null}{' '}
                  {__b(__v?.onPaid) ? (
                    <>
                      <span
                        style={{
                          border: '1px solid #4661ad',
                          color: '#4661ad',
                          borderRadius: '999px',
                          padding: '2px 12px',
                          fontWeight: '700',
                          fontSize: '14px',
                        }}
                      >
                        {'Active'}
                      </span>
                    </>
                  ) : null}
                </section>{' '}
                {__b(__v?.stepPick) ? (
                  <>
                    <section
                      style={{
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
                      >{`${__t(__v?.pickTitle)}`}</h2>{' '}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                          gap: '12px',
                        }}
                      >
                        {(__v?.plans || []).map((p, __i0) => (
                          <React.Fragment key={__i0}>
                            <button
                              type="button"
                              aria-pressed={p?.pressed}
                              onClick={p?.pick}
                              style={{
                                textAlign: 'left',
                                background: '#ffffff',
                                border: `2px solid ${__t(p?.border)}`,
                                borderRadius: '12px',
                                padding: '18px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                                color: '#101827',
                              }}
                            >
                              <span
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: '8px',
                                }}
                              >
                                <strong style={{ fontSize: '18px' }}>{`${__t(p?.name)}`}</strong>
                                {__b(p?.hasBadge) ? (
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
                                    >{`${__t(p?.badge)}`}</span>
                                  </>
                                ) : null}
                              </span>{' '}
                              <span
                                style={{ fontSize: '24px', lineHeight: '30px', fontWeight: '800' }}
                              >{`${__t(p?.price)}`}</span>{' '}
                              <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(p?.note)}`}</span>
                            </button>
                          </React.Fragment>
                        ))}
                      </div>{' '}
                      <ul
                        style={{
                          margin: '0',
                          paddingLeft: '18px',
                          color: '#5b6475',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                          gap: '4px 16px',
                        }}
                      >
                        <li>{'Unlimited customers and stamps'}</li>
                        <li>{'Apple, Google Wallet and web cards'}</li>
                        <li>{'Offers and reminders'}</li>
                        <li>{'Staff app for your whole team'}</li>
                        <li>{'Analytics and staff activity'}</li>
                        <li>{'Every branch included'}</li>
                      </ul>{' '}
                      <button
                        type="button"
                        onClick={__v?.toPay}
                        style={{
                          alignSelf: 'flex-start',
                          border: '0',
                          background: '#e42330',
                          color: '#ffffff',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '12px 20px',
                          minHeight: '48px',
                          cursor: 'pointer',
                        }}
                      >{`Continue with ${__t(__v?.selPlanName)}`}</button>
                    </section>
                  </>
                ) : null}{' '}
                {__b(__v?.stepPay) ? (
                  <>
                    <section
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={__v?.backToPlans}
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
                        {'← Change plan'}
                      </button>{' '}
                      <h2
                        style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}
                      >{`Pay for ${__t(__v?.selPlanName)}`}</h2>{' '}
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
                        {(__v?.payOpts || []).map((o, __i0) => (
                          <React.Fragment key={__i0}>
                            <label
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                border: `1px solid ${__t(o?.border)}`,
                                borderRadius: '12px',
                                padding: '12px 14px',
                                cursor: 'pointer',
                              }}
                            >
                              <input
                                type="radio"
                                name="bill-pay"
                                checked={__b(o?.checked)}
                                onChange={o?.pick}
                                style={{ width: '18px', height: '18px' }}
                              />
                              <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                                <strong>{`${__t(o?.label)}`}</strong>
                                <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(o?.desc)}`}</span>
                              </span>
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
                          paddingTop: '10px',
                          borderTop: '1px solid #e3e5ec',
                        }}
                      >
                        <span>{'Due today'}</span>
                        <span>{`${__t(__v?.selPlanPrice)}`}</span>
                      </div>{' '}
                      <button
                        type="button"
                        onClick={__v?.confirmPlan}
                        style={{
                          alignSelf: 'flex-start',
                          border: '0',
                          background: '#e42330',
                          color: '#ffffff',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '12px 20px',
                          minHeight: '48px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Confirm and pay'}
                      </button>
                    </section>
                  </>
                ) : null}{' '}
                {__b(__v?.stepDone) ? (
                  <>
                    <section
                      role="status"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #4661ad',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <strong style={{ fontSize: '20px' }}>{`You're on the ${__t(__v?.selPlanName)} plan`}</strong>{' '}
                      <span style={{ color: '#5b6475' }}>
                        {
                          "Your card keeps running without a break. We'll send a receipt to your phone. You can change plans any time."
                        }
                      </span>{' '}
                      <button
                        type="button"
                        onClick={__v?.backToPlans}
                        style={{
                          alignSelf: 'flex-start',
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#4661ad',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 16px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Change plan'}
                      </button>
                    </section>
                  </>
                ) : null}
              </div>
            </>
          ) : null}{' '}
          {__b(__v?.isProfile) ? (
            <>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  maxWidth: '760px',
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
                    }}
                  >{`${__t(__v?.pfIni)}`}</span>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: '20px' }}>{`${__t(__v?.pfShownName)}`}</strong>
                    <span style={{ color: '#5b6475' }}>{'Owner · Bole branch'}</span>
                  </div>
                </div>{' '}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="pf-name" style={{ fontWeight: '700' }}>
                      {'Your name'}
                    </label>
                    <input
                      id="pf-name"
                      type="text"
                      value={__v?.pf?.name}
                      placeholder="Your full name"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                      }}
                      onChange={__v?.onPfName}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="pf-phone" style={{ fontWeight: '700' }}>
                      {'Phone'}
                    </label>
                    <input
                      id="pf-phone"
                      type="tel"
                      value={__v?.pf?.phone}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                      }}
                      onChange={__v?.onPfPhone}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="pf-email" style={{ fontWeight: '700' }}>
                      {'Email'}
                    </label>
                    <input
                      id="pf-email"
                      type="email"
                      value={__v?.pf?.email}
                      placeholder="name@example.com"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                      }}
                      onChange={__v?.onPfEmail}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="pf-lang" style={{ fontWeight: '700' }}>
                      {'Dashboard language'}
                    </label>
                    <select
                      id="pf-lang"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        background: '#ffffff',
                        color: '#101827',
                      }}
                    >
                      <option>{'English'}</option>
                      <option>{'አማርኛ'}</option>
                    </select>
                  </div>
                </div>{' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderTop: '1px solid #e3e5ec',
                    paddingTop: '14px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column' }}>
                    <strong>{'Staff app PIN'}</strong>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.pinNote)}`}</span>
                  </span>{' '}
                  <button
                    type="button"
                    onClick={__v?.resetPin}
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
                    {'Change PIN'}
                  </button>
                </div>{' '}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={__v?.saveProfile}
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
                    {'Save'}
                  </button>{' '}
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.pfSavedNote)}`}</span>
                </div>
              </section>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
}
