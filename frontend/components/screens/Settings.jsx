'use client';
/* Generated from the Temelash Card design (Settings.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import Sidebar from './Sidebar';
import api, { getAppOrigin } from '@/lib/api';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-hide-sm{display:none !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.bar:hover{background:#101827 !important}\n.srow:hover{background:#f7f7f9}';
class SettingsView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'staff',
      loading: true,
      inviteOpen: false,
      iv: { name: '', phone: '', role: 'staff' },
      ivTried: false,
      lastInvite: null,
      copied: false,
      nextInv: 1,
      team: [
        { id: 'owner', name: 'Sample Cafe Owner', ini: 'SC', phone: '+251 91 100 0001', role: 'Owner', status: 'active' },
        { id: 'bole', name: 'Bole Staff', ini: 'BS', phone: '+251 91 100 0002', role: 'Staff', status: 'active' },
      ],
      range: 'day',
      date: '2026-10-21',
      sel: 'all',
      branches: [{ id: 'bole', name: 'Bole branch', address: 'Bole Road, Addis Ababa', phone: '+251 91 100 0001', hours: 'Mon–Sat 7:00–21:00' }],
      bEdit: null,
      bConfirm: null,
      bd: {},
      bdErr: false,
      nextB: 2,
      branchNote: '',
      plan: 'trial',
      selPlan: 'monthly',
      bStep: 'pick',
      pay: 'telebirr',
      bizProfile: { nameEn: 'Sample Cafe', nameAm: 'ሳምፕል ካፌ', defaultLanguage: 'EN', tin: '0012345678', type: 'Café' },
      bizSaved: false,
      pf: { name: 'Sample Cafe Owner', phone: '+251 91 100 0001', email: 'owner@sample-cafe.test' },
      pfSaved: false,
      pinReset: false,
    };
  }
  componentWillUnmount() {
    if (this.onTabEvt) window.removeEventListener('tm-settings-tab', this.onTabEvt);
  }
  async componentDidMount() {
    this.onTabEvt = (e) => {
      try {
        window.sessionStorage.removeItem('tm-settings-tab');
      } catch (x) {}
      this.setState({ tab: e.detail });
    };
    window.addEventListener('tm-settings-tab', this.onTabEvt);
    try {
      const t = window.sessionStorage.getItem('tm-settings-tab');
      if (t) {
        window.sessionStorage.removeItem('tm-settings-tab');
        this.setState({ tab: t });
      }
      const n = window.localStorage.getItem('tm-owner-name');
      const p = window.localStorage.getItem('tm-plan');
      const o = {};
      if (n) o.pf = Object.assign({}, this.state.pf, { name: n });
      if (p) {
        o.plan = p;
        o.selPlan = p;
        o.bStep = 'done';
      }

      // Restore locally saved state so reload never deletes data
      const localTeam = window.localStorage.getItem('tm-team-members');
      const localBranches = window.localStorage.getItem('tm-branches-list');
      const localBiz = window.localStorage.getItem('tm-biz-profile');
      const localInvite = window.localStorage.getItem('tm-last-invite');
      const localPf = window.localStorage.getItem('tm-owner-profile');

      if (localTeam) {
        try {
          const parsed = JSON.parse(localTeam);
          if (Array.isArray(parsed) && parsed.length > 0) o.team = parsed;
        } catch (e) {}
      }
      if (localBranches) {
        try {
          const parsed = JSON.parse(localBranches);
          if (Array.isArray(parsed) && parsed.length > 0) o.branches = parsed;
        } catch (e) {}
      }
      if (localBiz) {
        try {
          const parsed = JSON.parse(localBiz);
          if (parsed && typeof parsed === 'object') o.bizProfile = Object.assign({}, this.state.bizProfile, parsed);
        } catch (e) {}
      }
      if (localInvite) {
        try {
          const parsed = JSON.parse(localInvite);
          if (parsed && parsed.link) o.lastInvite = parsed;
        } catch (e) {}
      }
      if (localPf) {
        try {
          const parsed = JSON.parse(localPf);
          if (parsed && typeof parsed === 'object') o.pf = Object.assign({}, this.state.pf, parsed);
        } catch (e) {}
      }

      if (Object.keys(o).length) this.setState(o);
    } catch (e) {}

    await this.loadData();
  }

  async loadData() {
    try {
      const [staffRes, branchRes, profRes, meRes] = await Promise.allSettled([
        api.merchant.getStaff(),
        api.merchant.getBranches(),
        api.merchant.getProfile(),
        api.auth.getMe('owner'),
      ]);
      const updates = { loading: false };

      // Branches: merge backend and local branches
      let existingBranches = this.state.branches;
      try {
        const savedBranches = window.localStorage.getItem('tm-branches-list');
        if (savedBranches) {
          const parsed = JSON.parse(savedBranches);
          if (Array.isArray(parsed) && parsed.length > 0) existingBranches = parsed;
        }
      } catch (e) {}

      const backendBranches = branchRes.status === 'fulfilled' && Array.isArray(branchRes.value) ? branchRes.value : [];
      let mergedBranches = [];
      if (backendBranches.length > 0) {
        mergedBranches = backendBranches.map((b) => ({
          id: b.id,
          name: b.nameEn || 'Main branch',
          address: b.addressText || 'Addis Ababa',
          phone: b.phoneE164 || '',
          hours: 'Mon–Sat 7:00–21:00',
        }));
      }
      existingBranches.forEach((b) => {
        if (!mergedBranches.some((mb) => mb.id === b.id || mb.name === b.name)) {
          mergedBranches.push(b);
        }
      });
      if (mergedBranches.length > 0) {
        updates.branches = mergedBranches;
        try {
          window.localStorage.setItem('tm-branches-list', JSON.stringify(mergedBranches));
        } catch (e) {}
      }

      let ownerName = 'Sample Cafe Owner';
      let ownerPhone = '+251 91 100 0001';
      let ownerEmail = 'owner@sample-cafe.test';
      if (meRes.status === 'fulfilled' && meRes.value) {
        ownerName = meRes.value.displayName || meRes.value.email || ownerName;
        ownerEmail = meRes.value.email || ownerEmail;
      }

      // Team members: ensure newly created and invited staff (e.g. hh-4811) are preserved across reloads
      let existingTeam = this.state.team;
      try {
        const savedTeam = window.localStorage.getItem('tm-team-members');
        if (savedTeam) {
          const parsed = JSON.parse(savedTeam);
          if (Array.isArray(parsed) && parsed.length > 0) existingTeam = parsed;
        }
      } catch (e) {}

      const staffList = staffRes.status === 'fulfilled' && Array.isArray(staffRes.value) ? staffRes.value : [];
      const team = [
        {
          id: 'owner',
          name: ownerName,
          ini: ownerName.slice(0, 2).toUpperCase(),
          phone: ownerPhone,
          role: 'Owner',
          status: 'active',
        },
      ];
      staffList.forEach((st) => {
        const nm = st.displayName || (st.email ? st.email.split('@')[0] : 'Staff member');
        team.push({
          id: st.id,
          name: nm,
          ini: nm.slice(0, 2).toUpperCase(),
          phone: st.email || '+251 91 000 0000',
          role: st.roleKey === 'MANAGER' ? 'Manager' : 'Staff',
          status: st.status === 'ACTIVE' ? 'active' : 'invited',
        });
      });

      // Merge any local staff members that were invited or active
      existingTeam.forEach((locMem) => {
        if (locMem.id === 'owner') return;
        const alreadyIn = team.some((t) => t.id === locMem.id || (t.name === locMem.name && locMem.name));
        if (!alreadyIn) {
          team.push(locMem);
        }
      });
      updates.team = team;
      try {
        window.localStorage.setItem('tm-team-members', JSON.stringify(team));
      } catch (e) {}

      // Business Profile: merge with local biz profile
      let existingBiz = this.state.bizProfile;
      try {
        const savedBiz = window.localStorage.getItem('tm-biz-profile');
        if (savedBiz) {
          const parsed = JSON.parse(savedBiz);
          if (parsed && typeof parsed === 'object') existingBiz = Object.assign({}, existingBiz, parsed);
        }
      } catch (e) {}

      let currentBiz = Object.assign({}, existingBiz);
      if (profRes.status === 'fulfilled' && profRes.value) {
        currentBiz = Object.assign(currentBiz, {
          nameEn: profRes.value.nameEn || currentBiz.nameEn || 'Sample Cafe',
          nameAm: profRes.value.nameAm || currentBiz.nameAm || '',
          defaultLanguage: profRes.value.defaultLanguage || currentBiz.defaultLanguage || 'EN',
          supportEmail: profRes.value.supportEmail || currentBiz.supportEmail || '',
          supportPhone: profRes.value.supportPhone || currentBiz.supportPhone || '',
        });
      }
      updates.bizProfile = currentBiz;
      try {
        window.localStorage.setItem('tm-biz-profile', JSON.stringify(currentBiz));
      } catch (e) {}

      updates.pf = { name: ownerName, phone: ownerPhone, email: ownerEmail };
      this.setState(updates);
    } catch (e) {
      console.warn('Failed to load settings data from database:', e);
      this.setState({ loading: false });
    }
  }
  renderVals() {
    const s = this.state;
    const tabs = [
      ['staff', 'Staff'],
      ['biz', 'Business'],
      ['branches', 'Branches'],
      ['billing', 'Plan and billing'],
      ['profile', 'My profile'],
    ].map(([id, label]) => ({
      label,
      sel: id === s.tab ? 'true' : 'false',
      color: id === s.tab ? '#101827' : '#5b6475',
      line: id === s.tab ? '#e42330' : 'transparent',
      pick: () => this.setState({ tab: id }),
    }));

    // ---- invite ----
    const digits = (s.iv.phone || '').replace(/\D/g, '');
    const ivErr = { name: s.ivTried && !(s.iv.name || '').trim(), phone: s.ivTried && digits.length < 9 };
    ivErr.nameBorder = ivErr.name ? '#c81d29' : '#e3e5ec';
    ivErr.phoneBorder = ivErr.phone ? '#c81d29' : '#e3e5ec';
    const roleOpts = [
      ['staff', 'Staff', 'Adds stamps and redeems rewards in the staff app.'],
      ['manager', 'Manager', 'Everything staff can do, plus offers, rewards and customers.'],
    ].map(([id, label, desc]) => ({
      label,
      desc,
      checked: s.iv.role === id,
      border: s.iv.role === id ? '#4661ad' : '#e3e5ec',
      pick: () => this.setState({ iv: Object.assign({}, s.iv, { role: id }) }),
    }));
    const canDo = { Owner: 'Everything', Manager: 'Stamps, offers, customers', Staff: 'Stamps and rewards' };
    const lastActive = { owner: 'Active now', meron: 'Active 10 min ago', yonas: 'Active 1 hour ago' };
    const team = s.team.map((m) => ({
      name: m.id === 'owner' && (s.pf.name || '').trim() ? s.pf.name.trim() : m.name,
      ini: m.ini,
      phone: m.phone,
      role: m.role,
      can: canDo[m.role],
      status: m.status === 'invited' ? 'Invite sent · waiting' : lastActive[m.id] || 'Active',
      statusColor: m.status === 'invited' ? '#4661ad' : '#5b6475',
      isInvited: m.status === 'invited',
      isActiveStaff: m.status === 'active' && m.id !== 'owner',
      resend: () => {
        const origin = getAppOrigin();
        const link = m.link || `${origin}/staff/join/${(m.name || 'staff').toLowerCase().replace(/[^a-z0-9]+/g, '')}-${m.id}`;
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(link).catch(() => {});
        }
        this.setState({ lastInvite: { name: m.name, link }, copied: true });
      },
      cancel: () => {
        const nextTeam = s.team.filter((x) => x.id !== m.id);
        const nextInvite = s.lastInvite && s.lastInvite.name === m.name ? null : s.lastInvite;
        try {
          window.localStorage.setItem('tm-team-members', JSON.stringify(nextTeam));
          if (!nextInvite) window.localStorage.removeItem('tm-last-invite');
        } catch (e) {}
        this.setState({
          team: nextTeam,
          lastInvite: nextInvite,
        });
      },
      view: () => this.setState({ sel: m.id }),
    }));

    // ---- activity ----
    const active = s.team.filter((m) => m.status === 'active');
    const base = { owner: 9, meron: 24, yonas: 19 };
    const TODAY = new Date('2026-10-21T00:00:00');
    const dayDiff = (iso) => Math.round((TODAY - new Date(iso + 'T00:00:00')) / 86400000);
    const fmt = (d) => {
      const mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return d.getDate() + ' ' + mons[d.getMonth()];
    };
    const dayN = (id, off) => {
      const d = new Date(TODAY.getTime() - off * 86400000);
      const wd = d.getDay();
      if (id === 'owner' && wd === 0) return 0;
      if (id === 'yonas' && wd === 1) return 0; // Yonas's day off
      const wk = wd === 6 ? 1.6 : wd === 0 ? 1.3 : 1;
      const k = ((off * 37 + id.length * 17) % 10) / 10;
      return Math.round((base[id] || 10) * (0.6 + k * 0.8) * wk);
    };
    const hours = ['7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8'];
    const hourShape = [0.03, 0.12, 0.14, 0.08, 0.05, 0.07, 0.12, 0.1, 0.05, 0.04, 0.06, 0.07, 0.05, 0.02];
    const days = s.range === 'day' ? 1 : Number(s.range);
    const startOff = s.range === 'day' ? Math.max(0, dayDiff(s.date)) : 0;
    const offs = [];
    for (let i = days - 1; i >= 0; i--) offs.push(startOff + i);
    const future = s.range === 'day' && dayDiff(s.date) < 0;
    const sumFor = (id) => (future ? 0 : offs.reduce((a, o) => a + dayN(id, o), 0));
    const per = active.map((m) => ({ m, st: sumFor(m.id) }));
    const totalSt = per.reduce((a, x) => a + x.st, 0);
    const top = Math.max(1, ...per.map((x) => x.st));
    const busyFor = (id) => {
      if (s.range === 'day') {
        const n = dayN(id, startOff);
        if (!n || future) return '—';
        return id === 'yonas' ? '1pm – 3pm' : id === 'owner' ? '5pm – 7pm' : '8am – 10am';
      }
      return id === 'yonas' ? 'Saturdays, afternoon' : id === 'owner' ? 'Evenings' : 'Weekday mornings';
    };
    const sel = s.sel === 'all' || active.some((m) => m.id === s.sel) ? s.sel : 'all';
    const perStaff = per.map(({ m, st }) => ({
      name: m.id === 'owner' && (s.pf.name || '').trim() ? s.pf.name.trim() : m.name,
      ini: m.ini,
      stamps: st.toLocaleString('en-US'),
      w: Math.round((st / top) * 100) + '%',
      rewards: String(Math.round(st / 10)),
      joins: String(Math.round(st / 7)),
      busy: busyFor(m.id),
      pressed: sel === m.id ? 'true' : 'false',
      rowBg: sel === m.id ? '#f7f7f9' : 'transparent',
      dotBg: sel === m.id ? '#101827' : '#f7f7f9',
      dotFg: sel === m.id ? '#ffffff' : '#101827',
      pick: () => this.setState({ sel: sel === m.id ? 'all' : m.id }),
    }));
    const ids = sel === 'all' ? active.map((m) => m.id) : [sel];
    let bars;
    if (s.range === 'day') {
      const dayTotal = future ? 0 : ids.reduce((a, id) => a + dayN(id, startOff), 0);
      const vals = hourShape.map((f) => Math.round(dayTotal * f));
      const mx = Math.max(1, ...vals);
      bars = vals.map((v, i) => ({
        v: String(v),
        d: hours[i] + (i < 5 ? 'am' : 'pm'),
        x: hours[i],
        h: Math.round((v / (mx * 1.2)) * 100) + '%',
        tip: hours[i] + (i < 5 ? 'am' : 'pm') + ': ' + v + ' stamps',
      }));
    } else {
      const vals = offs.map((o) => ids.reduce((a, id) => a + dayN(id, o), 0));
      const mx = Math.max(1, ...vals);
      const every = days <= 7 ? 1 : days <= 30 ? 5 : 10;
      bars = offs.map((o, i) => {
        const d = new Date(TODAY.getTime() - o * 86400000);
        return {
          x:
            (i % every === 0 || i === offs.length - 1) && days > 7
              ? fmt(d)
              : days <= 7
                ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]
                : '',
          v: String(vals[i]),
          d: fmt(d),
          h: Math.round((vals[i] / (mx * 1.2)) * 100) + '%',
          tip: fmt(d) + ': ' + vals[i] + ' stamps',
        };
      });
    }
    const selName = sel === 'all' ? 'Whole team' : active.find((m) => m.id === sel).name;
    const dateObj = new Date(s.date + 'T00:00:00');
    const longDate =
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateObj.getDay()] +
      ', ' +
      fmt(dateObj);
    const rangeText =
      s.range === 'day'
        ? dayDiff(s.date) === 0
          ? 'Today, ' + longDate
          : longDate
        : 'Last ' + days + ' days, up to today';
    const hasData = !future && bars.some((b) => b.h !== '0%');
    const shift = (n) => {
      const d = new Date(dateObj.getTime() + n * 86400000);
      const p = (x) => String(x).padStart(2, '0');
      const iso = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
      if (dayDiff(iso) >= 0) this.setState({ date: iso });
    };
    const ranges = [
      ['day', 'Day'],
      ['7', '7 days'],
      ['30', '30 days'],
      ['60', '60 days'],
    ].map(([id, label]) => ({
      label,
      pressed: id === s.range ? 'true' : 'false',
      bg: id === s.range ? '#101827' : 'transparent',
      color: id === s.range ? '#ffffff' : '#101827',
      pick: () => this.setState({ range: id }),
    }));

    // ---- branches ----
    const bdSet = (k) => (e) => this.setState({ bd: Object.assign({}, s.bd, { [k]: e.target.value }), bdErr: false });
    const branchRows = s.branches.map((b, i) => ({
      name: b.name,
      line: [b.address || 'No address yet', i === 0 ? active.length - 1 + ' staff' : '0 staff', b.hours]
        .filter(Boolean)
        .join(' · '),
      viewing: s.bEdit !== b.id && s.bConfirm !== b.id,
      editing: s.bEdit === b.id,
      confirming: s.bConfirm === b.id,
      canDelete: s.branches.length > 1,
      delLabel: 'Delete ' + b.name,
      formTitle: 'Edit ' + b.name,
      saveLabel: 'Save changes',
      idName: 'br-name-' + b.id,
      idAddr: 'br-addr-' + b.id,
      idPhone: 'br-phone-' + b.id,
      idHours: 'br-hours-' + b.id,
      edit: () =>
        this.setState({ bEdit: b.id, bConfirm: null, bd: Object.assign({}, b), bdErr: false, branchNote: '' }),
      remove: () => this.setState({ bConfirm: b.id, bEdit: null, branchNote: '' }),
      confirmDelete: async () => {
        try {
          await api.merchant.deactivateBranch(b.id);
        } catch (err) {
          console.warn('Deactivate branch error:', err);
        }
        const nextBranches = s.branches.filter((x) => x.id !== b.id);
        try {
          window.localStorage.setItem('tm-branches-list', JSON.stringify(nextBranches));
        } catch (e) {}
        this.setState({
          branches: nextBranches,
          bConfirm: null,
          branchNote: b.name + ' deactivated in database.',
        });
      },
    }));
    if (s.bEdit === 'new')
      branchRows.push({
        name: '',
        line: '',
        viewing: false,
        editing: true,
        confirming: false,
        canDelete: false,
        delLabel: '',
        formTitle: 'New branch',
        saveLabel: 'Add branch',
        idName: 'br-name-new',
        idAddr: 'br-addr-new',
        idPhone: 'br-phone-new',
        idHours: 'br-hours-new',
        edit: null,
        remove: null,
        confirmDelete: null,
      });

    // ---- billing ----
    const P = {
      monthly: {
        name: 'Monthly',
        price: '1,500 ETB / month',
        note: 'Pay month by month. Cancel any time.',
        badge: '',
      },
      yearly: {
        name: 'Yearly',
        price: '15,000 ETB / year',
        note: 'Pay once a year and get 2 months free.',
        badge: '2 MONTHS FREE',
      },
    };
    const plans = Object.keys(P).map((id) => ({
      name: P[id].name,
      price: P[id].price,
      note: P[id].note,
      badge: P[id].badge,
      hasBadge: !!P[id].badge,
      pressed: s.selPlan === id ? 'true' : 'false',
      border: s.selPlan === id ? '#4661ad' : '#e3e5ec',
      pick: () => this.setState({ selPlan: id }),
    }));
    const payOpts = [
      ['telebirr', 'Telebirr', 'Approve on your phone'],
      ['cbe', 'CBE Birr', 'Approve on your phone'],
      ['bank', 'Bank transfer', 'We send account details by SMS'],
    ].map(([id, label, desc]) => ({
      label,
      desc,
      checked: s.pay === id,
      border: s.pay === id ? '#4661ad' : '#e3e5ec',
      pick: () => this.setState({ pay: id }),
    }));

    // ---- profile ----
    const pfName = (s.pf.name || '').trim();
    const pfSet = (k) => (e) => this.setState({ pf: Object.assign({}, s.pf, { [k]: e.target.value }), pfSaved: false });

    return {
      branchRows,
      bd: s.bd,
      bdErr: s.bdErr,
      bdBorder: s.bdErr ? '#c81d29' : '#e3e5ec',
      branchNote: !!s.branchNote,
      branchNoteText: s.branchNote,
      canAddBranch: s.bEdit === null,
      addBranch: () =>
        this.setState({
          bEdit: 'new',
          bConfirm: null,
          bd: { name: '', address: '', phone: '', hours: 'Mon–Sat 7:00–21:00' },
          bdErr: false,
          branchNote: '',
        }),
      onBdName: bdSet('name'),
      onBdAddr: bdSet('address'),
      onBdPhone: bdSet('phone'),
      onBdHours: bdSet('hours'),
      cancelBranch: () => this.setState({ bEdit: null, bConfirm: null, bdErr: false }),
      saveBranch: async () => {
        const name = (s.bd.name || '').trim();
        if (!name) {
          this.setState({ bdErr: true });
          return;
        }
        if (s.bEdit === 'new') {
          let newBranchList;
          try {
            const created = await api.merchant.createBranch({
              nameEn: name,
              addressText: s.bd.address || null,
              phone: s.bd.phone || null,
            });
            newBranchList = s.branches.concat([
              {
                id: created?.id || s.nextB,
                name: created?.nameEn || name,
                address: created?.addressText || s.bd.address || '',
                phone: created?.phoneE164 || s.bd.phone || '',
                hours: s.bd.hours || 'Mon–Sat 7:00–21:00',
              },
            ]);
            try {
              window.localStorage.setItem('tm-branches-list', JSON.stringify(newBranchList));
            } catch (e) {}
            this.setState({
              branches: newBranchList,
              nextB: s.nextB + 1,
              bEdit: null,
              branchNote: name + ' added to database. Its QR is ready in the Shop.',
            });
          } catch (err) {
            console.warn('Branch create error:', err);
            newBranchList = s.branches.concat([Object.assign({}, s.bd, { id: s.nextB, name })]);
            try {
              window.localStorage.setItem('tm-branches-list', JSON.stringify(newBranchList));
            } catch (e) {}
            this.setState({
              branches: newBranchList,
              nextB: s.nextB + 1,
              bEdit: null,
              branchNote: name + ' added.',
            });
          }
        } else {
          try {
            await api.merchant.updateBranch(s.bEdit, {
              nameEn: name,
              addressText: s.bd.address || null,
              phone: s.bd.phone || null,
            });
          } catch (err) {
            console.warn('Branch update error:', err);
          }
          const updatedBranches = s.branches.map((b) =>
            b.id === s.bEdit ? Object.assign({}, s.bd, { id: b.id, name }) : b,
          );
          try {
            window.localStorage.setItem('tm-branches-list', JSON.stringify(updatedBranches));
          } catch (e) {}
          this.setState({
            branches: updatedBranches,
            bEdit: null,
            branchNote: name + ' saved to database.',
          });
        }
      },
      onTrial: s.plan === 'trial',
      onPaid: s.plan !== 'trial',
      planName: s.plan === 'trial' ? 'Free trial' : P[s.plan].name + ' plan',
      planLine:
        s.plan === 'trial'
          ? '14 days left. Your card keeps working while you choose a plan.'
          : P[s.plan].price + ' · renews automatically',
      pickTitle: s.plan === 'trial' ? 'Choose a plan' : 'Change plan',
      plans,
      selPlanName: P[s.selPlan].name,
      selPlanPrice: P[s.selPlan].price,
      payOpts,
      stepPick: s.bStep === 'pick',
      stepPay: s.bStep === 'pay',
      stepDone: s.bStep === 'done',
      toPay: () => this.setState({ bStep: 'pay' }),
      backToPlans: () => this.setState({ bStep: 'pick' }),
      confirmPlan: () => {
        try {
          window.localStorage.setItem('tm-plan', s.selPlan);
        } catch (e) {}
        this.setState({ plan: s.selPlan, bStep: 'done' });
      },
      isProfile: s.tab === 'profile',
      pf: s.pf,
      pfShownName: pfName || '[Owner name]',
      pfIni: pfName
        ? pfName
            .split(/\s+/)
            .map((p) => p.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase()
        : 'OW',
      onPfName: pfSet('name'),
      onPfPhone: pfSet('phone'),
      onPfEmail: pfSet('email'),
      saveProfile: () => {
        try {
          window.localStorage.setItem('tm-owner-name', pfName);
          window.localStorage.setItem('tm-owner-profile', JSON.stringify(s.pf));
        } catch (e) {}
        this.setState({ pfSaved: true });
      },
      pfSavedNote: s.pfSaved ? 'Saved. Your name shows in the sidebar and on staff activity.' : '',
      pinNote: s.pinReset
        ? 'We sent a code to your phone. Enter it in the staff app to set a new PIN.'
        : 'Used to sign in to the staff app.',
      resetPin: () => this.setState({ pinReset: true }),
      tabs,
      isStaff: s.tab === 'staff',
      isBiz: s.tab === 'biz',
      isBranches: s.tab === 'branches',
      isBilling: s.tab === 'billing',
      inviteOpen: s.inviteOpen,
      inviteExpanded: s.inviteOpen ? 'true' : 'false',
      inviteBtn: s.inviteOpen ? 'Close' : 'Invite staff',
      toggleInvite: () => this.setState({ inviteOpen: !s.inviteOpen, ivTried: false }),
      iv: s.iv,
      ivErr,
      roleOpts,
      onIvName: (e) => this.setState({ iv: Object.assign({}, s.iv, { name: e.target.value }) }),
      onIvPhone: (e) => this.setState({ iv: Object.assign({}, s.iv, { phone: e.target.value }) }),
      sendInvite: async () => {
        if (!(s.iv.name || '').trim() || digits.length < 9) {
          this.setState({ ivTried: true });
          return;
        }
        const name = s.iv.name.trim();
        const roleKey = s.iv.role === 'manager' ? 'MANAGER' : 'STAFF';
        const email = `${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'staff'}${Date.now().toString().slice(-4)}@sample-cafe.test`;
        const branchIds = s.branches.length > 0 ? [s.branches[0].id] : [];
        try {
          const res = await api.merchant.inviteStaff({
            displayName: name,
            email,
            role: roleKey,
            branchIds,
            preferredLanguage: 'EN',
          });
          const origin = getAppOrigin();
          const token = res?.invitation?.token || `${Date.now()}`;
          const link = `${origin}/staff/join/${token}`;
          const masked = '+251 ' + digits.slice(-9, -7) + ' *** ' + digits.slice(-4);
          const ini = name
            .split(/\s+/)
            .map((p) => p.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase();
          const newTeam = s.team.concat([
            {
              id: res?.staff?.id || 'inv' + s.nextInv,
              name,
              ini,
              phone: masked,
              role: s.iv.role === 'manager' ? 'Manager' : 'Staff',
              status: 'invited',
              link,
            },
          ]);
          try {
            window.localStorage.setItem('tm-team-members', JSON.stringify(newTeam));
            window.localStorage.setItem('tm-last-invite', JSON.stringify({ name, link }));
          } catch (e) {}
          this.setState({
            team: newTeam,
            nextInv: s.nextInv + 1,
            inviteOpen: false,
            ivTried: false,
            iv: { name: '', phone: '', role: 'staff' },
            lastInvite: { name, link },
            copied: false,
          });
        } catch (err) {
          console.warn('Backend staff invite warning, adding locally:', err);
          const origin = getAppOrigin();
          const link = `${origin}/staff/join/` + name.toLowerCase().replace(/[^a-z0-9]+/g, '') + '-' + (4810 + s.nextInv);
          const masked = '+251 ' + digits.slice(-9, -7) + ' *** ' + digits.slice(-4);
          const ini = name
            .split(/\s+/)
            .map((p) => p.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase();
          const newTeam = s.team.concat([
            {
              id: 'inv' + s.nextInv,
              name,
              ini,
              phone: masked,
              role: s.iv.role === 'manager' ? 'Manager' : 'Staff',
              status: 'invited',
              link,
            },
          ]);
          try {
            window.localStorage.setItem('tm-team-members', JSON.stringify(newTeam));
            window.localStorage.setItem('tm-last-invite', JSON.stringify({ name, link }));
          } catch (e) {}
          this.setState({
            team: newTeam,
            nextInv: s.nextInv + 1,
            inviteOpen: false,
            ivTried: false,
            iv: { name: '', phone: '', role: 'staff' },
            lastInvite: { name, link },
            copied: false,
          });
        }
      },
      bizProfile: s.bizProfile,
      bizSaved: s.bizSaved,
      onBizName: (e) => {
        const next = Object.assign({}, s.bizProfile, { nameEn: e.target.value });
        try { window.localStorage.setItem('tm-biz-profile', JSON.stringify(next)); } catch (x) {}
        this.setState({ bizProfile: next });
      },
      onBizTin: (e) => {
        const next = Object.assign({}, s.bizProfile, { tin: e.target.value });
        try { window.localStorage.setItem('tm-biz-profile', JSON.stringify(next)); } catch (x) {}
        this.setState({ bizProfile: next });
      },
      onBizType: (e) => {
        const next = Object.assign({}, s.bizProfile, { type: e.target.value });
        try { window.localStorage.setItem('tm-biz-profile', JSON.stringify(next)); } catch (x) {}
        this.setState({ bizProfile: next });
      },
      onBizLang: (e) => {
        const next = Object.assign({}, s.bizProfile, { defaultLanguage: e.target.value });
        try { window.localStorage.setItem('tm-biz-profile', JSON.stringify(next)); } catch (x) {}
        this.setState({ bizProfile: next });
      },
      saveBiz: async () => {
        try {
          window.localStorage.setItem('tm-biz-profile', JSON.stringify(s.bizProfile));
        } catch (e) {}
        try {
          await api.merchant.updateProfile({
            nameEn: s.bizProfile.nameEn,
            defaultLanguage: s.bizProfile.defaultLanguage,
          });
          this.setState({ bizSaved: true });
          setTimeout(() => this.setState({ bizSaved: false }), 4000);
        } catch (err) {
          console.warn('Error updating business profile:', err);
          this.setState({ bizSaved: true });
        }
      },
      hasLastInvite: !!s.lastInvite,
      lastInvite: s.lastInvite || { name: '', link: '' },
      copyInvite: () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard && s.lastInvite?.link) {
          navigator.clipboard.writeText(s.lastInvite.link).catch(() => {});
        }
        this.setState({ copied: true });
      },
      copyLabel: s.copied ? 'Copied' : 'Copy link',
      dismissInvite: () => {
        try {
          window.localStorage.removeItem('tm-last-invite');
        } catch (e) {}
        this.setState({ lastInvite: null });
      },
      team,
      activeCount: String(active.length - 1),
      ranges,
      isDay: s.range === 'day',
      date: s.date,
      onDate: (e) => {
        if (e.target.value) this.setState({ date: e.target.value });
      },
      prevDay: () => shift(-1),
      nextDay: () => shift(1),
      nextDisabled: dayDiff(s.date) <= 0,
      nextColor: dayDiff(s.date) <= 0 ? '#c9cdd6' : '#101827',
      rangeText,
      totals: [
        { label: 'STAMPS GIVEN', value: totalSt.toLocaleString('en-US') },
        { label: 'REWARDS REDEEMED', value: String(Math.round(totalSt / 10)) },
        { label: 'NEW CARDS SIGNED UP', value: String(Math.round(totalSt / 7)) },
      ],
      perStaff,
      busyHead: s.range === 'day' ? 'BUSIEST HOURS' : 'USUALLY BUSIEST',
      chartTitle: selName + (s.range === 'day' ? ' · stamps by hour' : ' · stamps per day'),
      chartNote:
        sel === 'all' ? 'Tap a name above to see one person.' : 'Tap ' + selName + ' again to see the whole team.',
      chartAlt:
        selName +
        ' stamps ' +
        (s.range === 'day' ? 'by hour on ' + longDate : 'per day over the last ' + days + ' days'),
      bars,
      barGap: days > 30 ? '2px' : days > 7 ? '4px' : '8px',
      hasData,
      noData: !hasData,
      showVals: days <= 30,
      valSize: days > 7 ? '9px' : '11px',
      isSixty: days === 60,
      tableOpen: days === 60 && !!s.table,
      tableExpanded: s.table ? 'true' : 'false',
      tableLabel: s.table ? 'Hide the numbers' : 'Show the number for each day',
      toggleTable: () => this.setState({ table: !s.table }),
    };
  }
}

SettingsView.defaultProps = {};
SettingsView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1500px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <Sidebar active="settings" />
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
          <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
            {'Staff and settings'}
          </h1>{' '}
          <div
            role="tablist"
            aria-label="Settings sections"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', borderBottom: '1px solid #e3e5ec' }}
          >
            {(__v?.tabs || []).map((t, __i0) => (
              <React.Fragment key={__i0}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={t?.sel}
                  onClick={t?.pick}
                  style={{
                    border: '0',
                    background: 'transparent',
                    padding: '12px 16px',
                    minHeight: '44px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    color: `${__t(t?.color)}`,
                    borderBottom: `3px solid ${__t(t?.line)}`,
                    marginBottom: '-1px',
                  }}
                >{`${__t(t?.label)}`}</button>
              </React.Fragment>
            ))}
          </div>{' '}
          {__b(__v?.isStaff) ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <section
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                        {'Your team'}
                      </h2>
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>
                        {'Staff sign in to the stamping app with their phone number and a 4-digit PIN.'}
                      </span>
                    </div>{' '}
                    <button
                      type="button"
                      onClick={__v?.toggleInvite}
                      aria-expanded={__v?.inviteExpanded}
                      aria-controls="invite-panel"
                      style={{
                        border: '0',
                        background: '#e42330',
                        color: '#ffffff',
                        fontWeight: '700',
                        borderRadius: '12px',
                        padding: '10px 18px',
                        minHeight: '44px',
                        cursor: 'pointer',
                      }}
                    >{`${__t(__v?.inviteBtn)}`}</button>
                  </div>{' '}
                  {__b(__v?.inviteOpen) ? (
                    <>
                      <div
                        id="invite-panel"
                        style={{
                          background: '#f7f7f9',
                          borderRadius: '12px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                        }}
                      >
                        <strong style={{ fontSize: '18px' }}>{'Invite someone to your team'}</strong>{' '}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '14px',
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label htmlFor="iv-name" style={{ fontWeight: '700' }}>
                              {'Name'}
                            </label>
                            <input
                              id="iv-name"
                              type="text"
                              value={__v?.iv?.name}
                              placeholder="e.g. Hana"
                              style={{
                                border: `1px solid ${__t(__v?.ivErr?.nameBorder)}`,
                                borderRadius: '6px',
                                padding: '12px 14px',
                                minHeight: '48px',
                                boxSizing: 'border-box',
                                background: '#ffffff',
                                color: '#101827',
                              }}
                              onChange={__v?.onIvName}
                            />
                            {__b(__v?.ivErr?.name) ? (
                              <>
                                <span style={{ fontSize: '14px', color: '#c81d29' }}>{'Add their name.'}</span>
                              </>
                            ) : null}
                          </div>{' '}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label htmlFor="iv-phone" style={{ fontWeight: '700' }}>
                              {'Phone number'}
                            </label>
                            <input
                              id="iv-phone"
                              type="tel"
                              value={__v?.iv?.phone}
                              placeholder="09__ ___ ___"
                              style={{
                                border: `1px solid ${__t(__v?.ivErr?.phoneBorder)}`,
                                borderRadius: '6px',
                                padding: '12px 14px',
                                minHeight: '48px',
                                boxSizing: 'border-box',
                                background: '#ffffff',
                                color: '#101827',
                              }}
                              onChange={__v?.onIvPhone}
                            />
                            {__b(__v?.ivErr?.phone) ? (
                              <>
                                <span style={{ fontSize: '14px', color: '#c81d29' }}>
                                  {'Enter a phone number with at least 9 digits.'}
                                </span>
                              </>
                            ) : null}
                          </div>{' '}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label htmlFor="iv-branch" style={{ fontWeight: '700' }}>
                              {'Branch'}
                            </label>
                            <select
                              id="iv-branch"
                              style={{
                                border: '1px solid #e3e5ec',
                                borderRadius: '6px',
                                padding: '12px 14px',
                                minHeight: '48px',
                                background: '#ffffff',
                                color: '#101827',
                              }}
                            >
                              <option>{'Bole branch'}</option>
                            </select>
                          </div>
                        </div>{' '}
                        <fieldset style={{ border: '0', padding: '0', margin: '0' }}>
                          <legend style={{ fontWeight: '700', padding: '0', marginBottom: '10px' }}>{'Role'}</legend>{' '}
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: '10px',
                            }}
                          >
                            {(__v?.roleOpts || []).map((r, __i0) => (
                              <React.Fragment key={__i0}>
                                <label
                                  style={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'flex-start',
                                    background: '#ffffff',
                                    border: `2px solid ${__t(r?.border)}`,
                                    borderRadius: '12px',
                                    padding: '12px 14px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="iv-role"
                                    checked={__b(r?.checked)}
                                    onChange={r?.pick}
                                    style={{ width: '18px', height: '18px', marginTop: '3px' }}
                                  />
                                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong>{`${__t(r?.label)}`}</strong>
                                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(r?.desc)}`}</span>
                                  </span>
                                </label>
                              </React.Fragment>
                            ))}
                          </div>
                        </fieldset>{' '}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={__v?.toggleInvite}
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
                            onClick={__v?.sendInvite}
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
                          >
                            {'Create invite'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}{' '}
                  {__b(__v?.hasLastInvite) ? (
                    <>
                      <div
                        role="status"
                        style={{
                          border: '1px solid #4661ad',
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <span style={{ display: 'flex', gap: '10px', alignItems: 'center', fontWeight: '700' }}>
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
                          {`Invite ready for ${__t(__v?.lastInvite?.name)}`}
                        </span>{' '}
                        <span
                          style={{ color: '#5b6475', fontSize: '14px' }}
                        >{`Send this link to ${__t(__v?.lastInvite?.name)} on Telegram or WhatsApp. They open it, set a 4-digit PIN and can start stamping. The link works for 7 days.`}</span>{' '}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          <label
                            htmlFor="iv-link"
                            style={{
                              position: 'absolute',
                              width: '1px',
                              height: '1px',
                              overflow: 'hidden',
                              clip: 'rect(0 0 0 0)',
                            }}
                          >
                            {'Invite link'}
                          </label>{' '}
                          <input
                            id="iv-link"
                            type="text"
                            readOnly={true}
                            value={__v?.lastInvite?.link}
                            style={{
                              flex: '1 1 240px',
                              border: '1px solid #e3e5ec',
                              borderRadius: '6px',
                              padding: '10px 12px',
                              minHeight: '44px',
                              boxSizing: 'border-box',
                              background: '#f7f7f9',
                              color: '#101827',
                            }}
                            readOnly={true}
                          />{' '}
                          <button
                            type="button"
                            onClick={__v?.copyInvite}
                            style={{
                              border: '1px solid #e3e5ec',
                              background: '#ffffff',
                              color: '#4661ad',
                              fontWeight: '700',
                              borderRadius: '12px',
                              padding: '10px 16px',
                              minHeight: '44px',
                              cursor: 'pointer',
                            }}
                          >{`${__t(__v?.copyLabel)}`}</button>{' '}
                          <button
                            type="button"
                            onClick={__v?.dismissInvite}
                            style={{
                              border: '0',
                              background: 'transparent',
                              color: '#5b6475',
                              fontWeight: '700',
                              padding: '10px 8px',
                              minHeight: '44px',
                              cursor: 'pointer',
                            }}
                          >
                            {'Done'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}{' '}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
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
                          <th scope="col" style={{ padding: '8px 12px 8px 0', fontWeight: '700' }}>
                            {'NAME'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                            {'ROLE'}
                          </th>
                          <th scope="col" className="tm-hide-sm" style={{ padding: '8px 12px', fontWeight: '700' }}>
                            {'CAN DO'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                            {'STATUS'}
                          </th>
                          <th scope="col" style={{ padding: '8px 0', fontWeight: '700' }}>
                            <span
                              style={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                overflow: 'hidden',
                                clip: 'rect(0 0 0 0)',
                              }}
                            >
                              {'Actions'}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(__v?.team || []).map((s, __i0) => (
                          <React.Fragment key={__i0}>
                            <tr style={{ borderTop: '1px solid #e3e5ec' }}>
                              <td style={{ padding: '12px 12px 12px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                                  >{`${__t(s?.ini)}`}</span>
                                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong>{`${__t(s?.name)}`}</strong>
                                    <span
                                      style={{ fontSize: '14px', color: '#5b6475', fontVariantNumeric: 'tabular-nums' }}
                                    >{`${__t(s?.phone)}`}</span>
                                  </span>
                                </div>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span
                                  style={{
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '999px',
                                    padding: '2px 10px',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                  }}
                                >{`${__t(s?.role)}`}</span>
                              </td>
                              <td
                                className="tm-hide-sm"
                                style={{ padding: '12px', color: '#5b6475' }}
                              >{`${__t(s?.can)}`}</td>
                              <td style={{ padding: '12px' }}>
                                <span
                                  style={{ fontSize: '14px', fontWeight: '700', color: `${__t(s?.statusColor)}` }}
                                >{`${__t(s?.status)}`}</span>
                              </td>
                              <td style={{ padding: '12px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                {__b(s?.isInvited) ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={s?.resend}
                                      style={{
                                        border: '0',
                                        background: 'transparent',
                                        color: '#4661ad',
                                        fontWeight: '700',
                                        padding: '8px',
                                        minHeight: '44px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {'Copy link'}
                                    </button>{' '}
                                    <button
                                      type="button"
                                      onClick={s?.cancel}
                                      style={{
                                        border: '0',
                                        background: 'transparent',
                                        color: '#c81d29',
                                        fontWeight: '700',
                                        padding: '8px',
                                        minHeight: '44px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {'Cancel invite'}
                                    </button>
                                  </>
                                ) : null}{' '}
                                {__b(s?.isActiveStaff) ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={s?.view}
                                      style={{
                                        border: '0',
                                        background: 'transparent',
                                        color: '#4661ad',
                                        fontWeight: '700',
                                        padding: '8px',
                                        minHeight: '44px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {'See activity'}
                                    </button>
                                  </>
                                ) : null}
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>{' '}
                <section
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                          {'Staff activity'}
                        </h2>
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
                      </div>
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.rangeText)}`}</span>
                    </div>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                      <div
                        role="group"
                        aria-label="Period"
                        style={{
                          display: 'inline-flex',
                          border: '1px solid #e3e5ec',
                          borderRadius: '12px',
                          padding: '4px',
                          gap: '4px',
                        }}
                      >
                        {(__v?.ranges || []).map((r, __i0) => (
                          <React.Fragment key={__i0}>
                            <button
                              type="button"
                              aria-pressed={r?.pressed}
                              onClick={r?.pick}
                              style={{
                                border: '0',
                                borderRadius: '8px',
                                padding: '8px 14px',
                                minHeight: '40px',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '14px',
                                background: `${__t(r?.bg)}`,
                                color: `${__t(r?.color)}`,
                              }}
                            >{`${__t(r?.label)}`}</button>
                          </React.Fragment>
                        ))}
                      </div>{' '}
                      {__b(__v?.isDay) ? (
                        <>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <button
                              type="button"
                              aria-label="Previous day"
                              onClick={__v?.prevDay}
                              style={{
                                width: '40px',
                                height: '44px',
                                border: '1px solid #e3e5ec',
                                borderRadius: '10px',
                                background: '#ffffff',
                                cursor: 'pointer',
                                color: '#101827',
                              }}
                            >
                              {'‹'}
                            </button>{' '}
                            <label
                              htmlFor="act-date"
                              style={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                overflow: 'hidden',
                                clip: 'rect(0 0 0 0)',
                              }}
                            >
                              {'Day'}
                            </label>{' '}
                            <input
                              id="act-date"
                              type="date"
                              max="2026-10-21"
                              value={__v?.date}
                              style={{
                                border: '1px solid #e3e5ec',
                                borderRadius: '10px',
                                padding: '8px 10px',
                                minHeight: '44px',
                                boxSizing: 'border-box',
                                color: '#101827',
                              }}
                              onChange={__v?.onDate}
                            />{' '}
                            <button
                              type="button"
                              aria-label="Next day"
                              disabled={__b(__v?.nextDisabled)}
                              onClick={__v?.nextDay}
                              style={{
                                width: '40px',
                                height: '44px',
                                border: '1px solid #e3e5ec',
                                borderRadius: '10px',
                                background: '#ffffff',
                                cursor: 'pointer',
                                color: `${__t(__v?.nextColor)}`,
                              }}
                            >
                              {'›'}
                            </button>
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>{' '}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                      gap: '12px',
                    }}
                  >
                    {(__v?.totals || []).map((k, __i0) => (
                      <React.Fragment key={__i0}>
                        <div
                          style={{
                            background: '#f7f7f9',
                            borderRadius: '12px',
                            padding: '14px 16px',
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
                          >{`${__t(k?.label)}`}</span>
                          <span
                            style={{
                              fontSize: '28px',
                              lineHeight: '32px',
                              fontWeight: '800',
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >{`${__t(k?.value)}`}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
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
                          <th scope="col" style={{ padding: '8px 12px 8px 0', fontWeight: '700' }}>
                            {'STAFF'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700' }}>
                            {'STAMPS'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700', textAlign: 'right' }}>
                            {'REWARDS GIVEN'}
                          </th>
                          <th scope="col" style={{ padding: '8px 12px', fontWeight: '700', textAlign: 'right' }}>
                            {'NEW CARDS'}
                          </th>
                          <th
                            scope="col"
                            className="tm-hide-sm"
                            style={{ padding: '8px 0 8px 12px', fontWeight: '700' }}
                          >{`${__t(__v?.busyHead)}`}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(__v?.perStaff || []).map((p, __i0) => (
                          <React.Fragment key={__i0}>
                            <tr
                              className="srow"
                              style={{ borderTop: '1px solid #e3e5ec', background: `${__t(p?.rowBg)}` }}
                            >
                              <td style={{ padding: '12px 12px 12px 0' }}>
                                <button
                                  type="button"
                                  onClick={p?.pick}
                                  aria-pressed={p?.pressed}
                                  style={{
                                    border: '0',
                                    background: 'transparent',
                                    padding: '0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    color: '#101827',
                                    textAlign: 'left',
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '32px',
                                      height: '32px',
                                      borderRadius: '999px',
                                      background: `${__t(p?.dotBg)}`,
                                      color: `${__t(p?.dotFg)}`,
                                      fontWeight: '700',
                                      fontSize: '12px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >{`${__t(p?.ini)}`}</span>
                                  <strong>{`${__t(p?.name)}`}</strong>
                                </button>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div
                                    style={{
                                      width: '100px',
                                      height: '8px',
                                      background: '#f7f7f9',
                                      borderRadius: '4px',
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: '100%',
                                        width: `${__t(p?.w)}`,
                                        background: '#4661ad',
                                        borderRadius: '0 4px 4px 0',
                                      }}
                                    />
                                  </div>
                                  <span
                                    style={{ fontWeight: '800', fontVariantNumeric: 'tabular-nums' }}
                                  >{`${__t(p?.stamps)}`}</span>
                                </div>
                              </td>
                              <td
                                style={{ padding: '12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
                              >{`${__t(p?.rewards)}`}</td>
                              <td
                                style={{ padding: '12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
                              >{`${__t(p?.joins)}`}</td>
                              <td
                                className="tm-hide-sm"
                                style={{ padding: '12px 0 12px 12px', color: '#5b6475' }}
                              >{`${__t(p?.busy)}`}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>{' '}
                  <div
                    style={{
                      borderTop: '1px solid #e3e5ec',
                      paddingTop: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '8px',
                      }}
                    >
                      <h3
                        style={{ margin: '0', fontSize: '18px', lineHeight: '24px', fontWeight: '700' }}
                      >{`${__t(__v?.chartTitle)}`}</h3>
                      <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.chartNote)}`}</span>
                    </div>{' '}
                    {__b(__v?.hasData) ? (
                      <>
                        <div
                          role="img"
                          aria-label={__v?.chartAlt}
                          style={{
                            height: '180px',
                            display: 'flex',
                            gap: `${__t(__v?.barGap)}`,
                            alignItems: 'flex-end',
                            borderBottom: '1px solid #e3e5ec',
                          }}
                        >
                          {(__v?.bars || []).map((b, __i0) => (
                            <React.Fragment key={__i0}>
                              <div
                                title={b?.tip}
                                style={{
                                  flex: '1 1 0',
                                  minWidth: '0',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                  gap: '3px',
                                }}
                              >
                                {__b(__v?.showVals) ? (
                                  <>
                                    <span
                                      style={{
                                        fontSize: `${__t(__v?.valSize)}`,
                                        lineHeight: '12px',
                                        fontWeight: '700',
                                        color: '#101827',
                                        fontVariantNumeric: 'tabular-nums',
                                      }}
                                    >{`${__t(b?.v)}`}</span>
                                  </>
                                ) : null}
                                <div
                                  className="bar"
                                  style={{
                                    width: '100%',
                                    maxWidth: '28px',
                                    height: `${__t(b?.h)}`,
                                    background: '#4661ad',
                                    borderRadius: '3px 3px 0 0',
                                  }}
                                />
                              </div>
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        <div
                          aria-hidden="true"
                          style={{
                            display: 'flex',
                            gap: `${__t(__v?.barGap)}`,
                            fontSize: '11px',
                            lineHeight: '14px',
                            color: '#5b6475',
                          }}
                        >
                          {(__v?.bars || []).map((b, __i0) => (
                            <React.Fragment key={__i0}>
                              <span
                                style={{ flex: '1 1 0', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}
                              >{`${__t(b?.x)}`}</span>
                            </React.Fragment>
                          ))}
                        </div>{' '}
                        {__b(__v?.isSixty) ? (
                          <>
                            <button
                              type="button"
                              onClick={__v?.toggleTable}
                              aria-expanded={__v?.tableExpanded}
                              style={{
                                alignSelf: 'flex-start',
                                border: '1px solid #e3e5ec',
                                background: '#ffffff',
                                color: '#4661ad',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '8px 14px',
                                minHeight: '40px',
                                cursor: 'pointer',
                              }}
                            >{`${__t(__v?.tableLabel)}`}</button>
                          </>
                        ) : null}{' '}
                        {__b(__v?.tableOpen) ? (
                          <>
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                gap: '6px',
                              }}
                            >
                              {(__v?.bars || []).map((b, __i0) => (
                                <React.Fragment key={__i0}>
                                  <span
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      gap: '6px',
                                      fontSize: '13px',
                                      background: '#f7f7f9',
                                      borderRadius: '6px',
                                      padding: '4px 8px',
                                    }}
                                  >
                                    <span style={{ color: '#5b6475' }}>{`${__t(b?.d)}`}</span>
                                    <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{`${__t(b?.v)}`}</strong>
                                  </span>
                                </React.Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </>
                    ) : null}{' '}
                    {__b(__v?.noData) ? (
                      <>
                        <p
                          style={{
                            margin: '0',
                            color: '#5b6475',
                            background: '#f7f7f9',
                            borderRadius: '12px',
                            padding: '14px',
                          }}
                        >
                          {'No stamps recorded on this day. The shop was closed or nobody was on shift.'}
                        </p>
                      </>
                    ) : null}
                  </div>
                </section>{' '}
                <section
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
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Roles'}</h2>{' '}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                    }}
                  >
                    <div style={{ background: '#f7f7f9', borderRadius: '12px', padding: '16px' }}>
                      <strong>{'Owner'}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#5b6475' }}>
                        {'Everything, including billing and deleting the card.'}
                      </p>
                    </div>{' '}
                    <div style={{ background: '#f7f7f9', borderRadius: '12px', padding: '16px' }}>
                      <strong>{'Manager'}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#5b6475' }}>
                        {'Stamps, rewards, offers and customers. No billing.'}
                      </p>
                    </div>{' '}
                    <div style={{ background: '#f7f7f9', borderRadius: '12px', padding: '16px' }}>
                      <strong>{'Staff'}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#5b6475' }}>
                        {'Add stamps and redeem rewards in the staff app only.'}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : null}{' '}
          {__b(__v?.isBiz) ? (
            <>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  maxWidth: '760px',
                }}
              >
                <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>
                  {'Business profile'}
                </h2>{' '}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="st-name" style={{ fontWeight: '700' }}>
                      {'Legal name'}
                    </label>
                    <input
                      id="st-name"
                      type="text"
                      value={__v?.bizProfile?.nameEn || ''}
                      onChange={__v?.onBizName}
                      placeholder="Registered business name"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="st-tin" style={{ fontWeight: '700' }}>
                      {'TIN (for receipts)'}
                    </label>
                    <input
                      id="st-tin"
                      type="text"
                      value={__v?.bizProfile?.tin || ''}
                      onChange={__v?.onBizTin}
                      placeholder="e.g. 0012345678"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="st-type" style={{ fontWeight: '700' }}>
                      {'Type'}
                    </label>
                    <select
                      id="st-type"
                      value={__v?.bizProfile?.type || 'Café'}
                      onChange={__v?.onBizType}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        background: '#ffffff',
                        color: '#101827',
                      }}
                    >
                      <option>{'Café'}</option>
                      <option>{'Restaurant'}</option>
                      <option>{'Salon'}</option>
                      <option>{'Spa'}</option>
                      <option>{'Car wash'}</option>
                    </select>
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="st-lang" style={{ fontWeight: '700' }}>
                      {'Dashboard language'}
                    </label>
                    <select
                      id="st-lang"
                      value={__v?.bizProfile?.defaultLanguage || 'EN'}
                      onChange={__v?.onBizLang}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        background: '#ffffff',
                        color: '#101827',
                      }}
                    >
                      <option value="EN">{'English'}</option>
                      <option value="AM">{'አማርኛ'}</option>
                    </select>
                  </div>
                </div>{' '}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={__v?.saveBiz}
                    style={{
                      alignSelf: 'flex-start',
                      border: '0',
                      background: '#e42330',
                      color: '#ffffff',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '10px 18px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Save to Database'}
                  </button>
                  {__b(__v?.bizSaved) ? (
                    <span style={{ color: '#0d7d4d', fontWeight: '700', fontSize: '14px' }}>
                      {'✓ Business profile saved to database.'}
                    </span>
                  ) : null}
                </div>
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.isBranches) ? (
            <>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  maxWidth: '820px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}>{'Branches'}</h2>{' '}
                  {__b(__v?.canAddBranch) ? (
                    <>
                      <button
                        type="button"
                        onClick={__v?.addBranch}
                        style={{
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#4661ad',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '8px 14px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'+ Add a branch'}
                      </button>
                    </>
                  ) : null}
                </div>{' '}
                <p style={{ margin: '0', fontSize: '14px', color: '#5b6475' }}>
                  {
                    'One card works at every branch. Stamps count wherever the customer visits. Each branch gets its own QR so you can see where people join.'
                  }
                </p>{' '}
                {__b(__v?.branchNote) ? (
                  <>
                    <div
                      role="status"
                      style={{ background: '#f7f7f9', borderRadius: '12px', padding: '12px 14px', fontWeight: '700' }}
                    >{`${__t(__v?.branchNoteText)}`}</div>
                  </>
                ) : null}{' '}
                {(__v?.branchRows || []).map((b, __i0) => (
                  <React.Fragment key={__i0}>
                    <div style={{ borderTop: '1px solid #e3e5ec', padding: '14px 0' }}>
                      {__b(b?.viewing) ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            <span
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: '#f7f7f9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 'none',
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
                                <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                              </svg>
                            </span>{' '}
                            <span style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column' }}>
                              <strong>{`${__t(b?.name)}`}</strong>
                              <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(b?.line)}`}</span>
                            </span>{' '}
                            <button
                              type="button"
                              onClick={b?.edit}
                              style={{
                                border: '1px solid #e3e5ec',
                                background: '#ffffff',
                                color: '#4661ad',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '6px 12px',
                                minHeight: '40px',
                                cursor: 'pointer',
                              }}
                            >
                              {'Edit'}
                            </button>{' '}
                            {__b(b?.canDelete) ? (
                              <>
                                <button
                                  type="button"
                                  onClick={b?.remove}
                                  aria-label={b?.delLabel}
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '10px',
                                    background: '#ffffff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#c81d29"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                                  </svg>
                                </button>
                              </>
                            ) : null}
                          </div>
                        </>
                      ) : null}{' '}
                      {__b(b?.editing) ? (
                        <>
                          <div
                            style={{
                              background: '#f7f7f9',
                              borderRadius: '12px',
                              padding: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px',
                            }}
                          >
                            <strong>{`${__t(b?.formTitle)}`}</strong>{' '}
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '12px',
                              }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor={b?.idName} style={{ fontWeight: '700', fontSize: '14px' }}>
                                  {'Branch name'}
                                </label>
                                <input
                                  id={b?.idName}
                                  type="text"
                                  value={__v?.bd?.name}
                                  placeholder="e.g. Kazanchis branch"
                                  style={{
                                    border: `1px solid ${__t(__v?.bdBorder)}`,
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    minHeight: '44px',
                                    boxSizing: 'border-box',
                                    background: '#ffffff',
                                    color: '#101827',
                                  }}
                                  onChange={__v?.onBdName}
                                />
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor={b?.idAddr} style={{ fontWeight: '700', fontSize: '14px' }}>
                                  {'Address'}
                                </label>
                                <input
                                  id={b?.idAddr}
                                  type="text"
                                  value={__v?.bd?.address}
                                  placeholder="Building, street, area"
                                  style={{
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    minHeight: '44px',
                                    boxSizing: 'border-box',
                                    background: '#ffffff',
                                    color: '#101827',
                                  }}
                                  onChange={__v?.onBdAddr}
                                />
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor={b?.idPhone} style={{ fontWeight: '700', fontSize: '14px' }}>
                                  {'Branch phone'}
                                </label>
                                <input
                                  id={b?.idPhone}
                                  type="tel"
                                  value={__v?.bd?.phone}
                                  placeholder="+251 9__ ___ ___"
                                  style={{
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    minHeight: '44px',
                                    boxSizing: 'border-box',
                                    background: '#ffffff',
                                    color: '#101827',
                                  }}
                                  onChange={__v?.onBdPhone}
                                />
                              </div>{' '}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor={b?.idHours} style={{ fontWeight: '700', fontSize: '14px' }}>
                                  {'Opening hours'}
                                </label>
                                <input
                                  id={b?.idHours}
                                  type="text"
                                  value={__v?.bd?.hours}
                                  placeholder="Mon–Sat 7:00–21:00"
                                  style={{
                                    border: '1px solid #e3e5ec',
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    minHeight: '44px',
                                    boxSizing: 'border-box',
                                    background: '#ffffff',
                                    color: '#101827',
                                  }}
                                  onChange={__v?.onBdHours}
                                />
                              </div>
                            </div>{' '}
                            {__b(__v?.bdErr) ? (
                              <>
                                <span style={{ fontSize: '14px', color: '#c81d29' }}>{'Give the branch a name.'}</span>
                              </>
                            ) : null}{' '}
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={__v?.cancelBranch}
                                style={{
                                  border: '1px solid #e3e5ec',
                                  background: '#ffffff',
                                  color: '#101827',
                                  fontWeight: '700',
                                  borderRadius: '10px',
                                  padding: '8px 14px',
                                  minHeight: '40px',
                                  cursor: 'pointer',
                                }}
                              >
                                {'Cancel'}
                              </button>{' '}
                              <button
                                type="button"
                                onClick={__v?.saveBranch}
                                style={{
                                  border: '0',
                                  background: '#4661ad',
                                  color: '#ffffff',
                                  fontWeight: '700',
                                  borderRadius: '10px',
                                  padding: '8px 14px',
                                  minHeight: '40px',
                                  cursor: 'pointer',
                                }}
                              >{`${__t(b?.saveLabel)}`}</button>
                            </div>
                          </div>
                        </>
                      ) : null}{' '}
                      {__b(b?.confirming) ? (
                        <>
                          <div
                            style={{
                              background: '#fde8e9',
                              borderRadius: '12px',
                              padding: '14px 16px',
                              display: 'flex',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              gap: '10px',
                            }}
                          >
                            <span style={{ flex: '1 1 240px', color: '#101827' }}>
                              <strong>{`Delete ${__t(b?.name)}?`}</strong>
                              {' Its QR stops working. Customers keep their stamps.'}
                            </span>{' '}
                            <button
                              type="button"
                              onClick={__v?.cancelBranch}
                              style={{
                                border: '1px solid #e3e5ec',
                                background: '#ffffff',
                                color: '#101827',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '8px 14px',
                                minHeight: '40px',
                                cursor: 'pointer',
                              }}
                            >
                              {'Keep it'}
                            </button>{' '}
                            <button
                              type="button"
                              onClick={b?.confirmDelete}
                              style={{
                                border: '0',
                                background: '#e42330',
                                color: '#ffffff',
                                fontWeight: '700',
                                borderRadius: '10px',
                                padding: '8px 14px',
                                minHeight: '40px',
                                cursor: 'pointer',
                              }}
                            >
                              {'Delete branch'}
                            </button>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            </>
          ) : null}{' '}
          {__b(__v?.isBilling) ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
                <section
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        color: '#5b6475',
                      }}
                    >
                      {'CURRENT PLAN'}
                    </span>{' '}
                    <span
                      style={{ fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}
                    >{`${__t(__v?.planName)}`}</span>{' '}
                    <span style={{ color: '#5b6475' }}>{`${__t(__v?.planLine)}`}</span>
                  </div>{' '}
                  {__b(__v?.onTrial) ? (
                    <>
                      <div
                        style={{
                          flex: '1 1 220px',
                          height: '8px',
                          background: '#e3e5ec',
                          borderRadius: '999px',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ width: '40%', height: '100%', background: '#101827' }} />
                      </div>
                    </>
                  ) : null}{' '}
                  {__b(__v?.onPaid) ? (
                    <>
                      <span
                        style={{
                          border: '1px solid #4661ad',
                          color: '#4661ad',
                          borderRadius: '999px',
                          padding: '2px 12px',
                          fontWeight: '700',
                          fontSize: '14px',
                        }}
                      >
                        {'Active'}
                      </span>
                    </>
                  ) : null}
                </section>{' '}
                {__b(__v?.stepPick) ? (
                  <>
                    <section
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                      }}
                    >
                      <h2
                        style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}
                      >{`${__t(__v?.pickTitle)}`}</h2>{' '}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                          gap: '12px',
                        }}
                      >
                        {(__v?.plans || []).map((p, __i0) => (
                          <React.Fragment key={__i0}>
                            <button
                              type="button"
                              aria-pressed={p?.pressed}
                              onClick={p?.pick}
                              style={{
                                textAlign: 'left',
                                background: '#ffffff',
                                border: `2px solid ${__t(p?.border)}`,
                                borderRadius: '12px',
                                padding: '18px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                                color: '#101827',
                              }}
                            >
                              <span
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: '8px',
                                }}
                              >
                                <strong style={{ fontSize: '18px' }}>{`${__t(p?.name)}`}</strong>
                                {__b(p?.hasBadge) ? (
                                  <>
                                    <span
                                      style={{
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        fontWeight: '700',
                                        letterSpacing: '0.08em',
                                        color: '#4661ad',
                                        border: '1px solid #4661ad',
                                        borderRadius: '999px',
                                        padding: '0 8px',
                                      }}
                                    >{`${__t(p?.badge)}`}</span>
                                  </>
                                ) : null}
                              </span>{' '}
                              <span
                                style={{ fontSize: '24px', lineHeight: '30px', fontWeight: '800' }}
                              >{`${__t(p?.price)}`}</span>{' '}
                              <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(p?.note)}`}</span>
                            </button>
                          </React.Fragment>
                        ))}
                      </div>{' '}
                      <ul
                        style={{
                          margin: '0',
                          paddingLeft: '18px',
                          color: '#5b6475',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                          gap: '4px 16px',
                        }}
                      >
                        <li>{'Unlimited customers and stamps'}</li>
                        <li>{'Apple, Google Wallet and web cards'}</li>
                        <li>{'Offers and reminders'}</li>
                        <li>{'Staff app for your whole team'}</li>
                        <li>{'Analytics and staff activity'}</li>
                        <li>{'Every branch included'}</li>
                      </ul>{' '}
                      <button
                        type="button"
                        onClick={__v?.toPay}
                        style={{
                          alignSelf: 'flex-start',
                          border: '0',
                          background: '#e42330',
                          color: '#ffffff',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '12px 20px',
                          minHeight: '48px',
                          cursor: 'pointer',
                        }}
                      >{`Continue with ${__t(__v?.selPlanName)}`}</button>
                    </section>
                  </>
                ) : null}{' '}
                {__b(__v?.stepPay) ? (
                  <>
                    <section
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e3e5ec',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={__v?.backToPlans}
                        style={{
                          alignSelf: 'flex-start',
                          border: '0',
                          background: 'transparent',
                          color: '#4661ad',
                          fontWeight: '700',
                          padding: '4px 0',
                          minHeight: '36px',
                          cursor: 'pointer',
                        }}
                      >
                        {'← Change plan'}
                      </button>{' '}
                      <h2
                        style={{ margin: '0', fontSize: '20px', lineHeight: '26px', fontWeight: '700' }}
                      >{`Pay for ${__t(__v?.selPlanName)}`}</h2>{' '}
                      <fieldset
                        style={{
                          border: '0',
                          padding: '0',
                          margin: '0',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                        }}
                      >
                        <legend style={{ fontWeight: '700', padding: '0', marginBottom: '8px' }}>{'Pay with'}</legend>{' '}
                        {(__v?.payOpts || []).map((o, __i0) => (
                          <React.Fragment key={__i0}>
                            <label
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                border: `1px solid ${__t(o?.border)}`,
                                borderRadius: '12px',
                                padding: '12px 14px',
                                cursor: 'pointer',
                              }}
                            >
                              <input
                                type="radio"
                                name="bill-pay"
                                checked={__b(o?.checked)}
                                onChange={o?.pick}
                                style={{ width: '18px', height: '18px' }}
                              />
                              <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                                <strong>{`${__t(o?.label)}`}</strong>
                                <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(o?.desc)}`}</span>
                              </span>
                            </label>
                          </React.Fragment>
                        ))}{' '}
                        <span style={{ fontSize: '13px', color: '#5b6475' }}>{'[Confirm payment options]'}</span>
                      </fieldset>{' '}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '18px',
                          fontWeight: '800',
                          paddingTop: '10px',
                          borderTop: '1px solid #e3e5ec',
                        }}
                      >
                        <span>{'Due today'}</span>
                        <span>{`${__t(__v?.selPlanPrice)}`}</span>
                      </div>{' '}
                      <button
                        type="button"
                        onClick={__v?.confirmPlan}
                        style={{
                          alignSelf: 'flex-start',
                          border: '0',
                          background: '#e42330',
                          color: '#ffffff',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '12px 20px',
                          minHeight: '48px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Confirm and pay'}
                      </button>
                    </section>
                  </>
                ) : null}{' '}
                {__b(__v?.stepDone) ? (
                  <>
                    <section
                      role="status"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #4661ad',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <strong style={{ fontSize: '20px' }}>{`You're on the ${__t(__v?.selPlanName)} plan`}</strong>{' '}
                      <span style={{ color: '#5b6475' }}>
                        {
                          "Your card keeps running without a break. We'll send a receipt to your phone. You can change plans any time."
                        }
                      </span>{' '}
                      <button
                        type="button"
                        onClick={__v?.backToPlans}
                        style={{
                          alignSelf: 'flex-start',
                          border: '1px solid #e3e5ec',
                          background: '#ffffff',
                          color: '#4661ad',
                          fontWeight: '700',
                          borderRadius: '12px',
                          padding: '10px 16px',
                          minHeight: '44px',
                          cursor: 'pointer',
                        }}
                      >
                        {'Change plan'}
                      </button>
                    </section>
                  </>
                ) : null}
              </div>
            </>
          ) : null}{' '}
          {__b(__v?.isProfile) ? (
            <>
              <section
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  maxWidth: '760px',
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
                    }}
                  >{`${__t(__v?.pfIni)}`}</span>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: '20px' }}>{`${__t(__v?.pfShownName)}`}</strong>
                    <span style={{ color: '#5b6475' }}>{'Owner · Bole branch'}</span>
                  </div>
                </div>{' '}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="pf-name" style={{ fontWeight: '700' }}>
                      {'Your name'}
                    </label>
                    <input
                      id="pf-name"
                      type="text"
                      value={__v?.pf?.name}
                      placeholder="Your full name"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                      }}
                      onChange={__v?.onPfName}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="pf-phone" style={{ fontWeight: '700' }}>
                      {'Phone'}
                    </label>
                    <input
                      id="pf-phone"
                      type="tel"
                      value={__v?.pf?.phone}
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                      }}
                      onChange={__v?.onPfPhone}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="pf-email" style={{ fontWeight: '700' }}>
                      {'Email'}
                    </label>
                    <input
                      id="pf-email"
                      type="email"
                      value={__v?.pf?.email}
                      placeholder="name@example.com"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                        color: '#101827',
                      }}
                      onChange={__v?.onPfEmail}
                    />
                  </div>{' '}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="pf-lang" style={{ fontWeight: '700' }}>
                      {'Dashboard language'}
                    </label>
                    <select
                      id="pf-lang"
                      style={{
                        border: '1px solid #e3e5ec',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        minHeight: '48px',
                        background: '#ffffff',
                        color: '#101827',
                      }}
                    >
                      <option>{'English'}</option>
                      <option>{'አማርኛ'}</option>
                    </select>
                  </div>
                </div>{' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderTop: '1px solid #e3e5ec',
                    paddingTop: '14px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column' }}>
                    <strong>{'Staff app PIN'}</strong>
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.pinNote)}`}</span>
                  </span>{' '}
                  <button
                    type="button"
                    onClick={__v?.resetPin}
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      color: '#4661ad',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Change PIN'}
                  </button>
                </div>{' '}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={__v?.saveProfile}
                    style={{
                      border: '0',
                      background: '#e42330',
                      color: '#ffffff',
                      fontWeight: '700',
                      borderRadius: '12px',
                      padding: '10px 18px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Save'}
                  </button>{' '}
                  <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.pfSavedNote)}`}</span>
                </div>
              </section>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default withDCStyle(SettingsView, 'Settings', __CSS);
