'use client';
/* Generated from the Temelash Card design (AdminBusinesses.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import api from '@/lib/api';
import renderAdminBusinesses from './AdminBusinesses.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-hide-sm{display:none !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.row:hover{background:#f7f7f9}';
class AdminBusinessesView extends DCLogic {
  constructor(props) {
    super(props);
    const merchantCodes = {
      buna: 'UXwJ9RwdyHs',
      selam: 'kP7mQ9xRtL2',
      aby: 'mK7vB2xP9Lq',
      lime: 'nQ4wT8yZ1Ca',
      habesha: 'pH3jR5tW8Xy',
      sheba: 'tL9vB2cN4Mm',
      gebeya: 'zK6wQ1sP7Tr',
      arada: 'cM4yT8uV2Wx',
      sparkle: 'wR2yU6iO8Pz',
      entoto: 'jE5tS8uV3Bx',
    };
    const B = (
      id,
      name,
      type,
      area,
      owner,
      phone,
      status,
      plan,
      joined,
      cards,
      stamps,
      branches,
      staff,
      last,
      color,
      trialEnds,
      notes,
      code,
    ) => ({
      id,
      name,
      type,
      area,
      owner,
      phone,
      status,
      plan,
      joined,
      cards,
      stamps,
      branches,
      staff,
      last,
      color,
      trialEnds,
      notes: notes || [],
      code: code || merchantCodes[id] || 'UXwJ9RwdyHs',
    });
    this.state = {
      q: '',
      type: 'all',
      sort: 'new',
      status: 'all',
      sel: 'buna',
      confirm: false,
      reason: 'Unpaid for more than 14 days',
      noteDraft: '',
      planDraft: 'Monthly',
      toast: '',
      list: [
        B(
          'buna',
          'Buna House',
          'Café',
          'Bole',
          'Hana T.',
          '+251 91 *** 0001',
          'active',
          'Monthly',
          '12 Jun',
          412,
          4272,
          1,
          2,
          'Today',
          '#8a4b2a',
          '',
          [{ text: 'Ordered 2 counter stands (#1043)', meta: 'System · 21 Oct', dot: '#4661ad' }],
        ),
        B(
          'selam',
          'Selam Salon',
          'Salon',
          'Kazanchis',
          'Selam G.',
          '+251 92 *** 1180',
          'trial',
          'Trial',
          '7 Oct',
          86,
          402,
          1,
          1,
          'Today',
          '#7a3e9d',
          '23 Oct',
        ),
        B(
          'aby',
          'Abyssinia Car Wash',
          'Car wash',
          'Megenagna',
          'Dawit A.',
          '+251 91 *** 9032',
          'pastdue',
          'Monthly',
          '3 Mar',
          640,
          3120,
          2,
          4,
          'Yesterday',
          '#4661ad',
          '',
          [{ text: 'Telebirr payment failed twice', meta: 'System · 19 Oct', dot: '#c81d29' }],
        ),
        B(
          'lime',
          'Lime Spa',
          'Spa',
          'Bole Atlas',
          'Meskerem K.',
          '+251 94 *** 6609',
          'active',
          'Yearly',
          '18 May',
          233,
          980,
          1,
          3,
          '2 days ago',
          '#2f6b4f',
        ),
        B(
          'habesha',
          'Habesha Bites',
          'Restaurant',
          'Piassa',
          'Yonas B.',
          '+251 93 *** 2267',
          'active',
          'Monthly',
          '1 Aug',
          520,
          3890,
          1,
          5,
          'Today',
          '#c2410c',
        ),
        B(
          'sheba',
          'Sheba Beauty',
          'Salon',
          'Sarbet',
          'Tigist W.',
          '+251 91 *** 5120',
          'trial',
          'Trial',
          '19 Oct',
          4,
          6,
          1,
          1,
          'Today',
          '#7a3e9d',
          '2 Nov',
        ),
        B(
          'gebeya',
          'Gebeya Burger',
          'Restaurant',
          'Kazanchis',
          'Biniam K.',
          '+251 92 *** 3348',
          'suspended',
          'Monthly',
          '9 Feb',
          310,
          0,
          1,
          2,
          '35 days ago',
          '#101827',
          '',
          [{ text: 'Suspended: unpaid for more than 14 days', meta: '[Admin name] · 16 Sep', dot: '#c81d29' }],
        ),
        B(
          'arada',
          'Arada Coffee',
          'Café',
          'Piassa',
          'Eyob B.',
          '+251 91 *** 7751',
          'active',
          'Monthly',
          '22 Apr',
          715,
          5610,
          2,
          6,
          'Today',
          '#8a4b2a',
        ),
        B(
          'sparkle',
          'Sparkle Wash',
          'Car wash',
          'Bole',
          'Natnael A.',
          '+251 91 *** 4412',
          'active',
          'Yearly',
          '30 Jun',
          298,
          1430,
          1,
          2,
          '3 days ago',
          '#4661ad',
        ),
        B(
          'entoto',
          'Entoto Spa',
          'Spa',
          'Megenagna',
          'Ruth T.',
          '+251 93 *** 8820',
          'trial',
          'Trial',
          '15 Oct',
          22,
          61,
          1,
          2,
          'Yesterday',
          '#2f6b4f',
          '29 Oct',
        ),
      ],
    };
  }

  async componentDidMount() {
    await this.loadMerchants();
  }

  async loadMerchants() {
    try {
      const list = await api.platform.getMerchants();
      if (Array.isArray(list) && list.length > 0) {
        const mapped = list.map((m, idx) => ({
          id: m.id,
          code: m.joinReference || (idx === 0 ? 'UXwJ9RwdyHs' : 'mK7vB2xP9Lq'),
          name: m.nameEn || m.nameAm || 'Merchant',
          type: 'Café & Dining',
          area: 'Addis Ababa',
          owner: m.slug || 'Owner',
          phone: '+251 91 *** ' + String(1000 + idx).slice(-4),
          status: (m.status || 'ACTIVE').toLowerCase() === 'active' ? 'active' : 'suspended',
          plan: 'Monthly',
          joined: 'Active',
          cards: 4,
          stamps: 12,
          branches: 1,
          staff: 1,
          last: 'Today',
          color: '#8a4b2a',
          trialEnds: '',
          notes: [{ text: `Live database merchant: ${m.slug}`, meta: 'Platform DB', dot: '#4661ad' }],
        }));
        this.setState({
          list: mapped,
          sel: mapped[0]?.id || 'buna',
        });
      }
    } catch (err) {
      console.warn('AdminBusinesses platform fetch note:', err);
    }
  }

  flash(t) {
    if (this.tt) clearTimeout(this.tt);
    this.setState({ toast: t });
    this.tt = setTimeout(() => this.setState({ toast: '' }), 3000);
  }
  componentWillUnmount() {
    if (this.tt) clearTimeout(this.tt);
  }
  renderVals() {
    const s = this.state;
    const ST = {
      active: { label: 'Active', bg: '#ffffff', fg: '#101827', border: '#e3e5ec' },
      trial: { label: 'Trial', bg: '#ffffff', fg: '#4661ad', border: '#4661ad' },
      pastdue: { label: 'Payment due', bg: '#fde8e9', fg: '#c81d29', border: '#fde8e9' },
      suspended: { label: 'Suspended', bg: '#101827', fg: '#ffffff', border: '#101827' },
    };
    const order = ['buna', 'selam', 'aby', 'lime', 'habesha', 'sheba', 'gebeya', 'arada', 'sparkle', 'entoto'];
    const joinedRank = {
      buna: 6,
      selam: 9,
      aby: 1,
      lime: 4,
      habesha: 7,
      sheba: 10,
      gebeya: 2,
      arada: 3,
      sparkle: 5,
      entoto: 8,
    };
    const q = (s.q || '').trim().toLowerCase();
    const base = s.list.filter(
      (b) =>
        (s.type === 'all' || b.type === s.type) &&
        (!q || (b.name + ' ' + b.owner + ' ' + b.phone + ' ' + b.area).toLowerCase().indexOf(q) !== -1),
    );
    const vis = base
      .filter((b) => s.status === 'all' || b.status === s.status)
      .slice()
      .sort((a, b) => {
        if (s.sort === 'cards') return b.cards - a.cards;
        if (s.sort === 'stamps') return b.stamps - a.stamps;
        if (s.sort === 'name') return a.name.localeCompare(b.name);
        return joinedRank[b.id] - joinedRank[a.id];
      });
    const statusChips = [
      ['all', 'All'],
      ['active', 'Active'],
      ['trial', 'Trial'],
      ['pastdue', 'Payment due'],
      ['suspended', 'Suspended'],
    ].map(([id, label]) => ({
      label,
      n: String(base.filter((b) => id === 'all' || b.status === id).length),
      pressed: id === s.status ? 'true' : 'false',
      bg: id === s.status ? '#101827' : '#ffffff',
      color: id === s.status ? '#ffffff' : '#101827',
      border: id === s.status ? '#101827' : '#e3e5ec',
      pick: () => this.setState({ status: id }),
    }));
    const ini = (n) =>
      n
        .split(/\s+/)
        .map((p) => p.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();
    const rows = vis.map((b) => ({
      name: b.name,
      sub: b.type + ' · ' + b.area,
      ini: ini(b.name),
      color: b.color,
      status: ST[b.status].label,
      sBg: ST[b.status].bg,
      sFg: ST[b.status].fg,
      sBorder: ST[b.status].border,
      plan: b.status === 'trial' ? 'Trial · ends ' + b.trialEnds : b.plan,
      cards: b.cards.toLocaleString('en-US'),
      stamps: b.stamps.toLocaleString('en-US'),
      pressed: b.id === s.sel ? 'true' : 'false',
      rowBg: b.id === s.sel ? '#f7f7f9' : '#ffffff',
      pick: () =>
        this.setState({ sel: b.id, confirm: false, noteDraft: '', planDraft: b.plan === 'Trial' ? 'Monthly' : b.plan }),
    }));
    const cur = s.list.find((b) => b.id === s.sel) || s.list[0];
    const update = (patch, note, toast) => {
      const list = s.list.map((b) =>
        b.id === cur.id ? Object.assign({}, b, patch, note ? { notes: [note].concat(b.notes) } : {}) : b,
      );
      this.setState({ list, confirm: false });
      if (toast) this.flash(toast);
    };
    const addDays = (dstr, n) => {
      const d = new Date(dstr + ' 2026');
      d.setDate(d.getDate() + n);
      return (
        d.getDate() +
        ' ' +
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()]
      );
    };
    const me = (t, dot) => ({ text: t, meta: '[Admin name] · 21 Oct', dot: dot || '#4661ad' });
    return {
      q: s.q,
      onQ: (e) => this.setState({ q: e.target.value }),
      type: s.type,
      onType: (e) => this.setState({ type: e.target.value }),
      sort: s.sort,
      onSort: (e) => this.setState({ sort: e.target.value }),
      statusChips,
      rows,
      noRows: rows.length === 0,
      shown: rows.length + ' of ' + s.list.length,
      d: {
        name: cur.name,
        code: cur.code || 'UXwJ9RwdyHs',
        sub: cur.type + ' · ' + cur.area,
        ini: ini(cur.name),
        color: cur.color,
        status: ST[cur.status].label,
        sBg: ST[cur.status].bg,
        sFg: ST[cur.status].fg,
        sBorder: ST[cur.status].border,
        cards: cur.cards.toLocaleString('en-US'),
        stamps: cur.stamps.toLocaleString('en-US'),
        last: cur.last,
        owner: cur.owner,
        phone: cur.phone,
        planLine:
          cur.status === 'trial'
            ? 'Free trial · ends ' + cur.trialEnds
            : cur.plan + (cur.status === 'pastdue' ? ' · payment overdue' : ''),
        joined: cur.joined + ' 2026',
        branches: String(cur.branches),
        staff: String(cur.staff),
        isTrial: cur.status === 'trial',
        trialEnds: cur.trialEnds,
        notes: cur.notes.length ? cur.notes : [{ text: 'No notes yet', meta: '', dot: '#e3e5ec' }],
      },
      hasToast: !!s.toast,
      toast: s.toast,
      sendLink: () => update({}, me('Sign-in link sent to owner'), 'Sign-in link sent to ' + cur.owner + '.'),
      ext7: () => {
        const t = addDays(cur.trialEnds, 7);
        update({ trialEnds: t }, me('Trial extended by 7 days to ' + t), 'Trial now ends ' + t + '.');
      },
      ext14: () => {
        const t = addDays(cur.trialEnds, 14);
        update({ trialEnds: t }, me('Trial extended by 14 days to ' + t), 'Trial now ends ' + t + '.');
      },
      planDraft: s.planDraft,
      onPlanDraft: (e) => this.setState({ planDraft: e.target.value }),
      applyPlan: () =>
        update(
          { plan: s.planDraft, status: 'active', trialEnds: '' },
          me('Plan set to ' + s.planDraft),
          cur.name + ' is now on ' + s.planDraft + '.',
        ),
      canSuspend: cur.status !== 'suspended',
      canReactivate: cur.status === 'suspended',
      confirming: s.confirm,
      notConfirming: !s.confirm,
      askSuspend: () => this.setState({ confirm: true }),
      cancelSuspend: () => this.setState({ confirm: false }),
      reason: s.reason,
      onReason: (e) => this.setState({ reason: e.target.value }),
      doSuspend: async () => {
        try {
          if (cur.id && cur.id.length > 20) {
            await api.platform.updateMerchantStatus(cur.id, 'SUSPENDED');
          }
        } catch (e) {
          console.warn('Suspend API error:', e);
        }
        update({ status: 'suspended', stamps: 0 }, me('Suspended: ' + s.reason, '#c81d29'), cur.name + ' suspended.');
      },
      reactivate: async () => {
        try {
          if (cur.id && cur.id.length > 20) {
            await api.platform.updateMerchantStatus(cur.id, 'ACTIVE');
          }
        } catch (e) {
          console.warn('Reactivate API error:', e);
        }
        update(
          { status: cur.plan === 'Trial' ? 'trial' : 'active' },
          me('Reactivated'),
          cur.name + ' is active again.',
        );
      },
      noteDraft: s.noteDraft,
      onNote: (e) => this.setState({ noteDraft: e.target.value }),
      addNote: () => {
        const t = (s.noteDraft || '').trim();
        if (!t) return;
        update({}, me('Note: ' + t, '#5b6475'));
        this.setState({ noteDraft: '' });
      },
      sendMsg: () => {
        const t = (s.noteDraft || '').trim();
        if (!t) return;
        update({}, me('Message sent to owner: ' + t));
        this.setState({ noteDraft: '' });
        this.flash('Sent. It shows in their dashboard.');
      },
    };
  }
}

AdminBusinessesView.defaultProps = {};

AdminBusinessesView.prototype.__template = renderAdminBusinesses;

export default withDCStyle(AdminBusinessesView, 'AdminBusinesses', __CSS);
