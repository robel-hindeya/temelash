'use client';
/* Generated from the Temelash Card design (Customers.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main aside{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.row:hover{background:#f7f7f9}';
class CustomersView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      sel: 0,
      compose: false,
      tpl: 'reminder',
      en: null,
      am: null,
      channel: 'wallet',
      justSent: false,
      sentVia: '',
      log: {},
      extra: {},
      emails: {},
      newEmail: '',
    };
  }
  renderVals() {
    const st = this.state;
    // name, phone, stamps, visits, last, status, rewards, joined, email, wallet
    const data = [
      ['Liya M.', '+251 91 *** 4412', 9, 23, 'Today', 'close', 2, '12 Jun', 'liya.m@gmail.com', 'apple'],
      ['Selam T.', '+251 92 *** 1180', 7, 17, 'Today', 'regular', 1, '2 Jul', 'selam.t@yahoo.com', 'google'],
      ['Dawit A.', '+251 91 *** 9032', 0, 31, 'Today', 'regular', 3, '18 May', '', 'apple'],
      ['Hana G.', '+251 93 *** 2267', 1, 1, 'Today', 'new', 0, '20 Oct', 'hana.g@gmail.com', 'google'],
      ['Eyob B.', '+251 91 *** 7751', 9, 19, '3 days ago', 'close', 1, '30 Jun', 'eyob.b@outlook.com', 'google'],
      ['Meseret K.', '+251 94 *** 6609', 4, 4, '35 days ago', 'quiet', 0, '1 Aug', '', 'web'],
      ['Biniam K.', '+251 92 *** 3348', 4, 14, 'Today', 'regular', 1, '9 Jul', 'biniam.k@gmail.com', 'apple'],
      ['Tigist W.', '+251 91 *** 5120', 2, 2, '41 days ago', 'quiet', 0, '28 Aug', 'tigist.w@gmail.com', 'google'],
    ];
    data.forEach((d, i) => {
      d[2] = Math.min(10, d[2] + (st.extra[i] || 0));
      if (st.emails[i]) d[8] = st.emails[i];
    });
    const W = {
      apple: {
        short: 'Apple Wallet',
        long: 'Apple Wallet · iPhone',
        icon: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2',
      },
      google: {
        short: 'Google Wallet',
        long: 'Google Wallet · Android',
        icon: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM5 6h14M5 18h14',
      },
      web: {
        short: 'Web card',
        long: 'Web card · browser',
        icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
      },
    };
    const statusMap = {
      regular: { label: 'Regular', bg: '#ffffff', fg: '#101827', border: '#e3e5ec' },
      close: { label: '1 to reward', bg: '#fba919', fg: '#101827', border: '#fba919' },
      new: { label: 'New', bg: '#ffffff', fg: '#4661ad', border: '#4661ad' },
      quiet: { label: 'Gone quiet', bg: '#fde8e9', fg: '#c81d29', border: '#fde8e9' },
    };
    const f = st.filter;
    const filterDefs = [
      ['all', 'All', '412'],
      ['regular', 'Regulars', '96'],
      ['close', 'Close to reward', '23'],
      ['quiet', 'Gone quiet', '71'],
      ['new', 'New this week', '18'],
      ['email', 'Has email', '268'],
    ];
    const reset = { compose: false, justSent: false, en: null, am: null, newEmail: '', pvTab: null };
    const filters = filterDefs.map(([id, label, n]) => ({
      label,
      n,
      pressed: id === f ? 'true' : 'false',
      bg: id === f ? '#101827' : '#ffffff',
      color: id === f ? '#ffffff' : '#101827',
      border: id === f ? '#101827' : '#e3e5ec',
      pick: () => this.setState(Object.assign({ filter: id, sel: null }, reset)),
    }));
    const visible = data
      .map((d, i) => ({ d, i }))
      .filter(({ d }) => f === 'all' || (f === 'email' ? !!d[8] : d[5] === f));
    const selIdx = st.sel !== null && visible.some((v) => v.i === st.sel) ? st.sel : visible[0] ? visible[0].i : 0;
    const ini = (n) =>
      n
        .split(' ')
        .map((p) => p.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();
    const rows = visible.map(({ d, i }) => {
      const sm = statusMap[d[5]];
      return {
        name: d[0],
        phone: d[1],
        email: d[8] || 'No email',
        emailColor: d[8] ? '#5b6475' : '#c81d29',
        ini: ini(d[0]),
        wallet: W[d[9]].short,
        walletIcon: W[d[9]].icon,
        stamps: d[2] + '/10',
        pct: d[2] * 10 + '%',
        visits: String(d[3]),
        last: d[4],
        status: sm.label,
        sBg: sm.bg,
        sFg: sm.fg,
        sBorder: sm.border,
        rowBg: i === selIdx ? '#f7f7f9' : '#ffffff',
        pick: () => this.setState(Object.assign({ sel: i }, reset)),
      };
    });
    const s = data[selIdx];
    const first = s[0].split(' ')[0];
    const hasEmail = !!s[8];
    const rem = 10 - s[2];
    const vw = rem === 1 ? 'visit' : 'visits';
    let defTpl = 'reminder';
    if (s[5] === 'quiet') defTpl = 'missyou';
    if (s[5] === 'new') defTpl = 'welcome';
    if (s[5] === 'regular') defTpl = 'thanks';
    const tplId = st.tpl;
    const texts = {
      reminder: [
        first + ', ' + rem + ' more ' + vw + ' to your free macchiato. See you soon!',
        first + '፣ ነፃ ማኪያቶ ለማግኘት ' + rem + ' ጉብኝት ብቻ ቀርቶዎታል።',
      ],
      missyou: [
        first + ', we miss you. Your next visit earns double stamps, valid until Sunday.',
        first + '፣ ናፍቀውናል። በሚቀጥለው ጉብኝትዎ ሁለት ማህተም ያገኛሉ፤ እስከ እሁድ።',
      ],
      welcome: [
        first +
          ', thanks for joining. You have ' +
          s[2] +
          ' stamp' +
          (s[2] === 1 ? '' : 's') +
          ' already, ' +
          rem +
          ' to go.',
        first + '፣ እንኳን ደህና መጡ። ' + rem + ' ማህተም ብቻ ቀርቶዎታል።',
      ],
      thanks: [
        first + ', thank you for ' + s[3] + ' visits. Your next coffee is on its way to free.',
        first + '፣ ስለ ' + s[3] + ' ጉብኝቶችዎ እናመሰግናለን።',
      ],
    };
    const tplDefs = [
      ['reminder', 'Reward reminder'],
      ['missyou', 'We miss you'],
      ['welcome', 'Welcome'],
      ['thanks', 'Thank you'],
    ];
    const tpls = tplDefs.map(([id, label]) => ({
      label,
      pressed: id === tplId ? 'true' : 'false',
      bg: id === tplId ? '#101827' : '#ffffff',
      color: id === tplId ? '#ffffff' : '#101827',
      border: id === tplId ? '#101827' : '#e3e5ec',
      pick: () => this.setState({ tpl: id, en: null, am: null }),
    }));
    const suggestions = {
      regular: 'A regular. A thank-you keeps them close.',
      close: first + ' is ' + rem + ' stamp' + (rem === 1 ? '' : 's') + ' from a reward. A reminder works best.',
      new: first + ' just joined. Welcome them back for visit two.',
      quiet: first + ' hasn’t visited in a while. Give them a reason to come back.',
    };
    const en = st.en !== null ? st.en : texts[tplId][0];
    const am = st.am !== null ? st.am : texts[tplId][1];
    const channel = 'wallet';
    const walletLabel = s[9] === 'web' ? 'Web card' : W[s[9]].short;
    const channels = [
      ['wallet', walletLabel, false],
      ['email', 'Email · coming soon', true],
      ['sms', 'SMS · coming soon', true],
    ].map(([id, label, disabled]) => ({
      label,
      disabled,
      pressed: id === channel ? 'true' : 'false',
      cursor: disabled ? 'not-allowed' : 'pointer',
      bg: id === channel ? '#101827' : '#ffffff',
      color: id === channel ? '#ffffff' : disabled ? '#5b6475' : '#101827',
      border: id === channel ? '#101827' : disabled ? '#e3e5ec' : '#e3e5ec',
      pick: () => {
        if (!disabled) this.setState({ channel: id });
      },
    }));
    const pvEmail = channel === 'email';
    const myLog = st.log[selIdx] || [];
    const history = myLog
      .map((m) => ({ what: m, when: 'Just now', dot: '#4661ad' }))
      .concat([
        { what: 'Stamp added · ' + s[2] + '/10', when: s[4], dot: '#fba919' },
        { what: 'Opened your offer: Double stamps', when: '5 days ago', dot: '#4661ad' },
        { what: 'Reward redeemed · free macchiato', when: '3 weeks ago', dot: '#e42330' },
        { what: hasEmail ? 'Shared email at sign-up' : 'Skipped email at sign-up', when: s[7], dot: '#e3e5ec' },
        { what: 'Saved card to ' + W[s[9]].short, when: s[7], dot: '#101827' },
      ]);
    const via = pvEmail ? 'email' : walletLabel;
    return {
      filters,
      rows,
      shown: rows.length + ' of ' + filterDefs.find((x) => x[0] === f)[2],
      sel: {
        name: s[0],
        first,
        phone: s[1],
        email: s[8],
        emailShown: s[8] || 'Not shared',
        emailColor: hasEmail ? '#101827' : '#c81d29',
        ini: ini(s[0]),
        stamps: s[2] + '/10',
        visits: String(s[3]),
        rewards: String(s[6]),
        joined: s[7],
        walletLong: W[s[9]].long,
        walletIcon: W[s[9]].icon,
      },
      noEmail: !hasEmail,
      newEmail: st.newEmail,
      onNewEmail: (e) => this.setState({ newEmail: e.target.value }),
      saveEmail: () => {
        if (st.newEmail.indexOf('@') > 0)
          this.setState({ emails: Object.assign({}, st.emails, { [selIdx]: st.newEmail }), newEmail: '' });
      },
      history,
      tpls,
      channels,
      en,
      am,
      suggestion: suggestions[s[5]],
      pvApple: !pvEmail && (st.pvTab || s[9]) === 'apple',
      pvGoogle: !pvEmail && (st.pvTab || s[9]) === 'google',
      pvWeb: !pvEmail && (st.pvTab || s[9]) === 'web',
      pvEmail,
      pvTabs: [
        ['apple', 'Apple'],
        ['google', 'Google'],
        ['web', 'Web card'],
      ].map(([id, label]) => {
        const on = (st.pvTab || s[9]) === id;
        return {
          label: label + (s[9] === id ? ' · theirs' : ''),
          sel: on ? 'true' : 'false',
          bg: on ? '#101827' : 'transparent',
          color: on ? '#ffffff' : '#101827',
          pick: () => this.setState({ pvTab: id }),
        };
      }),
      webHint: '. Email and SMS are coming soon.',
      previewLabel: pvEmail ? 'EMAIL TO ' + first.toUpperCase() : 'WHAT ' + first.toUpperCase() + ' SEES',
      subject: en.split(/[.!?]/)[0],
      composing: st.compose,
      notComposing: !st.compose,
      justSent: st.justSent && !st.compose,
      sentNote: 'Sent to ' + first + ' by ' + st.sentVia + '.',
      openCompose: () =>
        this.setState({ compose: true, justSent: false, tpl: defTpl, en: null, am: null, channel: 'wallet' }),
      closeCompose: () => this.setState({ compose: false }),
      onEn: (e) => this.setState({ en: e.target.value }),
      onAm: (e) => this.setState({ am: e.target.value }),
      addStamp: () =>
        this.setState({
          extra: Object.assign({}, st.extra, { [selIdx]: (st.extra[selIdx] || 0) + 1 }),
          justSent: false,
        }),
      send: () =>
        this.setState({
          compose: false,
          justSent: true,
          sentVia: via,
          log: Object.assign({}, st.log, {
            [selIdx]: ['Message by ' + via + ': ' + (en.length > 40 ? en.slice(0, 40) + '…' : en)].concat(myLog),
          }),
        }),
    };
  }
}

CustomersView.defaultProps = {};
CustomersView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1240px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <Sidebar active="customers" />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Customers'}</h1>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                    border: '1px solid #e3e5ec',
                    borderRadius: '999px',
                    padding: '2px 10px',
                  }}
                >
                  {'SAMPLE DATA'}
                </span>
              </div>{' '}
              <p style={{ margin: '0', color: '#5b6475' }}>{'412 people have your card. 268 shared an email.'}</p>
            </div>{' '}
            <A
              href="/business/offers"
              style={{
                background: '#e42330',
                color: '#ffffff',
                fontWeight: '700',
                borderRadius: '12px',
                padding: '10px 18px',
                textDecoration: 'none',
                minHeight: '44px',
                boxSizing: 'border-box',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {'Message a group'}
            </A>
          </div>{' '}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
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
              >
                {'APPLE WALLET'}
              </span>
              <span
                style={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
              >
                {'231'}
              </span>
            </div>{' '}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
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
              >
                {'GOOGLE WALLET'}
              </span>
              <span
                style={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
              >
                {'148'}
              </span>
            </div>{' '}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
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
              >
                {'WEB CARD'}
              </span>
              <span
                style={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
              >
                {'33'}
              </span>
            </div>{' '}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
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
              >
                {'SHARED AN EMAIL'}
              </span>
              <span
                style={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
              >
                {'268 '}
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#5b6475' }}>{'· 65%'}</span>
              </span>
              <A href="/business/card-design" style={{ fontSize: '14px', fontWeight: '700' }}>
                {'Change what we ask at sign-up'}
              </A>
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 260px', position: 'relative', maxWidth: '360px' }}>
              <label
                htmlFor="cu-search"
                style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
              >
                {'Search customers'}
              </label>{' '}
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
                style={{ position: 'absolute', left: '14px', top: '15px' }}
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>{' '}
              <input
                id="cu-search"
                type="search"
                placeholder="Name, phone or email"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '12px 14px 12px 40px',
                  minHeight: '48px',
                  background: '#ffffff',
                }}
              />
            </div>{' '}
            <div role="group" aria-label="Filter" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(__v?.filters || []).map((f, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    aria-pressed={f?.pressed}
                    onClick={f?.pick}
                    style={{
                      borderRadius: '999px',
                      padding: '8px 14px',
                      minHeight: '40px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      background: `${__t(f?.bg)}`,
                      color: `${__t(f?.color)}`,
                      border: `1px solid ${__t(f?.border)}`,
                    }}
                  >
                    {`${__t(f?.label)} `}
                    <span style={{ fontWeight: '600', opacity: '0.8' }}>{`${__t(f?.n)}`}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <section
              aria-label="Customer list"
              style={{
                flex: '3 1 560px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                overflowX: 'auto',
              }}
            >
              <table className="tm-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
                <thead>
                  <tr
                    style={{
                      textAlign: 'left',
                      fontSize: '12px',
                      lineHeight: '16px',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    <th scope="col" style={{ padding: '14px 16px', fontWeight: '700' }}>
                      {'CUSTOMER'}
                    </th>
                    <th scope="col" style={{ padding: '14px 12px', fontWeight: '700' }}>
                      {'CARD IN'}
                    </th>
                    <th scope="col" style={{ padding: '14px 12px', fontWeight: '700' }}>
                      {'STAMPS'}
                    </th>
                    <th
                      scope="col"
                      className="tm-hide-sm"
                      style={{ padding: '14px 12px', fontWeight: '700', textAlign: 'right' }}
                    >
                      {'VISITS'}
                    </th>
                    <th scope="col" className="tm-hide-sm" style={{ padding: '14px 12px', fontWeight: '700' }}>
                      {'LAST VISIT'}
                    </th>
                    <th scope="col" style={{ padding: '14px 16px', fontWeight: '700' }}>
                      {'STATUS'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(__v?.rows || []).map((r, __i0) => (
                    <React.Fragment key={__i0}>
                      <tr className="row" style={{ borderTop: '1px solid #e3e5ec', background: `${__t(r?.rowBg)}` }}>
                        <td style={{ padding: '12px 16px' }}>
                          <button
                            type="button"
                            onClick={r?.pick}
                            style={{
                              border: '0',
                              background: 'transparent',
                              padding: '0',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              color: '#101827',
                              textAlign: 'left',
                            }}
                          >
                            <span
                              style={{
                                width: '36px',
                                height: '36px',
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
                            >{`${__t(r?.ini)}`}</span>{' '}
                            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '20px' }}>
                              <strong>{`${__t(r?.name)}`}</strong>
                              <span
                                style={{ fontSize: '14px', color: '#5b6475', fontVariantNumeric: 'tabular-nums' }}
                              >{`${__t(r?.phone)}`}</span>
                              <span
                                style={{ fontSize: '14px', color: `${__t(r?.emailColor)}` }}
                              >{`${__t(r?.email)}`}</span>
                            </span>
                          </button>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '14px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
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
                              <path d={r?.walletIcon} />
                            </svg>
                            {`${__t(r?.wallet)}`}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              style={{
                                width: '72px',
                                height: '8px',
                                background: '#e3e5ec',
                                borderRadius: '999px',
                                overflow: 'hidden',
                              }}
                            >
                              <div
                                style={{
                                  height: '100%',
                                  width: `${__t(r?.pct)}`,
                                  background: '#fba919',
                                  borderRadius: '999px',
                                }}
                              />
                            </div>
                            <span
                              style={{ fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}
                            >{`${__t(r?.stamps)}`}</span>
                          </div>
                        </td>
                        <td
                          className="tm-hide-sm"
                          style={{ padding: '12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
                        >{`${__t(r?.visits)}`}</td>
                        <td
                          className="tm-hide-sm"
                          style={{ padding: '12px', color: '#5b6475' }}
                        >{`${__t(r?.last)}`}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              borderRadius: '999px',
                              padding: '2px 10px',
                              fontSize: '14px',
                              fontWeight: '700',
                              whiteSpace: 'nowrap',
                              background: `${__t(r?.sBg)}`,
                              color: `${__t(r?.sFg)}`,
                              border: `1px solid ${__t(r?.sBorder)}`,
                            }}
                          >{`${__t(r?.status)}`}</span>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>{' '}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderTop: '1px solid #e3e5ec',
                  fontSize: '14px',
                  color: '#5b6475',
                }}
              >
                <span>{`Showing ${__t(__v?.shown)}`}</span>
                <span style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      minHeight: '36px',
                      cursor: 'pointer',
                      color: '#101827',
                    }}
                  >
                    {'Previous'}
                  </button>
                  <button
                    type="button"
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      minHeight: '36px',
                      cursor: 'pointer',
                      color: '#101827',
                    }}
                  >
                    {'Next'}
                  </button>
                </span>
              </div>
            </section>{' '}
            <aside
              aria-label="Customer details"
              style={{
                flex: '2 1 340px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '999px',
                    background: '#101827',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none',
                  }}
                >{`${__t(__v?.sel?.ini)}`}</span>{' '}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{ fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}
                  >{`${__t(__v?.sel?.name)}`}</span>
                  <span style={{ color: '#5b6475' }}>{`Joined ${__t(__v?.sel?.joined)}`}</span>
                </div>
              </div>{' '}
              <dl
                style={{
                  margin: '0',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '8px 16px',
                  fontSize: '15px',
                }}
              >
                <dt style={{ color: '#5b6475' }}>{'Phone'}</dt>
                <dd style={{ margin: '0', fontVariantNumeric: 'tabular-nums' }}>{`${__t(__v?.sel?.phone)}`}</dd>{' '}
                <dt style={{ color: '#5b6475' }}>{'Email'}</dt>
                <dd
                  style={{ margin: '0', color: `${__t(__v?.sel?.emailColor)}` }}
                >{`${__t(__v?.sel?.emailShown)}`}</dd>{' '}
                <dt style={{ color: '#5b6475' }}>{'Card in'}</dt>
                <dd style={{ margin: '0', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                    <path d={__v?.sel?.walletIcon} />
                  </svg>
                  {`${__t(__v?.sel?.walletLong)}`}
                </dd>
              </dl>{' '}
              {__b(__v?.noEmail) ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      background: '#f7f7f9',
                      borderRadius: '12px',
                      padding: '12px 14px',
                    }}
                  >
                    <label
                      htmlFor="cu-add-email"
                      style={{ fontWeight: '700', fontSize: '14px' }}
                    >{`Add ${__t(__v?.sel?.first)}'s email`}</label>{' '}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        id="cu-add-email"
                        type="email"
                        placeholder="name@example.com"
                        value={__v?.newEmail}
                        style={{
                          flex: '1 1 auto',
                          minWidth: '0',
                          border: '1px solid #e3e5ec',
                          borderRadius: '6px',
                          padding: '10px 12px',
                          minHeight: '44px',
                          boxSizing: 'border-box',
                          background: '#ffffff',
                        }}
                        onChange={__v?.onNewEmail}
                      />{' '}
                      <button
                        type="button"
                        onClick={__v?.saveEmail}
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#4661ad',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '0 14px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Save'}
                      </button>
                    </div>{' '}
                    <span style={{ fontSize: '13px', color: '#5b6475' }}>
                      {'Only with their permission. Or ask for it at sign-up in Card design.'}
                    </span>
                  </div>
                </>
              ) : null}{' '}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
                <div
                  style={{
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
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
                  >
                    {'STAMPS'}
                  </span>
                  <span
                    style={{
                      fontSize: '28px',
                      lineHeight: '28px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(__v?.sel?.stamps)}`}</span>
                </div>{' '}
                <div
                  style={{
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
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
                  >
                    {'VISITS'}
                  </span>
                  <span
                    style={{
                      fontSize: '28px',
                      lineHeight: '28px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(__v?.sel?.visits)}`}</span>
                </div>{' '}
                <div
                  style={{
                    background: '#f7f7f9',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
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
                  >
                    {'REWARDS'}
                  </span>
                  <span
                    style={{
                      fontSize: '28px',
                      lineHeight: '28px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >{`${__t(__v?.sel?.rewards)}`}</span>
                </div>
              </div>{' '}
              {__b(__v?.justSent) ? (
                <>
                  <div
                    role="status"
                    style={{
                      background: '#f7f7f9',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      fontWeight: '700',
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4661ad"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    {`${__t(__v?.sentNote)}`}
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.notComposing) ? (
                <>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={__v?.addStamp}
                      style={{
                        flex: '1 1 140px',
                        border: '1px solid #e3e5ec',
                        background: '#ffffff',
                        color: '#4661ad',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        minHeight: '44px',
                        cursor: 'pointer',
                      }}
                    >
                      {'Add a stamp'}
                    </button>{' '}
                    <button
                      type="button"
                      onClick={__v?.openCompose}
                      style={{
                        flex: '1 1 140px',
                        border: '1px solid #e3e5ec',
                        background: '#ffffff',
                        color: '#4661ad',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        minHeight: '44px',
                        cursor: 'pointer',
                      }}
                    >{`Send ${__t(__v?.sel?.first)} a message`}</button>
                  </div>
                </>
              ) : null}{' '}
              {__b(__v?.composing) ? (
                <>
                  <div
                    style={{
                      border: '1px solid #e3e5ec',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '700' }}>
                        {'To '}
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f7f7f9',
                            border: '1px solid #e3e5ec',
                            borderRadius: '999px',
                            padding: '2px 10px 2px 4px',
                            marginLeft: '4px',
                          }}
                        >
                          <span
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '999px',
                              background: '#101827',
                              color: '#ffffff',
                              fontSize: '11px',
                              fontWeight: '800',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >{`${__t(__v?.sel?.ini)}`}</span>
                          {`${__t(__v?.sel?.name)}`}
                        </span>
                      </span>{' '}
                      <button
                        type="button"
                        aria-label="Close message"
                        onClick={__v?.closeCompose}
                        style={{
                          border: '0',
                          background: 'transparent',
                          width: '44px',
                          height: '44px',
                          cursor: 'pointer',
                          color: '#5b6475',
                          fontSize: '20px',
                        }}
                      >
                        {'×'}
                      </button>
                    </div>{' '}
                    <div
                      role="group"
                      aria-label="Message type"
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
                    >
                      {(__v?.tpls || []).map((t, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            aria-pressed={t?.pressed}
                            onClick={t?.pick}
                            style={{
                              borderRadius: '999px',
                              padding: '6px 12px',
                              minHeight: '36px',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '14px',
                              background: `${__t(t?.bg)}`,
                              color: `${__t(t?.color)}`,
                              border: `1px solid ${__t(t?.border)}`,
                            }}
                          >{`${__t(t?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.suggestion)}`}</span>{' '}
                    <div
                      role="group"
                      aria-label="Send as"
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}
                    >
                      <span style={{ fontWeight: '700', fontSize: '14px', marginRight: '4px' }}>{'Send as'}</span>{' '}
                      {(__v?.channels || []).map((c, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            aria-pressed={c?.pressed}
                            disabled={__b(c?.disabled)}
                            onClick={c?.pick}
                            style={{
                              borderRadius: '999px',
                              padding: '6px 12px',
                              minHeight: '36px',
                              cursor: `${__t(c?.cursor)}`,
                              fontWeight: '700',
                              fontSize: '14px',
                              background: `${__t(c?.bg)}`,
                              color: `${__t(c?.color)}`,
                              border: `1px solid ${__t(c?.border)}`,
                            }}
                          >{`${__t(c?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    <label htmlFor="cu-en" style={{ fontWeight: '700', fontSize: '14px' }}>
                      {'English'}
                    </label>{' '}
                    <textarea
                      id="cu-en"
                      rows="3"
                      value={__v?.en}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        resize: 'vertical',
                        color: '#101827',
                      }}
                      onChange={__v?.onEn}
                    />{' '}
                    <label htmlFor="cu-am" style={{ fontWeight: '700', fontSize: '14px' }}>
                      {'Amharic'}
                    </label>{' '}
                    <textarea
                      id="cu-am"
                      rows="2"
                      value={__v?.am}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        resize: 'vertical',
                        color: '#101827',
                        fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                        lineHeight: '27px',
                      }}
                      onChange={__v?.onAm}
                    />{' '}
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >{`PREVIEW · ${__t(__v?.previewLabel)}`}</span>{' '}
                    <div
                      role="tablist"
                      aria-label="Preview on"
                      style={{
                        display: 'flex',
                        border: '1px solid #e3e5ec',
                        borderRadius: '10px',
                        padding: '3px',
                        gap: '3px',
                      }}
                    >
                      {(__v?.pvTabs || []).map((t, __i0) => (
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
                    {__b(__v?.pvApple) ? (
                      <>
                        <div
                          style={{
                            background: '#101827',
                            borderRadius: '18px',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                          }}
                        >
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
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
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
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '14px',
                                lineHeight: '19px',
                                minWidth: '0',
                              }}
                            >
                              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{'Buna House'}</strong>
                                <span style={{ color: '#5b6475', fontSize: '12px' }}>{'now'}</span>
                              </span>
                              <span style={{ whiteSpace: 'pre-wrap' }}>{`${__t(__v?.en)}`}</span>
                              <span
                                style={{
                                  whiteSpace: 'pre-wrap',
                                  color: '#5b6475',
                                  fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                                }}
                              >{`${__t(__v?.am)}`}</span>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}{' '}
                    {__b(__v?.pvGoogle) ? (
                      <>
                        <div style={{ background: '#1b2436', borderRadius: '18px', padding: '12px' }}>
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
                            <span style={{ whiteSpace: 'pre-wrap' }}>{`${__t(__v?.en)}`}</span>
                            <span
                              style={{
                                whiteSpace: 'pre-wrap',
                                color: '#5b6475',
                                fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                              }}
                            >{`${__t(__v?.am)}`}</span>
                          </div>
                        </div>
                      </>
                    ) : null}{' '}
                    {__b(__v?.pvEmail) ? (
                      <>
                        <div
                          style={{
                            border: '1px solid #e3e5ec',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            fontSize: '14px',
                            lineHeight: '20px',
                          }}
                        >
                          <div
                            style={{
                              padding: '10px 12px',
                              borderBottom: '1px solid #e3e5ec',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <span>
                              <strong>{'Buna House'}</strong>{' '}
                              <span style={{ color: '#5b6475' }}>{'via Temelash Card'}</span>
                            </span>
                            <span style={{ color: '#5b6475' }}>{`To: ${__t(__v?.sel?.email)}`}</span>
                            <strong>{`${__t(__v?.subject)}`}</strong>
                          </div>{' '}
                          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ whiteSpace: 'pre-wrap' }}>{`${__t(__v?.en)}`}</span>
                            <span
                              style={{
                                whiteSpace: 'pre-wrap',
                                color: '#5b6475',
                                fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                              }}
                            >{`${__t(__v?.am)}`}</span>
                            <span
                              style={{
                                alignSelf: 'flex-start',
                                background: '#101827',
                                color: '#ffffff',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '8px 12px',
                              }}
                            >
                              {'Open my card'}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}{' '}
                    {__b(__v?.pvWeb) ? (
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
                              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{`${__t(__v?.sel?.stamps)}`}</span>
                            </span>{' '}
                            <span
                              style={{
                                background: '#fff3dc',
                                borderRadius: '8px',
                                padding: '8px 10px',
                                fontSize: '14px',
                                lineHeight: '19px',
                                fontWeight: '600',
                                whiteSpace: 'pre-wrap',
                              }}
                            >{`${__t(__v?.en)}`}</span>{' '}
                            <span
                              style={{
                                fontSize: '13px',
                                color: '#5b6475',
                                whiteSpace: 'pre-wrap',
                                fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                              }}
                            >{`${__t(__v?.am)}`}</span>
                          </div>{' '}
                          <span
                            style={{ fontSize: '12px', color: '#5b6475', textAlign: 'center' }}
                          >{`No lock-screen alert on web cards. ${__t(__v?.sel?.first)} sees this next time they open the card${__t(__v?.webHint)}`}</span>
                        </div>
                      </>
                    ) : null}{' '}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={__v?.closeCompose}
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#101827',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 16px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Cancel'}
                      </button>{' '}
                      <button
                        type="button"
                        onClick={__v?.send}
                        style={{
                          border: '0',
                          background: '#4661ad',
                          color: '#ffffff',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 16px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >{`Send to ${__t(__v?.sel?.first)}`}</button>
                    </div>
                  </div>
                </>
              ) : null}{' '}
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
                  {'HISTORY'}
                </span>{' '}
                {(__v?.history || []).map((h, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '10px 0',
                        borderBottom: '1px solid #e3e5ec',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '999px',
                          background: `${__t(h?.dot)}`,
                          flex: 'none',
                        }}
                      />{' '}
                      <span style={{ flex: '1 1 auto' }}>{`${__t(h?.what)}`}</span>{' '}
                      <span
                        style={{ fontSize: '14px', color: '#5b6475', whiteSpace: 'nowrap' }}
                      >{`${__t(h?.when)}`}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default withDCStyle(CustomersView, 'Customers', __CSS);
