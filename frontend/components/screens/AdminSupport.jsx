'use client';
/* Generated from the Temelash Card design (AdminSupport.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import AdminSidebar from './AdminSidebar';

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
AdminSupportView.prototype.__template = function (__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
          color: '#101827',
          background: '#f7f7f9',
          minHeight: '1400px',
          fontSize: '16px',
          lineHeight: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          alignContent: 'flex-start',
        }}
      >
        <div className="tm-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
          <AdminSidebar active="support" />
        </div>{' '}
        <main
          className="tm-main"
          style={{
            flex: '999 1 560px',
            minWidth: '0',
            padding: '32px 40px 48px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                {'Support inbox'}
              </h1>
              <span className="lbl" style={{ border: '1px solid #e3e5ec', borderRadius: '999px', padding: '2px 10px' }}>
                {'SAMPLE DATA'}
              </span>
            </div>{' '}
            <p style={{ margin: '0', color: '#5b6475' }}>
              {
                "Questions from merchants and their staff, sent from the Help button in the dashboard or the staff app. Reply, assign, and close when it's fixed."
              }
            </p>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <input
              type="search"
              className="fld"
              value={__v?.q}
              placeholder="Search tickets"
              aria-label="Search tickets"
              style={{ flex: '1 1 220px', maxWidth: '320px' }}
              onChange={__v?.onQ}
            />{' '}
            <div role="group" aria-label="Status" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(__v?.chips || []).map((c, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    aria-pressed={c?.pressed}
                    onClick={c?.pick}
                    style={{
                      borderRadius: '999px',
                      padding: '6px 14px',
                      minHeight: '40px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      background: `${__t(c?.bg)}`,
                      color: `${__t(c?.color)}`,
                      border: `1px solid ${__t(c?.border)}`,
                    }}
                  >
                    {`${__t(c?.label)} `}
                    <span style={{ opacity: '0.8' }}>{`${__t(c?.n)}`}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>{' '}
            <button
              type="button"
              aria-pressed={__v?.mineAria}
              onClick={__v?.toggleMine}
              style={{
                borderRadius: '999px',
                padding: '6px 14px',
                minHeight: '40px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '14px',
                background: `${__t(__v?.mineBg)}`,
                color: `${__t(__v?.mineColor)}`,
                border: '1px solid #e3e5ec',
              }}
            >
              {'Assigned to me'}
            </button>
          </div>{' '}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
            <section
              aria-label="Tickets"
              style={{
                flex: '1 1 300px',
                minWidth: '0',
                background: '#ffffff',
                border: '1px solid #e3e5ec',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {__b(__v?.emptyList) ? (
                <>
                  <div style={{ padding: '24px 16px', color: '#5b6475', textAlign: 'center' }}>
                    {'No tickets match.'}
                  </div>
                </>
              ) : null}{' '}
              {(__v?.list || []).map((t, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    className="ti"
                    onClick={t?.pick}
                    aria-pressed={t?.pressed}
                    style={{
                      border: `1px solid ${__t(t?.border)}`,
                      background: `${__t(t?.bg)}`,
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      color: '#101827',
                    }}
                  >
                    <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '999px',
                          background: `${__t(t?.dot)}`,
                          flex: 'none',
                        }}
                      />
                      <span
                        style={{
                          fontWeight: '700',
                          flex: '1 1 auto',
                          minWidth: '0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >{`${__t(t?.subject)}`}</span>
                      <span
                        style={{ fontSize: '13px', color: '#5b6475', whiteSpace: 'nowrap' }}
                      >{`${__t(t?.ago)}`}</span>
                    </span>{' '}
                    <span style={{ fontSize: '14px', color: '#5b6475' }}>{`${__t(t?.biz)} · ${__t(t?.from)}`}</span>{' '}
                    <span style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          borderRadius: '999px',
                          padding: '1px 8px',
                          background: `${__t(t?.stBg)}`,
                          color: `${__t(t?.stColor)}`,
                        }}
                      >{`${__t(t?.statusLabel)}`}</span>
                      {__b(t?.urgent) ? (
                        <>
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: '700',
                              borderRadius: '999px',
                              padding: '1px 8px',
                              background: '#fde8e9',
                              color: '#c81d29',
                            }}
                          >
                            {'Urgent'}
                          </span>
                        </>
                      ) : null}
                      <span style={{ fontSize: '12px', color: '#5b6475' }}>{`${__t(t?.assigneeLabel)}`}</span>
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </section>{' '}
            {__b(__v?.hasSel) ? (
              <>
                <section
                  aria-label="Conversation"
                  style={{
                    flex: '2 1 460px',
                    minWidth: '0',
                    background: '#ffffff',
                    border: '1px solid #e3e5ec',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h2 style={{ margin: '0', fontSize: '20px', lineHeight: '26px' }}>{`${__t(__v?.sel?.subject)}`}</h2>{' '}
                    <span
                      style={{ color: '#5b6475', fontSize: '14px' }}
                    >{`${__t(__v?.sel?.no)} · ${__t(__v?.sel?.biz)} · ${__t(__v?.sel?.from)} (${__t(__v?.sel?.role)}) · via ${__t(__v?.sel?.channel)}`}</span>
                  </div>{' '}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      {'Status\n'}
                      <select className="fld" value={__v?.sel?.status} onChange={__v?.onStatus}>
                        <option value="open">{'Open'}</option>
                        <option value="waiting">{'Waiting on merchant'}</option>
                        <option value="solved">{'Solved'}</option>
                      </select>
                    </label>{' '}
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      {'Assigned to\n'}
                      <select className="fld" value={__v?.sel?.assignee} onChange={__v?.onAssignee}>
                        <option value="">{'Nobody'}</option>
                        <option value="me">{'Me ([Admin name])'}</option>
                        <option value="Meron">{'Meron (support)'}</option>
                        <option value="Kidus">{'Kidus (tech)'}</option>
                      </select>
                    </label>{' '}
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      {'Priority\n'}
                      <select className="fld" value={__v?.sel?.priority} onChange={__v?.onPriority}>
                        <option value="normal">{'Normal'}</option>
                        <option value="urgent">{'Urgent'}</option>
                      </select>
                    </label>{' '}
                    <div
                      style={{
                        flex: '1 1 200px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        background: '#f7f7f9',
                        borderRadius: '12px',
                        padding: '8px 12px',
                      }}
                    >
                      <span className="lbl">{'BUSINESS'}</span>
                      <span style={{ fontWeight: '600' }}>{`${__t(__v?.sel?.biz)} · ${__t(__v?.sel?.plan)}`}</span>{' '}
                      <span style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '14px' }}>
                        <A href="/admin/businesses">{'Open profile'}</A>
                        <A href="/business">{'View their dashboard'}</A>
                      </span>
                    </div>
                  </div>{' '}
                  <div
                    aria-label="Messages"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      borderTop: '1px solid #e3e5ec',
                      paddingTop: '16px',
                    }}
                  >
                    {(__v?.sel?.msgs || []).map((m, __i0) => (
                      <React.Fragment key={__i0}>
                        <div
                          style={{
                            alignSelf: `${__t(m?.align)}`,
                            maxWidth: '85%',
                            background: `${__t(m?.bg)}`,
                            color: `${__t(m?.color)}`,
                            border: `1px ${__t(m?.borderStyle)} ${__t(m?.borderColor)}`,
                            borderRadius: '12px',
                            padding: '10px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                          }}
                        >
                          <span
                            style={{ fontSize: '13px', fontWeight: '700', opacity: '0.85' }}
                          >{`${__t(m?.who)} · ${__t(m?.at)}`}</span>{' '}
                          <span style={{ whiteSpace: 'pre-wrap' }}>{`${__t(m?.text)}`}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>{' '}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      borderTop: '1px solid #e3e5ec',
                      paddingTop: '16px',
                    }}
                  >
                    <div role="tablist" aria-label="Reply type" style={{ display: 'flex', gap: '6px' }}>
                      {(__v?.modes || []).map((md, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={md?.pressed}
                            onClick={md?.pick}
                            style={{
                              borderRadius: '999px',
                              padding: '6px 14px',
                              minHeight: '40px',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '14px',
                              background: `${__t(md?.bg)}`,
                              color: `${__t(md?.color)}`,
                              border: `1px solid ${__t(md?.border)}`,
                            }}
                          >{`${__t(md?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                      <span className="lbl">{'SAVED REPLIES'}</span>{' '}
                      {(__v?.templates || []).map((tp, __i0) => (
                        <React.Fragment key={__i0}>
                          <button
                            type="button"
                            onClick={tp?.use}
                            style={{
                              border: '1px solid #e3e5ec',
                              background: '#ffffff',
                              color: '#4661ad',
                              fontWeight: '700',
                              fontSize: '14px',
                              borderRadius: '999px',
                              padding: '6px 12px',
                              minHeight: '36px',
                              cursor: 'pointer',
                            }}
                          >{`${__t(tp?.label)}`}</button>
                        </React.Fragment>
                      ))}
                    </div>{' '}
                    <label
                      htmlFor="sp-reply"
                      style={{ fontSize: '14px', fontWeight: '600' }}
                    >{`${__t(__v?.replyLabel)}`}</label>{' '}
                    <textarea
                      id="sp-reply"
                      rows="4"
                      className="fld"
                      value={__v?.draft}
                      placeholder={__v?.replyPh}
                      style={{ resize: 'vertical', background: `${__t(__v?.replyBg)}` }}
                      onChange={__v?.onDraft}
                    />{' '}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                      <button
                        type="button"
                        className="btn-p"
                        onClick={__v?.send}
                        style={{ background: `${__t(__v?.sendBg)}` }}
                      >{`${__t(__v?.sendLabel)}`}</button>{' '}
                      {__b(__v?.isReply) ? (
                        <>
                          <button type="button" className="btn" onClick={__v?.sendSolve}>
                            {'Send and mark solved'}
                          </button>
                        </>
                      ) : null}{' '}
                      {__b(__v?.hasErr) ? (
                        <>
                          <span role="status" style={{ color: '#c81d29', fontSize: '14px', fontWeight: '600' }}>
                            {'Write a message first.'}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </section>
              </>
            ) : null}
          </div>{' '}
          {__b(__v?.hasToast) ? (
            <>
              <div
                role="status"
                style={{
                  position: 'sticky',
                  bottom: '16px',
                  alignSelf: 'center',
                  background: '#101827',
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  boxShadow: '0 8px 24px rgba(16,24,39,0.12)',
                  maxWidth: '100%',
                }}
              >{`${__t(__v?.toast)}`}</div>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default withDCStyle(AdminSupportView, 'AdminSupport', __CSS);
