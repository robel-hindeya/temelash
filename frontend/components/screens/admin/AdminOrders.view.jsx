'use client';
/* Markup for the AdminOrders screen. State and handlers live in AdminOrders.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

export default function renderAdminOrders(__v) {
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
          <AdminSidebar active="orders" />
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
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Shop orders'}</h1>
              <span className="lbl" style={{ border: '1px solid #e3e5ec', borderRadius: '999px', padding: '2px 10px' }}>
                {'SAMPLE DATA'}
              </span>
            </div>{' '}
            <p style={{ margin: '0', color: '#5b6475' }}>
              {
                'Counter stands, table stickers and window decals that merchants order from their Shop. Check the artwork, print, deliver, and collect cash where needed.'
              }
            </p>
          </div>{' '}
          <div role="tablist" aria-label="Orders view" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(__v?.views || []).map((c, __i0) => (
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
          {__b(__v?.viewPipe) ? (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-start' }}>
                {(__v?.columns || []).map((col, __i0) => (
                  <React.Fragment key={__i0}>
                    <section
                      aria-label={col?.label}
                      style={{
                        flex: '1 1 220px',
                        minWidth: '0',
                        background: '#ffffff',
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '2px 4px',
                        }}
                      >
                        <span className="lbl">{`${__t(col?.label)}`}</span>
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: '800',
                            minWidth: '22px',
                            height: '22px',
                            borderRadius: '999px',
                            background: '#f7f7f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >{`${__t(col?.n)}`}</span>
                      </div>{' '}
                      {__b(col?.empty) ? (
                        <>
                          <span style={{ fontSize: '14px', color: '#5b6475', padding: '8px 4px' }}>{'No orders'}</span>
                        </>
                      ) : null}{' '}
                      {(col?.items || []).map((o, __i1) => (
                        <React.Fragment key={__i1}>
                          <button
                            type="button"
                            className="oc"
                            onClick={o?.pick}
                            aria-pressed={o?.pressed}
                            style={{
                              border: `1px solid ${__t(o?.border)}`,
                              background: `${__t(o?.bg)}`,
                              borderRadius: '12px',
                              padding: '10px 12px',
                              cursor: 'pointer',
                              textAlign: 'left',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              color: '#101827',
                            }}
                          >
                            <span style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                              <span style={{ fontWeight: '700' }}>{`${__t(o?.biz)}`}</span>
                              <span
                                style={{ fontSize: '13px', color: '#5b6475', fontFamily: 'ui-monospace, monospace' }}
                              >{`${__t(o?.no)}`}</span>
                            </span>{' '}
                            <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(o?.summary)}`}</span>{' '}
                            <span style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              <span
                                style={{
                                  fontSize: '12px',
                                  fontWeight: '700',
                                  borderRadius: '999px',
                                  padding: '1px 8px',
                                  background: `${__t(o?.payBg)}`,
                                  color: `${__t(o?.payColor)}`,
                                }}
                              >{`${__t(o?.payLabel)}`}</span>
                              {__b(o?.needsProof) ? (
                                <>
                                  <span
                                    style={{
                                      fontSize: '12px',
                                      fontWeight: '700',
                                      borderRadius: '999px',
                                      padding: '1px 8px',
                                      background: '#fde8e9',
                                      color: '#c81d29',
                                    }}
                                  >
                                    {'Artwork not checked'}
                                  </span>
                                </>
                              ) : null}
                            </span>
                          </button>
                        </React.Fragment>
                      ))}
                    </section>
                  </React.Fragment>
                ))}
              </div>{' '}
              {__b(__v?.hasSel) ? (
                <>
                  <section
                    aria-label="Order detail"
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '18px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <h2
                          style={{ margin: '0', fontSize: '22px', lineHeight: '28px' }}
                        >{`${__t(__v?.sel?.biz)} · ${__t(__v?.sel?.no)}`}</h2>
                        <span
                          style={{ color: '#5b6475' }}
                        >{`Ordered ${__t(__v?.sel?.when)} · deliver to ${__t(__v?.sel?.address)}`}</span>
                      </div>{' '}
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          borderRadius: '999px',
                          padding: '3px 10px',
                          background: '#101827',
                          color: '#ffffff',
                        }}
                      >{`${__t(__v?.sel?.stageUp)}`}</span>
                    </div>{' '}
                    <ol
                      aria-label="Progress"
                      style={{
                        listStyle: 'none',
                        margin: '0',
                        padding: '0',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                      }}
                    >
                      {(__v?.steps || []).map((st, __i0) => (
                        <React.Fragment key={__i0}>
                          <li style={{ flex: '1 1 120px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ height: '6px', borderRadius: '999px', background: `${__t(st?.bar)}` }} />
                            <span
                              style={{ fontSize: '13px', fontWeight: `${__t(st?.weight)}`, color: `${__t(st?.color)}` }}
                            >{`${__t(st?.label)}`}</span>
                          </li>
                        </React.Fragment>
                      ))}
                    </ol>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                      <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span className="lbl">{'ITEMS'}</span>{' '}
                        {(__v?.sel?.lines || []).map((l, __i0) => (
                          <React.Fragment key={__i0}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '10px',
                                borderBottom: '1px solid #e3e5ec',
                                padding: '6px 0',
                              }}
                            >
                              <span>{`${__t(l?.qty)} × ${__t(l?.name)}`}</span>
                              <span style={{ color: '#5b6475' }}>{'[ETB PRICE]'}</span>
                            </div>
                          </React.Fragment>
                        ))}{' '}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: '700',
                            paddingTop: '4px',
                          }}
                        >
                          <span>{'Total'}</span>
                          <span>{'[ETB TOTAL]'}</span>
                        </div>{' '}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px' }}>
                          <span className="lbl">{'PAYMENT'}</span>
                          <span
                            style={{ fontWeight: '600', color: `${__t(__v?.sel?.payColor2)}` }}
                          >{`${__t(__v?.sel?.payLine)}`}</span>
                        </div>{' '}
                        {__b(__v?.showCollect) ? (
                          <>
                            <button
                              type="button"
                              className="btn"
                              onClick={__v?.collect}
                              style={{ alignSelf: 'flex-start' }}
                            >
                              {'Cash collected'}
                            </button>
                          </>
                        ) : null}{' '}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px' }}>
                          <span className="lbl">{'CONTACT'}</span>
                          <span>{`${__t(__v?.sel?.owner)} · ${__t(__v?.sel?.phone)}`}</span>
                        </div>
                      </div>{' '}
                      <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span className="lbl">{'ARTWORK PROOF'}</span>{' '}
                        <div
                          style={{
                            display: 'flex',
                            gap: '14px',
                            alignItems: 'flex-end',
                            flexWrap: 'wrap',
                            background: '#f7f7f9',
                            borderRadius: '12px',
                            padding: '16px',
                          }}
                        >
                          <svg
                            width="120"
                            height="170"
                            viewBox="0 0 120 170"
                            role="img"
                            aria-label={`Counter stand proof for ${__t(__v?.sel?.biz)}`}
                          >
                            <rect x="10" y="4" width="100" height="150" rx="10" fill={__v?.sel?.accent} />{' '}
                            <text
                              x="60"
                              y="30"
                              textAnchor="middle"
                              fontSize="11"
                              fontWeight="700"
                              fill="#ffffff"
                              fontFamily="Source Sans 3, sans-serif"
                            >{`${__t(__v?.sel?.biz)}`}</text>{' '}
                            <text
                              x="60"
                              y="46"
                              textAnchor="middle"
                              fontSize="9"
                              fill="#ffffff"
                              fontFamily="Source Sans 3, sans-serif"
                            >
                              {'Scan for your stamp card'}
                            </text>{' '}
                            <rect x="30" y="56" width="60" height="60" rx="6" fill="#ffffff" />{' '}
                            <g fill="#101827">
                              <rect x="36" y="62" width="14" height="14" />
                              <rect x="70" y="62" width="14" height="14" />
                              <rect x="36" y="96" width="14" height="14" />
                              <rect x="56" y="82" width="8" height="8" />
                              <rect x="70" y="96" width="6" height="6" />
                              <rect x="78" y="104" width="6" height="6" />
                              <rect x="56" y="64" width="6" height="6" />
                            </g>{' '}
                            <text
                              x="60"
                              y="136"
                              textAnchor="middle"
                              fontSize="9"
                              fill="#ffffff"
                              fontFamily="Noto Sans Ethiopic, sans-serif"
                            >
                              {'ካርድዎን ያግኙ'}
                            </text>{' '}
                            <rect x="30" y="154" width="60" height="12" rx="3" fill="#101827" />
                          </svg>{' '}
                          <div
                            style={{
                              flex: '1 1 140px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px',
                              fontSize: '14px',
                            }}
                          >
                            <span>
                              {'QR opens: '}
                              <strong style={{ overflowWrap: 'anywhere' }}>{`${__t(__v?.sel?.qr)}`}</strong>
                            </span>{' '}
                            <span>
                              {'Colour: '}
                              <strong>{`${__t(__v?.sel?.accent)}`}</strong>
                            </span>{' '}
                            <span>{`Logo: ${__t(__v?.sel?.logo)}`}</span>
                          </div>
                        </div>{' '}
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={__v?.proofAria}
                          onClick={__v?.toggleProof}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            border: '0',
                            background: 'transparent',
                            padding: '4px 0',
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
                              border: `2px solid ${__t(__v?.proofBorder)}`,
                              background: `${__t(__v?.proofBg)}`,
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
                              style={{ display: `${__t(__v?.proofTick)}` }}
                            >
                              <path d="M5 12l5 5 9-10" />
                            </svg>
                          </span>{' '}
                          <span style={{ fontWeight: '600' }}>
                            {'Artwork checked: QR scans, name and colours are right'}
                          </span>
                        </button>
                      </div>{' '}
                      <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <span className="lbl">{'DELIVERY'}</span>{' '}
                        <label
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            fontSize: '14px',
                            fontWeight: '600',
                          }}
                        >
                          {'Driver\n'}
                          <select className="fld" value={__v?.sel?.driver} onChange={__v?.onDriver}>
                            <option value="">{'Not assigned'}</option>
                            <option value="Biruk (moto)">{'Biruk (moto)'}</option>
                            <option value="Samuel (van)">{'Samuel (van)'}</option>
                            <option value="Pick-up at office">{'Pick-up at office'}</option>
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
                          {'Delivery day\n'}
                          <input type="date" className="fld" value={__v?.sel?.date} onChange={__v?.onDate} />
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
                          {'Note for the team\n'}
                          <input
                            className="fld"
                            value={__v?.sel?.note}
                            placeholder="e.g. call before arriving"
                            onChange={__v?.onNote}
                          />
                        </label>
                      </div>
                    </div>{' '}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        alignItems: 'center',
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '16px',
                      }}
                    >
                      {__b(__v?.canNext) ? (
                        <>
                          <button
                            type="button"
                            className="btn-p"
                            onClick={__v?.next}
                            aria-disabled={__v?.nextDisabled}
                            style={{ background: `${__t(__v?.nextBg)}`, cursor: `${__t(__v?.nextCursor)}` }}
                          >{`${__t(__v?.nextLabel)}`}</button>
                        </>
                      ) : null}{' '}
                      {__b(__v?.canBack) ? (
                        <>
                          <button type="button" className="btn" onClick={__v?.back}>{`${__t(__v?.backLabel)}`}</button>
                        </>
                      ) : null}{' '}
                      {__b(__v?.canCancel) ? (
                        <>
                          <button
                            type="button"
                            className="btn-l"
                            onClick={__v?.toggleCancel}
                            style={{ color: '#c81d29' }}
                          >
                            {'Cancel order'}
                          </button>
                        </>
                      ) : null}{' '}
                      {__b(__v?.hasBlock) ? (
                        <>
                          <span
                            role="status"
                            style={{ color: '#c81d29', fontSize: '14px', fontWeight: '600' }}
                          >{`${__t(__v?.block)}`}</span>
                        </>
                      ) : null}{' '}
                      <span style={{ marginLeft: 'auto', fontSize: '14px', color: '#5b6475' }}>
                        {'The merchant sees each step in their Shop orders.'}
                      </span>
                    </div>{' '}
                    {__b(__v?.cancelOpen) ? (
                      <>
                        <div
                          style={{
                            border: '1px solid #c81d29',
                            background: '#fde8e9',
                            borderRadius: '12px',
                            padding: '14px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            alignItems: 'flex-end',
                          }}
                        >
                          <label
                            style={{
                              flex: '1 1 260px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              fontSize: '14px',
                              fontWeight: '600',
                            }}
                          >
                            {'Reason (sent to the merchant)\n'}
                            <input className="fld" value={__v?.cancelReason} onChange={__v?.onCancelReason} />
                          </label>{' '}
                          <button type="button" className="btn-p" onClick={__v?.cancel}>
                            {'Cancel and refund'}
                          </button>
                          <button type="button" className="btn-l" onClick={__v?.toggleCancel}>
                            {'Keep order'}
                          </button>
                        </div>
                      </>
                    ) : null}{' '}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="lbl">{'HISTORY'}</span>{' '}
                      {(__v?.sel?.log || []).map((l, __i0) => (
                        <React.Fragment key={__i0}>
                          <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(l)}`}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </section>
                </>
              ) : null}
            </>
          ) : null}{' '}
          {__b(__v?.viewRecs) ? (
            <>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div>
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'"Help me choose" requests'}</h2>
                  <p style={{ margin: '0', color: '#5b6475', fontSize: '14px' }}>
                    {
                      'Merchants who filled the recommendation form in their Shop. Reply with a bundle; it lands in their cart ready to order.'
                    }
                  </p>
                </div>{' '}
                {(__v?.recs || []).map((r, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', alignItems: 'center' }}>
                        <span style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '700' }}>{`${__t(r?.biz)}`}</span>
                          <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(r?.facts)}`}</span>
                        </span>{' '}
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            borderRadius: '999px',
                            padding: '1px 8px',
                            background: `${__t(r?.pillBg)}`,
                            color: `${__t(r?.pillColor)}`,
                          }}
                        >{`${__t(r?.status)}`}</span>
                      </div>{' '}
                      <p style={{ margin: '0', fontSize: '15px' }}>{`"${__t(r?.ask)}"`}</p>{' '}
                      {__b(r?.open) ? (
                        <>
                          <div
                            style={{
                              background: '#f7f7f9',
                              borderRadius: '12px',
                              padding: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px',
                            }}
                          >
                            <span style={{ fontWeight: '600', fontSize: '14px' }}>{'Suggest a bundle'}</span>{' '}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                              {(r?.picks || []).map((p, __i1) => (
                                <React.Fragment key={__i1}>
                                  <label
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      background: '#ffffff',
                                      border: '1px solid #e3e5ec',
                                      borderRadius: '12px',
                                      padding: '6px 10px',
                                      fontSize: '14px',
                                    }}
                                  >
                                    {`${__t(p?.name)}
`}
                                    <input
                                      type="number"
                                      min="0"
                                      max="200"
                                      value={p?.qty}
                                      aria-label={p?.aria}
                                      className="fld"
                                      style={{ width: '72px', minHeight: '36px', padding: '4px 8px' }}
                                      onChange={p?.onQty}
                                    />
                                  </label>
                                </React.Fragment>
                              ))}
                            </div>{' '}
                            <input
                              className="fld"
                              value={r?.reply}
                              aria-label={`Reply to ${__t(r?.biz)}`}
                              placeholder="Short note to the owner"
                              onChange={r?.onReply}
                            />{' '}
                            <div>
                              <button
                                type="button"
                                className="btn"
                                onClick={r?.send}
                                style={{ background: '#101827', color: '#ffffff', borderColor: '#101827' }}
                              >
                                {'Send to their cart'}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : null}{' '}
                      {__b(r?.sent) ? (
                        <>
                          <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(r?.sentLine)}`}</span>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
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
                {__b(__v?.canUndo) ? (
                  <>
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
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
}
