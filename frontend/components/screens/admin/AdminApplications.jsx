'use client';
/* Generated from the Temelash Card design (AdminApplications.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import renderAdminApplications from './AdminApplications.view';

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
      viewingDoc: null,
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
  componentDidMount() {
    if (typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem('tm-admin-applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.setState({ apps: parsed });
        }
      }
    } catch (e) {}
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
    try {
      window.localStorage.setItem('tm-admin-applications', JSON.stringify(apps));
    } catch (e) {}
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
          try {
            window.localStorage.setItem('tm-admin-applications', JSON.stringify(apps2));
          } catch (e) {}
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
      viewingDoc: s.viewingDoc,
      openFullDoc: (doc) => this.setState({ viewingDoc: doc }),
      closeFullDoc: () => this.setState({ viewingDoc: null }),
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

AdminApplicationsView.prototype.__template = renderAdminApplications;

export default withDCStyle(AdminApplicationsView, 'AdminApplications', __CSS);
