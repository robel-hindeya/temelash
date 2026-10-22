'use client';
/* Generated from the Temelash Card design (WebCard.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';

const __CSS =
  'body{margin:0}\nbutton,a{font:inherit}\nbutton:focus-visible,a:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';
class WebCardView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { menu: false, lang: 'en' };
  }
  renderVals() {
    const n = Math.max(0, Math.min(10, this.props.stamps ?? 7));
    const unlocked = n >= 10;
    const slots = [];
    for (let i = 0; i < 10; i++) {
      const r = i === 9,
        e = !r && i < n;
      slots.push({
        earned: e,
        reward: r,
        bg: r ? (unlocked ? '#e42330' : 'transparent') : e ? '#fba919' : 'transparent',
        border: r ? '#e42330' : e ? '#fba919' : '#e3e5ec',
        bs: r && !unlocked ? 'dashed' : 'solid',
        icon: unlocked ? '#ffffff' : '#c81d29',
      });
    }
    const am = this.state.lang === 'am';
    const left = 10 - n;
    const T = am
      ? {
          stamps: 'ማህተሞች',
          expires: 'የሚያበቃበት',
          last: 'የመጨረሻ ማህተም',
          show: 'ይህን ኮድ ለካውንተሩ ያሳዩ',
          apple: 'ወደ Apple Wallet ያክሉ',
          google: 'ወደ Google Wallet ያክሉ',
          banner: unlocked ? 'ነፃ ማኪያቶ ተከፍቷል። ለካውንተሩ ያሳዩ።' : 'ለነፃ ማኪያቶ ' + left + ' ጉብኝት ቀርቷል',
        }
      : {
          stamps: 'STAMPS',
          expires: 'CARD EXPIRES',
          last: 'LAST STAMP',
          show: 'Show this code at the counter',
          apple: 'Add to Apple Wallet',
          google: 'Add to Google Wallet',
          banner: unlocked
            ? 'Free macchiato unlocked. Show this at the counter.'
            : left + ' more ' + (left === 1 ? 'visit' : 'visits') + ' to a free macchiato',
        };
    const pattern = '111101111100101001101101101111101111000010000101110110010010000101111101011100101';
    const qr = pattern.split('').map((c) => ({ c: c === '1' ? '#101827' : 'transparent' }));
    return {
      slots,
      qr,
      t: T,
      countLabel: n + '/10',
      banner: T.banner,
      bannerBg: unlocked ? '#fba919' : '#fff3dc',
      bannerFg: '#101827',
      font: am ? "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif" : "'Source Sans 3', sans-serif",
      langLabel: am ? 'EN' : 'አማ',
      toggleLang: () => this.setState({ lang: am ? 'en' : 'am' }),
      menuOpen: this.state.menu,
      openMenu: () => this.setState({ menu: true }),
      closeMenu: () => this.setState({ menu: false }),
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
                    background: '#8a4b2a',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none',
                  }}
                >
                  {'B'}
                </span>{' '}
                <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '16px' }}>
                  <span style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.03em' }}>{'BUNA'}</span>
                  <span style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.03em' }}>{'HOUSE'}</span>
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
                          stroke="#101827"
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
                  {'10:42 · 20 Oct'}
                </span>
              </div>
            </div>{' '}
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingTop: '4px' }}
            >
              <div
                role="img"
                aria-label="Member QR code placeholder"
                style={{
                  width: '148px',
                  height: '148px',
                  padding: '8px',
                  boxSizing: 'border-box',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
                  gap: '2px',
                }}
              >
                {(__v?.qr || []).map((q, __i0) => (
                  <React.Fragment key={__i0}>
                    <span style={{ background: `${__t(q?.c)}` }} />
                  </React.Fragment>
                ))}
              </div>{' '}
              <span
                style={{ fontSize: '14px', color: '#5b6475', fontFamily: `${__t(__v?.font)}` }}
              >{`${__t(__v?.t?.show)}`}</span>{' '}
              <span style={{ fontSize: '13px', color: '#5b6475', fontVariantNumeric: 'tabular-nums' }}>
                {'Member 0412 · Liya M.'}
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
            <A
              href="#wallet"
              style={{
                background: '#101827',
                color: '#ffffff',
                fontWeight: '700',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                textDecoration: 'none',
                fontFamily: `${__t(__v?.font)}`,
              }}
            >{`${__t(__v?.t?.apple)}`}</A>{' '}
            <A
              href="#wallet"
              style={{
                background: '#ffffff',
                color: '#101827',
                border: '1px solid #e3e5ec',
                fontWeight: '700',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                textDecoration: 'none',
                fontFamily: `${__t(__v?.font)}`,
              }}
            >{`${__t(__v?.t?.google)}`}</A>
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
                  <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Buna House'}</span>
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
                  <dd style={{ margin: '0', fontWeight: '700' }}>{'Free macchiato at 10 stamps'}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{'Address'}</dt>
                  <dd style={{ margin: '0' }}>{'[Street, Bole, Addis Ababa]'}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{'Open'}</dt>
                  <dd style={{ margin: '0' }}>{'Mon–Sat 7:00–21:00'}</dd>{' '}
                  <dt style={{ color: '#5b6475' }}>{'Phone'}</dt>
                  <dd style={{ margin: '0' }}>{'+251 9__ ___ ___'}</dd> <dt style={{ color: '#5b6475' }}>{'Terms'}</dt>
                  <dd style={{ margin: '0', color: '#5b6475' }}>
                    {'One stamp per visit. Reward valid 30 days after it unlocks.'}
                  </dd>
                </dl>{' '}
                <A
                  href="#notify"
                  style={{
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: '700',
                    textDecoration: 'none',
                    color: '#4661ad',
                  }}
                >
                  {'Turn on offer notifications'}
                </A>{' '}
                <button
                  type="button"
                  style={{
                    border: '0',
                    background: 'transparent',
                    color: '#c81d29',
                    fontWeight: '700',
                    minHeight: '44px',
                    cursor: 'pointer',
                  }}
                >
                  {'Remove this card'}
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
