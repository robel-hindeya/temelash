'use client';
/* Markup for the AdminSupport screen. State and handlers live in AdminSupport.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t, A } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

export default function renderAdminSupport(__v) {
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
          <AdminSidebar active="support" />
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
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                {'Support inbox'}
              </h1>
              <span className="lbl" style={{ border: '1px solid #e3e5ec', borderRadius: '999px', padding: '2px 10px' }}>
                {'SAMPLE DATA'}
              </span>
            </div>{' '}
            <p style={{ margin: '0', color: '#5b6475' }}>
              {
                "Questions from merchants and their staff, sent from the Help button in the dashboard or the staff app. Reply, assign, and close when it's fixed."
              }
            </p>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <input
              type="search"
              className="fld"
              value={__v?.q}
              placeholder="Search tickets"
              aria-label="Search tickets"
              style={{ flex: '1 1 220px', maxWidth: '320px' }}
              onChange={__v?.onQ}
            />{' '}
            <div role="group" aria-label="Status" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(__v?.chips || []).map((c, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    aria-pressed={c?.pressed}
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
            <button
              type="button"
              aria-pressed={__v?.mineAria}
              onClick={__v?.toggleMine}
              style={{
                borderRadius: '999px',
                padding: '6px 14px',
                minHeight: '40px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '14px',
                background: `${__t(__v?.mineBg)}`,
                color: `${__t(__v?.mineColor)}`,
                border: '1px solid #e3e5ec',
              }}
            >
              {'Assigned to me'}
            </button>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
            <section
              aria-label="Tickets"
              style={{
                flex: '1 1 300px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {__b(__v?.emptyList) ? (
                <>
                  <div style={{ padding: '24px 16px', color: '#5b6475', textAlign: 'center' }}>
                    {'No tickets match.'}
                  </div>
                </>
              ) : null}{' '}
              {(__v?.list || []).map((t, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    className="ti"
                    onClick={t?.pick}
                    aria-pressed={t?.pressed}
                    style={{
                      border: `1px solid ${__t(t?.border)}`,
                      background: `${__t(t?.bg)}`,
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      color: '#101827',
                    }}
                  >
                    <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '999px',
                          background: `${__t(t?.dot)}`,
                          flex: 'none',
                        }}
                      />
                      <span
                        style={{
                          fontWeight: '700',
                          flex: '1 1 auto',
                          minWidth: '0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >{`${__t(t?.subject)}`}</span>
                      <span
                        style={{ fontSize: '13px', color: '#5b6475', whiteSpace: 'nowrap' }}
                      >{`${__t(t?.ago)}`}</span>
                    </span>{' '}
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(t?.biz)} · ${__t(t?.from)}`}</span>{' '}
                    <span style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          borderRadius: '999px',
                          padding: '1px 8px',
                          background: `${__t(t?.stBg)}`,
                          color: `${__t(t?.stColor)}`,
                        }}
                      >{`${__t(t?.statusLabel)}`}</span>
                      {__b(t?.urgent) ? (
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
                            {'Urgent'}
                          </span>
                        </>
                      ) : null}
                      <span style={{ fontSize: '12px', color: '#5b6475' }}>{`${__t(t?.assigneeLabel)}`}</span>
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </section>{' '}
            {__b(__v?.hasSel) ? (
              <>
                <section
                  aria-label="Conversation"
                  style={{
                    flex: '2 1 460px',
                    minWidth: '0',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px' }}>{`${__t(__v?.sel?.subject)}`}</h2>{' '}
                    <span
                      style={{ color: '#5b6475', fontSize: '14px' }}
                    >{`${__t(__v?.sel?.no)} · ${__t(__v?.sel?.biz)} · ${__t(__v?.sel?.from)} (${__t(__v?.sel?.role)}) · via ${__t(__v?.sel?.channel)}`}</span>
                  </div>{' '}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      {'Status\n'}
                      <select className="fld" value={__v?.sel?.status} onChange={__v?.onStatus}>
                        <option value="open">{'Open'}</option>
                        <option value="waiting">{'Waiting on merchant'}</option>
                        <option value="solved">{'Solved'}</option>
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
                      {'Assigned to\n'}
                      <select className="fld" value={__v?.sel?.assignee} onChange={__v?.onAssignee}>
                        <option value="">{'Nobody'}</option>
                        <option value="me">{'Me ([Admin name])'}</option>
                        <option value="Meron">{'Meron (support)'}</option>
                        <option value="Kidus">{'Kidus (tech)'}</option>
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
                      {'Priority\n'}
                      <select className="fld" value={__v?.sel?.priority} onChange={__v?.onPriority}>
                        <option value="normal">{'Normal'}</option>
                        <option value="urgent">{'Urgent'}</option>
                      </select>
                    </label>{' '}
                    <div
                      style={{
                        flex: '1 1 200px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        background: '#f7f7f9',
                        borderRadius: '12px',
                        padding: '8px 12px',
                      }}
                    >
                      <span className="lbl">{'BUSINESS'}</span>
                      <span style={{ fontWeight: '600' }}>{`${__t(__v?.sel?.biz)} · ${__t(__v?.sel?.plan)}`}</span>{' '}
                      <span style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '14px' }}>
                        <A href="/admin/businesses">{'Open profile'}</A>
                        <A href="/business">{'View their dashboard'}</A>
                      </span>
                    </div>
                  </div>{' '}
                  <div
                    aria-label="Messages"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      borderTop: '1px solid #e3e5ec',
                      paddingTop: '16px',
                    }}
                  >
                    {(__v?.sel?.msgs || []).map((m, __i0) => (
                      <React.Fragment key={__i0}>
                        <div
                          style={{
                            alignSelf: `${__t(m?.align)}`,
                            maxWidth: '85%',
                            background: `${__t(m?.bg)}`,
                            color: `${__t(m?.color)}`,
                            border: `1px ${__t(m?.borderStyle)} ${__t(m?.borderColor)}`,
                            borderRadius: '12px',
                            padding: '10px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                          }}
                        >
                          <span
                            style={{ fontSize: '13px', fontWeight: '700', opacity: '0.85' }}
                          >{`${__t(m?.who)} · ${__t(m?.at)}`}</span>{' '}
                          <span style={{ whiteSpace: 'pre-wrap' }}>{`${__t(m?.text)}`}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      borderTop: '1px solid #e3e5ec',
                      paddingTop: '16px',
                    }}
                  >
                    <div role="tablist" aria-label="Reply type" style={{ display: 'flex', gap: '6px' }}>
                      {(__v?.modes || []).map((md, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={md?.pressed}
                            onClick={md?.pick}
                            style={{
                              borderRadius: '999px',
                              padding: '6px 14px',
                              minHeight: '40px',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '14px',
                              background: `${__t(md?.bg)}`,
                              color: `${__t(md?.color)}`,
                              border: `1px solid ${__t(md?.border)}`,
                            }}
                          >{`${__t(md?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                      <span className="lbl">{'SAVED REPLIES'}</span>{' '}
                      {(__v?.templates || []).map((tp, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            onClick={tp?.use}
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
                          >{`${__t(tp?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    <label
                      htmlFor="sp-reply"
                      style={{ fontSize: '14px', fontWeight: '600' }}
                    >{`${__t(__v?.replyLabel)}`}</label>{' '}
                    <textarea
                      id="sp-reply"
                      rows="4"
                      className="fld"
                      value={__v?.draft}
                      placeholder={__v?.replyPh}
                      style={{ resize: 'vertical', background: `${__t(__v?.replyBg)}` }}
                      onChange={__v?.onDraft}
                    />{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                      <button
                        type="button"
                        className="btn-p"
                        onClick={__v?.send}
                        style={{ background: `${__t(__v?.sendBg)}` }}
                      >{`${__t(__v?.sendLabel)}`}</button>{' '}
                      {__b(__v?.isReply) ? (
                        <>
                          <button type="button" className="btn" onClick={__v?.sendSolve}>
                            {'Send and mark solved'}
                          </button>
                        </>
                      ) : null}{' '}
                      {__b(__v?.hasErr) ? (
                        <>
                          <span role="status" style={{ color: '#c81d29', fontSize: '14px', fontWeight: '600' }}>
                            {'Write a message first.'}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </section>
              </>
            ) : null}
          </div>{' '}
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
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  maxWidth: '100%',
                }}
              >{`${__t(__v?.toast)}`}</div>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
}
