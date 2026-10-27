'use client';
/* Markup for the AdminSettings screen. State and handlers live in AdminSettings.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

export default function renderAdminSettings(__v) {
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
          <AdminSidebar active="settings" />
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
                {'Platform settings'}
              </h1>
              <span className="lbl" style={{ border: '1px solid #e3e5ec', borderRadius: '999px', padding: '2px 10px' }}>
                {'SAMPLE DATA'}
              </span>
            </div>{' '}
            <p style={{ margin: '0', color: '#5b6475' }}>
              {
                'Plans, prices and limits, the Shop catalogue, how merchants pay, feature switches, and who on the team can do what. Every change is recorded in the audit log.'
              }
            </p>
          </div>{' '}
          <div role="tablist" aria-label="Settings sections" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(__v?.tabs || []).map((t, __i0) => (
              <React.Fragment key={__i0}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={t?.pressed}
                  onClick={t?.pick}
                  style={{
                    borderRadius: '999px',
                    padding: '6px 14px',
                    minHeight: '44px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '14px',
                    background: `${__t(t?.bg)}`,
                    color: `${__t(t?.color)}`,
                    border: `1px solid ${__t(t?.border)}`,
                  }}
                >{`${__t(t?.label)}`}</button>
              </React.Fragment>
            ))}
          </div>{' '}
          {__b(__v?.dirty) ? (
            <>
              <div
                role="status"
                style={{
                  position: 'sticky',
                  top: '12px',
                  zIndex: '3',
                  background: '#101827',
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                }}
              >
                <span>{`${__t(__v?.dirtyText)}`}</span>{' '}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={__v?.discard}
                    style={{
                      border: '1px solid #2c3650',
                      background: '#1b2436',
                      color: '#ffffff',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Discard'}
                  </button>
                  <button type="button" className="btn-p" onClick={__v?.save}>
                    {'Save changes'}
                  </button>
                </div>
              </div>
            </>
          ) : null}{' '}
          {__b(__v?.tPlans) ? (
            <>
              <section className="card">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <label className="fl" style={{ flex: '0 1 200px' }}>
                    {'Free trial length'}
                    <select className="fld" value={__v?.trial} onChange={__v?.onTrial}>
                      <option value="7">{'7 days'}</option>
                      <option value="14">{'14 days'}</option>
                      <option value="30">{'30 days'}</option>
                    </select>
                  </label>{' '}
                  <label className="fl" style={{ flex: '0 1 200px' }}>
                    {'Yearly discount'}
                    <select className="fld" value={__v?.yearly} onChange={__v?.onYearly}>
                      <option value="0">{'None'}</option>
                      <option value="10">{'10%'}</option>
                      <option value="15">{'15%'}</option>
                      <option value="20">{'20% (2 months free)'}</option>
                    </select>
                  </label>{' '}
                  <span style={{ flex: '1 1 240px', alignSelf: 'flex-end', color: '#5b6475', fontSize: '14px' }}>
                    {
                      "New prices apply to new sign-ups and at each merchant's next renewal. Merchants get 14 days' notice by announcement."
                    }
                  </span>
                </div>{' '}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  {(__v?.plans || []).map((p, __i0) => (
                    <React.Fragment key={__i0}>
                      <div
                        style={{
                          flex: '1 1 240px',
                          border: `1px solid ${__t(p?.border)}`,
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center' }}
                        >
                          <span style={{ fontWeight: '800', fontSize: '18px' }}>{`${__t(p?.name)}`}</span>
                          <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(p?.count)} businesses`}</span>
                        </div>{' '}
                        <label className="fl">
                          {'Monthly price (ETB)'}
                          <input
                            className="fld"
                            inputMode="numeric"
                            value={p?.price}
                            placeholder="[ETB PRICE]"
                            onChange={p?.onPrice}
                          />
                        </label>{' '}
                        <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(p?.yearlyLine)}`}</span>{' '}
                        {(p?.limits || []).map((l, __i1) => (
                          <React.Fragment key={__i1}>
                            <label
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px',
                                fontSize: '14px',
                                fontWeight: '600',
                              }}
                            >
                              {`${__t(l?.label)}
`}
                              <select
                                className="fld"
                                value={l?.value}
                                onChange={l?.onChange}
                                style={{ width: '130px', minHeight: '40px', padding: '6px 10px' }}
                              >
                                {(l?.options || []).map((o, __i2) => (
                                  <React.Fragment key={__i2}>
                                    <option value={o}>{`${__t(o)}`}</option>
                                  </React.Fragment>
                                ))}
                              </select>
                            </label>
                          </React.Fragment>
                        ))}{' '}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={p?.visAria}
                          onClick={p?.toggleVis}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            border: '0',
                            background: 'transparent',
                            padding: '4px 0',
                            minHeight: '44px',
                            cursor: 'pointer',
                            color: '#101827',
                            textAlign: 'left',
                          }}
                        >
                          <span
                            style={{
                              width: '40px',
                              height: '24px',
                              borderRadius: '999px',
                              background: `${__t(p?.track)}`,
                              position: 'relative',
                              flex: 'none',
                            }}
                          >
                            <span
                              style={{
                                position: 'absolute',
                                top: '3px',
                                left: `${__t(p?.knob)}`,
                                width: '18px',
                                height: '18px',
                                borderRadius: '999px',
                                background: '#ffffff',
                              }}
                            />
                          </span>
                          <span style={{ fontSize: '14px', fontWeight: '600' }}>{`${__t(p?.visLabel)}`}</span>
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tShop) ? (
            <>
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
                    <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Shop catalogue'}</h2>
                    <span style={{ color: '#5b6475', fontSize: '14px' }}>
                      {'What merchants can order from their Shop page.'}
                    </span>
                  </div>
                  <button type="button" className="btn" onClick={__v?.addProduct}>
                    {'Add a product'}
                  </button>
                </div>{' '}
                {(__v?.products || []).map((p, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '12px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        alignItems: 'flex-end',
                      }}
                    >
                      <label className="fl" style={{ flex: '2 1 200px' }}>
                        {'Product'}
                        <input className="fld" value={p?.name} onChange={p?.onName} />
                      </label>{' '}
                      <label className="fl" style={{ flex: '1 1 120px' }}>
                        {'Price (ETB)'}
                        <input
                          className="fld"
                          inputMode="numeric"
                          value={p?.price}
                          placeholder="[ETB PRICE]"
                          onChange={p?.onPrice}
                        />
                      </label>{' '}
                      <label className="fl" style={{ flex: '1 1 120px' }}>
                        {'Lead time'}
                        <select className="fld" value={p?.lead} onChange={p?.onLead}>
                          <option value="1–2 days">{'1–2 days'}</option>
                          <option value="3–5 days">{'3–5 days'}</option>
                          <option value="1 week">{'1 week'}</option>
                        </select>
                      </label>{' '}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={p?.aria}
                        onClick={p?.toggle}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: '0',
                          background: 'transparent',
                          minHeight: '44px',
                          cursor: 'pointer',
                          color: '#101827',
                        }}
                      >
                        <span
                          style={{
                            width: '40px',
                            height: '24px',
                            borderRadius: '999px',
                            background: `${__t(p?.track)}`,
                            position: 'relative',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              top: '3px',
                              left: `${__t(p?.knob)}`,
                              width: '18px',
                              height: '18px',
                              borderRadius: '999px',
                              background: '#ffffff',
                            }}
                          />
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>{`${__t(p?.stockLabel)}`}</span>
                      </button>{' '}
                      <button type="button" className="btn-l" onClick={p?.remove} style={{ color: '#c81d29' }}>
                        {'Remove'}
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tPay) ? (
            <>
              <section className="card">
                <div>
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'How merchants pay'}</h2>
                  <span style={{ color: '#5b6475', fontSize: '14px' }}>
                    {
                      'Turn methods on and set the account details merchants see on the pay screen. [Confirm payment options]'
                    }
                  </span>
                </div>{' '}
                {(__v?.methods || []).map((m, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      <button
                        type="button"
                        role="switch"
                        aria-checked={m?.aria}
                        onClick={m?.toggle}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          border: '0',
                          background: 'transparent',
                          padding: '0',
                          minHeight: '44px',
                          cursor: 'pointer',
                          color: '#101827',
                          textAlign: 'left',
                        }}
                      >
                        <span
                          style={{
                            width: '40px',
                            height: '24px',
                            borderRadius: '999px',
                            background: `${__t(m?.track)}`,
                            position: 'relative',
                            flex: 'none',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              top: '3px',
                              left: `${__t(m?.knob)}`,
                              width: '18px',
                              height: '18px',
                              borderRadius: '999px',
                              background: '#ffffff',
                            }}
                          />
                        </span>
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '700' }}>{`${__t(m?.label)}`}</span>
                          <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(m?.help)}`}</span>
                        </span>
                      </button>{' '}
                      {__b(m?.on) ? (
                        <>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingLeft: '52px' }}>
                            {(m?.fields || []).map((f, __i1) => (
                              <React.Fragment key={__i1}>
                                <label className="fl" style={{ flex: '1 1 200px' }}>
                                  {`${__t(f?.label)}`}
                                  <input className="fld" value={f?.value} placeholder={f?.ph} onChange={f?.onInput} />
                                </label>
                              </React.Fragment>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tFeat) ? (
            <>
              <section className="card">
                <div>
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Feature switches'}</h2>
                  <span style={{ color: '#5b6475', fontSize: '14px' }}>
                    {
                      'Turn features on for everyone, only for a test group, or off. Off features show as "Coming soon" to merchants.'
                    }
                  </span>
                </div>{' '}
                {(__v?.flags || []).map((f, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700' }}>{`${__t(f?.label)}`}</span>
                        <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(f?.help)}`}</span>
                      </span>{' '}
                      <div
                        role="radiogroup"
                        aria-label={f?.label}
                        style={{
                          display: 'flex',
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          overflow: 'hidden',
                        }}
                      >
                        {(f?.opts || []).map((o, __i1) => (
                          <React.Fragment key={__i1}>
                            <button
                              type="button"
                              role="radio"
                              aria-checked={o?.pressed}
                              onClick={o?.pick}
                              aria-disabled={o?.disabled}
                              style={{
                                border: '0',
                                padding: '8px 14px',
                                minHeight: '44px',
                                cursor: `${__t(o?.cursor)}`,
                                fontWeight: '700',
                                fontSize: '14px',
                                background: `${__t(o?.bg)}`,
                                color: `${__t(o?.color)}`,
                              }}
                            >{`${__t(o?.label)}`}</button>
                          </React.Fragment>
                        ))}
                      </div>{' '}
                      {__b(f?.note) ? (
                        <>
                          <span
                            style={{ flex: '1 1 100%', fontSize: '13px', color: '#5b6475' }}
                          >{`${__t(f?.noteText)}`}</span>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tTeam) ? (
            <>
              <section className="card">
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Admin team'}</h2>{' '}
                {(__v?.team || []).map((m, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '999px',
                          background: '#101827',
                          color: '#ffffff',
                          fontWeight: '800',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 'none',
                        }}
                      >{`${__t(m?.initials)}`}</span>{' '}
                      <span style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700' }}>{`${__t(m?.name)}`}</span>
                        <span
                          style={{ fontSize: '14px', color: '#5b6475' }}
                        >{`${__t(m?.email)} · ${__t(m?.seen)}`}</span>
                      </span>{' '}
                      <label
                        style={{
                          position: 'absolute',
                          width: '1px',
                          height: '1px',
                          overflow: 'hidden',
                          clip: 'rect(0 0 0 0)',
                        }}
                        htmlFor={m?.selId}
                      >{`Role for ${__t(m?.name)}`}</label>{' '}
                      <select
                        id={m?.selId}
                        className="fld"
                        value={m?.role}
                        onChange={m?.onRole}
                        style={{ width: '170px' }}
                        aria-disabled={m?.locked}
                      >
                        <option value="Super admin">{'Super admin'}</option>
                        <option value="Support">{'Support'}</option>
                        <option value="Finance">{'Finance'}</option>
                        <option value="Operations">{'Operations'}</option>
                      </select>{' '}
                      {__b(m?.canRemove) ? (
                        <>
                          <button type="button" className="btn-l" onClick={m?.remove} style={{ color: '#c81d29' }}>
                            {'Remove'}
                          </button>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}{' '}
                <div
                  style={{
                    borderTop: '1px solid #e3e5ec',
                    paddingTop: '14px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    alignItems: 'flex-end',
                  }}
                >
                  <label className="fl" style={{ flex: '2 1 220px' }}>
                    {'Invite by email'}
                    <input
                      className="fld"
                      type="email"
                      value={__v?.invEmail}
                      placeholder="name@temelash.card"
                      onChange={__v?.onInvEmail}
                    />
                  </label>{' '}
                  <label className="fl" style={{ flex: '1 1 160px' }}>
                    {'Role'}
                    <select className="fld" value={__v?.invRole} onChange={__v?.onInvRole}>
                      <option value="Support">{'Support'}</option>
                      <option value="Finance">{'Finance'}</option>
                      <option value="Operations">{'Operations'}</option>
                      <option value="Super admin">{'Super admin'}</option>
                    </select>
                  </label>{' '}
                  <button type="button" className="btn-p" onClick={__v?.invite}>
                    {'Send invite'}
                  </button>{' '}
                  {__b(__v?.hasInvErr) ? (
                    <>
                      <span
                        role="status"
                        style={{ flex: '1 1 100%', color: '#c81d29', fontSize: '14px', fontWeight: '600' }}
                      >{`${__t(__v?.invErr)}`}</span>
                    </>
                  ) : null}
                </div>{' '}
                <div style={{ overflowX: 'auto', borderTop: '1px solid #e3e5ec', paddingTop: '14px' }}>
                  <span className="lbl">{'WHAT EACH ROLE CAN DO'}</span>{' '}
                  <table
                    style={{
                      borderCollapse: 'collapse',
                      width: '100%',
                      minWidth: '560px',
                      marginTop: '8px',
                      fontSize: '14px',
                    }}
                  >
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left', padding: '6px 0' }} className="lbl">
                          {'ACTION'}
                        </th>
                        {(__v?.roleCols || []).map((r, __i0) => (
                          <React.Fragment key={__i0}>
                            <th
                              scope="col"
                              className="lbl"
                              style={{ padding: '6px', textAlign: 'center' }}
                            >{`${__t(r)}`}</th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(__v?.matrix || []).map((row, __i0) => (
                        <React.Fragment key={__i0}>
                          <tr style={{ borderTop: '1px solid #e3e5ec' }}>
                            <td style={{ padding: '8px 0', fontWeight: '600' }}>{`${__t(row?.label)}`}</td>
                            {(row?.cells || []).map((c, __i1) => (
                              <React.Fragment key={__i1}>
                                <td
                                  style={{
                                    padding: '8px',
                                    textAlign: 'center',
                                    color: `${__t(c?.color)}`,
                                    fontWeight: '700',
                                  }}
                                >{`${__t(c?.t)}`}</td>
                              </React.Fragment>
                            ))}
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tAudit) ? (
            <>
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
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Audit log'}</h2>{' '}
                  <select
                    className="fld"
                    value={__v?.auditWho}
                    onChange={__v?.onAuditWho}
                    aria-label="Filter by person"
                    style={{ width: '200px' }}
                  >
                    <option value="all">{'Everyone'}</option>
                    <option value="[Admin name]">{'[Admin name]'}</option>
                    <option value="Meron">{'Meron'}</option>
                    <option value="Kidus">{'Kidus'}</option>
                    <option value="Saba">{'Saba'}</option>
                  </select>
                </div>{' '}
                {(__v?.audit || []).map((a, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        padding: '8px 0',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px 16px',
                      }}
                    >
                      <span style={{ flex: '0 0 120px', fontSize: '14px', color: '#5b6475' }}>{`${__t(a?.at)}`}</span>
                      <span style={{ flex: '0 0 120px', fontWeight: '700', fontSize: '14px' }}>{`${__t(a?.who)}`}</span>
                      <span style={{ flex: '1 1 260px', fontSize: '14px' }}>{`${__t(a?.what)}`}</span>
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
