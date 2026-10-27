'use client';
/* Generated from the Temelash Card design (AdminSettings.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import renderAdminSettings from './AdminSettings.view';

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

AdminSettingsView.prototype.__template = renderAdminSettings;

export default withDCStyle(AdminSettingsView, 'AdminSettings', __CSS);
