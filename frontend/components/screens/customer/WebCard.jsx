'use client';
/* Generated from the Temelash Card design (WebCard.dc.html), integrated with live backend data. */
import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import api, {
  getOrAssignMerchantCode,
  getCustomerSession,
  isInTelegram,
  logoutCustomer,
  registerCustomer,
  signInCustomer,
} from '@/lib/api';
import renderWebCard from './WebCard.view';

const __CSS =
  'body{margin:0}\nbutton,a{font:inherit}\nbutton:focus-visible,a:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';

// How often a visible card re-reads its stamps from the backend. The public card endpoint is rate limited
// per IP (10 a minute by default), so the card also refreshes when the customer returns to the page instead
// of polling fast.
const REFRESH_MS = 30000;

const INSTALL_DISMISSED_KEY = 'tm-install-dismissed';

/** Opened from the home-screen icon rather than a browser tab. */
function isStandalone() {
  if (typeof window === 'undefined') return false;
  // Inside Telegram the card already lives in a chat, so there is nothing to install.
  return (
    isInTelegram() ||
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

/** How this browser adds a web app to the home screen: its own prompt, Safari's Share menu, or the browser menu. */
function installMethod(promptEvent) {
  if (promptEvent) return 'prompt';
  const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(ua) ? 'ios' : 'menu';
}

class WebCardView extends DCLogic {
  constructor(props) {
    super(props);
    const initialSession = getCustomerSession();
    this.state = {
      menu: false,
      lang: 'en',
      card: null,
      loading: true,
      error: null,
      walletLoading: false,
      walletMsg: null,
      token: initialSession?.token || null,
      // Customer join / sign-in modal state. The home-screen app keeps its own storage on iPhone, so
      // there it opens on sign-in (phone + PIN) rather than on joining.
      authModalOpen: false,
      authTab: isStandalone() ? 'signin' : 'register',
      authFirstName: '',
      authPhone: initialSession?.phone || '',
      authPin: '',
      authError: '',
      authLoading: false,
      currentUser: initialSession,
      installPrompt: null,
      showInstall: false,
    };
    this.refreshTimer = null;
  }

  async componentDidMount() {
    await this.loadCard();
    if (typeof window !== 'undefined') {
      this.refreshTimer = setInterval(() => {
        if (document.visibilityState === 'visible') this.refreshCard();
      }, REFRESH_MS);
      document.addEventListener('visibilitychange', this.handleVisibility);
      window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
      window.addEventListener('appinstalled', this.dismissInstall);
      // Right after joining (?new=1), offer to put the card on the home screen.
      if (new URLSearchParams(window.location.search).get('new') === '1') this.offerInstall();
    }
  }

  componentWillUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
    if (typeof window !== 'undefined') {
      document.removeEventListener('visibilitychange', this.handleVisibility);
      window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt);
      window.removeEventListener('appinstalled', this.dismissInstall);
    }
  }

  handleInstallPrompt = (e) => {
    e.preventDefault();
    this.setState({ installPrompt: e });
  };

  offerInstall = () => {
    if (isStandalone()) return;
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(INSTALL_DISMISSED_KEY) === '1';
    } catch {}
    if (!dismissed && this.state.token) this.setState({ showInstall: true, menu: false });
  };

  install = async () => {
    const promptEvent = this.state.installPrompt;
    if (!promptEvent) return;
    promptEvent.prompt();
    try {
      await promptEvent.userChoice;
    } catch {}
    this.setState({ installPrompt: null, showInstall: false });
  };

  dismissInstall = () => {
    try {
      window.localStorage.setItem(INSTALL_DISMISSED_KEY, '1');
    } catch {}
    this.setState({ showInstall: false });
  };

  handleVisibility = () => {
    if (document.visibilityState === 'visible') this.refreshCard();
  };

  /** The shop this page joins: from the QR link (?m=), else the shop of the saved card. */
  joinReference() {
    let fromUrl = null;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      fromUrl = params.get('m') || params.get('merchant') || params.get('slug');
    }
    return fromUrl || this.state.currentUser?.joinReference || getOrAssignMerchantCode();
  }

  /** A card token passed in the link (?token=) opens that card on this browser. */
  tokenFromUrl() {
    if (typeof window === 'undefined') return null;
    const t = new URLSearchParams(window.location.search).get('token');
    return t && t.length >= 20 ? t : null;
  }

  refreshCard = async () => {
    const token = this.state.token;
    if (!token || this.state.authModalOpen) return;
    try {
      const card = await api.public.getWebCard(token);
      if (card) this.setState({ card, error: null });
    } catch (err) {
      // The card was reopened on another phone (new token) or reissued by staff: this copy is dead.
      if (err.status === 404) this.signedOutElsewhere();
    }
  };

  /** Inside Telegram, a missing or stale card goes back through Telegram sign-in (no PIN there). */
  backToTelegramSignIn() {
    if (!isInTelegram()) return false;
    window.location.replace(`/tg?m=${encodeURIComponent(this.joinReference())}`);
    return true;
  }

  signedOutElsewhere() {
    logoutCustomer();
    if (this.backToTelegramSignIn()) return;
    this.setState({
      card: null,
      token: null,
      currentUser: null,
      authModalOpen: true,
      authTab: 'signin',
      authError: 'This card was opened on another phone. Sign in with your phone number and PIN to use it here.',
    });
  }

  onAuthFirstName = (e) => {
    this.setState({ authFirstName: e.target.value, authError: '' });
  };

  onAuthPhone = (e) => {
    this.setState({ authPhone: e.target.value, authError: '' });
  };

  onAuthPin = (e) => {
    this.setState({ authPin: e.target.value.replace(/\D/g, '').slice(0, 6), authError: '' });
  };

  setAuthTab = (tab) => {
    this.setState({ authTab: tab, authError: '' });
  };

  handleAuthSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const { authTab, authFirstName, authPhone, authPin, lang } = this.state;
    this.setState({ authLoading: true, authError: '' });
    try {
      let session;
      if (authTab === 'signin') {
        session = await signInCustomer({ joinReference: this.joinReference(), phone: authPhone, pin: authPin });
      } else {
        let consentVersion;
        try {
          consentVersion = (await api.public.getJoinInfo(this.joinReference()))?.consent?.version;
        } catch {}
        session = await registerCustomer({
          joinReference: this.joinReference(),
          firstName: authFirstName,
          phone: authPhone,
          pin: authPin,
          preferredLanguage: lang === 'am' ? 'AM' : 'EN',
          consentVersion,
        });
      }
      this.setState({
        currentUser: session,
        token: session.token,
        authModalOpen: false,
        authLoading: false,
        authPin: '',
      });
      await this.loadCard();
      if (authTab === 'register') this.offerInstall();
    } catch (err) {
      this.setState({
        authTab: err.code === 'ALREADY_MEMBER' ? 'signin' : authTab,
        authError: err.message || 'Something went wrong. Please try again.',
        authLoading: false,
      });
    }
  };

  handleLogout = () => {
    const ok = window.confirm(
      'Sign out of this card on this phone? Your stamps stay with the shop. Sign back in any time with your phone number and PIN.',
    );
    if (!ok) return;
    logoutCustomer();
    this.setState({
      currentUser: null,
      token: null,
      card: null,
      menu: false,
      authModalOpen: true,
      authTab: 'signin',
      authError: '',
    });
  };

  async loadCard() {
    const token = this.tokenFromUrl() || this.state.token || getCustomerSession()?.token || null;
    if (!token) {
      if (this.backToTelegramSignIn()) return;
      this.setState({ loading: false, authModalOpen: true });
      return;
    }
    try {
      const card = await api.public.getWebCard(token);
      this.setState({ card, token, loading: false, error: null, authModalOpen: false });
    } catch (err) {
      // An unknown or revoked token: forget it and offer to join again.
      if (err.status === 404 || err.status === 400 || err.status === 410) {
        this.signedOutElsewhere();
        this.setState({ loading: false });
        return;
      }
      this.setState({ loading: false, error: 'Could not load your card. Check your connection and try again.' });
    }
  }

  handleWallet = async (provider) => {
    const token = this.state.token;
    if (!token) {
      this.setState({ authModalOpen: true });
      return;
    }
    this.setState({ walletLoading: true, walletMsg: null });
    try {
      const res = await api.public.getWalletLink(token, provider);
      if (res && res.url) {
        window.open(res.url, '_blank');
        this.setState({
          walletLoading: false,
          walletMsg:
            provider === 'APPLE' ? 'Opening Apple Wallet pass download...' : 'Opening Google Wallet save link...',
        });
      } else {
        this.setState({
          walletLoading: false,
          walletMsg: `${provider === 'APPLE' ? 'Apple' : 'Google'} Wallet is not available for this card yet.`,
        });
      }
    } catch (err) {
      this.setState({
        walletLoading: false,
        walletMsg: `${provider === 'APPLE' ? 'Apple' : 'Google'} Wallet: ${err.message || 'not available right now.'}`,
      });
    }
  };

  renderVals() {
    const card = this.state.card;
    const maxStamps = card?.progress?.required ?? 10;
    const n = Math.max(0, Math.min(maxStamps, card?.progress?.current ?? (this.props.stamps ?? 0)));
    const unlocked = n >= maxStamps || (card?.rewardsAvailable ?? 0) > 0;
    const brandColor = card?.program?.brandColor || '#8a4b2a';
    const slots = [];
    for (let i = 0; i < maxStamps; i++) {
      const r = i === maxStamps - 1;
      const e = !r && i < n;
      slots.push({
        earned: e,
        reward: r,
        bg: r ? (unlocked ? '#e42330' : 'transparent') : e ? brandColor : 'transparent',
        border: r ? '#e42330' : e ? brandColor : '#e3e5ec',
        bs: r && !unlocked ? 'dashed' : 'solid',
        icon: unlocked ? '#ffffff' : '#c81d29',
      });
    }
    const am = this.state.lang === 'am';
    const left = Math.max(0, maxStamps - n);
    const rewardName = am
      ? card?.reward?.nameAm || card?.reward?.nameEn || 'ነፃ ማኪያቶ'
      : card?.reward?.nameEn || 'free macchiato';

    const token = this.state.token || '';
    // Last characters of the card token: enough for staff to read out, useless to anyone else.
    const memberId = token ? token.slice(-6).toUpperCase() : '—';

    const T = am
      ? {
          stamps: 'ማህተሞች',
          expires: 'የሚያበቃበት',
          last: 'የመጨረሻ ማህተም',
          show: 'ይህን ኮድ ለካውንተሩ ያሳዩ',
          apple: 'ወደ Apple Wallet ያክሉ',
          google: 'ወደ Google Wallet ያክሉ',
          banner: unlocked
            ? `${rewardName} ተከፍቷል። ለካውንተሩ ያሳዩ።`
            : n === 0
              ? `ለ${rewardName} ${maxStamps} ጉብኝት ቀርቷል · ለ1ኛ ማህተም ለካውንተሩ ያሳዩ`
              : `ለ${rewardName} ${left} ጉብኝት ቀርቷል`,
        }
      : {
          stamps: 'STAMPS',
          expires: 'CARD EXPIRES',
          last: 'LAST STAMP',
          show: 'Show this code at the counter',
          apple: 'Add to Apple Wallet',
          google: 'Add to Google Wallet',
          banner: unlocked
            ? `${rewardName} unlocked. Show this at the counter.`
            : n === 0
              ? `${maxStamps} visits to a ${rewardName} · Show at counter for 1st stamp`
              : `${left} more ${left === 1 ? 'visit' : 'visits'} to a ${rewardName}`,
        };

    const businessName = am
      ? card?.merchant?.nameAm || card?.merchant?.nameEn || 'ሳምፕል ካፌ'
      : card?.merchant?.nameEn || 'SAMPLE CAFE';

    const parts = (businessName || '').split(' ');
    const nameA = parts[0] || 'TEMELASH';
    const nameB = parts.slice(1).join(' ') || 'CARD';
    const initial = nameA.charAt(0).toUpperCase() || 'T';

    const pattern = '111101111100101001101101101111101111000010000101110110010010000101111101011100101';
    const qr = pattern.split('').map((c) => ({ c: c === '1' ? '#101827' : 'transparent' }));

    const firstName = card?.customer?.firstName || 'Member';
    const memberLabel = am ? `አባል · ${memberId}` : `Member · ${memberId}`;

    // The QR carries the opaque card token itself: it is what the staff scanner validates.
    const barcodeValue = token;
    const qrValue = token;
    const isNew = n === 0;
    const lastVisitText = isNew ? (am ? 'አዲስ አባል' : 'New member') : (am ? 'የቅርብ ጊዜ' : 'Recent visit');

    return {
      slots,
      qr,
      qrValue,
      cardToken: qrValue,
      barcodeValue,
      memberId,
      lastVisitText,
      t: T,
      countLabel: `${n}/${maxStamps}`,
      banner: T.banner,
      bannerBg: unlocked ? brandColor : '#fff3dc',
      bannerFg: '#101827',
      font: am ? "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif" : "'Source Sans 3', sans-serif",
      langLabel: am ? 'EN' : 'አማ',
      toggleLang: () => this.setState({ lang: am ? 'en' : 'am' }),
      menuOpen: this.state.menu,
      openMenu: () => this.setState({ menu: true }),
      closeMenu: () => this.setState({ menu: false }),
      nameA,
      nameB,
      initial,
      brandColor,
      memberLabel,
      merchantFullName: businessName,
      cardId: card?.program?.nameEn || 'Loyalty card',
      programTitle: am
        ? card?.program?.nameAm || card?.program?.nameEn || 'የታማኝነት ካርድ'
        : card?.program?.nameEn || 'Loyalty Card',
      authModalOpen: this.state.authModalOpen,
      authTab: this.state.authTab,
      authPin: this.state.authPin,
      onAuthPin: this.onAuthPin,
      setAuthTab: this.setAuthTab,
      showInstall: this.state.showInstall,
      installMethod: installMethod(this.state.installPrompt),
      install: this.install,
      dismissInstall: this.dismissInstall,
      offerInstall: this.offerInstall,
      canOfferInstall: !isStandalone(),
      authFirstName: this.state.authFirstName,
      authPhone: this.state.authPhone,
      authError: this.state.authError,
      authLoading: this.state.authLoading,
      currentUser: this.state.currentUser,
      onAuthFirstName: this.onAuthFirstName,
      onAuthPhone: this.onAuthPhone,
      handleAuthSubmit: this.handleAuthSubmit,
      logout: this.handleLogout,
      rewardDescription: am
        ? card?.reward?.nameAm || `${maxStamps} ማህተም ሲሞላ`
        : `${card?.reward?.nameEn || 'Reward'} at ${maxStamps} stamps`,
      merchantAddress: 'Bole Road, Addis Ababa',
      merchantHours: 'Mon–Sat 7:00–21:00',
      merchantPhone: '+251 91 123 4567',
      termsText: am
        ? card?.program?.termsAm || 'በአንድ ጉብኝት አንድ ማህተም። ሽልማቱ ለ30 ቀናት ያገለግላል።'
        : card?.program?.termsEn || 'One stamp per visit. Reward valid 30 days after it unlocks.',
      onAppleWallet: () => this.handleWallet('APPLE'),
      onGoogleWallet: () => this.handleWallet('GOOGLE'),
      walletMsg: this.state.walletMsg,
      clearWalletMsg: () => this.setState({ walletMsg: null }),
    };
  }
}

WebCardView.defaultProps = { stamps: 0 };

WebCardView.prototype.__template = renderWebCard;

export default withDCStyle(WebCardView, 'WebCard', __CSS);
