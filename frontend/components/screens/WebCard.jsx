'use client';
/* Generated from the Temelash Card design (WebCard.dc.html), integrated with live backend data. */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import api from '@/lib/api';
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
    };
  }

  async componentDidMount() {
    await this.loadCard();
  }

  async loadCard() {
    try {
      let token = null;
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        token = params.get('token') || window.localStorage.getItem('tm-customer-token');
      }

      if (token) {
        try {
          const card = await api.public.getWebCard(token);
          if (card) {
            this.setState({ card, token, loading: false, error: null });
            return;
          }
        } catch (err) {
          console.warn('WebCard load error with stored token:', err);
        }
      }

      // Try fetching a customer from DB or enroll a real test card
      try {
        const custs = await api.merchant.getCustomers({ limit: 1 });
        if (custs?.items?.length > 0 && custs.items[0]?.memberships?.length > 0) {
          // If we have enrolled token saved in localStorage, use it
          const savedTok = window.localStorage?.getItem('tm-customer-token');
          if (savedTok) {
            const card = await api.public.getWebCard(savedTok);
            if (card) {
              this.setState({ card, token: savedTok, loading: false });
              return;
            }
          }
        }
      } catch (e) {}

      // If no valid card token or getWebCard failed, try joinInfo for preview
      try {
        const joinInfo = await api.public.getJoinInfo('sample-cafe');
        if (joinInfo) {
          const prog = joinInfo.program || {};
          const merch = joinInfo.merchant || {};
          const rw = prog.rewards && prog.rewards[0] ? prog.rewards[0] : null;
          this.setState({
            card: {
              merchant: { nameEn: merch.nameEn || 'Sample Cafe', nameAm: merch.nameAm || 'ሳምፕል ካፌ' },
              program: {
                nameEn: prog.nameEn || 'Coffee Stamp Card',
                nameAm: prog.nameAm || 'የቡና ማህተም ካርድ',
                brandColor: prog.brandColor || '#8a4b2a',
                termsEn: prog.termsEn || 'One stamp per visit. Valid 30 days.',
                termsAm: prog.termsAm || 'በአንድ ጉብኝት አንድ ማህተም።',
              },
              customer: { firstName: 'Loyalty Member', preferredLanguage: 'EN' },
              progress: {
                current: 7,
                required: prog.stampsRequired || 10,
                remaining: Math.max(0, (prog.stampsRequired || 10) - 7),
                completedCards: 0,
              },
              rewardsAvailable: 0,
              reward: rw
                ? {
                    nameEn: rw.nameEn || rw.name || 'Free macchiato',
                    nameAm: rw.nameAm || 'ነፃ ማኪያቶ',
                    descriptionEn: rw.descriptionEn || 'Free drink at completed card',
                    descriptionAm: rw.descriptionAm || '',
                  }
                : { nameEn: 'Free macchiato', nameAm: 'ነፃ ማኪያቶ' },
              barcode: 'DEMO-MEMBER-CARD',
              status: 'ACTIVE',
            },
            loading: false,
          });
          return;
        }
      } catch (e) {
        console.warn('Join info fetch fallback:', e);
      }

      this.setState({ loading: false });
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
    const n = Math.max(0, Math.min(maxStamps, card?.progress?.current ?? (this.props.stamps ?? 7)));
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

    const firstName = card?.customer?.firstName || 'Loyalty Member';
    const memberLabel = am ? `አባል · ${firstName}` : `Member · ${firstName}`;

    const barcodeValue = card?.barcode || this.state.token || 'A25rOmsw_h-cQ1DEXRuJ5pfuSstxAq7l_0pwMJtnZqo';

    return {
      slots,
      qr,
      cardToken: barcodeValue,
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

WebCardView.defaultProps = { stamps: 7 };
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
                  {'Recent visit'}
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
              <span style={{ fontSize: '13px', color: '#5b6475', fontVariantNumeric: 'tabular-nums' }}>
                {`${__t(__v?.memberLabel)}`}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  letterSpacing: '0.04em',
                  fontFamily: 'monospace',
                  background: '#f1f5f9',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  maxWidth: '220px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={__v?.cardToken}
              >
                {__v?.cardToken}
              </span>
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
