'use client';
/* Generated from the Temelash Card design (AdminAnalytics.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import renderAdminAnalytics from './AdminAnalytics.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-hide-sm{display:none !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.bar:hover{background:#101827 !important}\n.lbl{font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.08em;color:#5b6475}\n.card{background:#ffffff;border:1px solid #e3e5ec;border-radius:12px;padding:20px 24px;display:flex;flex-direction:column;gap:14px;min-width:0}';
class AdminAnalyticsView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { range: 30, type: 'all', measure: 'holders', table: false, topSort: 'stamps' };
  }
  renderVals() {
    const s = this.state;
    const typeShare = { all: 1, Café: 0.38, Restaurant: 0.22, Salon: 0.18, Spa: 0.1, 'Car wash': 0.12 }[s.type];
    const fmt = (n) => Math.round(n).toLocaleString('en-US');
    const noise = (i, k) => {
      const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    const base = { holders: 260, stamps: 4700, rewards: 410 }[s.measure];
    const today = new Date(2026, 9, 21);
    const day = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    let bars = [];
    if (s.range === 7) {
      bars = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - 6 + i);
        const wk = d.getDay();
        const v = base * typeShare * (0.8 + noise(i, 1) * 0.4) * (wk === 0 ? 1.25 : 1);
        return { v, m: d.toLocaleDateString('en-GB', { weekday: 'short' }), title: day(d) };
      });
    } else {
      const weeks = s.range === 30 ? 5 : 13;
      bars = Array.from({ length: weeks }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (weeks - 1 - i) * 7);
        const growth = 0.7 + (i / weeks) * 0.4;
        const v = base * 7 * typeShare * growth * (0.9 + noise(i, 2) * 0.2);
        return { v, m: 'Wk ' + day(d), title: 'Week of ' + day(d) };
      });
    }
    const max =
      Math.max.apply(
        null,
        bars.map((b) => b.v),
      ) * 1.2;
    const total = bars.reduce((a, b) => a + b.v, 0);
    bars = bars.map((b, i) => ({
      v: fmt(b.v),
      m: b.m,
      title: b.title,
      h: Math.round((b.v / max) * 170) + 'px',
      color: i === bars.length - 1 ? '#e42330' : '#4661ad',
    }));
    const mLabels = { holders: 'New card holders', stamps: 'Stamps given', rewards: 'Rewards redeemed' };
    const measures = ['holders', 'stamps', 'rewards'].map((id) => {
      const on = s.measure === id;
      return {
        label: mLabels[id],
        pressed: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
        pick: () => this.setState({ measure: id }),
      };
    });
    const ranges = [7, 30, 90].map((r) => {
      const on = s.range === r;
      return {
        label: r + ' days',
        pressed: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
        pick: () => this.setState({ range: r }),
      };
    });
    const f = s.range / 30;
    const kpis = [
      {
        label: 'ACTIVE BUSINESSES',
        value: fmt(128 * typeShare),
        delta: '+' + fmt(9 * f * typeShare) + ' in ' + s.range + ' days',
        deltaColor: '#1d6b3a',
      },
      {
        label: 'CARD HOLDERS',
        value: fmt(18420 * typeShare),
        delta: '+' + fmt(260 * s.range * typeShare) + ' new',
        deltaColor: '#1d6b3a',
      },
      {
        label: 'STAMPS GIVEN',
        value: fmt(4700 * s.range * typeShare),
        delta: '+12% vs previous ' + s.range + ' days',
        deltaColor: '#1d6b3a',
      },
      {
        label: 'REWARDS REDEEMED',
        value: fmt(410 * s.range * typeShare),
        delta: '+8% vs previous',
        deltaColor: '#1d6b3a',
      },
      {
        label: 'MERCHANTS LEFT',
        value: String(Math.max(1, Math.round(3 * f * typeShare))),
        delta: 'Churn ' + (2.3 * (s.range === 7 ? 0.3 : f)).toFixed(1) + '%',
        deltaColor: '#c81d29',
      },
    ];
    const wsplit = [
      ['Apple Wallet', 0.46, '#101827'],
      ['Google Wallet', 0.37, '#4661ad'],
      ['Web card', 0.17, '#5b6475'],
    ];
    const holders = 18420 * typeShare;
    const wallets = wsplit.map(([label, p, color]) => ({
      label,
      pct: Math.round(p * 100) + '%',
      n: fmt(holders * p),
      color,
    }));
    const signups = Math.max(4, Math.round(30 * f * typeShare));
    const steps = [
      ['Signed up', 1],
      ['Approved', 0.83],
      ['Card live', 0.7],
      ['First stamp', 0.6],
      ['Paid plan', 0.37],
    ];
    const funnel = steps.map(([label, p], i) => ({
      label,
      n: String(Math.round(signups * p)),
      pct: Math.round(p * 100) + '%',
      w: Math.round(p * 100) + '%',
      color: i === steps.length - 1 ? '#e42330' : '#4661ad',
    }));
    let drop = { d: 0, label: '' };
    for (let i = 1; i < steps.length; i++) {
      const d = steps[i - 1][1] - steps[i][1];
      if (d > drop.d)
        drop = { d, label: steps[i - 1][0] + ' → ' + steps[i][0] + ' (' + Math.round(d * signups) + ' businesses)' };
    }
    const types = [
      ['Café', 49, 0.64],
      ['Restaurant', 28, 0.52],
      ['Salon', 23, 0.71],
      ['Spa', 13, 0.58],
      ['Car wash', 15, 0.66],
    ];
    const byType = types.map(([label, b, r]) => ({
      label,
      biz: String(b),
      stamps: fmt(4700 * s.range * (b / 128)),
      ret: Math.round(r * 100) + '%',
      bg: s.type === label ? '#f7f7f9' : '#ffffff',
    }));
    const bizs = [
      ['Buna House', 'Café', 2140, 96, 0.74],
      ['Abyssinia Car Wash', 'Car wash', 1810, 71, 0.69],
      ['Selam Salon', 'Salon', 1420, 40, 0.81],
      ['Habesha Bites', 'Restaurant', 1390, 88, 0.55],
      ['Entoto Spa', 'Spa', 980, 33, 0.62],
      ['Arada Coffee', 'Café', 870, 64, 0.6],
      ['Sheba Beauty', 'Salon', 760, 29, 0.77],
      ['Gebeya Burger', 'Restaurant', 700, 52, 0.48],
    ].filter((b) => s.type === 'all' || b[1] === s.type);
    const key = { stamps: 2, new: 3, ret: 4 }[s.topSort];
    const top = bizs
      .slice()
      .sort((a, b) => b[key] - a[key])
      .slice(0, 5)
      .map((b, i) => ({
        rank: String(i + 1),
        name: b[0],
        type: b[1],
        metric: s.topSort === 'ret' ? Math.round(b[4] * 100) + '%' : fmt(b[key] * f),
      }));
    const left = Math.max(1, Math.round(3 * f * typeShare));
    const churn = [
      {
        n: String(Math.max(1, Math.round(left * 0.4))),
        reason: 'Closed or moved',
        example: 'e.g. a café that shut its Piassa branch',
      },
      { n: String(Math.round(left * 0.3)), reason: 'Price', example: 'Asked for a cheaper plan' },
      { n: String(Math.round(left * 0.2)), reason: 'Staff stopped stamping', example: 'Low use after the first month' },
      { n: String(Math.round(left * 0.1)), reason: 'Other', example: 'Switched to paper cards' },
    ];
    return {
      ranges,
      type: s.type,
      onType: (e) => this.setState({ type: e.target.value }),
      kpis,
      chartTitle: mLabels[s.measure],
      chartSub: (s.range === 7 ? 'Per day' : 'Per week') + ' · ' + fmt(total) + ' total in ' + s.range + ' days',
      measures,
      measureUp: mLabels[s.measure].toUpperCase(),
      bars,
      gap: s.range === 90 ? '6px' : '12px',
      minW: s.range === 90 ? '640px' : '0',
      showTable: s.table,
      tableExpanded: s.table ? 'true' : 'false',
      tableLabel: s.table ? 'Hide the numbers table' : 'Show the numbers as a table',
      toggleTable: () => this.setState({ table: !s.table }),
      wallets,
      funnel,
      biggestDrop: drop.label,
      byType,
      topSort: s.topSort,
      onTopSort: (e) => this.setState({ topSort: e.target.value }),
      top,
      churnLine: left + ' in ' + s.range + ' days',
      churn,
    };
  }
}

AdminAnalyticsView.defaultProps = {};

AdminAnalyticsView.prototype.__template = renderAdminAnalytics;

export default withDCStyle(AdminAnalyticsView, 'AdminAnalytics', __CSS);
