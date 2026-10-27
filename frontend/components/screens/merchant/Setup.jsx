'use client';
/* Generated from the Temelash Card design (Setup.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import { getMerchantJoinUrl } from '@/lib/api';
import renderSetup from './Setup.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n@media (max-width:640px){.tm-steplabel{display:none}.tm-stepline{width:12px !important}.tm-setup-main{padding:20px 16px 32px !important;gap:24px !important}.tm-setup-card{padding:20px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';
class SetupView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      step: null,
      name: 'Buna House',
      type: 'Café',
      accent: '#101827',
      count: 10,
      reward: 'a free macchiato',
      lat: 8.996,
      lng: 38.789,
      locQuery: '',
      locOpen: false,
      mapDrag: false,
      myLoc: false,
      logo: null,
      logoFileName: '',
      viewLogoModal: false,
    };
  }
  componentDidMount() {
    if (typeof window !== 'undefined') {
      try {
        const updates = {};
        const savedLogo = window.localStorage.getItem('tm-logo');
        if (savedLogo) {
          updates.logo = savedLogo;
        }
        const savedSetup = window.localStorage.getItem('tm-setup-data');
        if (savedSetup) {
          const parsed = JSON.parse(savedSetup);
          if (parsed && typeof parsed === 'object') {
            if (parsed.name) updates.name = parsed.name;
            if (parsed.type) updates.type = parsed.type;
            if (parsed.accent) updates.accent = parsed.accent;
            if (parsed.count) updates.count = parsed.count;
            if (parsed.reward) updates.reward = parsed.reward;
            if (parsed.lat) updates.lat = parsed.lat;
            if (parsed.lng) updates.lng = parsed.lng;
            if (parsed.step) updates.step = parsed.step;
          }
        }
        const saved = window.localStorage.getItem('tc_registered_merchant');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.name) updates.name = parsed.name;
          if (parsed.type) updates.type = parsed.type;
        }
        if (Object.keys(updates).length > 0) {
          this.setState(updates);
        }
      } catch (e) {}
    }
  }
  saveSetupProgress(partial = {}) {
    if (typeof window === 'undefined') return;
    try {
      const current = {
        name: this.state.name,
        type: this.state.type,
        accent: this.state.accent,
        count: this.state.count,
        reward: this.state.reward,
        lat: this.state.lat,
        lng: this.state.lng,
        step: this.state.step,
        ...partial,
      };
      window.localStorage.setItem('tm-setup-data', JSON.stringify(current));
      window.localStorage.setItem(
        'tc_registered_merchant',
        JSON.stringify({ name: current.name, type: current.type, accent: current.accent }),
      );
    } catch (e) {}
  }
  places() {
    // Approximate centres, for the prototype map only
    return [
      { name: 'Bole Medhanialem', sub: 'Bole, Addis Ababa', lat: 8.996, lng: 38.789 },
      { name: 'Bole Atlas', sub: 'Bole, Addis Ababa', lat: 9.001, lng: 38.78 },
      { name: 'Kazanchis', sub: 'Kirkos, Addis Ababa', lat: 9.018, lng: 38.766 },
      { name: 'Piassa', sub: 'Arada, Addis Ababa', lat: 9.035, lng: 38.752 },
      { name: 'Megenagna', sub: 'Yeka, Addis Ababa', lat: 9.02, lng: 38.802 },
      { name: 'Sarbet', sub: 'Nifas Silk-Lafto, Addis Ababa', lat: 9.0, lng: 38.74 },
      { name: 'Mexico Square', sub: 'Kirkos, Addis Ababa', lat: 9.01, lng: 38.746 },
    ];
  }
  mapFromPointer(e) {
    if (!this.mapEl) return;
    const r = this.mapEl.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    this.setState({ lng: 38.72 + x * 0.1, lat: 9.06 - y * 0.08, myLoc: false });
  }
  renderVals() {
    const step = this.state.step ?? this.props.startStep ?? 1;
    const go = (n) => () => this.setState({ step: n });
    const labels = ['Business', 'Card', 'Reward', 'Go live'];
    const steps = labels.map((label, i) => {
      const n = i + 1,
        done = n < step,
        cur = n === step;
      return {
        num: done ? '✓' : String(n),
        label,
        go: go(n),
        notLast: n < 4,
        current: cur ? 'step' : 'false',
        dotBg: cur ? '#e42330' : done ? '#101827' : '#ffffff',
        dotColor: cur || done ? '#ffffff' : '#5b6475',
        dotBorder: cur ? '#e42330' : done ? '#101827' : '#e3e5ec',
        labelColor: cur || done ? '#101827' : '#5b6475',
        weight: cur ? '700' : '600',
        labelCls: cur ? '' : 'tm-steplabel',
      };
    });
    const types = ['Café', 'Restaurant', 'Salon', 'Spa', 'Car wash'].map((label) => {
      const on = label === this.state.type;
      return {
        label,
        pressed: on ? 'true' : 'false',
        pick: () => this.setState({ type: label }),
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
      };
    });
    const accents = [
      ['#101827', 'Navy'],
      ['#4661ad', 'Blue'],
      ['#2f6b4f', 'Green'],
      ['#7a3e9d', 'Purple'],
      ['#8a4b2a', 'Coffee brown'],
      ['#c2410c', 'Burnt orange'],
    ].map(([hex, label]) => {
      const on = hex === this.state.accent;
      return {
        hex,
        label,
        pressed: on ? 'true' : 'false',
        ring: on ? '#4661ad' : '#e3e5ec',
        pick: () => this.setState({ accent: hex }),
      };
    });
    const counts = [6, 8, 10].map((n) => {
      const on = n === this.state.count;
      return {
        n: String(n),
        pressed: on ? 'true' : 'false',
        pick: () => this.setState({ count: n }),
        bg: on ? '#101827' : 'transparent',
        color: on ? '#ffffff' : '#101827',
      };
    });
    const count = this.state.count,
      earned = 3;
    const slots = [];
    for (let i = 0; i < count; i++) {
      const isReward = i === count - 1,
        isEarned = i < earned;
      slots.push({
        earned: isEarned,
        reward: isReward,
        bg: isEarned ? '#fba919' : 'transparent',
        border: isEarned ? '#fba919' : isReward ? '#e42330' : '#e3e5ec',
        borderStyle: isReward ? 'dashed' : 'solid',
      });
    }
    const name = this.state.name || '';
    return {
      steps,
      types,
      accents,
      counts,
      slots,
      isStep1: step === 1,
      isStep2: step === 2,
      isStep3: step === 3,
      isStep4: step === 4,
      hasBack: step > 1,
      isLast: step === 4,
      notLast: step < 4,
      next: () => {
        const nextStep = Math.min(4, step + 1);
        this.saveSetupProgress({ step: nextStep });
        this.setState({ step: nextStep });
      },
      back: () => {
        const prevStep = Math.max(1, step - 1);
        this.saveSetupProgress({ step: prevStep });
        this.setState({ step: prevStep });
      },
      name,
      reward: this.state.reward,
      onName: (e) => {
        const val = e.target.value;
        this.saveSetupProgress({ name: val });
        this.setState({ name: val });
      },
      onReward: (e) => {
        const val = e.target.value;
        this.saveSetupProgress({ reward: val });
        this.setState({ reward: val });
      },
      displayName: name || 'Your business',
      initial: (name || 'Y').trim().charAt(0).toUpperCase() || 'Y',
      accentHex: this.state.accent,
      countLabel: earned + '/' + count,
      rewardLine: count - earned + ' more visits to ' + (this.state.reward || 'your reward'),
      accentPresets: [
        ['#101827', 'Navy'],
        ['#4661ad', 'Blue'],
        ['#2f6b4f', 'Green'],
        ['#7a3e9d', 'Purple'],
        ['#8a4b2a', 'Coffee brown'],
        ['#c2410c', 'Burnt orange'],
      ].map(([hex, label]) => ({ hex, label })),
      setAccent: (hex) => {
        this.saveSetupProgress({ accent: hex });
        this.setState({ accent: hex });
      },
      logo: this.state.logo,
      hasLogo: !!this.state.logo,
      logoFileName: this.state.logoFileName,
      viewLogoModal: this.state.viewLogoModal,
      cardUrl: getMerchantJoinUrl(),
      onLogoUpload: (e) => {
        const file = e.target?.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const dataUrl = ev.target?.result;
            if (dataUrl) {
              this.setState({ logo: dataUrl, logoFileName: file.name });
              try {
                window.localStorage.setItem('tm-logo', dataUrl);
              } catch (x) {}
              this.saveSetupProgress({ logo: dataUrl });
            }
          };
          reader.readAsDataURL(file);
        }
      },
      removeLogo: () => {
        this.setState({ logo: null, logoFileName: '' });
        try {
          window.localStorage.removeItem('tm-logo');
        } catch (x) {}
        this.saveSetupProgress({ logo: null });
      },
      viewLogo: () => this.setState({ viewLogoModal: true }),
      closeLogoModal: () => this.setState({ viewLogoModal: false }),
      ...(() => {
        const st = this.state;
        const P = this.places();
        const q = (st.locQuery || '').trim().toLowerCase();
        const suggest = st.locOpen
          ? P.filter((p) => !q || (p.name + ' ' + p.sub).toLowerCase().indexOf(q) !== -1)
              .slice(0, 5)
              .map((p) => ({
                name: p.name,
                sub: p.sub,
                pick: () =>
                  this.setState({
                    lat: p.lat,
                    lng: p.lng,
                    locQuery: p.name + ', ' + p.sub,
                    locOpen: false,
                    myLoc: false,
                  }),
              }))
          : [];
        let near = P[0],
          best = 1e9;
        P.forEach((p) => {
          const d = Math.pow(p.lat - st.lat, 2) + Math.pow(p.lng - st.lng, 2);
          if (d < best) {
            best = d;
            near = p;
          }
        });
        const toX = (lng) => ((lng - 38.72) / 0.1) * 100 + '%';
        const toY = (lat) => ((9.06 - lat) / 0.08) * 100 + '%';
        return {
          locQuery: st.locQuery,
          onLocQuery: (e) => this.setState({ locQuery: e.target.value, locOpen: true }),
          hasSuggest: suggest.length > 0,
          suggest,
          setMap: (el) => {
            this.mapEl = el;
          },
          mapDown: (e) => {
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch (x) {}
            this.setState({ mapDrag: true, locOpen: false });
            this.mapFromPointer(e);
          },
          mapMove: (e) => {
            if (this.state.mapDrag) this.mapFromPointer(e);
          },
          mapUp: () => this.setState({ mapDrag: false }),
          mapLabels: P.map((p) => ({ name: p.name, x: toX(p.lng), y: toY(p.lat - 0.004) })),
          pinX: toX(st.lng),
          pinY: toY(st.lat),
          shortName: st.name || 'Your business',
          latText: st.lat.toFixed(4),
          lngText: st.lng.toFixed(4),
          onLat: (e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) this.setState({ lat: Math.min(9.06, Math.max(8.98, v)) });
          },
          onLng: (e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) this.setState({ lng: Math.min(38.82, Math.max(38.72, v)) });
          },
          useMyLoc: () =>
            this.setState({ lat: 8.9978, lng: 38.7871, myLoc: true, locOpen: false, locQuery: 'Current location' }),
          locSummary:
            (st.myLoc ? 'Using your current location (sample). ' : '') +
            'Pin near ' +
            near.name +
            ', ' +
            near.sub +
            ' · ' +
            st.lat.toFixed(4) +
            ', ' +
            st.lng.toFixed(4) +
            '. Customers see this on the back of the card.',
        };
      })(),
    };
  }
}

SetupView.defaultProps = { startStep: 1 };

SetupView.prototype.__template = renderSetup;

export default withDCStyle(SetupView, 'Setup', __CSS);
