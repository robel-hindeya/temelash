import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';
import api from '@/lib/api';

const __CSS =
  'body{margin:0}\ninput,button{font:inherit}\nbutton:focus-visible,input:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';
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
    };
  }

  async componentDidMount() {
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
  }

  async validateToken(tokenToTest) {
    const token = (tokenToTest || this.state.cardTokenInput || '').trim();
    if (!token) {
      this.setState({ scanError: 'Please enter or scan a card token (43 characters).' });
      return;
    }
    this.setState({ scanError: '' });
    try {
      const res = await api.scanner.validate({ cardToken: token });
      const current = res.progress?.current ?? 0;
      const required = res.progress?.required ?? 10;
      const custName = res.customer?.firstName || 'Customer';
      const isCooldown = res.outcome === 'REJECTED' && res.reason === 'COOLDOWN_ACTIVE';

      this.setState({
        customer: {
          name: custName,
          initials: (custName || 'CU').slice(0, 2).toUpperCase(),
          phone: res.customer?.phone || '',
          visits: current,
          lastVisit: 'Today',
          stamps: current,
          maxStamps: required,
          rewardTitle: this.state.rewardTitle || 'Free macchiato',
          cardToken: token,
          cooldownNotice: isCooldown ? res.message?.en || 'Cooldown active: stamp already recorded recently.' : null,
        },
        screen: 'customer',
        scanError: isCooldown ? '' : (res.outcome === 'REJECTED' ? (res.message?.en || res.reason) : ''),
      });
    } catch (err) {
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
      toScan: () => this.setState({ screen: 'scan', scanError: '' }),
      scanCardNow: () => this.validateToken(),
      toCustomer: async () => {
        const q = (this.state.phoneInput || '').trim();
        if (q) {
          try {
            const res = await api.merchant.getCustomers({ q });
            if (res?.items && res.items.length > 0) {
              const c = res.items[0];
              // Search matched customer
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
      addStamp: async () => {
        if (!cust?.cardToken) {
          this.setState({ scanError: 'No active card token attached to this scan.' });
          return;
        }
        try {
          const res = await api.scanner.stamp({ cardToken: cust.cardToken });
          if (res.outcome === 'REJECTED') {
            this.setState({
              scanError: res.message?.en || 'Stamp rejected (' + res.reason + ')',
            });
            return;
          }
          const newSt = res.progress?.current ?? (cust.stamps + 1);
          const reqSt = res.progress?.required ?? maxSt;
          const isUnlocked = !!res.reward || newSt >= reqSt || (res.progress?.rewardsAvailable ?? 0) > 0;
          this.setState({
            today: this.state.today + 1,
            customer: Object.assign({}, cust, { stamps: newSt, maxStamps: reqSt, cooldownNotice: null }),
            screen: isUnlocked ? 'unlocked' : 'customer',
            scanError: '',
          });
        } catch (e) {
          this.setState({ scanError: e.message || 'Error recording stamp' });
        }
      },
      redeemReward: async () => {
        if (!cust?.cardToken) return;
        try {
          await api.scanner.redeem({ cardToken: cust.cardToken });
          this.setState({
            customer: Object.assign({}, cust, { stamps: 0 }),
            screen: 'redeemed',
            scanError: '',
          });
        } catch (e) {
          this.setState({ scanError: e.message || 'Redemption failed' });
        }
      },
      custName: cust?.name || 'Customer',
      custInitials: cust?.initials || 'CU',
      custMeta: `${cust?.visits || 1} visits · last visit ${cust?.lastVisit || 'Today'}`,
      custStampsFraction: `${currentSt}/${maxSt}`,
      rewardTitle: cust?.rewardTitle || 'Free macchiato',
      stampsToGo: Math.max(0, maxSt - currentSt),
      slots9: mkSlots(currentSt, false),
      slots10: mkSlots(maxSt, true),
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
        </header>{' '}
        {__b(__v?.isScan) ? (
          <>
            <div style={{ flex: '1 1 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>{'Scan a card'}</h1>{' '}
              <div
                style={{
                  position: 'relative',
                  height: '340px',
                  background: '#101827',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div aria-hidden="true" style={{ width: '200px', height: '200px', position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      width: '40px',
                      height: '40px',
                      borderLeft: '4px solid #ffffff',
                      borderTop: '4px solid #ffffff',
                      borderRadius: '12px 0 0 0',
                    }}
                  />{' '}
                  <span
                    style={{
                      position: 'absolute',
                      right: '0',
                      top: '0',
                      width: '40px',
                      height: '40px',
                      borderRight: '4px solid #ffffff',
                      borderTop: '4px solid #ffffff',
                      borderRadius: '0 12px 0 0',
                    }}
                  />{' '}
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      bottom: '0',
                      width: '40px',
                      height: '40px',
                      borderLeft: '4px solid #ffffff',
                      borderBottom: '4px solid #ffffff',
                      borderRadius: '0 0 0 12px',
                    }}
                  />{' '}
                  <span
                    style={{
                      position: 'absolute',
                      right: '0',
                      bottom: '0',
                      width: '40px',
                      height: '40px',
                      borderRight: '4px solid #ffffff',
                      borderBottom: '4px solid #ffffff',
                      borderRadius: '0 0 12px 0',
                    }}
                  />
                </div>{' '}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '0',
                    right: '0',
                    textAlign: 'center',
                    color: '#ffffff',
                    fontWeight: '600',
                  }}
                >
                  {"Point at the code on the customer's card"}
                </span>
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
                <button
                  type="button"
                  onClick={__v?.addStamp}
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
                  {'Add stamp'}
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
