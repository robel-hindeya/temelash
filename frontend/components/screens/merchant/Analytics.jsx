'use client';
/* Generated from the Temelash Card design (Analytics.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import api from '@/lib/api';
import renderAnalytics from './Analytics.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,select:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.bar:hover{background:#101827 !important}';
class AnalyticsView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { range: '30', overview: null, staffList: [], loading: true, error: '' };
  }

  componentDidMount() {
    this.load(this.state.range);
  }

  // Everything on this screen comes from the backend for the chosen range (days up to and including today).
  async load(range) {
    this.setState({ loading: true, error: '' });
    const from = new Date(Date.now() - (Number(range) - 1) * 86400000).toISOString().slice(0, 10);
    const [overviewRes, staffRes] = await Promise.allSettled([
      api.merchant.getAnalyticsOverview({ from }),
      api.merchant.getStaffAnalytics({ from, limit: '100' }),
    ]);
    if (this.state.range !== range) return;
    this.setState({
      loading: false,
      overview: overviewRes.status === 'fulfilled' ? overviewRes.value : null,
      staffList: staffRes.status === 'fulfilled' ? staffRes.value?.items || [] : [],
      error: overviewRes.status === 'rejected' ? overviewRes.reason?.message || 'Could not load analytics.' : '',
    });
  }

  renderVals() {
    const r = this.state.range;
    const days = Number(r);
    const od = this.state.overview || {};
    const staffList = this.state.staffList || [];
    const stampsCount = od.stampsIssued?.count ?? 0;
    const rewardsCount = od.rewardsRedeemed ?? 0;
    const rewardsUnlocked = od.rewardsUnlocked ?? 0;
    const activeMembers = od.activeMembers ?? 0;
    const returning = od.returningCustomers ?? 0;
    const newMembers = od.newMembers ?? 0;
    const retRate = activeMembers > 0 ? Math.round((returning / activeMembers) * 100) : 0;

    const ranges = [
      ['7', '7 days'],
      ['30', '30 days'],
      ['90', '90 days'],
    ].map(([id, label]) => ({
      label,
      pressed: id === r ? 'true' : 'false',
      bg: id === r ? '#101827' : 'transparent',
      color: id === r ? '#ffffff' : '#101827',
      pick: () => {
        this.setState({ range: id });
        this.load(id);
      },
    }));

    // Stamps per day (7 days) or per week (30 and 90 days), with zeros where nothing happened.
    const perDay = new Map((od.stampsByDay || []).map((d) => [d.day, d.count]));
    const isoDay = (t) => new Date(t).toISOString().slice(0, 10);
    const now = Date.now();
    const dayList = [];
    for (let i = days - 1; i >= 0; i--) dayList.push(isoDay(now - i * 86400000));
    const xLabels = [];
    const vValues = [];
    const chartTitle = days === 7 ? 'Stamps per day' : 'Stamps per week';
    const utc = (d, opts) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });
    if (days === 7) {
      dayList.forEach((d) => {
        xLabels.push(utc(d, { weekday: 'short' }));
        vValues.push(perDay.get(d) || 0);
      });
    } else {
      for (let i = 0; i < dayList.length; i += 7) {
        const week = dayList.slice(i, i + 7);
        xLabels.push(utc(week[0], { day: 'numeric', month: 'short' }));
        vValues.push(week.reduce((a, d) => a + (perDay.get(d) || 0), 0));
      }
    }
    const maxVisit = Math.max.apply(null, [1, ...vValues]) * 1.2;
    const visits = vValues.map((v, i) => ({
      v: v.toLocaleString('en-US'),
      x: xLabels[i],
      h: Math.max(v > 0 ? 8 : 2, Math.round((v / maxVisit) * 100)) + '%',
      tip: `${xLabels[i]}: ${v} stamps`,
      label: true,
    }));

    const kp = [
      ['STAMPS', stampsCount.toLocaleString('en-US'), `${od.stampsIssued?.reversed ?? 0} undone`],
      ['NEW CARDS', String(newMembers), `Joined in the last ${r} days`],
      ['CAME BACK', `${retRate}%`, `${returning} of ${activeMembers} visitors had been before`],
      ['REWARDS REDEEMED', String(rewardsCount), `of ${rewardsUnlocked} unlocked`],
    ].map(([label, value, note]) => ({ label, value, note }));

    const scansCount = od.qrScanned ?? newMembers;
    const fdef = [
      ['Scanned your QR', scansCount],
      ['Saved the card', newMembers],
      ['Came back at least once', returning],
      ['Unlocked a reward', rewardsUnlocked],
      ['Redeemed it', rewardsCount],
    ];
    const baseFunnel = Math.max(scansCount, 1);
    const funnel = fdef.map(([label, v]) => ({
      label,
      v: String(v),
      pct: Math.round((v / baseFunnel) * 100) + '%',
      w: Math.max(v > 0 ? 6 : 0, Math.round((v / baseFunnel) * 100)) + '%',
      tip: `${label}: ${v}`,
    }));

    // Weekdays Monday first; the backend counts 0 = Sunday.
    const dx = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const wk = od.stampsByWeekday || [];
    const dv = [1, 2, 3, 4, 5, 6, 0].map((i) => wk[i] || 0);
    const dmax = Math.max.apply(null, [1, ...dv]) * 1.25;
    const dayBars = dv.map((v, i) => ({
      v: v.toLocaleString('en-US'),
      x: dx[i],
      h: Math.max(v > 0 ? 8 : 2, Math.round((v / dmax) * 100)) + '%',
      tip: `${dx[i]}: ${v} stamps`,
    }));
    const busiestDay = dv.some((v) => v > 0) ? dx[dv.indexOf(Math.max(...dv))] : null;

    // 7am to 8pm, widened when stamps fall outside those hours.
    const hb = od.stampsByHour || [];
    const withData = [];
    for (let h = 0; h < 24; h++) if (hb[h] > 0) withData.push(h);
    const firstH = Math.min(7, ...withData);
    const lastH = Math.max(20, ...withData);
    const hourName = (h) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`;
    const hv = [];
    for (let h = firstH; h <= lastH; h++) hv.push([h, hb[h] || 0]);
    const hmax = Math.max.apply(null, [1, ...hv.map((x) => x[1])]) * 1.25;
    const hours = hv.map(([h, v]) => ({
      v: String(v),
      x: String(h % 12 === 0 ? 12 : h % 12),
      h: Math.max(v > 0 ? 8 : 2, Math.round((v / hmax) * 100)) + '%',
      tip: `${hourName(h)}: ${v} stamps`,
    }));
    const peak = hv.reduce((a, x) => (x[1] > a[1] ? x : a), [null, 0]);

    const S = staffList.map((st) => [st.displayName || 'Staff', st.stamps || 0]);
    const totStaff = S.reduce((a, x) => a + x[1], 0);
    const topStaff = Math.max.apply(null, [1, ...S.map((x) => x[1])]);
    const staff = S.map(([name, v]) => ({
      name,
      v: v.toLocaleString('en-US'),
      pct: totStaff > 0 ? Math.round((v / totStaff) * 100) + '%' : '0%',
      w: Math.max(v > 0 ? 6 : 0, Math.round((v / topStaff) * 100)) + '%',
      tip: `${name}: ${v.toLocaleString('en-US')} stamps in the last ${r} days`,
    }));

    return {
      ranges,
      kpis: kp,
      visits,
      funnel,
      days: dayBars,
      hours,
      staff,
      daysAlt: busiestDay ? `Stamps by weekday, busiest on ${busiestDay}` : 'Stamps by weekday: none yet',
      hoursAlt: peak[0] !== null ? `Stamps by hour, busiest at ${hourName(peak[0])}` : 'Stamps by hour: none yet',
      visitsTitle: `${chartTitle} · last ${r} days`,
      visitsAlt: `${chartTitle} over the last ${r} days`,
      rangeNote: this.state.loading ? 'Loading…' : this.state.error || `Last ${r} days`,
    };
  }
}

AnalyticsView.defaultProps = {};

AnalyticsView.prototype.__template = renderAnalytics;

export default withDCStyle(AnalyticsView, 'Analytics', __CSS);
