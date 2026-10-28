'use client';
/* Generated from the Temelash Card design (Landing.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import api, { getAppOrigin, getMerchantJoinUrl, getOrAssignMerchantCode } from '@/lib/api';
import renderLanding from './Landing.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n@media (min-width: 1024px){.pv-sticky{position:sticky;top:24px;align-self:flex-start}}';
class LandingView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tagline: '',
      color: '#8a4b2a',
      hexText: '8A4B2A',
      tint: 'auto',
      style: 'classic',
      cover: false,
      coverImg: null,
      coverFileName: '',
      logo: true,
      logoImg: null,
      logoFileName: '',
      viewImgModal: null,
      saved: false,
      copied: false,
      qrModalOpen: false,
      buttons: [
        {
          id: 'card',
          label: 'Get your stamp card',
          sub: '',
          icon: 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z',
          on: true,
          locked: true,
        },
        {
          id: 'insta',
          label: 'Follow us on Instagram',
          sub: '',
          url: '',
          icon: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01',
          on: true,
        },
      ],
    };
  }
  componentDidMount() {
    if (typeof window === 'undefined') return;
    // The real business name and reward fill the draft; the design itself is kept in this browser only.
    Promise.allSettled([api.merchant.getProfile(), api.merchant.getPrograms('ACTIVE')]).then(([prof, progs]) => {
      const biz = prof.status === 'fulfilled' ? prof.value : null;
      const program = progs.status === 'fulfilled' && Array.isArray(progs.value) ? progs.value[0] : null;
      this.setState((st) => ({
        title: st.title || biz?.nameEn || '',
        buttons: st.buttons.map((b) =>
          b.id === 'card' && !b.sub && program?.reward
            ? Object.assign({}, b, { sub: program.reward.nameEn + ' at ' + program.stampsRequired + ' stamps' })
            : b,
        ),
      }));
    });
    try {
      const updates = {};
      const savedCover = window.localStorage.getItem('tm-landing-cover');
      if (savedCover) {
        updates.cover = true;
        updates.coverImg = savedCover;
      }
      const savedLogo = window.localStorage.getItem('tm-landing-logo') || window.localStorage.getItem('tm-logo');
      if (savedLogo) {
        updates.logo = true;
        updates.logoImg = savedLogo;
      }
      const savedData = window.localStorage.getItem('tm-landing-data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed && typeof parsed === 'object') {
          if (parsed.title) updates.title = parsed.title;
          if (parsed.tagline !== undefined) updates.tagline = parsed.tagline;
          if (parsed.color) updates.color = parsed.color;
          if (parsed.hexText) updates.hexText = parsed.hexText;
          if (parsed.tint) updates.tint = parsed.tint;
          if (parsed.style) updates.style = parsed.style;
          if (parsed.cover !== undefined && !savedCover) updates.cover = parsed.cover;
          if (parsed.logo !== undefined && !savedLogo) updates.logo = parsed.logo;
          if (Array.isArray(parsed.buttons)) updates.buttons = parsed.buttons;
        }
      }
      if (Object.keys(updates).length > 0) {
        this.setState(updates);
      }
    } catch (e) {}
  }
  lum(hex) {
    const h = hex.replace('#', '');
    const ch = [0, 2, 4].map((i) => {
      const v = parseInt(h.substr(i, 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  }
  renderVals() {
    const s = this.state;
    const dark = this.lum(s.color) < 0.18;
    const ink = dark ? '#ffffff' : '#101827';
    const set = (o) => this.setState(Object.assign({ saved: false }, o));
    const swDefs = [
      ['#8a4b2a', 'Coffee brown'],
      ['#101827', 'Navy'],
      ['#4661ad', 'Blue'],
      ['#2f6b4f', 'Green'],
      ['#7a3e9d', 'Purple'],
      ['#f7f7f9', 'Off-white'],
      ['#fff3dc', 'Cream'],
    ];
    const swatches = swDefs.map(([hex, label]) => ({
      hex,
      label,
      pressed: hex === s.color ? 'true' : 'false',
      ring: hex === s.color ? '#4661ad' : '#e3e5ec',
      pick: () => set({ color: hex, hexText: hex.slice(1).toUpperCase() }),
    }));
    const tints = [
      ['auto', 'Auto'],
      ['light', 'Light'],
      ['dark', 'Dark'],
    ].map(([id, label]) => ({
      label,
      pressed: id === s.tint ? 'true' : 'false',
      bg: id === s.tint ? '#f7f7f9' : '#ffffff',
      border: id === s.tint ? '#4661ad' : '#e3e5ec',
      pick: () => set({ tint: id }),
    }));
    const useDarkBtn = s.tint === 'dark' || (s.tint === 'auto' && !dark);
    const SD = {
      default: {
        label: 'Default',
        font: "'Source Sans 3', sans-serif",
        variant: 'normal',
        transform: 'none',
        spacing: '0',
        sample: 'Buna House',
      },
      classic: {
        label: 'Classic',
        font: "'Playfair Display', Georgia, serif",
        variant: 'small-caps',
        transform: 'none',
        spacing: '0.02em',
        sample: 'Buna House',
      },
      editorial: {
        label: 'Editorial',
        font: "'Lora', Georgia, serif",
        variant: 'normal',
        transform: 'none',
        spacing: '0',
        sample: 'Buna House',
      },
      modern: {
        label: 'Modern',
        font: "'Source Sans 3', sans-serif",
        variant: 'normal',
        transform: 'uppercase',
        spacing: '0.12em',
        sample: 'Buna House',
      },
    };
    const styles = Object.keys(SD).map((id) =>
      Object.assign({}, SD[id], {
        pressed: id === s.style ? 'true' : 'false',
        bg: id === s.style ? '#f7f7f9' : '#ffffff',
        border: id === s.style ? '#4661ad' : '#e3e5ec',
        pick: () => set({ style: id }),
      }),
    );
    const st = SD[s.style];
    const btns = s.buttons;
    const move = (i, d) => () => {
      const j = i + d;
      if (j < 1 || j >= btns.length || i === 0) return;
      const a = btns.slice();
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
      set({ buttons: a });
    };
    const rows = btns.map((b, i) => ({
      label: b.label,
      icon: b.icon,
      inputId: 'lp-btn-' + i,
      sub: b.locked ? 'Always first and always shown' : b.on ? 'Shown' : 'Hidden',
      opacity: b.on ? '1' : '0.55',
      onLabel: (e) => {
        const a = btns.slice();
        a[i] = Object.assign({}, b, { label: e.target.value });
        set({ buttons: a });
      },
      upDisabled: i <= 1,
      downDisabled: i === 0 || i === btns.length - 1,
      upColor: i <= 1 ? '#c9cdd6' : '#101827',
      downColor: i === 0 || i === btns.length - 1 ? '#c9cdd6' : '#101827',
      up: move(i, -1),
      down: move(i, 1),
      locked: !!b.locked,
      checked: b.on ? 'true' : 'false',
      track: b.on ? '#101827' : '#e3e5ec',
      justify: b.on ? 'flex-end' : 'flex-start',
      toggle: () => {
        if (b.locked) return;
        const a = btns.slice();
        a[i] = Object.assign({}, b, { on: !b.on });
        set({ buttons: a });
      },
      hasUrl: !b.locked,
      urlId: 'lp-url-' + i,
      url: b.url || '',
      urlLabel: b.id === 'insta' ? 'Instagram username or link' : 'Link',
      urlPh: b.id === 'insta' ? '@yourbusiness or instagram.com/yourbusiness' : 'https://… or t.me/yourbusiness',
      urlMissing: !b.locked && b.on && !(b.url || '').trim(),
      urlBorder: !b.locked && b.on && !(b.url || '').trim() ? '#c81d29' : '#e3e5ec',
      onUrl: (e) => {
        const a = btns.slice();
        a[i] = Object.assign({}, b, { url: e.target.value });
        set({ buttons: a });
      },
      canDelete: !b.locked && b.id !== 'insta',
      delLabel: 'Remove ' + (b.label || 'link'),
      remove: () => set({ buttons: btns.filter((x, k) => k !== i) }),
    }));
    const handle = (u) => {
      const v = (u || '').trim();
      if (!v) return '';
      const m = v.match(/instagram\.com\/([^/?#]+)/i);
      if (m) return '@' + m[1];
      return v.charAt(0) === '@' ? v : v.indexOf('.') === -1 ? '@' + v : v.replace(/^https?:\/\//, '');
    };
    const pvButtons = btns
      .filter((b) => b.on && (b.locked || (b.url || '').trim()))
      .map((b) => ({
        label: b.label || 'Untitled link',
        sub: b.locked ? b.sub : handle(b.url),
        hasSub: b.locked ? !!b.sub : true,
        icon: b.icon,
        bg: useDarkBtn ? '#1b2436' : '#ffffff',
        fg: useDarkBtn ? '#ffffff' : '#101827',
        tile: useDarkBtn ? 'rgba(255,255,255,0.08)' : '#f7f7f9',
        iconColor: b.id === 'card' ? '#fba919' : useDarkBtn ? '#8fa4e6' : '#4661ad',
      }));
    const N = 11,
      qr = [];
    const seed =
      '1011001011101101001101011100101101010011101011001010111001101001011011100101011010011101010110010110101101001011100';
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) {
        const inF = (R, C) => r >= R && r < R + 3 && c >= C && c < C + 3;
        let on;
        if (inF(0, 0) || inF(0, N - 3) || inF(N - 3, 0)) on = true;
        else if (
          (r === 3 && (c < 4 || c > N - 5)) ||
          (c === 3 && (r < 4 || r > N - 5)) ||
          (r === N - 4 && c < 4) ||
          (c === N - 4 && r < 4)
        )
          on = false;
        else on = seed.charAt((r * N + c) % seed.length) === '1';
        qr.push({ c: on ? '#101827' : 'transparent' });
      }
    const titleText = (s.title || '').trim();
    const merchantCode = getOrAssignMerchantCode(titleText);
    const origin = getAppOrigin();
    const liveLandingUrl = getMerchantJoinUrl();
    const shownTitle = titleText || 'Your business';
    return {
      title: s.title,
      tagline: s.tagline,
      hasTagline: !!(s.tagline || '').trim(),
      shownTitle,
      slug: merchantCode,
      merchantCode,
      liveLandingUrl,
      copied: s.copied,
      copyLink: () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(liveLandingUrl).catch(() => {});
        }
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2000);
      },
      qrModalOpen: s.qrModalOpen,
      openQrModal: () => this.setState({ qrModalOpen: true }),
      closeQrModal: () => this.setState({ qrModalOpen: false }),
      onTitle: (e) => set({ title: e.target.value }),
      onTag: (e) => set({ tagline: e.target.value }),
      color: s.color,
      hexText: s.hexText,
      hexBad: !/^#?[0-9a-fA-F]{6}$/.test(s.hexText),
      onHex: (e) => {
        const v = e.target.value.replace('#', '');
        const o = { hexText: v };
        if (/^[0-9a-fA-F]{6}$/.test(v)) o.color = '#' + v.toLowerCase();
        set(o);
      },
      resetColor: () => set({ color: '#8a4b2a', hexText: '8A4B2A' }),
      swatches,
      tints,
      styles,
      rows,
      pvButtons,
      qr,
      swPresets: swDefs.map(([hex, label]) => ({ hex, label })),
      pickColor: (hex) => set({ color: hex, hexText: hex.slice(1).toUpperCase() }),
      tintNote:
        s.tint === 'auto'
          ? 'Auto picks dark or light buttons to match your page colour.'
          : s.tint === 'light'
            ? 'White buttons on any page colour.'
            : 'Dark buttons on any page colour.',
      sFont: st.font,
      sVariant: st.variant,
      sTransform: st.transform,
      sSpacing: st.spacing,
      ink,
      markRed: dark ? '#ff5a63' : '#e42330',
      cover: s.cover,
      coverImg: s.coverImg,
      coverFileName: s.coverFileName,
      coverBg: dark ? 'rgba(255,255,255,0.18)' : 'rgba(16,24,39,0.18)',
      coverThumbBg: s.cover ? '#c9cdd6' : '#f7f7f9',
      coverBtn: s.cover && s.coverImg ? 'Change' : 'Upload image',
      onCoverUpload: (e) => {
        const file = e.target?.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const dataUrl = ev.target?.result;
            if (dataUrl) {
              set({ cover: true, coverImg: dataUrl, coverFileName: file.name });
              try {
                window.localStorage.setItem('tm-landing-cover', dataUrl);
              } catch (x) {}
            }
          };
          reader.readAsDataURL(file);
        }
      },
      removeCover: () => {
        set({ cover: false, coverImg: null, coverFileName: '' });
        try {
          window.localStorage.removeItem('tm-landing-cover');
        } catch (x) {}
      },
      toggleCover: () => set({ cover: !s.cover }),
      logo: s.logo,
      logoImg: s.logoImg,
      logoFileName: s.logoFileName,
      initial: shownTitle.charAt(0).toUpperCase(),
      logoThumbBg: s.logo ? s.color : '#f7f7f9',
      logoThumbText: s.logo && !s.logoImg ? shownTitle.charAt(0).toUpperCase() : '',
      logoBtn: s.logo && s.logoImg ? 'Change' : 'Upload image',
      onLogoUpload: (e) => {
        const file = e.target?.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const dataUrl = ev.target?.result;
            if (dataUrl) {
              set({ logo: true, logoImg: dataUrl, logoFileName: file.name });
              try {
                window.localStorage.setItem('tm-landing-logo', dataUrl);
                window.localStorage.setItem('tm-logo', dataUrl);
              } catch (x) {}
            }
          };
          reader.readAsDataURL(file);
        }
      },
      removeLogo: () => {
        set({ logo: false, logoImg: null, logoFileName: '' });
        try {
          window.localStorage.removeItem('tm-landing-logo');
        } catch (x) {}
      },
      toggleLogo: () => set({ logo: !s.logo }),
      viewImgModal: s.viewImgModal,
      viewImage: (which) => this.setState({ viewImgModal: which }),
      closeImgModal: () => this.setState({ viewImgModal: null }),
      logoRing: dark ? 'rgba(255,255,255,0.25)' : 'rgba(16,24,39,0.12)',
      logoLift: s.cover ? '-40px' : '0',
      headPad: s.cover ? '0 20px 12px' : '44px 20px 12px',
      addLink: () =>
        set({
          buttons: btns.concat([
            {
              id: 'custom' + Date.now(),
              label: 'New link',
              sub: '',
              url: '',
              icon: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
              on: true,
            },
          ]),
        }),
      save: () => {
        try {
          const toSave = {
            title: s.title,
            tagline: s.tagline,
            color: s.color,
            hexText: s.hexText,
            tint: s.tint,
            style: s.style,
            cover: s.cover,
            logo: s.logo,
            buttons: s.buttons,
          };
          window.localStorage.setItem('tm-landing-data', JSON.stringify(toSave));
          if (s.coverImg) {
            window.localStorage.setItem('tm-landing-cover', s.coverImg);
          }
          if (s.logoImg) {
            window.localStorage.setItem('tm-landing-logo', s.logoImg);
          }
        } catch (e) {}
        this.setState({ saved: true });
      },
      savedNote: s.saved
        ? 'Saved in this browser only. Publishing this design is not available yet: your QR page shows your business name, card colour and reward.'
        : 'Draft: not on your public page yet.',
    };
  }
}

LandingView.defaultProps = {};

LandingView.prototype.__template = renderLanding;

export default withDCStyle(LandingView, 'Landing', __CSS);
