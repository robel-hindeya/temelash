'use client';
import React from 'react';
import Sidebar from './Sidebar';

// Shared layout for merchant dashboard screens written as plain React: the merchant sidebar plus a main column, with
// the same responsive rules as the design screens.
const CSS = `
.tm-merch-sidewrap > *{flex:1 1 auto;min-width:0;width:100%;display:block}
@media (max-width:1023px){.tm-merch-sidewrap{flex:1 1 100% !important}.tm-merch-main{padding:24px 24px 40px !important}}
@media (max-width:640px){.tm-merch-main{padding:16px 16px 32px !important}.tm-merch-main h1{font-size:24px !important;line-height:30px !important}}
`;

export default function MerchantPage({ active, title, subtitle, children }) {
  return (
    <div
      style={{
        fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
        color: '#101827',
        background: '#f7f7f9',
        minHeight: '100vh',
        fontSize: '16px',
        lineHeight: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        alignContent: 'flex-start',
      }}
    >
      <style>{CSS}</style>
      <div className="tm-merch-sidewrap" style={{ flex: '1 1 248px', maxWidth: '100%', display: 'flex' }}>
        <Sidebar active={active} />
      </div>
      <main
        className="tm-merch-main"
        style={{ flex: '999 1 560px', minWidth: 0, padding: '32px 40px 48px', display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <header>
          <h1 style={{ margin: 0, fontSize: '30px', lineHeight: '36px', fontWeight: 800 }}>{title}</h1>
          {subtitle ? <p style={{ margin: '4px 0 0', color: '#5b6475' }}>{subtitle}</p> : null}
        </header>
        {children}
      </main>
    </div>
  );
}

/** Shown on merchant dashboard screens whose feature has no backend yet, instead of sample data. */
export function NotAvailableYet({ what, plan }) {
  return (
    <section style={{ background: '#ffffff', border: '1px solid #e3e5ec', borderRadius: '16px', padding: '24px', maxWidth: '640px' }}>
      <span
        style={{
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#5b6475',
          border: '1px solid #e3e5ec',
          borderRadius: '999px',
          padding: '2px 10px',
          marginBottom: '12px',
        }}
      >
        NOT AVAILABLE YET
      </span>
      <h2 style={{ margin: '0 0 8px', fontSize: '20px' }}>{what}</h2>
      <p style={{ margin: 0, color: '#374151' }}>{plan}</p>
    </section>
  );
}
