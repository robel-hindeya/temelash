'use client';
/* Generated from the Temelash Card design (CustomerFlow.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import api, { getOrAssignMerchantCode, setCustomerSession } from '@/lib/api';
import renderCustomerFlow from './CustomerFlow.view';

const __CSS =
  'body{margin:0}\ninput,button,a{font:inherit}\nbutton:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.mi:hover{background:#f7f7f9}';
class CustomerFlowView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      joinOpen: false,
      joined: false,
      screen: null,
      lang: 'en',
      menu: false,
      langSub: false,
      sheet: null,
      wallet: 'web',
      stamps: 1,
      notif: true,
      f: { name: '', phone: '', email: '', bday: '', consent: false },
      tried: false,
      toast: '',
      lastUpdate: '10:42 21/10',
      rewardCounter: false,
      cfg: { email: 'optional', birthday: 'optional', name: 'Sample Cafe' },
      rw: { count: 10, reward: 'Free macchiato', ms: [{ at: 5, name: 'Free cookie', days: 30 }] },
      unlockName: '',
      joinReference: props.slug || getOrAssignMerchantCode(),
    };
  }
  async componentDidMount() {
    this.load = () => {
      try {
        const c = JSON.parse(window.localStorage.getItem('tm-card') || 'null');
        const r = JSON.parse(window.localStorage.getItem('tm-rewards') || 'null');
        const o = {};
        if (c)
          o.cfg = { email: c.email || 'optional', birthday: c.birthday || 'optional', name: c.name || 'Sample Cafe' };
        if (r && r.count)
          o.rw = { count: r.count, reward: r.reward || 'Free macchiato', ms: Array.isArray(r.ms) ? r.ms : [] };
        if (Object.keys(o).length) this.setState(o);
      } catch (e) {}
    };
    this.load();
    window.addEventListener('storage', this.load);

    try {
      const [profRes, progRes] = await Promise.allSettled([
        api.merchant.getProfile(),
        api.merchant.getPrograms('ACTIVE'),
      ]);
      const updates = {};
      if (profRes.status === 'fulfilled' && profRes.value) {
        if (!this.props.slug && profRes.value.joinReference) updates.joinReference = profRes.value.joinReference;
        updates.cfg = Object.assign({}, this.state.cfg, { name: profRes.value.nameEn || 'Sample Cafe' });
      }
      if (progRes.status === 'fulfilled' && progRes.value?.length) {
        const p = progRes.value[0];
        const r = p.rewardDefinitions?.[0] || p.rewards?.[0];
        updates.rw = {
          count: p.stampsRequired || 10,
          reward: r?.nameEn || 'Free macchiato',
          ms: (p.rewardDefinitions || []).slice(1).map((rd, i) => ({
            at: (i + 1) * 5,
            name: rd.nameEn,
            days: rd.validForDays || 30,
          })),
        };
      }
      this.setState(updates);
    } catch (e) {
      console.warn('Customer flow database context warning:', e);
    }
  }
  componentWillUnmount() {
    if (this.tt) clearTimeout(this.tt);
    if (this.load) window.removeEventListener('storage', this.load);
  }
  flash(msg) {
    if (this.tt) clearTimeout(this.tt);
    this.setState({ toast: msg });
    this.tt = setTimeout(() => this.setState({ toast: '' }), 2600);
  }
  renderVals() {
    const s = this.state;
    const screen = s.screen ?? this.props.startScreen ?? 'landing';
    const am = s.lang === 'am';
    const first = (s.f.name || '').trim().split(/\s+/)[0] || 'Liya';
    const RW = s.rw;
    const mainAt = RW.count || 10;
    const mainName = RW.reward || 'Free macchiato';
    const rewardsAll = (RW.ms || [])
      .filter((m) => m.at !== mainAt)
      .map((m) => ({ at: m.at, name: m.name }))
      .concat([{ at: mainAt, name: mainName, main: true }])
      .sort((a, b) => a.at - b.at);
    const cardLen = Math.max(mainAt, ...rewardsAll.map((r) => r.at));
    const nextR = rewardsAll.find((r) => r.at > s.stamps);
    const left = nextR ? nextR.at - s.stamps : 0;
    const rAt = {};
    rewardsAll.forEach((r) => {
      rAt[r.at] = r;
    });
    const T = am
      ? {
          tagline: 'ትኩስ ቡና፣ በእያንዳንዱ ጉብኝት',
          collect: 'ሽልማት ለማግኘት ማህተሞችን ይሰብስቡ',
          r5: 'ነፃ ኩኪ',
          r10: 'ነፃ ማኪያቶ',
          emailPh: 'ኢሜይል (አማራጭ)',
          privacyShort: 'Buna House ስምዎን እና ስልክዎን ለካርድዎ ብቻ ይጠቀማል።',
          privacyLink: 'የግላዊነት ማሳሰቢያ',
          joinBtn: 'ካርዱን ይቀላቀሉ',
          joinedSub: 'የመጀመሪያ ማህተምዎ በካርዱ ላይ ነው።',
          savedA: 'በApple Wallet ተቀምጧል',
          savedG: 'በGoogle Wallet ተቀምጧል',
          savedW: 'የድር ካርድዎ ዝግጁ ነው።',
          getCard: 'የማህተም ካርድዎን ያግኙ',
          getCardSub: 'በ10 ማህተም ነፃ ማኪያቶ',
          follow: 'በInstagram ይከተሉን',
          step1: 'ደረጃ 1 ከ 2',
          step2: 'ደረጃ 2 ከ 2',
          joinTitle: 'የBuna House ካርድ',
          joinSub: 'ከ30 ሰከንድ ያነሰ ጊዜ',
          joinReward: 'በ10 ማህተም ነፃ ማኪያቶ። የመጀመሪያው ማህተም ዛሬ።',
          name: 'የመጀመሪያ ስም',
          namePh: 'ስምዎ',
          nameErr: 'ስምዎን ያስገቡ።',
          phone: 'ስልክ ቁጥር',
          phoneErr: 'ትክክለኛ ስልክ ቁጥር ያስገቡ።',
          phoneWhy: 'ስልክዎ ከጠፋ ካርድዎን ለማግኘት።',
          email: 'ኢሜይል',
          optional: '(አማራጭ)',
          emailErr: 'ትክክለኛ ኢሜይል ያስገቡ።',
          bday: 'የልደት ቀን',
          bdayPh: 'ቀን እና ወር',
          surpriseT: 'ድንገተኛ ስጦታ ይጠብቅዎታል',
          surpriseB: 'በልደትዎ ሳምንት ልዩ ስጦታ ይጠብቅዎታል።',
          consent: 'ከBuna House ቅናሾችን በኢሜይል ይላኩልኝ',
          continue: 'ቀጥል',
          privacy: 'መረጃዎን ለBuna House ብቻ እናጋራለን።',
          whereSave: 'ካርድዎን የት ያስቀምጡ?',
          whereSub: 'ማህተሞችዎ በየትኛውም ቦታ ይቀመጣሉ።',
          welcomeStamp: 'የእንኳን ደህና መጡ ማህተም ተጨምሯል።',
          addApple: 'ወደ Apple Wallet ያክሉ',
          addGoogle: 'ወደ Google Wallet ያክሉ',
          useWeb: 'Wallet የለዎትም? የድር ካርዱን ይጠቀሙ',
          readyT: 'ካርድዎ ዝግጁ ነው',
          openCard: 'ካርዴን ክፈት',
          cardMenu: 'የካርድ ምናሌ',
          expiry: 'የሚያበቃበት',
          last: 'የመጨረሻ ማህተም',
          tapEnlarge: 'ለማሳደግ ይንኩ',
          showCounter: 'ለካውንተሩ ያሳዩ',
          done: 'ተጠናቋል',
          brightTip: 'የስልክዎን ብርሃን ይጨምሩ።',
          unlockT: 'ነፃ ማኪያቶ ተከፍቷል',
          unlockB: 'ይህን ለካውንተሩ ያሳዩ።',
          showReward: 'የሽልማት ኮዱን አሳይ',
          saveLater: 'ለሚቀጥለው ጉብኝት አስቀምጥ',
          enjoyT: 'ማኪያቶዎን ይደሰቱ',
          enjoyB: 'ካርድዎ እንደገና ከ0/10 ይጀምራል።',
          backCard: 'ወደ ካርዴ ተመለስ',
          removedT: 'ካርዱ ተወግዷል',
          removedB: 'ማህተሞችዎ ለ30 ቀናት ይቀመጣሉ።',
          undo: 'ቀልብስ',
          details: 'የካርድ ዝርዝሮች',
          notif: 'የቅናሽ ማሳወቂያዎች',
          language: 'ቋንቋ',
          moveWallet: 'ወደ Wallet ያዛውሩ',
          share: 'ካርዱን ያጋሩ',
          remove: 'ካርዱን ያስወግዱ',
          removeQ: 'ካርዱን ያስወግዱ?',
          removeYes: 'አዎ፣ አስወግድ',
          keep: 'ካርዱን አቆይ',
          dReward: 'ሽልማት',
          dRewardV: 'በ10 ማህተም ነፃ ማኪያቶ',
          dMember: 'አባል',
          dAddress: 'አድራሻ',
          dOpen: 'ክፍት',
          dTerms: 'ውሎች',
          dTermsV: 'በጉብኝት አንድ ማህተም። ሽልማቱ ለ30 ቀናት ይሰራል።',
        }
      : {
          tagline: 'Fresh coffee, every visit',
          collect: 'Collect stamps to earn rewards',
          r5: 'Free cookie',
          r10: 'Free macchiato',
          emailPh: 'Email (optional)',
          privacyShort: 'Buna House uses your name and phone to run your card.',
          privacyLink: 'Privacy notice',
          joinBtn: 'Join the card',
          joinedSub: 'Your first stamp is already on the card.',
          savedA: 'Saved to Apple Wallet',
          savedG: 'Saved to Google Wallet',
          savedW: 'Your web card is ready. Bookmark this page.',
          getCard: 'Get your stamp card',
          getCardSub: 'Free macchiato at 10 stamps',
          follow: 'Follow us on Instagram',
          step1: 'Step 1 of 2',
          step2: 'Step 2 of 2',
          joinTitle: 'Join Buna House’s card',
          joinSub: 'Takes under 30 seconds',
          joinReward: 'Collect 10 stamps, get a free macchiato. Your first stamp is today.',
          name: 'First name',
          namePh: 'Your first name',
          nameErr: 'Add your first name.',
          phone: 'Phone number',
          phoneErr: 'Enter a phone number with at least 9 digits.',
          phoneWhy: 'So we can find your card if you lose your phone.',
          email: 'Email',
          optional: '(optional)',
          emailErr: 'That email doesn’t look right.',
          bday: 'Birthday',
          bdayPh: 'Day and month',
          surpriseT: 'A surprise is waiting for you',
          surpriseB: 'Tell us your birthday and we’ll have a treat ready for you that week.',
          consent: 'Send me offers from Buna House by email',
          continue: 'Continue',
          privacy: 'We only share your details with Buna House. No spam.',
          whereSave: 'Where do you want your card?',
          whereSub: 'Your stamps are saved wherever you pick.',
          welcomeStamp: 'Welcome stamp added.',
          addApple: 'Add to Apple Wallet',
          addGoogle: 'Add to Google Wallet',
          useWeb: 'No wallet app? Use the web card',
          readyT: 'Your card is ready',
          openCard: 'Open my card',
          cardMenu: 'Card menu',
          expiry: 'Expiry Date',
          last: 'Last Update',
          tapEnlarge: 'Tap to enlarge',
          showCounter: 'Show at the counter',
          done: 'Done',
          brightTip: 'Turn up your screen brightness so staff can scan it fast.',
          unlockT: 'Free macchiato unlocked',
          unlockB: 'Show this at the counter. It’s valid for 30 days.',
          showReward: 'Show my reward code',
          saveLater: 'Save it for my next visit',
          enjoyT: 'Enjoy your macchiato',
          enjoyB: 'Your card starts again at 0/10. Same reward, same counter.',
          backCard: 'Back to my card',
          removedT: 'Card removed',
          removedB: 'We keep your stamps for 30 days in case you change your mind.',
          undo: 'Undo',
          details: 'Card details',
          notif: 'Offer notifications',
          language: 'Language',
          moveWallet: 'Move to Apple or Google Wallet',
          share: 'Share this card',
          remove: 'Remove card',
          removeQ: 'Remove this card?',
          removeYes: 'Yes, remove it',
          keep: 'Keep my card',
          dReward: 'Reward',
          dRewardV: 'Free macchiato at 10 stamps',
          dMember: 'Member',
          dAddress: 'Address',
          dOpen: 'Open',
          dTerms: 'Terms',
          dTermsV: 'One stamp per visit. Reward valid 30 days after it unlocks.',
        };
    const go = (scr, extra) => () =>
      this.setState(Object.assign({ screen: scr, menu: false, langSub: false, sheet: null }, extra || {}));
    const setF = (k) => (e) => this.setState({ f: Object.assign({}, s.f, { [k]: e.target.value }) });
    const digits = (s.f.phone || '').replace(/\D/g, '');
    const err = {
      name: s.tried && !(s.f.name || '').trim(),
      phone: s.tried && digits.length < 9,
      email:
        s.tried &&
        s.cfg.email !== 'off' &&
        ((s.cfg.email === 'required' && !(s.f.email || '').trim()) ||
          (!!(s.f.email || '').trim() && (s.f.email.indexOf('@') < 1 || s.f.email.indexOf('.') === -1))),
      bday: s.tried && s.cfg.birthday === 'required' && !(s.f.bday || '').trim(),
    };
    err.nameBorder = err.name ? '#c81d29' : '#e3e5ec';
    err.phoneBorder = err.phone ? '#c81d29' : '#e3e5ec';
    err.emailBorder = err.email ? '#c81d29' : '#e3e5ec';
    const now = () => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, '0');
      return p(d.getHours()) + ':' + p(d.getMinutes()) + ' ' + p(d.getDate()) + '/' + p(d.getMonth() + 1);
    };
    const addStamp = (backTo) => {
      const n = Math.min(cardLen, s.stamps + 1);
      const hit = rAt[n];
      if (hit) this.setState({ stamps: n, screen: 'unlocked', unlockName: hit.name, lastUpdate: now(), menu: false });
      else {
        this.setState({ stamps: n, screen: backTo, lastUpdate: now() });
        this.flash(am ? 'ማህተም ተጨምሯል · ' + n + '/' + cardLen : 'Stamp added · ' + n + '/' + cardLen);
      }
    };
    const GIFTP = 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13';
    const slots = [];
    for (let i = 1; i <= cardLen; i++) {
      const rr = rAt[i],
        e = i <= s.stamps;
      if (rr && rr.main)
        slots.push({
          bg: e ? '#e42330' : '#eceef2',
          border: '#e42330',
          bs: e ? 'solid' : 'dashed',
          check: e ? '#ffffff' : '#c81d29',
          path: GIFTP,
        });
      else if (rr)
        slots.push({ bg: e ? '#fba919' : '#fff3dc', border: '#fba919', bs: 'solid', check: '#101827', path: GIFTP });
      else
        slots.push({
          bg: e ? '#fba919' : '#eceef2',
          border: e ? '#fba919' : '#d9dce3',
          bs: 'solid',
          check: e ? '#101827' : '#c9cdd6',
          path: 'M5 12l5 5L20 7',
        });
    }
    const mini = [];
    for (let i = 1; i <= cardLen; i++)
      mini.push({
        bg: i === 1 ? '#fba919' : 'transparent',
        border: i === 1 ? '#fba919' : rAt[i] ? (rAt[i].main ? '#e42330' : '#fba919') : '#e3e5ec',
        bs: rAt[i] && rAt[i].main ? 'dashed' : 'solid',
      });
    const N = 11,
      qr = [];
    const seed =
      '1011001011101101001101011100101101010011101011001010111001101001011011100101011010011101010110010110101101001011100';
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) {
        const inF = (R, C) => r >= R && r < R + 3 && c >= C && c < C + 3;
        let on;
        if (inF(0, 0) || inF(0, N - 3) || inF(N - 3, 0)) on = true;
        else if (
          (r === 3 && (c < 4 || c > N - 5)) ||
          (c === 3 && (r < 4 || r > N - 5)) ||
          (r === N - 4 && c < 4) ||
          (c === N - 4 && r < 4)
        )
          on = false;
        else on = seed.charAt((r * N + c) % seed.length) === '1';
        qr.push({ c: on ? '#101827' : 'transparent' });
      }
    const walletNames = { apple: 'Apple Wallet', google: 'Google Wallet', web: am ? 'የድር ካርድ' : 'Web card' };
    const readyBodies = am
      ? {
          apple: 'በApple Wallet ውስጥ ተቀምጧል። ' + first + '፣ በሚቀጥለው ጉብኝትዎ ማህተም።',
          google: 'በGoogle Wallet ውስጥ ተቀምጧል። ' + first + '፣ በሚቀጥለው ጉብኝትዎ ማህተም።',
          web: 'ይህን ገጽ ወደ መነሻ ገጽዎ ያክሉ። ' + first + '፣ በሚቀጥለው ጉብኝትዎ ማህተም።',
        }
      : {
          apple: first + ', it’s in Apple Wallet next to your boarding passes. Next stamp on your next visit.',
          google: first + ', it’s in Google Wallet. Next stamp on your next visit.',
          web: first + ', bookmark this page or add it to your home screen. Next stamp on your next visit.',
        };
    const langSet = (l, close) => () =>
      this.setState(Object.assign({ lang: l }, close ? { menu: false, langSub: false } : {}));
    const tokenVal = s.cardToken || (typeof window !== 'undefined' ? window.localStorage.getItem('tm-customer-token') : null) || 'A25rOmsw_h-cQ1DEXRuJ5pfuSstxAq7l_0pwMJtnZqo';

    return {
      cardToken: tokenVal,
      t: Object.assign({}, T, {
        getCardSub: am ? 'በ' + mainAt + ' ማህተም ' + mainName : mainName + ' at ' + mainAt + ' stamps',
        unlockT: (s.unlockName || mainName) + (am ? ' ተከፍቷል' : ' unlocked'),
        dRewardV: rewardsAll.map((r) => r.at + ': ' + r.name).join(' · '),
        joinReward: am
          ? 'በ' + mainAt + ' ማህተም ' + mainName + '። የመጀመሪያው ማህተም ዛሬ።'
          : 'Collect ' + mainAt + ' stamps, get ' + mainName.toLowerCase() + '. Your first stamp is today.',
        enjoyT: am ? 'ሽልማትዎን ይደሰቱ' : 'Enjoy your ' + (s.unlockName || mainName).replace(/^free /i, '').toLowerCase(),
        enjoyB:
          s.stamps >= cardLen || s.stamps === 0
            ? am
              ? 'ካርድዎ እንደገና ከ0 ይጀምራል።'
              : 'Your card starts again at 0/' + cardLen + '.'
            : am
              ? 'ማህተሞችዎ ይቀጥላሉ።'
              : 'Your stamps keep counting. ' + (nextR ? left + ' more to ' + nextR.name.toLowerCase() + '.' : ''),
      }),
      is: {
        landing: screen === 'landing',
        join: false,
        save: false,
        ready: false,
        card: screen === 'card',
        counter: screen === 'counter',
        unlocked: screen === 'unlocked',
        redeemed: screen === 'redeemed',
        removed: screen === 'removed',
      },
      enPressed: am ? 'false' : 'true',
      amPressed: am ? 'true' : 'false',
      enBg: am ? 'transparent' : '#ffffff',
      enFg: am ? '#ffffff' : '#101827',
      amBg: am ? '#ffffff' : 'transparent',
      amFg: am ? '#101827' : '#ffffff',
      setEn: langSet('en'),
      setAm: langSet('am'),
      setEnClose: langSet('en', true),
      setAmClose: langSet('am', true),
      enMark: am ? '' : '✓',
      amMark: am ? '✓' : '',
      langName: am ? 'አማርኛ' : 'English',
      goLanding: go('landing'),
      goJoin: go('join'),
      goCard: go('card', { rewardCounter: false }),
      goCounter: go('counter', { rewardCounter: !!rAt[s.stamps] }),
      goRewardCounter: go('counter', { rewardCounter: true }),
      openInsta: () => this.flash(am ? 'Instagram ይከፈታል · @bunahouse' : 'Opens Instagram · @bunahouse'),
      f: s.f,
      err,
      onName: setF('name'),
      onPhone: setF('phone'),
      onEmail: setF('email'),
      onBday: setF('bday'),
      onConsent: () => this.setState({ f: Object.assign({}, s.f, { consent: !s.f.consent }) }),
      submitJoin: async () => {
        const em = (s.f.email || '').trim();
        const emailOk =
          s.cfg.email === 'off' || (em ? em.indexOf('@') > 0 && em.indexOf('.') !== -1 : s.cfg.email !== 'required');
        const bdayOk = s.cfg.birthday !== 'required' || !!(s.f.bday || '').trim();
        const ok = (s.f.name || '').trim() && digits.length >= 9 && emailOk && bdayOk;
        if (ok) {
          const joinRef = s.joinReference;
          const payload = {
            firstName: (s.f.name || '').trim(),
            phone: s.f.phone.startsWith('+251') ? s.f.phone : `+251${digits.slice(-9)}`,
            email: em || `${(s.f.name || 'member').toLowerCase().replace(/[^a-z0-9]/g, '')}${Date.now().toString().slice(-4)}@customer.test`,
            preferredLanguage: s.lang === 'am' ? 'AM' : 'EN',
            acceptTerms: true,
            marketingConsent: !!s.f.consent,
          };
          try {
            const enrollRes = await api.public.enroll(joinRef, payload);
            const token = enrollRes?.card?.token || enrollRes?.cardToken;
            if (token) {
              setCustomerSession({ token, firstName: payload.firstName, phone: payload.phone, joinReference: joinRef });
              this.setState({ cardToken: token, joined: true, tried: false });
              return;
            }
            this.flash(
              enrollRes?.status === 'EXISTING'
                ? 'You already have a card here. Open it from the link you saved when you joined.'
                : 'Could not create your card. Please try again.',
            );
          } catch (e) {
            this.flash(e.message || 'Could not create your card. Please try again.');
          }
        } else {
          this.setState({ tried: true });
        }
      },
      mini,
      miniDark: Array.from({ length: cardLen }, (x, k) => k + 1).map((i) => ({
        bg: i === 1 ? '#fba919' : 'transparent',
        border: i === 1 ? '#fba919' : rAt[i] ? (rAt[i].main ? '#ff5a63' : '#fba919') : '#2c3650',
        bs: rAt[i] && rAt[i].main ? 'dashed' : 'solid',
      })),
      miniCols: String(Math.min(cardLen, 10)),
      tiles: rewardsAll.map((r) => ({ at: String(r.at), name: r.name })),
      showEmail: s.cfg.email !== 'off',
      showBday: s.cfg.birthday !== 'off',
      bdayPh:
        (am ? 'የልደት ቀን' : 'Birthday, day and month') +
        (s.cfg.birthday === 'required' ? '' : am ? ' (አማራጭ)' : ' (optional)'),
      emailErrText:
        s.cfg.email === 'required' && !(s.f.email || '').trim()
          ? am
            ? 'ኢሜይልዎን ያስገቡ።'
            : 'Add your email.'
          : T.emailErr,
      bdayErrText: am ? 'የልደት ቀንዎን ያስገቡ።' : 'Add your birthday to join.',
      unlockedFrac: s.stamps + '/' + cardLen,
      joinOpen: s.joinOpen,
      joinExpanded: s.joinOpen ? 'true' : 'false',
      joinChevron: s.joinOpen ? 'M7 14l5-5 5 5' : 'M7 10l5 5 5-5',
      toggleJoin: () => this.setState({ joinOpen: !s.joinOpen }),
      joined: s.joined,
      notJoined: !s.joined,
      joinedTitle: am ? first + '፣ ገብተዋል!' : 'You’re in, ' + first + '!',
      errD: {
        name: err.name ? '#ff5a63' : '#2c3650',
        phone: err.phone ? '#ff5a63' : '#2c3650',
        email: err.email ? '#ff5a63' : '#2c3650',
        bday: err.bday ? '#ff5a63' : '#2c3650',
      },
      saveApple: () => {
        this.setState({ screen: 'card', wallet: 'apple', menu: false });
        this.flash(T.savedA);
      },
      saveGoogle: () => {
        this.setState({ screen: 'card', wallet: 'google', menu: false });
        this.flash(T.savedG);
      },
      saveWeb: () => {
        this.setState({ screen: 'card', wallet: 'web', menu: false });
        this.flash(T.savedW);
      },
      readyBody: readyBodies[s.wallet],
      walletChip: walletNames[s.wallet],
      slots,
      qr,
      lastUpdate: s.lastUpdate,
      stampsLabel: (s.stamps < 10 ? '0' : '') + s.stamps + (am ? ' ማህተሞች' : ' Stamps'),
      rewardLine: rAt[s.stamps]
        ? rAt[s.stamps].name + (am ? ' ተከፍቷል' : ' unlocked')
        : nextR
          ? am
            ? 'ለ' + nextR.name + ' ' + left + ' ጉብኝት ቀርቷል'
            : left + ' more ' + (left === 1 ? 'visit' : 'visits') + ' to ' + nextR.name.toLowerCase()
          : am
            ? 'ካርዱ ተጠናቋል'
            : 'Card complete',
      demoStamp: () => addStamp('card'),
      demoStampBack: () => addStamp('card'),
      demoRedeem: () =>
        this.setState({
          screen: 'redeemed',
          stamps: s.stamps >= cardLen ? 0 : s.stamps,
          lastUpdate: now(),
          rewardCounter: false,
        }),
      isRewardCounter: s.rewardCounter,
      notRewardCounter: !s.rewardCounter,
      counterTitle: s.rewardCounter
        ? am
          ? 'የሽልማት ኮድ · ነፃ ማኪያቶ'
          : 'Reward code · free macchiato'
        : am
          ? 'ይህን ለሰራተኛው ያሳዩ'
          : 'Show this to staff',
      firstName: first,
      menuOpen: s.menu && screen === 'card',
      menuExpanded: s.menu ? 'true' : 'false',
      toggleMenu: () => this.setState({ menu: !s.menu, langSub: false }),
      closeMenu: () => this.setState({ menu: false, langSub: false }),
      openDetails: () => this.setState({ menu: false, sheet: 'details' }),
      notifChecked: s.notif ? 'true' : 'false',
      notifTrack: s.notif ? '#101827' : '#e3e5ec',
      notifJustify: s.notif ? 'flex-end' : 'flex-start',
      toggleNotif: () => {
        this.setState({ notif: !s.notif });
        this.flash(
          !s.notif
            ? am
              ? 'ማሳወቂያዎች በርተዋል'
              : 'Offer notifications on'
            : am
              ? 'ማሳወቂያዎች ጠፍተዋል'
              : 'Offer notifications off',
        );
      },
      langOpen: s.langSub,
      langExpanded: s.langSub ? 'true' : 'false',
      langChevron: s.langSub ? 'M7 14l5-5 5 5' : 'M7 10l5 5 5-5',
      toggleLangSub: () => this.setState({ langSub: !s.langSub }),
      showAddWallet: s.wallet === 'web',
      moveToWallet: () => {
        this.setState({ menu: false, wallet: 'apple' });
        this.flash(am ? 'ወደ Apple Wallet ተዛውሯል' : 'Moved to Apple Wallet. Your stamps came with it.');
      },
      share: () => {
        this.setState({ menu: false });
        this.flash(am ? 'የመቀላቀያ አገናኝ ተቀድቷል' : 'Join link copied. Friends get their own card.');
      },
      askRemove: () => this.setState({ menu: false, sheet: 'remove' }),
      sheetDetails: s.sheet === 'details',
      sheetRemove: s.sheet === 'remove',
      closeSheet: () => this.setState({ sheet: null }),
      removeBody: am
        ? s.stamps + ' ማህተሞች አሉዎት። ለ30 ቀናት እናስቀምጣቸዋለን።'
        : 'You have ' + s.stamps + ' of 10 stamps. We’ll keep them for 30 days if you change your mind.',
      confirmRemove: go('removed'),
      undoRemove: () => {
        this.setState({ screen: 'card', sheet: null });
        this.flash(am ? 'ካርዱ ተመልሷል' : 'Card restored with all your stamps.');
      },
      restart: () =>
        this.setState({
          joinOpen: false,
          joined: false,
          screen: 'landing',
          stamps: 1,
          wallet: 'web',
          f: { name: '', phone: '', email: '', bday: '', consent: false },
          tried: false,
          sheet: null,
          menu: false,
        }),
      hasToast: !!s.toast,
      toast: s.toast,
    };
  }
}

CustomerFlowView.defaultProps = { startScreen: 'landing' };

CustomerFlowView.prototype.__template = renderCustomerFlow;

export default withDCStyle(CustomerFlowView, 'CustomerFlow', __CSS);
