'use client';
/* Generated from the Temelash Card design (QRStand.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import { getMerchantJoinUrl } from '@/lib/api';
import renderQRStand from './QRStand.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-drawer{width:100% !important;border-radius:20px 20px 0 0 !important;top:auto !important;max-height:90% !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';
class QRStandView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      view: 'shop',
      cart: {},
      info: {},
      cartOpen: false,
      step: 'cart',
      rec: false,
      recSent: false,
      copied: false,
      addr: '',
      addrErr: false,
      pay: 'telebirr',
      nextOrder: 1043,
      orders: [{ id: '#1042', date: '2 Oct', items: '1 × Counter stand on wood block', total: 2000, stage: 3 }],
    };
  }
  renderVals() {
    const s = this.state;
    const etb = (n) => 'ETB ' + n.toLocaleString('en-US');
    const P = [
      {
        id: 'stand',
        kind: 'isStand',
        name: 'Counter stand on wood block',
        tag: 'Best seller',
        price: 1800,
        unit: 'each',
        sceneBg: '#e9ebf0',
        desc: 'The centrepiece by your till. Your name, your QR and your reward line, printed and set into a solid wood base.',
        features: [
          'Solid wood base, real weight',
          'Satin print on a rigid board',
          'Amharic and English instruction',
          'Your logo, colour and reward line',
        ],
        alt: 'Navy counter stand with Buna House name and QR, standing in a wooden block',
      },
      {
        id: 'tent',
        kind: 'isTent',
        name: 'Two-sided table tent',
        tag: 'For tables',
        price: 650,
        unit: 'each · A6',
        sceneBg: '#f7f7f9',
        desc: 'Folds to stand on any table. QR on one side, your reward on the other, so customers see it while they wait.',
        features: [
          'A6, folds flat for storage',
          'Wipe-clean finish',
          'QR side + reward side',
          'Order in sets for every table',
        ],
        alt: 'White and cream two-sided table tent with QR and reward text',
      },
      {
        id: 'sticker',
        kind: 'isSticker',
        name: 'Window sticker',
        tag: 'Street-facing',
        price: 400,
        unit: 'each · 15 × 15 cm',
        sceneBg: '#dfe3ea',
        desc: 'Tells people walking past that you reward regulars. They can scan it from the pavement.',
        features: [
          '15 × 15 cm, outdoor vinyl',
          'Sticks to glass from inside or out',
          'Fade-resistant for sunny windows',
          'Your name and QR',
        ],
        alt: 'Square window sticker with bold navy border and QR',
      },
      {
        id: 'dome',
        kind: 'isDome',
        name: 'Domed table sticker',
        tag: 'Small & tough',
        price: 350,
        unit: 'each',
        sceneBg: '#8a5a3a',
        desc: 'A small raised sticker for tables, bars and chair-side shelves. Peel, press, done.',
        features: [
          'Raised resin dome, wipe-clean',
          'Peel-and-stick backing',
          'Sits flat on tables and counters',
          'Your colour and name',
        ],
        alt: 'Green domed sticker with QR on a wooden table',
      },
    ];
    const qty = (id) => s.cart[id] || 0;
    const setQty = (id, n) => {
      const c = Object.assign({}, s.cart);
      if (n <= 0) delete c[id];
      else c[id] = n;
      this.setState({ cart: c });
    };
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
    const products = P.map((p) => {
      const q = qty(p.id),
        open = !!s.info[p.id];
      return Object.assign({}, p, {
        isStand: p.kind === 'isStand',
        isTent: p.kind === 'isTent',
        isSticker: p.kind === 'isSticker',
        isDome: p.kind === 'isDome',
        features: p.features.map((t) => ({ t })),
        priceText: etb(p.price),
        infoOpen: open,
        infoExpanded: open ? 'true' : 'false',
        infoLabel: open ? 'Hide details' : 'Show details',
        toggleInfo: () => this.setState({ info: Object.assign({}, s.info, { [p.id]: !open }) }),
        inCart: q > 0,
        notInCart: q === 0,
        qty: String(q),
        add: () => setQty(p.id, 1),
        inc: () => setQty(p.id, q + 1),
        dec: () => setQty(p.id, q - 1),
        incLabel: 'One more ' + p.name,
        decLabel: 'One less ' + p.name,
      });
    });
    const lines = P.filter((p) => qty(p.id) > 0).map((p) => ({
      name: p.name,
      each: etb(p.price) + ' ' + p.unit,
      qty: String(qty(p.id)),
      total: etb(p.price * qty(p.id)),
      inc: () => setQty(p.id, qty(p.id) + 1),
      dec: () => setQty(p.id, qty(p.id) - 1),
      incLabel: 'One more ' + p.name,
      decLabel: 'One less ' + p.name,
    }));
    const sub = P.reduce((a, p) => a + p.price * qty(p.id), 0);
    const deliveryFee = sub > 0 ? 200 : 0;
    const count = P.reduce((a, p) => a + qty(p.id), 0);
    const stageLabels = ['Ordered', 'Printing', 'Out for delivery', 'Delivered'];
    const orders = s.orders.map((o) => ({
      id: o.id,
      date: o.date,
      items: o.items,
      total: etb(o.total),
      status: stageLabels[o.stage],
      bg: o.stage === 3 ? '#f7f7f9' : '#ffffff',
      fg: o.stage === 3 ? '#5b6475' : '#4661ad',
      border: o.stage === 3 ? '#e3e5ec' : '#4661ad',
      steps: stageLabels.map((l, i) => ({
        label: l,
        bar: i <= o.stage ? '#4661ad' : '#e3e5ec',
        color: i <= o.stage ? '#101827' : '#5b6475',
      })),
    }));
    const payments = [
      ['telebirr', 'Telebirr'],
      ['cbe', 'CBE Birr'],
      ['cod', 'Cash on delivery'],
    ].map(([id, label]) => ({
      label,
      checked: id === s.pay,
      border: id === s.pay ? '#4661ad' : '#e3e5ec',
      pick: () => this.setState({ pay: id }),
    }));
    const isOrders = s.view === 'orders';
    return {
      pageTitle: isOrders ? 'Your orders' : 'Stands, stickers and signs',
      pageSub: isOrders
        ? 'Track what we are printing and delivering for you.'
        : 'Printed with your name, colour and QR, and delivered to your door in Addis Ababa.',
      isShop: !isOrders,
      isOrders,
      ordersLabel: isOrders ? 'Back to shop' : 'Orders',
      ordersPressed: isOrders ? 'true' : 'false',
      ordersBorder: isOrders ? '#101827' : '#e3e5ec',
      toggleOrders: () => this.setState({ view: isOrders ? 'shop' : 'orders' }),
      products,
      joinUrl: getMerchantJoinUrl(),
      qr,
      lines,
      hasItems: count > 0,
      cartEmpty: count === 0,
      cartCount: String(count),
      cartAria: 'Cart, ' + count + ' items',
      openCart: () => this.setState({ cartOpen: true, step: s.step === 'done' ? 'cart' : s.step }),
      closeCart: () => this.setState({ cartOpen: false }),
      cartOpen: s.cartOpen,
      drawerTitle: s.step === 'checkout' ? 'Checkout' : s.step === 'done' ? 'Thank you' : 'Your cart',
      stepCart: s.step === 'cart',
      stepCheckout: s.step === 'checkout',
      stepDone: s.step === 'done',
      subtotal: etb(sub),
      delivery: etb(deliveryFee),
      total: etb(sub + deliveryFee),
      toCheckout: () => this.setState({ step: 'checkout' }),
      backToCart: () => this.setState({ step: 'cart' }),
      addr: s.addr,
      addrErr: s.addrErr,
      addrBorder: s.addrErr ? '#c81d29' : '#e3e5ec',
      onAddr: (e) => this.setState({ addr: e.target.value, addrErr: false }),
      payments,
      placeOrder: () => {
        if (!(s.addr || '').trim()) {
          this.setState({ addrErr: true });
          return;
        }
        const items = P.filter((p) => qty(p.id) > 0)
          .map((p) => qty(p.id) + ' × ' + p.name)
          .join(', ');
        const id = '#' + s.nextOrder;
        this.setState({
          orders: [{ id, date: '21 Oct', items, total: sub + deliveryFee, stage: 0 }].concat(s.orders),
          nextOrder: s.nextOrder + 1,
          cart: {},
          step: 'done',
          lastOrderId: id,
        });
      },
      lastOrderId: s.lastOrderId || '',
      seeOrders: () => this.setState({ cartOpen: false, view: 'orders', step: 'cart' }),
      orders,
      noOrders: s.orders.length === 0,
      recOpen: s.rec,
      recExpanded: s.rec ? 'true' : 'false',
      recBtn: s.rec ? 'Close' : 'Get a recommendation',
      toggleRec: () => this.setState({ rec: !s.rec }),
      recSent: s.recSent,
      recNotSent: !s.recSent,
      sendRec: () => this.setState({ recSent: true }),
      copy: () => this.setState({ copied: true }),
      copyLabel: s.copied ? 'Copied' : 'Copy link',
    };
  }
}

QRStandView.defaultProps = {};

QRStandView.prototype.__template = renderQRStand;

export default withDCStyle(QRStandView, 'QRStand', __CSS);
