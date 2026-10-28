'use client';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import api, { getMerchantJoinUrl } from '@/lib/api';
import MerchantPage, { NotAvailableYet } from './MerchantPage';

// The shop's real QR code (it opens the shop's landing page), ready to download or print. Ordering
// printed stands through Temelash is not built yet.
export default function QRStand() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Loading the profile also stores the real join reference that the QR link is built from.
    api.merchant
      .getProfile()
      .then((p) => {
        setName(p?.nameEn || '');
        setUrl(getMerchantJoinUrl());
      })
      .catch((e) => setError(e.message || 'Could not load your business.'));
  }, []);

  const download = async () => {
    const dataUrl = await QRCode.toDataURL(url, { width: 1200, margin: 2, errorCorrectionLevel: 'M' });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${(name || 'temelash').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-qr.png`;
    a.click();
  };

  const btn = (primary) => ({
    border: primary ? 'none' : '1px solid #e3e5ec',
    background: primary ? '#e42330' : '#ffffff',
    color: primary ? '#ffffff' : '#101827',
    fontWeight: 700,
    borderRadius: '12px',
    padding: '10px 18px',
    minHeight: '44px',
    cursor: 'pointer',
  });

  return (
    <MerchantPage active="qr" title="Your QR code" subtitle="Customers scan it to get your card.">
      {error ? <p role="alert" style={{ margin: 0, color: '#c81d29', fontWeight: 600 }}>{error}</p> : null}
      <section
        style={{
          background: '#ffffff',
          border: '1px solid #e3e5ec',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {url ? <QRCodeDisplay value={url} size={220} alt={`QR code for ${name}`} /> : <p>Loading…</p>}
        <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '22px' }}>{name}</h2>
          <p style={{ margin: 0, color: '#374151' }}>
            It opens your shop page, where customers get your card (in Telegram or on the web) or sign back in.
          </p>
          <code style={{ fontSize: '13px', color: '#5b6475', overflowWrap: 'anywhere' }}>{url}</code>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button type="button" style={btn(true)} disabled={!url} onClick={download}>
              Download QR (PNG)
            </button>
            <button type="button" style={btn(false)} disabled={!url} onClick={() => window.print()}>
              Print
            </button>
          </div>
        </div>
      </section>
      <NotAvailableYet
        what="Order printed stands and stickers"
        plan="Ordering printed QR stands through Temelash is not available yet. Download the QR above and print it at any print shop; any size from 5 cm works."
      />
    </MerchantPage>
  );
}
