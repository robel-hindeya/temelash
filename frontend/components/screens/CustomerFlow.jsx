'use client';
/* Generated from the Temelash Card design (CustomerFlow.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import api from '@/lib/api';
import QRCodeDisplay from '@/components/QRCodeDisplay';

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
      f: { name: '', phone: '', email: '', bday: '', consent: true },
      tried: false,
      toast: '',
      lastUpdate: '10:42 21/10',
      rewardCounter: false,
      cfg: { email: 'optional', birthday: 'optional', name: 'Sample Cafe' },
      rw: { count: 10, reward: 'Free macchiato', ms: [{ at: 5, name: 'Free cookie', days: 30 }] },
      unlockName: '',
      joinReference: 'sample-cafe',
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
        updates.joinReference = profRes.value.joinReference || profRes.value.slug || 'sample-cafe';
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
          const joinRef = s.joinReference || 'sample-cafe';
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
              try {
                window.localStorage.setItem('tm-customer-token', token);
                window.localStorage.setItem('teme_active_card_token', token);
                window.localStorage.setItem('teme_last_enrolled_card', JSON.stringify({
                  token,
                  customerName: payload.firstName,
                  phone: payload.phone,
                }));
              } catch (e) {}
              this.setState({ cardToken: token, joined: true, tried: false });
              return;
            }
          } catch (e) {
            console.warn('Backend enrollment note (proceeding):', e);
          }
          this.setState({ joined: true, tried: false });
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
          f: { name: '', phone: '', email: '', bday: '', consent: true },
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
CustomerFlowView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          width: '390px',
          height: '844px',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          fontSize: '16px',
          lineHeight: '24px',
          background: '#e9ebf0',
        }}
      >
        {__b(__v?.is?.landing) ? (
          <>
            <div
              style={{
                height: '100%',
                overflowY: 'auto',
                background: '#8a4b2a',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                <div
                  role="group"
                  aria-label="Language"
                  style={{
                    display: 'flex',
                    background: 'rgba(255,255,255,0.14)',
                    borderRadius: '999px',
                    padding: '3px',
                  }}
                >
                  <button
                    type="button"
                    aria-pressed={__v?.enPressed}
                    onClick={__v?.setEn}
                    style={{
                      border: '0',
                      borderRadius: '999px',
                      padding: '6px 12px',
                      minHeight: '36px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      background: `${__t(__v?.enBg)}`,
                      color: `${__t(__v?.enFg)}`,
                    }}
                  >
                    {'EN'}
                  </button>{' '}
                  <button
                    type="button"
                    aria-pressed={__v?.amPressed}
                    onClick={__v?.setAm}
                    style={{
                      border: '0',
                      borderRadius: '999px',
                      padding: '6px 12px',
                      minHeight: '36px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      background: `${__t(__v?.amBg)}`,
                      color: `${__t(__v?.amFg)}`,
                    }}
                  >
                    {'አማ'}
                  </button>
                </div>
              </div>{' '}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 24px 24px',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '999px',
                    background: '#ffffff',
                    color: '#8a4b2a',
                    fontWeight: '800',
                    fontSize: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 4px rgba(255,255,255,0.25)',
                    marginBottom: '8px',
                  }}
                >
                  {'B'}
                </span>{' '}
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontVariant: 'small-caps',
                    fontSize: '32px',
                    lineHeight: '38px',
                    fontWeight: '700',
                  }}
                >
                  {'Buna House'}
                </span>{' '}
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontVariant: 'small-caps',
                    fontSize: '17px',
                    opacity: '0.9',
                  }}
                >{`${__t(__v?.t?.tagline)}`}</span>
              </div>{' '}
              <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#1b2436', color: '#ffffff', borderRadius: '14px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={__v?.toggleJoin}
                    aria-expanded={__v?.joinExpanded}
                    aria-controls="cf-join"
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      border: '0',
                      background: 'transparent',
                      color: '#ffffff',
                      padding: '14px',
                      minHeight: '72px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'none',
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fba919"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                      </svg>
                    </span>{' '}
                    <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontVariant: 'small-caps',
                          fontWeight: '700',
                          fontSize: '18px',
                        }}
                      >{`${__t(__v?.t?.getCard)}`}</span>
                      <span style={{ fontSize: '13px', opacity: '0.8' }}>{`${__t(__v?.t?.getCardSub)}`}</span>
                    </span>{' '}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ opacity: '0.6' }}
                    >
                      <path d={__v?.joinChevron} />
                    </svg>
                  </button>{' '}
                  {__b(__v?.joinOpen) ? (
                    <>
                      <div
                        id="cf-join"
                        style={{
                          borderTop: '1px solid #2c3650',
                          padding: '20px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                        }}
                      >
                        {__b(__v?.notJoined) ? (
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: '4px',
                                  textAlign: 'center',
                                }}
                              >
                                <span
                                  style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '999px',
                                    background: '#fba919',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '4px',
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#101827"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                                  </svg>
                                </span>{' '}
                                <strong style={{ fontSize: '20px', lineHeight: '26px' }}>{'Buna House'}</strong>{' '}
                                <span style={{ color: '#9aa3b5' }}>{`${__t(__v?.t?.collect)}`}</span>
                              </div>{' '}
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                  gap: '10px',
                                }}
                              >
                                {(__v?.tiles || []).map((tl, __i0) => (
                                  <React.Fragment key={__i0}>
                                    <div
                                      style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        borderRadius: '12px',
                                        padding: '14px 8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px',
                                        textAlign: 'center',
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: '36px',
                                          height: '36px',
                                          borderRadius: '999px',
                                          background: '#fba919',
                                          color: '#101827',
                                          fontWeight: '800',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontVariantNumeric: 'tabular-nums',
                                        }}
                                      >{`${__t(tl?.at)}`}</span>
                                      <strong
                                        style={{ fontSize: '14px', lineHeight: '18px' }}
                                      >{`${__t(tl?.name)}`}</strong>
                                    </div>
                                  </React.Fragment>
                                ))}
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label
                                  htmlFor="cfl-name"
                                  style={{
                                    position: 'absolute',
                                    width: '1px',
                                    height: '1px',
                                    overflow: 'hidden',
                                    clip: 'rect(0 0 0 0)',
                                  }}
                                >{`${__t(__v?.t?.name)}`}</label>{' '}
                                <input
                                  id="cfl-name"
                                  type="text"
                                  autoComplete="given-name"
                                  value={__v?.f?.name}
                                  placeholder={__v?.t?.namePh}
                                  style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: `1px solid ${__t(__v?.errD?.name)}`,
                                    borderRadius: '10px',
                                    padding: '14px',
                                    minHeight: '52px',
                                    boxSizing: 'border-box',
                                    color: '#ffffff',
                                  }}
                                  onChange={__v?.onName}
                                />{' '}
                                {__b(__v?.err?.name) ? (
                                  <>
                                    <span
                                      style={{ fontSize: '14px', color: '#ff5a63' }}
                                    >{`${__t(__v?.t?.nameErr)}`}</span>
                                  </>
                                ) : null}
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label
                                  htmlFor="cfl-phone"
                                  style={{
                                    position: 'absolute',
                                    width: '1px',
                                    height: '1px',
                                    overflow: 'hidden',
                                    clip: 'rect(0 0 0 0)',
                                  }}
                                >{`${__t(__v?.t?.phone)}`}</label>{' '}
                                <input
                                  id="cfl-phone"
                                  type="tel"
                                  autoComplete="tel"
                                  value={__v?.f?.phone}
                                  placeholder={__v?.t?.phone}
                                  style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: `1px solid ${__t(__v?.errD?.phone)}`,
                                    borderRadius: '10px',
                                    padding: '14px',
                                    minHeight: '52px',
                                    boxSizing: 'border-box',
                                    color: '#ffffff',
                                  }}
                                  onChange={__v?.onPhone}
                                />{' '}
                                {__b(__v?.err?.phone) ? (
                                  <>
                                    <span
                                      style={{ fontSize: '14px', color: '#ff5a63' }}
                                    >{`${__t(__v?.t?.phoneErr)}`}</span>
                                  </>
                                ) : null}
                              </div>{' '}
                              {__b(__v?.showEmail) ? (
                                <>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label
                                      htmlFor="cfl-email"
                                      style={{
                                        position: 'absolute',
                                        width: '1px',
                                        height: '1px',
                                        overflow: 'hidden',
                                        clip: 'rect(0 0 0 0)',
                                      }}
                                    >{`${__t(__v?.t?.email)}`}</label>{' '}
                                    <input
                                      id="cfl-email"
                                      type="email"
                                      autoComplete="email"
                                      value={__v?.f?.email}
                                      placeholder={__v?.t?.emailPh}
                                      style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: `1px solid ${__t(__v?.errD?.email)}`,
                                        borderRadius: '10px',
                                        padding: '14px',
                                        minHeight: '52px',
                                        boxSizing: 'border-box',
                                        color: '#ffffff',
                                      }}
                                      onChange={__v?.onEmail}
                                    />{' '}
                                    {__b(__v?.err?.email) ? (
                                      <>
                                        <span
                                          style={{ fontSize: '14px', color: '#ff5a63' }}
                                        >{`${__t(__v?.emailErrText)}`}</span>
                                      </>
                                    ) : null}
                                  </div>
                                </>
                              ) : null}{' '}
                              {__b(__v?.showBday) ? (
                                <>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label
                                      htmlFor="cfl-bday"
                                      style={{
                                        position: 'absolute',
                                        width: '1px',
                                        height: '1px',
                                        overflow: 'hidden',
                                        clip: 'rect(0 0 0 0)',
                                      }}
                                    >{`${__t(__v?.t?.bday)}`}</label>{' '}
                                    <input
                                      id="cfl-bday"
                                      type="text"
                                      value={__v?.f?.bday}
                                      placeholder={__v?.bdayPh}
                                      style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: `1px solid ${__t(__v?.errD?.bday)}`,
                                        borderRadius: '10px',
                                        padding: '14px',
                                        minHeight: '52px',
                                        boxSizing: 'border-box',
                                        color: '#ffffff',
                                      }}
                                      onChange={__v?.onBday}
                                    />{' '}
                                    {__b(__v?.err?.bday) ? (
                                      <>
                                        <span
                                          style={{ fontSize: '14px', color: '#ff5a63' }}
                                        >{`${__t(__v?.bdayErrText)}`}</span>
                                      </>
                                    ) : null}{' '}
                                    <span
                                      style={{
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'flex-start',
                                        background: 'rgba(251,169,25,0.14)',
                                        borderRadius: '10px',
                                        padding: '10px 12px',
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: '26px',
                                          height: '26px',
                                          borderRadius: '999px',
                                          background: '#fba919',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          flex: 'none',
                                        }}
                                      >
                                        <svg
                                          width="14"
                                          height="14"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="#101827"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          aria-hidden="true"
                                        >
                                          <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                                        </svg>
                                      </span>
                                      <span
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          fontSize: '13px',
                                          lineHeight: '18px',
                                        }}
                                      >
                                        <strong style={{ fontSize: '14px' }}>{`${__t(__v?.t?.surpriseT)}`}</strong>
                                        <span style={{ color: '#9aa3b5' }}>{`${__t(__v?.t?.surpriseB)}`}</span>
                                      </span>
                                    </span>
                                  </div>
                                </>
                              ) : null}{' '}
                              <span style={{ fontSize: '14px', lineHeight: '20px', color: '#9aa3b5' }}>
                                {`${__t(__v?.t?.privacyShort)} `}
                                <A href="#privacy" style={{ color: '#ffffff' }}>{`${__t(__v?.t?.privacyLink)}`}</A>
                              </span>{' '}
                              <button
                                type="button"
                                onClick={__v?.submitJoin}
                                style={{
                                  border: '0',
                                  background: '#e42330',
                                  color: '#ffffff',
                                  fontWeight: '700',
                                  fontSize: '18px',
                                  borderRadius: '12px',
                                  padding: '14px',
                                  minHeight: '52px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(__v?.t?.joinBtn)}`}</button>
                            </div>
                          </>
                        ) : null}{' '}
                        {__b(__v?.joined) ? (
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span
                                  style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '999px',
                                    background: '#fba919',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 'none',
                                  }}
                                >
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#101827"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M5 12l5 5L20 7" />
                                  </svg>
                                </span>{' '}
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                  <strong
                                    style={{ fontSize: '18px', lineHeight: '24px' }}
                                  >{`${__t(__v?.joinedTitle)}`}</strong>
                                  <span
                                    style={{ fontSize: '14px', color: '#9aa3b5' }}
                                  >{`${__t(__v?.t?.joinedSub)}`}</span>
                                </span>
                              </div>{' '}
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: `repeat(${__t(__v?.miniCols)}, minmax(0, 1fr))`,
                                  gap: '4px',
                                  padding: '4px 0',
                                }}
                              >
                                {(__v?.miniDark || []).map((m, __i0) => (
                                  <React.Fragment key={__i0}>
                                    <span
                                      style={{
                                        aspectRatio: '1',
                                        borderRadius: '999px',
                                        boxSizing: 'border-box',
                                        background: `${__t(m?.bg)}`,
                                        border: `2px ${__t(m?.bs)} ${__t(m?.border)}`,
                                      }}
                                    />
                                  </React.Fragment>
                                ))}
                              </div>{' '}
                              <span style={{ fontSize: '14px', color: '#9aa3b5' }}>{`${__t(__v?.t?.whereSave)}`}</span>{' '}
                              <button
                                type="button"
                                onClick={__v?.saveApple}
                                style={{
                                  border: '0',
                                  background: '#ffffff',
                                  color: '#101827',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '14px',
                                  minHeight: '52px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(__v?.t?.addApple)}`}</button>{' '}
                              <button
                                type="button"
                                onClick={__v?.saveGoogle}
                                style={{
                                  border: '1px solid #9aa3b5',
                                  background: 'transparent',
                                  color: '#ffffff',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '14px',
                                  minHeight: '52px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(__v?.t?.addGoogle)}`}</button>{' '}
                              <button
                                type="button"
                                onClick={__v?.saveWeb}
                                style={{
                                  background: 'transparent',
                                  color: '#8fa4e6',
                                  border: '1px dashed #8fa4e6',
                                  fontWeight: '700',
                                  borderRadius: '12px',
                                  padding: '12px',
                                  minHeight: '48px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(__v?.t?.useWeb)}`}</button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>{' '}
                <button
                  type="button"
                  onClick={__v?.openInsta}
                  style={{
                    textAlign: 'left',
                    border: '0',
                    background: '#1b2436',
                    color: '#ffffff',
                    borderRadius: '14px',
                    padding: '14px',
                    minHeight: '72px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 'none',
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8fa4e6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01" />
                    </svg>
                  </span>{' '}
                  <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontVariant: 'small-caps',
                        fontWeight: '700',
                        fontSize: '18px',
                      }}
                    >{`${__t(__v?.t?.follow)}`}</span>
                    <span style={{ fontSize: '13px', opacity: '0.8' }}>{'@bunahouse'}</span>
                  </span>{' '}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ opacity: '0.6' }}
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>{' '}
              <div style={{ flex: '1 1 auto' }} />{' '}
              <div
                style={{
                  padding: '28px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 40 40" aria-hidden="true">
                  <path
                    d="M5 11 L15 23 L25 11"
                    fill="none"
                    stroke="#fba919"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 29 L25 17 L35 29"
                    fill="none"
                    stroke="#ff5a63"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{' '}
                <span style={{ fontWeight: '800', letterSpacing: '0.03em', fontSize: '13px' }}>{'TEMELASH CARD'}</span>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.join) ? (
          <>
            <div style={{ height: '100%', overflowY: 'auto', background: '#f7f7f9' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 8px',
                  background: '#ffffff',
                  borderBottom: '1px solid #e3e5ec',
                  position: 'sticky',
                  top: '0',
                }}
              >
                <button
                  type="button"
                  onClick={__v?.goLanding}
                  aria-label="Back"
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '0',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#101827"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>{' '}
                <span style={{ fontWeight: '700' }}>{`${__t(__v?.t?.step1)}`}</span>
              </div>{' '}
              <div style={{ padding: '20px 16px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: '#8a4b2a',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {'B'}
                  </span>{' '}
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{ fontSize: '22px', lineHeight: '28px', fontWeight: '700' }}
                    >{`${__t(__v?.t?.joinTitle)}`}</span>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.t?.joinSub)}`}</span>
                  </span>
                </div>{' '}
                <span
                  style={{ background: '#fff3dc', borderRadius: '12px', padding: '10px 14px', fontWeight: '600' }}
                >{`${__t(__v?.t?.joinReward)}`}</span>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cf-name" style={{ fontWeight: '700' }}>{`${__t(__v?.t?.name)}`}</label>{' '}
                  <input
                    id="cf-name"
                    type="text"
                    autoComplete="given-name"
                    value={__v?.f?.name}
                    placeholder={__v?.t?.namePh}
                    style={{
                      border: `1px solid ${__t(__v?.err?.nameBorder)}`,
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                    onChange={__v?.onName}
                  />{' '}
                  {__b(__v?.err?.name) ? (
                    <>
                      <span style={{ fontSize: '14px', color: '#c81d29' }}>{`${__t(__v?.t?.nameErr)}`}</span>
                    </>
                  ) : null}
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cf-phone" style={{ fontWeight: '700' }}>{`${__t(__v?.t?.phone)}`}</label>{' '}
                  <input
                    id="cf-phone"
                    type="tel"
                    autoComplete="tel"
                    value={__v?.f?.phone}
                    placeholder="09__ ___ ___"
                    style={{
                      border: `1px solid ${__t(__v?.err?.phoneBorder)}`,
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                    onChange={__v?.onPhone}
                  />{' '}
                  {__b(__v?.err?.phone) ? (
                    <>
                      <span style={{ fontSize: '14px', color: '#c81d29' }}>{`${__t(__v?.t?.phoneErr)}`}</span>
                    </>
                  ) : null}{' '}
                  <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(__v?.t?.phoneWhy)}`}</span>
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cf-email" style={{ fontWeight: '700' }}>
                    {`${__t(__v?.t?.email)} `}
                    <span style={{ fontWeight: '600', color: '#5b6475' }}>{`${__t(__v?.t?.optional)}`}</span>
                  </label>{' '}
                  <input
                    id="cf-email"
                    type="email"
                    autoComplete="email"
                    value={__v?.f?.email}
                    placeholder="name@example.com"
                    style={{
                      border: `1px solid ${__t(__v?.err?.emailBorder)}`,
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                    onChange={__v?.onEmail}
                  />{' '}
                  {__b(__v?.err?.email) ? (
                    <>
                      <span style={{ fontSize: '14px', color: '#c81d29' }}>{`${__t(__v?.t?.emailErr)}`}</span>
                    </>
                  ) : null}
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cf-bday" style={{ fontWeight: '700' }}>
                    {`${__t(__v?.t?.bday)} `}
                    <span style={{ fontWeight: '600', color: '#5b6475' }}>{`${__t(__v?.t?.optional)}`}</span>
                  </label>{' '}
                  <input
                    id="cf-bday"
                    type="text"
                    value={__v?.f?.bday}
                    placeholder={__v?.t?.bdayPh}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      color: '#101827',
                    }}
                    onChange={__v?.onBday}
                  />{' '}
                  <span
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      background: '#fff3dc',
                      borderRadius: '10px',
                      padding: '10px 12px',
                    }}
                  >
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '999px',
                        background: '#fba919',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'none',
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#101827"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                      </svg>
                    </span>{' '}
                    <span style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', lineHeight: '18px' }}>
                      <strong style={{ fontSize: '14px' }}>{`${__t(__v?.t?.surpriseT)}`}</strong>
                      <span>{`${__t(__v?.t?.surpriseB)}`}</span>
                    </span>
                  </span>
                </div>{' '}
                <label
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    fontSize: '14px',
                    lineHeight: '20px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={__b(__v?.f?.consent)}
                    onChange={__v?.onConsent}
                    style={{ width: '20px', height: '20px', margin: '0', flex: 'none' }}
                  />{' '}
                  <span>{`${__t(__v?.t?.consent)}`}</span>
                </label>{' '}
                <button
                  type="button"
                  onClick={__v?.submitJoin}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '18px',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.continue)}`}</button>{' '}
                <span
                  style={{ fontSize: '12px', lineHeight: '16px', color: '#5b6475', textAlign: 'center' }}
                >{`${__t(__v?.t?.privacy)}`}</span>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.save) ? (
          <>
            <div style={{ height: '100%', overflowY: 'auto', background: '#f7f7f9' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 8px',
                  background: '#ffffff',
                  borderBottom: '1px solid #e3e5ec',
                }}
              >
                <button
                  type="button"
                  onClick={__v?.goJoin}
                  aria-label="Back"
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '0',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#101827"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>{' '}
                <span style={{ fontWeight: '700' }}>{`${__t(__v?.t?.step2)}`}</span>
              </div>{' '}
              <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span
                  style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '700' }}
                >{`${__t(__v?.t?.whereSave)}`}</span>{' '}
                <span style={{ color: '#5b6475' }}>{`${__t(__v?.t?.whereSub)}`}</span>{' '}
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    margin: '8px 0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{'Buna House'}</strong>
                    <span style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}>{'1/10'}</span>
                  </div>{' '}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, minmax(0, 1fr))', gap: '4px' }}>
                    {(__v?.mini || []).map((m, __i0) => (
                      <React.Fragment key={__i0}>
                        <span
                          style={{
                            aspectRatio: '1',
                            borderRadius: '999px',
                            boxSizing: 'border-box',
                            background: `${__t(m?.bg)}`,
                            border: `2px ${__t(m?.bs)} ${__t(m?.border)}`,
                          }}
                        />
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(__v?.t?.welcomeStamp)}`}</span>
                </div>{' '}
                <button
                  type="button"
                  onClick={__v?.saveApple}
                  style={{
                    border: '0',
                    background: '#101827',
                    color: '#ffffff',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.addApple)}`}</button>{' '}
                <button
                  type="button"
                  onClick={__v?.saveGoogle}
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#101827',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.addGoogle)}`}</button>{' '}
                <button
                  type="button"
                  onClick={__v?.saveWeb}
                  style={{
                    background: 'transparent',
                    color: '#4661ad',
                    border: '1px dashed #4661ad',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4661ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
                  </svg>
                  {`${__t(__v?.t?.useWeb)}`}
                </button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.ready) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '32px 24px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '999px',
                  background: '#fba919',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>{' '}
              <span
                style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '700' }}
              >{`${__t(__v?.t?.readyT)}`}</span>{' '}
              <span style={{ color: '#5b6475', maxWidth: '300px' }}>{`${__t(__v?.readyBody)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.goCard}
                style={{
                  marginTop: '16px',
                  alignSelf: 'stretch',
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '12px',
                  padding: '14px',
                  minHeight: '52px',
                  cursor: 'pointer',
                }}
              >{`${__t(__v?.t?.openCard)}`}</button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.card) ? (
          <>
            <div style={{ height: '100%', overflowY: 'auto', background: '#e9ebf0' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px 10px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="22" height="22" viewBox="0 0 40 40" aria-hidden="true">
                    <path
                      d="M5 11 L15 23 L25 11"
                      fill="none"
                      stroke="#fba919"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 29 L25 17 L35 29"
                      fill="none"
                      stroke="#e42330"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{ fontSize: '13px', fontWeight: '700', color: '#5b6475' }}
                  >{`${__t(__v?.walletChip)}`}</span>
                </span>{' '}
                <button
                  type="button"
                  onClick={__v?.toggleMenu}
                  aria-haspopup="menu"
                  aria-expanded={__v?.menuExpanded}
                  aria-label={__v?.t?.cardMenu}
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '0',
                    borderRadius: '999px',
                    background: '#101827',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                    <circle cx="6" cy="12" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <circle cx="18" cy="12" r="1.8" />
                  </svg>
                </button>
              </div>{' '}
              <div
                style={{
                  margin: '0 12px',
                  background: '#ffffff',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  padding: '20px 18px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '999px',
                        background: '#8a4b2a',
                        color: '#ffffff',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {'B'}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '11px',
                        lineHeight: '11px',
                        fontWeight: '800',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {'BUNA'}
                      <span>{'HOUSE'}</span>
                    </span>
                  </span>{' '}
                  <span
                    style={{ fontSize: '14px', fontWeight: '600', fontVariantNumeric: 'tabular-nums' }}
                  >{`${__t(__v?.stampsLabel)}`}</span>
                </div>{' '}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                    gap: '12px',
                    padding: '0 4px',
                  }}
                >
                  {(__v?.slots || []).map((s, __i0) => (
                    <React.Fragment key={__i0}>
                      <span
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          boxSizing: 'border-box',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${__t(s?.bg)}`,
                          border: `1.5px ${__t(s?.bs)} ${__t(s?.border)}`,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={s?.check}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d={s?.path} />
                        </svg>
                      </span>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', color: '#5b6475' }}>{`${__t(__v?.t?.expiry)}`}</span>
                    <span style={{ fontSize: '15px', fontWeight: '700' }}>{'30 Nov 2026'}</span>
                  </span>{' '}
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '12px', color: '#5b6475' }}>{`${__t(__v?.t?.last)}`}</span>
                    <span
                      style={{ fontSize: '15px', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}
                    >{`${__t(__v?.lastUpdate)}`}</span>
                  </span>
                </div>{' '}
                <span
                  style={{ background: '#fff3dc', borderRadius: '8px', padding: '10px 12px', fontWeight: '600' }}
                >{`${__t(__v?.rewardLine)}`}</span>{' '}
                <button
                  type="button"
                  onClick={__v?.goCounter}
                  aria-label={__v?.t?.showCounter}
                  style={{
                    alignSelf: 'center',
                    border: '0',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '108px',
                      height: '108px',
                      padding: '4px',
                      background: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e3e5ec',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    <QRCodeDisplay value={__v?.cardToken} size={96} />
                  </div>{' '}
                  <span
                    style={{ fontSize: '13px', color: '#4661ad', fontWeight: '700' }}
                  >{`${__t(__v?.t?.tapEnlarge)}`}</span>
                </button>
              </div>{' '}
              <div style={{ padding: '16px 12px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="button"
                  onClick={__v?.goCounter}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '14px',
                    minHeight: '52px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.showCounter)}`}</button>{' '}
                <button
                  type="button"
                  onClick={__v?.demoStamp}
                  style={{
                    border: '1px dashed #5b6475',
                    background: 'transparent',
                    color: '#5b6475',
                    fontWeight: '700',
                    fontSize: '14px',
                    borderRadius: '12px',
                    padding: '10px',
                    minHeight: '44px',
                    cursor: 'pointer',
                  }}
                >
                  {'Demo only: staff adds a stamp'}
                </button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.counter) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 24px 28px',
                boxSizing: 'border-box',
                gap: '14px',
                textAlign: 'center',
              }}
            >
              <div
                style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ fontWeight: '700' }}>{'Buna House'}</span>
                <button
                  type="button"
                  onClick={__v?.goCard}
                  style={{
                    border: '0',
                    background: 'transparent',
                    color: '#4661ad',
                    fontWeight: '700',
                    padding: '0 4px',
                    minHeight: '44px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.done)}`}</button>
              </div>{' '}
              <span
                style={{ fontSize: '24px', lineHeight: '30px', fontWeight: '700', marginTop: '24px' }}
              >{`${__t(__v?.counterTitle)}`}</span>{' '}
              <div
                style={{
                  width: '240px',
                  height: '240px',
                  padding: '16px',
                  border: '1px solid #e3e5ec',
                  borderRadius: '20px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.06)',
                }}
              >
                <QRCodeDisplay value={__v?.cardToken} size={208} />
              </div>{' '}
              <span
                style={{
                  fontSize: '12px',
                  color: '#64748b',
                  letterSpacing: '0.04em',
                  fontFamily: 'monospace',
                  background: '#f1f5f9',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  maxWidth: '260px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={__v?.cardToken}
              >
                {__v?.cardToken}
              </span>{' '}
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >{`0412 · ${__t(__v?.firstName)}`}</span>{' '}
              <span
                style={{ fontSize: '14px', color: '#5b6475', maxWidth: '280px' }}
              >{`${__t(__v?.t?.brightTip)}`}</span>{' '}
              <div style={{ flex: '1 1 auto' }} />{' '}
              {__b(__v?.isRewardCounter) ? (
                <>
                  <button
                    type="button"
                    onClick={__v?.demoRedeem}
                    style={{
                      alignSelf: 'stretch',
                      border: '1px dashed #5b6475',
                      background: 'transparent',
                      color: '#5b6475',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderRadius: '12px',
                      padding: '10px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Demo only: staff redeems the reward'}
                  </button>
                </>
              ) : null}{' '}
              {__b(__v?.notRewardCounter) ? (
                <>
                  <button
                    type="button"
                    onClick={__v?.demoStampBack}
                    style={{
                      alignSelf: 'stretch',
                      border: '1px dashed #5b6475',
                      background: 'transparent',
                      color: '#5b6475',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderRadius: '12px',
                      padding: '10px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Demo only: staff scans and adds a stamp'}
                  </button>
                </>
              ) : null}
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.unlocked) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#101827',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '32px 24px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: '112px',
                  height: '112px',
                  borderRadius: '999px',
                  background: '#fba919',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                </svg>
              </span>{' '}
              <span
                style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', color: '#fba919' }}
              >{`${__t(__v?.unlockedFrac)}`}</span>{' '}
              <span
                style={{
                  fontSize: '30px',
                  lineHeight: '36px',
                  fontWeight: '800',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >{`${__t(__v?.t?.unlockT)}`}</span>{' '}
              <span style={{ color: '#9aa3b5', maxWidth: '280px' }}>{`${__t(__v?.t?.unlockB)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.goRewardCounter}
                style={{
                  marginTop: '16px',
                  alignSelf: 'stretch',
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '12px',
                  padding: '14px',
                  minHeight: '52px',
                  cursor: 'pointer',
                }}
              >{`${__t(__v?.t?.showReward)}`}</button>{' '}
              <button
                type="button"
                onClick={__v?.goCard}
                style={{
                  alignSelf: 'stretch',
                  border: '1px solid #2c3650',
                  background: 'transparent',
                  color: '#ffffff',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '12px',
                  minHeight: '48px',
                  cursor: 'pointer',
                }}
              >{`${__t(__v?.t?.saveLater)}`}</button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.redeemed) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '32px 24px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '999px',
                  background: '#fba919',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>{' '}
              <span
                style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '700' }}
              >{`${__t(__v?.t?.enjoyT)}`}</span>{' '}
              <span style={{ color: '#5b6475', maxWidth: '300px' }}>{`${__t(__v?.t?.enjoyB)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.goCard}
                style={{
                  marginTop: '16px',
                  alignSelf: 'stretch',
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '12px',
                  padding: '14px',
                  minHeight: '52px',
                  cursor: 'pointer',
                }}
              >{`${__t(__v?.t?.backCard)}`}</button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.is?.removed) ? (
          <>
            <div
              style={{
                height: '100%',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '32px 24px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <span
                style={{ fontSize: '26px', lineHeight: '32px', fontWeight: '700' }}
              >{`${__t(__v?.t?.removedT)}`}</span>{' '}
              <span style={{ color: '#5b6475', maxWidth: '300px' }}>{`${__t(__v?.t?.removedB)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.undoRemove}
                style={{
                  marginTop: '12px',
                  alignSelf: 'stretch',
                  border: '1px solid #e3e5ec',
                  background: '#ffffff',
                  color: '#4661ad',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '12px',
                  minHeight: '48px',
                  cursor: 'pointer',
                }}
              >{`${__t(__v?.t?.undo)}`}</button>{' '}
              <button
                type="button"
                onClick={__v?.restart}
                style={{
                  border: '0',
                  background: 'transparent',
                  color: '#5b6475',
                  fontWeight: '700',
                  padding: '10px',
                  minHeight: '44px',
                  cursor: 'pointer',
                }}
              >
                {'Restart the demo'}
              </button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.menuOpen) ? (
          <>
            <button
              type="button"
              aria-label="Close menu"
              onClick={__v?.closeMenu}
              style={{
                position: 'absolute',
                inset: '0',
                border: '0',
                background: 'rgba(16,24,39,0.25)',
                cursor: 'default',
              }}
            />{' '}
            <div
              role="menu"
              aria-label={__v?.t?.cardMenu}
              style={{
                position: 'absolute',
                top: '64px',
                right: '12px',
                width: '260px',
                background: '#ffffff',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                border: '1px solid #e3e5ec',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <button
                type="button"
                role="menuitem"
                className="mi"
                onClick={__v?.openDetails}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v6M12 7.5h.01" />
                </svg>
                {`${__t(__v?.t?.details)}`}
              </button>{' '}
              <button
                type="button"
                role="menuitem"
                className="mi"
                onClick={__v?.goCounter}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3z" />
                </svg>
                {`${__t(__v?.t?.showCounter)}`}
              </button>{' '}
              <button
                type="button"
                role="menuitemcheckbox"
                aria-checked={__v?.notifChecked}
                className="mi"
                onClick={__v?.toggleNotif}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />
                </svg>
                <span style={{ flex: '1 1 auto' }}>{`${__t(__v?.t?.notif)}`}</span>
                <span
                  aria-hidden="true"
                  style={{
                    width: '40px',
                    height: '24px',
                    borderRadius: '999px',
                    padding: '3px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: `${__t(__v?.notifJustify)}`,
                    background: `${__t(__v?.notifTrack)}`,
                  }}
                >
                  <span style={{ width: '18px', height: '18px', borderRadius: '999px', background: '#ffffff' }} />
                </span>
              </button>{' '}
              <button
                type="button"
                role="menuitem"
                aria-expanded={__v?.langExpanded}
                className="mi"
                onClick={__v?.toggleLangSub}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
                </svg>
                <span style={{ flex: '1 1 auto' }}>{`${__t(__v?.t?.language)}`}</span>
                <span style={{ color: '#5b6475', fontSize: '14px' }}>{`${__t(__v?.langName)}`}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5b6475"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={__v?.langChevron} />
                </svg>
              </button>{' '}
              {__b(__v?.langOpen) ? (
                <>
                  <div
                    role="group"
                    aria-label={__v?.t?.language}
                    style={{ display: 'flex', flexDirection: 'column', padding: '0 6px 6px 44px' }}
                  >
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={__v?.enPressed}
                      className="mi"
                      onClick={__v?.setEnClose}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        border: '0',
                        background: 'transparent',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        minHeight: '40px',
                        cursor: 'pointer',
                        color: '#101827',
                        fontWeight: '600',
                      }}
                    >
                      {'English'}
                      <span style={{ color: '#4661ad' }}>{`${__t(__v?.enMark)}`}</span>
                    </button>{' '}
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={__v?.amPressed}
                      className="mi"
                      onClick={__v?.setAmClose}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        border: '0',
                        background: 'transparent',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        minHeight: '40px',
                        cursor: 'pointer',
                        color: '#101827',
                        fontWeight: '600',
                      }}
                    >
                      {'አማርኛ'}
                      <span style={{ color: '#4661ad' }}>{`${__t(__v?.amMark)}`}</span>
                    </button>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.showAddWallet) ? (
                <>
                  <button
                    type="button"
                    role="menuitem"
                    className="mi"
                    onClick={__v?.moveToWallet}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      border: '0',
                      background: 'transparent',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      minHeight: '44px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#101827',
                      fontWeight: '600',
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#101827"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 7h18v12H3zM3 11h18M16 15h2" />
                    </svg>
                    {`${__t(__v?.t?.moveWallet)}`}
                  </button>
                </>
              ) : null}{' '}
              <button
                type="button"
                role="menuitem"
                className="mi"
                onClick={__v?.share}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#101827',
                  fontWeight: '600',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" />
                </svg>
                {`${__t(__v?.t?.share)}`}
              </button>{' '}
              <div style={{ height: '1px', background: '#e3e5ec', margin: '4px 6px' }} />{' '}
              <button
                type="button"
                role="menuitem"
                className="mi"
                onClick={__v?.askRemove}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '0',
                  background: 'transparent',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#c81d29',
                  fontWeight: '700',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c81d29"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                </svg>
                {`${__t(__v?.t?.remove)}`}
              </button>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.sheetDetails) ? (
          <>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background: 'rgba(16,24,39,0.45)',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <div
                role="dialog"
                aria-label={__v?.t?.details}
                style={{
                  background: '#ffffff',
                  width: '100%',
                  borderRadius: '20px 20px 0 0',
                  padding: '20px 20px 28px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Buna House'}</span>
                  <button
                    type="button"
                    onClick={__v?.closeSheet}
                    style={{
                      border: '0',
                      background: 'transparent',
                      color: '#4661ad',
                      fontWeight: '700',
                      padding: '0 4px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >{`${__t(__v?.t?.done)}`}</button>
                </div>{' '}
                <dl
                  style={{
                    margin: '0',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '10px 16px',
                    fontSize: '15px',
                  }}
                >
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dReward)}`}</dt>
                  <dd style={{ margin: '0', fontWeight: '700' }}>{`${__t(__v?.t?.dRewardV)}`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dMember)}`}</dt>
                  <dd style={{ margin: '0' }}>{`${__t(__v?.firstName)} · 0412`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dAddress)}`}</dt>
                  <dd style={{ margin: '0' }}>{'[Street, Bole, Addis Ababa]'}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dOpen)}`}</dt>
                  <dd style={{ margin: '0' }}>{'Mon–Sat 7:00–21:00'}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{`${__t(__v?.t?.dTerms)}`}</dt>
                  <dd style={{ margin: '0', color: '#5b6475' }}>{`${__t(__v?.t?.dTermsV)}`}</dd>
                </dl>{' '}
                <button
                  type="button"
                  onClick={__v?.openInsta}
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#4661ad',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '12px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.follow)} · @bunahouse`}</button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.sheetRemove) ? (
          <>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background: 'rgba(16,24,39,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                boxSizing: 'border-box',
              }}
            >
              <div
                role="alertdialog"
                aria-label={__v?.t?.removeQ}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  width: '100%',
                }}
              >
                <span
                  style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}
                >{`${__t(__v?.t?.removeQ)}`}</span>{' '}
                <span style={{ color: '#5b6475' }}>{`${__t(__v?.removeBody)}`}</span>{' '}
                <button
                  type="button"
                  onClick={__v?.confirmRemove}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '12px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.removeYes)}`}</button>{' '}
                <button
                  type="button"
                  onClick={__v?.closeSheet}
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#101827',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '12px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >{`${__t(__v?.t?.keep)}`}</button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.hasToast) ? (
          <>
            <div
              role="status"
              style={{
                position: 'absolute',
                left: '16px',
                right: '16px',
                bottom: '24px',
                background: '#101827',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '600',
              }}
            >
              <span
                style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#fba919', flex: 'none' }}
              />
              {`${__t(__v?.toast)}`}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default withDCStyle(CustomerFlowView, 'CustomerFlow', __CSS);
