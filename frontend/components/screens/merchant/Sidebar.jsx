'use client';
/* Generated from the Temelash Card design (Sidebar.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import api from '@/lib/api';
import renderSidebar from './Sidebar.view';

const __CSS = 'body{margin:0}';
class SidebarView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      w: null,
      profile: false,
      owner: 'Sample Owner',
      businessName: 'Sample Cafe',
      branchName: 'Bole branch',
      plan: 'active',
    };
  }
  async componentDidMount() {
    this.onResize = () => this.setState({ w: window.innerWidth });
    window.addEventListener('resize', this.onResize);
    this.onResize();

    try {
      // Check local storage so sidebar immediately shows saved business name and owner
      try {
        const localOwner = window.localStorage.getItem('tm-owner-name');
        const localBiz = window.localStorage.getItem('tm-biz-profile');
        const localBranches = window.localStorage.getItem('tm-branches-list');
        const initialUpdates = {};
        if (localOwner) initialUpdates.owner = localOwner;
        if (localBiz) {
          const parsed = JSON.parse(localBiz);
          if (parsed?.nameEn) initialUpdates.businessName = parsed.nameEn;
        }
        if (localBranches) {
          const parsed = JSON.parse(localBranches);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name) {
            initialUpdates.branchName = parsed[0].name;
          }
        }
        if (Object.keys(initialUpdates).length > 0) this.setState(initialUpdates);
      } catch (x) {}

      const [profile, branches, me] = await Promise.allSettled([
        api.merchant.getProfile(),
        api.merchant.getBranches(),
        api.auth.getMe('owner'),
      ]);
      const updates = {};
      if (profile.status === 'fulfilled' && profile.value?.nameEn) {
        updates.businessName = profile.value.nameEn;
      }
      if (branches.status === 'fulfilled' && branches.value?.length) {
        updates.branchName = branches.value[0].nameEn + ' branch';
      }
      if (me.status === 'fulfilled' && me.value?.displayName) {
        updates.owner = me.value.displayName;
      }
      if (Object.keys(updates).length) this.setState(updates);
    } catch (e) {
      console.warn('Sidebar data load error:', e);
    }
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
    let userRole = 'Owner';
    try {
      const curRole = api?.auth?.getCurrentRole ? api.auth.getCurrentRole() : null;
      if (curRole === 'manager') userRole = 'Manager';
      else if (typeof window !== 'undefined') {
        const storedRole = window.sessionStorage.getItem('tc_role') || window.localStorage.getItem('tc_role');
        if (storedRole?.toLowerCase() === 'manager') userRole = 'Manager';
      }
    } catch (e) {}
    const paid = this.state.plan === 'monthly' || this.state.plan === 'yearly' || this.state.plan === 'active';
    return {
      userRole,
      planLabel: paid ? 'YOUR PLAN' : 'FREE TRIAL',
      planText: paid ? (this.state.plan === 'yearly' ? 'Yearly · active' : 'Monthly · active') : 'Active plan',
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
      businessName: this.state.businessName || 'Sample Cafe',
      branchName: this.state.branchName || 'Bole branch',
      initial: (this.state.businessName || 'S').trim().charAt(0).toUpperCase(),
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

SidebarView.prototype.__template = renderSidebar;

export default withDCStyle(SidebarView, 'Sidebar', __CSS);
