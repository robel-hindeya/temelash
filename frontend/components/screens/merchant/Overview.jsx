import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import api from '@/lib/api';
import renderOverview from './Overview.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.bar:hover{background:#101827 !important}\n.crow:hover{background:#f7f7f9}';
class OverviewView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      open: null,
      group: false,
      sent: {},
      tpl: {},
      drafts: {},
      groupMsg: '{first name}, you’re 1 stamp from a free macchiato. See you this week!',
      loading: true,
      profile: null,
      branchName: 'Bole branch',
      overviewData: null,
      customers: [],
    };
  }

  async componentDidMount() {
    try {
      const [profileRes, branchesRes, overviewRes, custRes] = await Promise.allSettled([
        api.merchant.getProfile(),
        api.merchant.getBranches(),
        api.merchant.getAnalyticsOverview(),
        api.merchant.getCustomers({ limit: 15 }),
      ]);

      const updates = { loading: false };
      if (profileRes.status === 'fulfilled') updates.profile = profileRes.value;
      if (branchesRes.status === 'fulfilled' && branchesRes.value?.length) {
        updates.branchName = branchesRes.value[0].nameEn + ' branch';
      }
      if (overviewRes.status === 'fulfilled') updates.overviewData = overviewRes.value;
      if (custRes.status === 'fulfilled' && custRes.value?.items) {
        updates.customers = custRes.value.items;
      }
      this.setState(updates);
    } catch (e) {
      console.warn('Overview failed to load live data:', e);
      this.setState({ loading: false });
    }
  }
  tplText(id, first) {
    const t = {
      reminder: [
        first + ', you’re 1 stamp from a free macchiato. See you this week!',
        first + '፣ ነፃ ማኪያቶ ለማግኘት 1 ማህተም ብቻ ቀርቶዎታል።',
      ],
      double: [
        first + ', your next visit earns 2 stamps, so your free macchiato is waiting. Valid until Sunday.',
        first + '፣ በሚቀጥለው ጉብኝትዎ 2 ማህተም ያገኛሉ። እስከ እሁድ።',
      ],
      thanks: [
        first + ', thank you for coming back so often. Your free macchiato is one visit away.',
        first + '፣ ስለሚመለሱ እናመሰግናለን። ነፃ ማኪያቶዎ አንድ ጉብኝት ብቻ ቀርቶታል።',
      ],
    };
    return t[id];
  }
  renderVals() {
    const s = this.state;
    const od = s.overviewData || {};
    const customers = s.customers || [];
    const totalCustomers = od.totalCustomers ?? customers.length;
    const stampsCount = od.stampsIssued?.count ?? 0;
    const rewardsCount = od.rewardsRedeemed ?? 0;
    const newMembersCount = od.newMembers ?? customers.length;
    const retPct = totalCustomers > 0 ? Math.round((newMembersCount / totalCustomers) * 100) : 0;

    // Calculate dynamic 14-day timeline based on current date
    const now = new Date();
    const bars = [];
    let maxVal = 1;
    const dayCounts = [];

    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400000);
      const dateStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      const dayChar = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][d.getDay()];
      const dayFull = d.toLocaleDateString('en-US', { weekday: 'long' });
      // Count customers that joined on this date
      const matched = customers.filter((c) => {
        if (!c.joinedAt) return false;
        const cd = new Date(c.joinedAt);
        return cd.toDateString() === d.toDateString();
      }).length;
      // If it's today and stamps were issued, add stamps count
      const count = i === 0 ? Math.max(matched, stampsCount) : matched;
      if (count > maxVal) maxVal = count;
      dayCounts.push({ v: count, d: dayChar, dayFull, dateStr, tip: `${dateStr}: ${count} activity` });
    }

    const lastWeekItems = dayCounts.slice(0, 7);
    const thisWeekItems = dayCounts.slice(7);
    const thisWeekCount = thisWeekItems.reduce((acc, item) => acc + item.v, 0);
    const lastWeekCount = lastWeekItems.reduce((acc, item) => acc + item.v, 0);
    const thisWeekSub = lastWeekCount > 0 ? `vs ${lastWeekCount} the week before` : 'vs 0 the week before';

    const busiest = dayCounts.reduce((prev, curr) => (curr.v > prev.v ? curr : prev), dayCounts[13]);
    const busiestDay = busiest.v > 0 ? busiest.dayFull : 'Today';
    const busiestSub = busiest.v > 0
      ? `${busiest.v} ${busiest.v === 1 ? 'stamp' : 'stamps'} on ${busiest.dateStr}`
      : 'No stamps recorded yet';

    const avg = thisWeekCount > 0 ? (thisWeekCount / 7).toFixed(1) : '0';
    const dailyAvg = `${avg} stamps`;

    const renderedBars = dayCounts.map((dc) => ({
      v: String(dc.v),
      d: dc.d,
      h: Math.max(8, Math.round((dc.v / Math.max(1, maxVal)) * 100)) + '%',
      tip: dc.tip,
      peak: dc.v > 0,
    }));

    const types = {
      stamp: { bg: '#f7f7f9', fg: '#101827' },
      reward: { bg: '#fba919', fg: '#101827' },
      joined: { bg: '#f7f7f9', fg: '#4661ad' },
    };

    const kpis = [
      { label: 'CARD HOLDERS', value: String(totalCustomers), note: `+${newMembersCount} enrolled` },
      { label: 'STAMPS ISSUED', value: String(stampsCount), note: 'Verified on ledger' },
      { label: 'REWARDS REDEEMED', value: String(rewardsCount), note: 'Earned & redeemed' },
      { label: 'CAME BACK', value: `${retPct}%`, note: 'of new customers' },
    ];

    const people = customers.slice(0, 4).map((c) => {
      const fn = c.firstName || 'Customer';
      const ini = fn.slice(0, 2).toUpperCase();
      const last = c.joinedAt
        ? new Date(c.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : 'recently';
      return [ini, fn, fn, last];
    });

    const activity = customers.slice(0, 5).map((c, i) => {
      const fn = c.firstName || 'Customer';
      const time = c.joinedAt
        ? new Date(c.joinedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'recently';
      const st = c.stamps || 1;
      return {
        time,
        name: fn,
        what: i === 0 ? 'Joined loyalty program' : 'Card stamp verified',
        card: `${st}/10`,
        staff: 'Bole Staff',
        bg: i === 0 ? '#4661ad' : '#f7f7f9',
        fg: i === 0 ? '#ffffff' : '#101827',
      };
    });

    const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    const headerSubtitle = `${todayStr} · ${s.branchName}`;
    const tplDefs = [
      ['reminder', 'Reminder'],
      ['double', 'Double stamp'],
      ['thanks', 'Thank you'],
    ];
    const close = people.map(([ini, name, first, last], i) => {
      const isOpen = s.open === i;
      const tplId = s.tpl[i] || 'reminder';
      const base = this.tplText(tplId, first);
      const d = s.drafts[i] || {};
      const en = d.en !== undefined ? d.en : base[0];
      const am = d.am !== undefined ? d.am : base[1];
      const sent = !!s.sent[i];
      return {
        ini,
        name,
        first,
        isOpen,
        expanded: isOpen ? 'true' : 'false',
        sub: sent ? 'Reminder sent just now' : 'Last visit ' + last,
        subColor: sent ? '#4661ad' : '#5b6475',
        rowBg: isOpen ? '#f7f7f9' : 'transparent',
        chevron: isOpen ? 'M7 14l5-5 5 5' : 'M7 10l5 5 5-5',
        toggle: () => this.setState({ open: isOpen ? null : i, group: false }),
        enId: 'ov-en-' + i,
        amId: 'ov-am-' + i,
        en,
        am,
        onEn: (e) =>
          this.setState({ drafts: Object.assign({}, s.drafts, { [i]: Object.assign({}, d, { en: e.target.value }) }) }),
        onAm: (e) =>
          this.setState({ drafts: Object.assign({}, s.drafts, { [i]: Object.assign({}, d, { am: e.target.value }) }) }),
        tpls: tplDefs.map(([id, label]) => ({
          label,
          pressed: id === tplId ? 'true' : 'false',
          bg: id === tplId ? '#101827' : '#ffffff',
          color: id === tplId ? '#ffffff' : '#101827',
          border: id === tplId ? '#101827' : '#e3e5ec',
          pick: () =>
            this.setState({
              tpl: Object.assign({}, s.tpl, { [i]: id }),
              drafts: Object.assign({}, s.drafts, { [i]: {} }),
            }),
        })),
        send: () => this.setState({ sent: Object.assign({}, s.sent, { [i]: true }), open: null }),
      };
    });
    const unsent = people.filter((p, i) => !s.sent[i]).length;
    return {
      bars: renderedBars,
      activity,
      close,
      kpis,
      headerSubtitle,
      thisWeekTotal: String(thisWeekCount),
      thisWeekSub,
      busiestDay,
      busiestSub,
      dailyAvg,
      groupOpen: s.group && unsent > 0,
      groupMsg: s.groupMsg,
      groupPreview: s.groupMsg.replace(/\{first name\}/g, 'Liya'),
      onGroup: (e) => this.setState({ groupMsg: e.target.value }),
      openGroup: () => this.setState({ group: true, open: null }),
      closeGroup: () => this.setState({ group: false }),
      sendGroup: () => {
        const all = {};
        people.forEach((p, i) => {
          all[i] = true;
        });
        this.setState({ sent: all, group: false });
      },
      unsentCount: String(unsent),
      showGroupBtn: unsent > 0 && !s.group,
      groupBtnLabel: unsent === 4 ? 'Remind all 4' : 'Remind the other ' + unsent,
      allSent: unsent === 0,
    };
  }
}

OverviewView.defaultProps = {};

OverviewView.prototype.__template = renderOverview;

export default withDCStyle(OverviewView, 'Overview', __CSS);
