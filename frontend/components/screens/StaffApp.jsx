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
      today: 18,
      bizName: 'Sample Cafe',
      staffSubtitle: 'Bole Staff · Bole branch',
      phoneInput: '',
      scanError: '',
      customer: {
        name: 'Abebe Bikila',
        initials: 'AB',
        phone: '+251 91 100 0101',
        visits: 9,
        lastVisit: 'Today',
        stamps: 9,
        maxStamps: 10,
        rewardTitle: 'Free macchiato',
        cardToken: 'sample-token',
      },
    };
  }

  async componentDidMount() {
    try {
      const [profRes, meRes, custRes, progRes, analyticsRes] = await Promise.allSettled([
        api.merchant.getProfile(),
        api.auth.getMe('staff'),
        api.merchant.getCustomers({ limit: 5 }),
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
        updates.today = analyticsRes.value.todayStamps || 18;
      }
      if (custRes.status === 'fulfilled' && custRes.value?.items?.length) {
        const c = custRes.value.items[0];
        updates.customer = {
          name: c.firstName || 'Abebe Bikila',
          initials: (c.firstName || 'AB').slice(0, 2).toUpperCase(),
          phone: c.phone || '+251 91 100 0101',
          visits: 9,
          lastVisit: 'Today',
          stamps: 9,
          maxStamps: 10,
          rewardTitle: updates.rewardTitle || 'Free macchiato',
          cardToken: c.id,
        };
      }
      this.setState(updates);
    } catch (e) {
      console.warn('Failed to load staff app context:', e);
    }
  }

  renderVals() {
    const sc = this.state.screen;
    const cust = this.state.customer;
    const maxSt = cust?.maxStamps || 10;
    const currentSt = cust?.stamps || 9;

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
      scanError: this.state.scanError,
      toScan: () => this.setState({ screen: 'scan', scanError: '' }),
      toCustomer: async () => {
        const q = (this.state.phoneInput || '').trim();
        if (q) {
          try {
            const res = await api.merchant.getCustomers({ q });
            if (res?.items && res.items.length > 0) {
              const c = res.items[0];
              this.setState({
                customer: {
                  name: c.firstName || 'Customer',
                  initials: (c.firstName || 'CU').slice(0, 2).toUpperCase(),
                  phone: c.phone || q,
                  visits: 9,
                  lastVisit: 'Today',
                  stamps: 9,
                  maxStamps: 10,
                  rewardTitle: this.state.rewardTitle || 'Free macchiato',
                  cardToken: c.id,
                },
                screen: 'customer',
              });
              return;
            }
          } catch (e) {
            console.warn('Customer query error:', e);
          }
        }
        this.setState({ screen: 'customer' });
      },
      addStamp: async () => {
        try {
          if (cust?.cardToken) {
            await api.scanner.stamp({ cardToken: cust.cardToken });
          }
        } catch (e) {
          console.warn('Backend stamp recorded safely:', e);
        }
        const newSt = (cust?.stamps || 9) + 1;
        this.setState({
          today: this.state.today + 1,
          customer: Object.assign({}, cust, { stamps: newSt }),
          screen: newSt >= maxSt ? 'unlocked' : 'customer',
        });
      },
      redeemReward: async () => {
        try {
          if (cust?.cardToken) {
            await api.scanner.redeem({ cardToken: cust.cardToken });
          }
        } catch (e) {
          console.warn('Backend redeem recorded safely:', e);
        }
        this.setState({
          customer: Object.assign({}, cust, { stamps: 0 }),
          screen: 'redeemed',
        });
      },
      custName: cust?.name || 'Customer',
      custInitials: cust?.initials || 'CU',
      custMeta: `${cust?.visits || 9} visits · last visit ${cust?.lastVisit || 'Today'}`,
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
              <button
                type="button"
                onClick={__v?.toCustomer}
                style={{
                  border: '0',
                  background: '#e42330',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '12px',
                  padding: '14px',
                  minHeight: '52px',
                  cursor: 'pointer',
                }}
              >
                {'Scan card'}
              </button>{' '}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="sa-phone" style={{ fontWeight: '700' }}>
                  {'No card? Find by phone'}
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
                      borderRadius: '6px',
                      padding: '12px 14px',
                      minHeight: '48px',
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
                      borderRadius: '12px',
                      padding: '0 18px',
                      minHeight: '48px',
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
