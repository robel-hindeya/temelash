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
      overview: null,
      applications: [],
      error: '',
    };
  }
  async componentDidMount() {
    const [ov, apps] = await Promise.allSettled([
      api.platform.getOverview(),
      api.platform.getApplications('PENDING'),
    ]);
    this.setState({
      overview: ov.status === 'fulfilled' ? ov.value : null,
      applications: apps.status === 'fulfilled' && Array.isArray(apps.value) ? apps.value : [],
      error: ov.status === 'rejected' ? ov.reason?.message || 'Could not load platform data.' : '',
    });
  }
  renderVals() {
    const s = this.state;
    const o = s.overview;
    const I = {
      app: 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
      sys: 'M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
    };
    const T = {
      app: { tag: 'APPLICATION', color: '#4661ad' },
      sys: { tag: 'SYSTEM', color: '#c81d29' },
    };
    const go = (href) => () => {
      window.location.href = href;
    };
    const days = (iso) => Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000));
    // Real things that need an admin: pending business applications and background jobs that gave up.
    const items = s.applications.map((a) => ({
      id: a.id,
      type: 'app',
      title: [a.businessName, a.category, a.city].filter(Boolean).join(' · '),
      detail: `${a.contactName} · ${a.email}${a.phoneE164 ? ' · ' + a.phoneE164 : ''} · waiting ${days(a.createdAt)} day(s)`,
      primaryLabel: 'Review',
      href: '/admin/applications',
    }));
    if (o && o.outbox.dead > 0) {
      items.push({
        id: 'dead-jobs',
        type: 'sys',
        title: `${o.outbox.dead} background job(s) failed for good`,
        detail: 'Messages or wallet updates that could not be delivered after every retry.',
        primaryLabel: 'Details',
        href: '/admin/analytics',
      });
    }
    const f = s.filter;
    const counts = { all: items.length, app: 0, sys: 0 };
    items.forEach((i) => (counts[i.type] += 1));
    const filters = [
      ['all', 'All'],
      ['app', 'Applications'],
      ['sys', 'System'],
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
      .map((i) => ({
        title: i.title,
        detail: i.detail,
        tag: T[i.type].tag,
        tagColor: T[i.type].color,
        icon: I[i.type],
        iconColor: T[i.type].color,
        open: true,
        done: false,
        opacity: '1',
        result: '',
        primaryLabel: i.primaryLabel,
        primary: go(i.href),
        undo: () => {},
        hasSecondary: false,
        secLabel: '',
        secHref: i.href,
        secAct: null,
      }));

    const fmtDay = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString(undefined, { weekday: 'short', timeZone: 'UTC' });
    const fmtWeek = (iso) =>
      new Date(iso + 'T00:00:00Z').toLocaleDateString(undefined, { day: 'numeric', month: 'short', timeZone: 'UTC' });
    const weeks = (o && o.newMerchantsByWeek) || [];
    const daysSeries = (o && o.stampsByDay) || [];
    const wmax = Math.max(1, ...weeks.map((w) => w.count));
    const dmax = Math.max(1, ...daysSeries.map((d) => d.count));
    const svc = (name, on, onText, offText) => ({
      name,
      state: on ? onText : offText,
      dot: on ? '#4661ad' : '#c9cdd6',
      color: '#5b6475',
    });
    const n = (v) => (o ? Number(v).toLocaleString('en-US') : '…');

    return {
      todayText: new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }),
      doneText: s.error ? s.error : !o ? 'Loading…' : items.length ? items.length + ' item(s) need you' : 'Nothing needs you right now',
      kpis: [
        { label: 'ACTIVE BUSINESSES', value: n(o?.merchants.active), note: o ? `${o.merchants.total} in total, ${o.merchants.suspended} suspended` : '', href: '/admin/businesses' },
        { label: 'PENDING APPLICATIONS', value: n(o?.pendingApplications), note: 'Waiting for review', href: '/admin/applications' },
        { label: 'CARD HOLDERS', value: n(o?.customers.cards), note: o ? `${o.customers.total} customers` : '', href: '/admin/analytics' },
        { label: 'ON TELEGRAM', value: n(o?.customers.telegram), note: 'Customers using the Telegram card', href: '/admin/analytics' },
        { label: 'STAMPS TODAY', value: n(o?.today.stamps), note: o ? `${o.today.redemptions} rewards redeemed today` : '', href: '/admin/analytics' },
        { label: 'BACKGROUND JOBS', value: n(o ? o.outbox.pending + o.outbox.failed : 0), note: o ? (o.outbox.dead ? `${o.outbox.dead} failed for good` : 'None failed') : '', href: '/admin/analytics' },
      ],
      filters,
      queue,
      queueEmpty: queue.length === 0,
      weekBars: weeks.map((w) => ({
        v: String(w.count),
        x: fmtWeek(w.week),
        h: Math.round((w.count / wmax) * 100) + '%',
        tip: 'Week of ' + fmtWeek(w.week) + ': ' + w.count + ' new businesses',
      })),
      dayBars: daysSeries.map((d) => ({
        v: d.count.toLocaleString('en-US'),
        x: fmtDay(d.day),
        h: Math.round((d.count / dmax) * 100) + '%',
        tip: fmtDay(d.day) + ': ' + d.count.toLocaleString('en-US') + ' stamps',
      })),
      services: o
        ? [
            svc('Web cards', true, 'Working', ''),
            svc('Telegram bot and messages', o.services.telegram, 'Configured', 'Not set up'),
            svc('Apple Wallet passes', o.services.appleWallet, 'Configured', 'Not set up'),
            svc('Google Wallet passes', o.services.googleWallet, 'Configured', 'Not set up'),
            svc('Payments (Telebirr, CBE Birr)', false, '', 'Not connected yet'),
            svc('Email and SMS', false, '', 'Not connected yet'),
          ]
        : [],
    };
  }
}

AdminOverviewView.defaultProps = {};

AdminOverviewView.prototype.__template = renderAdminOverview;

export default withDCStyle(AdminOverviewView, 'AdminOverview', __CSS);
