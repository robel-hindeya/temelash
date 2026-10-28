'use client';
/* Generated from the Temelash Card design (Sidebar.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import api, { getCurrentRole, getStoredUser } from '@/lib/api';
import renderSidebar from './Sidebar.view';

const __CSS = 'body{margin:0}';
class SidebarView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      w: null,
      profile: false,
      owner: '',
      businessName: '',
      branchName: '',
    };
  }
  async componentDidMount() {
    this.onResize = () => this.setState({ w: window.innerWidth });
    window.addEventListener('resize', this.onResize);
    this.onResize();

    try {
      // Owner name from the signed-in account (the token's /auth/me carries no display name).
      const user = getStoredUser('owner');
      if (user?.displayName || user?.email) this.setState({ owner: user.displayName || user.email });

      const [profile, branches] = await Promise.allSettled([
        api.merchant.getProfile(),
        api.merchant.getBranches(),
      ]);
      const updates = {};
      if (profile.status === 'fulfilled' && profile.value?.nameEn) {
        updates.businessName = profile.value.nameEn;
      }
      if (branches.status === 'fulfilled' && branches.value?.length) {
        updates.branchName =
          branches.value.length === 1 ? branches.value[0].nameEn : `${branches.value.length} branches`;
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
      mk('qr', 'QR code', '/business/shop', 'M5 7h14l-1 13H6zM9 7V5a3 3 0 0 1 6 0v2'),
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
    const userRole = getCurrentRole() === 'manager' ? 'Manager' : 'Owner';
    return {
      userRole,
      // Billing is not built yet: say so instead of showing a plan.
      planLabel: 'YOUR PLAN',
      planText: 'No billing yet',
      planLink: 'Details',
      goBilling: setTab('billing'),
      goProfile: setTab('profile'),
      profileOpen: this.state.profile,
      profileExpanded: this.state.profile ? 'true' : 'false',
      profileBorder: this.state.profile ? '#4661ad' : 'transparent',
      profileChevron: this.state.profile ? 'M7 10l5 5 5-5' : 'M7 14l5-5 5 5',
      toggleProfile: () => this.setState({ profile: !this.state.profile }),
      ownerName: owner || 'Your account',
      ownerIni: owner
        ? owner
            .split(/\s+/)
            .map((p) => p.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase()
        : 'OW',
      businessName: this.state.businessName || '…',
      branchName: this.state.branchName || 'No branch yet',
      initial: (this.state.businessName || '·').trim().charAt(0).toUpperCase(),
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
