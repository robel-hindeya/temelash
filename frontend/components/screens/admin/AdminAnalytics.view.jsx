'use client';
/* Markup for the AdminAnalytics screen. State and handlers live in AdminAnalytics.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t, A } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

export default function renderAdminAnalytics(__v) {
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
          <AdminSidebar active="analytics" />
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
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                  {'Platform analytics'}
                </h1>
                <span
                  className="lbl"
                  style={{ border: '1px solid #e3e5ec', borderRadius: '999px', padding: '2px 10px' }}
                >
                  {'SAMPLE DATA'}
                </span>
              </div>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>
                {
                  'How Temelash is growing across every merchant: card holders, stamps, rewards and which businesses stick.'
                }
              </p>
            </div>{' '}
            <div role="group" aria-label="Date range" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(__v?.ranges || []).map((r, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    aria-pressed={r?.pressed}
                    onClick={r?.pick}
                    style={{
                      borderRadius: '999px',
                      padding: '6px 14px',
                      minHeight: '44px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      background: `${__t(r?.bg)}`,
                      color: `${__t(r?.color)}`,
                      border: `1px solid ${__t(r?.border)}`,
                    }}
                  >{`${__t(r?.label)}`}</button>
                </React.Fragment>
              ))}{' '}
              <select
                value={__v?.type}
                onChange={__v?.onType}
                aria-label="Business type"
                style={{
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  minHeight: '44px',
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
              </select>
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {(__v?.kpis || []).map((k, __i0) => (
              <React.Fragment key={__i0}>
                <div
                  style={{
                    flex: '1 1 170px',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <span className="lbl">{`${__t(k?.label)}`}</span>
                  <span style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '800' }}>{`${__t(k?.value)}`}</span>
                  <span
                    style={{ fontSize: '14px', fontWeight: '600', color: `${__t(k?.deltaColor)}` }}
                  >{`${__t(k?.delta)}`}</span>
                </div>
              </React.Fragment>
            ))}
          </div>{' '}
          <section className="card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <div>
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{`${__t(__v?.chartTitle)}`}</h2>
                <span style={{ color: '#5b6475', fontSize: '14px' }}>{`${__t(__v?.chartSub)}`}</span>
              </div>{' '}
              <div role="tablist" aria-label="Measure" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(__v?.measures || []).map((m, __i0) => (
                  <React.Fragment key={__i0}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={m?.pressed}
                      onClick={m?.pick}
                      style={{
                        borderRadius: '999px',
                        padding: '6px 12px',
                        minHeight: '40px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px',
                        background: `${__t(m?.bg)}`,
                        color: `${__t(m?.color)}`,
                        border: `1px solid ${__t(m?.border)}`,
                      }}
                    >{`${__t(m?.label)}`}</button>
                  </React.Fragment>
                ))}
              </div>
            </div>{' '}
            <div style={{ overflowX: 'auto' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: `${__t(__v?.gap)}`,
                  height: '210px',
                  minWidth: `${__t(__v?.minW)}`,
                }}
              >
                {(__v?.bars || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        flex: '1 1 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px',
                        height: '100%',
                        minWidth: '0',
                      }}
                    >
                      <span
                        style={{ fontWeight: '700', fontSize: '13px', whiteSpace: 'nowrap' }}
                      >{`${__t(b?.v)}`}</span>{' '}
                      <div
                        className="bar"
                        title={b?.title}
                        style={{
                          width: '100%',
                          maxWidth: '56px',
                          height: `${__t(b?.h)}`,
                          background: `${__t(b?.color)}`,
                          borderRadius: '6px 6px 0 0',
                        }}
                      />{' '}
                      <span style={{ fontSize: '12px', color: '#5b6475', whiteSpace: 'nowrap' }}>{`${__t(b?.m)}`}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>{' '}
            <button
              type="button"
              onClick={__v?.toggleTable}
              aria-expanded={__v?.tableExpanded}
              style={{
                alignSelf: 'flex-start',
                border: '0',
                background: 'transparent',
                color: '#4661ad',
                fontWeight: '700',
                minHeight: '44px',
                cursor: 'pointer',
                padding: '0',
              }}
            >{`${__t(__v?.tableLabel)}`}</button>{' '}
            {__b(__v?.showTable) ? (
              <>
                <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '420px', fontSize: '14px' }}>
                  <thead>
                    <tr>
                      <th scope="col" className="lbl" style={{ textAlign: 'left', padding: '6px 0' }}>
                        {'PERIOD'}
                      </th>
                      <th
                        scope="col"
                        className="lbl"
                        style={{ textAlign: 'right', padding: '6px 0' }}
                      >{`${__t(__v?.measureUp)}`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(__v?.bars || []).map((b, __i0) => (
                      <React.Fragment key={__i0}>
                        <tr style={{ borderTop: '1px solid #e3e5ec' }}>
                          <td style={{ padding: '6px 0' }}>{`${__t(b?.title)}`}</td>
                          <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: '700' }}>{`${__t(b?.v)}`}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </>
            ) : null}
          </section>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'stretch' }}>
            <section className="card" style={{ flex: '1 1 320px' }}>
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Where customers keep their card'}</h2>{' '}
              {(__v?.wallets || []).map((w, __i0) => (
                <React.Fragment key={__i0}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>{`${__t(w?.label)}`}</span>
                      <span style={{ fontWeight: '700' }}>{`${__t(w?.pct)} · ${__t(w?.n)}`}</span>
                    </div>{' '}
                    <div style={{ height: '12px', background: '#f7f7f9', borderRadius: '999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${__t(w?.pct)}`,
                          background: `${__t(w?.color)}`,
                          borderRadius: '999px',
                        }}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}{' '}
              <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                {
                  'Web card users get no lock-screen offers. The "Move to wallet" prompt in the customer card is how they switch.'
                }
              </p>
            </section>{' '}
            <section className="card" style={{ flex: '1 1 320px' }}>
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Merchant journey'}</h2>{' '}
              <span style={{ color: '#5b6475', fontSize: '14px', marginTop: '-8px' }}>
                {'Businesses that signed up in this period and how far they got'}
              </span>{' '}
              {(__v?.funnel || []).map((f, __i0) => (
                <React.Fragment key={__i0}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ flex: '0 0 120px', fontSize: '14px', fontWeight: '600' }}>{`${__t(f?.label)}`}</span>{' '}
                    <div
                      style={{
                        flex: '1 1 auto',
                        height: '28px',
                        background: '#f7f7f9',
                        borderRadius: '6px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${__t(f?.w)}`,
                          background: `${__t(f?.color)}`,
                          borderRadius: '6px',
                        }}
                      />
                    </div>{' '}
                    <span style={{ flex: '0 0 64px', textAlign: 'right', fontWeight: '700', fontSize: '14px' }}>
                      {`${__t(f?.n)} `}
                      <span style={{ color: '#5b6475', fontWeight: '600' }}>{`${__t(f?.pct)}`}</span>
                    </span>
                  </div>
                </React.Fragment>
              ))}{' '}
              <p
                style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}
              >{`Biggest drop: ${__t(__v?.biggestDrop)}.`}</p>
            </section>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'stretch' }}>
            <section className="card" style={{ flex: '1 1 320px' }}>
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'By business type'}</h2>{' '}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '380px', fontSize: '15px' }}>
                  <thead>
                    <tr>
                      <th scope="col" className="lbl" style={{ textAlign: 'left', padding: '8px 0' }}>
                        {'TYPE'}
                      </th>
                      <th scope="col" className="lbl" style={{ textAlign: 'right', padding: '8px 6px' }}>
                        {'BUSINESSES'}
                      </th>
                      <th scope="col" className="lbl" style={{ textAlign: 'right', padding: '8px 6px' }}>
                        {'STAMPS'}
                      </th>
                      <th scope="col" className="lbl" style={{ textAlign: 'right', padding: '8px 0' }}>
                        {'COME BACK'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(__v?.byType || []).map((t, __i0) => (
                      <React.Fragment key={__i0}>
                        <tr style={{ borderTop: '1px solid #e3e5ec', background: `${__t(t?.bg)}` }}>
                          <td style={{ padding: '8px 0', fontWeight: '600' }}>{`${__t(t?.label)}`}</td>
                          <td style={{ padding: '8px 6px', textAlign: 'right' }}>{`${__t(t?.biz)}`}</td>
                          <td style={{ padding: '8px 6px', textAlign: 'right' }}>{`${__t(t?.stamps)}`}</td>
                          <td
                            style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}
                          >{`${__t(t?.ret)}`}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>{' '}
              <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                {'"Come back" is the share of card holders with 2 or more visits in the period.'}
              </p>
            </section>{' '}
            <section className="card" style={{ flex: '1 1 320px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Top businesses'}</h2>{' '}
                <select
                  value={__v?.topSort}
                  onChange={__v?.onTopSort}
                  aria-label="Rank by"
                  style={{
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '6px 10px',
                    minHeight: '40px',
                    background: '#ffffff',
                    color: '#101827',
                  }}
                >
                  <option value="stamps">{'Most stamps'}</option>
                  <option value="new">{'Most new card holders'}</option>
                  <option value="ret">{'Best come-back rate'}</option>
                </select>
              </div>{' '}
              <ol style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                {(__v?.top || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <li
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        borderTop: '1px solid #e3e5ec',
                        padding: '8px 0',
                      }}
                    >
                      <span style={{ width: '24px', fontWeight: '800', color: '#5b6475' }}>{`${__t(b?.rank)}`}</span>
                      <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                        <A
                          href="/admin/businesses"
                          style={{ fontWeight: '700', textDecoration: 'none', color: '#101827' }}
                        >{`${__t(b?.name)}`}</A>
                        <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(b?.type)}`}</span>
                      </span>
                      <span style={{ fontWeight: '700' }}>{`${__t(b?.metric)}`}</span>
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </section>
          </div>{' '}
          <section className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Businesses that left'}</h2>
              <span style={{ fontWeight: '700' }}>{`${__t(__v?.churnLine)}`}</span>
            </div>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {(__v?.churn || []).map((c, __i0) => (
                <React.Fragment key={__i0}>
                  <div
                    style={{
                      flex: '1 1 200px',
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    <span style={{ fontSize: '22px', fontWeight: '800' }}>{`${__t(c?.n)}`}</span>
                    <span style={{ fontWeight: '600' }}>{`${__t(c?.reason)}`}</span>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(c?.example)}`}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
