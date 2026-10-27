'use client';
/* Markup for the Main screen. State and handlers live in Main.jsx (renderVals); this file only draws __v. */
import { A } from '@/lib/dc-runtime';
import AuthModal from '@/components/AuthModal';
import DemoModal from '@/components/DemoModal';

export default function renderMain(__v) {
  return (
    <>
      <div
        className="tm-home"
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          fontSize: '16px',
          lineHeight: '24px',
        }}
      >
        <header style={{ background: '#ffffff', borderBottom: '1px solid #e3e5ec' }}>
          <nav
            aria-label="Main"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '16px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <A
              href="#top"
              aria-label="Temelash Card home"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#101827' }}
            >
              <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
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
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontWeight: '800',
                  letterSpacing: '0.03em',
                  fontSize: '15px',
                  lineHeight: '15px',
                }}
              >
                {'TEMELASH'}
                <span style={{ color: '#e42330' }}>{'CARD'}</span>
              </span>
            </A>{' '}
            <div
              id="tm-navlinks"
              className={__v?.navCls}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '28px', fontWeight: '600' }}
            >
              <A href="#features" style={{ color: '#101827', textDecoration: 'none' }}>
                {'Features'}
              </A>{' '}
              <A href="#how" style={{ color: '#101827', textDecoration: 'none' }}>
                {'How it works'}
              </A>{' '}
              <A href="#pricing" style={{ color: '#101827', textDecoration: 'none' }}>
                {'Pricing'}
              </A>{' '}
              <A href="#faq" style={{ color: '#101827', textDecoration: 'none' }}>
                {'FAQ'}
              </A>{' '}
              <A
                href="#signin"
                onClick={__v?.openSignIn}
                className="tm-show-sm"
                style={{ color: '#101827', textDecoration: 'none', cursor: 'pointer' }}
              >
                {'Sign in'}
              </A>
            </div>{' '}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                className="tm-hide-sm"
                aria-label="Language: English. Switch to Amharic"
                style={{
                  font: 'inherit',
                  fontWeight: '700',
                  fontSize: '14px',
                  background: '#ffffff',
                  color: '#5b6475',
                  border: '1px solid #e3e5ec',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  minHeight: '44px',
                  cursor: 'pointer',
                }}
              >
                {'EN · አማ'}
              </button>{' '}
              <A
                href="#signin"
                onClick={__v?.openSignIn}
                className="tm-hide-sm"
                style={{ fontWeight: '700', color: '#101827', textDecoration: 'none', padding: '10px 12px', cursor: 'pointer' }}
              >
                {'Sign in'}
              </A>{' '}
              <A
                href="#signup"
                onClick={__v?.openSignUp}
                style={{
                  fontWeight: '700',
                  background: '#e42330',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  minHeight: '44px',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {'Try it free'}
              </A>{' '}
              <button
                type="button"
                className="tm-menubtn"
                onClick={__v?.toggleNav}
                aria-expanded={__v?.navExpanded}
                aria-controls="tm-navlinks"
                aria-label={__v?.navLabel}
                style={{
                  width: '44px',
                  height: '44px',
                  border: '1px solid #e3e5ec',
                  background: '#ffffff',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                  <path d={__v?.navIcon} />
                </svg>
              </button>
            </div>
          </nav>
        </header>{' '}
        <section id="top" style={{ background: '#ffffff' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '88px 24px 96px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '64px',
            }}
          >
            <div style={{ flex: '1 1 520px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <span
                style={{
                  alignSelf: 'flex-start',
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#5b6475',
                  background: '#f7f7f9',
                  border: '1px solid #e3e5ec',
                  borderRadius: '999px',
                  padding: '6px 14px',
                }}
              >
                {'FOR CAFÉS · SALONS · SPAS · RESTAURANTS · CAR WASHES'}
              </span>{' '}
              <h1
                style={{
                  margin: '0',
                  fontSize: '64px',
                  lineHeight: '66px',
                  fontWeight: '800',
                  letterSpacing: '0.01em',
                }}
              >
                {'The big chains know their regulars. '}
                <span style={{ color: '#e42330' }}>{'Now you do too.'}</span>
              </h1>{' '}
              <p
                style={{
                  margin: '0',
                  fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                  fontSize: '22px',
                  lineHeight: '36px',
                  fontWeight: '700',
                  color: '#101827',
                }}
              >
                {'ደንበኛዎ ተመልሶ ይመጣል።'}
              </p>{' '}
              <p style={{ margin: '0', fontSize: '20px', lineHeight: '30px', color: '#5b6475', maxWidth: '540px' }}>
                {
                  'One QR code at your counter gives every customer a stamp card in their phone wallet. More return visits, rewards that run themselves, and a direct line to every regular.'
                }
              </p>{' '}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <A
                  href="#demo"
                  onClick={__v?.openDemo}
                  style={{
                    fontWeight: '700',
                    fontSize: '18px',
                    background: '#e42330',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {'Book a demo'}
                </A>{' '}
                <A
                  href="#how"
                  style={{
                    fontWeight: '700',
                    fontSize: '18px',
                    color: '#4661ad',
                    textDecoration: 'none',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    border: '1px solid #e3e5ec',
                  }}
                >
                  {'See how it works'}
                </A>
              </div>{' '}
              <p style={{ margin: '0', fontSize: '14px', lineHeight: '20px', color: '#5b6475' }}>
                {'No app for your customers to download. Works with Apple Wallet, Google Wallet and the web.'}
              </p>
            </div>{' '}
            <div style={{ flex: '1 1 400px', minWidth: '0', display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '440px', padding: '32px 0' }}>
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                    border: '1px solid #e3e5ec',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '16px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          color: '#5b6475',
                        }}
                      >
                        {'YOUR CARD AT'}
                      </span>{' '}
                      <span style={{ fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                        {'[Partner café]'}
                      </span>
                    </div>{' '}
                    <svg width="28" height="28" viewBox="0 0 40 40" role="img" aria-label="Temelash mark">
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
                  </div>{' '}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div
                      style={{
                        flex: '1 1 auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                        gap: '12px',
                      }}
                    >
                      <span
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          background: '#fba919',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
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
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          background: '#fba919',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
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
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          background: '#fba919',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
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
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          background: '#fba919',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
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
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          background: '#fba919',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
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
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          background: '#fba919',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
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
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          background: '#fba919',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
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
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          border: '2px solid #e3e5ec',
                          boxSizing: 'border-box',
                        }}
                      />{' '}
                      <span
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          border: '2px solid #e3e5ec',
                          boxSizing: 'border-box',
                        }}
                      />{' '}
                      <span
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          border: '2px dashed #e42330',
                          boxSizing: 'border-box',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
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
                          role="img"
                          aria-label="Reward slot"
                        >
                          <rect x="3" y="8" width="18" height="13" rx="1.5" />
                          <path d="M3 12h18M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                        </svg>
                      </span>
                    </div>{' '}
                    <span
                      style={{
                        fontSize: '32px',
                        lineHeight: '32px',
                        fontWeight: '800',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {'7/10'}
                    </span>
                  </div>{' '}
                  <div style={{ background: '#fff3dc', borderRadius: '12px', padding: '12px 16px', fontWeight: '600' }}>
                    {'3 more visits to a free macchiato'}
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
                    }}
                  >
                    {'POWERED BY TEMELASH CARD'}
                  </div>
                </div>{' '}
                <div
                  style={{
                    position: 'absolute',
                    right: '-12px',
                    top: '0',
                    background: '#101827',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#fba919' }} />
                  {'Stamp added · just now\n'}
                </div>{' '}
                <div
                  style={{
                    position: 'absolute',
                    left: '-16px',
                    bottom: '0',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: '600',
                    fontSize: '14px',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4661ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M11 18h2" />
                  </svg>
                  {'Saved to wallet\n'}
                </div>
              </div>
            </div>
          </div>
        </section>{' '}
        <section style={{ borderTop: '1px solid #e3e5ec', borderBottom: '1px solid #e3e5ec', background: '#f7f7f9' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '96px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '48px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'NO APP. JUST SCAN.'}
              </span>{' '}
              <h2 style={{ margin: '0', fontSize: '44px', lineHeight: '50px', fontWeight: '800' }}>
                {'One QR code replaces the paper punch card.'}
              </h2>{' '}
              <p style={{ margin: '0', fontSize: '18px', lineHeight: '28px', color: '#5b6475' }}>
                {
                  'Customers scan once, save the card, and it lives in their phone next to their boarding passes. Nothing to print, lose or forget at home.'
                }
              </p>
            </div>{' '}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              <div
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
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
                </svg>{' '}
                <h3 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Scan to join'}
                </h3>{' '}
                <p style={{ margin: '0', color: '#5b6475' }}>
                  {'A counter stand with your QR. One scan and the card is theirs.'}
                </p>
              </div>{' '}
              <div
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
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>{' '}
                <h3 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Saved to wallet'}
                </h3>{' '}
                <p style={{ margin: '0', color: '#5b6475' }}>
                  {'Apple Wallet, Google Wallet or a web card. No download, no sign-up form.'}
                </p>
              </div>{' '}
              <div
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
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12l3 3 5-6" />
                </svg>{' '}
                <h3 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Stamp each visit'}
                </h3>{' '}
                <p style={{ margin: '0', color: '#5b6475' }}>
                  {"Staff add a stamp in seconds. The card updates on the customer's phone."}
                </p>
              </div>{' '}
              <div
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
                  <path d="M4 11v2a1 1 0 0 0 1 1h2l5 4V6L7 10H5a1 1 0 0 0-1 1zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" />
                </svg>{' '}
                <h3 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Offers that reach them'}
                </h3>{' '}
                <p style={{ margin: '0', color: '#5b6475' }}>
                  {"Send an offer or a reminder straight to every card holder's lock screen."}
                </p>
              </div>
            </div>
          </div>
        </section>{' '}
        <section style={{ background: '#101827', color: '#ffffff' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '104px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '48px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '760px' }}>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#ff5a63',
                }}
              >
                {'THREE QUESTIONS WORTH ASKING'}
              </span>{' '}
              <h2 style={{ margin: '0', fontSize: '44px', lineHeight: '50px', fontWeight: '800' }}>
                {'The chain down the road can answer these. Can you?'}
              </h2>
            </div>{' '}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div
                style={{
                  border: '1px solid #2c3650',
                  background: '#1b2436',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span style={{ fontSize: '40px', lineHeight: '44px', fontWeight: '800', color: '#fba919' }}>
                  {'01'}
                </span>{' '}
                <p style={{ margin: '0', fontSize: '22px', lineHeight: '30px', fontWeight: '700' }}>
                  {"How many of last month's customers could you message today?"}
                </p>
              </div>{' '}
              <div
                style={{
                  border: '1px solid #2c3650',
                  background: '#1b2436',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span style={{ fontSize: '40px', lineHeight: '44px', fontWeight: '800', color: '#fba919' }}>
                  {'02'}
                </span>{' '}
                <p style={{ margin: '0', fontSize: '22px', lineHeight: '30px', fontWeight: '700' }}>
                  {'How many first-time customers come back a second time?'}
                </p>
              </div>{' '}
              <div
                style={{
                  border: '1px solid #2c3650',
                  background: '#1b2436',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span style={{ fontSize: '40px', lineHeight: '44px', fontWeight: '800', color: '#fba919' }}>
                  {'03'}
                </span>{' '}
                <p style={{ margin: '0', fontSize: '22px', lineHeight: '30px', fontWeight: '700' }}>
                  {'Do you know who your ten best regulars are, by name?'}
                </p>
              </div>
            </div>{' '}
            <p style={{ margin: '0', fontSize: '18px', lineHeight: '28px', color: '#9aa3b5' }}>
              {'Temelash Card gives a single café the same answers. '}
              <A href="#features" style={{ color: '#8fa4e6', fontWeight: '700' }}>
                {'See what you get'}
              </A>
            </p>
          </div>
        </section>{' '}
        <section id="features" style={{ background: '#ffffff' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '104px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '64px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'FEATURES'}
              </span>{' '}
              <h2 style={{ margin: '0', fontSize: '44px', lineHeight: '50px', fontWeight: '800' }}>
                {'Everything a regular needs to come back.'}
              </h2>
            </div>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center' }}>
              <div style={{ flex: '1 1 440px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: '#fff3dc',
                    color: '#101827',
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    borderRadius: '999px',
                    padding: '6px 12px',
                  }}
                >
                  {'LOYALTY'}
                </span>{' '}
                <h3 style={{ margin: '0', fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>
                  {"A stamp card they can't leave at home."}
                </h3>{' '}
                <p style={{ margin: '0', fontSize: '18px', lineHeight: '28px', color: '#5b6475' }}>
                  {
                    "Set the reward, set the number of visits. Temelash tracks every stamp and unlocks the reward on the customer's phone the moment they earn it."
                  }
                </p>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4661ad"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span>{'8 or 10-stamp cards in Apple and Google Wallet'}</span>
                  </div>{' '}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4661ad"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span>{'Rewards unlock automatically, staff just confirm'}</span>
                  </div>{' '}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4661ad"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span>{'Visit history for every card holder'}</span>
                  </div>
                </div>
              </div>{' '}
              <div
                style={{
                  flex: '1 1 440px',
                  minWidth: '0',
                  background: '#f7f7f9',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'[Partner salon]'}</span>
                    <span
                      style={{
                        fontSize: '32px',
                        lineHeight: '32px',
                        fontWeight: '800',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {'8/8'}
                    </span>
                  </div>{' '}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px' }}>
                    <span style={{ aspectRatio: '1', borderRadius: '999px', background: '#fba919' }} />
                    <span style={{ aspectRatio: '1', borderRadius: '999px', background: '#fba919' }} />
                    <span style={{ aspectRatio: '1', borderRadius: '999px', background: '#fba919' }} />
                    <span style={{ aspectRatio: '1', borderRadius: '999px', background: '#fba919' }} />{' '}
                    <span style={{ aspectRatio: '1', borderRadius: '999px', background: '#fba919' }} />
                    <span style={{ aspectRatio: '1', borderRadius: '999px', background: '#fba919' }} />
                    <span style={{ aspectRatio: '1', borderRadius: '999px', background: '#fba919' }} />{' '}
                    <span
                      style={{
                        aspectRatio: '1',
                        borderRadius: '999px',
                        background: '#e42330',
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
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        role="img"
                        aria-label="Reward unlocked"
                      >
                        <rect x="3" y="8" width="18" height="13" rx="1.5" />
                        <path d="M3 12h18M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                      </svg>
                    </span>
                  </div>{' '}
                  <div style={{ background: '#fff3dc', borderRadius: '12px', padding: '12px 16px', fontWeight: '700' }}>
                    {'Free blow-dry unlocked. Show this at the counter.'}
                  </div>
                </div>
              </div>
            </div>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '48px', alignItems: 'center' }}>
              <div
                style={{
                  flex: '1 1 440px',
                  minWidth: '0',
                  background: '#f7f7f9',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontWeight: '700' }}>{'[Partner café]'}</span>
                    <span style={{ color: '#5b6475' }}>{'Double stamps on every macchiato. Offer ends Sunday.'}</span>
                  </div>
                </div>{' '}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontWeight: '700' }}>{'[Partner car wash]'}</span>
                    <span
                      style={{
                        fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                        lineHeight: '27px',
                        color: '#5b6475',
                      }}
                    >
                      {'ካርድዎ ላይ 1 ማህተም ብቻ ቀርቷል።'}
                    </span>
                  </div>
                </div>{' '}
                <div
                  style={{
                    background: '#fde8e9',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#c81d29',
                    fontWeight: '700',
                  }}
                >
                  {'Your reward expires in 3 days'}
                </div>
              </div>{' '}
              <div style={{ flex: '1 1 440px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: '#f7f7f9',
                    border: '1px solid #e3e5ec',
                    color: '#101827',
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    borderRadius: '999px',
                    padding: '6px 12px',
                  }}
                >
                  {'OFFERS & REMINDERS'}
                </span>{' '}
                <h3 style={{ margin: '0', fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>
                  {'Bring a quiet Tuesday back to life.'}
                </h3>{' '}
                <p style={{ margin: '0', fontSize: '18px', lineHeight: '28px', color: '#5b6475' }}>
                  {
                    'Every card holder is someone you can reach. Send an offer in Amharic and English from your dashboard and it lands on their phone, no SMS bill, no social ads.'
                  }
                </p>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4661ad"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span>{'Offers and reminders to every card holder'}</span>
                  </div>{' '}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4661ad"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span>{'Nudges for customers one stamp from a reward'}</span>
                  </div>{' '}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4661ad"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span>{'See who visits, how often, and who has gone quiet'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{' '}
        <section id="how" style={{ background: '#f7f7f9', borderTop: '1px solid #e3e5ec' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '104px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '48px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'HOW IT WORKS'}
              </span>{' '}
              <h2 style={{ margin: '0', fontSize: '44px', lineHeight: '50px', fontWeight: '800' }}>
                {'Live at your counter this week.'}
              </h2>
            </div>{' '}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '999px',
                    background: '#101827',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '800',
                  }}
                >
                  {'1'}
                </span>{' '}
                <h3 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Set up your card'}
                </h3>{' '}
                <p style={{ margin: '0', color: '#5b6475' }}>
                  {'Add your name and logo, pick the reward and how many visits earn it. We help you set it up.'}
                </p>
              </div>{' '}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '999px',
                    background: '#101827',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '800',
                  }}
                >
                  {'2'}
                </span>{' '}
                <h3 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Put the QR at your counter'}
                </h3>{' '}
                <p style={{ margin: '0', color: '#5b6475' }}>
                  {'We send a counter stand with your QR and a one-line instruction in Amharic and English.'}
                </p>
              </div>{' '}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '999px',
                    background: '#e42330',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '800',
                  }}
                >
                  {'3'}
                </span>{' '}
                <h3 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Customers scan and come back'}
                </h3>{' '}
                <p style={{ margin: '0', color: '#5b6475' }}>
                  {'They save the card, collect a stamp each visit, and return for the reward.'}
                </p>
              </div>
            </div>
          </div>
        </section>{' '}
        <section style={{ background: '#ffffff', borderTop: '1px solid #e3e5ec' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '104px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '64px',
            }}
          >
            <div style={{ flex: '1 1 360px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'WHAT CHANGES'}
              </span>{' '}
              <h2 style={{ margin: '0', fontSize: '44px', lineHeight: '50px', fontWeight: '800' }}>
                {'Less guessing. More regulars.'}
              </h2>
            </div>{' '}
            <div style={{ flex: '2 1 560px', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '24px', padding: '24px 0', borderBottom: '1px solid #e3e5ec' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '24px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    width: '72px',
                    flex: 'none',
                  }}
                >
                  {'BEFORE'}
                </span>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ color: '#5b6475', textDecoration: 'line-through' }}>
                    {'Paper cards that get lost in a wallet'}
                  </span>
                  <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {"A card on every customer's phone, always with them"}
                  </span>
                </div>
              </div>{' '}
              <div style={{ display: 'flex', gap: '24px', padding: '24px 0', borderBottom: '1px solid #e3e5ec' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '24px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    width: '72px',
                    flex: 'none',
                  }}
                >
                  {'BEFORE'}
                </span>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ color: '#5b6475', textDecoration: 'line-through' }}>
                    {'Staff counting stamps and remembering faces'}
                  </span>
                  <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {'Rewards that unlock on their own'}
                  </span>
                </div>
              </div>{' '}
              <div style={{ display: 'flex', gap: '24px', padding: '24px 0', borderBottom: '1px solid #e3e5ec' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '24px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    width: '72px',
                    flex: 'none',
                  }}
                >
                  {'BEFORE'}
                </span>{' '}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ color: '#5b6475', textDecoration: 'line-through' }}>
                    {'No way to reach a customer once they leave'}
                  </span>
                  <span style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                    {'An offer on their lock screen whenever you need a busy day'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>{' '}
        <section id="pricing" style={{ background: '#f7f7f9', borderTop: '1px solid #e3e5ec' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '104px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '720px',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'PRICING'}
              </span>{' '}
              <h2 style={{ margin: '0', fontSize: '44px', lineHeight: '50px', fontWeight: '800' }}>
                {'One plan. Everything included.'}
              </h2>{' '}
              <p style={{ margin: '0', fontSize: '18px', lineHeight: '28px', color: '#5b6475' }}>
                {"Tell us about your business and we'll send a price within 24 hours."}
              </p>
            </div>{' '}
            <div
              style={{
                width: '100%',
                maxWidth: '760px',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '40px',
                boxSizing: 'border-box',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
              }}
            >
              <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                  }}
                >
                  {'FROM'}
                </span>{' '}
                <span style={{ fontSize: '48px', lineHeight: '48px', fontWeight: '800' }}>
                  {'[ETB PRICE]'}
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#5b6475' }}>{' / month'}</span>
                </span>{' '}
                <p style={{ margin: '0', color: '#5b6475' }}>
                  {'Free setup and [TRIAL LENGTH] free to try. Cancel any time.'}
                </p>{' '}
                <A
                  href="#signup"
                  onClick={__v?.openSignUp}
                  style={{
                    alignSelf: 'flex-start',
                    fontWeight: '700',
                    background: '#e42330',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {'Get my price'}
                </A>
              </div>{' '}
              <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4661ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{'Branded wallet stamp card'}</span>
                </div>{' '}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4661ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{'Counter stand with your QR'}</span>
                </div>{' '}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4661ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{'Unlimited customers and stamps'}</span>
                </div>{' '}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4661ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{'Offers and reminders'}</span>
                </div>{' '}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4661ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{'Owner dashboard and visit history'}</span>
                </div>{' '}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4661ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{'Amharic and English throughout'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>{' '}
        <section id="faq" style={{ background: '#ffffff', borderTop: '1px solid #e3e5ec' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '104px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '64px',
            }}
          >
            <div style={{ flex: '1 1 320px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: '#c81d29',
                }}
              >
                {'FAQ'}
              </span>{' '}
              <h2 style={{ margin: '0', fontSize: '44px', lineHeight: '50px', fontWeight: '800' }}>
                {'Questions owners ask us.'}
              </h2>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>
                {'Something else? '}
                <A href="#demo" onClick={__v?.openDemo} style={{ fontWeight: '700', cursor: 'pointer' }}>
                  {'Talk to us'}
                </A>
              </p>
            </div>{' '}
            <div
              style={{
                flex: '2 1 560px',
                minWidth: '0',
                display: 'flex',
                flexDirection: 'column',
                borderTop: '1px solid #e3e5ec',
              }}
            >
              <details open={true} style={{ borderBottom: '1px solid #e3e5ec', padding: '20px 0' }}>
                <summary
                  style={{
                    fontSize: '20px',
                    lineHeight: '26px',
                    fontWeight: '700',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  {'Do my customers need to download an app?'}
                  <span aria-hidden="true" style={{ color: '#5b6475' }}>
                    {'–'}
                  </span>
                </summary>{' '}
                <p style={{ margin: '12px 0 0', color: '#5b6475' }}>
                  {'No. They scan your QR and save the card to Apple Wallet, Google Wallet or open it in the browser.'}
                </p>
              </details>{' '}
              <details style={{ borderBottom: '1px solid #e3e5ec', padding: '20px 0' }}>
                <summary
                  style={{
                    fontSize: '20px',
                    lineHeight: '26px',
                    fontWeight: '700',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  {'How do staff add a stamp?'}
                  <span aria-hidden="true" style={{ color: '#5b6475' }}>
                    {'+'}
                  </span>
                </summary>{' '}
                <p style={{ margin: '12px 0 0', color: '#5b6475' }}>{'[Describe the staff stamping flow.]'}</p>
              </details>{' '}
              <details style={{ borderBottom: '1px solid #e3e5ec', padding: '20px 0' }}>
                <summary
                  style={{
                    fontSize: '20px',
                    lineHeight: '26px',
                    fontWeight: '700',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  {'What kinds of businesses is it for?'}
                  <span aria-hidden="true" style={{ color: '#5b6475' }}>
                    {'+'}
                  </span>
                </summary>{' '}
                <p style={{ margin: '12px 0 0', color: '#5b6475' }}>
                  {'Cafés, salons, spas, restaurants and car washes: any business where customers come back.'}
                </p>
              </details>{' '}
              <details style={{ borderBottom: '1px solid #e3e5ec', padding: '20px 0' }}>
                <summary
                  style={{
                    fontSize: '20px',
                    lineHeight: '26px',
                    fontWeight: '700',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  {'How much does it cost?'}
                  <span aria-hidden="true" style={{ color: '#5b6475' }}>
                    {'+'}
                  </span>
                </summary>{' '}
                <p style={{ margin: '12px 0 0', color: '#5b6475' }}>{'[Pricing answer.]'}</p>
              </details>{' '}
              <details style={{ borderBottom: '1px solid #e3e5ec', padding: '20px 0' }}>
                <summary
                  style={{
                    fontSize: '20px',
                    lineHeight: '26px',
                    fontWeight: '700',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  {'Can I change the reward later?'}
                  <span aria-hidden="true" style={{ color: '#5b6475' }}>
                    {'+'}
                  </span>
                </summary>{' '}
                <p style={{ margin: '12px 0 0', color: '#5b6475' }}>{'[Answer.]'}</p>
              </details>{' '}
              <details style={{ borderBottom: '1px solid #e3e5ec', padding: '20px 0' }}>
                <summary
                  style={{
                    fontSize: '20px',
                    lineHeight: '26px',
                    fontWeight: '700',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  {'Is there a free trial?'}
                  <span aria-hidden="true" style={{ color: '#5b6475' }}>
                    {'+'}
                  </span>
                </summary>{' '}
                <p style={{ margin: '12px 0 0', color: '#5b6475' }}>{'[Trial terms.]'}</p>
              </details>
            </div>
          </div>
        </section>{' '}
        <section id="demo" style={{ background: '#101827', color: '#ffffff' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '104px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                margin: '0',
                fontSize: '56px',
                lineHeight: '60px',
                fontWeight: '800',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}
            >
              {'Give them a reason '}
              <span style={{ color: '#fba919' }}>{'to come back.'}</span>
            </h2>{' '}
            <p
              style={{
                margin: '0',
                fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                fontSize: '20px',
                lineHeight: '34px',
                color: '#9aa3b5',
              }}
            >
              {'ደንበኛዎ እንዲመለስ ምክንያት ይስጡት።'}
            </p>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <A
                href="#demo"
                onClick={__v?.openDemo}
                style={{
                  fontWeight: '700',
                  fontSize: '18px',
                  background: '#e42330',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
              >
                {'Book a demo'}
              </A>{' '}
              <A
                href="#contact"
                style={{
                  fontWeight: '700',
                  fontSize: '18px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: '1px solid #2c3650',
                }}
              >
                {'Chat on Telegram'}
              </A>
            </div>{' '}
            <p style={{ margin: '0', fontSize: '14px', color: '#9aa3b5' }}>{'We reply within 24 hours.'}</p>
          </div>
        </section>{' '}
        <footer style={{ background: '#101827', color: '#9aa3b5', borderTop: '1px solid #2c3650' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '48px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '32px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
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
                <span
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontWeight: '800',
                    letterSpacing: '0.03em',
                    fontSize: '14px',
                    lineHeight: '14px',
                    color: '#ffffff',
                  }}
                >
                  {'TEMELASH'}
                  <span>{'CARD'}</span>
                </span>
              </div>{' '}
              <p style={{ margin: '0', fontSize: '14px', lineHeight: '20px' }}>
                {'The digital loyalty card for businesses customers come back to. Addis Ababa, Ethiopia.'}
              </p>
            </div>{' '}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#ffffff',
                  }}
                >
                  {'PRODUCT'}
                </span>{' '}
                <A href="#features" style={{ color: '#9aa3b5', textDecoration: 'none' }}>
                  {'Features'}
                </A>{' '}
                <A href="#pricing" style={{ color: '#9aa3b5', textDecoration: 'none' }}>
                  {'Pricing'}
                </A>{' '}
                <A href="#faq" style={{ color: '#9aa3b5', textDecoration: 'none' }}>
                  {'FAQ'}
                </A>
              </div>{' '}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#ffffff',
                  }}
                >
                  {'CONTACT'}
                </span>{' '}
                <A href="#contact" style={{ color: '#9aa3b5', textDecoration: 'none' }}>
                  {'[Phone]'}
                </A>{' '}
                <A href="#contact" style={{ color: '#9aa3b5', textDecoration: 'none' }}>
                  {'[Email]'}
                </A>{' '}
                <A href="#contact" style={{ color: '#9aa3b5', textDecoration: 'none' }}>
                  {'Telegram'}
                </A>
              </div>{' '}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#ffffff',
                  }}
                >
                  {'LEGAL'}
                </span>{' '}
                <A href="#privacy" style={{ color: '#9aa3b5', textDecoration: 'none' }}>
                  {'Privacy'}
                </A>{' '}
                <A href="#terms" style={{ color: '#9aa3b5', textDecoration: 'none' }}>
                  {'Terms'}
                </A>
              </div>
            </div>
          </div>{' '}
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '16px 24px 32px',
              fontSize: '13px',
              borderTop: '1px solid #2c3650',
            }}
          >
            {'© 2026 Temelash Card · Modern Ethiopia Marketing PLC'}
          </div>
        </footer>
        <AuthModal
          isOpen={Boolean(__v?.authModalOpen)}
          initialTab={__v?.authModalOpen === 'signup' ? 'signup' : 'signin'}
          onClose={__v?.closeAuthModal}
        />
        <DemoModal
          isOpen={Boolean(__v?.demoModalOpen)}
          onClose={__v?.closeDemoModal}
        />
      </div>
    </>
  );
}
