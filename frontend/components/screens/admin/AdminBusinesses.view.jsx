'use client';
/* Markup for the AdminBusinesses screen. State and handlers live in AdminBusinesses.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t, A } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

export default function renderAdminBusinesses(__v) {
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
          <AdminSidebar active="businesses" />
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Businesses'}</h1>
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
              {'Every merchant on Temelash. Open one to manage their plan, trial, access and notes.'}
            </p>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 240px', position: 'relative', maxWidth: '340px' }}>
              <label
                htmlFor="ab-q"
                style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
              >
                {'Search businesses'}
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
                id="ab-q"
                type="search"
                value={__v?.q}
                placeholder="Name, owner or phone"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '12px 14px 12px 40px',
                  minHeight: '48px',
                  background: '#ffffff',
                }}
                onChange={__v?.onQ}
              />
            </div>{' '}
            <label
              htmlFor="ab-type"
              style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
            >
              {'Type'}
            </label>{' '}
            <select
              id="ab-type"
              value={__v?.type}
              onChange={__v?.onType}
              style={{
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '10px 12px',
                minHeight: '48px',
                background: '#ffffff',
                color: '#101827',
              }}
            >
              <option value="all">{'All types'}</option>
              <option value="Café">{'Cafés'}</option>
              <option value="Restaurant">{'Restaurants'}</option>
              <option value="Salon">{'Salons'}</option>
              <option value="Spa">{'Spas'}</option>
              <option value="Car wash">{'Car washes'}</option>
            </select>{' '}
            <label
              htmlFor="ab-sort"
              style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
            >
              {'Sort'}
            </label>{' '}
            <select
              id="ab-sort"
              value={__v?.sort}
              onChange={__v?.onSort}
              style={{
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '10px 12px',
                minHeight: '48px',
                background: '#ffffff',
                color: '#101827',
              }}
            >
              <option value="new">{'Newest first'}</option>
              <option value="cards">{'Most card holders'}</option>
              <option value="stamps">{'Most stamps (30 days)'}</option>
              <option value="name">{'Name A–Z'}</option>
            </select>
          </div>{' '}
          <div role="group" aria-label="Status" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(__v?.statusChips || []).map((c, __i0) => (
              <React.Fragment key={__i0}>
                <button
                  type="button"
                  aria-pressed={c?.pressed}
                  onClick={c?.pick}
                  style={{
                    borderRadius: '999px',
                    padding: '6px 12px',
                    minHeight: '36px',
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
              aria-label="Business list"
              style={{
                flex: '3 1 520px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                overflowX: 'auto',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
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
                      {'BUSINESS'}
                    </th>
                    <th scope="col" style={{ padding: '14px 12px', fontWeight: '700' }}>
                      {'STATUS'}
                    </th>
                    <th scope="col" className="tm-hide-sm" style={{ padding: '14px 12px', fontWeight: '700' }}>
                      {'PLAN'}
                    </th>
                    <th scope="col" style={{ padding: '14px 12px', fontWeight: '700', textAlign: 'right' }}>
                      {'CARD HOLDERS'}
                    </th>
                    <th
                      scope="col"
                      className="tm-hide-sm"
                      style={{ padding: '14px 16px', fontWeight: '700', textAlign: 'right' }}
                    >
                      {'STAMPS 30D'}
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
                            aria-pressed={r?.pressed}
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
                                borderRadius: '10px',
                                background: `${__t(r?.color)}`,
                                color: '#ffffff',
                                fontWeight: '800',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 'none',
                              }}
                            >{`${__t(r?.ini)}`}</span>{' '}
                            <span style={{ display: 'flex', flexDirection: 'column' }}>
                              <strong>{`${__t(r?.name)}`}</strong>
                              <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(r?.sub)}`}</span>
                            </span>
                          </button>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              borderRadius: '999px',
                              padding: '2px 10px',
                              fontSize: '13px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
                              background: `${__t(r?.sBg)}`,
                              color: `${__t(r?.sFg)}`,
                              border: `1px solid ${__t(r?.sBorder)}`,
                            }}
                          >{`${__t(r?.status)}`}</span>
                        </td>
                        <td
                          className="tm-hide-sm"
                          style={{ padding: '12px', color: '#5b6475' }}
                        >{`${__t(r?.plan)}`}</td>
                        <td
                          style={{ padding: '12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
                        >{`${__t(r?.cards)}`}</td>
                        <td
                          className="tm-hide-sm"
                          style={{ padding: '12px 16px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
                        >{`${__t(r?.stamps)}`}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>{' '}
              {__b(__v?.noRows) ? (
                <>
                  <p style={{ margin: '0', padding: '20px 16px', color: '#5b6475' }}>
                    {'No businesses match. Clear the search or filters.'}
                  </p>
                </>
              ) : null}{' '}
              <div
                style={{ padding: '12px 16px', borderTop: '1px solid #e3e5ec', fontSize: '14px', color: '#5b6475' }}
              >{`Showing ${__t(__v?.shown)}`}</div>
            </section>{' '}
            <aside
              aria-label="Business details"
              style={{
                flex: '2 1 360px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: `${__t(__v?.d?.color)}`,
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none',
                  }}
                >{`${__t(__v?.d?.ini)}`}</span>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '0' }}>
                  <strong style={{ fontSize: '20px', lineHeight: '26px' }}>{`${__t(__v?.d?.name)}`}</strong>
                  <span style={{ color: '#5b6475' }}>{`${__t(__v?.d?.sub)}`}</span>
                  <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: '700', color: '#4661ad', background: '#eef2ff', padding: '2px 8px', borderRadius: '4px', width: 'fit-content', marginTop: '4px' }}>
                    Merchant Code: {`${__t(__v?.d?.code)}`}
                  </span>
                </div>{' '}
                <span
                  style={{
                    marginLeft: 'auto',
                    borderRadius: '999px',
                    padding: '2px 10px',
                    fontSize: '13px',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                    background: `${__t(__v?.d?.sBg)}`,
                    color: `${__t(__v?.d?.sFg)}`,
                    border: `1px solid ${__t(__v?.d?.sBorder)}`,
                  }}
                >{`${__t(__v?.d?.status)}`}</span>
              </div>{' '}
              {__b(__v?.hasToast) ? (
                <>
                  <div
                    role="status"
                    style={{ background: '#f7f7f9', borderRadius: '12px', padding: '10px 14px', fontWeight: '700' }}
                  >{`${__t(__v?.toast)}`}</div>
                </>
              ) : null}{' '}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                <div style={{ background: '#f7f7f9', borderRadius: '12px', padding: '12px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    {'CARD HOLDERS'}
                  </span>
                  <strong
                    style={{ fontSize: '22px', fontVariantNumeric: 'tabular-nums' }}
                  >{`${__t(__v?.d?.cards)}`}</strong>
                </div>{' '}
                <div style={{ background: '#f7f7f9', borderRadius: '12px', padding: '12px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    {'STAMPS 30D'}
                  </span>
                  <strong
                    style={{ fontSize: '22px', fontVariantNumeric: 'tabular-nums' }}
                  >{`${__t(__v?.d?.stamps)}`}</strong>
                </div>{' '}
                <div style={{ background: '#f7f7f9', borderRadius: '12px', padding: '12px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    {'LAST ACTIVE'}
                  </span>
                  <strong style={{ fontSize: '15px' }}>{`${__t(__v?.d?.last)}`}</strong>
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
                <dt style={{ color: '#5b6475' }}>{'Owner'}</dt>
                <dd style={{ margin: '0' }}>
                  {`${__t(__v?.d?.owner)} · `}
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{`${__t(__v?.d?.phone)}`}</span>
                </dd>{' '}
                <dt style={{ color: '#5b6475' }}>{'Plan'}</dt>
                <dd style={{ margin: '0' }}>{`${__t(__v?.d?.planLine)}`}</dd>{' '}
                <dt style={{ color: '#5b6475' }}>{'Joined'}</dt>
                <dd style={{ margin: '0' }}>{`${__t(__v?.d?.joined)}`}</dd>{' '}
                <dt style={{ color: '#5b6475' }}>{'Branches'}</dt>
                <dd style={{ margin: '0' }}>{`${__t(__v?.d?.branches)} · ${__t(__v?.d?.staff)} staff`}</dd>
              </dl>{' '}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <A
                  href="/business"
                  style={{
                    border: '0',
                    background: '#101827',
                    color: '#ffffff',
                    fontWeight: '700',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    minHeight: '40px',
                    boxSizing: 'border-box',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  {'View their dashboard'}
                </A>{' '}
                <button
                  type="button"
                  onClick={__v?.sendLink}
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#4661ad',
                    fontWeight: '700',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    minHeight: '40px',
                    cursor: 'pointer',
                  }}
                >
                  {'Send owner a sign-in link'}
                </button>
              </div>{' '}
              {__b(__v?.d?.isTrial) ? (
                <>
                  <div
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '14px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ flex: '1 1 180px' }}>
                      <strong>{`Trial ends ${__t(__v?.d?.trialEnds)}`}</strong>
                    </span>{' '}
                    <button
                      type="button"
                      onClick={__v?.ext7}
                      style={{
                        border: '1px solid #e3e5ec',
                        background: '#ffffff',
                        color: '#101827',
                        fontWeight: '700',
                        borderRadius: '10px',
                        padding: '6px 12px',
                        minHeight: '40px',
                        cursor: 'pointer',
                      }}
                    >
                      {'+7 days'}
                    </button>{' '}
                    <button
                      type="button"
                      onClick={__v?.ext14}
                      style={{
                        border: '1px solid #e3e5ec',
                        background: '#ffffff',
                        color: '#101827',
                        fontWeight: '700',
                        borderRadius: '10px',
                        padding: '6px 12px',
                        minHeight: '40px',
                        cursor: 'pointer',
                      }}
                    >
                      {'+14 days'}
                    </button>
                  </div>
                </>
              ) : null}{' '}
              <div
                style={{
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                  gap: '8px',
                }}
              >
                <div style={{ flex: '1 1 160px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label htmlFor="ab-plan" style={{ fontWeight: '700', fontSize: '14px' }}>
                    {'Change plan'}
                  </label>
                  <select
                    id="ab-plan"
                    value={__v?.planDraft}
                    onChange={__v?.onPlanDraft}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '8px 10px',
                      minHeight: '40px',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                  >
                    <option value="Monthly">{'Monthly'}</option>
                    <option value="Yearly">{'Yearly'}</option>
                    <option value="Free (partner)">{'Free (partner)'}</option>
                  </select>
                </div>{' '}
                <button
                  type="button"
                  onClick={__v?.applyPlan}
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
                  {'Apply'}
                </button>
              </div>{' '}
              {__b(__v?.canSuspend) ? (
                <>
                  {__b(__v?.notConfirming) ? (
                    <>
                      <button
                        type="button"
                        onClick={__v?.askSuspend}
                        style={{
                          alignSelf: 'flex-start',
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#c81d29',
                          fontWeight: '700',
                          borderRadius: '10px',
                          padding: '8px 14px',
                          minHeight: '40px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Suspend business'}
                      </button>
                    </>
                  ) : null}{' '}
                  {__b(__v?.confirming) ? (
                    <>
                      <div
                        style={{
                          background: '#fde8e9',
                          borderRadius: '12px',
                          padding: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <strong>{`Suspend ${__t(__v?.d?.name)}?`}</strong>{' '}
                        <span style={{ fontSize: '14px' }}>
                          {
                            "Their dashboard locks and customers can't collect stamps until you reactivate. Customers keep their stamps."
                          }
                        </span>{' '}
                        <label htmlFor="ab-reason" style={{ fontWeight: '700', fontSize: '14px' }}>
                          {'Reason (shown to the owner)'}
                        </label>{' '}
                        <select
                          id="ab-reason"
                          value={__v?.reason}
                          onChange={__v?.onReason}
                          style={{
                            border: '1px solid #e3e5ec',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            minHeight: '40px',
                            background: '#ffffff',
                            color: '#101827',
                          }}
                        >
                          <option>{'Unpaid for more than 14 days'}</option>
                          <option>{'Misuse of rewards or messages'}</option>
                          <option>{'Owner asked us to pause'}</option>
                          <option>{'Other'}</option>
                        </select>{' '}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={__v?.cancelSuspend}
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
                          </button>
                          <button
                            type="button"
                            onClick={__v?.doSuspend}
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
                            {'Suspend'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}{' '}
              {__b(__v?.canReactivate) ? (
                <>
                  <button
                    type="button"
                    onClick={__v?.reactivate}
                    style={{
                      alignSelf: 'flex-start',
                      border: '0',
                      background: '#4661ad',
                      color: '#ffffff',
                      fontWeight: '700',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      minHeight: '40px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Reactivate business'}
                  </button>
                </>
              ) : null}{' '}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  borderTop: '1px solid #e3e5ec',
                  paddingTop: '14px',
                }}
              >
                <label htmlFor="ab-note" style={{ fontWeight: '700' }}>
                  {'Internal note or message to owner'}
                </label>{' '}
                <textarea
                  id="ab-note"
                  rows="3"
                  value={__v?.noteDraft}
                  placeholder="e.g. Called owner, will pay Friday"
                  style={{
                    border: '1px solid #e3e5ec',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    resize: 'vertical',
                    color: '#101827',
                  }}
                  onChange={__v?.onNote}
                />{' '}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={__v?.addNote}
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
                    {'Save as internal note'}
                  </button>{' '}
                  <button
                    type="button"
                    onClick={__v?.sendMsg}
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
                  >
                    {'Send to owner'}
                  </button>
                </div>{' '}
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    marginTop: '6px',
                  }}
                >
                  {'HISTORY'}
                </span>{' '}
                {(__v?.d?.notes || []).map((n, __i0) => (
                  <React.Fragment key={__i0}>
                    <div style={{ display: 'flex', gap: '10px', padding: '8px 0', borderBottom: '1px solid #e3e5ec' }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '999px',
                          background: `${__t(n?.dot)}`,
                          marginTop: '8px',
                          flex: 'none',
                        }}
                      />
                      <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                        <span>{`${__t(n?.text)}`}</span>
                        <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(n?.meta)}`}</span>
                      </span>
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
