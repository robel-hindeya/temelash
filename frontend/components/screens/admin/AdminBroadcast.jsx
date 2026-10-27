'use client';
/* Generated from the Temelash Card design (AdminBroadcast.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import renderAdminBroadcast from './AdminBroadcast.view';

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

AdminBroadcastView.prototype.__template = renderAdminBroadcast;

export default withDCStyle(AdminBroadcastView, 'AdminBroadcast', __CSS);
