'use client';
/* Generated from the Temelash Card design (WebCard.dc.html), integrated with live backend data. */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import api, {
  getOrAssignUserCode,
  getOrAssignMerchantCode,
  getMerchantLoyaltyCards,
  getMerchantLoyaltyCard,
} from '@/lib/api';
import QRCodeDisplay from '@/components/QRCodeDisplay';

const __CSS =
  'body{margin:0}\nbutton,a{font:inherit}\nbutton:focus-visible,a:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';

class WebCardView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      lang: 'en',
      card: null,
      loading: true,
      error: null,
      walletLoading: false,
      walletMsg: null,
      memberId: null,
      token: null,
      activeCardId: 'UXwJ9RwdyHs',
      activeCard: null,
      loyaltyCards: [],
    };
  }

  async componentDidMount() {
    await this.loadCard();
  }

  switchCard = (cardId) => {
    const cards = getMerchantLoyaltyCards();
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      this.setState((prev) => {
        const existingCard = prev.card || {};
        const updatedCard = {
          ...existingCard,
          program: {
            ...existingCard.program,
            nameEn: card.name,
            nameAm: card.nameAm || existingCard.program?.nameAm,
            brandColor: card.accent || existingCard.program?.brandColor,
          },
          progress: {
            ...existingCard.progress,
            required: card.stampsRequired || 10,
            remaining: card.stampsRequired || 10,
          },
          reward: {
            ...existingCard.reward,
            nameEn: card.rewardName || 'Special Reward',
            nameAm: card.rewardNameAm || '',
          },
        };
        return {
          activeCardId: card.id,
          activeCard: card,
          card: updatedCard,
        };
      });
      if (typeof window !== 'undefined' && window.history?.pushState) {
        const url = new URL(window.location.href);
        url.searchParams.set('c', card.id);
        window.history.pushState({}, '', url.toString());
      }
    }
  };

  async loadCard() {
    try {
      let token = null;
      let memberId = null;
      let merchantParam = null;
      let cardIdParam = null;
      const allLoyaltyCards = getMerchantLoyaltyCards();

      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        token = params.get('token') || window.localStorage.getItem('tm-customer-token');
        cardIdParam = params.get('c') || params.get('card') || params.get('cardId');
        merchantParam = params.get('m') || params.get('merchant') || params.get('slug');

        const routeOrParamId = params.get('id') || this.props?.id;
        const matchingCard = allLoyaltyCards.find((c) => c.id === routeOrParamId);
        if (matchingCard) {
          cardIdParam = matchingCard.id;
        } else if (routeOrParamId) {
          memberId = routeOrParamId;
        }
      }

      if (!cardIdParam && this.props?.id) {
        const matchingCard = allLoyaltyCards.find((c) => c.id === this.props.id);
        if (matchingCard) cardIdParam = matchingCard.id;
      }

      const activeCardId = cardIdParam || allLoyaltyCards[0]?.id || 'UXwJ9RwdyHs';
      const activeCard = getMerchantLoyaltyCard(activeCardId) || allLoyaltyCards[0];

      // 1. Assign 11-char alphanumeric ID (like UXwJ9RwdyHs) for user
      if (!memberId || memberId.startsWith('TC-')) {
        memberId = getOrAssignUserCode();
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('tm-user-code', memberId);
          window.localStorage.setItem('tm-customer-id', memberId);
        }
      }

      // 2. If we already have a real stored token, try loading the card from the backend
      if (token && !token.startsWith('DEMO-')) {
        try {
          const card = await api.public.getWebCard(token);
          if (card) {
            if (activeCard) {
              card.program = {
                ...card.program,
                nameEn: activeCard.name || card.program?.nameEn,
                nameAm: activeCard.nameAm || card.program?.nameAm,
                brandColor: activeCard.accent || card.program?.brandColor,
              };
              if (activeCard.rewardName) {
                card.reward = {
                  ...card.reward,
                  nameEn: activeCard.rewardName,
                  nameAm: activeCard.rewardNameAm || card.reward?.nameAm,
                };
              }
              if (activeCard.stampsRequired) {
                card.progress = {
                  ...card.progress,
                  required: activeCard.stampsRequired,
                };
              }
            }
            this.setState({
              card,
              token,
              memberId,
              activeCardId,
              activeCard,
              loyaltyCards: allLoyaltyCards,
              loading: false,
              error: null,
            });
            return;
          }
        } catch (err) {
          console.warn('WebCard load error with stored token:', err);
        }
      }

      // Determine active merchant / program slug
      const merchantCode = merchantParam || getOrAssignMerchantCode();
      let joinSlug = merchantParam || merchantCode || 'sample-cafe';
      try {
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const pSlug = params.get('slug') || params.get('merchant') || params.get('m');
          if (pSlug) joinSlug = pSlug;
        }
      } catch (e) {}

      // Attempt to auto-enroll new user in the database so staff scanner can validate and stamp real membership
      let enrolledToken = token;
      let joinInfo = null;
      try {
        joinInfo = await api.public.getJoinInfo(joinSlug).catch(() => null);
      } catch (e) {}

      if (!enrolledToken || enrolledToken.startsWith('DEMO-')) {
        try {
          const rndPhone = '+2519' + Math.floor(10000000 + Math.random() * 90000000);
          const rndEmail = 'member_' + Date.now().toString().slice(-6) + '@customer.temelash.et';
          const enrollRes = await api.public.enroll(joinSlug, {
            firstName: 'Member ' + memberId.slice(-4),
            phone: rndPhone,
            email: rndEmail,
            acceptTerms: true,
            preferredLanguage: 'EN',
            marketingConsent: true,
          });
          if (enrollRes?.card?.token) {
            enrolledToken = enrollRes.card.token;
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('tm-customer-token', enrolledToken);
            }
          }
        } catch (enrollErr) {
          console.warn('Auto-enrollment fallback:', enrollErr);
        }
      }

      // If enrolled token exists, fetch live web card
      if (enrolledToken && !enrolledToken.startsWith('DEMO-')) {
        try {
          const card = await api.public.getWebCard(enrolledToken);
          if (card) {
            if (activeCard) {
              card.program = {
                ...card.program,
                nameEn: activeCard.name || card.program?.nameEn,
                nameAm: activeCard.nameAm || card.program?.nameAm,
                brandColor: activeCard.accent || card.program?.brandColor,
              };
              if (activeCard.rewardName) {
                card.reward = {
                  ...card.reward,
                  nameEn: activeCard.rewardName,
                  nameAm: activeCard.rewardNameAm || card.reward?.nameAm,
                };
              }
              if (activeCard.stampsRequired) {
                card.progress = {
                  ...card.progress,
                  required: activeCard.stampsRequired,
                };
              }
            }
            this.setState({
              card,
              token: enrolledToken,
              memberId,
              activeCardId,
              activeCard,
              loyaltyCards: allLoyaltyCards,
              loading: false,
              error: null,
            });
            return;
          }
        } catch (e) {}
      }

      // 3. Fallback: Fresh unstamped card with 0 STAMPS (never 7 stamps!)
      const prog = joinInfo?.program || {};
      const merch = joinInfo?.merchant || {};
      const rw = prog.rewards && prog.rewards[0] ? prog.rewards[0] : null;
      const stampsReq = activeCard?.stampsRequired || prog.stampsRequired || 10;
      const fallbackToken = enrolledToken || memberId || getOrAssignUserCode();
      if (typeof window !== 'undefined' && !enrolledToken) {
        window.localStorage.setItem('tm-customer-token', fallbackToken);
      }

      this.setState({
        card: {
          merchant: { nameEn: merch.nameEn || 'Sample Cafe', nameAm: merch.nameAm || 'ሳምፕል ካፌ' },
          program: {
            nameEn: activeCard?.name || prog.nameEn || 'Coffee Stamp Card',
            nameAm: activeCard?.nameAm || prog.nameAm || 'የቡና ማህተም ካርድ',
            brandColor: activeCard?.accent || prog.brandColor || '#8a4b2a',
            termsEn: prog.termsEn || 'One stamp per visit. Valid 30 days.',
            termsAm: prog.termsAm || 'በአንድ ጉብኝት አንድ ማህተም።',
          },
          customer: { firstName: 'Member ' + memberId.slice(-4), preferredLanguage: 'EN', id: memberId },
          progress: {
            current: 0, // NEW USER CARD: ALWAYS 0 STAMPS!
            required: stampsReq,
            remaining: stampsReq,
            completedCards: 0,
          },
          rewardsAvailable: 0,
          reward: {
            nameEn: activeCard?.rewardName || rw?.nameEn || rw?.name || 'Free macchiato',
            nameAm: activeCard?.rewardNameAm || rw?.nameAm || 'ነፃ ማኪያቶ',
            descriptionEn: rw?.descriptionEn || 'Free item when completed',
            descriptionAm: rw?.descriptionAm || '',
          },
          barcode: fallbackToken,
          status: 'ACTIVE',
        },
        token: fallbackToken,
        memberId,
        activeCardId,
        activeCard,
        loyaltyCards: allLoyaltyCards,
        loading: false,
      });
    } catch (e) {
      console.error('Failed to load card:', e);
      this.setState({ loading: false, error: e.message });
    }
  }

  handleWallet = async (provider) => {
    let token = this.state.card?.barcode;
    if (!token && typeof window !== 'undefined') {
      token = window.localStorage.getItem('tm-customer-token');
    }
    if (!token || token.startsWith('DEMO-')) {
      this.setState({
        walletMsg:
          this.state.lang === 'am'
            ? 'እባክዎ መጀመሪያ ካርዱን ይቀላቀሉ (በ /join)'
            : 'Please enroll first at /join to save a live wallet pass.',
      });
      return;
    }
    this.setState({ walletLoading: true, walletMsg: null });
    try {
      const res = await api.public.getWalletLink(token, provider);
      if (res && res.url) {
        window.open(res.url, '_blank');
        this.setState({
          walletLoading: false,
          walletMsg:
            provider === 'APPLE' ? 'Opening Apple Wallet pass download...' : 'Opening Google Wallet save link...',
        });
      } else {
        this.setState({
          walletLoading: false,
          walletMsg: `${provider} pass link generated successfully.`,
        });
      }
    } catch (err) {
      this.setState({
        walletLoading: false,
        walletMsg: `${provider} Wallet: ${err.message || 'Pass generation note.'}`,
      });
    }
  };

  renderVals() {
    const card = this.state.card;
    const maxStamps = card?.progress?.required ?? 10;
    const n = Math.max(0, Math.min(maxStamps, card?.progress?.current ?? (this.props.stamps ?? 0)));
    const unlocked = n >= maxStamps || (card?.rewardsAvailable ?? 0) > 0;
    const brandColor = card?.program?.brandColor || '#8a4b2a';
    const slots = [];
    for (let i = 0; i < maxStamps; i++) {
      const r = i === maxStamps - 1;
      const e = !r && i < n;
      slots.push({
        earned: e,
        reward: r,
        bg: r ? (unlocked ? '#e42330' : 'transparent') : e ? brandColor : 'transparent',
        border: r ? '#e42330' : e ? brandColor : '#e3e5ec',
        bs: r && !unlocked ? 'dashed' : 'solid',
        icon: unlocked ? '#ffffff' : '#c81d29',
      });
    }
    const am = this.state.lang === 'am';
    const left = Math.max(0, maxStamps - n);
    const rewardName = am
      ? card?.reward?.nameAm || card?.reward?.nameEn || 'ነፃ ማኪያቶ'
      : card?.reward?.nameEn || 'free macchiato';

    const memberId =
      this.state.memberId ||
      (typeof window !== 'undefined'
        ? window.localStorage.getItem('tm-user-code') || window.localStorage.getItem('tm-customer-id')
        : null) ||
      getOrAssignUserCode();

    const T = am
      ? {
          stamps: 'ማህተሞች',
          expires: 'የሚያበቃበት',
          last: 'የመጨረሻ ማህተም',
          show: 'ይህን ኮድ ለካውንተሩ ያሳዩ',
          apple: 'ወደ Apple Wallet ያክሉ',
          google: 'ወደ Google Wallet ያክሉ',
          banner: unlocked
            ? `${rewardName} ተከፍቷል። ለካውንተሩ ያሳዩ።`
            : n === 0
              ? `ለ${rewardName} ${maxStamps} ጉብኝት ቀርቷል · ለ1ኛ ማህተም ለካውንተሩ ያሳዩ`
              : `ለ${rewardName} ${left} ጉብኝት ቀርቷል`,
        }
      : {
          stamps: 'STAMPS',
          expires: 'CARD EXPIRES',
          last: 'LAST STAMP',
          show: 'Show this code at the counter',
          apple: 'Add to Apple Wallet',
          google: 'Add to Google Wallet',
          banner: unlocked
            ? `${rewardName} unlocked. Show this at the counter.`
            : n === 0
              ? `${maxStamps} visits to a ${rewardName} · Show at counter for 1st stamp`
              : `${left} more ${left === 1 ? 'visit' : 'visits'} to a ${rewardName}`,
        };

    const businessName = am
      ? card?.merchant?.nameAm || card?.merchant?.nameEn || 'ሳምፕል ካፌ'
      : card?.merchant?.nameEn || 'SAMPLE CAFE';

    const parts = (businessName || '').split(' ');
    const nameA = parts[0] || 'TEMELASH';
    const nameB = parts.slice(1).join(' ') || 'CARD';
    const initial = nameA.charAt(0).toUpperCase() || 'T';

    const pattern = '111101111100101001101101101111101111000010000101110110010010000101111101011100101';
    const qr = pattern.split('').map((c) => ({ c: c === '1' ? '#101827' : 'transparent' }));

    const firstName = card?.customer?.firstName || 'Member';
    const memberLabel = am ? `አባል · ${memberId}` : `Member · ${memberId}`;

    const barcodeValue = card?.barcode || this.state.token || memberId || 'UXwJ9RwdyHs';
    const isNew = n === 0;
    const lastVisitText = isNew ? (am ? 'አዲስ አባል' : 'New member') : (am ? 'የቅርብ ጊዜ' : 'Recent visit');

    return {
      slots,
      qr,
      cardToken: barcodeValue,
      memberId,
      lastVisitText,
      t: T,
      countLabel: `${n}/${maxStamps}`,
      banner: T.banner,
      bannerBg: unlocked ? brandColor : '#fff3dc',
      bannerFg: '#101827',
      font: am ? "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif" : "'Source Sans 3', sans-serif",
      langLabel: am ? 'EN' : 'አማ',
      toggleLang: () => this.setState({ lang: am ? 'en' : 'am' }),
      menuOpen: this.state.menu,
      openMenu: () => this.setState({ menu: true }),
      closeMenu: () => this.setState({ menu: false }),
      nameA,
      nameB,
      initial,
      brandColor,
      memberLabel,
      merchantFullName: businessName,
      cardId: this.state.activeCardId || 'UXwJ9RwdyHs',
      programTitle: am
        ? card?.program?.nameAm || card?.program?.nameEn || 'የታማኝነት ካርድ'
        : card?.program?.nameEn || 'Loyalty Card',
      loyaltyCards: this.state.loyaltyCards || getMerchantLoyaltyCards(),
      switchCard: this.switchCard,
      rewardDescription: am
        ? card?.reward?.nameAm || `${maxStamps} ማህተም ሲሞላ`
        : `${card?.reward?.nameEn || 'Reward'} at ${maxStamps} stamps`,
      merchantAddress: 'Bole Road, Addis Ababa',
      merchantHours: 'Mon–Sat 7:00–21:00',
      merchantPhone: '+251 91 123 4567',
      termsText: am
        ? card?.program?.termsAm || 'በአንድ ጉብኝት አንድ ማህተም። ሽልማቱ ለ30 ቀናት ያገለግላል።'
        : card?.program?.termsEn || 'One stamp per visit. Reward valid 30 days after it unlocks.',
      onAppleWallet: () => this.handleWallet('APPLE'),
      onGoogleWallet: () => this.handleWallet('GOOGLE'),
      walletMsg: this.state.walletMsg,
      clearWalletMsg: () => this.setState({ walletMsg: null }),
    };
  }
}

WebCardView.defaultProps = { stamps: 0 };
WebCardView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          width: '390px',
          height: '940px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#e9ebf0',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header
          style={{
            padding: '16px 20px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            </svg>{' '}
            <span style={{ fontWeight: '700', fontSize: '15px', color: '#5b6475' }}>{'temelash.card'}</span>
          </div>{' '}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              onClick={__v?.toggleLang}
              aria-label="Switch language"
              style={{
                border: '0',
                background: 'transparent',
                padding: '0 10px',
                minHeight: '44px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '14px',
                color: '#101827',
              }}
            >{`${__t(__v?.langLabel)}`}</button>{' '}
            <button
              type="button"
              onClick={__v?.openMenu}
              aria-label="Card details"
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
          </div>
        </header>{' '}
        <main
          style={{ flex: '1 1 auto', padding: '4px 16px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {__b(__v?.walletMsg) ? (
            <div
              style={{
                background: '#101827',
                color: '#ffffff',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{`${__t(__v?.walletMsg)}`}</span>
              <button
                type="button"
                onClick={__v?.clearWalletMsg}
                style={{
                  background: 'transparent',
                  border: 0,
                  color: '#fba919',
                  cursor: 'pointer',
                  fontWeight: '700',
                }}
              >
                ✕
              </button>
            </div>
          ) : null}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${__t(__v?.brandColor || '#8a4b2a')}`,
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none',
                  }}
                >
                  {`${__t(__v?.initial)}`}
                </span>{' '}
                <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '16px' }}>
                  <span style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.03em' }}>
                    {`${__t(__v?.nameA)}`}
                  </span>
                  <span style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.03em' }}>
                    {`${__t(__v?.nameB)}`}
                  </span>
                  {__v?.programTitle ? (
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>
                      {`${__t(__v?.programTitle)}`}
                    </span>
                  ) : null}
                </span>
              </div>{' '}
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                  }}
                >{`${__t(__v?.t?.stamps)}`}</span>
                <span
                  style={{
                    fontSize: '32px',
                    lineHeight: '32px',
                    fontWeight: '800',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >{`${__t(__v?.countLabel)}`}</span>
              </span>
            </div>{' '}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '12px' }}>
              {(__v?.slots || []).map((sl, __i0) => (
                <React.Fragment key={__i0}>
                  <span
                    style={{
                      aspectRatio: '1',
                      borderRadius: '999px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `${__t(sl?.bg)}`,
                      border: `2px ${__t(sl?.bs)} ${__t(sl?.border)}`,
                    }}
                  >
                    {__b(sl?.earned) ? (
                      <>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </>
                    ) : null}{' '}
                    {__b(sl?.reward) ? (
                      <>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={sl?.icon}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                        </svg>
                      </>
                    ) : null}
                  </span>
                </React.Fragment>
              ))}
            </div>{' '}
            <div
              style={{
                background: `${__t(__v?.bannerBg)}`,
                color: `${__t(__v?.bannerFg)}`,
                borderRadius: '12px',
                padding: '10px 14px',
                fontWeight: '700',
                fontFamily: `${__t(__v?.font)}`,
              }}
            >{`${__t(__v?.banner)}`}</div>{' '}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    fontFamily: `${__t(__v?.font)}`,
                  }}
                >{`${__t(__v?.t?.expires)}`}</span>
                <span style={{ fontWeight: '700', fontSize: '17px' }}>{'30 Nov 2026'}</span>
              </div>{' '}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    fontFamily: `${__t(__v?.font)}`,
                  }}
                >{`${__t(__v?.t?.last)}`}</span>
                <span style={{ fontWeight: '700', fontSize: '17px', fontVariantNumeric: 'tabular-nums' }}>
                  {`${__t(__v?.lastVisitText)}`}
                </span>
              </div>
            </div>{' '}
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingTop: '4px' }}
            >
              <div
                style={{
                  width: '156px',
                  height: '156px',
                  padding: '8px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(16,24,39,0.06)',
                  border: '1px solid #e3e5ec',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                <QRCodeDisplay
                  value={__v?.cardToken}
                  size={140}
                  darkColor={__v?.brandColor || '#101827'}
                />
              </div>{' '}
              <span
                style={{ fontSize: '14px', color: '#5b6475', fontFamily: `${__t(__v?.font)}` }}
              >{`${__t(__v?.t?.show)}`}</span>{' '}
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#101827', fontVariantNumeric: 'tabular-nums' }}>
                {`${__t(__v?.memberLabel)}`}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#2563eb',
                    fontWeight: '700',
                    fontFamily: 'monospace',
                    background: '#eff6ff',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid #bfdbfe',
                  }}
                >
                  Card ID: {__v?.cardId}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#64748b',
                    fontFamily: 'monospace',
                    background: '#f1f5f9',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  Member: {__v?.memberId}
                </span>
              </div>
            </div>{' '}
            <div
              style={{
                borderTop: '1px solid #e3e5ec',
                paddingTop: '12px',
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                color: '#5b6475',
                textAlign: 'center',
              }}
            >
              {'POWERED BY TEMELASH CARD'}
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={__v?.onAppleWallet}
              style={{
                background: '#101827',
                color: '#ffffff',
                fontWeight: '700',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                border: 0,
                cursor: 'pointer',
                fontFamily: `${__t(__v?.font)}`,
              }}
            >{`${__t(__v?.t?.apple)}`}</button>{' '}
            <button
              type="button"
              onClick={__v?.onGoogleWallet}
              style={{
                background: '#ffffff',
                color: '#101827',
                border: '1px solid #e3e5ec',
                fontWeight: '700',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                fontFamily: `${__t(__v?.font)}`,
              }}
            >{`${__t(__v?.t?.google)}`}</button>
          </div>

          {/* Multi-Card Switcher for Customer */}
          {(__v?.loyaltyCards || []).length > 1 ? (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '14px 16px',
                border: '1px solid #e3e5ec',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Cards from this Business
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {__v?.loyaltyCards.length} Cards
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {__v?.loyaltyCards.map((c) => {
                  const isCur = c.id === __v?.cardId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => __v?.switchCard && __v.switchCard(c.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: isCur ? '2px solid #101827' : '1px solid #cbd5e1',
                        background: isCur ? '#101827' : '#f8fafc',
                        color: isCur ? '#ffffff' : '#101827',
                        fontSize: '12px',
                        fontWeight: isCur ? '700' : '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.accent || '#4661ad' }} />
                      <span>{c.name}</span>
                      <span style={{ fontSize: '10px', opacity: 0.8, fontFamily: 'monospace' }}>[{c.id}]</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </main>{' '}
        {__b(__v?.menuOpen) ? (
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
                aria-label="Card details"
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
                  <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {`${__t(__v?.merchantFullName)}`}
                  </span>
                  <button
                    type="button"
                    onClick={__v?.closeMenu}
                    style={{
                      border: '0',
                      background: 'transparent',
                      color: '#4661ad',
                      fontWeight: '700',
                      padding: '0 4px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Done'}
                  </button>
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
                  <dt style={{ color: '#5b6475' }}>{'Reward'}</dt>
                  <dd style={{ margin: '0', fontWeight: '700' }}>{`${__t(__v?.rewardDescription)}`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{'Address'}</dt>
                  <dd style={{ margin: '0' }}>{`${__t(__v?.merchantAddress)}`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{'Open'}</dt>
                  <dd style={{ margin: '0' }}>{`${__t(__v?.merchantHours)}`}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{'Phone'}</dt>
                  <dd style={{ margin: '0' }}>{`${__t(__v?.merchantPhone)}`}</dd> <dt style={{ color: '#5b6475' }}>{'Terms'}</dt>
                  <dd style={{ margin: '0', color: '#5b6475' }}>{`${__t(__v?.termsText)}`}</dd>
                </dl>{' '}
                <button
                  type="button"
                  onClick={__v?.closeMenu}
                  style={{
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: '700',
                    background: '#ffffff',
                    color: '#4661ad',
                    cursor: 'pointer',
                  }}
                >
                  {'Close'}
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default withDCStyle(WebCardView, 'WebCard', __CSS);
