'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PublicLandingPage({ slug = 'sample-cafe' }) {
  const [data, setData] = useState({
    title: 'Sample Cafe',
    tagline: 'Specialty Coffee & Pastries · Bole, Addis Ababa',
    color: '#8a4b2a',
    cover: false,
    coverImg: null,
    logo: true,
    logoImg: null,
    buttons: [
      {
        id: 'card',
        label: 'Get your stamp card',
        sub: 'Free macchiato at 10 stamps · Save to wallet',
        url: '/card',
        icon: 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z',
        on: true,
      },
      {
        id: 'insta',
        label: 'Follow us on Instagram',
        sub: '@samplecafe',
        url: 'https://instagram.com',
        icon: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01',
        on: true,
      },
      {
        id: 'menu',
        label: 'View our Coffee Menu',
        sub: 'Espresso, Macchiato, Ethiopian Pour-overs & Pastries',
        url: '#menu',
        icon: 'M4 6h16M4 12h16M4 18h7',
        on: true,
      },
      {
        id: 'telegram',
        label: 'Join our Telegram Channel',
        sub: 'Daily specials & exclusive offers',
        url: 'https://t.me',
        icon: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
        on: true,
      },
    ],
  });

  useEffect(() => {
    try {
      const savedData = window.localStorage.getItem('tm-landing-data');
      const savedCover = window.localStorage.getItem('tm-landing-cover');
      const savedLogo = window.localStorage.getItem('tm-landing-logo') || window.localStorage.getItem('tm-logo');
      const bizProf = window.localStorage.getItem('tm-biz-profile');

      let parsedBizName = '';
      if (bizProf) {
        try {
          const bp = JSON.parse(bizProf);
          if (bp?.nameEn) parsedBizName = bp.nameEn;
        } catch (e) {}
      }

      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed && typeof parsed === 'object') {
            setData((prev) => ({
              ...prev,
              title: parsed.title || parsedBizName || prev.title,
              tagline: parsed.tagline !== undefined ? parsed.tagline : prev.tagline,
              color: parsed.color || prev.color,
              cover: parsed.cover !== undefined ? parsed.cover : prev.cover,
              coverImg: savedCover || parsed.coverImg || prev.coverImg,
              logo: parsed.logo !== undefined ? parsed.logo : prev.logo,
              logoImg: savedLogo || parsed.logoImg || prev.logoImg,
              buttons: Array.isArray(parsed.buttons) && parsed.buttons.length > 0 ? parsed.buttons : prev.buttons,
            }));
            return;
          }
        } catch (e) {}
      }

      // Default updates from business profile if available
      if (parsedBizName) {
        setData((prev) => ({
          ...prev,
          title: parsedBizName,
          coverImg: savedCover || prev.coverImg,
          logoImg: savedLogo || prev.logoImg,
        }));
      }
    } catch (e) {}
  }, [slug]);

  // Determine light or dark text based on background luminance
  const isDarkBg = (() => {
    try {
      const hex = (data.color || '#8a4b2a').replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) || 0;
      const g = parseInt(hex.substr(2, 2), 16) || 0;
      const b = parseInt(hex.substr(4, 2), 16) || 0;
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return lum < 0.55;
    } catch {
      return true;
    }
  })();

  const textColor = isDarkBg ? '#ffffff' : '#101827';
  const subTextColor = isDarkBg ? 'rgba(255, 255, 255, 0.85)' : '#4b5563';
  const cardBg = isDarkBg ? 'rgba(255, 255, 255, 0.96)' : '#ffffff';
  const cardFg = '#101827';

  const initial = (data.title || 'S').trim().charAt(0).toUpperCase();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: data.color || '#8a4b2a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0',
        fontFamily: "'Source Sans 3', system-ui, -apple-system, sans-serif",
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Cover Photo Header */}
        {data.cover && data.coverImg ? (
          <div
            style={{
              width: '100%',
              height: '170px',
              backgroundImage: `url(${data.coverImg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ) : null}

        {/* Profile Info Header */}
        <div
          style={{
            padding: data.cover && data.coverImg ? '0 20px 16px' : '36px 20px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: data.cover && data.coverImg ? '-42px' : '0',
          }}
        >
          {data.logo ? (
            data.logoImg ? (
              <img
                src={data.logoImg}
                alt={data.title}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '999px',
                  objectFit: 'cover',
                  border: `4px solid ${data.color || '#8a4b2a'}`,
                  background: '#ffffff',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  marginBottom: '12px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '999px',
                  background: '#ffffff',
                  color: data.color || '#8a4b2a',
                  fontWeight: '800',
                  fontSize: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `4px solid ${data.color || '#8a4b2a'}`,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  marginBottom: '12px',
                }}
              >
                {initial}
              </div>
            )
          ) : null}

          <h1
            style={{
              margin: '0 0 6px',
              fontSize: '24px',
              fontWeight: '800',
              lineHeight: 1.25,
              color: textColor,
              textShadow: isDarkBg ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {data.title}
          </h1>

          {data.tagline ? (
            <p
              style={{
                margin: '0',
                fontSize: '15px',
                color: subTextColor,
                lineHeight: 1.4,
                maxWidth: '360px',
              }}
            >
              {data.tagline}
            </p>
          ) : null}
        </div>

        {/* Action Buttons List */}
        <div
          style={{
            padding: '12px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flex: '1 0 auto',
          }}
        >
          {(data.buttons || [])
            .filter((b) => b.on !== false)
            .map((b, i) => {
              const isCardButton = b.id === 'card';
              const targetUrl = isCardButton
                ? '/card'
                : (b.url ? (b.url.startsWith('http') || b.url.startsWith('/') || b.url.startsWith('#') ? b.url : `https://${b.url}`) : '#');

              return (
                <a
                  key={b.id || i}
                  href={targetUrl}
                  target={isCardButton || targetUrl.startsWith('/') || targetUrl.startsWith('#') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    background: isCardButton ? '#ffffff' : cardBg,
                    color: cardFg,
                    borderRadius: '16px',
                    padding: '14px 18px',
                    minHeight: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    textDecoration: 'none',
                    boxShadow: isCardButton
                      ? '0 6px 18px rgba(0,0,0,0.18), 0 0 0 2px #fba919'
                      : '0 3px 10px rgba(0,0,0,0.08)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = isCardButton
                      ? '0 8px 22px rgba(0,0,0,0.22), 0 0 0 2px #fba919'
                      : '0 6px 14px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isCardButton
                      ? '0 6px 18px rgba(0,0,0,0.18), 0 0 0 2px #fba919'
                      : '0 3px 10px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Icon Tile */}
                  <span
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: isCardButton ? '#fba919' : '#f1f5f9',
                      color: isCardButton ? '#101827' : '#334155',
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
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={b.icon || 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'} />
                    </svg>
                  </span>

                  {/* Label & Subtitle */}
                  <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span
                      style={{
                        fontWeight: '800',
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: '#101827',
                      }}
                    >
                      {b.label}
                    </span>
                    {b.sub ? (
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '16px',
                          color: '#5b6475',
                          marginTop: '2px',
                        }}
                      >
                        {b.sub}
                      </span>
                    ) : null}
                  </div>

                  {/* Arrow Indicator */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flex: 'none' }}
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              );
            })}
        </div>

        {/* Footer Brand */}
        <div
          style={{
            padding: '20px 20px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: textColor,
              opacity: 0.88,
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.04em',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 40 40" aria-hidden="true">
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
            TEMELASH CARD
          </Link>
          <span style={{ fontSize: '11px', color: subTextColor, opacity: 0.7 }}>
            Digital loyalty stamp cards for local businesses
          </span>
        </div>
      </div>
    </div>
  );
}
