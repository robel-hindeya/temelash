'use client';
/* Markup for the AdminBroadcast screen. State and handlers live in AdminBroadcast.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

export default function renderAdminBroadcast(__v) {
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
          <AdminSidebar active="broadcast" />
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
                {'Announcements'}
              </h1>
              <span className="lbl" style={{ border: '1px solid #e3e5ec', borderRadius: '999px', padding: '2px 10px' }}>
                {'SAMPLE DATA'}
              </span>
            </div>{' '}
            <p style={{ margin: '0', color: '#5b6475' }}>
              {
                'Tell merchants about new features, maintenance or payment changes. It shows as a banner at the top of their dashboard, and in the staff app if you choose.'
              }
            </p>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
            <section
              style={{
                flex: '3 1 440px',
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
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{`${__t(__v?.formTitle)}`}</h2>{' '}
              <div className="fl">
                <span>{'Kind'}</span>{' '}
                <div role="radiogroup" aria-label="Kind" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {(__v?.kinds || []).map((k, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={k?.pressed}
                        onClick={k?.pick}
                        style={{
                          borderRadius: '999px',
                          padding: '6px 14px',
                          minHeight: '40px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          fontSize: '14px',
                          background: `${__t(k?.bg)}`,
                          color: `${__t(k?.color)}`,
                          border: `1px solid ${__t(k?.border)}`,
                        }}
                      >{`${__t(k?.label)}`}</button>
                    </React.Fragment>
                  ))}
                </div>
              </div>{' '}
              <label className="fl">
                {'Headline '}
                <span style={{ fontWeight: '400', color: '#5b6475' }}>{`${__t(__v?.titleCount)}`}</span>{' '}
                <input className="fld" maxLength="70" value={__v?.title} onChange={__v?.onTitle} />
              </label>{' '}
              <label className="fl">
                {'Message\n'}
                <textarea
                  className="fld"
                  rows="3"
                  maxLength="240"
                  value={__v?.body}
                  style={{ resize: 'vertical' }}
                  onChange={__v?.onBody}
                />
              </label>{' '}
              <label className="fl">
                {"Amharic version (optional — shown when the merchant's dashboard is in አማርኛ)\n"}
                <textarea
                  className="fld"
                  rows="2"
                  value={__v?.bodyAm}
                  placeholder="መልእክቱን በአማርኛ ይጻፉ"
                  style={{ resize: 'vertical' }}
                  onChange={__v?.onBodyAm}
                />
              </label>{' '}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <label className="fl" style={{ flex: '1 1 160px' }}>
                  {'Button text (optional)'}
                  <input className="fld" value={__v?.cta} placeholder="e.g. Try it" onChange={__v?.onCta} />
                </label>{' '}
                <label className="fl" style={{ flex: '2 1 220px' }}>
                  {'Button opens'}
                  <select className="fld" value={__v?.ctaTo} onChange={__v?.onCtaTo}>
                    <option value="Offers & reminders">{'Offers & reminders'}</option>
                    <option value="Shop">{'Shop'}</option>
                    <option value="Billing">{'Billing'}</option>
                    <option value="Card design">{'Card design'}</option>
                    <option value="Help article">{'Help article'}</option>
                  </select>
                </label>
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
                <span style={{ fontWeight: '700' }}>{'Who gets it'}</span>{' '}
                <div role="radiogroup" aria-label="Audience" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {(__v?.audiences || []).map((a, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={a?.pressed}
                        onClick={a?.pick}
                        style={{
                          borderRadius: '999px',
                          padding: '6px 14px',
                          minHeight: '40px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          fontSize: '14px',
                          background: `${__t(a?.bg)}`,
                          color: `${__t(a?.color)}`,
                          border: `1px solid ${__t(a?.border)}`,
                        }}
                      >{`${__t(a?.label)}`}</button>
                    </React.Fragment>
                  ))}
                </div>{' '}
                {__b(__v?.audSome) ? (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span className="lbl">{'PLAN'}</span>{' '}
                        {(__v?.planBoxes || []).map((b, __i0) => (
                          <React.Fragment key={__i0}>
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={b?.aria}
                              onClick={b?.toggle}
                              style={{
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                border: '0',
                                background: 'transparent',
                                padding: '4px 0',
                                minHeight: '40px',
                                cursor: 'pointer',
                                color: '#101827',
                                textAlign: 'left',
                              }}
                            >
                              <span
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '6px',
                                  border: `2px solid ${__t(b?.border)}`,
                                  background: `${__t(b?.bg)}`,
                                  boxSizing: 'border-box',
                                  flex: 'none',
                                }}
                              />
                              {`${__t(b?.label)} `}
                              <span style={{ color: '#5b6475' }}>{`${__t(b?.n)}`}</span>
                            </button>
                          </React.Fragment>
                        ))}
                      </div>{' '}
                      <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span className="lbl">{'BUSINESS TYPE'}</span>{' '}
                        {(__v?.typeBoxes || []).map((b, __i0) => (
                          <React.Fragment key={__i0}>
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={b?.aria}
                              onClick={b?.toggle}
                              style={{
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                border: '0',
                                background: 'transparent',
                                padding: '4px 0',
                                minHeight: '40px',
                                cursor: 'pointer',
                                color: '#101827',
                                textAlign: 'left',
                              }}
                            >
                              <span
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '6px',
                                  border: `2px solid ${__t(b?.border)}`,
                                  background: `${__t(b?.bg)}`,
                                  boxSizing: 'border-box',
                                  flex: 'none',
                                }}
                              />
                              {`${__t(b?.label)} `}
                              <span style={{ color: '#5b6475' }}>{`${__t(b?.n)}`}</span>
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}{' '}
                {__b(__v?.audOne) ? (
                  <>
                    <label className="fl">
                      {'Business'}
                      <select className="fld" value={__v?.oneBiz} onChange={__v?.onOneBiz}>
                        <option value="Buna House">{'Buna House'}</option>
                        <option value="Selam Salon">{'Selam Salon'}</option>
                        <option value="Abyssinia Car Wash">{'Abyssinia Car Wash'}</option>
                        <option value="Habesha Bites">{'Habesha Bites'}</option>
                        <option value="Lime Spa">{'Lime Spa'}</option>
                      </select>
                    </label>
                  </>
                ) : null}{' '}
                <span style={{ fontWeight: '700' }}>{`Reaches ${__t(__v?.reach)} ${__t(__v?.reachUnit)}`}</span>
              </div>{' '}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  borderTop: '1px solid #e3e5ec',
                  paddingTop: '16px',
                }}
              >
                <span style={{ fontWeight: '700' }}>{'Where it shows'}</span>{' '}
                {(__v?.channels || []).map((c, __i0) => (
                  <React.Fragment key={__i0}>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={c?.aria}
                      aria-disabled={c?.disabled}
                      onClick={c?.toggle}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: '0',
                        background: 'transparent',
                        padding: '6px 0',
                        minHeight: '44px',
                        cursor: `${__t(c?.cursor)}`,
                        textAlign: 'left',
                        color: `${__t(c?.textColor)}`,
                      }}
                    >
                      <span
                        style={{
                          width: '40px',
                          height: '24px',
                          borderRadius: '999px',
                          background: `${__t(c?.track)}`,
                          position: 'relative',
                          flex: 'none',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            top: '3px',
                            left: `${__t(c?.knob)}`,
                            width: '18px',
                            height: '18px',
                            borderRadius: '999px',
                            background: '#ffffff',
                          }}
                        />
                      </span>{' '}
                      <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600' }}>{`${__t(c?.label)}`}</span>
                        <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(c?.help)}`}</span>
                      </span>{' '}
                      {__b(c?.soon) ? (
                        <>
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: '700',
                              letterSpacing: '0.08em',
                              color: '#5b6475',
                              border: '1px solid #e3e5ec',
                              borderRadius: '999px',
                              padding: '1px 8px',
                            }}
                          >
                            {'COMING SOON'}
                          </span>
                        </>
                      ) : null}
                    </button>
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
                <span style={{ fontWeight: '700' }}>{'When'}</span>{' '}
                <div role="radiogroup" aria-label="When" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(__v?.whens || []).map((w, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={w?.pressed}
                        onClick={w?.pick}
                        style={{
                          borderRadius: '999px',
                          padding: '6px 14px',
                          minHeight: '40px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          fontSize: '14px',
                          background: `${__t(w?.bg)}`,
                          color: `${__t(w?.color)}`,
                          border: `1px solid ${__t(w?.border)}`,
                        }}
                      >{`${__t(w?.label)}`}</button>
                    </React.Fragment>
                  ))}
                </div>{' '}
                {__b(__v?.isLater) ? (
                  <>
                    <label className="fl" style={{ maxWidth: '280px' }}>
                      {'Start'}
                      <input type="datetime-local" className="fld" value={__v?.at} onChange={__v?.onAt} />
                    </label>
                  </>
                ) : null}{' '}
                <label className="fl" style={{ maxWidth: '280px' }}>
                  {'Banner stays for'}
                  <select className="fld" value={__v?.days} onChange={__v?.onDays}>
                    <option value="1">{'1 day'}</option>
                    <option value="3">{'3 days'}</option>
                    <option value="7">{'7 days'}</option>
                    <option value="14">{'14 days'}</option>
                    <option value="0">{'Until the merchant closes it'}</option>
                  </select>
                </label>
              </div>{' '}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <button type="button" className="btn-p" onClick={__v?.send}>{`${__t(__v?.sendLabel)}`}</button>{' '}
                <button type="button" className="btn-l" onClick={__v?.clear}>
                  {'Clear'}
                </button>{' '}
                {__b(__v?.hasErr) ? (
                  <>
                    <span
                      role="status"
                      style={{ color: '#c81d29', fontWeight: '600', fontSize: '14px' }}
                    >{`${__t(__v?.err)}`}</span>
                  </>
                ) : null}
              </div>
            </section>{' '}
            <div
              className="ab-sticky"
              style={{ flex: '2 1 340px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span className="lbl">{'PREVIEW'}</span>{' '}
                  <div role="tablist" aria-label="Preview" style={{ display: 'flex', gap: '6px' }}>
                    {(__v?.previews || []).map((p, __i0) => (
                      <React.Fragment key={__i0}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={p?.pressed}
                          onClick={p?.pick}
                          style={{
                            borderRadius: '999px',
                            padding: '4px 12px',
                            minHeight: '36px',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '13px',
                            background: `${__t(p?.bg)}`,
                            color: `${__t(p?.color)}`,
                            border: `1px solid ${__t(p?.border)}`,
                          }}
                        >{`${__t(p?.label)}`}</button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>{' '}
                {__b(__v?.pvDash) ? (
                  <>
                    <div
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        minHeight: '260px',
                      }}
                    >
                      <div style={{ width: '56px', background: '#101827', flex: 'none' }} />{' '}
                      <div
                        style={{
                          flex: '1 1 auto',
                          background: '#f7f7f9',
                          padding: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          minWidth: '0',
                        }}
                      >
                        <div
                          style={{
                            background: `${__t(__v?.kindBg)}`,
                            color: `${__t(__v?.kindText)}`,
                            borderRadius: '12px',
                            padding: '12px',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={__v?.kindText}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{ flex: 'none', marginTop: '2px' }}
                          >
                            <path d={__v?.kindIcon} />
                          </svg>{' '}
                          <div
                            style={{
                              flex: '1 1 auto',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              minWidth: '0',
                            }}
                          >
                            <span
                              style={{ fontWeight: '700', overflowWrap: 'anywhere' }}
                            >{`${__t(__v?.pvTitle)}`}</span>
                            <span style={{ fontSize: '14px', overflowWrap: 'anywhere' }}>{`${__t(__v?.pvBody)}`}</span>{' '}
                            {__b(__v?.hasCta) ? (
                              <>
                                <span
                                  style={{
                                    alignSelf: 'flex-start',
                                    marginTop: '4px',
                                    background: `${__t(__v?.ctaBg)}`,
                                    color: `${__t(__v?.ctaColor)}`,
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    borderRadius: '6px',
                                    padding: '4px 10px',
                                  }}
                                >{`${__t(__v?.cta)}`}</span>
                              </>
                            ) : null}
                          </div>{' '}
                          <span aria-hidden="true" style={{ fontWeight: '700' }}>
                            {'×'}
                          </span>
                        </div>{' '}
                        <div style={{ height: '14px', width: '40%', background: '#e3e5ec', borderRadius: '4px' }} />{' '}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <div style={{ flex: '1', height: '56px', background: '#ffffff', borderRadius: '6px' }} />
                          <div style={{ flex: '1', height: '56px', background: '#ffffff', borderRadius: '6px' }} />
                          <div style={{ flex: '1', height: '56px', background: '#ffffff', borderRadius: '6px' }} />
                        </div>{' '}
                        <div style={{ height: '80px', background: '#ffffff', borderRadius: '6px' }} />
                      </div>
                    </div>
                  </>
                ) : null}{' '}
                {__b(__v?.pvStaff) ? (
                  <>
                    <div
                      style={{
                        alignSelf: 'center',
                        width: '220px',
                        border: '8px solid #101827',
                        borderRadius: '28px',
                        background: '#101827',
                        color: '#ffffff',
                        padding: '14px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        minHeight: '300px',
                        boxSizing: 'border-box',
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', color: '#9aa3b5' }}>
                        {'STAFF APP'}
                      </span>{' '}
                      <div
                        style={{
                          background: '#1b2436',
                          border: '1px solid #2c3650',
                          borderRadius: '12px',
                          padding: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        <span
                          style={{ fontWeight: '700', fontSize: '14px', overflowWrap: 'anywhere' }}
                        >{`${__t(__v?.pvTitle)}`}</span>
                        <span
                          style={{ fontSize: '13px', color: '#c9cfdb', overflowWrap: 'anywhere' }}
                        >{`${__t(__v?.pvBody)}`}</span>
                      </div>{' '}
                      <div
                        style={{
                          marginTop: 'auto',
                          height: '120px',
                          borderRadius: '12px',
                          border: '2px dashed #2c3650',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#9aa3b5',
                          fontSize: '13px',
                        }}
                      >
                        {'Scan a card'}
                      </div>{' '}
                      {__b(__v?.staffOff) ? (
                        <>
                          <span style={{ fontSize: '13px', color: '#ff5a63' }}>
                            {'Staff app is off for this message.'}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Sent and scheduled'}</h2>{' '}
                {(__v?.history || []).map((h, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '8px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <span style={{ fontWeight: '700' }}>{`${__t(h?.title)}`}</span>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            borderRadius: '999px',
                            padding: '1px 8px',
                            background: `${__t(h?.pillBg)}`,
                            color: `${__t(h?.pillColor)}`,
                            whiteSpace: 'nowrap',
                          }}
                        >{`${__t(h?.status)}`}</span>
                      </div>{' '}
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(h?.meta)}`}</span>{' '}
                      {__b(h?.hasRead) ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div
                              style={{
                                flex: '1 1 auto',
                                height: '8px',
                                background: '#f7f7f9',
                                borderRadius: '999px',
                                overflow: 'hidden',
                              }}
                            >
                              <div style={{ height: '100%', width: `${__t(h?.read)}`, background: '#4661ad' }} />
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: '700' }}>{`${__t(h?.read)} read`}</span>
                          </div>
                        </>
                      ) : null}{' '}
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        <button type="button" className="btn-l" onClick={h?.dup}>
                          {'Use again'}
                        </button>
                        {__b(h?.canEnd) ? (
                          <>
                            <button
                              type="button"
                              className="btn-l"
                              onClick={h?.end}
                              style={{ color: '#c81d29' }}
                            >{`${__t(h?.endLabel)}`}</button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </div>
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
