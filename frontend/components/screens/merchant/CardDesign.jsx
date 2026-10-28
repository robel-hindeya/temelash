'use client';
/* Generated from the Temelash Card design (CardDesign.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import api, { getOrAssignMerchantCode, getMerchantJoinUrl } from '@/lib/api';
import renderCardDesign from './CardDesign.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-topbar{display:flex !important}.tm-side{display:none !important}.tm-side.is-open{display:flex !important;min-height:0 !important;height:auto !important;border-right:0 !important;border-bottom:1px solid #e3e5ec !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-split{border-left:0 !important;padding-left:0 !important;border-top:1px solid #e3e5ec;padding-top:16px}.tm-hide-sm{display:none !important}.tm-table{min-width:480px !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';
class CardDesignView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      programId: null,
      name: '',
      nameAm: '',
      saveError: '',
      accent: '#8a4b2a',
      icon: 'check',
      tab: 'web',
      email: 'off',
      birthday: 'off',
      cover: false,
      saved: false,
      copied: false,
      qrModalOpen: false,
    };
  }

  async componentDidMount() {
    const [profRes, progRes] = await Promise.allSettled([
      api.merchant.getProfile(),
      api.merchant.getPrograms('ACTIVE'),
    ]);
    const prof = profRes.status === 'fulfilled' ? profRes.value : null;
    const p = progRes.status === 'fulfilled' && Array.isArray(progRes.value) ? progRes.value[0] : null;
    this.setState({
      programId: p?.id || null,
      stampsRequired: p?.stampsRequired || null,
      name: p?.cardDisplay?.title || prof?.nameEn || '',
      nameAm: p?.nameAm || prof?.nameAm || '',
      accent: p?.brandColor || this.state.accent,
      icon: p?.cardDisplay?.stampIcon || this.state.icon,
      saveError: p ? '' : 'Your card is not live yet. Finish setup first: this design is saved to the live card.',
    });
  }
  renderVals() {
    const s = this.state;
    const accents = [
      ['#101827', 'Navy'],
      ['#4661ad', 'Blue'],
      ['#2f6b4f', 'Green'],
      ['#7a3e9d', 'Purple'],
      ['#8a4b2a', 'Coffee brown'],
      ['#c2410c', 'Burnt orange'],
    ].map(([hex, label]) => ({
      hex,
      label,
      pressed: hex === s.accent ? 'true' : 'false',
      ring: hex === s.accent ? '#4661ad' : '#e3e5ec',
      pick: () => this.setState({ accent: hex }),
    }));
    const iconDefs = [
      ['check', 'Check', 'M5 12l5 5L20 7'],
      ['cup', 'Cup', 'M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 11h2a2 2 0 0 1 0 4h-2M8 3v3M12 3v3'],
      [
        'scissors',
        'Scissors',
        'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.5 7.5L20 18M8.5 16.5L20 6',
      ],
      ['drop', 'Drop', 'M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z'],
      ['star', 'Star', 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'],
    ];
    const icons = iconDefs.map(([id, label, d]) => ({
      label,
      d,
      pressed: id === s.icon ? 'true' : 'false',
      border: id === s.icon ? '#4661ad' : '#e3e5ec',
      pick: () => this.setState({ icon: id }),
    }));
    const iconPath = (iconDefs.find((x) => x[0] === s.icon) || iconDefs[0])[2];
    const fieldDefs = [
      ['name', 'Name', 'So staff and messages can greet them.', 'required', 'Your first name'],
      ['phone', 'Phone number', 'Finds their card if they lose their phone.', 'required', '+251 9__ ___ ___'],
      ['email', 'Email', 'Not available yet.', 'off', 'name@example.com'],
      ['birthday', 'Birthday', 'Not available yet.', 'off', 'Day and month'],
    ];
    const optsFor = (id, locked) =>
      [
        ['off', 'Off'],
        ['optional', 'Optional'],
        ['required', 'Required'],
      ].map(([v, label]) => {
        const cur = locked || s[id];
        const on = v === cur;
        return {
          label,
          pressed: on ? 'true' : 'false',
          disabled: locked && !on,
          cursor: locked ? 'default' : 'pointer',
          bg: on ? '#101827' : 'transparent',
          color: on ? '#ffffff' : locked ? '#9aa3b5' : '#101827',
          pick: () => {
            if (!locked) this.setState({ [id]: v });
          },
        };
      });
    const fields = fieldDefs.map(([id, label, note, locked]) => ({
      label,
      note: locked === 'required' ? note + ' Always asked.' : note,
      opts: optsFor(id, locked),
    }));
    const joinFields = fieldDefs
      .filter(([id, , , locked]) => (locked || s[id]) !== 'off')
      .map(([id, label, , locked, ph]) => ({
        label: id === 'birthday' ? 'Birthday · for your surprise' : label,
        ph,
        hasHint: id === 'birthday',
        tag: (locked || s[id]) === 'required' ? '' : '(optional)',
      }));
    const tabs = [
      ['web', 'Web card'],
      ['join', 'Sign-up form'],
      ['apple', 'Apple Wallet'],
      ['google', 'Google Wallet'],
    ].map(([id, label]) => ({
      label,
      sel: id === s.tab ? 'true' : 'false',
      bg: id === s.tab ? '#101827' : 'transparent',
      color: id === s.tab ? '#ffffff' : '#101827',
      pick: () => this.setState({ tab: id }),
    }));
    const slots = [];
    // Preview: the real card length with a few stamps filled in.
    const len = s.stampsRequired || 10;
    for (let i = 0; i < len; i++) {
      const earned = i < Math.floor(len * 0.7),
        reward = i === len - 1;
      slots.push({
        earned,
        reward,
        bg: earned ? '#fba919' : 'transparent',
        border: earned ? '#fba919' : reward ? '#e42330' : '#e3e5ec',
        bs: reward ? 'dashed' : 'solid',
      });
    }
    const notes = {
      apple: 'Apple Wallet pass. Shows on the lock screen near your business.',
      google: 'Google Wallet pass for Android phones.',
      web: 'Web card for phones without a wallet app.',
      join: 'What customers see after scanning your QR.',
    };
    const merchantCode = getOrAssignMerchantCode(s.name);
    // Every customer QR opens the landing page, where customers join or sign back in.
    const cardUrl = getMerchantJoinUrl();
    return {
      name: s.name || 'Your business',
      nameAm: s.nameAm,
      accent: s.accent,
      accents,
      icons,
      iconPath,
      tabs,
      slots,
      initial: (s.name || 'Y').charAt(0).toUpperCase(),
      onName: (e) => this.setState({ name: e.target.value, saved: false }),
      onNameAm: (e) => this.setState({ nameAm: e.target.value, saved: false }),
      programLine: s.stampsRequired ? s.stampsRequired + ' stamps per reward' : 'Not live yet',
      savedNote: s.saveError || (s.saved ? 'Saved. Live on every card.' : 'Unsaved changes'),
      save: async () => {
        if (!s.programId) return;
        this.setState({ saveError: '' });
        try {
          await api.merchant.updateProgram(s.programId, {
            nameAm: s.nameAm.trim() || null,
            brandColor: s.accent,
            cardDisplay: { title: s.name.trim() || undefined, stampIcon: s.icon },
          });
          this.setState({ saved: true });
        } catch (e) {
          this.setState({ saved: false, saveError: e.message || 'Could not save. Try again.' });
        }
      },
      isWeb: s.tab === 'web',
      isPass: s.tab !== 'web',
      logoH: '40px',
      logoR: s.tab === 'google' ? '999px' : '10px',
      tabNote: notes[s.tab],
      fields,
      joinFields,
      emailOn: s.email !== 'off',
      isCard: s.tab !== 'join' && s.tab !== 'web',
      isJoin: s.tab === 'join',
      isWebTab: s.tab === 'web',
      nameA: ((s.name || 'Your business').trim().split(/\s+/)[0] || '').toUpperCase(),
      nameB: ((s.name || 'Your business').trim().split(/\s+/).slice(1).join(' ') || '').toUpperCase(),
      webSlots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
        bg: i < 7 ? '#fba919' : '#eceef2',
        border: i < 7 ? '#fba919' : '#d9dce3',
        check: i < 7 ? '#101827' : i === 9 ? '#c81d29' : '#c9cdd6',
        path: i === 9 ? 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13' : i < 7 ? iconPath : 'M5 12l5 5L20 7',
      })),
      showJoin: () => this.setState({ tab: 'join' }),
      accentPresets: [
        ['#101827', 'Navy'],
        ['#4661ad', 'Blue'],
        ['#2f6b4f', 'Green'],
        ['#7a3e9d', 'Purple'],
        ['#8a4b2a', 'Coffee brown'],
        ['#c2410c', 'Burnt orange'],
      ].map(([hex, label]) => ({ hex, label })),
      setAccent: (hex) => this.setState({ accent: hex }),
      cover: !!s.cover,
      noCover: !s.cover,
      addCover: () => this.setState({ cover: true, tab: s.tab === 'join' ? 'web' : s.tab }),
      cardUrl,
      merchantCode,
      copied: s.copied,
      copyLink: () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(cardUrl).catch(() => {});
        }
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2000);
      },
      qrModalOpen: s.qrModalOpen,
      openQrModal: () => this.setState({ qrModalOpen: true }),
      closeQrModal: () => this.setState({ qrModalOpen: false }),
    };
  }
}

CardDesignView.defaultProps = {};

CardDesignView.prototype.__template = renderCardDesign;

export default withDCStyle(CardDesignView, 'CardDesign', __CSS);
