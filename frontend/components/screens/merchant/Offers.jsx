'use client';
/* Generated from the Temelash Card design (Offers.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import api, { getMerchantJoinUrl, getOrAssignUserCode } from '@/lib/api';
import renderOffers from './Offers.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n@media (min-width: 1024px){.pv-sticky{position:sticky;top:24px;align-self:flex-start;max-height:calc(100vh - 48px);overflow-y:auto}}';
class OffersView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      kind: 'offer',
      aud: 'all',
      en: null,
      am: null,
      wallet: true,
      email: false,
      device: 'web',
      when: 'now',
      pickDate: '2026-10-24',
      pickTime: '08:00',
      lang: 'en',
      sent: [],
      businessName: 'Sample Cafe',
      cardUrl: '',
      qrModalOpen: false,
      // Promotions over Telegram: { reach, nextAllowedAt, telegramEnabled, recent } from the backend.
      overview: null,
      sending: false,
      sendError: '',
    };
  }
  loadOverview = async () => {
    try {
      this.setState({ overview: await api.merchant.getPromotions() });
    } catch (e) {
      this.setState({ overview: { reach: 0, nextAllowedAt: null, telegramEnabled: false, recent: [], error: e.message } });
    }
  };

  componentDidMount() {
    this.loadOverview();
    try {
      let bizName = 'Sample Cafe';
      try {
        const localBiz = window.localStorage.getItem('tm-biz-profile');
        if (localBiz) {
          const parsed = JSON.parse(localBiz);
          if (parsed?.nameEn) bizName = parsed.nameEn;
        }
      } catch (e) {}

      this.setState({
        businessName: bizName,
        cardUrl: getMerchantJoinUrl(),
      });
    } catch (e) {}
  }
  kindDefs() {
    return {
      offer: {
        label: 'Special offer',
        desc: 'A deal for a set time, like a free pastry.',
        icon: 'M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7c-2-4-6-4-6-1.5S9 7 12 7zm0 0c2-4 6-4 6-1.5S15 7 12 7z',
        aud: 'all',
        en: '{first name}, free pastry with any coffee this week. Ends Sunday.',
        am: '{first name}፣ በዚህ ሳምንት ከማንኛውም ቡና ጋር ነፃ ኬክ። እስከ እሁድ።',
        effects: [
          'Customers get the message on their phone.',
          'The offer shows on their card until the end date, then disappears.',
          'Staff see the offer in the staff app when they scan the card.',
        ],
        banner: 'OFFER · FREE PASTRY · ENDS SUN 25 OCT',
        bannerBg: '#f7f7f9',
      },
      reminder: {
        label: 'Reward reminder',
        desc: 'Tell people how close they are to their reward.',
        icon: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0',
        aud: 'close',
        en: '{first name}, only {stamps to go} more visits to your free macchiato.',
        am: '{first name}፣ ነፃ ማኪያቶ ለማግኘት {stamps to go} ጉብኝት ብቻ ቀርቶዎታል።',
        effects: [
          'Each person sees their own stamps left, not a general message.',
          'Nothing changes on the card or the reward. It is just a nudge.',
          'Works best for people 1 or 2 stamps away.',
        ],
        banner: '{stamps to go} more visits to a free macchiato',
        bannerBg: '#fff3dc',
      },
      double: {
        label: 'Double stamps',
        desc: 'Every visit earns 2 stamps between dates you pick.',
        icon: 'M8 12a4 4 0 1 0 0-.01M16 12a4 4 0 1 0 0-.01',
        aud: 'quiet',
        en: '{first name}, every visit earns 2 stamps until Sunday. Your free macchiato comes twice as fast.',
        am: '{first name}፣ እስከ እሁድ በእያንዳንዱ ጉብኝት ሁለት ማህተም ያገኛሉ።',
        effects: [
          'From the start date, the staff app adds 2 stamps per visit automatically.',
          'The card shows a 2× badge while it runs.',
          'It switches itself off after the end date.',
        ],
        banner: '2× STAMPS ON EVERY VISIT · UNTIL SUN 25 OCT',
        bannerBg: '#fba919',
      },
    };
  }
  renderVals() {
    const s = this.state;
    const K = this.kindDefs();
    const k = K[s.kind];
    const kinds = Object.keys(K).map((id) => ({
      label: K[id].label,
      desc: K[id].desc,
      icon: K[id].icon,
      pressed: id === s.kind ? 'true' : 'false',
      border: id === s.kind ? '#4661ad' : '#e3e5ec',
      bg: id === s.kind ? '#f7f7f9' : '#ffffff',
      pick: () => this.setState({ kind: id, en: null, am: null, aud: K[id].aud, justSent: false }),
    }));
    const ov = s.overview;
    const audDefs = [
      ['all', 'Everyone who opted in', 'Telegram card + agreed to offers', ov ? ov.reach : '…', 0],
      ['close', 'Close to a reward', 'Coming soon', '—', 0],
      ['quiet', 'Gone quiet', 'Coming soon', '—', 0],
      ['bday', 'Birthday this month', 'Coming soon', '—', 0],
    ];
    const audiences = audDefs.map(([id, label, desc, n]) => ({
      label,
      desc,
      n: String(n),
      suggested: id === k.aud,
      checked: id === s.aud,
      border: id === s.aud ? '#4661ad' : '#e3e5ec',
      pick: () => this.setState({ aud: id }),
    }));
    const cur = audDefs.find((a) => a[0] === s.aud);
    const en = s.en !== null ? s.en : k.en;
    const am = s.am !== null ? s.am : k.am;
    const fill = (t) => t.replace(/\{first name\}/g, 'Liya').replace(/\{stamps to go\}/g, '3');
    const text = s.lang === 'am' ? am : en;
    let device = s.device;
    if (device === 'email' && !s.email) device = 'email';
    if (device === 'email') device = 'web';
    const devices = [
      ['web', 'Web card'],
      ['apple', 'Apple Wallet'],
      ['google', 'Google Wallet'],
    ].map(([id, label]) => ({
      label,
      sel: id === device ? 'true' : 'false',
      bg: id === device ? '#101827' : 'transparent',
      color: id === device ? '#ffffff' : '#101827',
      pick: () => this.setState({ device: id }),
    }));
    const langs = [
      ['en', 'English'],
      ['am', 'አማርኛ'],
    ].map(([id, label]) => ({
      label,
      pressed: id === s.lang ? 'true' : 'false',
      bg: id === s.lang ? '#101827' : '#ffffff',
      color: id === s.lang ? '#ffffff' : '#101827',
      border: id === s.lang ? '#101827' : '#e3e5ec',
      pick: () => this.setState({ lang: id }),
    }));
    const dots = [];
    for (let i = 0; i < 10; i++)
      dots.push({ bg: i < 7 ? '#fba919' : 'transparent', border: i < 7 ? '#fba919' : i === 9 ? '#e42330' : '#e3e5ec' });
    const reach = ov && s.wallet && s.aud === 'all' ? ov.reach : 0;
    const pvText = fill(text);
    const fmtDate = (iso, tm) => {
      if (!iso) return 'on a date you pick';
      const d = new Date(iso + 'T00:00:00');
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return 'on ' + days[d.getDay()] + ' ' + d.getDate() + ' ' + mons[d.getMonth()] + ' at ' + (tm || '08:00');
    };
    const whenText =
      s.when === 'now'
        ? 'now'
        : s.when === 'tomorrow'
          ? 'tomorrow (Thu 22 Oct) at 08:00'
          : fmtDate(s.pickDate, s.pickTime);
    const firstSentence = fill(en).split(/[.!?]/)[0];
    const typeLabel = k.label;
    const sentRows = ((ov && ov.recent) || []).map((p) => ({
      msg: p.message.length > 60 ? p.message.slice(0, 60) + '…' : p.message,
      type: 'Promotion',
      to: 'Opted in',
      via: 'Telegram',
      when: new Date(p.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
      back: p.sent + ' / ' + p.audienceSize,
    }));
    // Why Send is not possible right now, if it is not.
    const blocked = !ov
      ? 'Loading…'
      : !ov.telegramEnabled
        ? 'Telegram messages are not set up yet'
        : s.aud !== 'all'
          ? 'Only "Everyone who opted in" can be sent for now'
          : s.when !== 'now'
            ? 'Scheduling is coming soon: choose "Now"'
            : !s.wallet
              ? 'Tick Telegram message to send'
              : /\{stamps to go\}/.test(text)
                ? 'Remove {stamps to go}: it is not supported yet'
                : ov.nextAllowedAt
                  ? 'Next promotion after ' + new Date(ov.nextAllowedAt).toLocaleString()
                  : !reach
                    ? 'Nobody has opted in to offers yet'
                    : '';
    return {
      kinds,
      audiences,
      devices,
      langs,
      dots,
      effects: k.effects.map((t) => ({ t })),
      isOffer: s.kind === 'offer',
      isDouble: s.kind === 'double',
      en,
      am,
      onEn: (e) => this.setState({ en: e.target.value }),
      onAm: (e) => this.setState({ am: e.target.value }),
      resetMsg: () => this.setState({ en: null, am: null }),
      addName: () => {
        if (en.indexOf('{first name}') === -1)
          this.setState({ en: '{first name}, ' + en.charAt(0).toLowerCase() + en.slice(1), am: '{first name}፣ ' + am });
      },
      addStamps: () => {
        if (en.indexOf('{stamps to go}') === -1)
          this.setState({
            en: en.replace(/\s*$/, '') + ' Only {stamps to go} stamps to your reward.',
            am: am.replace(/\s*$/, '') + ' {stamps to go} ማህተም ብቻ ቀርቶዎታል።',
          });
      },
      chWallet: s.wallet,
      chEmail: s.email,
      toggleWallet: () => this.setState({ wallet: !s.wallet }),
      toggleEmail: () =>
        this.setState({ email: !s.email, device: !s.email ? 'email' : s.device === 'email' ? 'apple' : s.device }),
      walletN: String(cur[3]),
      emailN: '0',
      isApple: device === 'apple',
      isGoogle: device === 'google',
      isWeb: device === 'web',
      webSlots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
        bg: i < 7 ? '#fba919' : '#eceef2',
        border: i < 7 ? '#fba919' : '#d9dce3',
        check: i < 7 ? '#101827' : i === 9 ? '#c81d29' : '#c9cdd6',
        path: i === 9 ? 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13' : 'M5 12l5 5L20 7',
      })),
      cardUrl: this.state.cardUrl || getMerchantJoinUrl(),
      memberCode: getOrAssignUserCode(),
      businessName: this.state.businessName || 'Sample Cafe',
      qrModalOpen: s.qrModalOpen,
      openQrModal: () => this.setState({ qrModalOpen: true }),
      closeQrModal: () => this.setState({ qrModalOpen: false }),
      isEmail: device === 'email' && s.email,
      emailOff: device === 'email' && !s.email,
      pv: pvText,
      pvFont: s.lang === 'am' ? "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif" : "'Source Sans 3', sans-serif",
      subject: firstSentence,
      banner: fill(k.banner),
      bannerBg: k.bannerBg,
      when: s.when,
      isPick: s.when === 'pick',
      pickDate: s.pickDate,
      pickTime: s.pickTime,
      onWhen: (e) => this.setState({ when: e.target.value, justSent: false }),
      onDate: (e) => this.setState({ pickDate: e.target.value }),
      onTime: (e) => this.setState({ pickTime: e.target.value }),
      quick: [
        ['Sat 25 Oct, 7:30', '2026-10-25', '07:30'],
        ['Mon 27 Oct, 8:00', '2026-10-27', '08:00'],
        ['Fri 31 Oct, 12:00', '2026-10-31', '12:00'],
      ].map(([label, d, t]) => ({ label, pick: () => this.setState({ pickDate: d, pickTime: t }) })),
      whenSummary:
        whenText === 'now'
          ? 'Goes out as soon as you press Send.'
          : 'Goes out ' + whenText + '. You can cancel it from the Sent list until then.',
      sendLabel: s.sending ? 'Sending…' : blocked || 'Send to ' + reach + (reach === 1 ? ' person' : ' people'),
      sendDisabled: s.sending || !!blocked,
      sentNote: s.sendError || 'Sent. Customers get it in Telegram over the next few minutes; see the Sent list below.',
      sentNoteColor: s.sendError ? '#c81d29' : '#101827',
      justSent: !!s.justSent || !!s.sendError,
      send: async () => {
        if (blocked || s.sending) return;
        this.setState({ sending: true, sendError: '', justSent: false });
        try {
          await api.merchant.sendPromotion(text);
          this.setState({ sending: false, justSent: true });
          await this.loadOverview();
        } catch (e) {
          this.setState({ sending: false, sendError: e.message || 'Could not send. Please try again.' });
        }
      },
      sent: sentRows,
    };
  }
}

OffersView.defaultProps = {};

OffersView.prototype.__template = renderOffers;

export default withDCStyle(OffersView, 'Offers', __CSS);
