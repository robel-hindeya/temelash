import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import api, { getOrAssignMerchantCode } from '@/lib/api';
import jsQR from 'jsqr';
import renderStaffApp from './StaffApp.view';

const __CSS = `
body { margin: 0; }
input, button { font: inherit; }
button:focus-visible, input:focus-visible { outline: 2px solid #4661ad; outline-offset: 2px; }
@keyframes tmScanLaser {
  0% { top: 10%; opacity: 0.95; }
  50% { top: 88%; opacity: 1; }
  100% { top: 10%; opacity: 0.95; }
}
@keyframes tmPulseDot {
  0% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.25); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.8; }
}
@keyframes tmSuccessFlash {
  0% { opacity: 0; transform: scale(0.92); }
  60% { opacity: 1; transform: scale(1.02); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;

const SHOW_TEST_TOOLS = process.env.NODE_ENV !== 'production';

function playScanBeep() {
  try {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1850, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  } catch (err) {
    console.debug('Scanner audio error:', err);
  }
}

function triggerHaptic() {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([40, 30, 60]);
    }
  } catch {}
}

function extractScanInfo(raw) {
  if (!raw || typeof raw !== 'string') return { token: '', cardId: null, userId: null };
  const text = raw.trim();

  // 1. JSON object payload check
  if ((text.startsWith('{') && text.endsWith('}')) || (text.startsWith('{"') && text.endsWith('"}'))) {
    try {
      const parsed = JSON.parse(text);
      const cardId = parsed.cardId || parsed.c || null;
      const userId = parsed.userId || parsed.memberId || parsed.id || null;
      const token = parsed.cardToken || parsed.token || parsed.barcode || userId || cardId || '';
      return { token: String(token).trim(), cardId: cardId ? String(cardId).trim() : null, userId: userId ? String(userId).trim() : null };
    } catch {}
  }

  // 2. URL parsing (e.g., https://domain.com/card?c=UXwJ9RwdyHs&id=s9XmK2pL4vQ or /card/UXwJ9RwdyHs)
  if (text.includes('?') || text.startsWith('http://') || text.startsWith('https://') || text.includes('/card')) {
    try {
      const url = new URL(text.startsWith('http') ? text : `https://temelashcard.et/${text.replace(/^\//, '')}`);
      const cardId = url.searchParams.get('c') || url.searchParams.get('card') || url.searchParams.get('cardId');
      const userId = url.searchParams.get('id') || url.searchParams.get('memberId') || url.searchParams.get('userId');
      const token = url.searchParams.get('token') || url.searchParams.get('cardToken') || url.searchParams.get('t') || userId || cardId;

      const segments = url.pathname.split('/').filter(Boolean);
      const cardIdx = segments.indexOf('card');
      let pathId = null;
      if (cardIdx !== -1 && segments[cardIdx + 1]) {
        pathId = segments[cardIdx + 1].trim();
      }

      return {
        token: (token || pathId || '').trim(),
        cardId: (cardId || pathId || null)?.trim(),
        userId: (userId || null)?.trim(),
      };
    } catch {}
  }

  // 3. Match 10-64 char token pattern (matches 11-char tokens like UXwJ9RwdyHs)
  const match = text.match(/[A-Za-z0-9_-]{10,64}/);
  const matched = match ? (text.length <= 64 && !text.includes(' ') && !text.includes('/') && !text.includes(':') ? text : match[0]) : text;
  return { token: matched, cardId: null, userId: null };
}

function extractTokenFromScan(raw) {
  const info = extractScanInfo(raw);
  return info.token || info.userId || info.cardId || raw;
}


class StaffAppView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'scan',
      today: 0,
      bizName: 'Sample Cafe',
      staffSubtitle: 'Staff',
      phoneInput: '',
      cardTokenInput: '',
      scanError: '',
      testCards: [],
      rewardTitle: 'Reward',
      customer: null,
      cameraActive: false,
      cameraLoading: false,
      cameraError: '',
      facingMode: 'environment',
      hasMultipleCameras: false,
      torchOn: false,
      torchSupported: false,
      scannedSuccess: false,
      stampCounter: 1,
    };

    this.videoEl = null;
    this.canvasEl = null;
    this.fileInputEl = null;
    this.stream = null;
    this.scanRafId = null;
    this.isProcessingScan = false;
    this.barcodeDetector = null;
  }

  incStampCounter = () => {
    this.setState((prev) => ({ stampCounter: Math.min((prev.stampCounter || 1) + 1, 10) }));
  };

  decStampCounter = () => {
    this.setState((prev) => ({ stampCounter: Math.max((prev.stampCounter || 1) - 1, 1) }));
  };

  setStampCounter = (amt) => {
    this.setState({ stampCounter: Math.max(1, Math.min(Number(amt) || 1, 10)) });
  };

  async componentDidMount() {
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      try {
        this.barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });
      } catch (e) {
        this.barcodeDetector = null;
      }
    }

    try {
      const [profRes, meRes, progRes, analyticsRes] = await Promise.allSettled([
        api.merchant.getProfile(),
        api.auth.getMe('staff'),
        api.merchant.getPrograms('ACTIVE', 'staff'),
        api.merchant.getAnalyticsOverview(),
      ]);
      const updates = {};
      if (profRes.status === 'fulfilled' && profRes.value) {
        updates.bizName = profRes.value.nameEn || 'Sample Cafe';
      }
      if (meRes.status === 'fulfilled' && meRes.value) {
        updates.staffSubtitle = meRes.value.displayName || 'Staff';
      }
      if (progRes.status === 'fulfilled' && progRes.value?.length) {
        const p = progRes.value[0];
        updates.rewardTitle = p.reward?.nameEn || 'Reward';
      }
      if (analyticsRes.status === 'fulfilled' && analyticsRes.value) {
        updates.today = analyticsRes.value.stampsIssued?.count || 0;
      }

      this.setState(updates);
    } catch (e) {
      console.warn('Failed to load staff app context:', e);
    }

    if (this.state.screen === 'scan') {
      this.startCamera();
    }
  }

  componentWillUnmount() {
    this.stopCamera();
  }

  scanFrame = async () => {
    if (!this.state.cameraActive || this.state.screen !== 'scan' || this.isProcessingScan) {
      return;
    }

    const video = this.videoEl;
    if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.videoWidth > 0 && video.videoHeight > 0) {
      let detectedText = null;

      // 1. Try native BarcodeDetector if available
      if (this.barcodeDetector) {
        try {
          const barcodes = await this.barcodeDetector.detect(video);
          if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            detectedText = barcodes[0].rawValue;
          }
        } catch (e) {
          // Continue to fallback
        }
      }

      // 2. Fall back to jsQR
      if (!detectedText) {
        if (!this.canvasEl) {
          this.canvasEl = document.createElement('canvas');
        }
        const canvas = this.canvasEl;
        const scale = Math.min(1, 640 / Math.max(video.videoWidth, video.videoHeight));
        const width = Math.max(1, Math.floor(video.videoWidth * scale));
        const height = Math.max(1, Math.floor(video.videoHeight * scale));

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, width, height);
          const imgData = ctx.getImageData(0, 0, width, height);
          const decode = typeof jsQR === 'function' ? jsQR : jsQR?.default;
          if (decode) {
            const code = decode(imgData.data, width, height, {
              inversionAttempts: 'dontInvert',
            });
            if (code && code.data) {
              detectedText = code.data;
            }
          }
        }
      }

      if (detectedText) {
        await this.handleDetectedCode(detectedText);
        return;
      }
    }

    if (this.state.cameraActive && this.state.screen === 'scan' && !this.isProcessingScan) {
      this.scanRafId = requestAnimationFrame(this.scanFrame);
    }
  };

  async handleDetectedCode(rawText) {
    if (this.isProcessingScan) return;
    this.isProcessingScan = true;

    playScanBeep();
    triggerHaptic();

    const scanInfo = extractScanInfo(rawText);
    const displayToken = scanInfo.token || scanInfo.userId || scanInfo.cardId || rawText;
    this.setState({
      scannedSuccess: true,
      cardTokenInput: displayToken,
      scanError: '',
    });

    setTimeout(async () => {
      this.stopCamera();
      await this.validateToken(scanInfo);
      if (this.state.screen === 'scan') {
        this.isProcessingScan = false;
        this.setState({ scannedSuccess: false });
        this.startCamera();
      } else {
        this.setState({ scannedSuccess: false });
        this.isProcessingScan = false;
      }
    }, 400);
  }

  async startCamera() {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      this.setState({
        cameraError: 'Camera is not supported on this browser or connection is not secure (HTTPS required).',
        cameraActive: false,
        cameraLoading: false,
      });
      return;
    }

    this.stopCamera();
    this.setState({ cameraLoading: true, cameraError: '', scannedSuccess: false });
    this.isProcessingScan = false;

    const facing = this.state.facingMode || 'environment';
    let stream = null;

    try {
      try {
        if (navigator.mediaDevices.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoDevs = devices.filter((d) => d.kind === 'videoinput');
          if (videoDevs.length > 1) {
            this.setState({ hasMultipleCameras: true });
          }
        }
      } catch {}

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facing },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (err) {
        console.warn('Ideal camera constraint failed, using default video constraint:', err);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      this.stream = stream;

      const track = stream.getVideoTracks()?.[0];
      let torchSupported = false;
      if (track && typeof track.getCapabilities === 'function') {
        try {
          const caps = track.getCapabilities();
          if (caps.torch) {
            torchSupported = true;
          }
        } catch {}
      }

      if (this.videoEl) {
        this.videoEl.srcObject = stream;
        try {
          await this.videoEl.play();
        } catch (playErr) {
          console.warn('Video play error:', playErr);
        }
      }

      this.setState({
        cameraActive: true,
        cameraLoading: false,
        cameraError: '',
        torchSupported,
        torchOn: false,
      });

      if (this.scanRafId) cancelAnimationFrame(this.scanRafId);
      this.scanRafId = requestAnimationFrame(this.scanFrame);
    } catch (err) {
      console.error('Camera access failed:', err);
      let errMsg = 'Unable to access camera. Please allow camera permissions in your browser settings.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errMsg = 'Camera permission was denied. Please allow camera access in your browser address bar.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errMsg = 'No camera found on this device. You can paste a token or upload a QR image below.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errMsg = 'Camera is already in use by another application or tab.';
      }
      this.setState({
        cameraActive: false,
        cameraLoading: false,
        cameraError: errMsg,
      });
    }
  }

  stopCamera() {
    if (this.scanRafId) {
      cancelAnimationFrame(this.scanRafId);
      this.scanRafId = null;
    }
    if (this.stream) {
      try {
        this.stream.getTracks().forEach((track) => {
          try {
            track.stop();
          } catch {}
        });
      } catch {}
      this.stream = null;
    }
    if (this.videoEl) {
      this.videoEl.srcObject = null;
    }
    this.setState({ cameraActive: false, cameraLoading: false, torchOn: false });
  }

  toggleCamera = () => {
    if (this.state.cameraActive) {
      this.stopCamera();
    } else {
      this.startCamera();
    }
  };

  flipCamera = () => {
    const nextFacing = this.state.facingMode === 'environment' ? 'user' : 'environment';
    this.setState({ facingMode: nextFacing }, () => {
      this.startCamera();
    });
  };

  toggleTorch = async () => {
    if (!this.stream) return;
    const track = this.stream.getVideoTracks()?.[0];
    if (!track) return;
    const nextVal = !this.state.torchOn;
    try {
      await track.applyConstraints({
        advanced: [{ torch: nextVal }],
      });
      this.setState({ torchOn: nextVal });
    } catch (e) {
      console.warn('Torch constraint error:', e);
    }
  };

  handleImageUpload = (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          let detected = null;
          if (this.barcodeDetector) {
            try {
              const results = await this.barcodeDetector.detect(img);
              if (results?.length > 0 && results[0].rawValue) {
                detected = results[0].rawValue;
              }
            } catch {}
          }

          if (!detected) {
            const decode = typeof jsQR === 'function' ? jsQR : jsQR?.default;
            if (decode) {
              const code = decode(imgData.data, canvas.width, canvas.height);
              if (code && code.data) {
                detected = code.data;
              }
            }
          }

          if (detected) {
            this.handleDetectedCode(detected);
          } else {
            this.setState({
              scanError: 'Could not detect a QR code in this image. Please ensure the QR code is clear and well-lit.',
            });
          }
        } catch (err) {
          this.setState({ scanError: 'Failed to process image: ' + err.message });
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  toScan = () => {
    this.isProcessingScan = false;
    this.setState({ screen: 'scan', scanError: '', scannedSuccess: false }, () => {
      this.startCamera();
    });
  };

  /** Customer state for the screen, built only from a backend scanner response. */
  customerFromScan(res, cardToken, extra = {}) {
    const p = res?.progress || {};
    const name = res?.customer?.firstName || 'Customer';
    return {
      name,
      initials: name.slice(0, 2).toUpperCase(),
      phone: '',
      visits: p.current ?? 0,
      lastVisit: 'Today',
      stamps: p.current ?? 0,
      maxStamps: p.required || 10,
      rewardsAvailable: p.rewardsAvailable ?? 0,
      rewardTitle: res?.reward?.nameEn || this.state.rewardTitle || 'Reward',
      cardToken,
      cardName: 'Loyalty Card',
      cooldownNotice: null,
      canStamp: true,
      ...extra,
    };
  }

  async validateToken(tokenToTest) {
    const raw =
      typeof tokenToTest === 'object' && tokenToTest
        ? tokenToTest.token || ''
        : tokenToTest || this.state.cardTokenInput || '';
    const token = extractTokenFromScan(String(raw).trim());

    if (!token) {
      this.setState({ scanError: 'Please scan or enter the code on the customer’s card.' });
      return;
    }
    // Real card tokens are long opaque strings; anything shorter is not a Temelash card.
    if (token.length < 20) {
      this.isProcessingScan = false;
      this.setState({ scanError: 'This is not a Temelash card code. Ask the customer to open their card.' });
      return;
    }
    this.setState({ scanError: '' });

    let res;
    try {
      res = await api.scanner.validate({ cardToken: token });
    } catch (err) {
      this.isProcessingScan = false;
      this.setState({ scanError: err.message || 'Could not check this card. Try again.' });
      return;
    }

    const isCooldown = res.outcome === 'REJECTED' && res.reason === 'COOLDOWN_ACTIVE';
    if (res.outcome === 'REJECTED' && !isCooldown) {
      this.isProcessingScan = false;
      this.setState({ scanError: res.message?.en || 'This card cannot be stamped.' });
      return;
    }

    this.stopCamera();
    const customer = this.customerFromScan(res, token, {
      cooldownNotice: isCooldown ? res.message?.en || 'Already stamped recently. Try again later.' : null,
      canStamp: !isCooldown,
    });
    this.setState({
      customer,
      screen: customer.rewardsAvailable > 0 ? 'unlocked' : 'customer',
      stampCounter: 1,
      scanError: '',
    });
  }

  async createQuickTestCard() {
    try {
      const rndPhone = '+2519' + Math.floor(10000000 + Math.random() * 90000000);
      const rndEmail = 'test' + Date.now().toString().slice(-5) + '@customer.test';
      const res = await api.public.enroll(getOrAssignMerchantCode(), {
        firstName: 'Test Customer',
        phone: rndPhone,
        email: rndEmail,
        acceptTerms: true,
        preferredLanguage: 'EN',
        marketingConsent: false,
      });
      if (res?.card?.token) {
        const newCard = { name: 'Test Customer', token: res.card.token, phone: rndPhone };
        this.setState({ testCards: [newCard, ...this.state.testCards], cardTokenInput: res.card.token });
        await this.validateToken(res.card.token);
      }
    } catch (e) {
      this.setState({ scanError: 'Could not enroll quick test customer: ' + e.message });
    }
  }

  renderVals() {
    const sc = this.state.screen;
    const cust = this.state.customer;
    const maxSt = cust?.maxStamps || 10;
    const currentSt = cust?.stamps || 0;

    const mkSlots = (earnedCount, unlocked) => {
      const out = [];
      for (let i = 0; i < maxSt; i++) {
        const r = i === maxSt - 1;
        const e = i < earnedCount && !r;
        out.push({
          reward: r,
          bg: r ? (unlocked ? '#e42330' : 'transparent') : e ? '#fba919' : 'transparent',
          border: r ? '#e42330' : e ? '#fba919' : '#e3e5ec',
          bs: r && !unlocked ? 'dashed' : 'solid',
          iconColor: unlocked ? '#ffffff' : '#c81d29',
        });
      }
      return out;
    };

    return {
      bizName: this.state.bizName,
      staffSubtitle: this.state.staffSubtitle,
      today: String(this.state.today),
      isScan: sc === 'scan',
      isCustomer: sc === 'customer',
      isUnlocked: sc === 'unlocked',
      isRedeemed: sc === 'redeemed',
      cameraActive: this.state.cameraActive,
      cameraLoading: this.state.cameraLoading,
      cameraError: this.state.cameraError,
      facingMode: this.state.facingMode,
      hasMultipleCameras: this.state.hasMultipleCameras,
      torchSupported: this.state.torchSupported,
      torchOn: this.state.torchOn,
      scannedSuccess: this.state.scannedSuccess,
      startCamera: () => this.startCamera(),
      stopCamera: () => this.stopCamera(),
      toggleCamera: () => this.toggleCamera(),
      flipCamera: () => this.flipCamera(),
      toggleTorch: () => this.toggleTorch(),
      triggerUpload: () => this.fileInputEl?.click(),
      onImageUpload: (e) => this.handleImageUpload(e),
      phoneInput: this.state.phoneInput,
      onPhoneChange: (e) => this.setState({ phoneInput: e.target.value, scanError: '' }),
      cardTokenInput: this.state.cardTokenInput,
      onCardTokenChange: (e) => this.setState({ cardTokenInput: e.target.value, scanError: '' }),
      // Test-customer shortcuts exist for local development only.
      showTestTools: SHOW_TEST_TOOLS,
      testCards: SHOW_TEST_TOOLS ? this.state.testCards : [],
      onPickTestCard: (tok) => {
        this.setState({ cardTokenInput: tok });
        this.validateToken(tok);
      },
      createQuickTestCard: () => this.createQuickTestCard(),
      scanError: this.state.scanError,
      cooldownNotice: cust?.cooldownNotice,
      toScan: () => this.toScan(),
      scanCardNow: () => this.validateToken(),
      toCustomer: async () => {
        const q = (this.state.phoneInput || '').trim();
        if (!q) {
          await this.validateToken();
          return;
        }
        try {
          const res = await api.merchant.getCustomers({ q });
          const c = res?.items?.[0];
          this.setState({
            scanError: c
              ? `${c.firstName || 'Customer'} is a member. Ask them to show their card QR to add a stamp.`
              : 'No customer found for ' + q,
          });
        } catch (e) {
          this.setState({ scanError: e.message || 'Lookup failed' });
        }
      },
      addStamp: async (countToAdd) => {
        const count = typeof countToAdd === 'number' ? countToAdd : this.state.stampCounter || 1;
        if (!cust) {
          this.setState({ scanError: 'No active customer card loaded.' });
          return;
        }
        if (!cust.canStamp) {
          this.setState({ scanError: cust.cooldownNotice || 'This card cannot be stamped right now.' });
          return;
        }

        // Each stamp is its own backend call; stop at the first one the backend refuses.
        let added = 0;
        let last = null;
        let problem = '';
        for (let i = 0; i < count; i++) {
          try {
            const res = await api.scanner.stamp({ cardToken: cust.cardToken });
            if (res.outcome !== 'STAMPED') {
              problem = res.message?.en || 'The stamp was not added.';
              break;
            }
            added += 1;
            last = res;
          } catch (err) {
            problem = err.message || 'The stamp was not added. Check the connection and try again.';
            break;
          }
        }

        if (!added) {
          this.setState({ scanError: problem });
          return;
        }

        triggerHaptic();
        playScanBeep();

        const next = this.customerFromScan(last, cust.cardToken, { name: cust.name, initials: cust.initials });
        const unlocked = !!last.reward?.unlocked || next.rewardsAvailable > 0;
        this.setState({
          today: (this.state.today || 0) + added,
          customer: next,
          screen: unlocked ? 'unlocked' : 'customer',
          stampCounter: 1,
          scanError: problem ? `${added} of ${count} stamps added. ${problem}` : '',
        });
      },
      redeemReward: async () => {
        if (!cust) return;
        try {
          const res = await api.scanner.redeem({ cardToken: cust.cardToken });
          if (res.outcome !== 'REDEEMED') {
            this.setState({ scanError: res.message?.en || 'The reward could not be redeemed.' });
            return;
          }
          const p = res.progress || {};
          this.setState({
            customer: Object.assign({}, cust, {
              stamps: p.current ?? cust.stamps,
              rewardsAvailable: p.rewardsAvailable ?? 0,
            }),
            screen: 'redeemed',
            scanError: '',
          });
        } catch (err) {
          this.setState({ scanError: err.message || 'The reward could not be redeemed. Try again.' });
        }
      },
      custName: cust?.name || 'Customer',
      custCardName: cust?.cardName || 'Loyalty Card',
      custCardId: cust?.cardId || 'UXwJ9RwdyHs',
      custUserId: cust?.userId || cust?.cardToken || '',
      custInitials: cust?.initials || 'CU',
      custMeta: `${cust?.visits || 1} visits · last visit ${cust?.lastVisit || 'Today'}`,
      custStampsFraction: `${currentSt}/${maxSt}`,
      rewardTitle: cust?.rewardTitle || this.state.rewardTitle || 'Reward',
      stampsToGo: Math.max(0, maxSt - currentSt),
      slots9: mkSlots(currentSt, false),
      slots10: mkSlots(maxSt, true),
      stampCounter: this.state.stampCounter || 1,
      incStampCounter: this.incStampCounter,
      decStampCounter: this.decStampCounter,
      setStampCounter: this.setStampCounter,
      currentStamps: currentSt,
      maxStamps: maxSt,
    };
  }
}

StaffAppView.defaultProps = {};

StaffAppView.prototype.__template = renderStaffApp;

export default withDCStyle(StaffAppView, 'StaffApp', __CSS);
