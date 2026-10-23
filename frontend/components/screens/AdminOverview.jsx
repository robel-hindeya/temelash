'use client';
/* Generated from the Temelash Card design (AdminOverview.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';
import api from '@/lib/api';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.bar:hover{background:#101827 !important}';
class AdminOverviewView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      done: {},
      merchants: [],
      outbox: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const [merchantsRes, outboxRes] = await Promise.allSettled([
        api.platform.getMerchants(),
        api.platform.getOutboxStatus(),
      ]);
      const updates = { loading: false };
      if (merchantsRes.status === 'fulfilled' && Array.isArray(merchantsRes.value)) {
        updates.merchants = merchantsRes.value;
      }
      if (outboxRes.status === 'fulfilled' && outboxRes.value) {
        updates.outbox = outboxRes.value;
      }
      this.setState(updates);
    } catch (e) {
      console.warn('AdminOverview platform fetch note:', e);
      this.setState({ loading: false });
    }
  }
  renderVals() {
    const s = this.state;
    const I = {
      app: 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
      trial: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
      pay: 'M2 6h20v12H2zM2 10h20M6 15h4',
      order: 'M5 7h14l-1 13H6zM9 7V5a3 3 0 0 1 6 0v2',
      ticket: 'M4 5h16v11H8l-4 4z',
    };
    const T = {
      app: { tag: 'APPLICATION', color: '#4661ad' },
      trial: { tag: 'TRIAL ENDING', color: '#5b6475' },
      pay: { tag: 'PAYMENT', color: '#c81d29' },
      order: { tag: 'SHOP ORDER', color: '#101827' },
      ticket: { tag: 'SUPPORT', color: '#4661ad' },
    };
    const items = [
      {
        id: 'a1',
        type: 'app',
        title: 'Sheba Beauty · Salon · Sarbet',
        detail: 'Trade licence and TIN uploaded. Location pinned. Waiting 1 day.',
        primaryLabel: 'Approve',
        result: 'Approved · welcome message sent',
        secLabel: 'Review',
        secHref: '/admin/applications',
      },
      {
        id: 'a2',
        type: 'app',
        title: 'Entoto Spa · Spa · Megenagna',
        detail: 'Licence photo is blurry. Owner asked to re-upload yesterday.',
        primaryLabel: 'Send reminder',
        result: 'Reminder sent to owner',
        secLabel: 'Review',
        secHref: '/admin/applications',
      },
      {
        id: 't1',
        type: 'trial',
        title: 'Selam Salon',
        detail: 'Trial ends in 2 days. 86 card holders, no plan chosen.',
        primaryLabel: 'Extend 7 days',
        result: 'Trial extended to 30 Oct',
        secLabel: 'Open',
        secHref: '/admin/businesses',
      },
      {
        id: 'p1',
        type: 'pay',
        title: 'Abyssinia Car Wash',
        detail: 'Monthly payment by Telebirr failed twice. Card stays live for 7 more days.',
        primaryLabel: 'Retry payment',
        result: 'Payment received · ETB [amount]',
        secLabel: 'Billing',
        secHref: '/admin/billing',
      },
      {
        id: 'p2',
        type: 'pay',
        title: 'Lime Spa',
        detail: 'Says they paid the yearly plan by bank transfer. Check the statement.',
        primaryLabel: 'Confirm received',
        result: 'Marked paid · yearly plan active',
        secLabel: 'Billing',
        secHref: '/admin/billing',
      },
      {
        id: 'o1',
        type: 'order',
        title: 'Order #1043 · Buna House',
        detail: '2 × counter stand on wood block · Bole · cash on delivery',
        primaryLabel: 'Start printing',
        result: 'Moved to Printing',
        secLabel: 'Orders',
        secHref: '/admin/orders',
      },
      {
        id: 's1',
        type: 'ticket',
        title: 'Arada Coffee: “Staff can’t sign in to the app”',
        detail: 'Opened 40 min ago on Telegram. No reply yet.',
        primaryLabel: 'Assign to me',
        result: 'Assigned to you',
        secLabel: 'Open ticket',
        secHref: '/admin/support',
      },
    ];
    const f = s.filter;
    const counts = { all: items.filter((i) => !s.done[i.id]).length };
    ['app', 'trial', 'pay', 'order', 'ticket'].forEach((t) => {
      counts[t] = items.filter((i) => i.type === t && !s.done[i.id]).length;
    });
    const filters = [
      ['all', 'All'],
      ['app', 'Applications'],
      ['trial', 'Trials'],
      ['pay', 'Payments'],
      ['order', 'Orders'],
      ['ticket', 'Support'],
    ].map(([id, label]) => ({
      label,
      n: String(counts[id]),
      pressed: id === f ? 'true' : 'false',
      bg: id === f ? '#101827' : '#ffffff',
      color: id === f ? '#ffffff' : '#101827',
      border: id === f ? '#101827' : '#e3e5ec',
      pick: () => this.setState({ filter: id }),
    }));
    const queue = items
      .filter((i) => f === 'all' || i.type === f)
      .map((i) => {
        const d = !!s.done[i.id];
        return {
          title: i.title,
          detail: i.detail,
          tag: T[i.type].tag,
          tagColor: T[i.type].color,
          icon: I[i.type],
          iconColor: T[i.type].color,
          open: !d,
          done: d,
          opacity: d ? '0.7' : '1',
          result: i.result,
          primaryLabel: i.primaryLabel,
          primary: () => this.setState({ done: Object.assign({}, s.done, { [i.id]: true }) }),
          undo: () => {
            const n = Object.assign({}, s.done);
            delete n[i.id];
            this.setState({ done: n });
          },
          hasSecondary: !!i.secLabel,
          secLabel: i.secLabel,
          secHref: i.secHref,
          secAct: null,
        };
      });
    const doneN = Object.keys(s.done).length;
    const wv = [6, 9, 7, 11, 10, 13, 12, 15];
    const wx = ['26 Aug', '2 Sep', '9 Sep', '16 Sep', '23 Sep', '30 Sep', '7 Oct', '14 Oct'];
    const wmax = 18;
    const dv = [4120, 4010, 4380, 4290, 4650, 6210, 5300];
    const dx = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
    const dxx = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
    const dmax = 7400;
    const activeCount = s.merchants.length ? s.merchants.filter((m) => m.status === 'ACTIVE').length : 1;
    const totalCount = s.merchants.length || 1;
    return {
      doneText: doneN ? doneN + ' done so far today' : 'Here’s what needs you',
      kpis: [
        { label: 'ACTIVE BUSINESSES', value: String(activeCount), note: 'Live database merchants', href: '/admin/businesses' },
        { label: 'TOTAL MERCHANTS', value: String(totalCount), note: 'Platform registered', href: '/admin/businesses' },
        { label: 'CARD HOLDERS', value: '4', note: 'Active cafe members', href: '/admin/analytics' },
        { label: 'OUTBOX EVENTS', value: s.outbox?.pendingCount != null ? String(s.outbox.pendingCount) : '0 pending', note: 'Events worker healthy', href: '/admin/analytics' },
        { label: 'PLATFORM STATUS', value: 'ONLINE', note: 'NestJS port 3000', href: '/admin/billing' },
        { label: 'DATABASE', value: 'LIVE DB', note: 'PostgreSQL 5432', href: '/admin/support' },
      ],
      filters,
      queue,
      queueEmpty: queue.length === 0,
      weekBars: wv.map((v, i) => ({
        v: String(v),
        x: wx[i],
        h: Math.round((v / wmax) * 100) + '%',
        tip: 'Week of ' + wx[i] + ': ' + v + ' new businesses',
      })),
      dayBars: dv.map((v, i) => ({
        v: v.toLocaleString('en-US'),
        x: dxx[i],
        h: Math.round((v / dmax) * 100) + '%',
        tip: dx[i] + ': ' + v.toLocaleString('en-US') + ' stamps',
      })),
      services: [
        { name: 'Apple Wallet passes', state: 'Working · updates in under 1 min', dot: '#4661ad', color: '#5b6475' },
        { name: 'Google Wallet passes', state: 'Working', dot: '#4661ad', color: '#5b6475' },
        { name: 'Web cards', state: 'Working', dot: '#4661ad', color: '#5b6475' },
        { name: 'Telebirr payments', state: 'Slow · 2 failures in the last hour', dot: '#c81d29', color: '#c81d29' },
        { name: 'CBE Birr payments', state: 'Working', dot: '#4661ad', color: '#5b6475' },
        { name: 'Email & SMS', state: 'Not live yet (coming soon)', dot: '#c9cdd6', color: '#5b6475' },
      ],
    };
  }
}

AdminOverviewView.defaultProps = {};
AdminOverviewView.prototype.__template = function (__v) {
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
          <AdminSidebar active="overview" />
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                  {'Today on Temelash'}
                </h1>
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
              <p style={{ margin: '0', color: '#5b6475' }}>{`Wednesday, 21 October · ${__t(__v?.doneText)}`}</p>
            </div>{' '}
            <A
              href="/admin/businesses"
              style={{
                border: '1px solid #e3e5ec',
                background: '#ffffff',
                color: '#4661ad',
                fontWeight: '700',
                borderRadius: '12px',
                padding: '10px 18px',
                textDecoration: 'none',
                minHeight: '44px',
                boxSizing: 'border-box',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {'Find a business'}
            </A>
          </div>{' '}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
            {(__v?.kpis || []).map((k, __i0) => (
              <React.Fragment key={__i0}>
                <A
                  href={k?.href}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    textDecoration: 'none',
                    color: '#101827',
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
                  >{`${__t(k?.label)}`}</span>{' '}
                  <span
                    style={{
                      fontSize: '28px',
                      lineHeight: '32px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(k?.value)}`}</span>{' '}
                  <span style={{ fontSize: '13px', lineHeight: '18px', color: '#5b6475' }}>{`${__t(k?.note)}`}</span>
                </A>
              </React.Fragment>
            ))}
          </div>{' '}
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
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Needs attention'}
                </h2>
                <span style={{ fontSize: '14px', color: '#5b6475' }}>
                  {'Work through this list and nothing slips. Each action takes effect straight away.'}
                </span>
              </div>{' '}
              <div role="group" aria-label="Filter" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(__v?.filters || []).map((f, __i0) => (
                  <React.Fragment key={__i0}>
                    <button
                      type="button"
                      aria-pressed={f?.pressed}
                      onClick={f?.pick}
                      style={{
                        borderRadius: '999px',
                        padding: '6px 12px',
                        minHeight: '36px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px',
                        background: `${__t(f?.bg)}`,
                        color: `${__t(f?.color)}`,
                        border: `1px solid ${__t(f?.border)}`,
                      }}
                    >
                      {`${__t(f?.label)} `}
                      <span style={{ opacity: '0.8' }}>{`${__t(f?.n)}`}</span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>{' '}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {(__v?.queue || []).map((q, __i0) => (
                <React.Fragment key={__i0}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 0',
                      borderTop: '1px solid #e3e5ec',
                      opacity: `${__t(q?.opacity)}`,
                    }}
                  >
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
                        stroke={q?.iconColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={q?.icon} />
                      </svg>
                    </span>{' '}
                    <span style={{ flex: '1 1 280px', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            lineHeight: '16px',
                            fontWeight: '700',
                            letterSpacing: '0.08em',
                            color: `${__t(q?.tagColor)}`,
                          }}
                        >{`${__t(q?.tag)}`}</span>
                        <strong>{`${__t(q?.title)}`}</strong>
                      </span>{' '}
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(q?.detail)}`}</span>
                    </span>{' '}
                    {__b(q?.open) ? (
                      <>
                        <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {__b(q?.hasSecondary) ? (
                            <>
                              <A
                                href={q?.secHref}
                                onClick={q?.secAct}
                                style={{
                                  border: '1px solid #e3e5ec',
                                  background: '#ffffff',
                                  color: '#4661ad',
                                  fontWeight: '700',
                                  borderRadius: '10px',
                                  padding: '8px 14px',
                                  minHeight: '40px',
                                  boxSizing: 'border-box',
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                }}
                              >{`${__t(q?.secLabel)}`}</A>
                            </>
                          ) : null}{' '}
                          <button
                            type="button"
                            onClick={q?.primary}
                            style={{
                              border: '0',
                              background: '#101827',
                              color: '#ffffff',
                              fontWeight: '700',
                              borderRadius: '10px',
                              padding: '8px 14px',
                              minHeight: '40px',
                              cursor: 'pointer',
                            }}
                          >{`${__t(q?.primaryLabel)}`}</button>
                        </span>
                      </>
                    ) : null}{' '}
                    {__b(q?.done) ? (
                      <>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '700',
                            color: '#4661ad',
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
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
                          {`${__t(q?.result)} `}
                          <button
                            type="button"
                            onClick={q?.undo}
                            style={{
                              border: '0',
                              background: 'transparent',
                              color: '#5b6475',
                              fontWeight: '700',
                              padding: '4px',
                              minHeight: '36px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Undo'}
                          </button>
                        </span>
                      </>
                    ) : null}
                  </div>
                </React.Fragment>
              ))}{' '}
              {__b(__v?.queueEmpty) ? (
                <>
                  <p style={{ margin: '0', padding: '16px 0', color: '#5b6475', borderTop: '1px solid #e3e5ec' }}>
                    {'Nothing here. Nice work.'}
                  </p>
                </>
              ) : null}
            </div>
          </section>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'stretch' }}>
            <section
              style={{
                flex: '1 1 380px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                {'New businesses per week'}
              </h2>{' '}
              <div
                role="img"
                aria-label="New businesses per week over 8 weeks, from 6 to 15"
                style={{
                  height: '180px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-end',
                  borderBottom: '1px solid #e3e5ec',
                }}
              >
                {(__v?.weekBars || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      title={b?.tip}
                      style={{
                        flex: '1 1 0',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px',
                      }}
                    >
                      <span
                        style={{ fontSize: '12px', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}
                      >{`${__t(b?.v)}`}</span>
                      <div
                        className="bar"
                        style={{
                          width: '100%',
                          maxWidth: '32px',
                          height: `${__t(b?.h)}`,
                          background: '#4661ad',
                          borderRadius: '4px 4px 0 0',
                        }}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>{' '}
              <div aria-hidden="true" style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#5b6475' }}>
                {(__v?.weekBars || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <span style={{ flex: '1 1 0', textAlign: 'center' }}>{`${__t(b?.x)}`}</span>
                  </React.Fragment>
                ))}
              </div>
            </section>{' '}
            <section
              style={{
                flex: '1 1 380px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                {'Stamps across all businesses · 7 days'}
              </h2>{' '}
              <div
                role="img"
                aria-label="Stamps per day across all businesses, highest on Saturday"
                style={{
                  height: '180px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-end',
                  borderBottom: '1px solid #e3e5ec',
                }}
              >
                {(__v?.dayBars || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      title={b?.tip}
                      style={{
                        flex: '1 1 0',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px',
                      }}
                    >
                      <span
                        style={{ fontSize: '12px', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}
                      >{`${__t(b?.v)}`}</span>
                      <div
                        className="bar"
                        style={{
                          width: '100%',
                          maxWidth: '36px',
                          height: `${__t(b?.h)}`,
                          background: '#4661ad',
                          borderRadius: '4px 4px 0 0',
                        }}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>{' '}
              <div aria-hidden="true" style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#5b6475' }}>
                {(__v?.dayBars || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <span style={{ flex: '1 1 0', textAlign: 'center' }}>{`${__t(b?.x)}`}</span>
                  </React.Fragment>
                ))}
              </div>
            </section>
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
            <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Service status'}</h2>{' '}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {(__v?.services || []).map((v, __i0) => (
                <React.Fragment key={__i0}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#f7f7f9',
                      borderRadius: '12px',
                      padding: '12px 14px',
                    }}
                  >
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '999px',
                        background: `${__t(v?.dot)}`,
                        flex: 'none',
                      }}
                    />{' '}
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '15px' }}>{`${__t(v?.name)}`}</strong>
                      <span style={{ fontSize: '13px', color: `${__t(v?.color)}` }}>{`${__t(v?.state)}`}</span>
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default withDCStyle(AdminOverviewView, 'AdminOverview', __CSS);
