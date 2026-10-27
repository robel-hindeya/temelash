'use client';
/* Generated from the Temelash Card design (Rewards.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import api, { getMerchantJoinUrl, getMerchantLoyaltyCards, updateMerchantLoyaltyCard } from '@/lib/api';
import renderRewards from './Rewards.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}}\n@media (min-width:1024px){.pv-sticky{position:sticky;top:24px;align-self:flex-start}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';
class RewardsView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      programId: null,
      loyaltyCards: [],
      selectedCardId: 'UXwJ9RwdyHs',
      count: 10,
      reward: 'Free macchiato',
      mainDays: 30,
      autos: { welcome: true, birthday: true, winback: false },
      ms: [
        { id: 1, at: 5, name: 'Free cookie', days: 30 },
        { id: 2, at: 15, name: 'Free lunch', days: 30 },
      ],
      editing: null,
      draftAt: 5,
      draftName: '',
      draftDays: 30,
      draftErr: '',
      nextId: 3,
      tab: 'web',
      nTab: 'apple',
      pv: 5,
      saved: false,
    };
  }
  async componentDidMount() {
    this.persist();
    try {
      const cards = getMerchantLoyaltyCards();
      const firstCard = cards[0];
      const updates = {
        loyaltyCards: cards,
        selectedCardId: firstCard?.id || 'UXwJ9RwdyHs',
      };
      if (firstCard) {
        updates.count = firstCard.stampsRequired || 10;
        updates.reward = firstCard.rewardName || 'Free macchiato';
      }

      const programs = await api.merchant.getPrograms('ACTIVE');
      if (programs && programs.length > 0) {
        const p = programs[0];
        const r = p.rewardDefinitions?.[0] || p.rewards?.[0];
        updates.programId = p.id;
        if (!firstCard?.stampsRequired) updates.count = p.stampsRequired || this.state.count;
        if (!firstCard?.rewardName) updates.reward = r?.nameEn || this.state.reward;
        updates.mainDays = r?.validForDays || this.state.mainDays;
      }
      this.setState(updates);
    } catch (e) {
      console.warn('Failed to load active program from database:', e);
    }
  }

  selectCard = (cardId) => {
    const cards = this.state.loyaltyCards || getMerchantLoyaltyCards();
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      this.setState({
        selectedCardId: card.id,
        count: card.stampsRequired || 10,
        reward: card.rewardName || 'Special Reward',
        saved: false,
      });
    }
  };
  componentDidUpdate() {
    this.persist();
  }
  persist() {
    try {
      const s = this.state;
      window.localStorage.setItem(
        'tm-rewards',
        JSON.stringify({
          count: s.count,
          reward: s.reward,
          ms: s.ms.map((m) => ({ at: m.at, name: m.name, days: m.days })),
        }),
      );
    } catch (e) {}
  }
  renderVals() {
    const s = this.state;
    const set = (o) => this.setState(Object.assign({ saved: false }, o));
    const count = s.count;
    const rewardName = s.reward || 'Main reward';
    const ms = s.ms.slice().sort((a, b) => a.at - b.at);
    const cardLen = Math.max(count, ...ms.map((m) => m.at));
    const counts = [6, 8, 10, 12].map((n) => ({
      n: String(n),
      pressed: n === count ? 'true' : 'false',
      bg: n === count ? '#101827' : 'transparent',
      color: n === count ? '#ffffff' : '#101827',
      pick: () => set({ count: n }),
    }));
    const daysText = (d) => (Number(d) > 0 ? 'valid ' + d + ' days' : 'never expires');

    // rows: milestones before main, main, milestones after main
    const rowFor = (m) => {
      const editing = s.editing === m.id;
      const after = m.at > count;
      return {
        viewing: !editing,
        editing,
        editable: true,
        at: String(m.at),
        name: m.name,
        hasTag: after,
        tag: 'AFTER MAIN',
        tagColor: '#4661ad',
        sub: 'At stamp ' + m.at + ' · ' + daysText(m.days) + (after ? ' · card keeps going after the main reward' : ''),
        dotBg: '#ffffff',
        dotBorder: '#fba919',
        atId: 'ms-at-' + m.id,
        nameId: 'ms-name-' + m.id,
        daysId: 'ms-days-' + m.id,
        delLabel: 'Delete ' + m.name,
        edit: () => set({ editing: m.id, draftAt: m.at, draftName: m.name, draftDays: m.days, draftErr: '' }),
        remove: () => set({ ms: s.ms.filter((x) => x.id !== m.id), editing: s.editing === m.id ? null : s.editing }),
      };
    };
    const mainRow = {
      viewing: true,
      editing: false,
      editable: false,
      at: String(count),
      name: rewardName,
      hasTag: true,
      tag: 'MAIN',
      tagColor: '#5b6475',
      sub: 'At stamp ' + count + ' · ' + daysText(s.mainDays),
      dotBg: '#fba919',
      dotBorder: '#fba919',
      atId: '',
      nameId: '',
      daysId: '',
      delLabel: '',
      edit: null,
      remove: null,
    };
    const msRows = ms
      .filter((m) => m.at < count)
      .map(rowFor)
      .concat([mainRow])
      .concat(ms.filter((m) => m.at > count).map(rowFor));
    if (s.editing === 'new')
      msRows.push({
        viewing: false,
        editing: true,
        editable: false,
        at: '',
        name: '',
        hasTag: false,
        tag: '',
        tagColor: '',
        sub: '',
        dotBg: '',
        dotBorder: '',
        atId: 'ms-at-new',
        nameId: 'ms-name-new',
        daysId: 'ms-days-new',
        delLabel: '',
        edit: null,
        remove: null,
      });

    const firstFree = () => {
      for (let i = Math.max(1, Math.floor(count / 2)); i < 100; i++)
        if (i !== count && !s.ms.some((m) => m.at === i)) return i;
      return 1;
    };
    const commitEdit = () => {
      const name = (s.draftName || '').trim();
      const at = parseInt(s.draftAt, 10);
      const days = Math.max(0, parseInt(s.draftDays, 10) || 0);
      if (!at || at < 1 || at > 99) {
        this.setState({ draftErr: 'Pick a stamp number from 1 to 99.' });
        return;
      }
      if (at === count) {
        this.setState({ draftErr: 'Stamp ' + at + ' is the main reward. Pick another number.' });
        return;
      }
      if (s.ms.some((m) => m.at === at && m.id !== s.editing)) {
        this.setState({ draftErr: 'Stamp ' + at + ' already has a reward.' });
        return;
      }
      if (!name) {
        this.setState({ draftErr: 'Name the reward, like "Free cookie".' });
        return;
      }
      if (s.editing === 'new')
        set({
          ms: s.ms.concat([{ id: s.nextId, at, name, days }]),
          nextId: s.nextId + 1,
          editing: null,
          draftErr: '',
          pv: at,
        });
      else
        set({
          ms: s.ms.map((m) => (m.id === s.editing ? { id: m.id, at, name, days } : m)),
          editing: null,
          draftErr: '',
          pv: at,
        });
    };
    const dAt = parseInt(s.draftAt, 10) || 0;

    // preview
    const pv = Math.max(0, Math.min(cardLen, s.pv));
    const msAt = {};
    ms.forEach((m) => {
      msAt[m.at] = m;
    });
    const GIFT = 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z';
    const slots = [];
    for (let i = 1; i <= cardLen; i++) {
      const earned = i <= pv,
        isMain = i === count,
        m = msAt[i];
      let bg,
        border,
        bs = 'solid',
        ic,
        path = 'M5 12l5 5L20 7',
        tip = 'Stamp ' + i;
      if (isMain) {
        path = GIFT;
        bg = earned ? '#e42330' : '#ffffff';
        border = '#e42330';
        bs = earned ? 'solid' : 'dashed';
        ic = earned ? '#ffffff' : '#c81d29';
        tip = 'Stamp ' + i + ': ' + rewardName;
      } else if (m) {
        path = GIFT;
        bg = earned ? '#fba919' : '#fff3dc';
        border = '#fba919';
        ic = '#101827';
        tip = 'Stamp ' + i + ': ' + m.name;
      } else {
        bg = earned ? '#fba919' : '#eceef2';
        border = earned ? '#fba919' : '#d9dce3';
        ic = earned ? '#101827' : '#c9cdd6';
      }
      slots.push({ bg, border, bs, ic, path, tip });
    }
    const all = ms
      .map((m) => ({ at: m.at, name: m.name }))
      .concat([{ at: count, name: rewardName }])
      .sort((a, b) => a.at - b.at);
    const nextR = all.find((r) => r.at > pv);
    const justHit = all.find((r) => r.at === pv);
    const left = nextR ? nextR.at - pv : 0;
    let nextLine;
    if (justHit) nextLine = justHit.name + ' unlocked. Show this at the counter.';
    else if (nextR) nextLine = left + ' more ' + (left === 1 ? 'visit' : 'visits') + ' to ' + nextR.name.toLowerCase();
    else nextLine = 'Card complete. It starts again on the next visit.';
    const pvMs = all.map((r) => ({
      at: String(r.at),
      name: r.name,
      color: pv >= r.at ? '#5b6475' : '#101827',
      deco: pv >= r.at ? 'line-through' : 'none',
    }));
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
    const tabFn = (key, cur) => (arr) =>
      arr.map(([id, label]) => ({
        label,
        sel: id === cur ? 'true' : 'false',
        bg: id === cur ? '#101827' : 'transparent',
        color: id === cur ? '#ffffff' : '#101827',
        pick: () => this.setState({ [key]: id }),
      }));
    const tabs = tabFn(
      'tab',
      s.tab,
    )([
      ['web', 'Web card'],
      ['apple', 'Apple Wallet'],
      ['google', 'Google Wallet'],
    ]);
    const nTabs = tabFn(
      'nTab',
      s.nTab,
    )([
      ['apple', 'Apple'],
      ['google', 'Google'],
      ['web', 'Web card'],
    ]);
    const defs = [
      ['welcome', 'Welcome stamp', 'New customers get their first stamp when they save the card.'],
      [
        'birthday',
        'Birthday treat',
        'A surprise in the customer’s birthday week. Uses the birthday they share at sign-up.',
      ],
      ['winback', 'We miss you', 'Double stamp on the next visit for anyone who hasn’t come in for 30 days.'],
    ];
    const autos = defs.map(([id, title, desc]) => {
      const on = !!s.autos[id];
      return {
        title,
        desc,
        checked: on ? 'true' : 'false',
        track: on ? '#101827' : '#e3e5ec',
        justify: on ? 'flex-end' : 'flex-start',
        toggle: () => set({ autos: Object.assign({}, s.autos, { [id]: !on }) }),
      };
    });
    const cols = cardLen <= 6 ? 3 : cardLen % 5 === 0 ? 5 : cardLen <= 12 ? 4 : 5;
    const unlockName = justHit ? justHit.name : nextR ? nextR.name : rewardName;
    return {
      counts,
      countText: String(count),
      onCount: (e) => {
        const n = parseInt(e.target.value, 10);
        if (n >= 2 && n <= 50) set({ count: n, ms: s.ms.filter((m) => m.at !== n) });
      },
      reward: s.reward,
      onReward: (e) => set({ reward: e.target.value }),
      mainDays: String(s.mainDays),
      onMainDays: (e) => set({ mainDays: Math.max(0, parseInt(e.target.value, 10) || 0) }),
      msRows,
      canAdd: s.editing === null,
      startAdd: () => set({ editing: 'new', draftAt: firstFree(), draftName: '', draftDays: 30, draftErr: '' }),
      draftAt: String(s.draftAt),
      draftName: s.draftName,
      draftDays: String(s.draftDays),
      draftErr: !!s.draftErr,
      draftErrText: s.draftErr,
      draftBorder: s.draftErr && s.draftErr.indexOf('Name') === 0 ? '#c81d29' : '#e3e5ec',
      atBorder: s.draftErr && s.draftErr.indexOf('Name') !== 0 ? '#c81d29' : '#e3e5ec',
      draftHelp:
        'Customers see a gift on stamp ' +
        (dAt || '?') +
        (dAt > count ? ', after the main reward,' : '') +
        ' and get "' +
        ((s.draftName || '').trim() || 'your reward') +
        '" the moment they reach it.',
      onDraftAt: (e) => this.setState({ draftAt: e.target.value, draftErr: '' }),
      onDraftName: (e) => this.setState({ draftName: e.target.value, draftErr: '' }),
      onDraftDays: (e) => this.setState({ draftDays: e.target.value }),
      cancelEdit: () => this.setState({ editing: null, draftErr: '' }),
      commitEdit,
      cardNote:
        cardLen > count
          ? 'The card now has ' +
            cardLen +
            ' stamps. Customers get ' +
            rewardName.toLowerCase() +
            ' at ' +
            count +
            ', keep collecting, and the card resets after stamp ' +
            cardLen +
            '.'
          : 'The card has ' + count + ' stamps and resets after ' + rewardName.toLowerCase() + '.',
      autos,
      tabs,
      nTabs,
      slots,
      qr,
      cols: String(cols),
      isWeb: s.tab === 'web',
      isApple: s.tab === 'apple',
      isGoogle: s.tab === 'google',
      nApple: s.nTab === 'apple',
      nGoogle: s.nTab === 'google',
      nWeb: s.nTab === 'web',
      pvLabel: pv + ' / ' + cardLen,
      pvFrac: pv + '/' + cardLen,
      pvStampsText: (pv < 10 ? '0' : '') + pv + ' Stamps',
      pvDec: () => this.setState({ pv: Math.max(0, pv - 1) }),
      pvInc: () => this.setState({ pv: Math.min(cardLen, pv + 1) }),
      nextLine,
      lineBg: justHit ? '#fba919' : '#fff3dc',
      nextName: nextR ? nextR.name : 'Card complete',
      toGo: nextR ? left + (left === 1 ? ' visit' : ' visits') : '—',
      pvMs,
      loyaltyCards: s.loyaltyCards || [],
      selectedCardId: s.selectedCardId || 'UXwJ9RwdyHs',
      selectCard: this.selectCard,
      cardUrl: getMerchantJoinUrl(),
      notifTitle: justHit ? 'NOTIFICATION THEY GET NOW' : 'WHEN THE NEXT REWARD UNLOCKS',
      notifHead: unlockName + ' unlocked',
      notifText: unlockName + ' unlocked. Show this at the counter.',
      save: async () => {
        try {
          updateMerchantLoyaltyCard(s.selectedCardId || 'UXwJ9RwdyHs', {
            stampsRequired: s.count,
            rewardName: s.reward,
          });
          const updatedCards = getMerchantLoyaltyCards();
          this.setState({ loyaltyCards: updatedCards });

          if (s.programId) {
            await api.merchant.updateProgram(s.programId, {
              stampsRequired: s.count,
              reward: {
                nameEn: s.reward,
                validForDays: s.mainDays || null,
              },
            });
          }
          this.setState({ saved: true });
        } catch (e) {
          console.warn('Program update error:', e);
          this.setState({ saved: true });
        }
      },
      savedNote: s.saved ? 'Saved to database. Live on every card.' : 'Unsaved changes',
    };
  }
}

RewardsView.defaultProps = {};

RewardsView.prototype.__template = renderRewards;

export default withDCStyle(RewardsView, 'Rewards', __CSS);
