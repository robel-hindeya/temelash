'use client';
/* Generated from the Temelash Card design (Sidebar.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';

const __CSS = 'body{margin:0}';
class SidebarView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { open: false, w: null, profile: false, owner: '', plan: 'trial' };
  }
  componentDidMount() {
    this.onResize = () => this.setState({ w: window.innerWidth });
    window.addEventListener('resize', this.onResize);
    this.onResize();
    try {
      const n = window.localStorage.getItem('tm-owner-name');
      const p = window.localStorage.getItem('tm-plan');
      this.setState({ owner: n || '', plan: p || 'trial' });
    } catch (e) {}
  }
  componentWillUnmount() {
    if (this.onResize) window.removeEventListener('resize', this.onResize);
  }
  renderVals() {
    const active = this.props.active ?? 'overview';
    const mk = (id, label, href, icon) => {
      const on = id === active;
      return {
        id,
        label,
        href,
        icon,
        current: on ? 'page' : 'false',
        bg: on ? '#f7f7f9' : 'transparent',
        color: on ? '#e42330' : '#101827',
        weight: on ? '700' : '600',
      };
    };
    const manage = [
      mk('overview', 'Overview', '/business', 'M3 11l9-7 9 7M5 9.5V20h5v-6h4v6h5V9.5'),
      mk(
        'customers',
        'Customers',
        '/business/customers',
        'M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM22 20v-2a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8',
      ),
      mk(
        'offers',
        'Offers & reminders',
        '/business/offers',
        'M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1zM17 9a4 4 0 0 1 0 6',
      ),
      mk('analytics', 'Analytics', '/business/analytics', 'M5 20V11M11 20V5M17 20v-8M3 20h18'),
    ];
    const card = [
      mk('card', 'Card design', '/business/card-design', 'M3 6h18v13H3zM3 10h18M7 15h4'),
      mk(
        'landing',
        'QR landing page',
        '/business/landing-page',
        'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9 7h6M9 11h6M9 15h6',
      ),
      mk(
        'rewards',
        'Stamps & rewards',
        '/business/rewards',
        'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z',
      ),
      mk('qr', 'Shop', '/business/shop', 'M5 7h14l-1 13H6zM9 7V5a3 3 0 0 1 6 0v2'),
    ];
    const business = [
      mk(
        'settings',
        'Staff & settings',
        '/business/settings',
        'M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M15 4v4M9 10v4M17 16v4',
      ),
    ];
    const all = manage.concat(card, business);
    const cur = all.find((x) => x.id === active) || all[0];
    const open = this.state.open;
    const w = this.state.w ?? 1440;
    // Phone/tablet: under 1024px. A window of 300px or less is this component's own narrow artboard, so it keeps the desktop look.
    const mobile = w < 1024 && w > 300;
    const setTab = (t) => () => {
      try {
        window.sessionStorage.setItem('tm-settings-tab', t);
      } catch (e) {}
      try {
        window.dispatchEvent(new CustomEvent('tm-settings-tab', { detail: t }));
      } catch (e) {}
      this.setState({ profile: false, open: false });
    };
    const owner = (this.state.owner || '').trim();
    const paid = this.state.plan === 'monthly' || this.state.plan === 'yearly';
    return {
      planLabel: paid ? 'YOUR PLAN' : 'FREE TRIAL',
      planText: paid ? (this.state.plan === 'yearly' ? 'Yearly · active' : 'Monthly · active') : '[N] days left',
      planLink: paid ? 'Manage plan' : 'Choose a plan',
      goBilling: setTab('billing'),
      goProfile: setTab('profile'),
      profileOpen: this.state.profile,
      profileExpanded: this.state.profile ? 'true' : 'false',
      profileBorder: this.state.profile ? '#4661ad' : 'transparent',
      profileChevron: this.state.profile ? 'M7 10l5 5 5-5' : 'M7 14l5-5 5 5',
      toggleProfile: () => this.setState({ profile: !this.state.profile }),
      ownerName: owner || '[Owner name]',
      ownerIni: owner
        ? owner
            .split(/\s+/)
            .map((p) => p.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase()
        : 'OW',
      topDisplay: mobile ? 'flex' : 'none',
      navDisplay: !mobile || open ? 'flex' : 'none',
      navMinH: mobile ? '0' : '640px',
      navBorderR: mobile ? '0' : '1px solid #e3e5ec',
      navBorderB: mobile ? '1px solid #e3e5ec' : '0',
      manage,
      card,
      business,
      activeLabel: cur.label,
      navClass: open ? 'tm-side is-open' : 'tm-side',
      expanded: open ? 'true' : 'false',
      menuLabel: open ? 'Close' : 'Menu',
      menuIcon: open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16',
      toggle: () => this.setState({ open: !open }),
    };
  }
}

SidebarView.defaultProps = { active: 'overview' };
SidebarView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
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
            background: '#ffffff',
            borderBottom: '1px solid #e3e5ec',
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
                stroke="#e42330"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{' '}
            <span style={{ display: 'flex', flexDirection: 'column', minWidth: '0', lineHeight: '18px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', color: '#5b6475' }}>
                {'[YOUR BUSINESS]'}
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
            aria-controls="tm-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #e3e5ec',
              background: '#ffffff',
              color: '#101827',
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
              stroke="#101827"
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
          id="tm-nav"
          aria-label="Dashboard"
          style={{
            background: '#ffffff',
            borderRight: `${__t(__v?.navBorderR)}`,
            borderBottom: `${__t(__v?.navBorderB)}`,
            boxSizing: 'border-box',
            width: '100%',
            flex: '1 1 auto',
            minHeight: `${__t(__v?.navMinH)}`,
            padding: '20px 16px',
            display: `${__t(__v?.navDisplay)}`,
            flexDirection: 'column',
            gap: '20px',
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
                fontSize: '13px',
                lineHeight: '13px',
              }}
            >
              {'TEMELASH'}
              <span style={{ color: '#e42330' }}>{'CARD'}</span>
            </span>
          </div>{' '}
          <button
            type="button"
            style={{
              font: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              background: '#f7f7f9',
              border: '1px solid #e3e5ec',
              borderRadius: '12px',
              padding: '10px 12px',
              cursor: 'pointer',
              textAlign: 'left',
              color: '#101827',
              minHeight: '44px',
            }}
          >
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: '#101827',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              {'B'}
            </span>{' '}
            <span style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', minWidth: '0' }}>
              <span style={{ fontWeight: '700', fontSize: '15px', lineHeight: '20px' }}>{'[Your business]'}</span>
              <span style={{ fontSize: '13px', lineHeight: '16px', color: '#5b6475' }}>{'Bole branch'}</span>
            </span>{' '}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5b6475"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 10l5 5 5-5" />
            </svg>
          </button>{' '}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                color: '#5b6475',
                padding: '4px 12px',
              }}
            >
              {'MANAGE'}
            </span>{' '}
            {(__v?.manage || []).map((item, __i0) => (
              <React.Fragment key={__i0}>
                <A
                  href={item?.href}
                  aria-current={item?.current}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    minHeight: '44px',
                    boxSizing: 'border-box',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: `${__t(item?.weight)}`,
                    color: `${__t(item?.color)}`,
                    background: `${__t(item?.bg)}`,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={item?.icon} />
                  </svg>
                  {`${__t(item?.label)}`}
                </A>
              </React.Fragment>
            ))}
          </div>{' '}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                color: '#5b6475',
                padding: '4px 12px',
              }}
            >
              {'YOUR CARD'}
            </span>{' '}
            {(__v?.card || []).map((item, __i0) => (
              <React.Fragment key={__i0}>
                <A
                  href={item?.href}
                  aria-current={item?.current}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    minHeight: '44px',
                    boxSizing: 'border-box',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: `${__t(item?.weight)}`,
                    color: `${__t(item?.color)}`,
                    background: `${__t(item?.bg)}`,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={item?.icon} />
                  </svg>
                  {`${__t(item?.label)}`}
                </A>
              </React.Fragment>
            ))}
          </div>{' '}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                color: '#5b6475',
                padding: '4px 12px',
              }}
            >
              {'BUSINESS'}
            </span>{' '}
            {(__v?.business || []).map((item, __i0) => (
              <React.Fragment key={__i0}>
                <A
                  href={item?.href}
                  aria-current={item?.current}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    minHeight: '44px',
                    boxSizing: 'border-box',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: `${__t(item?.weight)}`,
                    color: `${__t(item?.color)}`,
                    background: `${__t(item?.bg)}`,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={item?.icon} />
                  </svg>
                  {`${__t(item?.label)}`}
                </A>
              </React.Fragment>
            ))}
          </div>{' '}
          <div
            style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}
          >
            <div
              style={{
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
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
              >{`${__t(__v?.planLabel)}`}</span>{' '}
              <span style={{ fontWeight: '700' }}>{`${__t(__v?.planText)}`}</span>{' '}
              <A
                href="/business/settings"
                onClick={__v?.goBilling}
                style={{ color: '#4661ad', fontWeight: '700', fontSize: '14px' }}
              >{`${__t(__v?.planLink)}`}</A>
            </div>{' '}
            {__b(__v?.profileOpen) ? (
              <>
                <div
                  role="menu"
                  aria-label="Account"
                  style={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    bottom: '60px',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: '5',
                  }}
                >
                  <A
                    role="menuitem"
                    href="/business/settings"
                    onClick={__v?.goProfile}
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#101827"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21a8 8 0 0 1 16 0" />
                    </svg>
                    {'My profile'}
                  </A>{' '}
                  <A
                    role="menuitem"
                    href="/business/settings"
                    onClick={__v?.goBilling}
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
                    <svg
                      width="18"
                      height="18"
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
                    </svg>
                    {'Plan and billing'}
                  </A>{' '}
                  <A
                    role="menuitem"
                    href="https://t.me/"
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#101827"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01" />
                    </svg>
                    {'Help on Telegram'}
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c81d29"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l-5-5 5-5M5 12h11" />
                    </svg>
                    {'Sign out'}
                  </A>
                </div>
              </>
            ) : null}{' '}
            <button
              type="button"
              onClick={__v?.toggleProfile}
              aria-haspopup="menu"
              aria-expanded={__v?.profileExpanded}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 8px',
                minHeight: '48px',
                border: `1px solid ${__t(__v?.profileBorder)}`,
                background: '#ffffff',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#101827',
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '999px',
                  background: '#f7f7f9',
                  border: '1px solid #e3e5ec',
                  fontWeight: '700',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                }}
              >{`${__t(__v?.ownerIni)}`}</span>{' '}
              <span
                style={{
                  flex: '1 1 auto',
                  minWidth: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '14px',
                  lineHeight: '18px',
                }}
              >
                <span
                  style={{ fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >{`${__t(__v?.ownerName)}`}</span>
                <span style={{ color: '#5b6475' }}>{'Owner'}</span>
              </span>{' '}
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
                <path d={__v?.profileChevron} />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default withDCStyle(SidebarView, 'Sidebar', __CSS);
