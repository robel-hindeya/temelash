'use client';
/* Generated from the Temelash Card design (AdminBilling.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-hide-sm{display:none !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.bar:hover{background:#101827 !important}\n.lbl{font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.08em;color:#5b6475}\n.btn{border:1px solid #e3e5ec;background:#ffffff;color:#101827;font-weight:700;border-radius:12px;padding:8px 14px;min-height:44px;cursor:pointer}\n.btn-p{border:0;background:#e42330;color:#ffffff;font-weight:700;border-radius:12px;padding:8px 16px;min-height:44px;cursor:pointer}\n.btn-l{border:0;background:transparent;color:#4661ad;font-weight:700;min-height:44px;cursor:pointer;padding:8px 6px}\n.fld{border:1px solid #e3e5ec;border-radius:12px;padding:10px 12px;min-height:44px;background:#ffffff;color:#101827;box-sizing:border-box}';
class AdminBillingView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'confirm',
      grace: '7',
      planFilter: 'all',
      invQ: '',
      toast: null,
      snap: null,
      rejOpen: null,
      msgs: {},
      pending: [
        {
          id: 'p1',
          biz: 'Habesha Bites',
          plan: 'Growth',
          months: '3 months',
          method: 'Bank transfer · CBE',
          ref: 'FT26291XK8Q2',
          when: 'today 08:55',
          until: '2026-10-24',
        },
        {
          id: 'p2',
          biz: 'Sheba Beauty',
          plan: 'Starter',
          months: '1 month',
          method: 'Telebirr',
          ref: 'TB9KQ0381220',
          when: 'yesterday',
          until: '2026-10-22',
        },
        {
          id: 'p3',
          biz: 'Entoto Spa',
          plan: 'Multi-branch',
          months: '12 months',
          method: 'Bank transfer · Awash',
          ref: 'AW-55102-77',
          when: 'Mon',
          until: '2026-10-30',
        },
      ],
      failed: [
        {
          id: 'f1',
          biz: 'Gebeya Burger',
          plan: 'Growth',
          due: 'Oct 14',
          method: 'Telebirr auto-pay',
          tries: 2,
          reminded: false,
          kind: 'auto',
        },
        {
          id: 'f2',
          biz: 'Sparkle Wash',
          plan: 'Starter',
          due: 'Oct 16',
          method: 'Bank transfer',
          tries: 0,
          reminded: false,
          kind: 'manual',
        },
        {
          id: 'f3',
          biz: 'Lime Spa',
          plan: 'Starter',
          due: 'Oct 10',
          method: 'Telebirr auto-pay',
          tries: 3,
          reminded: true,
          kind: 'auto',
        },
      ],
      subs: [
        { id: 's1', biz: 'Buna House', plan: 'Growth', cycle: 'Monthly', renews: 'Nov 3', cancel: false },
        { id: 's2', biz: 'Selam Salon', plan: 'Starter', cycle: 'Monthly', renews: 'Nov 9', cancel: false },
        {
          id: 's3',
          biz: 'Abyssinia Car Wash',
          plan: 'Multi-branch',
          cycle: 'Yearly',
          renews: 'Mar 2, 2027',
          cancel: false,
        },
        {
          id: 's4',
          biz: 'Lime Spa',
          plan: 'Starter',
          cycle: 'Monthly',
          renews: 'Overdue since Oct 10',
          cancel: false,
          overdue: true,
        },
        { id: 's5', biz: 'Habesha Bites', plan: 'Growth', cycle: 'Quarterly', renews: 'Oct 24', cancel: false },
        { id: 's6', biz: 'Arada Coffee', plan: 'Trial', cycle: 'Trial', renews: 'Trial ends Oct 28', cancel: false },
        {
          id: 's7',
          biz: 'Gebeya Burger',
          plan: 'Growth',
          cycle: 'Monthly',
          renews: 'Overdue since Oct 14',
          cancel: false,
          overdue: true,
        },
        { id: 's8', biz: 'Entoto Spa', plan: 'Multi-branch', cycle: 'Yearly', renews: 'Oct 30', cancel: false },
      ],
      invoices: [
        { no: 'TC-2026-0412', biz: 'Buna House', date: 'Oct 3, 2026', plan: 'Growth', status: 'Paid', sent: false },
        { no: 'TC-2026-0413', biz: 'Selam Salon', date: 'Oct 9, 2026', plan: 'Starter', status: 'Paid', sent: false },
        { no: 'TC-2026-0414', biz: 'Lime Spa', date: 'Oct 10, 2026', plan: 'Starter', status: 'Overdue', sent: false },
        {
          no: 'TC-2026-0415',
          biz: 'Gebeya Burger',
          date: 'Oct 14, 2026',
          plan: 'Growth',
          status: 'Overdue',
          sent: false,
        },
        { no: 'TC-2026-0416', biz: 'Sparkle Wash', date: 'Oct 16, 2026', plan: 'Starter', status: 'Due', sent: false },
        {
          no: 'TC-2026-0417',
          biz: 'Habesha Bites',
          date: 'Oct 20, 2026',
          plan: 'Growth',
          status: 'Awaiting confirm',
          sent: false,
        },
      ],
    };
  }
  componentWillUnmount() {
    clearTimeout(this.tt);
  }
  snapshot() {
    const s = this.state;
    return { pending: s.pending, failed: s.failed, subs: s.subs, invoices: s.invoices };
  }
  act(patch, toast, undoable) {
    clearTimeout(this.tt);
    const snap = undoable === false ? null : this.snapshot();
    this.setState(Object.assign({}, patch, { toast, snap }));
    this.tt = setTimeout(() => this.setState({ toast: null, snap: null }), 6000);
  }
  renderVals() {
    const s = this.state;
    const price = (p) => (p === 'Trial' ? 'Free' : '[ETB PRICE · ' + p + ']');
    const addMonths = (iso, n) => {
      const d = new Date(iso + 'T00:00:00');
      d.setMonth(d.getMonth() + n);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };
    const monthsN = (t) => parseInt(t, 10) || 1;
    const overdue = s.failed.length;
    const tiles = [
      { label: 'MONTHLY REVENUE', value: 'ETB [MRR]', sub: 'Paid plans only', subColor: '#5b6475' },
      {
        label: 'PAYING BUSINESSES',
        value: String(s.subs.filter((x) => x.plan !== 'Trial').length + 99),
        sub: '+6 this month',
        subColor: '#1d6b3a',
      },
      { label: 'TO CONFIRM', value: String(s.pending.length), sub: 'Bank and Telebirr', subColor: '#5b6475' },
      {
        label: 'OVERDUE',
        value: String(overdue),
        sub: overdue ? 'Grace period ' + s.grace + ' days' : 'All clear',
        subColor: overdue ? '#c81d29' : '#1d6b3a',
      },
    ];
    const series = [
      ['May', 61],
      ['Jun', 70],
      ['Jul', 78],
      ['Aug', 88],
      ['Sep', 99],
      ['Oct', 107],
    ];
    const max = 107 * 1.2;
    const bars = series.map(([m, v], i) => ({
      m,
      v: String(v),
      h: Math.round((v / max) * 130) + 'px',
      color: i === series.length - 1 ? '#e42330' : '#4661ad',
    }));
    const tabDefs = [
      ['confirm', 'Payments to confirm', s.pending.length],
      ['failed', 'Overdue', s.failed.length],
      ['subs', 'Subscriptions', s.subs.length],
      ['inv', 'Invoices', s.invoices.length],
    ];
    const tabs = tabDefs.map(([id, label, n]) => {
      const on = s.tab === id;
      return {
        label,
        n: String(n),
        pressed: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
        pick: () => this.setState({ tab: id }),
      };
    });
    const markInv = (biz, status) =>
      s.invoices.map((i) => (i.biz === biz && i.status !== 'Paid' ? Object.assign({}, i, { status }) : i));

    const pending = s.pending.map((p) => {
      const open = s.rejOpen === p.id;
      const first = p.biz;
      const msg =
        s.msgs[p.id] ??
        'Hi, we could not find reference ' +
          p.ref +
          ' in our account yet. Please send a photo of the receipt in your dashboard under Billing.';
      return Object.assign({}, p, {
        amount: price(p.plan) + ' × ' + monthsN(p.months),
        newUntil: addMonths(p.until, monthsN(p.months)),
        rejOpen: open,
        rejExpanded: open ? 'true' : 'false',
        msgId: 'rj-' + p.id,
        msg,
        onMsg: (e) => this.setState({ msgs: Object.assign({}, s.msgs, { [p.id]: e.target.value }) }),
        toggleReject: () => this.setState({ rejOpen: open ? null : p.id }),
        confirm: () =>
          this.act(
            { pending: s.pending.filter((x) => x.id !== p.id), invoices: markInv(p.biz, 'Paid'), rejOpen: null },
            first + ' confirmed. Paid until ' + addMonths(p.until, monthsN(p.months)) + '. Receipt sent.',
          ),
        sendReject: () =>
          this.act(
            {
              pending: s.pending.filter((x) => x.id !== p.id),
              failed: s.failed.concat([
                {
                  id: 'f' + p.id,
                  biz: p.biz,
                  plan: p.plan,
                  due: 'today',
                  method: p.method,
                  tries: 0,
                  reminded: true,
                  kind: 'manual',
                },
              ]),
              rejOpen: null,
            },
            'Message sent to ' + first + '. Moved to Overdue.',
          ),
      });
    });

    const failed = s.failed.map((f) => {
      const auto = f.kind === 'auto';
      const left =
        parseInt(s.grace, 10) - (f.due === 'Oct 10' ? 11 : f.due === 'Oct 14' ? 7 : f.due === 'Oct 16' ? 5 : 0);
      const locked = left <= 0;
      return Object.assign({}, f, {
        state: locked ? 'Dashboard locked' : left + ' days of grace left',
        stateColor: locked ? '#c81d29' : '#101827',
        detail: auto
          ? f.tries + ' auto-pay tries failed' + (f.reminded ? ' · reminded' : '')
          : 'No payment received' + (f.reminded ? ' · reminded' : ''),
        canRetry: auto,
        retryLabel: 'Retry Telebirr',
        retry: () => {
          if (f.tries >= 3) {
            const patch = {
              failed: s.failed.filter((x) => x.id !== f.id),
              subs: s.subs.map((x) =>
                x.biz === f.biz ? Object.assign({}, x, { renews: 'Nov 20', overdue: false }) : x,
              ),
              invoices: markInv(f.biz, 'Paid'),
            };
            this.act(patch, 'Retry worked. ' + f.biz + ' is paid.');
          } else
            this.act(
              { failed: s.failed.map((x) => (x.id === f.id ? Object.assign({}, x, { tries: x.tries + 1 }) : x)) },
              'Retry failed: not enough Telebirr balance. Try a reminder.',
            );
        },
        remindLabel: f.reminded ? 'Remind again' : 'Send reminder',
        remind: () =>
          this.act(
            { failed: s.failed.map((x) => (x.id === f.id ? Object.assign({}, x, { reminded: true }) : x)) },
            'Reminder sent to ' + f.biz + ' by SMS and dashboard banner.',
          ),
        markPaid: () =>
          this.act(
            {
              failed: s.failed.filter((x) => x.id !== f.id),
              subs: s.subs.map((x) =>
                x.biz === f.biz ? Object.assign({}, x, { renews: 'Nov 20', overdue: false }) : x,
              ),
              invoices: markInv(f.biz, 'Paid'),
            },
            f.biz + ' marked paid.',
          ),
      });
    });

    const pillPlan = (p) =>
      ({
        Trial: ['#e3e5ec', '#101827'],
        Starter: ['#f7f7f9', '#101827'],
        Growth: ['#eef1fa', '#4661ad'],
        'Multi-branch': ['#101827', '#ffffff'],
      })[p] || ['#f7f7f9', '#101827'];
    const subs = s.subs
      .filter((r) => s.planFilter === 'all' || r.plan === s.planFilter)
      .map((r) => {
        const pc = pillPlan(r.plan);
        return Object.assign({}, r, {
          pillBg: pc[0],
          pillColor: pc[1],
          selId: 'pl-' + r.id,
          renews: r.cancel ? 'Ends ' + r.renews.replace('Overdue since ', '') : r.renews,
          renewColor: r.overdue || r.cancel ? '#c81d29' : '#101827',
          cancelLabel: r.cancel ? 'Keep renewing' : 'Cancel at period end',
          cancelColor: r.cancel ? '#4661ad' : '#c81d29',
          onPlan: (e) => {
            const v = e.target.value;
            this.act(
              {
                subs: s.subs.map((x) =>
                  x.id === r.id
                    ? Object.assign({}, x, {
                        plan: v,
                        cycle: v === 'Trial' ? 'Trial' : x.cycle === 'Trial' ? 'Monthly' : x.cycle,
                      })
                    : x,
                ),
              },
              r.biz + ' moved to ' + v + '. Change starts at next renewal; owner notified.',
            );
          },
          toggleCancel: () =>
            this.act(
              { subs: s.subs.map((x) => (x.id === r.id ? Object.assign({}, x, { cancel: !x.cancel }) : x)) },
              r.cancel ? r.biz + ' will keep renewing.' : r.biz + ' will end at the end of this period.',
            ),
        });
      });

    const q = s.invQ.trim().toLowerCase();
    const invPill = (st) =>
      ({
        Paid: ['#e6f4ea', '#1d6b3a'],
        Overdue: ['#fde8e9', '#c81d29'],
        Due: ['#f7f7f9', '#101827'],
        'Awaiting confirm': ['#eef1fa', '#4661ad'],
      })[st];
    const invoices = s.invoices
      .filter((i) => !q || i.no.toLowerCase().includes(q) || i.biz.toLowerCase().includes(q))
      .map((i) => {
        const pc = invPill(i.status);
        return Object.assign({}, i, {
          amount: price(i.plan),
          pillBg: pc[0],
          pillColor: pc[1],
          unpaid: i.status !== 'Paid',
          resendLabel: i.sent ? 'Sent' : 'Resend',
          resend: () =>
            this.act(
              { invoices: s.invoices.map((x) => (x.no === i.no ? Object.assign({}, x, { sent: true }) : x)) },
              'Invoice ' + i.no + ' sent to ' + i.biz + '.',
              false,
            ),
          markPaid: () =>
            this.act(
              {
                invoices: s.invoices.map((x) => (x.no === i.no ? Object.assign({}, x, { status: 'Paid' }) : x)),
                failed: s.failed.filter((f) => f.biz !== i.biz),
                pending: s.pending.filter((p) => p.biz !== i.biz),
              },
              i.no + ' marked paid.',
            ),
        });
      });

    return {
      tiles,
      bars,
      tabs,
      tabConfirm: s.tab === 'confirm',
      tabFailed: s.tab === 'failed',
      tabSubs: s.tab === 'subs',
      tabInv: s.tab === 'inv',
      pending,
      confirmEmpty: pending.length === 0,
      failed,
      failedEmpty: failed.length === 0,
      grace: s.grace,
      onGrace: (e) => this.setState({ grace: e.target.value }),
      subs,
      planFilter: s.planFilter,
      onPlanFilter: (e) => this.setState({ planFilter: e.target.value }),
      invoices,
      invQ: s.invQ,
      onInvQ: (e) => this.setState({ invQ: e.target.value }),
      hasToast: !!s.toast,
      toast: s.toast || '',
      canUndo: !!s.snap,
      undo: () => {
        if (s.snap) {
          clearTimeout(this.tt);
          this.setState(Object.assign({}, s.snap, { toast: null, snap: null }));
        }
      },
    };
  }
}

AdminBillingView.defaultProps = {};
AdminBillingView.prototype.__template = function (__v) {
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
          <AdminSidebar active="billing" />
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
                {'Subscriptions & billing'}
              </h1>
              <span className="lbl" style={{ border: '1px solid #e3e5ec', borderRadius: '999px', padding: '2px 10px' }}>
                {'SAMPLE DATA'}
              </span>
            </div>{' '}
            <p style={{ margin: '0', color: '#5b6475' }}>
              {
                'Confirm payments merchants say they made, chase failed ones, and change plans. Prices come from Platform settings. Payment options: [Confirm payment options].'
              }
            </p>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {(__v?.tiles || []).map((t, __i0) => (
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
                  <span className="lbl">{`${__t(t?.label)}`}</span>
                  <span style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '800' }}>{`${__t(t?.value)}`}</span>
                  <span style={{ fontSize: '14px', color: `${__t(t?.subColor)}` }}>{`${__t(t?.sub)}`}</span>
                </div>
              </React.Fragment>
            ))}
          </div>{' '}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Paying businesses by month'}</h2>
              <span style={{ color: '#5b6475', fontSize: '14px' }}>{'Last 6 months'}</span>
            </div>{' '}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '170px' }}>
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
                    }}
                  >
                    <span style={{ fontWeight: '700', fontSize: '14px' }}>{`${__t(b?.v)}`}</span>{' '}
                    <div
                      className="bar"
                      style={{
                        width: '100%',
                        maxWidth: '56px',
                        height: `${__t(b?.h)}`,
                        background: `${__t(b?.color)}`,
                        borderRadius: '6px 6px 0 0',
                      }}
                    />{' '}
                    <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(b?.m)}`}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>{' '}
          <div role="tablist" aria-label="Billing views" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(__v?.tabs || []).map((c, __i0) => (
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
          {__b(__v?.tabConfirm) ? (
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
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Payments to confirm'}</h2>
                  <p style={{ margin: '0', color: '#5b6475', fontSize: '14px' }}>
                    {
                      'The merchant paid by bank transfer or Telebirr and sent a reference. Match it in the bank statement, then confirm.'
                    }
                  </p>
                </div>{' '}
                {__b(__v?.confirmEmpty) ? (
                  <>
                    <p style={{ margin: '0', color: '#5b6475' }}>{'All payments are confirmed.'}</p>
                  </>
                ) : null}{' '}
                {(__v?.pending || []).map((p, __i0) => (
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
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px', alignItems: 'center' }}>
                        <span style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '700' }}>{`${__t(p?.biz)}`}</span>
                          <span
                            style={{ fontSize: '14px', color: '#5b6475' }}
                          >{`${__t(p?.plan)} · ${__t(p?.months)} · ${__t(p?.amount)}`}</span>
                        </span>{' '}
                        <span style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column' }}>
                          <span className="lbl">{`${__t(p?.method)}`}</span>
                          <span
                            style={{ fontWeight: '600', fontFamily: 'ui-monospace, monospace' }}
                          >{`${__t(p?.ref)}`}</span>
                        </span>{' '}
                        <span
                          style={{ flex: '0 1 140px', fontSize: '14px', color: '#5b6475' }}
                        >{`Sent ${__t(p?.when)}`}</span>
                      </div>{' '}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                        <button type="button" className="btn-p" onClick={p?.confirm}>
                          {'Confirm payment'}
                        </button>{' '}
                        <button type="button" className="btn" onClick={p?.toggleReject} aria-expanded={p?.rejExpanded}>
                          {"Can't find it"}
                        </button>{' '}
                        <span
                          style={{ fontSize: '14px', color: '#5b6475' }}
                        >{`Confirming moves paid-until to ${__t(p?.newUntil)}.`}</span>
                      </div>{' '}
                      {__b(p?.rejOpen) ? (
                        <>
                          <div
                            style={{
                              background: '#f7f7f9',
                              borderRadius: '12px',
                              padding: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                            }}
                          >
                            <label htmlFor={p?.msgId} style={{ fontSize: '14px', fontWeight: '600' }}>
                              {'Message to the owner'}
                            </label>{' '}
                            <textarea
                              id={p?.msgId}
                              rows="3"
                              className="fld"
                              value={p?.msg}
                              style={{ resize: 'vertical' }}
                              onChange={p?.onMsg}
                            />{' '}
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                className="btn"
                                onClick={p?.sendReject}
                                style={{ background: '#101827', color: '#ffffff', borderColor: '#101827' }}
                              >
                                {'Send and keep unpaid'}
                              </button>
                              <button type="button" className="btn-l" onClick={p?.toggleReject}>
                                {'Cancel'}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tabFailed) ? (
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div>
                    <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>
                      {'Overdue and failed payments'}
                    </h2>
                    <p style={{ margin: '0', color: '#5b6475', fontSize: '14px' }}>
                      {
                        "Cards stay working during the grace period. After it, the dashboard locks but customers' cards keep their stamps."
                      }
                    </p>
                  </div>{' '}
                  <label
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}
                  >
                    {'Grace period\n'}
                    <select className="fld" value={__v?.grace} onChange={__v?.onGrace}>
                      <option value="3">{'3 days'}</option>
                      <option value="7">{'7 days'}</option>
                      <option value="14">{'14 days'}</option>
                    </select>
                  </label>
                </div>{' '}
                {__b(__v?.failedEmpty) ? (
                  <>
                    <p style={{ margin: '0', color: '#5b6475' }}>{'No overdue accounts.'}</p>
                  </>
                ) : null}{' '}
                {(__v?.failed || []).map((f, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px 20px',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700' }}>{`${__t(f?.biz)}`}</span>
                        <span
                          style={{ fontSize: '14px', color: '#5b6475' }}
                        >{`${__t(f?.plan)} · due ${__t(f?.due)} · ${__t(f?.method)}`}</span>
                      </span>{' '}
                      <span style={{ flex: '1 1 160px', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600', color: `${__t(f?.stateColor)}` }}>{`${__t(f?.state)}`}</span>
                        <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(f?.detail)}`}</span>
                      </span>{' '}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {__b(f?.canRetry) ? (
                          <>
                            <button type="button" className="btn" onClick={f?.retry}>{`${__t(f?.retryLabel)}`}</button>
                          </>
                        ) : null}{' '}
                        <button type="button" className="btn" onClick={f?.remind}>{`${__t(f?.remindLabel)}`}</button>{' '}
                        <button type="button" className="btn-l" onClick={f?.markPaid}>
                          {'Mark paid'}
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tabSubs) ? (
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'All subscriptions'}</h2>{' '}
                  <label
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}
                  >
                    {'Plan\n'}
                    <select className="fld" value={__v?.planFilter} onChange={__v?.onPlanFilter}>
                      <option value="all">{'All plans'}</option>
                      <option value="Starter">{'Starter'}</option>
                      <option value="Growth">{'Growth'}</option>
                      <option value="Multi-branch">{'Multi-branch'}</option>
                      <option value="Trial">{'Trial'}</option>
                    </select>
                  </label>
                </div>{' '}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '620px' }}>
                    <thead>
                      <tr style={{ textAlign: 'left' }}>
                        <th scope="col" className="lbl" style={{ padding: '10px 8px' }}>
                          {'BUSINESS'}
                        </th>
                        <th scope="col" className="lbl" style={{ padding: '10px 8px' }}>
                          {'PLAN'}
                        </th>
                        <th scope="col" className="lbl tm-hide-sm" style={{ padding: '10px 8px' }}>
                          {'BILLED'}
                        </th>
                        <th scope="col" className="lbl" style={{ padding: '10px 8px' }}>
                          {'RENEWS'}
                        </th>
                        <th scope="col" className="lbl" style={{ padding: '10px 8px' }}>
                          {'CHANGE'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(__v?.subs || []).map((r, __i0) => (
                        <React.Fragment key={__i0}>
                          <tr style={{ borderTop: '1px solid #e3e5ec' }}>
                            <td style={{ padding: '10px 8px', fontWeight: '700' }}>{`${__t(r?.biz)}`}</td>
                            <td style={{ padding: '10px 8px' }}>
                              <span
                                style={{
                                  fontSize: '13px',
                                  fontWeight: '700',
                                  borderRadius: '999px',
                                  padding: '2px 10px',
                                  background: `${__t(r?.pillBg)}`,
                                  color: `${__t(r?.pillColor)}`,
                                }}
                              >{`${__t(r?.plan)}`}</span>
                            </td>
                            <td
                              className="tm-hide-sm"
                              style={{ padding: '10px 8px', color: '#5b6475' }}
                            >{`${__t(r?.cycle)}`}</td>
                            <td
                              style={{ padding: '10px 8px', color: `${__t(r?.renewColor)}` }}
                            >{`${__t(r?.renews)}`}</td>
                            <td style={{ padding: '6px 8px' }}>
                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <label
                                  htmlFor={r?.selId}
                                  style={{
                                    position: 'absolute',
                                    width: '1px',
                                    height: '1px',
                                    overflow: 'hidden',
                                    clip: 'rect(0 0 0 0)',
                                  }}
                                >{`Plan for ${__t(r?.biz)}`}</label>{' '}
                                <select
                                  id={r?.selId}
                                  className="fld"
                                  value={r?.plan}
                                  onChange={r?.onPlan}
                                  style={{ minHeight: '40px', padding: '6px 10px' }}
                                >
                                  <option value="Trial">{'Trial'}</option>
                                  <option value="Starter">{'Starter'}</option>
                                  <option value="Growth">{'Growth'}</option>
                                  <option value="Multi-branch">{'Multi-branch'}</option>
                                </select>{' '}
                                <button
                                  type="button"
                                  className="btn-l"
                                  onClick={r?.toggleCancel}
                                  style={{ color: `${__t(r?.cancelColor)}` }}
                                >{`${__t(r?.cancelLabel)}`}</button>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tabInv) ? (
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Invoices'}</h2>{' '}
                  <input
                    type="search"
                    className="fld"
                    value={__v?.invQ}
                    placeholder="Invoice number or business"
                    aria-label="Search invoices"
                    style={{ width: '260px', maxWidth: '100%' }}
                    onChange={__v?.onInvQ}
                  />
                </div>{' '}
                {(__v?.invoices || []).map((i, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        padding: '10px 0',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px 20px',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{ flex: '0 1 120px', fontFamily: 'ui-monospace, monospace', fontSize: '14px' }}
                      >{`${__t(i?.no)}`}</span>{' '}
                      <span style={{ flex: '1 1 180px', fontWeight: '700' }}>{`${__t(i?.biz)}`}</span>{' '}
                      <span style={{ flex: '0 1 130px', color: '#5b6475', fontSize: '14px' }}>{`${__t(i?.date)}`}</span>{' '}
                      <span
                        style={{ flex: '0 1 140px', color: '#5b6475', fontSize: '14px' }}
                      >{`${__t(i?.amount)}`}</span>{' '}
                      <span
                        style={{
                          flex: '0 0 auto',
                          fontSize: '13px',
                          fontWeight: '700',
                          borderRadius: '999px',
                          padding: '2px 10px',
                          background: `${__t(i?.pillBg)}`,
                          color: `${__t(i?.pillColor)}`,
                        }}
                      >{`${__t(i?.status)}`}</span>{' '}
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                        <button type="button" className="btn-l" onClick={i?.resend}>{`${__t(i?.resendLabel)}`}</button>
                        {__b(i?.unpaid) ? (
                          <>
                            <button type="button" className="btn-l" onClick={i?.markPaid}>
                              {'Mark paid'}
                            </button>
                          </>
                        ) : null}
                      </div>
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
};

export default withDCStyle(AdminBillingView, 'AdminBilling', __CSS);
