'use client';
/* Generated from the Temelash Card design (AdminOrders.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { withDCStyle } from '@/lib/dc-runtime';
import renderAdminOrders from './AdminOrders.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-hide-sm{display:none !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.lbl{font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.08em;color:#5b6475}\n.btn{border:1px solid #e3e5ec;background:#ffffff;color:#101827;font-weight:700;border-radius:12px;padding:8px 14px;min-height:44px;cursor:pointer}\n.btn-p{border:0;background:#e42330;color:#ffffff;font-weight:700;border-radius:12px;padding:8px 16px;min-height:44px;cursor:pointer}\n.btn-l{border:0;background:transparent;color:#4661ad;font-weight:700;min-height:44px;cursor:pointer;padding:8px 6px}\n.fld{border:1px solid #e3e5ec;border-radius:12px;padding:10px 12px;min-height:44px;background:#ffffff;color:#101827;box-sizing:border-box}\n.oc:hover{border-color:#101827 !important}';
class AdminOrdersView extends DCLogic {
  constructor(props) {
    super(props);
    const o = (x) => Object.assign({ driver: '', date: '', note: '', proof: false, log: [] }, x);
    this.state = {
      view: 'pipe',
      selId: 'o1',
      cancelOpen: false,
      cancelReason: 'Out of stock for this size. We will call you to pick another.',
      block: '',
      toast: null,
      snap: null,
      orders: [
        o({
          id: 'o1',
          no: 'SO-1048',
          biz: 'Buna House',
          owner: 'Rahel H.',
          phone: '+251 91 222 1100',
          when: 'today 08:30',
          address: 'Bole, Edna Mall area',
          stage: 0,
          pay: 'cash',
          paid: false,
          accent: '#e42330',
          logo: 'Uploaded',
          lines: [
            { qty: 2, name: 'Counter stand' },
            { qty: 20, name: 'Table sticker' },
          ],
          log: ['Today 08:30 · Ordered from the Shop'],
        }),
        o({
          id: 'o2',
          no: 'SO-1047',
          biz: 'Selam Salon',
          owner: 'Selam T.',
          phone: '+251 92 100 5511',
          when: 'yesterday',
          address: 'Kazanchis',
          stage: 0,
          pay: 'telebirr',
          paid: true,
          accent: '#4661ad',
          logo: 'Not uploaded (name only)',
          lines: [
            { qty: 1, name: 'Counter stand' },
            { qty: 1, name: 'Window decal' },
          ],
          log: ['Yesterday · Ordered, paid by Telebirr'],
        }),
        o({
          id: 'o3',
          no: 'SO-1045',
          biz: 'Abyssinia Car Wash',
          owner: 'Dawit B.',
          phone: '+251 91 880 3344',
          when: 'Mon',
          address: 'Megenagna',
          stage: 1,
          pay: 'transfer',
          paid: true,
          accent: '#101827',
          logo: 'Uploaded',
          proof: true,
          driver: '',
          lines: [{ qty: 3, name: 'Counter stand' }],
          log: ['Mon · Ordered', 'Mon · Artwork checked, sent to print'],
        }),
        o({
          id: 'o4',
          no: 'SO-1043',
          biz: 'Habesha Bites',
          owner: 'Liya M.',
          phone: '+251 93 400 7766',
          when: 'Sun',
          address: 'Sarbet',
          stage: 2,
          pay: 'cash',
          paid: false,
          accent: '#e42330',
          logo: 'Uploaded',
          proof: true,
          driver: 'Biruk (moto)',
          date: '2026-10-21',
          lines: [{ qty: 50, name: 'Table sticker' }],
          log: ['Sun · Ordered', 'Mon · Printed', 'Today · Out with Biruk'],
        }),
        o({
          id: 'o5',
          no: 'SO-1039',
          biz: 'Lime Spa',
          owner: 'Hanna G.',
          phone: '+251 93 210 7788',
          when: 'last week',
          address: 'Old Airport',
          stage: 3,
          pay: 'telebirr',
          paid: true,
          accent: '#4661ad',
          logo: 'Uploaded',
          proof: true,
          driver: 'Samuel (van)',
          date: '2026-10-17',
          lines: [
            { qty: 1, name: 'Counter stand' },
            { qty: 10, name: 'Table sticker' },
          ],
          log: ['Delivered Oct 17, signed by Hanna'],
        }),
      ],
      recs: [
        {
          id: 'r1',
          biz: 'Gebeya Burger',
          facts: 'Restaurant · 14 tables · 1 counter',
          ask: 'We have a long counter and outdoor seating. What should we put where?',
          status: 'New',
          qty: { stand: 2, sticker: 14, decal: 1 },
          reply: '',
          sent: false,
        },
        {
          id: 'r2',
          biz: 'Sparkle Wash',
          facts: 'Car wash · waiting area · 2 bays',
          ask: 'Customers wait in their cars. How do they scan?',
          status: 'New',
          qty: { stand: 1, sticker: 0, decal: 2 },
          reply: '',
          sent: false,
        },
        {
          id: 'r3',
          biz: 'Sheba Beauty',
          facts: 'Salon · 6 chairs',
          ask: 'One stand enough?',
          status: 'Answered',
          qty: { stand: 1, sticker: 6, decal: 0 },
          reply: 'One stand at reception and a sticker on each mirror.',
          sent: true,
        },
      ],
    };
  }
  componentWillUnmount() {
    clearTimeout(this.tt);
  }
  act(patch, toast, undo) {
    clearTimeout(this.tt);
    const snap = undo === false ? null : { orders: this.state.orders, recs: this.state.recs };
    this.setState(Object.assign({ block: '' }, patch, { toast, snap }));
    this.tt = setTimeout(() => this.setState({ toast: null, snap: null }), 6000);
  }
  renderVals() {
    const s = this.state;
    const STAGES = ['New', 'Printing', 'Out for delivery', 'Delivered'];
    const stamp = 'Today ' + new Date().toTimeString().slice(0, 5);
    const live = s.orders.filter((x) => x.stage >= 0);
    const views = [
      ['pipe', 'Order pipeline', live.filter((x) => x.stage < 3).length],
      ['recs', 'Help me choose', s.recs.filter((r) => !r.sent).length],
    ].map(([id, label, n]) => {
      const on = s.view === id;
      return {
        label,
        n: String(n),
        pressed: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
        pick: () => this.setState({ view: id }),
      };
    });
    const payOf = (x) =>
      x.paid
        ? ['Paid · ' + (x.pay === 'telebirr' ? 'Telebirr' : 'Transfer'), '#e6f4ea', '#1d6b3a']
        : ['Cash on delivery', '#fde8e9', '#c81d29'];
    const columns = STAGES.map((label, i) => {
      const items = live
        .filter((x) => x.stage === i)
        .map((x) => {
          const on = x.id === s.selId;
          const p = payOf(x);
          return Object.assign({}, x, {
            summary: x.lines.map((l) => l.qty + ' ' + l.name.toLowerCase()).join(', '),
            payLabel: p[0],
            payBg: p[1],
            payColor: p[2],
            needsProof: i === 0 && !x.proof,
            pressed: on ? 'true' : 'false',
            bg: on ? '#f7f7f9' : '#ffffff',
            border: on ? '#101827' : '#e3e5ec',
            pick: () => this.setState({ selId: x.id, cancelOpen: false, block: '' }),
          });
        });
      return { label: label.toUpperCase(), n: String(items.length), items, empty: items.length === 0 };
    });
    const raw = live.find((x) => x.id === s.selId);
    const base = {
      views,
      columns,
      viewPipe: s.view === 'pipe',
      viewRecs: s.view === 'recs',
      hasToast: !!s.toast,
      toast: s.toast || '',
      canUndo: !!s.snap,
      undo: () => {
        if (s.snap) {
          clearTimeout(this.tt);
          this.setState(Object.assign({}, s.snap, { toast: null, snap: null }));
        }
      },
    };

    const recs = s.recs.map((r) => {
      const names = [
        ['stand', 'Counter stand'],
        ['sticker', 'Table sticker'],
        ['decal', 'Window decal'],
      ];
      const setR = (patch) =>
        this.setState({ recs: s.recs.map((x) => (x.id === r.id ? Object.assign({}, x, patch) : x)) });
      return Object.assign({}, r, {
        open: !r.sent,
        pillBg: r.sent ? '#e6f4ea' : '#fde8e9',
        pillColor: r.sent ? '#1d6b3a' : '#c81d29',
        status: r.sent ? 'Answered' : 'New',
        picks: names.map(([k, n]) => ({
          name: n,
          qty: String(r.qty[k]),
          aria: n + ' quantity for ' + r.biz,
          onQty: (e) =>
            setR({ qty: Object.assign({}, r.qty, { [k]: Math.max(0, parseInt(e.target.value || '0', 10) || 0) }) }),
        })),
        onReply: (e) => setR({ reply: e.target.value }),
        sentLine:
          'Sent: ' +
          names
            .filter(([k]) => r.qty[k] > 0)
            .map(([k, n]) => r.qty[k] + ' × ' + n.toLowerCase())
            .join(', ') +
          (r.reply ? '. "' + r.reply + '"' : ''),
        send: () =>
          this.act(
            { recs: s.recs.map((x) => (x.id === r.id ? Object.assign({}, x, { sent: true }) : x)) },
            'Bundle added to ' + r.biz + "'s cart. They get a dashboard notice.",
          ),
      });
    });
    base.recs = recs;
    if (!raw) return Object.assign(base, { hasSel: false, sel: {}, steps: [] });

    const p = payOf(raw);
    const sel = Object.assign({}, raw, {
      stageUp: STAGES[raw.stage].toUpperCase(),
      qr: 'temelash.card/' + raw.biz.toLowerCase().replace(/[^a-z]+/g, '-'),
      payLine: raw.paid ? p[0] : 'Cash on delivery · collect [ETB TOTAL]',
      payColor2: raw.paid ? '#1d6b3a' : '#c81d29',
    });
    const steps = STAGES.map((label, i) => ({
      label,
      bar: i <= raw.stage ? '#e42330' : '#e3e5ec',
      color: i <= raw.stage ? '#101827' : '#5b6475',
      weight: i === raw.stage ? '700' : '600',
    }));
    const setO = (patch, toast, undo) => {
      const orders = s.orders.map((x) => (x.id === raw.id ? Object.assign({}, x, patch) : x));
      if (toast) this.act({ orders }, toast, undo);
      else this.setState({ orders });
    };
    let block = '';
    if (raw.stage === 0 && !raw.proof) block = 'Tick "Artwork checked" first.';
    if (raw.stage === 1 && !raw.driver) block = 'Pick a driver first.';
    if (raw.stage === 2 && !raw.paid) block = 'Collect the cash first.';
    const nextLabels = ['Send to print', 'Hand to driver', 'Mark delivered'];
    return Object.assign(base, {
      hasSel: true,
      sel,
      steps,
      showCollect: !raw.paid && raw.stage >= 2,
      collect: () =>
        setO(
          { paid: true, pay: 'cash', log: raw.log.concat(stamp + ' · Cash collected by ' + (raw.driver || 'team')) },
          'Cash marked as collected.',
        ),
      proofAria: raw.proof ? 'true' : 'false',
      proofBg: raw.proof ? '#101827' : '#ffffff',
      proofBorder: raw.proof ? '#101827' : '#5b6475',
      proofTick: raw.proof ? 'block' : 'none',
      toggleProof: () => setO({ proof: !raw.proof }),
      onDriver: (e) => setO({ driver: e.target.value }),
      onDate: (e) => setO({ date: e.target.value }),
      onNote: (e) => setO({ note: e.target.value }),
      canNext: raw.stage < 3,
      nextLabel: nextLabels[raw.stage] || '',
      nextBg: block ? '#c7cad3' : '#e42330',
      nextCursor: block ? 'not-allowed' : 'pointer',
      nextDisabled: block ? 'true' : 'false',
      next: () => {
        if (block) {
          this.setState({ block });
          return;
        }
        const to = raw.stage + 1;
        setO(
          {
            stage: to,
            log: raw.log.concat(stamp + ' · Moved to ' + STAGES[to] + (to === 2 ? ' with ' + raw.driver : '')),
          },
          raw.biz + ': ' + STAGES[to] + '. Merchant notified.',
        );
      },
      canBack: raw.stage > 0 && raw.stage < 3,
      backLabel: 'Back to ' + (STAGES[raw.stage - 1] || ''),
      back: () =>
        setO(
          { stage: raw.stage - 1, log: raw.log.concat(stamp + ' · Moved back to ' + STAGES[raw.stage - 1]) },
          'Moved back.',
        ),
      hasBlock: !!s.block,
      block: s.block,
      canCancel: raw.stage < 2,
      cancelOpen: s.cancelOpen,
      toggleCancel: () => this.setState({ cancelOpen: !s.cancelOpen }),
      cancelReason: s.cancelReason,
      onCancelReason: (e) => this.setState({ cancelReason: e.target.value }),
      cancel: () => {
        const orders = s.orders.map((x) => (x.id === raw.id ? Object.assign({}, x, { stage: -1 }) : x));
        this.act(
          { orders, cancelOpen: false, selId: null },
          raw.no + ' cancelled. ' + (raw.paid ? 'Refund started.' : 'Nothing to refund.'),
        );
      },
    });
  }
}

AdminOrdersView.defaultProps = {};

AdminOrdersView.prototype.__template = renderAdminOrders;

export default withDCStyle(AdminOrdersView, 'AdminOrders', __CSS);
