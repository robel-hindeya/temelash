'use client';
/* Generated from the Temelash Card design (AdminApplications.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-hide-sm{display:none !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.qi:hover{background:#f7f7f9}';
class AdminApplicationsView extends DCLogic {
  constructor(props) {
    super(props);
    const mk = (o) => Object.assign({ status: 'waiting', checks: [false, false, false, false], log: [] }, o);
    this.state = {
      tab: 'waiting',
      selId: 'a1',
      trial: '14',
      plan: 'Starter',
      panel: null,
      hint: false,
      infoMsg: '',
      rejectReason: 'dup',
      rejectNote: '',
      openDoc: null,
      toast: null,
      prev: null,
      apps: [
        mk({
          id: 'a1',
          name: 'Tsehay Juice Bar',
          type: 'Café',
          area: 'Bole, near Edna Mall',
          owner: 'Tsehay Alemu',
          phone: '+251 91 123 4567',
          email: 'tsehay@example.com',
          when: 'today, 09:12',
          branches: 1,
          accent: '#4661ad',
          reward: 'Buy 9 juices, the 10th is free',
          stamps: 10,
          lat: 8.995,
          lng: 38.788,
          licence: 'TL/AA/14/2231',
          tin: '0045 1123 98',
          hasTin: true,
          log: ['Today 09:12 · Applied from the website'],
        }),
        mk({
          id: 'a2',
          name: 'Mekdes Hair Studio',
          type: 'Salon',
          area: 'Piassa',
          owner: 'Mekdes Tadesse',
          phone: '+251 92 445 1020',
          email: 'mekdes@example.com',
          when: 'today, 08:40',
          branches: 1,
          accent: '#e42330',
          reward: '6th blow-dry free',
          stamps: 6,
          lat: 9.035,
          lng: 38.752,
          licence: 'TL/AA/09/7781',
          tin: '0091 4410 22',
          hasTin: true,
          log: ['Today 08:40 · Applied from the website'],
        }),
        mk({
          id: 'a3',
          name: 'Bole Shine Car Wash',
          type: 'Car wash',
          area: 'Bole Rwanda',
          owner: 'Dawit Bekele',
          phone: '+251 91 880 3344',
          email: 'dawit@example.com',
          when: 'yesterday, 17:05',
          branches: 2,
          accent: '#101827',
          reward: '5th full wash free',
          stamps: 5,
          lat: 9.002,
          lng: 38.805,
          licence: 'TL/AA/21/0412',
          tin: '0033 9000 41',
          hasTin: true,
          log: ['Yesterday 17:05 · Applied from a sales call'],
        }),
        mk({
          id: 'a4',
          name: 'Lalibela Spa & Massage',
          type: 'Spa',
          area: 'Kazanchis',
          owner: 'Hanna Girma',
          phone: '+251 93 210 7788',
          email: 'hanna@example.com',
          when: '2 days ago',
          branches: 1,
          accent: '#4661ad',
          reward: '8th massage free',
          stamps: 8,
          lat: 9.018,
          lng: 38.768,
          licence: 'TL/AA/11/5530',
          tin: '',
          hasTin: false,
          status: 'info',
          checks: [true, false, true, true],
          log: ['Mon 10:20 · Applied from the website', 'Mon 14:02 · Info requested: TIN certificate missing'],
        }),
        mk({
          id: 'a5',
          name: 'Arada Coffee',
          type: 'Café',
          area: 'Arada',
          owner: 'Yonas Haile',
          phone: '+251 91 555 0909',
          email: 'yonas@example.com',
          when: 'last week',
          branches: 1,
          accent: '#e42330',
          reward: '10th coffee free',
          stamps: 10,
          lat: 9.032,
          lng: 38.745,
          licence: 'TL/AA/02/1180',
          tin: '0012 7781 05',
          hasTin: true,
          status: 'approved',
          checks: [true, true, true, true],
          outcome: 'Approved last week with a 14-day trial on Starter.',
          log: ['Approved by [Admin name]'],
        }),
        mk({
          id: 'a6',
          name: 'Test Shop 123',
          type: 'Restaurant',
          area: 'Unknown',
          owner: 'Abebe K.',
          phone: '+251 90 000 0000',
          email: 'test@example.com',
          when: 'last week',
          branches: 1,
          accent: '#5b6475',
          reward: 'Free meal',
          stamps: 10,
          lat: 9.01,
          lng: 38.77,
          licence: '',
          tin: '',
          hasTin: false,
          status: 'rejected',
          outcome: 'Rejected: duplicate account.',
          log: ['Rejected by [Admin name]: duplicate account'],
        }),
      ],
    };
  }
  componentWillUnmount() {
    clearTimeout(this.tt);
  }
  flash(text, prev) {
    clearTimeout(this.tt);
    this.setState({ toast: text, prev });
    this.tt = setTimeout(() => this.setState({ toast: null, prev: null }), 6000);
  }
  update(id, fn, toast) {
    const prev = this.state.apps;
    const apps = prev.map((a) => (a.id === id ? fn(Object.assign({}, a)) : a));
    this.setState({ apps, panel: null, hint: false });
    if (toast) this.flash(toast, prev);
  }
  renderVals() {
    const s = this.state;
    const apps = s.apps;
    const count = (st) => apps.filter((a) => a.status === st).length;
    const tabsDef = [
      ['waiting', 'Waiting'],
      ['info', 'Info requested'],
      ['approved', 'Approved'],
      ['rejected', 'Rejected'],
    ];
    const tabs = tabsDef.map(([id, label]) => {
      const on = s.tab === id;
      return {
        label,
        n: String(count(id)),
        pressed: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
        pick: () => {
          const first = apps.find((a) => a.status === id);
          this.setState({ tab: id, selId: first ? first.id : null, panel: null, hint: false, openDoc: null });
        },
      };
    });
    const pillOf = (st) =>
      ({
        waiting: ['Waiting', '#fde8e9', '#c81d29'],
        info: ['Info requested', '#eef1fa', '#4661ad'],
        approved: ['Approved', '#e6f4ea', '#1d6b3a'],
        rejected: ['Rejected', '#f7f7f9', '#5b6475'],
      })[st];
    const initials = (n) =>
      n
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
    const decorate = (a) => {
      const p = pillOf(a.status);
      return Object.assign({}, a, {
        initials: initials(a.name),
        pill: p[0],
        pillUp: p[0].toUpperCase(),
        pillBg: p[1],
        pillColor: p[2],
      });
    };
    const inTab = apps.filter((a) => a.status === s.tab);
    const list = inTab.map((a) => {
      const d = decorate(a);
      const on = a.id === s.selId;
      return Object.assign(d, {
        pressed: on ? 'true' : 'false',
        bg: on ? '#f7f7f9' : '#ffffff',
        border: on ? '#101827' : 'transparent',
        pick: () => this.setState({ selId: a.id, panel: null, hint: false, openDoc: null }),
      });
    });
    const raw = apps.find((a) => a.id === s.selId && a.status === s.tab);
    const sel = raw ? decorate(raw) : null;
    const tiles = [
      { label: 'WAITING', value: String(count('waiting')), sub: 'Oldest: yesterday 17:05' },
      { label: 'INFO REQUESTED', value: String(count('info')), sub: 'Waiting on the owner' },
      { label: 'APPROVED THIS WEEK', value: String(5 + count('approved')), sub: 'Goal: 10 a week' },
      { label: 'AVERAGE REVIEW TIME', value: '4 h', sub: 'Target: same day' },
    ];
    const out = {
      tiles,
      tabs,
      list,
      emptyList: list.length === 0,
      emptyHint: s.tab === 'waiting' ? 'Every application has been reviewed.' : 'Pick another tab.',
      hasSel: !!sel,
      hasToast: !!s.toast,
      toast: s.toast || '',
      undo: () => {
        if (s.prev) this.setState({ apps: s.prev, toast: null, prev: null });
      },
    };
    if (!sel) return Object.assign(out, { sel: {}, facts: [], docs: [], checks: [], infoTemplates: [] });

    const minLng = 38.72,
      maxLng = 38.82,
      maxLat = 9.06,
      minLat = 8.98;
    sel.px = String(Math.round(((sel.lng - minLng) / (maxLng - minLng)) * 320));
    sel.py = String(Math.round(((maxLat - sel.lat) / (maxLat - minLat)) * 180) + 12);
    sel.coords = sel.lat.toFixed(4) + ', ' + sel.lng.toFixed(4) + ' · ' + sel.area;
    sel.mapLabel = 'Map pin for ' + sel.name + ' in ' + sel.area;
    sel.dots = Array.from({ length: sel.stamps }, (_, i) => i);
    const facts = [
      { k: 'OWNER', v: sel.owner },
      { k: 'PHONE', v: sel.phone },
      { k: 'EMAIL', v: sel.email },
      { k: 'TYPE', v: sel.type },
      { k: 'BRANCHES', v: String(sel.branches) },
      { k: 'ADDRESS', v: sel.area + ', Addis Ababa' },
    ];
    const docDefs = [
      {
        id: 'lic',
        label: 'Trade licence',
        has: !!sel.licence,
        number: sel.licence,
        head: 'TRADE LICENCE (UPLOADED FILE)',
      },
      { id: 'tin', label: 'TIN certificate', has: !!sel.tin, number: sel.tin, head: 'TIN CERTIFICATE (UPLOADED FILE)' },
    ];
    const docs = docDefs.map((d) => {
      const open = s.openDoc === d.id && d.has;
      return Object.assign(d, {
        sub: d.has ? 'Uploaded · ' + d.number : 'Not uploaded yet',
        subColor: d.has ? '#5b6475' : '#c81d29',
        docName: sel.name,
        open,
        btn: open ? 'Hide' : 'View',
        expanded: open ? 'true' : 'false',
        toggle: () => this.setState({ openDoc: open ? null : d.id }),
      });
    });
    const checkDefs = [
      ['Licence name matches the business', 'Name and address on the trade licence match what they entered.'],
      [
        'TIN is valid',
        sel.hasTin
          ? 'Look the number up on the revenue authority site.'
          : 'No TIN uploaded. Ask for it before approving.',
      ],
      ['Location looks right', 'The pin sits on a real street in the area they gave.'],
      ['Phone answered', 'Call the owner and confirm they signed up.'],
    ];
    const checks = checkDefs.map(([label, help], i) => {
      const on = sel.checks[i];
      return {
        label,
        help,
        aria: on ? 'true' : 'false',
        boxBg: on ? '#101827' : '#ffffff',
        boxBorder: on ? '#101827' : '#5b6475',
        tick: on ? 'block' : 'none',
        toggle: () => {
          const apps2 = s.apps.map((a) => {
            if (a.id !== sel.id) return a;
            const c = a.checks.slice();
            c[i] = !c[i];
            return Object.assign({}, a, { checks: c });
          });
          this.setState({ apps: apps2, hint: false });
        },
      };
    });
    const done = sel.checks.filter(Boolean).length;
    const ready = done === 4;
    const first = sel.owner.split(' ')[0];
    const tpl = [
      {
        label: 'Missing TIN',
        text:
          'Hi ' +
          first +
          ', thanks for signing up to Temelash Card. Please upload a photo of your TIN certificate in your dashboard so we can finish checking your account.',
      },
      {
        label: 'Licence unclear',
        text:
          'Hi ' +
          first +
          ', the trade licence photo is hard to read. Could you upload a clearer one? Your setup is saved.',
      },
      {
        label: 'Confirm location',
        text:
          'Hi ' +
          first +
          ', we could not match your map pin to your address. Please move the pin to your shop door in Settings > Branches.',
      },
    ];
    const nextAfter = (id, st) => {
      const rest = s.apps.filter((a) => a.status === s.tab && a.id !== id);
      return rest.length ? rest[0].id : null;
    };
    const stamp = 'Today ' + new Date().toTimeString().slice(0, 5);
    const reasons = {
      dup: 'duplicate account',
      licence: "licence doesn't match the business",
      fake: "location or business couldn't be confirmed",
      type: "business type we don't support yet",
    };
    return Object.assign(out, {
      sel,
      facts,
      docs,
      checks,
      checkCount: String(done),
      isOpen: sel.status === 'waiting' || sel.status === 'info',
      isDone: sel.status === 'approved' || sel.status === 'rejected',
      isApproved: sel.status === 'approved',
      trial: s.trial,
      plan: s.plan,
      onTrial: (e) => this.setState({ trial: e.target.value }),
      onPlan: (e) => this.setState({ plan: e.target.value }),
      approveBg: ready ? '#e42330' : '#c7cad3',
      approveCursor: ready ? 'pointer' : 'not-allowed',
      approveDisabled: ready ? 'false' : 'true',
      showApproveHint: s.hint,
      approve: () => {
        if (!ready) {
          this.setState({ hint: true });
          return;
        }
        const nx = nextAfter(sel.id);
        this.update(
          sel.id,
          (a) =>
            Object.assign(a, {
              status: 'approved',
              outcome:
                'Approved. ' + s.trial + '-day trial on ' + s.plan + ' started. Welcome SMS sent to ' + a.phone + '.',
              log: a.log.concat(stamp + ' · Approved by [Admin name], ' + s.trial + '-day trial'),
            }),
          sel.name + ' approved. Trial started.',
        );
        this.setState({ selId: nx });
      },
      infoOpen: s.panel === 'info',
      rejectOpen: s.panel === 'reject',
      infoExpanded: s.panel === 'info' ? 'true' : 'false',
      rejectExpanded: s.panel === 'reject' ? 'true' : 'false',
      openInfo: () =>
        this.setState({
          panel: s.panel === 'info' ? null : 'info',
          infoMsg: s.infoMsg || (sel.hasTin ? tpl[1].text : tpl[0].text),
        }),
      openReject: () => this.setState({ panel: s.panel === 'reject' ? null : 'reject' }),
      closePanels: () => this.setState({ panel: null }),
      infoTemplates: tpl.map((t) => ({ label: t.label, use: () => this.setState({ infoMsg: t.text }) })),
      infoMsg: s.infoMsg,
      onInfoMsg: (e) => this.setState({ infoMsg: e.target.value }),
      sendInfo: () => {
        const msg = s.infoMsg;
        const nx = s.tab === 'info' ? sel.id : nextAfter(sel.id);
        this.update(
          sel.id,
          (a) =>
            Object.assign(a, {
              status: 'info',
              log: a.log.concat(stamp + ' · Info requested: "' + msg.slice(0, 60) + (msg.length > 60 ? '…' : '') + '"'),
            }),
          'Message sent to ' + sel.owner + '.',
        );
        this.setState({ selId: nx, infoMsg: '' });
      },
      rejectReason: s.rejectReason,
      onRejectReason: (e) => this.setState({ rejectReason: e.target.value }),
      rejectNote: s.rejectNote,
      onRejectNote: (e) => this.setState({ rejectNote: e.target.value }),
      reject: () => {
        const r = reasons[s.rejectReason];
        const note = s.rejectNote;
        const nx = nextAfter(sel.id);
        this.update(
          sel.id,
          (a) =>
            Object.assign(a, {
              status: 'rejected',
              outcome: 'Rejected: ' + r + '. The owner was told by SMS.',
              log: a.log.concat(stamp + ' · Rejected: ' + r + (note ? ' (note: ' + note + ')' : '')),
            }),
          sel.name + ' rejected.',
        );
        this.setState({ selId: nx, rejectNote: '' });
      },
      reopen: () => {
        this.update(
          sel.id,
          (a) => Object.assign(a, { status: 'waiting', log: a.log.concat(stamp + ' · Moved back to waiting') }),
          sel.name + ' moved back to waiting.',
        );
        this.setState({ tab: 'waiting' });
      },
    });
  }
}

AdminApplicationsView.defaultProps = {};
AdminApplicationsView.prototype.__template = function (__v) {
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
          <AdminSidebar active="applications" />
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
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Applications'}</h1>
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
              {
                'New businesses wait here until someone checks their trade licence, TIN and location. Approving starts their free trial and sends them a welcome message.'
              }
            </p>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {(__v?.tiles || []).map((t, __i0) => (
              <React.Fragment key={__i0}>
                <div
                  style={{
                    flex: '1 1 160px',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
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
                  >{`${__t(t?.label)}`}</span>{' '}
                  <span style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '800' }}>{`${__t(t?.value)}`}</span>{' '}
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(t?.sub)}`}</span>
                </div>
              </React.Fragment>
            ))}
          </div>{' '}
          <div role="tablist" aria-label="Application status" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
            <section
              aria-label="Application queue"
              style={{
                flex: '1 1 280px',
                minWidth: '0',
                maxWidth: '100%',
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
                  <div
                    style={{ padding: '24px 16px', color: '#5b6475', textAlign: 'center' }}
                  >{`Nothing here. ${__t(__v?.emptyHint)}`}</div>
                </>
              ) : null}{' '}
              {(__v?.list || []).map((a, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    className="qi"
                    onClick={a?.pick}
                    aria-pressed={a?.pressed}
                    style={{
                      border: `1px solid ${__t(a?.border)}`,
                      background: `${__t(a?.bg)}`,
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      color: '#101827',
                    }}
                  >
                    <span
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: `${__t(a?.accent)}`,
                        color: '#ffffff',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'none',
                      }}
                    >{`${__t(a?.initials)}`}</span>{' '}
                    <span style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: '700' }}>{`${__t(a?.name)}`}</span>{' '}
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(a?.type)} · ${__t(a?.area)}`}</span>{' '}
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(a?.when)}`}</span>
                    </span>{' '}
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        borderRadius: '999px',
                        padding: '1px 8px',
                        background: `${__t(a?.pillBg)}`,
                        color: `${__t(a?.pillColor)}`,
                        whiteSpace: 'nowrap',
                      }}
                    >{`${__t(a?.pill)}`}</span>
                  </button>
                </React.Fragment>
              ))}
            </section>{' '}
            {__b(__v?.hasSel) ? (
              <>
                <section
                  aria-label="Review"
                  style={{
                    flex: '2 1 480px',
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                    <span
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '12px',
                        background: `${__t(__v?.sel?.accent)}`,
                        color: '#ffffff',
                        fontWeight: '800',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >{`${__t(__v?.sel?.initials)}`}</span>{' '}
                    <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
                      <h2 style={{ margin: '0', fontSize: '22px', lineHeight: '28px' }}>{`${__t(__v?.sel?.name)}`}</h2>{' '}
                      <span
                        style={{ color: '#5b6475' }}
                      >{`${__t(__v?.sel?.type)} · applied ${__t(__v?.sel?.when)}`}</span>
                    </div>{' '}
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        borderRadius: '999px',
                        padding: '3px 10px',
                        background: `${__t(__v?.sel?.pillBg)}`,
                        color: `${__t(__v?.sel?.pillColor)}`,
                      }}
                    >{`${__t(__v?.sel?.pillUp)}`}</span>
                  </div>{' '}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '12px 20px',
                    }}
                  >
                    {(__v?.facts || []).map((f, __i0) => (
                      <React.Fragment key={__i0}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '16px',
                              fontWeight: '700',
                              letterSpacing: '0.08em',
                              color: '#5b6475',
                            }}
                          >{`${__t(f?.k)}`}</span>
                          <span style={{ fontWeight: '600', overflowWrap: 'anywhere' }}>{`${__t(f?.v)}`}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '16px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          color: '#5b6475',
                        }}
                      >
                        {'LOCATION PIN'}
                      </span>{' '}
                      <svg
                        viewBox="0 0 320 180"
                        role="img"
                        aria-label={__v?.sel?.mapLabel}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '12px',
                          border: '1px solid #e3e5ec',
                          background: '#eef0f4',
                        }}
                      >
                        <path d="M0 60 L320 40" stroke="#ffffff" strokeWidth="10" />
                        <path d="M0 130 L320 150" stroke="#ffffff" strokeWidth="8" />
                        <path d="M90 0 L120 180" stroke="#ffffff" strokeWidth="10" />
                        <path d="M230 0 L210 180" stroke="#ffffff" strokeWidth="6" />{' '}
                        <rect x="140" y="70" width="50" height="40" rx="6" fill="#dfe8d8" />{' '}
                        <g transform={`translate(${__t(__v?.sel?.px)} ${__t(__v?.sel?.py)})`}>
                          <path
                            d="M0 0 C -10 -14 -12 -18 -12 -24 A 12 12 0 1 1 12 -24 C 12 -18 10 -14 0 0 Z"
                            fill="#e42330"
                          />
                          <circle cx="0" cy="-24" r="4.5" fill="#ffffff" />
                        </g>
                      </svg>{' '}
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.sel?.coords)}`}</span>
                    </div>{' '}
                    <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '16px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          color: '#5b6475',
                        }}
                      >
                        {'DOCUMENTS'}
                      </span>{' '}
                      {(__v?.docs || []).map((d, __i0) => (
                        <React.Fragment key={__i0}>
                          <div
                            style={{
                              border: '1px solid #e3e5ec',
                              borderRadius: '12px',
                              padding: '10px 12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4661ad"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M14 3H6v18h12V7z M14 3v4h4" />
                              </svg>{' '}
                              <span
                                style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minWidth: '0' }}
                              >
                                <span style={{ fontWeight: '700' }}>{`${__t(d?.label)}`}</span>
                                <span
                                  style={{ fontSize: '14px', color: `${__t(d?.subColor)}` }}
                                >{`${__t(d?.sub)}`}</span>
                              </span>{' '}
                              {__b(d?.has) ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={d?.toggle}
                                    aria-expanded={d?.expanded}
                                    style={{
                                      border: '1px solid #e3e5ec',
                                      background: '#ffffff',
                                      color: '#4661ad',
                                      fontWeight: '700',
                                      borderRadius: '12px',
                                      padding: '6px 12px',
                                      minHeight: '40px',
                                      cursor: 'pointer',
                                    }}
                                  >{`${__t(d?.btn)}`}</button>
                                </>
                              ) : null}
                            </div>{' '}
                            {__b(d?.open) ? (
                              <>
                                <div
                                  style={{
                                    background: '#f7f7f9',
                                    borderRadius: '6px',
                                    padding: '14px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '12px',
                                      fontWeight: '700',
                                      letterSpacing: '0.08em',
                                      color: '#5b6475',
                                    }}
                                  >{`${__t(d?.head)}`}</span>{' '}
                                  <span
                                    style={{ height: '8px', width: '70%', background: '#e3e5ec', borderRadius: '4px' }}
                                  />
                                  <span
                                    style={{ height: '8px', width: '90%', background: '#e3e5ec', borderRadius: '4px' }}
                                  />
                                  <span
                                    style={{ height: '8px', width: '55%', background: '#e3e5ec', borderRadius: '4px' }}
                                  />{' '}
                                  <span style={{ fontSize: '14px' }}>
                                    {'Name on document: '}
                                    <strong>{`${__t(d?.docName)}`}</strong>
                                  </span>{' '}
                                  <span style={{ fontSize: '14px' }}>
                                    {'Number: '}
                                    <strong>{`${__t(d?.number)}`}</strong>
                                  </span>
                                </div>
                              </>
                            ) : null}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      {'THEIR CARD'}
                    </span>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '240px',
                          maxWidth: '100%',
                          borderRadius: '12px',
                          background: `${__t(__v?.sel?.accent)}`,
                          color: '#ffffff',
                          padding: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                        }}
                      >
                        <span style={{ fontWeight: '700' }}>{`${__t(__v?.sel?.name)}`}</span>{' '}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {(__v?.sel?.dots || []).map((x, __i0) => (
                            <React.Fragment key={__i0}>
                              <span
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '999px',
                                  border: '2px solid rgba(255,255,255,0.7)',
                                  boxSizing: 'border-box',
                                }}
                              />
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        <span style={{ fontSize: '14px' }}>{`${__t(__v?.sel?.reward)}`}</span>
                      </div>{' '}
                      <span style={{ flex: '1 1 200px', color: '#5b6475', fontSize: '14px' }}>
                        {'Check the reward is a real thing they sell and the card name matches the licence.'}
                      </span>
                    </div>
                  </div>{' '}
                  {__b(__v?.isOpen) ? (
                    <>
                      <div
                        style={{
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}
                        >
                          <span style={{ fontWeight: '700' }}>{'Checks'}</span>
                          <span
                            style={{ color: '#5b6475', fontSize: '14px' }}
                          >{`${__t(__v?.checkCount)} of 4 done`}</span>
                        </div>{' '}
                        {(__v?.checks || []).map((c, __i0) => (
                          <React.Fragment key={__i0}>
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={c?.aria}
                              onClick={c?.toggle}
                              style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'flex-start',
                                border: '0',
                                background: 'transparent',
                                padding: '6px 0',
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
                                  border: `2px solid ${__t(c?.boxBorder)}`,
                                  background: `${__t(c?.boxBg)}`,
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
                                  style={{ display: `${__t(c?.tick)}` }}
                                >
                                  <path d="M5 12l5 5 9-10" />
                                </svg>
                              </span>{' '}
                              <span style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: '600' }}>{`${__t(c?.label)}`}</span>
                                <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(c?.help)}`}</span>
                              </span>
                            </button>
                          </React.Fragment>
                        ))}
                      </div>{' '}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' }}>
                        <label
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            fontWeight: '600',
                            fontSize: '14px',
                          }}
                        >
                          {'Free trial\n'}
                          <select
                            value={__v?.trial}
                            onChange={__v?.onTrial}
                            style={{
                              border: '1px solid #e3e5ec',
                              borderRadius: '12px',
                              padding: '10px 12px',
                              minHeight: '48px',
                              background: '#ffffff',
                              color: '#101827',
                            }}
                          >
                            <option value="14">{'14 days'}</option>
                            <option value="30">{'30 days'}</option>
                            <option value="7">{'7 days'}</option>
                          </select>
                        </label>{' '}
                        <label
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            fontWeight: '600',
                            fontSize: '14px',
                          }}
                        >
                          {'Plan after trial\n'}
                          <select
                            value={__v?.plan}
                            onChange={__v?.onPlan}
                            style={{
                              border: '1px solid #e3e5ec',
                              borderRadius: '12px',
                              padding: '10px 12px',
                              minHeight: '48px',
                              background: '#ffffff',
                              color: '#101827',
                            }}
                          >
                            <option value="Starter">{'Starter'}</option>
                            <option value="Growth">{'Growth'}</option>
                            <option value="Multi-branch">{'Multi-branch'}</option>
                          </select>
                        </label>
                      </div>{' '}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={__v?.approve}
                          aria-disabled={__v?.approveDisabled}
                          style={{
                            border: '0',
                            background: `${__t(__v?.approveBg)}`,
                            color: '#ffffff',
                            fontWeight: '700',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            minHeight: '48px',
                            cursor: `${__t(__v?.approveCursor)}`,
                          }}
                        >
                          {'Approve and start trial'}
                        </button>{' '}
                        <button
                          type="button"
                          onClick={__v?.openInfo}
                          aria-expanded={__v?.infoExpanded}
                          style={{
                            border: '1px solid #e3e5ec',
                            background: '#ffffff',
                            color: '#101827',
                            fontWeight: '700',
                            borderRadius: '12px',
                            padding: '12px 18px',
                            minHeight: '48px',
                            cursor: 'pointer',
                          }}
                        >
                          {'Ask for more info'}
                        </button>{' '}
                        <button
                          type="button"
                          onClick={__v?.openReject}
                          aria-expanded={__v?.rejectExpanded}
                          style={{
                            border: '0',
                            background: 'transparent',
                            color: '#c81d29',
                            fontWeight: '700',
                            borderRadius: '12px',
                            padding: '12px 10px',
                            minHeight: '48px',
                            cursor: 'pointer',
                          }}
                        >
                          {'Reject'}
                        </button>{' '}
                        {__b(__v?.showApproveHint) ? (
                          <>
                            <span role="status" style={{ color: '#c81d29', fontSize: '14px', fontWeight: '600' }}>
                              {'Tick all 4 checks before approving.'}
                            </span>
                          </>
                        ) : null}
                      </div>{' '}
                      {__b(__v?.infoOpen) ? (
                        <>
                          <div
                            style={{
                              border: '1px solid #e3e5ec',
                              borderRadius: '12px',
                              padding: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px',
                              background: '#f7f7f9',
                            }}
                          >
                            <span style={{ fontWeight: '700' }}>{`Message to ${__t(__v?.sel?.owner)}`}</span>{' '}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {(__v?.infoTemplates || []).map((tp, __i0) => (
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
                            <label htmlFor="ap-msg" style={{ fontSize: '14px', fontWeight: '600' }}>
                              {'They get this by SMS and in their dashboard'}
                            </label>{' '}
                            <textarea
                              id="ap-msg"
                              rows="4"
                              value={__v?.infoMsg}
                              style={{
                                border: '1px solid #e3e5ec',
                                borderRadius: '12px',
                                padding: '12px',
                                resize: 'vertical',
                                background: '#ffffff',
                              }}
                              onChange={__v?.onInfoMsg}
                            />{' '}
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={__v?.sendInfo}
                                style={{
                                  border: '0',
                                  background: '#101827',
                                  color: '#ffffff',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '10px 18px',
                                  minHeight: '44px',
                                  cursor: 'pointer',
                                }}
                              >
                                {'Send and mark "Info requested"'}
                              </button>
                              <button
                                type="button"
                                onClick={__v?.closePanels}
                                style={{
                                  border: '0',
                                  background: 'transparent',
                                  color: '#4661ad',
                                  fontWeight: '700',
                                  minHeight: '44px',
                                  cursor: 'pointer',
                                }}
                              >
                                {'Cancel'}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : null}{' '}
                      {__b(__v?.rejectOpen) ? (
                        <>
                          <div
                            style={{
                              border: '1px solid #c81d29',
                              borderRadius: '12px',
                              padding: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px',
                              background: '#fde8e9',
                            }}
                          >
                            <span style={{ fontWeight: '700' }}>{`Reject ${__t(__v?.sel?.name)}?`}</span>{' '}
                            <label
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                fontSize: '14px',
                                fontWeight: '600',
                              }}
                            >
                              {'Reason (shown to the owner)\n'}
                              <select
                                value={__v?.rejectReason}
                                onChange={__v?.onRejectReason}
                                style={{
                                  border: '1px solid #e3e5ec',
                                  borderRadius: '12px',
                                  padding: '10px 12px',
                                  minHeight: '48px',
                                  background: '#ffffff',
                                  color: '#101827',
                                }}
                              >
                                <option value="dup">{'Duplicate account'}</option>
                                <option value="licence">{"Licence doesn't match the business"}</option>
                                <option value="fake">{"Location or business couldn't be confirmed"}</option>
                                <option value="type">{"Business type we don't support yet"}</option>
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
                              {'Internal note (team only)\n'}
                              <input
                                value={__v?.rejectNote}
                                placeholder="Optional"
                                style={{
                                  border: '1px solid #e3e5ec',
                                  borderRadius: '12px',
                                  padding: '10px 12px',
                                  minHeight: '44px',
                                  background: '#ffffff',
                                }}
                                onChange={__v?.onRejectNote}
                              />
                            </label>{' '}
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={__v?.reject}
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
                                {'Reject application'}
                              </button>
                              <button
                                type="button"
                                onClick={__v?.closePanels}
                                style={{
                                  border: '0',
                                  background: 'transparent',
                                  color: '#4661ad',
                                  fontWeight: '700',
                                  minHeight: '44px',
                                  cursor: 'pointer',
                                }}
                              >
                                {'Keep it'}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}{' '}
                  {__b(__v?.isDone) ? (
                    <>
                      <div
                        style={{
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '12px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#f7f7f9',
                        }}
                      >
                        <span style={{ flex: '1 1 240px' }}>{`${__t(__v?.sel?.outcome)}`}</span>{' '}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {__b(__v?.isApproved) ? (
                            <>
                              <A
                                href="/admin/businesses"
                                style={{
                                  fontWeight: '700',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  minHeight: '44px',
                                }}
                              >
                                {'Open in Businesses'}
                              </A>
                            </>
                          ) : null}{' '}
                          <button
                            type="button"
                            onClick={__v?.reopen}
                            style={{
                              border: '1px solid #e3e5ec',
                              background: '#ffffff',
                              color: '#101827',
                              fontWeight: '700',
                              borderRadius: '12px',
                              padding: '8px 16px',
                              minHeight: '44px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Move back to waiting'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      {'HISTORY'}
                    </span>{' '}
                    {(__v?.sel?.log || []).map((l, __i0) => (
                      <React.Fragment key={__i0}>
                        <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(l)}`}</span>
                      </React.Fragment>
                    ))}
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
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  maxWidth: '100%',
                }}
              >
                <span>{`${__t(__v?.toast)}`}</span>
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
              </div>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default withDCStyle(AdminApplicationsView, 'AdminApplications', __CSS);
