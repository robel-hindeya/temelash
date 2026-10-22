'use client';
/* Generated from the Temelash Card design (AdminBroadcast.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-hide-sm{display:none !important}}\n@media (min-width:1100px){.ab-sticky{position:sticky;top:24px}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.lbl{font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.08em;color:#5b6475}\n.btn{border:1px solid #e3e5ec;background:#ffffff;color:#101827;font-weight:700;border-radius:12px;padding:8px 14px;min-height:44px;cursor:pointer}\n.btn-p{border:0;background:#e42330;color:#ffffff;font-weight:700;border-radius:12px;padding:10px 20px;min-height:48px;cursor:pointer}\n.btn-l{border:0;background:transparent;color:#4661ad;font-weight:700;min-height:44px;cursor:pointer;padding:8px 6px}\n.fld{border:1px solid #e3e5ec;border-radius:12px;padding:10px 12px;min-height:44px;background:#ffffff;color:#101827;box-sizing:border-box;width:100%}\n.fl{display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600}';
class AdminBroadcastView extends DCLogic {
  constructor(props) {
    super(props);
    this.blank = {
      kind: 'feature',
      title: 'New: double stamp days',
      body: 'Pick a slow day and give customers 2 stamps per visit. Set it up in Offers & reminders.',
      bodyAm: '',
      cta: 'Try it',
      ctaTo: 'Offers & reminders',
      aud: 'all',
      plans: ['Trial', 'Starter', 'Growth', 'Multi-branch'],
      types: ['Café', 'Restaurant', 'Salon', 'Spa', 'Car wash'],
      oneBiz: 'Buna House',
      staff: false,
      when: 'now',
      at: '2026-10-25T08:00',
      days: '7',
    };
    this.state = Object.assign({}, this.blank, {
      pv: 'dash',
      err: '',
      toast: null,
      history: [
        {
          id: 'h1',
          title: 'Telebirr payments delayed tonight',
          kind: 'maint',
          status: 'Live',
          meta: 'All businesses · dashboard + staff app · started today 07:00',
          read: 0.62,
        },
        {
          id: 'h2',
          title: 'Shop: new window decals',
          kind: 'feature',
          status: 'Scheduled',
          meta: 'Cafés and restaurants · Oct 25, 08:00',
          read: 0,
        },
        {
          id: 'h3',
          title: 'Price change from November',
          kind: 'pay',
          status: 'Ended',
          meta: 'Paid plans · Oct 1–14',
          read: 0.91,
        },
      ],
    });
  }
  componentWillUnmount() {
    clearTimeout(this.tt);
  }
  flash(t) {
    clearTimeout(this.tt);
    this.setState({ toast: t });
    this.tt = setTimeout(() => this.setState({ toast: null }), 4000);
  }
  renderVals() {
    const s = this.state;
    const chip = (on) => ({
      pressed: on ? 'true' : 'false',
      bg: on ? '#101827' : '#ffffff',
      color: on ? '#ffffff' : '#101827',
      border: on ? '#101827' : '#e3e5ec',
    });
    const KIND = {
      info: ['Info', '#eef1fa', '#101827', 'M12 8h.01M11 12h1v5h1M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z'],
      feature: ['New feature', '#101827', '#ffffff', 'M12 3l2.5 6H21l-5 4 2 7-6-4-6 4 2-7-5-4h6.5z'],
      maint: [
        'Maintenance',
        '#fde8e9',
        '#c81d29',
        'M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
      ],
      pay: ['Payments', '#ffffff', '#101827', 'M2 6h20v12H2zM2 10h20'],
    };
    const kinds = Object.keys(KIND).map((id) =>
      Object.assign({ label: KIND[id][0], pick: () => this.setState({ kind: id }) }, chip(s.kind === id)),
    );
    const planN = { Trial: 21, Starter: 58, Growth: 37, 'Multi-branch': 12 };
    const typeN = { Café: 49, Restaurant: 28, Salon: 23, Spa: 13, 'Car wash': 15 };
    const box = (list, key, label, n) => {
      const on = list.indexOf(label) >= 0;
      return {
        label,
        n: String(n),
        aria: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        border: on ? '#101827' : '#5b6475',
        toggle: () => this.setState({ [key]: on ? list.filter((x) => x !== label) : list.concat([label]) }),
      };
    };
    const audDefs = [
      ['all', 'All businesses'],
      ['trial', 'On trial'],
      ['some', 'Pick plans and types'],
      ['one', 'One business'],
    ];
    const audiences = audDefs.map(([id, label]) =>
      Object.assign({ label, pick: () => this.setState({ aud: id }) }, chip(s.aud === id)),
    );
    const total = 128 + 21;
    let reach = total;
    if (s.aud === 'trial') reach = 21;
    if (s.aud === 'one') reach = 1;
    if (s.aud === 'some') {
      const p = s.plans.reduce((a, k) => a + planN[k], 0) / 128;
      const t = s.types.reduce((a, k) => a + typeN[k], 0) / 128;
      reach = Math.round(total * p * t);
    }
    const channels = [
      {
        id: 'dash',
        label: 'Dashboard banner',
        help: 'Top of every page until closed or expired',
        on: true,
        locked: true,
      },
      { id: 'staff', label: 'Staff app notice', help: 'Shows once when staff open the app', on: s.staff },
      { id: 'email', label: 'Email to owner', help: 'Needs an email provider set up', on: false, soon: true },
      { id: 'sms', label: 'SMS to owner', help: 'Needs an SMS provider set up', on: false, soon: true },
    ].map((c) => ({
      label: c.label,
      help: c.help,
      soon: !!c.soon,
      aria: c.on ? 'true' : 'false',
      disabled: c.soon || c.locked ? 'true' : 'false',
      cursor: c.soon || c.locked ? 'default' : 'pointer',
      textColor: c.soon ? '#5b6475' : '#101827',
      track: c.on ? '#101827' : '#c7cad3',
      knob: c.on ? '19px' : '3px',
      toggle: () => {
        if (c.id === 'staff') this.setState({ staff: !s.staff });
      },
    }));
    const whens = [
      ['now', 'Send now'],
      ['later', 'Schedule'],
    ].map(([id, label]) => Object.assign({ label, pick: () => this.setState({ when: id }) }, chip(s.when === id)));
    const previews = [
      ['dash', 'Dashboard'],
      ['staff', 'Staff app'],
    ].map(([id, label]) => Object.assign({ label, pick: () => this.setState({ pv: id }) }, chip(s.pv === id)));
    const k = KIND[s.kind];
    const fmtAt = (v) => {
      const d = new Date(v);
      return isNaN(d)
        ? v
        : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ', ' + d.toTimeString().slice(0, 5);
    };
    const audLabel =
      s.aud === 'all'
        ? 'All businesses'
        : s.aud === 'trial'
          ? 'On trial'
          : s.aud === 'one'
            ? s.oneBiz
            : s.plans.length + ' plans · ' + s.types.length + ' types';
    const histMeta = {
      Live: ['#e6f4ea', '#1d6b3a'],
      Scheduled: ['#eef1fa', '#4661ad'],
      Ended: ['#f7f7f9', '#5b6475'],
      Cancelled: ['#f7f7f9', '#5b6475'],
    };
    const history = s.history.map((h) => ({
      title: h.title,
      status: h.status,
      meta: h.meta,
      pillBg: histMeta[h.status][0],
      pillColor: histMeta[h.status][1],
      hasRead: h.status === 'Live' || h.status === 'Ended',
      read: Math.round(h.read * 100) + '%',
      canEnd: h.status === 'Live' || h.status === 'Scheduled',
      endLabel: h.status === 'Live' ? 'End now' : 'Cancel',
      end: () => {
        this.setState({
          history: s.history.map((x) =>
            x.id === h.id ? Object.assign({}, x, { status: h.status === 'Live' ? 'Ended' : 'Cancelled' }) : x,
          ),
        });
        this.flash(h.status === 'Live' ? 'Banner removed from dashboards.' : 'Scheduled announcement cancelled.');
      },
      dup: () => {
        this.setState({ title: h.title, kind: h.kind, err: '' });
        this.flash('Copied into the form. Edit and send.');
      },
    }));
    return {
      formTitle: 'New announcement',
      kinds,
      title: s.title,
      titleCount: s.title.length + '/70',
      onTitle: (e) => this.setState({ title: e.target.value, err: '' }),
      body: s.body,
      onBody: (e) => this.setState({ body: e.target.value, err: '' }),
      bodyAm: s.bodyAm,
      onBodyAm: (e) => this.setState({ bodyAm: e.target.value }),
      cta: s.cta,
      onCta: (e) => this.setState({ cta: e.target.value }),
      ctaTo: s.ctaTo,
      onCtaTo: (e) => this.setState({ ctaTo: e.target.value }),
      hasCta: !!s.cta.trim(),
      ctaBg: s.kind === 'feature' ? '#e42330' : '#101827',
      ctaColor: '#ffffff',
      audiences,
      audSome: s.aud === 'some',
      audOne: s.aud === 'one',
      planBoxes: Object.keys(planN).map((p) => box(s.plans, 'plans', p, planN[p])),
      typeBoxes: Object.keys(typeN).map((t) => box(s.types, 'types', t, typeN[t])),
      oneBiz: s.oneBiz,
      onOneBiz: (e) => this.setState({ oneBiz: e.target.value }),
      reach: String(reach),
      reachUnit: reach === 1 ? 'business' : 'businesses',
      channels,
      whens,
      isLater: s.when === 'later',
      at: s.at,
      onAt: (e) => this.setState({ at: e.target.value }),
      days: s.days,
      onDays: (e) => this.setState({ days: e.target.value }),
      sendLabel:
        s.when === 'now'
          ? 'Send to ' + reach + ' ' + (reach === 1 ? 'business' : 'businesses')
          : 'Schedule for ' + fmtAt(s.at),
      send: () => {
        if (!s.title.trim()) {
          this.setState({ err: 'Add a headline.' });
          return;
        }
        if (!s.body.trim()) {
          this.setState({ err: 'Add a message.' });
          return;
        }
        if (reach === 0) {
          this.setState({ err: 'Nobody matches. Tick at least one plan and one type.' });
          return;
        }
        const where = s.staff ? 'dashboard + staff app' : 'dashboard';
        const item = {
          id: 'h' + Date.now(),
          title: s.title,
          kind: s.kind,
          status: s.when === 'now' ? 'Live' : 'Scheduled',
          meta: audLabel + ' · ' + where + ' · ' + (s.when === 'now' ? 'started just now' : fmtAt(s.at)),
          read: 0,
        };
        this.setState(
          Object.assign({}, this.blank, { title: '', body: '', cta: '', history: [item].concat(s.history), err: '' }),
        );
        this.flash(s.when === 'now' ? 'Live on ' + reach + ' dashboards.' : 'Scheduled for ' + fmtAt(s.at) + '.');
      },
      clear: () => this.setState(Object.assign({}, this.blank, { title: '', body: '', cta: '', err: '' })),
      hasErr: !!s.err,
      err: s.err,
      previews,
      pvDash: s.pv === 'dash',
      pvStaff: s.pv === 'staff',
      staffOff: !s.staff,
      kindBg: k[1],
      kindText: k[2],
      kindIcon: k[3],
      pvTitle: s.title || 'Your headline',
      pvBody: s.body || 'Your message shows here.',
      history,
      hasToast: !!s.toast,
      toast: s.toast || '',
    };
  }
}

AdminBroadcastView.defaultProps = {};
AdminBroadcastView.prototype.__template = function (__v) {
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
};

export default withDCStyle(AdminBroadcastView, 'AdminBroadcast', __CSS);
