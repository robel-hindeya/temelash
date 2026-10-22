'use client';
/* Generated from the Temelash Card design (AdminSidebar.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';

const __CSS = 'body{margin:0}';
class AdminSidebarView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { open: false, w: null, acct: false };
  }
  componentDidMount() {
    this.onResize = () => this.setState({ w: window.innerWidth });
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }
  componentWillUnmount() {
    if (this.onResize) window.removeEventListener('resize', this.onResize);
  }
  renderVals() {
    const active = this.props.active ?? 'overview';
    const mk = (id, label, href, icon, badge) => {
      const on = id === active;
      return {
        id,
        label,
        href,
        icon,
        badge: badge ? String(badge) : '',
        hasBadge: !!badge,
        current: on ? 'page' : 'false',
        bg: on ? '#1b2436' : 'transparent',
        weight: on ? '700' : '600',
        iconColor: on ? '#ff5a63' : '#9aa3b5',
      };
    };
    const groups = [
      {
        title: 'PLATFORM',
        items: [
          mk('overview', 'Overview', '/admin', 'M3 11l9-7 9 7M5 9.5V20h5v-6h4v6h5V9.5'),
          mk('analytics', 'Platform analytics', '/admin/analytics', 'M5 20V11M11 20V5M17 20v-8M3 20h18'),
        ],
      },
      {
        title: 'MERCHANTS',
        items: [
          mk('businesses', 'Businesses', '/admin/businesses', 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6'),
          mk(
            'applications',
            'Applications',
            '/admin/applications',
            'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
            3,
          ),
          mk('billing', 'Subscriptions & billing', '/admin/billing', 'M2 6h20v12H2zM2 10h20M6 15h4'),
          mk(
            'broadcast',
            'Announcements',
            '/admin/announcements',
            'M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1zM17 9a4 4 0 0 1 0 6',
          ),
        ],
      },
      {
        title: 'OPERATIONS',
        items: [
          mk('orders', 'Shop orders', '/admin/orders', 'M5 7h14l-1 13H6zM9 7V5a3 3 0 0 1 6 0v2', 4),
          mk('support', 'Support inbox', '/admin/support', 'M4 5h16v11H8l-4 4z', 5),
          mk(
            'settings',
            'Platform settings',
            '/admin/settings',
            'M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M15 4v4M9 10v4M17 16v4',
          ),
        ],
      },
    ];
    const all = groups.reduce((a, g) => a.concat(g.items), []);
    const cur = all.find((x) => x.id === active) || all[0];
    const open = this.state.open;
    const w = this.state.w ?? 1440;
    const mobile = w < 1024 && w > 300;
    return {
      groups,
      activeLabel: cur.label,
      topDisplay: mobile ? 'flex' : 'none',
      navDisplay: !mobile || open ? 'flex' : 'none',
      navMinH: mobile ? '0' : '640px',
      expanded: open ? 'true' : 'false',
      menuLabel: open ? 'Close' : 'Menu',
      menuIcon: open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16',
      toggle: () => this.setState({ open: !open }),
      acctOpen: this.state.acct,
      acctExpanded: this.state.acct ? 'true' : 'false',
      toggleAcct: () => this.setState({ acct: !this.state.acct }),
    };
  }
}

AdminSidebarView.defaultProps = { active: 'overview' };
AdminSidebarView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#ffffff',
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: `${__t(__v?.topDisplay)}`,
            width: '100%',
            boxSizing: 'border-box',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '10px 16px',
            background: '#101827',
            borderBottom: '1px solid #2c3650',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
            <svg width="28" height="28" viewBox="0 0 40 40" aria-hidden="true">
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
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '18px', minWidth: '0' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', color: '#9aa3b5' }}>
                {'TEMELASH ADMIN'}
              </span>
              <span
                style={{ fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >{`${__t(__v?.activeLabel)}`}</span>
            </span>
          </div>{' '}
          <button
            type="button"
            onClick={__v?.toggle}
            aria-expanded={__v?.expanded}
            aria-controls="ad-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #2c3650',
              background: '#1b2436',
              color: '#ffffff',
              fontWeight: '700',
              borderRadius: '12px',
              padding: '8px 14px',
              minHeight: '44px',
              cursor: 'pointer',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={__v?.menuIcon} />
            </svg>
            {`${__t(__v?.menuLabel)}`}
          </button>
        </div>{' '}
        <nav
          id="ad-nav"
          aria-label="Admin"
          style={{
            background: '#101827',
            boxSizing: 'border-box',
            width: '100%',
            flex: '1 1 auto',
            minHeight: `${__t(__v?.navMinH)}`,
            padding: '20px 14px',
            display: `${__t(__v?.navDisplay)}`,
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
            <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
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
                fontSize: '13px',
                lineHeight: '13px',
              }}
            >
              {'TEMELASH'}
              <span>{'CARD'}</span>
            </span>{' '}
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                color: '#101827',
                background: '#ffffff',
                borderRadius: '999px',
                padding: '1px 8px',
              }}
            >
              {'ADMIN'}
            </span>
          </div>{' '}
          {(__v?.groups || []).map((g, __i0) => (
            <React.Fragment key={__i0}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#9aa3b5',
                    padding: '4px 12px',
                  }}
                >{`${__t(g?.title)}`}</span>{' '}
                {(g?.items || []).map((item, __i1) => (
                  <React.Fragment key={__i1}>
                    <A
                      href={item?.href}
                      aria-current={item?.current}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '9px 12px',
                        minHeight: '44px',
                        boxSizing: 'border-box',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: `${__t(item?.weight)}`,
                        color: '#ffffff',
                        background: `${__t(item?.bg)}`,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={item?.iconColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={item?.icon} />
                      </svg>{' '}
                      <span style={{ flex: '1 1 auto' }}>{`${__t(item?.label)}`}</span>{' '}
                      {__b(item?.hasBadge) ? (
                        <>
                          <span
                            style={{
                              minWidth: '22px',
                              height: '22px',
                              borderRadius: '999px',
                              background: '#e42330',
                              color: '#ffffff',
                              fontSize: '12px',
                              fontWeight: '800',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0 6px',
                              boxSizing: 'border-box',
                            }}
                          >{`${__t(item?.badge)}`}</span>
                        </>
                      ) : null}
                    </A>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}{' '}
          <div
            style={{ marginTop: 'auto', position: 'relative', display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {__b(__v?.acctOpen) ? (
              <>
                <div
                  role="menu"
                  aria-label="Admin account"
                  style={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    bottom: '60px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: '5',
                  }}
                >
                  <A
                    role="menuitem"
                    href="/admin/settings"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      minHeight: '44px',
                      boxSizing: 'border-box',
                      borderRadius: '8px',
                      color: '#101827',
                      textDecoration: 'none',
                      fontWeight: '600',
                    }}
                  >
                    {'Admin team & roles'}
                  </A>{' '}
                  <A
                    role="menuitem"
                    href="/business"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      minHeight: '44px',
                      boxSizing: 'border-box',
                      borderRadius: '8px',
                      color: '#101827',
                      textDecoration: 'none',
                      fontWeight: '600',
                    }}
                  >
                    {'Open a merchant dashboard'}
                  </A>{' '}
                  <div style={{ height: '1px', background: '#e3e5ec', margin: '4px 6px' }} />{' '}
                  <A
                    role="menuitem"
                    href="/"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      minHeight: '44px',
                      boxSizing: 'border-box',
                      borderRadius: '8px',
                      color: '#c81d29',
                      textDecoration: 'none',
                      fontWeight: '700',
                    }}
                  >
                    {'Sign out'}
                  </A>
                </div>
              </>
            ) : null}{' '}
            <button
              type="button"
              onClick={__v?.toggleAcct}
              aria-haspopup="menu"
              aria-expanded={__v?.acctExpanded}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 8px',
                minHeight: '48px',
                border: '1px solid #2c3650',
                background: '#1b2436',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#ffffff',
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '999px',
                  background: '#ffffff',
                  color: '#101827',
                  fontWeight: '800',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                }}
              >
                {'RH'}
              </span>{' '}
              <span
                style={{
                  flex: '1 1 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '14px',
                  lineHeight: '18px',
                }}
              >
                <span style={{ fontWeight: '700' }}>{'[Admin name]'}</span>
                <span style={{ color: '#9aa3b5' }}>{'Super admin'}</span>
              </span>{' '}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9aa3b5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 14l5-5 5 5" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default withDCStyle(AdminSidebarView, 'AdminSidebar', __CSS);
