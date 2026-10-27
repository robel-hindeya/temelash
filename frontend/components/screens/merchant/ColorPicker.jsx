'use client';
/* Generated from the Temelash Card design (ColorPicker.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import renderColorPicker from './ColorPicker.view';

const __CSS = 'body{margin:0}';
class ColorPickerView extends DCLogic {
  constructor(props) {
    super(props);
    const hsv = this.toHsv(props.value || '#8a4b2a');
    this.state = { h: hsv[0], s: hsv[1], v: hsv[2], text: null, drag: false };
    this.last = (props.value || '#8a4b2a').toLowerCase();
  }
  componentDidUpdate(prev) {
    const v = (this.props.value || '').toLowerCase();
    if (v && v !== (prev.value || '').toLowerCase() && v !== this.last && /^#[0-9a-f]{6}$/.test(v)) {
      const hsv = this.toHsv(v);
      this.last = v;
      this.setState({ h: hsv[0], s: hsv[1], v: hsv[2], text: null });
    }
  }
  toHsv(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    if (!m) return [20, 0.7, 0.54];
    const n = parseInt(m[1], 16),
      r = ((n >> 16) & 255) / 255,
      g = ((n >> 8) & 255) / 255,
      b = (n & 255) / 255;
    const mx = Math.max(r, g, b),
      mn = Math.min(r, g, b),
      d = mx - mn;
    let h = 0;
    if (d) {
      if (mx === r) h = ((g - b) / d) % 6;
      else if (mx === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
    }
    return [Math.round(h), mx ? d / mx : 0, mx];
  }
  toHex(h, s, v) {
    const c = v * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = v - c;
    let r = 0,
      g = 0,
      b = 0;
    if (h < 60) {
      r = c;
      g = x;
    } else if (h < 120) {
      r = x;
      g = c;
    } else if (h < 180) {
      g = c;
      b = x;
    } else if (h < 240) {
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }
    const t = (u) =>
      Math.round((u + m) * 255)
        .toString(16)
        .padStart(2, '0');
    return '#' + t(r) + t(g) + t(b);
  }
  emit(h, s, v) {
    const hex = this.toHex(h, s, v);
    this.last = hex;
    this.setState({ h, s, v, text: null });
    if (typeof this.props.onChange === 'function') this.props.onChange(hex);
  }
  fromPointer(e) {
    if (!this.svEl) return;
    const r = this.svEl.getBoundingClientRect();
    const s = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const v = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    this.emit(this.state.h, s, v);
  }
  renderVals() {
    const st = this.state;
    const hex = this.toHex(st.h, st.s, st.v);
    const lum = (hx) => {
      const n = parseInt(hx.slice(1), 16);
      const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
    };
    const L = lum(hex);
    const cWhite = 1.05 / (L + 0.05),
      cNavy = (L + 0.05) / 0.0601;
    const onColor = cWhite >= cNavy ? '#ffffff' : '#101827';
    const best = Math.max(cWhite, cNavy);
    const text = st.text !== null ? st.text : hex.slice(1).toUpperCase();
    const bad = st.text !== null && !/^#?[0-9a-fA-F]{6}$/.test(st.text);
    const pre = Array.isArray(this.props.presets) ? this.props.presets : [];
    const id = this.props.idPrefix || 'cp';
    return {
      setSv: (el) => {
        this.svEl = el;
      },
      down: (e) => {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (x) {}
        this.setState({ drag: true });
        this.fromPointer(e);
      },
      move: (e) => {
        if (this.state.drag) this.fromPointer(e);
      },
      up: () => this.setState({ drag: false }),
      hueColor: this.toHex(st.h, 1, 1),
      fullColor: this.toHex(st.h, st.s || 1, 1),
      sx: st.s * 100 + '%',
      sy: (1 - st.v) * 100 + '%',
      hex,
      h: String(st.h),
      vPct: String(Math.round(st.v * 100)),
      onHue: (e) => this.emit(Number(e.target.value), st.s, st.v),
      onBri: (e) => this.emit(st.h, st.s, Number(e.target.value) / 100),
      hexText: text,
      hexBad: bad,
      hexOk: !bad,
      hexBorder: bad ? '#c81d29' : '#e3e5ec',
      onHex: (e) => {
        const raw = e.target.value.replace('#', '').trim();
        if (/^[0-9a-fA-F]{6}$/.test(raw)) {
          const hsv = this.toHsv('#' + raw);
          this.emit(hsv[0], hsv[1], hsv[2]);
        } else this.setState({ text: raw });
      },
      onColor,
      textNote:
        (onColor === '#ffffff' ? 'White' : 'Navy') + ' text reads best on it' + (best < 4.5 ? ' (low contrast)' : ''),
      hasPresets: pre.length > 0,
      presetRows: pre.map((p) => ({
        hex: p.hex,
        label: p.label,
        pressed: p.hex.toLowerCase() === hex ? 'true' : 'false',
        ring: p.hex.toLowerCase() === hex ? '#4661ad' : '#e3e5ec',
        pick: () => {
          const hsv = this.toHsv(p.hex);
          this.emit(hsv[0], hsv[1], hsv[2]);
        },
      })),
      hueId: id + '-hue',
      briId: id + '-bri',
      hexId: id + '-hex',
    };
  }
}

ColorPickerView.defaultProps = { value: '#8a4b2a', idPrefix: 'cp' };

ColorPickerView.prototype.__template = renderColorPicker;

export default withDCStyle(ColorPickerView, 'ColorPicker', __CSS);
