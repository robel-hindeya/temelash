import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import api, { getOrAssignMerchantCode } from '@/lib/api';
import renderCustomers from './Customers.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main aside{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.row:hover{background:#f7f7f9}';
class CustomersView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      sel: 0,
      compose: false,
      tpl: 'reminder',
      en: null,
      am: null,
      channel: 'wallet',
      justSent: false,
      sentVia: '',
      log: {},
      extra: {},
      emails: {},
      newEmail: '',
      loading: true,
      rawCustomers: [],
      program: null,
      searchQuery: '',
    };
  }

  async componentDidMount() {
    await this.loadCustomers();
  }

  loadCustomers = async () => {
    try {
      const [custRes, progRes] = await Promise.allSettled([
        api.merchant.getCustomers({ limit: 50 }),
        api.merchant.getPrograms('ACTIVE'),
      ]);
      const updates = { loading: false };
      if (custRes.status === 'fulfilled' && custRes.value?.items) {
        updates.rawCustomers = custRes.value.items;
      }
      if (progRes.status === 'fulfilled' && progRes.value?.length) {
        updates.program = progRes.value[0];
      }
      this.setState(updates);
    } catch (e) {
      console.warn('Failed to load customers:', e);
      this.setState({ loading: false });
    }
  };

  async enrollTestCustomer() {
    const names = ['Abebe', 'Sara', 'Kidus', 'Almaz', 'Dawit', 'Helen', 'Yared', 'Bethlehem'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const rndPhone = '+2519' + Math.floor(10000000 + Math.random() * 90000000);
    const rndEmail = `${randomName.toLowerCase()}${Date.now().toString().slice(-4)}@customer.test`;
    try {
      await api.public.enroll(getOrAssignMerchantCode(), {
        firstName: randomName,
        phone: rndPhone,
        email: rndEmail,
        acceptTerms: true,
        preferredLanguage: 'EN',
        marketingConsent: false,
      });
      await this.loadCustomers();
    } catch (e) {
      console.warn('Enroll failed:', e);
    }
  }
  renderVals() {
    const st = this.state;
    const raw = st.rawCustomers || [];
    const data = raw.map((c, i) => {
      const fn = c.firstName || 'Customer';
      const ph = c.phone || '+251 91 000 0000';
      const stCount = c.stamps ?? (c.memberships?.[0]?.currentStamps ?? 0);
      const visits = stCount > 0 ? stCount : 1;
      const joined = c.joinedAt
        ? new Date(c.joinedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
        : 'Recently';
      const statusKey = stCount >= 7 ? 'close' : stCount > 1 ? 'regular' : 'new';
      const walletKey = 'web';
      return [
        fn,
        ph,
        stCount,
        visits,
        'Today',
        statusKey,
        stCount >= 7 ? 1 : 0,
        joined,
        c.email || '',
        walletKey,
        c.id,
        c.memberships?.[0]?.id,
      ];
    });

    data.forEach((d, i) => {
      d[2] = Math.min(10, d[2] + (st.extra[i] || 0));
      if (st.emails[i]) d[8] = st.emails[i];
    });
    const W = {
      apple: {
        short: 'Apple Wallet',
        long: 'Apple Wallet · iPhone',
        icon: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2',
      },
      google: {
        short: 'Google Wallet',
        long: 'Google Wallet · Android',
        icon: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM5 6h14M5 18h14',
      },
      web: {
        short: 'Web card',
        long: 'Web card · browser',
        icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
      },
    };
    const statusMap = {
      regular: { label: 'Regular', bg: '#ffffff', fg: '#101827', border: '#e3e5ec' },
      close: { label: '1 to reward', bg: '#fba919', fg: '#101827', border: '#fba919' },
      new: { label: 'New', bg: '#ffffff', fg: '#4661ad', border: '#4661ad' },
      quiet: { label: 'Gone quiet', bg: '#fde8e9', fg: '#c81d29', border: '#fde8e9' },
    };
    const f = st.filter;
    const filterDefs = [
      ['all', 'All', String(data.length)],
      ['regular', 'Regulars', String(data.filter((d) => d[5] === 'regular').length)],
      ['close', 'Close to reward', String(data.filter((d) => d[5] === 'close').length)],
      ['quiet', 'Gone quiet', String(data.filter((d) => d[5] === 'quiet').length)],
      ['new', 'New this week', String(data.filter((d) => d[5] === 'new').length)],
      ['email', 'Has email', String(data.filter((d) => !!d[8]).length)],
    ];
    const reset = { compose: false, justSent: false, en: null, am: null, newEmail: '', pvTab: null };
    const filters = filterDefs.map(([id, label, n]) => ({
      label,
      n,
      pressed: id === f ? 'true' : 'false',
      bg: id === f ? '#101827' : '#ffffff',
      color: id === f ? '#ffffff' : '#101827',
      border: id === f ? '#101827' : '#e3e5ec',
      pick: () => this.setState(Object.assign({ filter: id, sel: null }, reset)),
    }));
    const visible = data
      .map((d, i) => ({ d, i }))
      .filter(({ d }) => {
        if (f !== 'all' && (f === 'email' ? !d[8] : d[5] !== f)) return false;
        if (st.searchQuery && st.searchQuery.trim()) {
          const q = st.searchQuery.toLowerCase().trim();
          return (
            (d[0] && d[0].toLowerCase().includes(q)) ||
            (d[1] && d[1].toLowerCase().includes(q)) ||
            (d[8] && d[8].toLowerCase().includes(q))
          );
        }
        return true;
      });
    const selIdx = st.sel !== null && visible.some((v) => v.i === st.sel) ? st.sel : visible[0] ? visible[0].i : 0;
    const ini = (n) =>
      n
        .split(' ')
        .map((p) => p.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();
    const rows = visible.map(({ d, i }) => {
      const sm = statusMap[d[5]];
      return {
        name: d[0],
        phone: d[1],
        email: d[8] || 'No email',
        emailColor: d[8] ? '#5b6475' : '#c81d29',
        ini: ini(d[0]),
        wallet: W[d[9]].short,
        walletIcon: W[d[9]].icon,
        stamps: d[2] + '/10',
        pct: d[2] * 10 + '%',
        visits: String(d[3]),
        last: d[4],
        status: sm.label,
        sBg: sm.bg,
        sFg: sm.fg,
        sBorder: sm.border,
        rowBg: i === selIdx ? '#f7f7f9' : '#ffffff',
        pick: () => this.setState(Object.assign({ sel: i }, reset)),
      };
    });
    const s = data[selIdx] || ['Customer', '+251 91 000 0000', 0, 1, 'Today', 'new', 0, 'Recently', '', 'web', '', ''];
    const first = (s[0] || 'Customer').split(' ')[0];
    const hasEmail = !!s[8];
    const rem = 10 - (s[2] || 0);
    const vw = rem === 1 ? 'visit' : 'visits';
    let defTpl = 'reminder';
    if (s[5] === 'quiet') defTpl = 'missyou';
    if (s[5] === 'new') defTpl = 'welcome';
    if (s[5] === 'regular') defTpl = 'thanks';
    const tplId = st.tpl;
    const texts = {
      reminder: [
        first + ', ' + rem + ' more ' + vw + ' to your free macchiato. See you soon!',
        first + '፣ ነፃ ማኪያቶ ለማግኘት ' + rem + ' ጉብኝት ብቻ ቀርቶዎታል።',
      ],
      missyou: [
        first + ', we miss you. Your next visit earns double stamps, valid until Sunday.',
        first + '፣ ናፍቀውናል። በሚቀጥለው ጉብኝትዎ ሁለት ማህተም ያገኛሉ፤ እስከ እሁድ።',
      ],
      welcome: [
        first +
          ', thanks for joining. You have ' +
          s[2] +
          ' stamp' +
          (s[2] === 1 ? '' : 's') +
          ' already, ' +
          rem +
          ' to go.',
        first + '፣ እንኳን ደህና መጡ። ' + rem + ' ማህተም ብቻ ቀርቶዎታል።',
      ],
      thanks: [
        first + ', thank you for ' + s[3] + ' visits. Your next coffee is on its way to free.',
        first + '፣ ስለ ' + s[3] + ' ጉብኝቶችዎ እናመሰግናለን።',
      ],
    };
    const tplDefs = [
      ['reminder', 'Reward reminder'],
      ['missyou', 'We miss you'],
      ['welcome', 'Welcome'],
      ['thanks', 'Thank you'],
    ];
    const tpls = tplDefs.map(([id, label]) => ({
      label,
      pressed: id === tplId ? 'true' : 'false',
      bg: id === tplId ? '#101827' : '#ffffff',
      color: id === tplId ? '#ffffff' : '#101827',
      border: id === tplId ? '#101827' : '#e3e5ec',
      pick: () => this.setState({ tpl: id, en: null, am: null }),
    }));
    const suggestions = {
      regular: 'A regular. A thank-you keeps them close.',
      close: first + ' is ' + rem + ' stamp' + (rem === 1 ? '' : 's') + ' from a reward. A reminder works best.',
      new: first + ' just joined. Welcome them back for visit two.',
      quiet: first + ' hasn’t visited in a while. Give them a reason to come back.',
    };
    const en = st.en !== null ? st.en : texts[tplId][0];
    const am = st.am !== null ? st.am : texts[tplId][1];
    const channel = 'wallet';
    const walletLabel = s[9] === 'web' ? 'Web card' : W[s[9]].short;
    const channels = [
      ['wallet', walletLabel, false],
      ['email', 'Email · coming soon', true],
      ['sms', 'SMS · coming soon', true],
    ].map(([id, label, disabled]) => ({
      label,
      disabled,
      pressed: id === channel ? 'true' : 'false',
      cursor: disabled ? 'not-allowed' : 'pointer',
      bg: id === channel ? '#101827' : '#ffffff',
      color: id === channel ? '#ffffff' : disabled ? '#5b6475' : '#101827',
      border: id === channel ? '#101827' : disabled ? '#e3e5ec' : '#e3e5ec',
      pick: () => {
        if (!disabled) this.setState({ channel: id });
      },
    }));
    const pvEmail = channel === 'email';
    const myLog = st.log[selIdx] || [];
    const history = myLog
      .map((m) => ({ what: m, when: 'Just now', dot: '#4661ad' }))
      .concat([
        { what: 'Stamp added · ' + s[2] + '/10', when: s[4], dot: '#fba919' },
        { what: 'Opened your offer: Double stamps', when: '5 days ago', dot: '#4661ad' },
        { what: 'Reward redeemed · free macchiato', when: '3 weeks ago', dot: '#e42330' },
        { what: hasEmail ? 'Shared email at sign-up' : 'Skipped email at sign-up', when: s[7], dot: '#e3e5ec' },
        { what: 'Saved card to ' + W[s[9]].short, when: s[7], dot: '#101827' },
      ]);
    const via = pvEmail ? 'email' : walletLabel;
    const totalSharedEmail = data.filter((d) => !!d[8]).length;
    const emailPct = data.length > 0 ? Math.round((totalSharedEmail / data.length) * 100) + '%' : '0%';
    return {
      custSubtitle: `${data.length} people have your card. ${totalSharedEmail} shared an email.`,
      appleCount: String(data.filter((d) => d[9] === 'apple').length),
      googleCount: String(data.filter((d) => d[9] === 'google').length),
      webCount: String(data.filter((d) => d[9] === 'web').length),
      emailCount: String(totalSharedEmail),
      emailPct,
      searchQuery: st.searchQuery,
      onSearch: (e) => this.setState({ searchQuery: e.target.value }),
      filters,
      rows,
      shown: rows.length + ' of ' + filterDefs.find((x) => x[0] === f)[2],
      sel: {
        name: s[0],
        first,
        phone: s[1],
        email: s[8],
        emailShown: s[8] || 'Not shared',
        emailColor: hasEmail ? '#101827' : '#c81d29',
        ini: ini(s[0]),
        stamps: s[2] + '/10',
        visits: String(s[3]),
        rewards: String(s[6]),
        joined: s[7],
        walletLong: W[s[9]].long,
        walletIcon: W[s[9]].icon,
      },
      noEmail: !hasEmail,
      newEmail: st.newEmail,
      onNewEmail: (e) => this.setState({ newEmail: e.target.value }),
      saveEmail: () => {
        if (st.newEmail.indexOf('@') > 0)
          this.setState({ emails: Object.assign({}, st.emails, { [selIdx]: st.newEmail }), newEmail: '' });
      },
      history,
      tpls,
      channels,
      en,
      am,
      suggestion: suggestions[s[5]],
      pvApple: !pvEmail && (st.pvTab || s[9]) === 'apple',
      pvGoogle: !pvEmail && (st.pvTab || s[9]) === 'google',
      pvWeb: !pvEmail && (st.pvTab || s[9]) === 'web',
      pvEmail,
      pvTabs: [
        ['apple', 'Apple'],
        ['google', 'Google'],
        ['web', 'Web card'],
      ].map(([id, label]) => {
        const on = (st.pvTab || s[9]) === id;
        return {
          label: label + (s[9] === id ? ' · theirs' : ''),
          sel: on ? 'true' : 'false',
          bg: on ? '#101827' : 'transparent',
          color: on ? '#ffffff' : '#101827',
          pick: () => this.setState({ pvTab: id }),
        };
      }),
      webHint: '. Email and SMS are coming soon.',
      previewLabel: pvEmail ? 'EMAIL TO ' + first.toUpperCase() : 'WHAT ' + first.toUpperCase() + ' SEES',
      subject: en.split(/[.!?]/)[0],
      composing: st.compose,
      notComposing: !st.compose,
      justSent: st.justSent && !st.compose,
      sentNote: 'Sent to ' + first + ' by ' + st.sentVia + '.',
      openCompose: () =>
        this.setState({ compose: true, justSent: false, tpl: defTpl, en: null, am: null, channel: 'wallet' }),
      closeCompose: () => this.setState({ compose: false }),
      onEn: (e) => this.setState({ en: e.target.value }),
      onAm: (e) => this.setState({ am: e.target.value }),
      addStamp: () =>
        this.setState({
          extra: Object.assign({}, st.extra, { [selIdx]: (st.extra[selIdx] || 0) + 1 }),
          justSent: false,
        }),
      send: () =>
        this.setState({
          compose: false,
          justSent: true,
          sentVia: via,
          log: Object.assign({}, st.log, {
            [selIdx]: ['Message by ' + via + ': ' + (en.length > 40 ? en.slice(0, 40) + '…' : en)].concat(myLog),
          }),
        }),
      enrollTestCustomer: () => this.enrollTestCustomer(),
    };
  }
}

CustomersView.defaultProps = {};

CustomersView.prototype.__template = renderCustomers;

export default withDCStyle(CustomersView, 'Customers', __CSS);
