'use client';
/* Generated from the Temelash Card design (Main.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import renderMain from './Main.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\na{color:#4661ad}a:hover{color:#101827}\na:focus-visible,button:focus-visible,summary:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\nsummary{cursor:pointer;list-style:none}\nsummary::-webkit-details-marker{display:none}\n.tm-menubtn{display:none !important}\n.tm-show-sm{display:none !important}\n.tm-home{overflow-x:clip}\n@media (max-width:1023px){h1[style*="font-size: 64px"]{font-size:48px !important;line-height:52px !important}[style*="padding: 104px 24px"],[style*="padding: 96px 24px"]{padding-top:72px !important;padding-bottom:72px !important}}\n@media (max-width:767px){.tm-menubtn{display:inline-flex !important}.tm-navlinks{display:none !important;order:3;flex-basis:100%;flex-direction:column;align-items:stretch !important;gap:0 !important;border-top:1px solid #e3e5ec;padding-top:8px}.tm-navlinks.is-open{display:flex !important}.tm-navlinks a{padding:12px 4px;min-height:44px;box-sizing:border-box}.tm-show-sm{display:block !important}.tm-hide-sm{display:none !important}}\n@media (max-width:640px){h1[style*="font-size: 64px"]{font-size:38px !important;line-height:42px !important}h2[style*="font-size: 44px"]{font-size:30px !important;line-height:36px !important}h2[style*="font-size: 56px"]{font-size:32px !important;line-height:38px !important}h2[style*="font-size: 32px"]{font-size:26px !important;line-height:32px !important}[style*="padding: 104px 24px"],[style*="padding: 96px 24px"]{padding:56px 16px !important}[style*="padding: 88px 24px 96px"]{padding:40px 16px 56px !important}[style*="padding: 40px;"]{padding:24px !important}[style*="padding: 32px;"]{padding:24px !important}}';
class MainView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      nav: false,
      authModalOpen: false,
      demoModalOpen: false,
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const checkHash = () => {
        const h = window.location.hash;
        if (h === '#signin' || h === '#login') {
          this.setState({ authModalOpen: 'signin', nav: false });
        } else if (h === '#demo' || h === '#book-demo') {
          this.setState({ demoModalOpen: true, nav: false });
        } else if (h === '#signup' || h === '#register' || h === '#try') {
          this.setState({ authModalOpen: 'signup', nav: false });
        }
      };
      checkHash();
      window.addEventListener('hashchange', checkHash);
      this._hashHandler = checkHash;
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && this._hashHandler) {
      window.removeEventListener('hashchange', this._hashHandler);
    }
  }

  renderVals() {
    const open = this.state.nav;
    return {
      navCls: open ? 'tm-navlinks is-open' : 'tm-navlinks',
      navExpanded: open ? 'true' : 'false',
      navLabel: open ? 'Close menu' : 'Open menu',
      navIcon: open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16',
      toggleNav: () => this.setState({ nav: !open }),

      authModalOpen: this.state.authModalOpen,
      demoModalOpen: this.state.demoModalOpen,
      openSignIn: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.setState({ authModalOpen: 'signin', nav: false });
      },
      openSignUp: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.setState({ authModalOpen: 'signup', nav: false });
      },
      openDemo: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.setState({ demoModalOpen: true, nav: false });
      },
      closeAuthModal: () => this.setState({ authModalOpen: false }),
      closeDemoModal: () => this.setState({ demoModalOpen: false }),
    };
  }
}

MainView.defaultProps = {};

MainView.prototype.__template = renderMain;

export default withDCStyle(MainView, 'Main', __CSS);
