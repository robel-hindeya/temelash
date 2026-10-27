import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import api, {
  getMerchantLoyaltyCard,
  getMerchantLoyaltyCards,
  getUserCardStamps,
  recordCardStamp,
  resetUserCardStamps,
} from '@/lib/api';
import jsQR from 'jsqr';

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

function extractTokenFromScan(raw) {
  if (!raw || typeof raw !== 'string') return '';
  const text = raw.trim();

  // 1. JSON object payload check
  if ((text.startsWith('{') && text.endsWith('}')) || (text.startsWith('{"') && text.endsWith('"}'))) {
    try {
      const parsed = JSON.parse(text);
      if (parsed.cardToken) return String(parsed.cardToken).trim();
      if (parsed.token) return String(parsed.token).trim();
      if (parsed.memberId) return String(parsed.memberId).trim();
      if (parsed.userId) return String(parsed.userId).trim();
      if (parsed.id) return String(parsed.id).trim();
      if (parsed.barcode) return String(parsed.barcode).trim();
    } catch {}
  }

  // 2. URL parsing (e.g., https://domain.com/card?token=... or /card/<token> or /card/<id>)
  if (text.includes('?') || text.startsWith('http://') || text.startsWith('https://') || text.includes('/card')) {
    try {
      const url = new URL(text.startsWith('http') ? text : `https://temelashcard.et/${text.replace(/^\//, '')}`);
      const tokParam =
        url.searchParams.get('token') ||
        url.searchParams.get('id') ||
        url.searchParams.get('c') ||
        url.searchParams.get('cardToken') ||
        url.searchParams.get('card') ||
        url.searchParams.get('t');
      if (tokParam) return tokParam.trim();

      const segments = url.pathname.split('/').filter(Boolean);
      const cardIdx = segments.indexOf('card');
      if (cardIdx !== -1 && segments[cardIdx + 1]) {
        return segments[cardIdx + 1].trim();
      }
    } catch {}
  }

  // 3. Match 10-64 char token pattern (matches 11-char tokens like UXwJ9RwdyHs)
  const match = text.match(/[A-Za-z0-9_-]{10,64}/);
  if (match) {
    if (text.length <= 64 && !text.includes(' ') && !text.includes('/') && !text.includes(':')) {
      return text;
    }
    return match[0];
  }

  return text;
}

class StaffAppView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'scan',
      today: 0,
      bizName: 'Sample Cafe',
      staffSubtitle: 'Bole Staff · Bole branch',
      phoneInput: '',
      cardTokenInput: '',
      scanError: '',
      testCards: [],
      rewardTitle: 'Free macchiato',
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
        api.merchant.getPrograms('ACTIVE'),
        api.merchant.getAnalyticsOverview(),
      ]);
      const updates = {};
      if (profRes.status === 'fulfilled' && profRes.value) {
        updates.bizName = profRes.value.nameEn || 'Sample Cafe';
      }
      if (meRes.status === 'fulfilled' && meRes.value) {
        const staffName = meRes.value.displayName || 'Bole Staff';
        updates.staffSubtitle = `${staffName} · Bole branch`;
      }
      if (progRes.status === 'fulfilled' && progRes.value?.length) {
        const p = progRes.value[0];
        const r = p.rewardDefinitions?.[0] || p.rewards?.[0];
        updates.rewardTitle = r?.nameEn || 'Free macchiato';
      }
      if (analyticsRes.status === 'fulfilled' && analyticsRes.value) {
        updates.today = analyticsRes.value.stampsIssued?.count || 0;
      }

      // Check for available test cards from localStorage
      const cards = [];
      try {
        const lastCard = localStorage.getItem('teme_last_enrolled_card');
        if (lastCard) {
          const parsed = JSON.parse(lastCard);
          if (parsed?.token) {
            cards.push({ name: parsed.customerName || 'Recent Customer', token: parsed.token, phone: parsed.phone });
          }
        }
        const activeTok = localStorage.getItem('teme_active_card_token');
        if (activeTok && !cards.some((c) => c.token === activeTok)) {
          cards.push({ name: 'Active Web Card', token: activeTok });
        }
      } catch {}

      updates.testCards = cards;
      if (cards.length > 0) {
        updates.cardTokenInput = cards[0].token;
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

    const token = extractTokenFromScan(rawText);
    this.setState({
      scannedSuccess: true,
      cardTokenInput: token,
      scanError: '',
    });

    setTimeout(async () => {
      this.stopCamera();
      await this.validateToken(token);
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

  async validateToken(tokenToTest) {
    const token = (tokenToTest || this.state.cardTokenInput || '').trim();
    if (!token) {
      this.setState({ scanError: 'Please enter or scan a card token or member ID.' });
      return;
    }
    this.setState({ scanError: '' });
    const loyaltyCard = getMerchantLoyaltyCard(token);
    const localSt = getUserCardStamps(loyaltyCard?.id || token, token);
    try {
      const res = await api.scanner.validate({ cardToken: token });
      const current = Math.max(res.progress?.current ?? 0, localSt);
      const required = loyaltyCard?.stampsRequired || res.progress?.required || 10;
      const custName = res.customer?.firstName || (loyaltyCard ? loyaltyCard.name : 'Customer');
      const isCooldown = res.outcome === 'REJECTED' && res.reason === 'COOLDOWN_ACTIVE';

      this.stopCamera();

      this.setState({
        customer: {
          name: custName,
          initials: (custName || 'CU').slice(0, 2).toUpperCase(),
          phone: res.customer?.phone || '',
          visits: current || 1,
          lastVisit: 'Today',
          stamps: current,
          maxStamps: required,
          rewardTitle: loyaltyCard?.rewardName || this.state.rewardTitle || 'Free macchiato',
          cardToken: token,
          cardId: loyaltyCard?.id || token,
          cooldownNotice: isCooldown ? res.message?.en || 'Cooldown active: stamp already recorded recently.' : null,
        },
        screen: 'customer',
        stampCounter: 1,
        scanError: isCooldown ? '' : (res.outcome === 'REJECTED' ? (res.message?.en || res.reason) : ''),
      });
    } catch (err) {
      if (token && token.length >= 10) {
        this.stopCamera();
        const shortName = loyaltyCard ? loyaltyCard.name : `Member ${token.slice(0, 4)}`;
        this.setState({
          customer: {
            name: shortName,
            initials: (loyaltyCard ? loyaltyCard.name : shortName).slice(0, 2).toUpperCase(),
            phone: '+251 91 *** 4567',
            visits: localSt || 1,
            lastVisit: 'Today',
            stamps: localSt,
            maxStamps: loyaltyCard?.stampsRequired || 10,
            rewardTitle: loyaltyCard?.rewardName || this.state.rewardTitle || 'Free macchiato',
            cardToken: token,
            cardId: loyaltyCard?.id || token,
            cooldownNotice: null,
          },
          screen: 'customer',
          stampCounter: 1,
          scanError: '',
        });
        return;
      }
      this.setState({ scanError: err.message || 'Validation failed. Check token or branch permission.' });
    }
  }

  async createQuickTestCard() {
    try {
      const rndPhone = '+2519' + Math.floor(10000000 + Math.random() * 90000000);
      const rndEmail = 'test' + Date.now().toString().slice(-5) + '@customer.test';
      const res = await api.public.enroll('sample-cafe', {
        firstName: 'Test Customer',
        phone: rndPhone,
        email: rndEmail,
        acceptTerms: true,
        preferredLanguage: 'EN',
        marketingConsent: true,
      });
      if (res?.card?.token) {
        const newCard = { name: 'Test Customer', token: res.card.token, phone: rndPhone };
        const updated = [newCard, ...this.state.testCards];
        try {
          localStorage.setItem('teme_last_enrolled_card', JSON.stringify({
            token: res.card.token,
            customerName: 'Test Customer',
            phone: rndPhone,
          }));
        } catch {}
        this.setState({ testCards: updated, cardTokenInput: res.card.token });
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
      testCards: this.state.testCards,
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
        if (q) {
          try {
            const res = await api.merchant.getCustomers({ q });
            if (res?.items && res.items.length > 0) {
              const c = res.items[0];
              this.stopCamera();
              this.setState({
                customer: {
                  name: c.firstName || 'Customer',
                  initials: (c.firstName || 'CU').slice(0, 2).toUpperCase(),
                  phone: c.phone || q,
                  visits: 1,
                  lastVisit: 'Today',
                  stamps: 1,
                  maxStamps: 10,
                  rewardTitle: this.state.rewardTitle || 'Free macchiato',
                  cardToken: this.state.cardTokenInput || '',
                },
                screen: 'customer',
                scanError: '',
              });
              return;
            } else {
              this.setState({ scanError: 'No customer found for ' + q });
              return;
            }
          } catch (e) {
            console.warn('Customer query error:', e);
            this.setState({ scanError: e.message || 'Lookup failed' });
            return;
          }
        }
        await this.validateToken();
      },
      addStamp: async (countToAdd) => {
        const count = typeof countToAdd === 'number' ? countToAdd : (this.state.stampCounter || 1);
        if (!cust?.cardToken) {
          this.setState({ scanError: 'No active card token attached to this scan.' });
          return;
        }

        const reqSt = cust.maxStamps || maxSt;
        const newSt = (cust.stamps || 0) + count;

        try {
          for (let i = 0; i < count; i++) {
            await api.scanner.stamp({ cardToken: cust.cardToken }).catch(() => null);
          }
        } catch (e) {
          console.warn('Backend scanner sync note:', e);
        }

        recordCardStamp({
          cardId: cust.cardId || cust.cardToken,
          userId: cust.phone || cust.name || cust.cardToken,
          cardToken: cust.cardToken,
          count,
          maxStamps: reqSt,
        });

        triggerHaptic();
        playScanBeep();

        const isUnlocked = newSt >= reqSt;
        this.setState({
          today: (this.state.today || 0) + count,
          customer: Object.assign({}, cust, { stamps: newSt, maxStamps: reqSt, cooldownNotice: null }),
          screen: isUnlocked ? 'unlocked' : 'customer',
          stampCounter: 1,
          scanError: '',
        });
      },
      redeemReward: async () => {
        if (!cust?.cardToken) return;
        try {
          await api.scanner.redeem({ cardToken: cust.cardToken }).catch(() => null);
        } catch (e) {}
        resetUserCardStamps(cust.cardId, cust.cardToken || cust.phone);
        this.setState({
          customer: Object.assign({}, cust, { stamps: 0 }),
          screen: 'redeemed',
          scanError: '',
        });
      },
      custName: cust?.name || 'Customer',
      custInitials: cust?.initials || 'CU',
      custMeta: `${cust?.visits || 1} visits · last visit ${cust?.lastVisit || 'Today'}`,
      custStampsFraction: `${currentSt}/${maxSt}`,
      rewardTitle: cust?.rewardTitle || 'Free macchiato',
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
StaffAppView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          width: '390px',
          height: '844px',
          boxSizing: 'border-box',
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <header
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e3e5ec',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 40 40" aria-hidden="true">
            <path
              d="M5 11 L15 23 L25 11"
              fill="none"
              stroke="#fba919"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 29 L25 17 L35 29"
              fill="none"
              stroke="#e42330"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{' '}
          <span style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', lineHeight: '18px' }}>
            <strong>{`${__t(__v?.bizName || 'Sample Cafe')}`}</strong>
            <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(__v?.staffSubtitle || 'Bole Staff · Bole branch')}`}</span>
          </span>{' '}
          <span
            style={{
              fontSize: '12px',
              lineHeight: '16px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              color: '#5b6475',
              textAlign: 'right',
            }}
          >
            {'TODAY'}
            <br />
            <span
              style={{
                fontSize: '20px',
                lineHeight: '22px',
                fontWeight: '800',
                color: '#101827',
                letterSpacing: '0',
                fontVariantNumeric: 'tabular-nums',
              }}
            >{`${__t(__v?.today)}`}</span>
          </span>
          <button
            type="button"
            title="Sign out of staff terminal"
            onClick={() => {
              api.auth.logout();
              window.location.href = '/';
            }}
            style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '6px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '4px',
              color: '#5b6475',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </button>
        </header>{' '}
        {__b(__v?.isScan) ? (
          <>
            <div style={{ flex: '1 1 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Scan a card'}</h1>{' '}
              {/* Scan & Batch Counter Toolbar */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e5ec',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>⚡</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#101827' }}>
                      Scanner Stamp Counter
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      Default batch: <strong>+{__v?.stampCounter} {__v?.stampCounter === 1 ? 'stamp' : 'stamps'}</strong>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[1, 2, 3, 5].map((amt) => {
                    const isSel = __v?.stampCounter === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => __v?.setStampCounter && __v.setStampCounter(amt)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: isSel ? '2px solid #101827' : '1px solid #cbd5e1',
                          background: isSel ? '#101827' : '#f8fafc',
                          color: isSel ? '#ffffff' : '#101827',
                          fontWeight: '700',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        +{amt}
                      </button>
                    );
                  })}
                </div>
              </div>{' '}
              <div
                style={{
                  position: 'relative',
                  height: '350px',
                  background: '#090d16',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                  border: '1px solid #1e293b',
                }}
              >
                {/* Hidden File Input for QR Image Upload */}
                <input
                  ref={(el) => {
                    this.fileInputEl = el;
                  }}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={__v?.onImageUpload}
                />

                {/* Live Video Camera Stream */}
                <video
                  ref={(el) => {
                    this.videoEl = el;
                    if (el && this.stream && el.srcObject !== this.stream) {
                      el.srcObject = this.stream;
                    }
                  }}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: __v?.cameraActive ? 'block' : 'none',
                  }}
                />

                {/* Dark Vignette Overlay when Camera is Active */}
                {__b(__v?.cameraActive) ? (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: 'radial-gradient(circle at center, transparent 45%, rgba(9, 13, 22, 0.7) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                ) : null}

                {/* Animated Targeting Reticle & Laser Sweep */}
                {__b(__v?.cameraActive && !__v?.scannedSuccess) ? (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      width: '210px',
                      height: '210px',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Top-Left Corner */}
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        width: '36px',
                        height: '36px',
                        borderLeft: '4px solid #ffffff',
                        borderTop: '4px solid #ffffff',
                        borderRadius: '12px 0 0 0',
                        filter: 'drop-shadow(0 0 6px rgba(251, 169, 25, 0.8))',
                      }}
                    />
                    {/* Top-Right Corner */}
                    <span
                      style={{
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        width: '36px',
                        height: '36px',
                        borderRight: '4px solid #ffffff',
                        borderTop: '4px solid #ffffff',
                        borderRadius: '0 12px 0 0',
                        filter: 'drop-shadow(0 0 6px rgba(251, 169, 25, 0.8))',
                      }}
                    />
                    {/* Bottom-Left Corner */}
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        bottom: '0',
                        width: '36px',
                        height: '36px',
                        borderLeft: '4px solid #ffffff',
                        borderBottom: '4px solid #ffffff',
                        borderRadius: '0 0 0 12px',
                        filter: 'drop-shadow(0 0 6px rgba(251, 169, 25, 0.8))',
                      }}
                    />
                    {/* Bottom-Right Corner */}
                    <span
                      style={{
                        position: 'absolute',
                        right: '0',
                        bottom: '0',
                        width: '36px',
                        height: '36px',
                        borderRight: '4px solid #ffffff',
                        borderBottom: '4px solid #ffffff',
                        borderRadius: '0 0 12px 0',
                        filter: 'drop-shadow(0 0 6px rgba(251, 169, 25, 0.8))',
                      }}
                    />
                    {/* Center Crosshair Subtlety */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '18px',
                        height: '18px',
                        opacity: 0.35,
                      }}
                    >
                      <span style={{ position: 'absolute', left: '8px', top: '0', bottom: '0', width: '2px', background: '#ffffff' }} />
                      <span style={{ position: 'absolute', top: '8px', left: '0', right: '0', height: '2px', background: '#ffffff' }} />
                    </div>
                    {/* Glowing Red-Gold Laser Sweep Line */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '6px',
                        right: '6px',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, #e42330 25%, #fba919 50%, #e42330 75%, transparent)',
                        boxShadow: '0 0 14px #e42330, 0 0 6px #fba919',
                        borderRadius: '3px',
                        animation: 'tmScanLaser 2.2s ease-in-out infinite',
                      }}
                    />
                  </div>
                ) : null}

                {/* Top Overlay Controls Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 10,
                  }}
                >
                  {/* Status Indicator */}
                  {__b(__v?.cameraActive) ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(16, 24, 39, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#ffffff',
                        letterSpacing: '0.03em',
                      }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#10b981',
                          boxShadow: '0 0 8px #10b981',
                          animation: 'tmPulseDot 1.6s ease-in-out infinite',
                        }}
                      />
                      <span>{'LIVE SCANNER'}</span>
                    </div>
                  ) : (
                    <div
                      style={{
                        background: 'rgba(16, 24, 39, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#9ca3af',
                      }}
                    >
                      {__b(__v?.cameraLoading) ? 'CONNECTING...' : 'CAMERA IDLE'}
                    </div>
                  )}

                  {/* Camera Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {__b(__v?.torchSupported) ? (
                      <button
                        type="button"
                        onClick={__v?.toggleTorch}
                        title={__v?.torchOn ? 'Turn flashlight off' : 'Turn flashlight on'}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          background: __v?.torchOn ? '#fba919' : 'rgba(16, 24, 39, 0.75)',
                          color: __v?.torchOn ? '#101827' : '#ffffff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backdropFilter: 'blur(8px)',
                          boxShadow: __v?.torchOn ? '0 0 12px rgba(251, 169, 25, 0.6)' : 'none',
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      </button>
                    ) : null}

                    <button
                      type="button"
                      onClick={__v?.flipCamera}
                      title="Switch camera (rear / front)"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(16, 24, 39, 0.75)',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 1.25.29 2.43.8 3.49L3 15h5v-5L6.34 11.66A6 6 0 1 1 18 10z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={__v?.toggleCamera}
                      title={__v?.cameraActive ? 'Pause camera' : 'Start camera'}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: __v?.cameraActive ? 'rgba(16, 24, 39, 0.75)' : '#e42330',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {__b(__v?.cameraActive) ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Instant Success Flash Animation */}
                {__b(__v?.scannedSuccess) ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: 'rgba(16, 185, 129, 0.92)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      zIndex: 20,
                      animation: 'tmSuccessFlash 0.35s ease-out forwards',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                      }}
                    >
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: '800' }}>{'Card Detected!'}</span>
                    <span style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>{'Opening customer profile...'}</span>
                  </div>
                ) : null}

                {/* Camera Loading Spinner State */}
                {__b(__v?.cameraLoading) ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: '#090d16',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      color: '#ffffff',
                      zIndex: 5,
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(255, 255, 255, 0.15)',
                        borderTopColor: '#e42330',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                      }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>
                      {'Starting camera stream...'}
                    </span>
                  </div>
                ) : null}

                {/* Camera Permission / Error Card */}
                {__b(__v?.cameraError && !__v?.cameraLoading) ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: '#090d16',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px',
                      textAlign: 'center',
                      zIndex: 8,
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f87171',
                        marginBottom: '10px',
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>
                      {'Camera Unavailable'}
                    </span>
                    <span style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '18px', maxWidth: '280px', marginBottom: '16px' }}>
                      {`${__t(__v?.cameraError)}`}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={__v?.startCamera}
                        style={{
                          background: '#e42330',
                          color: '#ffffff',
                          border: '0',
                          borderRadius: '8px',
                          padding: '8px 14px',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        {'Try Again'}
                      </button>
                      <button
                        type="button"
                        onClick={__v?.triggerUpload}
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          padding: '8px 14px',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        {'Upload QR'}
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* Paused State */}
                {__b(!__v?.cameraActive && !__v?.cameraLoading && !__v?.cameraError) ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: '#090d16',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      color: '#ffffff',
                      zIndex: 6,
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>
                      {'Scanner camera paused'}
                    </span>
                    <button
                      type="button"
                      onClick={__v?.startCamera}
                      style={{
                        background: '#e42330',
                        color: '#ffffff',
                        border: '0',
                        borderRadius: '8px',
                        padding: '10px 18px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      {'Start Camera'}
                    </button>
                  </div>
                ) : null}

                {/* Floating Bottom Instruction Banner */}
                {__b(__v?.cameraActive) ? (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(9, 13, 22, 0.78)',
                      backdropFilter: 'blur(8px)',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      zIndex: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#e2e8f0',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {"Point at customer's card QR"}
                    </span>
                    <button
                      type="button"
                      onClick={__v?.triggerUpload}
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      {'Upload QR'}
                    </button>
                  </div>
                ) : null}
              </div>{' '}
              {__b(__v?.scanError) ? (
                <div
                  style={{
                    background: '#fde8e9',
                    color: '#c81d29',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  {`${__t(__v?.scanError)}`}
                </div>
              ) : null}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="sa-token" style={{ fontWeight: '700', fontSize: '14px' }}>
                  {'Card Token (from customer QR)'}
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="sa-token"
                    type="text"
                    value={__v?.cardTokenInput || ''}
                    onChange={__v?.onCardTokenChange}
                    placeholder="Enter or paste 43-char card token..."
                    style={{
                      flex: '1 1 auto',
                      minWidth: '0',
                      border: '1px solid #e3e5ec',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      minHeight: '44px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                    }}
                  />
                  <button
                    type="button"
                    onClick={__v?.scanCardNow}
                    style={{
                      border: '0',
                      background: '#e42330',
                      color: '#ffffff',
                      fontWeight: '700',
                      borderRadius: '8px',
                      padding: '0 16px',
                      minHeight: '44px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    {'Validate'}
                  </button>
                </div>
              </div>
              {__b((__v?.testCards || []).length > 0) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#5b6475' }}>
                    {'Active Test Cards:'}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(__v?.testCards || []).map((tc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => __v?.onPickTestCard(tc.token)}
                        style={{
                          border: '1px solid #4661ad',
                          background: '#eef2fb',
                          color: '#4661ad',
                          fontWeight: '600',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        {`⚡ ${tc.name}`}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              <button
                type="button"
                onClick={__v?.createQuickTestCard}
                style={{
                  border: '1px dashed #4661ad',
                  background: 'transparent',
                  color: '#4661ad',
                  fontWeight: '700',
                  fontSize: '13px',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                }}
              >
                {'+ Enroll New Customer for Testing'}
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="sa-phone" style={{ fontWeight: '700', fontSize: '14px' }}>
                  {'Or find by registered phone'}
                </label>{' '}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="sa-phone"
                    type="tel"
                    value={__v?.phoneInput || ''}
                    onChange={__v?.onPhoneChange}
                    placeholder="09__ ___ ___"
                    style={{
                      flex: '1 1 auto',
                      minWidth: '0',
                      border: '1px solid #e3e5ec',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      minHeight: '44px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                    }}
                  />{' '}
                  <button
                    type="button"
                    onClick={__v?.toCustomer}
                    style={{
                      border: '1px solid #e3e5ec',
                      background: '#ffffff',
                      color: '#4661ad',
                      fontWeight: '700',
                      borderRadius: '8px',
                      padding: '0 16px',
                      minHeight: '44px',
                      cursor: 'pointer',
                    }}
                  >
                    {'Find'}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.isCustomer) ? (
          <>
            <div style={{ flex: '1 1 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button
                type="button"
                onClick={__v?.toScan}
                style={{
                  alignSelf: 'flex-start',
                  border: '0',
                  background: 'transparent',
                  color: '#4661ad',
                  fontWeight: '700',
                  padding: '8px 0',
                  minHeight: '44px',
                  cursor: 'pointer',
                }}
              >
                {'← Back to scan'}
              </button>{' '}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '999px',
                    background: '#101827',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {`${__t(__v?.custInitials || 'AB')}`}
                </span>{' '}
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '24px', lineHeight: '30px', fontWeight: '700' }}>{`${__t(__v?.custName || 'Abebe Bikila')}`}</span>
                  <span style={{ color: '#5b6475' }}>{`${__t(__v?.custMeta || '9 visits · last visit Today')}`}</span>
                </span>
              </div>{' '}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    {'STAMPS'}
                  </span>
                  <span
                    style={{
                      fontSize: '32px',
                      lineHeight: '32px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {`${__t(__v?.custStampsFraction || '9/10')}`}
                  </span>
                </div>{' '}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px' }}>
                  {(__v?.slots9 || []).map((sl, __i0) => (
                    <React.Fragment key={__i0}>
                      <span
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          boxSizing: 'border-box',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${__t(sl?.bg)}`,
                          border: `2px ${__t(sl?.bs)} ${__t(sl?.border)}`,
                        }}
                      >
                        {__b(sl?.reward) ? (
                          <>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={sl?.iconColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                            </svg>
                          </>
                        ) : null}
                      </span>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <div style={{ background: '#fff3dc', borderRadius: '12px', padding: '12px 14px', fontWeight: '600' }}>
                  {`${__t(__v?.stampsToGo)} more visits to a free ${__t(__v?.rewardTitle || 'macchiato')}`}
                </div>
              </div>{' '}
              {__b(__v?.cooldownNotice) ? (
                <div style={{ background: '#fff8e6', border: '1px solid #fba919', color: '#8a5a00', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', fontWeight: '600' }}>
                  {`⚠️ ${__t(__v?.cooldownNotice)}`}
                </div>
              ) : null}
              {__b(__v?.scanError) ? (
                <div style={{ background: '#fde8e9', color: '#c81d29', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', fontWeight: '600' }}>
                  {`❌ ${__t(__v?.scanError)}`}
                </div>
              ) : null}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Stamp Counter Controller */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 4px 12px rgba(16,24,39,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#101827' }}>
                      Stamps to Issue
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Current: <strong>{__v?.currentStamps}/{__v?.maxStamps}</strong>
                    </span>
                  </div>

                  {/* Stepper with - and + */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <button
                      type="button"
                      onClick={__v?.decStampCounter}
                      disabled={__v?.stampCounter <= 1}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        background: __v?.stampCounter <= 1 ? '#f8fafc' : '#ffffff',
                        color: __v?.stampCounter <= 1 ? '#94a3b8' : '#101827',
                        fontSize: '22px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: __v?.stampCounter <= 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      −
                    </button>
                    <div style={{ minWidth: '80px', textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: '#101827', lineHeight: '32px' }}>
                        +{__v?.stampCounter}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {__v?.stampCounter === 1 ? 'Stamp' : 'Stamps'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={__v?.incStampCounter}
                      disabled={__v?.stampCounter >= 10}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        background: __v?.stampCounter >= 10 ? '#f8fafc' : '#ffffff',
                        color: __v?.stampCounter >= 10 ? '#94a3b8' : '#101827',
                        fontSize: '22px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: __v?.stampCounter >= 10 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Quick Presets */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 5].map((amt) => {
                      const isSel = __v?.stampCounter === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => __v?.setStampCounter && __v.setStampCounter(amt)}
                          style={{
                            flex: 1,
                            padding: '6px 0',
                            borderRadius: '8px',
                            border: isSel ? '2px solid #101827' : '1px solid #e2e8f0',
                            background: isSel ? '#101827' : '#f8fafc',
                            color: isSel ? '#ffffff' : '#101827',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                          }}
                        >
                          +{amt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => __v?.addStamp && __v.addStamp(__v?.stampCounter)}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '17px',
                    borderRadius: '12px',
                    padding: '16px',
                    minHeight: '56px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 14px rgba(228, 35, 48, 0.35)',
                  }}
                >
                  <span>✓ Issue +{__v?.stampCounter} {__v?.stampCounter === 1 ? 'Stamp' : 'Stamps'}</span>
                  <span style={{ fontSize: '13px', opacity: 0.9, background: 'rgba(0,0,0,0.18)', padding: '2px 8px', borderRadius: '6px' }}>
                    {__v?.currentStamps + __v?.stampCounter}/{__v?.maxStamps}
                  </span>
                </button>{' '}
                <button
                  type="button"
                  onClick={__v?.toScan}
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#101827',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '12px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >
                  {'Cancel'}
                </button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.isUnlocked) ? (
          <>
            <div style={{ flex: '1 1 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '8px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: '#5b6475',
                  }}
                >
                  {`STAMP ADDED · ${__t(__v?.custName || 'CUSTOMER')}`}
                </span>{' '}
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                  {`${__t(__v?.rewardTitle || 'Free macchiato')} unlocked`}
                </h1>
              </div>{' '}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: '#5b6475',
                    }}
                  >
                    {'STAMPS'}
                  </span>
                  <span
                    style={{
                      fontSize: '32px',
                      lineHeight: '32px',
                      fontWeight: '800',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {'10/10'}
                  </span>
                </div>{' '}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px' }}>
                  {(__v?.slots10 || []).map((sl, __i0) => (
                    <React.Fragment key={__i0}>
                      <span
                        style={{
                          aspectRatio: '1',
                          borderRadius: '999px',
                          boxSizing: 'border-box',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${__t(sl?.bg)}`,
                          border: `2px ${__t(sl?.bs)} ${__t(sl?.border)}`,
                        }}
                      >
                        {__b(sl?.reward) ? (
                          <>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={sl?.iconColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
                            </svg>
                          </>
                        ) : null}
                      </span>
                    </React.Fragment>
                  ))}
                </div>{' '}
                <div
                  style={{
                    background: '#fba919',
                    color: '#101827',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    fontWeight: '700',
                  }}
                >
                  {'Reward ready. Give it now or save it for later.'}
                </div>
              </div>{' '}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={__v?.redeemReward}
                  style={{
                    border: '0',
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '18px',
                    borderRadius: '12px',
                    padding: '16px',
                    minHeight: '56px',
                    cursor: 'pointer',
                  }}
                >
                  {'Redeem now'}
                </button>{' '}
                <button
                  type="button"
                  onClick={__v?.toScan}
                  style={{
                    border: '1px solid #e3e5ec',
                    background: '#ffffff',
                    color: '#101827',
                    fontWeight: '700',
                    borderRadius: '12px',
                    padding: '12px',
                    minHeight: '48px',
                    cursor: 'pointer',
                  }}
                >
                  {'Save for next visit'}
                </button>
              </div>
            </div>
          </>
        ) : null}{' '}
        {__b(__v?.isRedeemed) ? (
          <>
            <div
              style={{
                flex: '1 1 auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '999px',
                  background: '#fba919',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>{' '}
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                {'Reward redeemed'}
              </h1>{' '}
              <p style={{ margin: '0', color: '#5b6475', maxWidth: '280px' }}>
                {`Hand ${__t(__v?.custName || 'customer')} their ${__t(__v?.rewardTitle || 'free reward')}. Card starts again at 0/10.`}
              </p>{' '}
              <p
                style={{
                  margin: '0',
                  fontFamily: "'Noto Sans Ethiopic', 'Source Sans 3', sans-serif",
                  lineHeight: '27px',
                  color: '#5b6475',
                }}
              >
                {'ሽልማቱ ተሰጥቷል።'}
              </p>{' '}
              <button
                type="button"
                onClick={__v?.toScan}
                style={{
                  marginTop: '24px',
                  alignSelf: 'stretch',
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '12px',
                  padding: '16px',
                  minHeight: '56px',
                  cursor: 'pointer',
                }}
              >
                {'Next customer'}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default withDCStyle(StaffAppView, 'StaffApp', __CSS);
