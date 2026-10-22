'use client';
/* Generated from the Temelash Card design (AdminSettings.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-hide-sm{display:none !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.lbl{font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.08em;color:#5b6475}\n.btn{border:1px solid #e3e5ec;background:#ffffff;color:#101827;font-weight:700;border-radius:12px;padding:8px 14px;min-height:44px;cursor:pointer}\n.btn-p{border:0;background:#e42330;color:#ffffff;font-weight:700;border-radius:12px;padding:8px 18px;min-height:44px;cursor:pointer}\n.btn-l{border:0;background:transparent;color:#4661ad;font-weight:700;min-height:44px;cursor:pointer;padding:8px 6px}\n.fld{border:1px solid #e3e5ec;border-radius:12px;padding:10px 12px;min-height:44px;background:#ffffff;color:#101827;box-sizing:border-box;width:100%}\n.fl{display:flex;flex-direction:column;gap:4px;font-size:14px;font-weight:600}\n.card{background:#ffffff;border:1px solid #e3e5ec;border-radius:12px;padding:20px 24px;display:flex;flex-direction:column;gap:14px;min-width:0}';
class AdminSettingsView extends DCLogic {
  constructor(props) {
    super(props);
    this.saved = {
      trial: '14',
      yearly: '20',
      plans: [
        {
          id: 'Starter',
          count: 58,
          price: '',
          branches: '1',
          staff: '3',
          offers: '2 a month',
          holders: 'Unlimited',
          visible: true,
        },
        {
          id: 'Growth',
          count: 37,
          price: '',
          branches: '2',
          staff: '10',
          offers: 'Unlimited',
          holders: 'Unlimited',
          visible: true,
        },
        {
          id: 'Multi-branch',
          count: 12,
          price: '',
          branches: 'Unlimited',
          staff: 'Unlimited',
          offers: 'Unlimited',
          holders: 'Unlimited',
          visible: true,
        },
      ],
      products: [
        { id: 'p1', name: 'Counter stand (A5 acrylic)', price: '', lead: '3–5 days', stock: true },
        { id: 'p2', name: 'Table sticker (10 pack)', price: '', lead: '1–2 days', stock: true },
        { id: 'p3', name: 'Window decal', price: '', lead: '3–5 days', stock: true },
        { id: 'p4', name: 'Staff phone (Android, set up)', price: '', lead: '1 week', stock: false },
      ],
      methods: [
        {
          id: 'telebirr',
          label: 'Telebirr',
          help: 'Merchant pays from the Telebirr app; auto-pay for monthly plans',
          on: true,
          f: { 'Merchant short code': '', 'Account name': 'Temelash Card' },
        },
        {
          id: 'cbe',
          label: 'Bank transfer · CBE',
          help: 'Merchant sends the reference; finance confirms in Billing',
          on: true,
          f: { 'Account number': '', 'Account name': 'Temelash Card' },
        },
        {
          id: 'awash',
          label: 'Bank transfer · Awash',
          help: 'Same flow as CBE',
          on: true,
          f: { 'Account number': '', 'Account name': 'Temelash Card' },
        },
        {
          id: 'cash',
          label: 'Cash on delivery (Shop only)',
          help: 'Driver collects when delivering stands and stickers',
          on: true,
          f: {},
        },
        {
          id: 'card',
          label: 'Card payments',
          help: 'Visa / Mastercard through a payment provider',
          on: false,
          f: { Provider: '' },
        },
      ],
      flags: {
        apple: 'all',
        google: 'all',
        web: 'all',
        amharic: 'all',
        double: 'all',
        birthday: 'beta',
        landing: 'all',
        email: 'off',
        sms: 'off',
        menu: 'off',
      },
    };
    this.state = Object.assign(JSON.parse(JSON.stringify(this.saved)), {
      tab: 'plans',
      toast: null,
      invEmail: '',
      invRole: 'Support',
      invErr: '',
      auditWho: 'all',
      team: [
        { id: 'u1', name: '[Admin name]', email: '[admin email]', role: 'Super admin', seen: 'online now', self: true },
        { id: 'u2', name: 'Meron', email: 'meron@temelash.card', role: 'Support', seen: 'active 5 min ago' },
        { id: 'u3', name: 'Kidus', email: 'kidus@temelash.card', role: 'Operations', seen: 'active today' },
        { id: 'u4', name: 'Saba', email: 'saba@temelash.card', role: 'Finance', seen: 'active yesterday' },
      ],
      audit: [
        { at: 'Today 09:20', who: 'Meron', what: 'Replied to ticket #2290 (Selam Salon)' },
        { at: 'Today 08:58', who: 'Saba', what: 'Confirmed payment FT26291XK8Q2 for Habesha Bites' },
        { at: 'Today 08:31', who: '[Admin name]', what: 'Approved application: Arada Coffee (14-day trial)' },
        { at: 'Yesterday', who: 'Kidus', what: 'Moved order SO-1043 to Out for delivery' },
        { at: 'Yesterday', who: '[Admin name]', what: 'Turned Birthday rewards on for test group' },
        { at: 'Mon', who: 'Saba', what: 'Extended trial for Lime Spa by 7 days' },
      ],
    });
  }
  componentWillUnmount() {
    clearTimeout(this.tt);
  }
  flash(t) {
    clearTimeout(this.tt);
    this.setState({ toast: t });
    this.tt = setTimeout(() => this.setState({ toast: null }), 4000);
  }
  log(what) {
    return [{ at: 'Today ' + new Date().toTimeString().slice(0, 5), who: '[Admin name]', what }].concat(
      this.state.audit,
    );
  }
  renderVals() {
    const s = this.state;
    const chip = (on) => ({
      pressed: on ? 'true' : 'false',
      bg: on ? '#101827' : '#ffffff',
      color: on ? '#ffffff' : '#101827',
      border: on ? '#101827' : '#e3e5ec',
    });
    const tabDefs = [
      ['plans', 'Plans & prices'],
      ['shop', 'Shop catalogue'],
      ['pay', 'Payment methods'],
      ['feat', 'Feature switches'],
      ['team', 'Admin team & roles'],
      ['audit', 'Audit log'],
    ];
    const tabs = tabDefs.map(([id, label]) =>
      Object.assign({ label, pick: () => this.setState({ tab: id }) }, chip(s.tab === id)),
    );
    const cur = JSON.stringify({
      trial: s.trial,
      yearly: s.yearly,
      plans: s.plans,
      products: s.products,
      methods: s.methods,
      flags: s.flags,
    });
    const sv = JSON.stringify(this.saved);
    const dirty = cur !== sv;
    const changed = [];
    if (
      s.trial !== this.saved.trial ||
      s.yearly !== this.saved.yearly ||
      JSON.stringify(s.plans) !== JSON.stringify(this.saved.plans)
    )
      changed.push('plans');
    if (JSON.stringify(s.products) !== JSON.stringify(this.saved.products)) changed.push('shop catalogue');
    if (JSON.stringify(s.methods) !== JSON.stringify(this.saved.methods)) changed.push('payment methods');
    if (JSON.stringify(s.flags) !== JSON.stringify(this.saved.flags)) changed.push('feature switches');
    const sw = (on) => ({ track: on ? '#101827' : '#c7cad3', knob: on ? '19px' : '3px', aria: on ? 'true' : 'false' });
    const setPlan = (id, patch) =>
      this.setState({ plans: s.plans.map((p) => (p.id === id ? Object.assign({}, p, patch) : p)) });
    const plans = s.plans.map((p) => {
      const v = sw(p.visible);
      const price = p.price.replace(/[^0-9]/g, '');
      const yearlyLine = price
        ? 'Yearly: ETB ' +
          Math.round(price * 12 * (1 - s.yearly / 100)).toLocaleString('en-US') +
          (s.yearly !== '0' ? ' (' + s.yearly + '% off)' : '')
        : 'Yearly price is worked out from the monthly price.';
      const lim = (label, key, options) => ({
        label,
        value: p[key],
        options,
        onChange: (e) => setPlan(p.id, { [key]: e.target.value }),
      });
      return {
        name: p.id,
        count: String(p.count),
        price: p.price,
        onPrice: (e) => setPlan(p.id, { price: e.target.value.replace(/[^0-9]/g, '') }),
        yearlyLine,
        border: p.visible ? '#e3e5ec' : '#c7cad3',
        limits: [
          lim('Branches', 'branches', ['1', '2', '5', 'Unlimited']),
          lim('Staff logins', 'staff', ['3', '5', '10', 'Unlimited']),
          lim('Offers', 'offers', ['2 a month', '4 a month', 'Unlimited']),
          lim('Card holders', 'holders', ['500', '2,000', 'Unlimited']),
        ],
        visAria: v.aria,
        track: v.track,
        knob: v.knob,
        visLabel: p.visible ? 'Shown to new sign-ups' : 'Hidden (existing merchants keep it)',
        toggleVis: () => setPlan(p.id, { visible: !p.visible }),
      };
    });
    const setProd = (id, patch) =>
      this.setState({ products: s.products.map((p) => (p.id === id ? Object.assign({}, p, patch) : p)) });
    const products = s.products.map((p) => {
      const v = sw(p.stock);
      return Object.assign({}, p, {
        aria: v.aria,
        track: v.track,
        knob: v.knob,
        stockLabel: p.stock ? 'In stock' : 'Out of stock',
        onName: (e) => setProd(p.id, { name: e.target.value }),
        onPrice: (e) => setProd(p.id, { price: e.target.value.replace(/[^0-9]/g, '') }),
        onLead: (e) => setProd(p.id, { lead: e.target.value }),
        toggle: () => setProd(p.id, { stock: !p.stock }),
        remove: () => this.setState({ products: s.products.filter((x) => x.id !== p.id) }),
      });
    });
    const setM = (id, patch) =>
      this.setState({ methods: s.methods.map((m) => (m.id === id ? Object.assign({}, m, patch) : m)) });
    const methods = s.methods.map((m) => {
      const v = sw(m.on);
      return {
        label: m.label,
        help: m.help,
        on: m.on && Object.keys(m.f).length > 0,
        aria: v.aria,
        track: v.track,
        knob: v.knob,
        toggle: () => setM(m.id, { on: !m.on }),
        fields: Object.keys(m.f).map((k) => ({
          label: k,
          value: m.f[k],
          ph: k === 'Account name' ? '' : '[' + k + ']',
          onInput: (e) => setM(m.id, { f: Object.assign({}, m.f, { [k]: e.target.value }) }),
        })),
      };
    });
    const flagDefs = [
      ['apple', 'Apple Wallet cards', 'Customers save the card to Apple Wallet'],
      ['google', 'Google Wallet cards', 'Customers save the card to Google Wallet'],
      ['web', 'Web card', 'For customers without a wallet app'],
      ['amharic', 'Amharic everywhere', 'አማርኛ in the customer card, landing page and dashboard'],
      ['double', 'Double stamp days', 'Offers & reminders > Double stamps'],
      ['birthday', 'Birthday rewards', 'Sign-up asks for birthday; owner sets the gift'],
      ['landing', 'QR landing page editor', 'Landing page with stamp card and Instagram buttons'],
      ['email', 'Email messages', 'Needs an email provider before it can be turned on', true],
      ['sms', 'SMS messages', 'Needs an SMS provider before it can be turned on', true],
      ['menu', 'Menu on landing page', 'Not built yet', true],
    ];
    const flags = flagDefs.map(([id, label, help, locked]) => {
      const val = s.flags[id];
      const opts = [
        ['off', 'Off'],
        ['beta', 'Test group'],
        ['all', 'Everyone'],
      ].map(([v, l]) => {
        const on = val === v;
        const dis = locked && v !== 'off';
        return {
          label: l,
          pressed: on ? 'true' : 'false',
          disabled: dis ? 'true' : 'false',
          cursor: dis ? 'not-allowed' : 'pointer',
          bg: on ? '#101827' : '#ffffff',
          color: on ? '#ffffff' : dis ? '#c7cad3' : '#101827',
          pick: () => {
            if (dis) {
              this.flash(label + ' needs a provider first.');
              return;
            }
            this.setState({ flags: Object.assign({}, s.flags, { [id]: v }) });
          },
        };
      });
      return {
        label,
        help,
        opts,
        note: val === 'beta',
        noteText: 'Test group: Buna House, Selam Salon, Abyssinia Car Wash (edit the list in Businesses > notes).',
      };
    });
    const roles = ['Super admin', 'Support', 'Finance', 'Operations'];
    const initials = (n) =>
      n
        .replace(/[\[\]]/g, '')
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    const team = s.team.map((m) => ({
      name: m.name,
      email: m.email,
      seen: m.seen,
      role: m.role,
      initials: initials(m.name),
      selId: 'role-' + m.id,
      locked: m.self ? 'true' : 'false',
      canRemove: !m.self,
      onRole: (e) => {
        if (m.self) {
          this.flash("You can't change your own role.");
          return;
        }
        const v = e.target.value;
        this.setState({
          team: s.team.map((x) => (x.id === m.id ? Object.assign({}, x, { role: v }) : x)),
          audit: this.log('Changed ' + m.name + "'s role to " + v),
        });
        this.flash(m.name + ' is now ' + v + '.');
      },
      remove: () => {
        this.setState({
          team: s.team.filter((x) => x.id !== m.id),
          audit: this.log('Removed ' + m.name + ' from the admin team'),
        });
        this.flash(m.name + ' removed. Their sign-in stops working now.');
      },
    }));
    const perms = [
      ['Approve or reject applications', [1, 1, 0, 0]],
      ['Suspend a business', [1, 0, 0, 0]],
      ['Extend trials, change plans', [1, 1, 1, 0]],
      ['Confirm payments and refunds', [1, 0, 1, 0]],
      ['Move shop orders', [1, 0, 0, 1]],
      ['Reply to support tickets', [1, 1, 0, 1]],
      ['Send announcements', [1, 1, 0, 0]],
      ['Change prices and feature switches', [1, 0, 0, 0]],
      ['Manage the admin team', [1, 0, 0, 0]],
    ];
    const matrix = perms.map(([label, c]) => ({
      label,
      cells: c.map((x) => ({ t: x ? 'Yes' : '—', color: x ? '#101827' : '#c7cad3' })),
    }));
    const audit = s.audit.filter((a) => s.auditWho === 'all' || a.who === s.auditWho);
    return {
      tabs,
      tPlans: s.tab === 'plans',
      tShop: s.tab === 'shop',
      tPay: s.tab === 'pay',
      tFeat: s.tab === 'feat',
      tTeam: s.tab === 'team',
      tAudit: s.tab === 'audit',
      dirty,
      dirtyText: 'Unsaved changes to ' + changed.join(', ') + '.',
      save: () => {
        const snap = JSON.parse(cur);
        this.saved = snap;
        this.setState({ audit: this.log('Saved changes to ' + changed.join(', ')) });
        this.flash('Saved. Merchants see the changes now.');
      },
      discard: () => this.setState(JSON.parse(sv)),
      trial: s.trial,
      onTrial: (e) => this.setState({ trial: e.target.value }),
      yearly: s.yearly,
      onYearly: (e) => this.setState({ yearly: e.target.value }),
      plans,
      products,
      addProduct: () =>
        this.setState({
          products: s.products.concat([
            { id: 'p' + Date.now(), name: 'New product', price: '', lead: '3–5 days', stock: true },
          ]),
        }),
      methods,
      flags,
      team,
      roleCols: roles,
      matrix,
      invEmail: s.invEmail,
      onInvEmail: (e) => this.setState({ invEmail: e.target.value, invErr: '' }),
      invRole: s.invRole,
      onInvRole: (e) => this.setState({ invRole: e.target.value }),
      hasInvErr: !!s.invErr,
      invErr: s.invErr,
      invite: () => {
        const em = s.invEmail.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
          this.setState({ invErr: 'Enter a full email address.' });
          return;
        }
        if (s.team.some((m) => m.email === em)) {
          this.setState({ invErr: 'That person is already on the team.' });
          return;
        }
        const name = em.split('@')[0].replace(/^./, (c) => c.toUpperCase());
        this.setState({
          team: s.team.concat([{ id: 'u' + Date.now(), name, email: em, role: s.invRole, seen: 'invite sent' }]),
          invEmail: '',
          audit: this.log('Invited ' + em + ' as ' + s.invRole),
        });
        this.flash('Invite sent to ' + em + '. It expires in 7 days.');
      },
      audit,
      auditWho: s.auditWho,
      onAuditWho: (e) => this.setState({ auditWho: e.target.value }),
      hasToast: !!s.toast,
      toast: s.toast || '',
    };
  }
}

AdminSettingsView.defaultProps = {};
AdminSettingsView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1400px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <AdminSidebar active="settings" />
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
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                {'Platform settings'}
              </h1>
              <span className="lbl" style={{ border: '1px solid #e3e5ec', borderRadius: '999px', padding: '2px 10px' }}>
                {'SAMPLE DATA'}
              </span>
            </div>{' '}
            <p style={{ margin: '0', color: '#5b6475' }}>
              {
                'Plans, prices and limits, the Shop catalogue, how merchants pay, feature switches, and who on the team can do what. Every change is recorded in the audit log.'
              }
            </p>
          </div>{' '}
          <div role="tablist" aria-label="Settings sections" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(__v?.tabs || []).map((t, __i0) => (
              <React.Fragment key={__i0}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={t?.pressed}
                  onClick={t?.pick}
                  style={{
                    borderRadius: '999px',
                    padding: '6px 14px',
                    minHeight: '44px',
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
          {__b(__v?.dirty) ? (
            <>
              <div
                role="status"
                style={{
                  position: 'sticky',
                  top: '12px',
                  zIndex: '3',
                  background: '#101827',
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                }}
              >
                <span>{`${__t(__v?.dirtyText)}`}</span>{' '}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={__v?.discard}
                    style={{
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
                    {'Discard'}
                  </button>
                  <button type="button" className="btn-p" onClick={__v?.save}>
                    {'Save changes'}
                  </button>
                </div>
              </div>
            </>
          ) : null}{' '}
          {__b(__v?.tPlans) ? (
            <>
              <section className="card">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <label className="fl" style={{ flex: '0 1 200px' }}>
                    {'Free trial length'}
                    <select className="fld" value={__v?.trial} onChange={__v?.onTrial}>
                      <option value="7">{'7 days'}</option>
                      <option value="14">{'14 days'}</option>
                      <option value="30">{'30 days'}</option>
                    </select>
                  </label>{' '}
                  <label className="fl" style={{ flex: '0 1 200px' }}>
                    {'Yearly discount'}
                    <select className="fld" value={__v?.yearly} onChange={__v?.onYearly}>
                      <option value="0">{'None'}</option>
                      <option value="10">{'10%'}</option>
                      <option value="15">{'15%'}</option>
                      <option value="20">{'20% (2 months free)'}</option>
                    </select>
                  </label>{' '}
                  <span style={{ flex: '1 1 240px', alignSelf: 'flex-end', color: '#5b6475', fontSize: '14px' }}>
                    {
                      "New prices apply to new sign-ups and at each merchant's next renewal. Merchants get 14 days' notice by announcement."
                    }
                  </span>
                </div>{' '}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  {(__v?.plans || []).map((p, __i0) => (
                    <React.Fragment key={__i0}>
                      <div
                        style={{
                          flex: '1 1 240px',
                          border: `1px solid ${__t(p?.border)}`,
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center' }}
                        >
                          <span style={{ fontWeight: '800', fontSize: '18px' }}>{`${__t(p?.name)}`}</span>
                          <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(p?.count)} businesses`}</span>
                        </div>{' '}
                        <label className="fl">
                          {'Monthly price (ETB)'}
                          <input
                            className="fld"
                            inputMode="numeric"
                            value={p?.price}
                            placeholder="[ETB PRICE]"
                            onChange={p?.onPrice}
                          />
                        </label>{' '}
                        <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(p?.yearlyLine)}`}</span>{' '}
                        {(p?.limits || []).map((l, __i1) => (
                          <React.Fragment key={__i1}>
                            <label
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px',
                                fontSize: '14px',
                                fontWeight: '600',
                              }}
                            >
                              {`${__t(l?.label)}
`}
                              <select
                                className="fld"
                                value={l?.value}
                                onChange={l?.onChange}
                                style={{ width: '130px', minHeight: '40px', padding: '6px 10px' }}
                              >
                                {(l?.options || []).map((o, __i2) => (
                                  <React.Fragment key={__i2}>
                                    <option value={o}>{`${__t(o)}`}</option>
                                  </React.Fragment>
                                ))}
                              </select>
                            </label>
                          </React.Fragment>
                        ))}{' '}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={p?.visAria}
                          onClick={p?.toggleVis}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            border: '0',
                            background: 'transparent',
                            padding: '4px 0',
                            minHeight: '44px',
                            cursor: 'pointer',
                            color: '#101827',
                            textAlign: 'left',
                          }}
                        >
                          <span
                            style={{
                              width: '40px',
                              height: '24px',
                              borderRadius: '999px',
                              background: `${__t(p?.track)}`,
                              position: 'relative',
                              flex: 'none',
                            }}
                          >
                            <span
                              style={{
                                position: 'absolute',
                                top: '3px',
                                left: `${__t(p?.knob)}`,
                                width: '18px',
                                height: '18px',
                                borderRadius: '999px',
                                background: '#ffffff',
                              }}
                            />
                          </span>
                          <span style={{ fontSize: '14px', fontWeight: '600' }}>{`${__t(p?.visLabel)}`}</span>
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tShop) ? (
            <>
              <section className="card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Shop catalogue'}</h2>
                    <span style={{ color: '#5b6475', fontSize: '14px' }}>
                      {'What merchants can order from their Shop page.'}
                    </span>
                  </div>
                  <button type="button" className="btn" onClick={__v?.addProduct}>
                    {'Add a product'}
                  </button>
                </div>{' '}
                {(__v?.products || []).map((p, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '12px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        alignItems: 'flex-end',
                      }}
                    >
                      <label className="fl" style={{ flex: '2 1 200px' }}>
                        {'Product'}
                        <input className="fld" value={p?.name} onChange={p?.onName} />
                      </label>{' '}
                      <label className="fl" style={{ flex: '1 1 120px' }}>
                        {'Price (ETB)'}
                        <input
                          className="fld"
                          inputMode="numeric"
                          value={p?.price}
                          placeholder="[ETB PRICE]"
                          onChange={p?.onPrice}
                        />
                      </label>{' '}
                      <label className="fl" style={{ flex: '1 1 120px' }}>
                        {'Lead time'}
                        <select className="fld" value={p?.lead} onChange={p?.onLead}>
                          <option value="1–2 days">{'1–2 days'}</option>
                          <option value="3–5 days">{'3–5 days'}</option>
                          <option value="1 week">{'1 week'}</option>
                        </select>
                      </label>{' '}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={p?.aria}
                        onClick={p?.toggle}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: '0',
                          background: 'transparent',
                          minHeight: '44px',
                          cursor: 'pointer',
                          color: '#101827',
                        }}
                      >
                        <span
                          style={{
                            width: '40px',
                            height: '24px',
                            borderRadius: '999px',
                            background: `${__t(p?.track)}`,
                            position: 'relative',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              top: '3px',
                              left: `${__t(p?.knob)}`,
                              width: '18px',
                              height: '18px',
                              borderRadius: '999px',
                              background: '#ffffff',
                            }}
                          />
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>{`${__t(p?.stockLabel)}`}</span>
                      </button>{' '}
                      <button type="button" className="btn-l" onClick={p?.remove} style={{ color: '#c81d29' }}>
                        {'Remove'}
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tPay) ? (
            <>
              <section className="card">
                <div>
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'How merchants pay'}</h2>
                  <span style={{ color: '#5b6475', fontSize: '14px' }}>
                    {
                      'Turn methods on and set the account details merchants see on the pay screen. [Confirm payment options]'
                    }
                  </span>
                </div>{' '}
                {(__v?.methods || []).map((m, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      <button
                        type="button"
                        role="switch"
                        aria-checked={m?.aria}
                        onClick={m?.toggle}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          border: '0',
                          background: 'transparent',
                          padding: '0',
                          minHeight: '44px',
                          cursor: 'pointer',
                          color: '#101827',
                          textAlign: 'left',
                        }}
                      >
                        <span
                          style={{
                            width: '40px',
                            height: '24px',
                            borderRadius: '999px',
                            background: `${__t(m?.track)}`,
                            position: 'relative',
                            flex: 'none',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              top: '3px',
                              left: `${__t(m?.knob)}`,
                              width: '18px',
                              height: '18px',
                              borderRadius: '999px',
                              background: '#ffffff',
                            }}
                          />
                        </span>
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '700' }}>{`${__t(m?.label)}`}</span>
                          <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(m?.help)}`}</span>
                        </span>
                      </button>{' '}
                      {__b(m?.on) ? (
                        <>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingLeft: '52px' }}>
                            {(m?.fields || []).map((f, __i1) => (
                              <React.Fragment key={__i1}>
                                <label className="fl" style={{ flex: '1 1 200px' }}>
                                  {`${__t(f?.label)}`}
                                  <input className="fld" value={f?.value} placeholder={f?.ph} onChange={f?.onInput} />
                                </label>
                              </React.Fragment>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tFeat) ? (
            <>
              <section className="card">
                <div>
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Feature switches'}</h2>
                  <span style={{ color: '#5b6475', fontSize: '14px' }}>
                    {
                      'Turn features on for everyone, only for a test group, or off. Off features show as "Coming soon" to merchants.'
                    }
                  </span>
                </div>{' '}
                {(__v?.flags || []).map((f, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700' }}>{`${__t(f?.label)}`}</span>
                        <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(f?.help)}`}</span>
                      </span>{' '}
                      <div
                        role="radiogroup"
                        aria-label={f?.label}
                        style={{
                          display: 'flex',
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          overflow: 'hidden',
                        }}
                      >
                        {(f?.opts || []).map((o, __i1) => (
                          <React.Fragment key={__i1}>
                            <button
                              type="button"
                              role="radio"
                              aria-checked={o?.pressed}
                              onClick={o?.pick}
                              aria-disabled={o?.disabled}
                              style={{
                                border: '0',
                                padding: '8px 14px',
                                minHeight: '44px',
                                cursor: `${__t(o?.cursor)}`,
                                fontWeight: '700',
                                fontSize: '14px',
                                background: `${__t(o?.bg)}`,
                                color: `${__t(o?.color)}`,
                              }}
                            >{`${__t(o?.label)}`}</button>
                          </React.Fragment>
                        ))}
                      </div>{' '}
                      {__b(f?.note) ? (
                        <>
                          <span
                            style={{ flex: '1 1 100%', fontSize: '13px', color: '#5b6475' }}
                          >{`${__t(f?.noteText)}`}</span>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tTeam) ? (
            <>
              <section className="card">
                <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Admin team'}</h2>{' '}
                {(__v?.team || []).map((m, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        paddingTop: '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '999px',
                          background: '#101827',
                          color: '#ffffff',
                          fontWeight: '800',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 'none',
                        }}
                      >{`${__t(m?.initials)}`}</span>{' '}
                      <span style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700' }}>{`${__t(m?.name)}`}</span>
                        <span
                          style={{ fontSize: '14px', color: '#5b6475' }}
                        >{`${__t(m?.email)} · ${__t(m?.seen)}`}</span>
                      </span>{' '}
                      <label
                        style={{
                          position: 'absolute',
                          width: '1px',
                          height: '1px',
                          overflow: 'hidden',
                          clip: 'rect(0 0 0 0)',
                        }}
                        htmlFor={m?.selId}
                      >{`Role for ${__t(m?.name)}`}</label>{' '}
                      <select
                        id={m?.selId}
                        className="fld"
                        value={m?.role}
                        onChange={m?.onRole}
                        style={{ width: '170px' }}
                        aria-disabled={m?.locked}
                      >
                        <option value="Super admin">{'Super admin'}</option>
                        <option value="Support">{'Support'}</option>
                        <option value="Finance">{'Finance'}</option>
                        <option value="Operations">{'Operations'}</option>
                      </select>{' '}
                      {__b(m?.canRemove) ? (
                        <>
                          <button type="button" className="btn-l" onClick={m?.remove} style={{ color: '#c81d29' }}>
                            {'Remove'}
                          </button>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}{' '}
                <div
                  style={{
                    borderTop: '1px solid #e3e5ec',
                    paddingTop: '14px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    alignItems: 'flex-end',
                  }}
                >
                  <label className="fl" style={{ flex: '2 1 220px' }}>
                    {'Invite by email'}
                    <input
                      className="fld"
                      type="email"
                      value={__v?.invEmail}
                      placeholder="name@temelash.card"
                      onChange={__v?.onInvEmail}
                    />
                  </label>{' '}
                  <label className="fl" style={{ flex: '1 1 160px' }}>
                    {'Role'}
                    <select className="fld" value={__v?.invRole} onChange={__v?.onInvRole}>
                      <option value="Support">{'Support'}</option>
                      <option value="Finance">{'Finance'}</option>
                      <option value="Operations">{'Operations'}</option>
                      <option value="Super admin">{'Super admin'}</option>
                    </select>
                  </label>{' '}
                  <button type="button" className="btn-p" onClick={__v?.invite}>
                    {'Send invite'}
                  </button>{' '}
                  {__b(__v?.hasInvErr) ? (
                    <>
                      <span
                        role="status"
                        style={{ flex: '1 1 100%', color: '#c81d29', fontSize: '14px', fontWeight: '600' }}
                      >{`${__t(__v?.invErr)}`}</span>
                    </>
                  ) : null}
                </div>{' '}
                <div style={{ overflowX: 'auto', borderTop: '1px solid #e3e5ec', paddingTop: '14px' }}>
                  <span className="lbl">{'WHAT EACH ROLE CAN DO'}</span>{' '}
                  <table
                    style={{
                      borderCollapse: 'collapse',
                      width: '100%',
                      minWidth: '560px',
                      marginTop: '8px',
                      fontSize: '14px',
                    }}
                  >
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left', padding: '6px 0' }} className="lbl">
                          {'ACTION'}
                        </th>
                        {(__v?.roleCols || []).map((r, __i0) => (
                          <React.Fragment key={__i0}>
                            <th
                              scope="col"
                              className="lbl"
                              style={{ padding: '6px', textAlign: 'center' }}
                            >{`${__t(r)}`}</th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(__v?.matrix || []).map((row, __i0) => (
                        <React.Fragment key={__i0}>
                          <tr style={{ borderTop: '1px solid #e3e5ec' }}>
                            <td style={{ padding: '8px 0', fontWeight: '600' }}>{`${__t(row?.label)}`}</td>
                            {(row?.cells || []).map((c, __i1) => (
                              <React.Fragment key={__i1}>
                                <td
                                  style={{
                                    padding: '8px',
                                    textAlign: 'center',
                                    color: `${__t(c?.color)}`,
                                    fontWeight: '700',
                                  }}
                                >{`${__t(c?.t)}`}</td>
                              </React.Fragment>
                            ))}
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.tAudit) ? (
            <>
              <section className="card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  <h2 style={{ margin: '0', fontSize: '18px', lineHeight: '24px' }}>{'Audit log'}</h2>{' '}
                  <select
                    className="fld"
                    value={__v?.auditWho}
                    onChange={__v?.onAuditWho}
                    aria-label="Filter by person"
                    style={{ width: '200px' }}
                  >
                    <option value="all">{'Everyone'}</option>
                    <option value="[Admin name]">{'[Admin name]'}</option>
                    <option value="Meron">{'Meron'}</option>
                    <option value="Kidus">{'Kidus'}</option>
                    <option value="Saba">{'Saba'}</option>
                  </select>
                </div>{' '}
                {(__v?.audit || []).map((a, __i0) => (
                  <React.Fragment key={__i0}>
                    <div
                      style={{
                        borderTop: '1px solid #e3e5ec',
                        padding: '8px 0',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px 16px',
                      }}
                    >
                      <span style={{ flex: '0 0 120px', fontSize: '14px', color: '#5b6475' }}>{`${__t(a?.at)}`}</span>
                      <span style={{ flex: '0 0 120px', fontWeight: '700', fontSize: '14px' }}>{`${__t(a?.who)}`}</span>
                      <span style={{ flex: '1 1 260px', fontSize: '14px' }}>{`${__t(a?.what)}`}</span>
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.hasToast) ? (
            <>
              <div
                role="status"
                style={{
                  position: 'sticky',
                  bottom: '16px',
                  alignSelf: 'center',
                  background: '#101827',
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  maxWidth: '100%',
                }}
              >{`${__t(__v?.toast)}`}</div>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default withDCStyle(AdminSettingsView, 'AdminSettings', __CSS);
