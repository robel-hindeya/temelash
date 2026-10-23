import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';
import api from '@/lib/api';

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
OverviewView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1240px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <Sidebar active="overview" />
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
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Overview'}</h1>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#2f6b4f',
                    border: '1px solid #c2e2d0',
                    background: '#eef8f2',
                    borderRadius: '999px',
                    padding: '2px 10px',
                  }}
                >
                  {'LIVE DATABASE'}
                </span>
              </div>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>{__t(__v?.headerSubtitle)}</p>
            </div>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <A
                href="/business/shop"
                style={{
                  border: '1px solid #e3e5ec',
                  background: '#ffffff',
                  color: '#4661ad',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  textDecoration: 'none',
                  minHeight: '44px',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {'Print QR stand'}
              </A>{' '}
              <A
                href="/business/offers"
                style={{
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  textDecoration: 'none',
                  minHeight: '44px',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {'Send an offer'}
              </A>
            </div>
          </div>{' '}
          <section
            aria-label="Finish setting up"
            style={{
              background: '#ffffff',
              border: '1px solid #e3e5ec',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                {'Finish setting up · 3 of 5'}
              </span>{' '}
              <div style={{ height: '8px', background: '#e3e5ec', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: '#101827', borderRadius: '999px' }} />
              </div>
            </div>{' '}
            <div style={{ flex: '3 1 480px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '999px',
                  background: '#f7f7f9',
                  color: '#5b6475',
                  fontWeight: '600',
                  textDecoration: 'line-through',
                }}
              >
                {'Design card'}
              </span>{' '}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '999px',
                  background: '#f7f7f9',
                  color: '#5b6475',
                  fontWeight: '600',
                  textDecoration: 'line-through',
                }}
              >
                {'Set reward'}
              </span>{' '}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '999px',
                  background: '#f7f7f9',
                  color: '#5b6475',
                  fontWeight: '600',
                  textDecoration: 'line-through',
                }}
              >
                {'Print counter stand'}
              </span>{' '}
              <A
                href="/business/settings"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '999px',
                  border: '1px solid #e3e5ec',
                  color: '#4661ad',
                  fontWeight: '700',
                  textDecoration: 'none',
                }}
              >
                {'Invite staff →'}
              </A>{' '}
              <A
                href="/business/offers"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '999px',
                  border: '1px solid #e3e5ec',
                  color: '#4661ad',
                  fontWeight: '700',
                  textDecoration: 'none',
                }}
              >
                {'Send first offer →'}
              </A>
            </div>
          </section>{' '}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {(__v?.kpis || []).map((k, __i0) => (
              <React.Fragment key={__i0}>
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
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
                  >{`${__t(k?.label)}`}</span>{' '}
                  <span
                    style={{
                      fontSize: '32px',
                      lineHeight: '32px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(k?.value)}`}</span>{' '}
                  <span style={{ fontSize: '14px', lineHeight: '20px', color: '#5b6475' }}>{`${__t(k?.note)}`}</span>
                </div>
              </React.Fragment>
            ))}
          </div>{' '}
          <section
            style={{
              background: '#ffffff',
              border: '1px solid #e3e5ec',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                {'Stamps per day · last 14 days'}
              </h2>{' '}
              <A href="/business/analytics" style={{ fontWeight: '700', fontSize: '14px' }}>
                {'Open analytics'}
              </A>
            </div>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'stretch' }}>
              <div style={{ flex: '3 1 420px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  role="img"
                  aria-label="Bar chart of stamps per day over the last 14 days, ranging from 41 to 112, highest on Saturdays"
                  style={{
                    position: 'relative',
                    height: '200px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-end',
                    borderBottom: '1px solid #e3e5ec',
                    paddingTop: '8px',
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '0', right: '0', top: '8px', borderTop: '1px dashed #e3e5ec' }}
                  />{' '}
                  <div
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '0', right: '0', top: '50%', borderTop: '1px dashed #e3e5ec' }}
                  />{' '}
                  {(__v?.bars || []).map((b, __i0) => (
                    <React.Fragment key={__i0}>
                      <div
                        title={b?.tip}
                        style={{
                          flex: '1 1 0',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          gap: '4px',
                          position: 'relative',
                        }}
                      >
                        {__b(b?.peak) ? (
                          <>
                            <span
                              style={{ fontSize: '12px', lineHeight: '14px', fontWeight: '700', color: '#101827' }}
                            >{`${__t(b?.v)}`}</span>
                          </>
                        ) : null}{' '}
                        <div
                          className="bar"
                          style={{
                            width: '100%',
                            maxWidth: '32px',
                            height: `${__t(b?.h)}`,
                            background: '#4661ad',
                            borderRadius: '4px 4px 0 0',
                          }}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <div
                  aria-hidden="true"
                  style={{ display: 'flex', gap: '8px', fontSize: '12px', lineHeight: '16px', color: '#5b6475' }}
                >
                  {(__v?.bars || []).map((b, __i0) => (
                    <React.Fragment key={__i0}>
                      <span style={{ flex: '1 1 0', textAlign: 'center' }}>{`${__t(b?.d)}`}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>{' '}
              <div
                className="tm-split"
                style={{
                  flex: '1 1 200px',
                  minWidth: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  borderLeft: '1px solid #e3e5ec',
                  paddingLeft: '24px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    {'THIS WEEK'}
                  </span>
                  <span
                    style={{
                      fontSize: '32px',
                      lineHeight: '36px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {`${__t(__v?.thisWeekTotal || '0')}`}
                  </span>
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>
                    {`${__t(__v?.thisWeekSub || 'vs 0 the week before')}`}
                  </span>
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    {'BUSIEST DAY'}
                  </span>
                  <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {`${__t(__v?.busiestDay || 'Today')}`}
                  </span>
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>
                    {`${__t(__v?.busiestSub || '0 stamps')}`}
                  </span>
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    {'DAILY AVERAGE'}
                  </span>
                  <span
                    style={{
                      fontSize: '20px',
                      lineHeight: '26px',
                      fontWeight: '700',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {`${__t(__v?.dailyAvg || '0 stamps')}`}
                  </span>
                </div>
              </div>
            </div>
          </section>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <section
              style={{
                flex: '2 1 520px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Today at the counter'}
                </h2>
                <A href="/business/customers" style={{ fontWeight: '700', fontSize: '14px' }}>
                  {'All customers'}
                </A>
              </div>{' '}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
                  <thead>
                    <tr
                      style={{
                        textAlign: 'left',
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      <th scope="col" style={{ padding: '8px 12px 8px 0', fontWeight: '700' }}>
                        {'TIME'}
                      </th>
                      <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                        {'CUSTOMER'}
                      </th>
                      <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                        {'WHAT HAPPENED'}
                      </th>
                      <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                        {'CARD'}
                      </th>
                      <th scope="col" style={{ padding: '8px 0 8px 12px', fontWeight: '700' }}>
                        {'STAFF'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(__v?.activity || []).map((r, __i0) => (
                      <React.Fragment key={__i0}>
                        <tr style={{ borderTop: '1px solid #e3e5ec' }}>
                          <td
                            style={{
                              padding: '12px 12px 12px 0',
                              color: '#5b6475',
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >{`${__t(r?.time)}`}</td>
                          <td style={{ padding: '12px', fontWeight: '700' }}>{`${__t(r?.name)}`}</td>
                          <td style={{ padding: '12px' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                borderRadius: '999px',
                                padding: '2px 10px',
                                fontWeight: '700',
                                fontSize: '14px',
                                background: `${__t(r?.bg)}`,
                                color: `${__t(r?.fg)}`,
                              }}
                            >{`${__t(r?.what)}`}</span>
                          </td>
                          <td
                            style={{ padding: '12px', fontVariantNumeric: 'tabular-nums', fontWeight: '700' }}
                          >{`${__t(r?.card)}`}</td>
                          <td style={{ padding: '12px 0 12px 12px', color: '#5b6475' }}>{`${__t(r?.staff)}`}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>{' '}
            <section
              style={{
                flex: '1 1 340px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                {'One stamp from a reward'}
              </h2>{' '}
              <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                {'Tap a customer to send them a personal reminder.'}
              </p>{' '}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(__v?.close || []).map((c, __i0) => (
                  <React.Fragment key={__i0}>
                    <div style={{ borderBottom: '1px solid #e3e5ec' }}>
                      <button
                        type="button"
                        className="crow"
                        aria-expanded={c?.expanded}
                        onClick={c?.toggle}
                        style={{
                          width: '100%',
                          border: '0',
                          background: `${__t(c?.rowBg)}`,
                          borderRadius: '8px',
                          padding: '10px 8px',
                          minHeight: '56px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          textAlign: 'left',
                          color: '#101827',
                        }}
                      >
                        <span
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '999px',
                            background: '#f7f7f9',
                            border: '1px solid #e3e5ec',
                            fontWeight: '700',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 'none',
                          }}
                        >{`${__t(c?.ini)}`}</span>{' '}
                        <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minWidth: '0' }}>
                          <span style={{ fontWeight: '700' }}>{`${__t(c?.name)}`}</span>
                          <span style={{ fontSize: '14px', color: `${__t(c?.subColor)}` }}>{`${__t(c?.sub)}`}</span>
                        </span>{' '}
                        <span
                          style={{
                            background: '#fba919',
                            color: '#101827',
                            fontWeight: '800',
                            fontSize: '14px',
                            borderRadius: '999px',
                            padding: '2px 10px',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {'9/10'}
                        </span>{' '}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#5b6475"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d={c?.chevron} />
                        </svg>
                      </button>{' '}
                      {__b(c?.isOpen) ? (
                        <>
                          <div
                            style={{ padding: '4px 8px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                          >
                            <div
                              role="group"
                              aria-label="Message type"
                              style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
                            >
                              {(c?.tpls || []).map((t, __i1) => (
                                <React.Fragment key={__i1}>
                                  <button
                                    type="button"
                                    aria-pressed={t?.pressed}
                                    onClick={t?.pick}
                                    style={{
                                      borderRadius: '999px',
                                      padding: '6px 12px',
                                      minHeight: '36px',
                                      cursor: 'pointer',
                                      fontWeight: '700',
                                      fontSize: '14px',
                                      background: `${__t(t?.bg)}`,
                                      color: `${__t(t?.color)}`,
                                      border: `1px solid ${__t(t?.border)}`,
                                    }}
                                  >{`${__t(t?.label)}`}</button>
                                </React.Fragment>
                              ))}
                            </div>{' '}
                            <label
                              htmlFor={c?.enId}
                              style={{ fontWeight: '700', fontSize: '14px' }}
                            >{`Message to ${__t(c?.first)}`}</label>{' '}
                            <textarea
                              id={c?.enId}
                              rows="3"
                              value={c?.en}
                              onChange={c?.onEn}
                              style={{
                                border: '1px solid #e3e5ec',
                                borderRadius: '6px',
                                padding: '10px 12px',
                                resize: 'vertical',
                                color: '#101827',
                              }}
                            />{' '}
                            <label htmlFor={c?.amId} style={{ fontWeight: '700', fontSize: '14px' }}>
                              {'In Amharic'}
                            </label>{' '}
                            <textarea
                              id={c?.amId}
                              rows="2"
                              value={c?.am}
                              onChange={c?.onAm}
                              style={{
                                border: '1px solid #e3e5ec',
                                borderRadius: '6px',
                                padding: '10px 12px',
                                resize: 'vertical',
                                color: '#101827',
                                fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                                lineHeight: '27px',
                              }}
                            />{' '}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                onClick={c?.send}
                                style={{
                                  border: '0',
                                  background: '#4661ad',
                                  color: '#ffffff',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '10px 16px',
                                  minHeight: '44px',
                                  cursor: 'pointer',
                                }}
                              >{`Send to ${__t(c?.first)}`}</button>{' '}
                              <A
                                href="/business/customers"
                                style={{ fontWeight: '700', fontSize: '14px', padding: '10px 4px' }}
                              >
                                {'View profile'}
                              </A>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </div>{' '}
              {__b(__v?.groupOpen) ? (
                <>
                  <div
                    style={{
                      background: '#f7f7f9',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <label htmlFor="ov-group" style={{ fontWeight: '700' }}>
                      {"One message, each person's own name"}
                    </label>{' '}
                    <textarea
                      id="ov-group"
                      rows="3"
                      value={__v?.groupMsg}
                      onChange={__v?.onGroup}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        resize: 'vertical',
                        color: '#101827',
                        background: '#ffffff',
                      }}
                    />{' '}
                    <span
                      style={{ fontSize: '14px', color: '#5b6475' }}
                    >{`Liya sees: “${__t(__v?.groupPreview)}”`}</span>{' '}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={__v?.sendGroup}
                        style={{
                          border: '0',
                          background: '#4661ad',
                          color: '#ffffff',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 16px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >{`Send to ${__t(__v?.unsentCount)} people`}</button>{' '}
                      <button
                        type="button"
                        onClick={__v?.closeGroup}
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#101827',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 16px',
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
              {__b(__v?.showGroupBtn) ? (
                <>
                  <button
                    type="button"
                    onClick={__v?.openGroup}
                    style={{
                      marginTop: '4px',
                      alignSelf: 'flex-start',
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      color: '#4661ad',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >{`${__t(__v?.groupBtnLabel)}`}</button>
                </>
              ) : null}{' '}
              {__b(__v?.allSent) ? (
                <>
                  <p style={{ margin: '0', fontWeight: '700' }}>{'All 4 reminded today.'}</p>
                </>
              ) : null}
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default withDCStyle(OverviewView, 'Overview', __CSS);
