'use client';
/* Generated from the Temelash Card design (StaffApp.dc.html). */
import React from 'react';
import DCLogic from '@/lib/DCLogic';
import { __b, __t, A, withDCStyle } from '@/lib/dc-runtime';

const __CSS =
  'body{margin:0}\ninput,button{font:inherit}\nbutton:focus-visible,input:focus-visible{outline:2px solid #4661ad;outline-offset:2px}';
class StaffAppView extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { screen: 'scan', today: 42 };
  }
  renderVals() {
    const sc = this.state.screen;
    const mk = (earned, unlocked) => {
      const out = [];
      for (let i = 0; i < 10; i++) {
        const r = i === 9,
          e = i < earned && !r;
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
    const go = (s, inc) => () => this.setState({ screen: s, today: this.state.today + (inc || 0) });
    return {
      today: String(this.state.today),
      isScan: sc === 'scan',
      isCustomer: sc === 'customer',
      isUnlocked: sc === 'unlocked',
      isRedeemed: sc === 'redeemed',
      toScan: go('scan'),
      toCustomer: go('customer'),
      toUnlocked: go('unlocked', 1),
      toRedeemed: go('redeemed'),
      slots9: mk(9, false),
      slots10: mk(10, true),
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
            <strong>{'Buna House'}</strong>
            <span style={{ fontSize: '14px', color: '#5b6475' }}>{'Meron · Bole branch'}</span>
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
                  {'LM'}
                </span>{' '}
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '24px', lineHeight: '30px', fontWeight: '700' }}>{'Liya M.'}</span>
                  <span style={{ color: '#5b6475' }}>{'23 visits · last visit 4 days ago'}</span>
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
                    {'9/10'}
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
                  {'1 more visit to a free macchiato'}
                </div>
              </div>{' '}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={__v?.toUnlocked}
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
                  {'STAMP ADDED · LIYA M.'}
                </span>{' '}
                <h1 style={{ margin: '0', fontSize: '28px', lineHeight: '34px', fontWeight: '700' }}>
                  {'Free macchiato unlocked'}
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
                  onClick={__v?.toRedeemed}
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
                {'Hand Liya her free macchiato. Her card starts again at 0/10.'}
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
