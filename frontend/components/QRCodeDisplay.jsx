'use client';
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function QRCodeDisplay({
  value,
  size = 180,
  darkColor = '#101827',
  lightColor = '#ffffff',
  className = '',
  style = {},
  alt = 'Scan QR Code',
}) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    let cancelled = false;
    const text = value || 'https://temelashcard.et';
    QRCode.toDataURL(text, {
      width: size * 2,
      margin: 1,
      color: {
        dark: darkColor || '#101827',
        light: lightColor || '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch((err) => {
        console.warn('QRCode generation warning:', err);
      });

    return () => {
      cancelled = true;
    };
  }, [value, size, darkColor, lightColor]);

  if (!dataUrl) {
    return (
      <div
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: lightColor,
          borderRadius: '12px',
          ...style,
        }}
      >
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>Generating QR...</span>
      </div>
    );
  }

  return (
    <img
      src={dataUrl}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'block',
        imageRendering: 'pixelated',
        ...style,
      }}
    />
  );
}
