'use client';
/* Generated from the Temelash Card design (AdminOverview.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import api from '@/lib/api';
import renderAdminOverview from './AdminOverview.view';

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

AdminOverviewView.prototype.__template = renderAdminOverview;

export default withDCStyle(AdminOverviewView, 'AdminOverview', __CSS);
