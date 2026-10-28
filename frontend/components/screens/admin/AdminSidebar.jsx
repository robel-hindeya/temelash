'use client';
/* Generated from the Temelash Card design (AdminSidebar.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import api, { getStoredUser } from '@/lib/api';
import renderAdminSidebar from './AdminSidebar.view';

const __CSS = 'body{margin:0}';
class AdminSidebarView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { open: false, w: null, acct: false, adminName: 'Platform Admin', adminIni: 'PA', pending: 0 };
  }
  async componentDidMount() {
    this.onResize = () => this.setState({ w: window.innerWidth });
    window.addEventListener('resize', this.onResize);
    this.onResize();
    // Name from the signed-in account (the token's /auth/me carries no display name).
    const user = getStoredUser('admin');
    const name = user?.displayName || user?.email;
    if (name) {
      const ini = name.split(/[\s@.]+/).map((p) => p.charAt(0)).join('').slice(0, 2).toUpperCase() || 'PA';
      this.setState({ adminName: name, adminIni: ini });
    }
    try {
      const pending = await api.platform.getApplications('PENDING');
      if (Array.isArray(pending)) this.setState({ pending: pending.length });
    } catch (e) {}
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
            this.state.pending,
          ),
          mk('billing', 'Billing (soon)', '/admin/billing', 'M2 6h20v12H2zM2 10h20M6 15h4'),
          mk(
            'broadcast',
            'Announcements (soon)',
            '/admin/announcements',
            'M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1zM17 9a4 4 0 0 1 0 6',
          ),
        ],
      },
      {
        title: 'OPERATIONS',
        items: [
          mk('orders', 'Shop orders (soon)', '/admin/orders', 'M5 7h14l-1 13H6zM9 7V5a3 3 0 0 1 6 0v2'),
          mk('support', 'Support inbox (soon)', '/admin/support', 'M4 5h16v11H8l-4 4z'),
          mk(
            'settings',
            'Platform settings (soon)',
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
      adminName: this.state.adminName || 'Platform Admin',
      adminIni: this.state.adminIni || 'PA',
      acctOpen: this.state.acct,
      acctExpanded: this.state.acct ? 'true' : 'false',
      toggleAcct: () => this.setState({ acct: !this.state.acct }),
    };
  }
}

AdminSidebarView.defaultProps = { active: 'overview' };

AdminSidebarView.prototype.__template = renderAdminSidebar;

export default withDCStyle(AdminSidebarView, 'AdminSidebar', __CSS);
