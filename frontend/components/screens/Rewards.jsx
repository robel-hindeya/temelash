'use client';
/* Generated from the Temelash Card design (Rewards.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';
import QRCodeDisplay from '../QRCodeDisplay';
import api, {
  getAppOrigin,
  getOrAssignMerchantCode,
  getMerchantLoyaltyCards,
  getMerchantLoyaltyCard,
  updateMerchantLoyaltyCard,
} from '@/lib/api';

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
      cardUrl: `${getAppOrigin()}/card?c=${s.selectedCardId || 'UXwJ9RwdyHs'}&m=${getOrAssignMerchantCode()}`,
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
RewardsView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1500px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <Sidebar active="rewards" />
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
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                {'Stamps and rewards'}
              </h1>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>
                {'Set what a visit earns and what customers come back for.'}
              </p>
            </div>{' '}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.savedNote)}`}</span>{' '}
              <button
                type="button"
                onClick={__v?.save}
                style={{
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  minHeight: '44px',
                  cursor: 'pointer',
                }}
              >
                {'Save changes'}
              </button>
            </div>
          </div>{' '}
          {/* Card Selector Strip */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e3e5ec',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '15px', color: '#101827' }}>
                  Select Loyalty Card to Configure ({(__v?.loyaltyCards || []).length})
                </strong>
                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }}>
                  Each card program has its own stamps & reward definition
                </span>
              </div>
              <A
                href="/business/card-design"
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#4661ad',
                  textDecoration: 'none',
                }}
              >
                + Manage / Add Cards ↗
              </A>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {(__v?.loyaltyCards || []).map((card) => {
                const isSelected = card.id === __v?.selectedCardId;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => __v?.selectCard && __v.selectCard(card.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid #101827' : '1px solid #e2e8f0',
                      background: isSelected ? '#101827' : '#f8fafc',
                      color: isSelected ? '#ffffff' : '#101827',
                      cursor: 'pointer',
                      fontWeight: isSelected ? '700' : '600',
                      fontSize: '13px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: card.accent || '#4661ad',
                        display: 'inline-block',
                      }}
                    />
                    <span>{card.name}</span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: isSelected ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                        color: isSelected ? '#ffffff' : '#475569',
                      }}
                    >
                      ID: {card.id}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ flex: '3 1 460px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Main reward'}
                </h2>{' '}
                <fieldset style={{ border: '0', padding: '0', margin: '0' }}>
                  <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>
                    {'Stamps to the main reward'}
                  </legend>{' '}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        padding: '4px',
                        gap: '4px',
                      }}
                    >
                      {(__v?.counts || []).map((c, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            aria-pressed={c?.pressed}
                            onClick={c?.pick}
                            style={{
                              border: '0',
                              borderRadius: '8px',
                              padding: '10px 18px',
                              minHeight: '44px',
                              cursor: 'pointer',
                              fontWeight: '800',
                              fontVariantNumeric: 'tabular-nums',
                              background: `${__t(c?.bg)}`,
                              color: `${__t(c?.color)}`,
                            }}
                          >{`${__t(c?.n)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    <label htmlFor="rw-count" style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'or any number'}
                    </label>{' '}
                    <input
                      id="rw-count"
                      type="number"
                      min="2"
                      max="50"
                      value={__v?.countText}
                      onChange={__v?.onCount}
                      style={{
                        width: '80px',
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        minHeight: '44px',
                        boxSizing: 'border-box',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    />
                  </div>
                </fieldset>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="rw-main" style={{ fontWeight: '700' }}>
                    {'Main reward'}
                  </label>{' '}
                  <input
                    id="rw-main"
                    type="text"
                    value={__v?.reward}
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
                      boxSizing: 'border-box',
                      color: '#101827',
                    }}
                    onChange={__v?.onReward}
                  />
                </div>{' '}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="rw-per" style={{ fontWeight: '700' }}>
                      {'Stamps per visit'}
                    </label>
                    <select
                      id="rw-per"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        background: '#ffffff',
                        color: '#101827',
                      }}
                    >
                      <option>{'1 per visit'}</option>
                      <option>{'1 per [ETB] spent'}</option>
                    </select>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="rw-day" style={{ fontWeight: '700' }}>
                      {'Limit per day'}
                    </label>
                    <select
                      id="rw-day"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        background: '#ffffff',
                        color: '#101827',
                      }}
                    >
                      <option>{'1 stamp a day'}</option>
                      <option>{'2 stamps a day'}</option>
                      <option>{'No limit'}</option>
                    </select>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="rw-exp" style={{ fontWeight: '700' }}>
                      {'Reward valid for'}
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        id="rw-exp"
                        type="number"
                        min="0"
                        max="999"
                        value={__v?.mainDays}
                        style={{
                          width: '100px',
                          border: '1px solid #e3e5ec',
                          borderRadius: '6px',
                          padding: '12px 14px',
                          minHeight: '48px',
                          boxSizing: 'border-box',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                        onChange={__v?.onMainDays}
                      />
                      <span>{'days'}</span>
                    </div>
                    <span style={{ fontSize: '13px', color: '#5b6475' }}>{'0 means it never expires'}</span>
                  </div>
                </div>{' '}
                <p
                  style={{
                    margin: '0',
                    fontSize: '14px',
                    color: '#5b6475',
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '12px 14px',
                  }}
                >
                  {'Customers keep every stamp they have already earned when you change these.'}
                </p>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                      {'Milestone rewards'}
                    </h2>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>
                      {'Add rewards before the main one, or after it to keep regulars going. As many as you like.'}
                    </span>
                  </div>{' '}
                  {__b(__v?.canAdd) ? (
                    <>
                      <button
                        type="button"
                        onClick={__v?.startAdd}
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#4661ad',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '8px 14px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'+ Add a milestone'}
                      </button>
                    </>
                  ) : null}
                </div>{' '}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {(__v?.msRows || []).map((m, __i0) => (
                    <React.Fragment key={__i0}>
                      <div style={{ borderTop: '1px solid #e3e5ec', padding: '12px 0' }}>
                        {__b(m?.viewing) ? (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <span
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '999px',
                                  boxSizing: 'border-box',
                                  fontWeight: '800',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontVariantNumeric: 'tabular-nums',
                                  flex: 'none',
                                  background: `${__t(m?.dotBg)}`,
                                  border: `2px solid ${__t(m?.dotBorder)}`,
                                  color: '#101827',
                                }}
                              >{`${__t(m?.at)}`}</span>{' '}
                              <span
                                style={{ flex: '1 1 auto', minWidth: '0', display: 'flex', flexDirection: 'column' }}
                              >
                                <span style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                  <strong>{`${__t(m?.name)}`}</strong>
                                  {__b(m?.hasTag) ? (
                                    <>
                                      <span
                                        style={{
                                          fontSize: '12px',
                                          lineHeight: '16px',
                                          fontWeight: '700',
                                          letterSpacing: '0.08em',
                                          color: `${__t(m?.tagColor)}`,
                                          border: `1px solid ${__t(m?.tagColor)}`,
                                          borderRadius: '999px',
                                          padding: '0 8px',
                                        }}
                                      >{`${__t(m?.tag)}`}</span>
                                    </>
                                  ) : null}
                                </span>
                                <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(m?.sub)}`}</span>
                              </span>{' '}
                              {__b(m?.editable) ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={m?.edit}
                                    style={{
                                      border: '1px solid #e3e5ec',
                                      background: '#ffffff',
                                      color: '#4661ad',
                                      fontWeight: '700',
                                      borderRadius: '10px',
                                      padding: '6px 12px',
                                      minHeight: '40px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {'Edit'}
                                  </button>{' '}
                                  <button
                                    type="button"
                                    onClick={m?.remove}
                                    aria-label={m?.delLabel}
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      border: '1px solid #e3e5ec',
                                      borderRadius: '10px',
                                      background: '#ffffff',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
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
                                  </button>
                                </>
                              ) : null}
                            </div>
                          </>
                        ) : null}{' '}
                        {__b(m?.editing) ? (
                          <>
                            <div
                              style={{
                                background: '#f7f7f9',
                                borderRadius: '12px',
                                padding: '14px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                              }}
                            >
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                <div
                                  style={{ flex: '0 0 110px', display: 'flex', flexDirection: 'column', gap: '6px' }}
                                >
                                  <label htmlFor={m?.atId} style={{ fontWeight: '700', fontSize: '14px' }}>
                                    {'At stamp'}
                                  </label>{' '}
                                  <input
                                    id={m?.atId}
                                    type="number"
                                    min="1"
                                    max="99"
                                    value={__v?.draftAt}
                                    style={{
                                      border: `1px solid ${__t(__v?.atBorder)}`,
                                      borderRadius: '6px',
                                      padding: '10px 12px',
                                      minHeight: '44px',
                                      boxSizing: 'border-box',
                                      background: '#ffffff',
                                      color: '#101827',
                                      fontVariantNumeric: 'tabular-nums',
                                    }}
                                    onChange={__v?.onDraftAt}
                                  />
                                </div>{' '}
                                <div
                                  style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}
                                >
                                  <label htmlFor={m?.nameId} style={{ fontWeight: '700', fontSize: '14px' }}>
                                    {'Reward'}
                                  </label>{' '}
                                  <input
                                    id={m?.nameId}
                                    type="text"
                                    value={__v?.draftName}
                                    placeholder="e.g. Free cookie"
                                    style={{
                                      border: `1px solid ${__t(__v?.draftBorder)}`,
                                      borderRadius: '6px',
                                      padding: '10px 12px',
                                      minHeight: '44px',
                                      boxSizing: 'border-box',
                                      background: '#ffffff',
                                      color: '#101827',
                                    }}
                                    onChange={__v?.onDraftName}
                                  />
                                </div>{' '}
                                <div
                                  style={{ flex: '0 0 150px', display: 'flex', flexDirection: 'column', gap: '6px' }}
                                >
                                  <label htmlFor={m?.daysId} style={{ fontWeight: '700', fontSize: '14px' }}>
                                    {'Valid for (days)'}
                                  </label>{' '}
                                  <input
                                    id={m?.daysId}
                                    type="number"
                                    min="0"
                                    max="999"
                                    value={__v?.draftDays}
                                    style={{
                                      border: '1px solid #e3e5ec',
                                      borderRadius: '6px',
                                      padding: '10px 12px',
                                      minHeight: '44px',
                                      boxSizing: 'border-box',
                                      background: '#ffffff',
                                      color: '#101827',
                                      fontVariantNumeric: 'tabular-nums',
                                    }}
                                    onChange={__v?.onDraftDays}
                                  />
                                </div>
                              </div>{' '}
                              {__b(__v?.draftErr) ? (
                                <>
                                  <span
                                    style={{ fontSize: '14px', color: '#c81d29' }}
                                  >{`${__t(__v?.draftErrText)}`}</span>
                                </>
                              ) : null}{' '}
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                                <span
                                  style={{ fontSize: '13px', color: '#5b6475', flex: '1 1 200px' }}
                                >{`${__t(__v?.draftHelp)}`}</span>{' '}
                                <button
                                  type="button"
                                  onClick={__v?.cancelEdit}
                                  style={{
                                    border: '1px solid #e3e5ec',
                                    background: '#ffffff',
                                    color: '#101827',
                                    fontWeight: '700',
                                    borderRadius: '10px',
                                    padding: '8px 14px',
                                    minHeight: '40px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {'Cancel'}
                                </button>{' '}
                                <button
                                  type="button"
                                  onClick={__v?.commitEdit}
                                  style={{
                                    border: '0',
                                    background: '#4661ad',
                                    color: '#ffffff',
                                    fontWeight: '700',
                                    borderRadius: '10px',
                                    padding: '8px 14px',
                                    minHeight: '40px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {'Save milestone'}
                                </button>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <span
                  style={{
                    fontSize: '14px',
                    color: '#5b6475',
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '12px 14px',
                  }}
                >{`${__t(__v?.cardNote)}`}</span>
              </section>{' '}
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '8px' }}>
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {'Automatic rewards'}
                  </h2>
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>
                    {'These send themselves. You only set them once.'}
                  </span>
                </div>{' '}
                {(__v?.autos || []).map((a, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '14px 0',
                        borderTop: '1px solid #e3e5ec',
                      }}
                    >
                      <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                        <strong>{`${__t(a?.title)}`}</strong>
                        <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(a?.desc)}`}</span>
                      </span>{' '}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={a?.checked}
                        aria-label={a?.title}
                        onClick={a?.toggle}
                        style={{
                          width: '52px',
                          height: '32px',
                          borderRadius: '999px',
                          border: '0',
                          padding: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: `${__t(a?.justify)}`,
                          background: `${__t(a?.track)}`,
                          flex: 'none',
                        }}
                      >
                        <span
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '999px',
                            background: '#ffffff',
                            display: 'block',
                          }}
                        />
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </div>{' '}
            <aside
              aria-label="Card preview"
              className="pv-sticky"
              style={{
                flex: '2 1 340px',
                minWidth: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  alignSelf: 'flex-start',
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'PREVIEW'}
              </span>{' '}
              <div
                role="tablist"
                aria-label="Preview as"
                style={{
                  alignSelf: 'stretch',
                  display: 'flex',
                  border: '1px solid #e3e5ec',
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '4px',
                  gap: '4px',
                }}
              >
                {(__v?.tabs || []).map((t, __i0) => (
                  <React.Fragment key={__i0}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={t?.sel}
                      onClick={t?.pick}
                      style={{
                        flex: '1 1 0',
                        border: '0',
                        borderRadius: '8px',
                        padding: '8px 6px',
                        minHeight: '40px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px',
                        background: `${__t(t?.bg)}`,
                        color: `${__t(t?.color)}`,
                      }}
                    >{`${__t(t?.label)}`}</button>
                  </React.Fragment>
                ))}
              </div>{' '}
              <div
                style={{
                  alignSelf: 'stretch',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{'Preview a customer with'}</span>{' '}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #e3e5ec',
                    borderRadius: '10px',
                  }}
                >
                  <button
                    type="button"
                    aria-label="One less stamp"
                    onClick={__v?.pvDec}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '0',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: '#101827',
                    }}
                  >
                    {'−'}
                  </button>{' '}
                  <span
                    style={{
                      minWidth: '64px',
                      textAlign: 'center',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(__v?.pvLabel)}`}</span>{' '}
                  <button
                    type="button"
                    aria-label="One more stamp"
                    onClick={__v?.pvInc}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '0',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: '#101827',
                    }}
                  >
                    {'+'}
                  </button>
                </span>
              </div>{' '}
              {__b(__v?.isWeb) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '330px',
                      background: '#f4f5f7',
                      border: '1px solid #e3e5ec',
                      borderRadius: '52px',
                      padding: '12px',
                      boxSizing: 'border-box',
                      boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                    }}
                  >
                    <div
                      style={{
                        background: '#e9ebf0',
                        borderRadius: '42px',
                        minHeight: '600px',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '150px',
                          height: '28px',
                          background: '#f4f5f7',
                          borderRadius: '0 0 18px 18px',
                        }}
                      />{' '}
                      <div
                        style={{
                          padding: '14px 22px 0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                          lineHeight: '15px',
                          fontWeight: '700',
                        }}
                      >
                        <span>{'4:16'}</span>
                        <span style={{ fontSize: '12px' }}>{'●●● ▮'}</span>
                      </div>{' '}
                      <div
                        style={{
                          padding: '14px 18px 12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontWeight: '700' }}>{'Done'}</span>
                        <span
                          aria-hidden="true"
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '999px',
                            background: '#101827',
                            color: '#ffffff',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            letterSpacing: '1px',
                          }}
                        >
                          {'•••'}
                        </span>
                      </div>{' '}
                      <div
                        style={{
                          margin: '0 12px',
                          background: '#ffffff',
                          borderRadius: '8px',
                          boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                          padding: '18px 16px 20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '999px',
                                background: '#8a4b2a',
                                color: '#ffffff',
                                fontWeight: '800',
                                fontSize: '14px',
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
                                fontSize: '10px',
                                lineHeight: '10px',
                                fontWeight: '800',
                                letterSpacing: '0.03em',
                              }}
                            >
                              {'BUNA'}
                              <span>{'HOUSE'}</span>
                            </span>
                          </span>
                          <span
                            style={{ fontSize: '13px', fontWeight: '600', fontVariantNumeric: 'tabular-nums' }}
                          >{`${__t(__v?.pvStampsText)}`}</span>
                        </div>{' '}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${__t(__v?.cols)}, minmax(0, 1fr))`,
                            gap: '8px',
                            padding: '0 4px',
                          }}
                        >
                          {(__v?.slots || []).map((s, __i0) => (
                            <React.Fragment key={__i0}>
                              <span
                                title={s?.tip}
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
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke={s?.ic}
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
                            <span style={{ fontSize: '11px', color: '#5b6475' }}>{'Expiry Date'}</span>
                            <span style={{ fontSize: '13px', fontWeight: '700' }}>{'30 Nov 2026'}</span>
                          </span>
                          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <span style={{ fontSize: '11px', color: '#5b6475' }}>{'Last Update'}</span>
                            <span style={{ fontSize: '13px', fontWeight: '700' }}>{'10:42 21/10'}</span>
                          </span>
                        </div>{' '}
                        <span
                          style={{
                            background: `${__t(__v?.lineBg)}`,
                            borderRadius: '8px',
                            padding: '8px 10px',
                            fontSize: '13px',
                            lineHeight: '18px',
                            fontWeight: '600',
                          }}
                        >{`${__t(__v?.nextLine)}`}</span>{' '}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {(__v?.pvMs || []).map((p, __i0) => (
                            <React.Fragment key={__i0}>
                              <span
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  gap: '8px',
                                  fontSize: '12px',
                                  color: `${__t(p?.color)}`,
                                  textDecoration: `${__t(p?.deco)}`,
                                }}
                              >
                                <span>{`${__t(p?.at)} stamps`}</span>
                                <span style={{ fontWeight: '700', textAlign: 'right' }}>{`${__t(p?.name)}`}</span>
                              </span>
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        <div
                          role="img"
                          aria-label="Member QR code placeholder"
                          style={{
                            alignSelf: 'center',
                            width: '84px',
                            height: '84px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                            gap: '1px',
                          }}
                        >
                          <QRCodeDisplay value={__v?.cardUrl || "http://localhost:3001/card"} size={84} /></div>
                      </div>{' '}
                      <div style={{ flex: '1 1 auto' }} />{' '}
                      <span
                        aria-hidden="true"
                        style={{
                          alignSelf: 'center',
                          width: '120px',
                          height: '5px',
                          borderRadius: '999px',
                          background: '#101827',
                          margin: '16px 0 10px',
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.isApple) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      background: '#101827',
                      borderRadius: '40px',
                      padding: '40px 14px 28px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      minHeight: '560px',
                    }}
                  >
                    <span style={{ alignSelf: 'center', fontSize: '13px', color: '#9aa3b5', fontWeight: '600' }}>
                      {'iPhone · Apple Wallet'}
                    </span>{' '}
                    <div style={{ background: '#ffffff', borderRadius: '16px', overflow: 'hidden' }}>
                      <div style={{ height: '8px', background: '#8a4b2a' }} />{' '}
                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong>{'Buna House'}</strong>
                          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <span
                              style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', color: '#5b6475' }}
                            >
                              {'STAMPS'}
                            </span>
                            <span
                              style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
                            >{`${__t(__v?.pvFrac)}`}</span>
                          </span>
                        </div>{' '}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${__t(__v?.cols)}, minmax(0, 1fr))`,
                            gap: '6px',
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
                                  border: `2px ${__t(s?.bs)} ${__t(s?.border)}`,
                                }}
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke={s?.ic}
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
                            <span
                              style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', color: '#5b6475' }}
                            >
                              {'NEXT REWARD'}
                            </span>
                            <span style={{ fontWeight: '700', fontSize: '14px' }}>{`${__t(__v?.nextName)}`}</span>
                          </span>
                          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <span
                              style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', color: '#5b6475' }}
                            >
                              {'TO GO'}
                            </span>
                            <span
                              style={{ fontWeight: '700', fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}
                            >{`${__t(__v?.toGo)}`}</span>
                          </span>
                        </div>{' '}
                        <div
                          style={{
                            alignSelf: 'center',
                            width: '120px',
                            height: '120px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                            gap: '1px',
                          }}
                        >
                          <QRCodeDisplay value={__v?.cardUrl || "http://localhost:3001/card"} size={84} /></div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.isGoogle) ? (
                <>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      background: '#1b2436',
                      borderRadius: '32px',
                      padding: '40px 14px 28px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      minHeight: '560px',
                    }}
                  >
                    <span style={{ alignSelf: 'center', fontSize: '13px', color: '#9aa3b5', fontWeight: '600' }}>
                      {'Android · Google Wallet'}
                    </span>{' '}
                    <div
                      style={{
                        background: '#8a4b2a',
                        borderRadius: '24px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        color: '#ffffff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '999px',
                            background: '#ffffff',
                            color: '#8a4b2a',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {'B'}
                        </span>
                        <strong>{'Buna House'}</strong>
                      </div>{' '}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em' }}>
                            {'STAMPS'}
                          </span>
                          <span
                            style={{
                              fontSize: '28px',
                              lineHeight: '32px',
                              fontWeight: '800',
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >{`${__t(__v?.pvFrac)}`}</span>
                        </span>
                        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em' }}>{'NEXT'}</span>
                          <span style={{ fontWeight: '700', fontSize: '14px' }}>{`${__t(__v?.nextName)}`}</span>
                        </span>
                      </div>{' '}
                      <div
                        style={{
                          background: '#ffffff',
                          borderRadius: '14px',
                          padding: '12px',
                          display: 'grid',
                          gridTemplateColumns: `repeat(${__t(__v?.cols)}, minmax(0, 1fr))`,
                          gap: '6px',
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
                                border: `2px ${__t(s?.bs)} ${__t(s?.border)}`,
                              }}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={s?.ic}
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
                      <div
                        style={{
                          background: '#ffffff',
                          borderRadius: '12px',
                          height: '56px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#5b6475',
                          fontSize: '12px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {'MEMBER CODE'}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}{' '}
              <div
                style={{
                  alignSelf: 'stretch',
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
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
                >{`${__t(__v?.notifTitle)}`}</span>{' '}
                <div
                  role="tablist"
                  aria-label="Notification on"
                  style={{
                    display: 'flex',
                    border: '1px solid #e3e5ec',
                    borderRadius: '10px',
                    padding: '3px',
                    gap: '3px',
                  }}
                >
                  {(__v?.nTabs || []).map((t, __i0) => (
                    <React.Fragment key={__i0}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={t?.sel}
                        onClick={t?.pick}
                        style={{
                          flex: '1 1 0',
                          border: '0',
                          borderRadius: '7px',
                          padding: '6px',
                          minHeight: '36px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          fontSize: '13px',
                          background: `${__t(t?.bg)}`,
                          color: `${__t(t?.color)}`,
                        }}
                      >{`${__t(t?.label)}`}</button>
                    </React.Fragment>
                  ))}
                </div>{' '}
                {__b(__v?.nApple) ? (
                  <>
                    <div style={{ background: '#101827', borderRadius: '16px', padding: '12px' }}>
                      <div
                        style={{
                          background: 'rgba(255,255,255,0.94)',
                          borderRadius: '14px',
                          padding: '10px 12px',
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <span
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '7px',
                            background: '#8a4b2a',
                            color: '#ffffff',
                            fontWeight: '800',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 'none',
                          }}
                        >
                          {'B'}
                        </span>{' '}
                        <span
                          style={{
                            flex: '1 1 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            fontSize: '14px',
                            lineHeight: '19px',
                          }}
                        >
                          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>{'Buna House'}</strong>
                            <span style={{ fontSize: '12px', color: '#5b6475' }}>{'now'}</span>
                          </span>
                          <span>{`${__t(__v?.notifText)}`}</span>
                        </span>
                      </div>{' '}
                      <span
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          fontSize: '12px',
                          color: '#9aa3b5',
                          marginTop: '8px',
                        }}
                      >
                        {'iPhone lock screen · from Apple Wallet'}
                      </span>
                    </div>
                  </>
                ) : null}{' '}
                {__b(__v?.nGoogle) ? (
                  <>
                    <div style={{ background: '#1b2436', borderRadius: '16px', padding: '12px' }}>
                      <div
                        style={{
                          background: '#ffffff',
                          borderRadius: '12px',
                          padding: '10px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          fontSize: '14px',
                          lineHeight: '19px',
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '12px',
                            color: '#5b6475',
                          }}
                        >
                          <span
                            style={{ width: '14px', height: '14px', borderRadius: '999px', background: '#8a4b2a' }}
                          />
                          {'Google Wallet · Buna House · now'}
                        </span>{' '}
                        <strong>{`${__t(__v?.notifHead)}`}</strong>
                        <span>{'Show this at the counter.'}</span>
                      </div>{' '}
                      <span
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          fontSize: '12px',
                          color: '#9aa3b5',
                          marginTop: '8px',
                        }}
                      >
                        {'Android notification · from Google Wallet'}
                      </span>
                    </div>
                  </>
                ) : null}{' '}
                {__b(__v?.nWeb) ? (
                  <>
                    <div
                      style={{
                        background: '#e9ebf0',
                        borderRadius: '16px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          background: '#ffffff',
                          borderRadius: '8px',
                          padding: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            color: '#5b6475',
                          }}
                        >
                          <span>{'Buna House · web card'}</span>
                          <span>{'10/10'}</span>
                        </span>{' '}
                        <span
                          style={{
                            background: '#fba919',
                            borderRadius: '8px',
                            padding: '8px 10px',
                            fontSize: '13px',
                            fontWeight: '700',
                          }}
                        >{`${__t(__v?.notifText)}`}</span>
                      </div>{' '}
                      <span style={{ textAlign: 'center', fontSize: '12px', color: '#5b6475' }}>
                        {'Web cards get no lock-screen alert. The banner shows the next time they open the card.'}
                      </span>
                    </div>
                  </>
                ) : null}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default withDCStyle(RewardsView, 'Rewards', __CSS);
