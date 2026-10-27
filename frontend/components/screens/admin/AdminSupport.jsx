'use client';
/* Generated from the Temelash Card design (AdminSupport.dc.html). */
import DCLogic from '@/lib/DCLogic';
import { A, withDCStyle } from '@/lib/dc-runtime';
import renderAdminSupport from './AdminSupport.view';

const __CSS =
  'body{margin:0;background:#f7f7f9}\n.tm-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}\n@media (max-width:1023px){.tm-sidewrap{flex:1 1 100% !important}.tm-main{padding:24px 24px 40px !important}}\n@media (max-width:640px){.tm-main{padding:16px 16px 32px !important;gap:16px !important}.tm-main h1{font-size:24px !important;line-height:30px !important}.tm-main section{padding:16px !important}.tm-hide-sm{display:none !important}}\na{color:#4661ad}a:hover{color:#101827}\ninput,select,textarea,button{font:inherit}\na:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #4661ad;outline-offset:2px}\n.lbl{font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.08em;color:#5b6475}\n.btn{border:1px solid #e3e5ec;background:#ffffff;color:#101827;font-weight:700;border-radius:12px;padding:8px 14px;min-height:44px;cursor:pointer}\n.btn-p{border:0;background:#e42330;color:#ffffff;font-weight:700;border-radius:12px;padding:8px 16px;min-height:44px;cursor:pointer}\n.fld{border:1px solid #e3e5ec;border-radius:12px;padding:10px 12px;min-height:44px;background:#ffffff;color:#101827;box-sizing:border-box}\n.ti:hover{background:#f7f7f9}';
class AdminSupportView extends DCLogic {
  constructor(props) {
    super(props);
    const m = (who, at, text, kind) => ({ who, at, text, kind: kind || 'them' });
    this.state = {
      filter: 'open',
      q: '',
      mine: false,
      selId: 't1',
      mode: 'reply',
      draft: '',
      err: false,
      toast: null,
      tickets: [
        {
          id: 't1',
          no: '#2291',
          subject: 'Staff app says "card not found"',
          biz: 'Buna House',
          plan: 'Growth',
          from: 'Rahel H.',
          role: 'Owner',
          channel: 'dashboard',
          ago: '12 min',
          status: 'open',
          priority: 'urgent',
          assignee: '',
          msgs: [
            m(
              'Rahel H.',
              '09:41',
              'Two customers showed their Google Wallet card and the staff app said card not found. Apple cards work fine.',
            ),
          ],
        },
        {
          id: 't2',
          no: '#2290',
          subject: 'How do I change my reward?',
          biz: 'Selam Salon',
          plan: 'Starter',
          from: 'Selam T.',
          role: 'Owner',
          channel: 'dashboard',
          ago: '1 h',
          status: 'open',
          priority: 'normal',
          assignee: 'Meron',
          msgs: [
            m(
              'Selam T.',
              '08:50',
              'I want the 6th visit to be free instead of the 8th. Will old customers lose stamps?',
            ),
          ],
        },
        {
          id: 't3',
          no: '#2288',
          subject: 'Forgot staff PIN',
          biz: 'Abyssinia Car Wash',
          plan: 'Multi-branch',
          from: 'Yared',
          role: 'Staff · Megenagna',
          channel: 'staff app',
          ago: '3 h',
          status: 'open',
          priority: 'normal',
          assignee: '',
          msgs: [m('Yared', '07:15', 'I forgot my PIN for the staff app. The owner is not here today.')],
        },
        {
          id: 't4',
          no: '#2285',
          subject: 'Telebirr payment taken twice',
          biz: 'Habesha Bites',
          plan: 'Growth',
          from: 'Liya M.',
          role: 'Owner',
          channel: 'dashboard',
          ago: 'yesterday',
          status: 'waiting',
          priority: 'urgent',
          assignee: 'me',
          msgs: [
            m('Liya M.', 'Yesterday 16:02', 'I see two payments of the same amount this month.'),
            m(
              '[Admin name]',
              'Yesterday 16:30',
              'Sorry about that. Can you send the two Telebirr transaction numbers so we can refund one?',
              'us',
            ),
          ],
        },
        {
          id: 't5',
          no: '#2280',
          subject: 'Can I add a second branch?',
          biz: 'Lime Spa',
          plan: 'Starter',
          from: 'Hanna G.',
          role: 'Owner',
          channel: 'dashboard',
          ago: 'Mon',
          status: 'open',
          priority: 'normal',
          assignee: '',
          msgs: [m('Hanna G.', 'Mon 11:10', 'We are opening in CMC next month. Do I need a new account?')],
        },
        {
          id: 't6',
          no: '#2271',
          subject: 'Stand arrived with wrong colour',
          biz: 'Arada Coffee',
          plan: 'Trial',
          from: 'Yonas H.',
          role: 'Owner',
          channel: 'dashboard',
          ago: 'last week',
          status: 'solved',
          priority: 'normal',
          assignee: 'Meron',
          msgs: [
            m('Yonas H.', 'Oct 13', 'The stand is blue but my card is red.'),
            m('Meron', 'Oct 13', 'A new red stand is on the way, no charge.', 'us'),
          ],
        },
      ],
    };
  }
  componentWillUnmount() {
    clearTimeout(this.tt);
  }
  flash(t) {
    clearTimeout(this.tt);
    this.setState({ toast: t });
    this.tt = setTimeout(() => this.setState({ toast: null }), 4000);
  }
  renderVals() {
    const s = this.state;
    const T = s.tickets;
    const stMeta = {
      open: ['Open', '#fde8e9', '#c81d29', '#e42330'],
      waiting: ['Waiting on merchant', '#eef1fa', '#4661ad', '#4661ad'],
      solved: ['Solved', '#e6f4ea', '#1d6b3a', '#c7cad3'],
    };
    const chipDefs = [
      ['open', 'Open'],
      ['waiting', 'Waiting'],
      ['solved', 'Solved'],
      ['all', 'All'],
    ];
    const chips = chipDefs.map(([id, label]) => {
      const on = s.filter === id;
      return {
        label,
        n: String(id === 'all' ? T.length : T.filter((t) => t.status === id).length),
        pressed: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
        pick: () => this.setState({ filter: id }),
      };
    });
    const q = s.q.trim().toLowerCase();
    const shown = T.filter(
      (t) =>
        (s.filter === 'all' || t.status === s.filter) &&
        (!s.mine || t.assignee === 'me') &&
        (!q || (t.subject + ' ' + t.biz + ' ' + t.from + ' ' + t.no).toLowerCase().includes(q)),
    ).sort((a, b) => (b.priority === 'urgent') - (a.priority === 'urgent'));
    const who = (a) => (a === 'me' ? 'You' : a || 'Unassigned');
    const list = shown.map((t) => {
      const on = t.id === s.selId;
      const st = stMeta[t.status];
      return Object.assign({}, t, {
        pressed: on ? 'true' : 'false',
        bg: on ? '#f7f7f9' : '#ffffff',
        border: on ? '#101827' : 'transparent',
        dot: st[3],
        statusLabel: st[0],
        stBg: st[1],
        stColor: st[2],
        urgent: t.priority === 'urgent',
        assigneeLabel: who(t.assignee),
        pick: () => this.setState({ selId: t.id, draft: '', err: false }),
      });
    });
    const raw = T.find((t) => t.id === s.selId);
    const base = {
      q: s.q,
      onQ: (e) => this.setState({ q: e.target.value }),
      chips,
      list,
      emptyList: list.length === 0,
      mineAria: s.mine ? 'true' : 'false',
      mineBg: s.mine ? '#101827' : '#ffffff',
      mineColor: s.mine ? '#ffffff' : '#101827',
      toggleMine: () => this.setState({ mine: !s.mine }),
      hasToast: !!s.toast,
      toast: s.toast || '',
    };
    if (!raw) return Object.assign(base, { hasSel: false, sel: { msgs: [] }, modes: [], templates: [] });
    const setT = (patch) =>
      this.setState({ tickets: s.tickets.map((t) => (t.id === raw.id ? Object.assign({}, t, patch) : t)) });
    const msgs = raw.msgs.map((m) =>
      m.kind === 'note'
        ? Object.assign({}, m, {
            align: 'stretch',
            bg: '#eef1fa',
            color: '#101827',
            borderStyle: 'dashed',
            borderColor: '#5b6475',
            who: 'Internal note · ' + m.who,
          })
        : m.kind === 'us'
          ? Object.assign({}, m, {
              align: 'flex-end',
              bg: '#101827',
              color: '#ffffff',
              borderStyle: 'solid',
              borderColor: '#101827',
            })
          : m.kind === 'sys'
            ? Object.assign({}, m, {
                align: 'center',
                bg: '#ffffff',
                color: '#5b6475',
                borderStyle: 'solid',
                borderColor: '#ffffff',
                who: 'Update',
              })
            : Object.assign({}, m, {
                align: 'flex-start',
                bg: '#f7f7f9',
                color: '#101827',
                borderStyle: 'solid',
                borderColor: '#e3e5ec',
              }),
    );
    const first = raw.from.split(' ')[0];
    const tpl = [
      ['Greeting', 'Hi ' + first + ', thanks for writing. '],
      [
        'Google Wallet fix',
        'Hi ' +
          first +
          ', we found the problem: Google Wallet cards needed the latest staff app. Please update the staff app from the store and scan again. Stamps are safe.',
      ],
      [
        'Reset staff PIN',
        'Hi ' + first + ', I have reset the staff PIN. The owner gets a new one by SMS and can share it with you.',
      ],
      [
        'Reward change',
        'Hi ' +
          first +
          ', you can change the reward in Stamps & rewards. Customers keep the stamps they already have; the new count applies from today.',
      ],
      [
        'Add a branch',
        'Hi ' +
          first +
          ', no new account needed. Go to Staff & settings > Branches > Add a branch. Each branch gets its own QR and staff.',
      ],
    ];
    const isNote = s.mode === 'note';
    const modes = [
      ['reply', 'Reply to merchant'],
      ['note', 'Internal note'],
    ].map(([id, label]) => {
      const on = s.mode === id;
      return {
        label,
        pressed: on ? 'true' : 'false',
        bg: on ? '#101827' : '#ffffff',
        color: on ? '#ffffff' : '#101827',
        border: on ? '#101827' : '#e3e5ec',
        pick: () => this.setState({ mode: id }),
      };
    });
    const now = new Date().toTimeString().slice(0, 5);
    const doSend = (solve) => {
      const text = s.draft.trim();
      if (!text) {
        this.setState({ err: true });
        return;
      }
      const add = [{ who: isNote ? '[Admin name]' : '[Admin name]', at: now, text, kind: isNote ? 'note' : 'us' }];
      let status = raw.status;
      if (!isNote) status = solve ? 'solved' : 'waiting';
      if (solve) add.push({ who: '', at: now, text: 'Marked solved', kind: 'sys' });
      setT({ msgs: raw.msgs.concat(add), status, assignee: raw.assignee || 'me' });
      this.setState({ draft: '', err: false });
      this.flash(
        isNote
          ? 'Note saved. Only the team can see it.'
          : solve
            ? 'Reply sent. Ticket solved.'
            : 'Reply sent to ' + first + ' in their dashboard.',
      );
    };
    return Object.assign(base, {
      hasSel: true,
      sel: Object.assign({}, raw, { msgs }),
      onStatus: (e) => {
        const v = e.target.value;
        setT({
          status: v,
          msgs: raw.msgs.concat([{ who: '', at: now, text: 'Status: ' + stMeta[v][0], kind: 'sys' }]),
        });
        this.flash('Status changed to ' + stMeta[v][0] + '.');
      },
      onAssignee: (e) => {
        const v = e.target.value;
        setT({ assignee: v });
        this.flash('Assigned to ' + who(v) + '.');
      },
      onPriority: (e) => setT({ priority: e.target.value }),
      modes,
      templates: tpl.map(([label, text]) => ({ label, use: () => this.setState({ draft: text, err: false }) })),
      replyLabel: isNote ? 'Note for the team (the merchant never sees this)' : 'Reply to ' + raw.from,
      replyPh: isNote ? 'e.g. Checked logs, Google pass ID mismatch' : 'Write your reply',
      replyBg: isNote ? '#eef1fa' : '#ffffff',
      draft: s.draft,
      onDraft: (e) => this.setState({ draft: e.target.value, err: false }),
      isReply: !isNote,
      sendLabel: isNote ? 'Save note' : 'Send reply',
      sendBg: isNote ? '#101827' : '#e42330',
      send: () => doSend(false),
      sendSolve: () => doSend(true),
      hasErr: s.err,
    });
  }
}

AdminSupportView.defaultProps = {};

AdminSupportView.prototype.__template = renderAdminSupport;

export default withDCStyle(AdminSupportView, 'AdminSupport', __CSS);
