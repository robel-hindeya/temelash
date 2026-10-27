'use client';
/* Markup for the ColorPicker screen. State and handlers live in ColorPicker.jsx (renderVals); this file only draws __v. */
import React from 'react';
import { __b, __t } from '@/lib/dc-runtime';

export default function renderColorPicker(__v) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
          color: '#101827',
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '16px',
          lineHeight: '24px',
        }}
      >
        <div
          ref={(el) => {
            const f = __v?.setSv;
            if (typeof f === 'function') f(el);
          }}
          aria-hidden="true"
          onPointerDown={__v?.down}
          onPointerMove={__v?.move}
          onPointerUp={__v?.up}
          onPointerCancel={__v?.up}
          style={{
            position: 'relative',
            height: '150px',
            borderRadius: '12px',
            cursor: 'crosshair',
            touchAction: 'none',
            userSelect: 'none',
            background: `linear-gradient(to top, #000000, rgba(0,0,0,0)), linear-gradient(to right, #ffffff, rgba(255,255,255,0)), ${__t(__v?.hueColor)}`,
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: `${__t(__v?.sx)}`,
              top: `${__t(__v?.sy)}`,
              width: '20px',
              height: '20px',
              margin: '-10px 0 0 -10px',
              borderRadius: '999px',
              border: '3px solid #ffffff',
              boxSizing: 'border-box',
              boxShadow: '0 0 0 1px rgba(16,24,39,0.5)',
              background: `${__t(__v?.hex)}`,
              pointerEvents: 'none',
            }}
          />
        </div>{' '}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label htmlFor={__v?.hueId} style={{ fontSize: '13px', fontWeight: '700', color: '#5b6475' }}>
            {'Hue'}
          </label>{' '}
          <input
            id={__v?.hueId}
            type="range"
            min="0"
            max="359"
            step="1"
            value={__v?.h}
            style={{
              width: '100%',
              height: '14px',
              margin: '0',
              borderRadius: '999px',
              WebkitAppearance: 'none',
              appearance: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
            }}
            onChange={__v?.onHue}
          />
        </div>{' '}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label htmlFor={__v?.briId} style={{ fontSize: '13px', fontWeight: '700', color: '#5b6475' }}>
            {'Brightness'}
          </label>{' '}
          <input
            id={__v?.briId}
            type="range"
            min="0"
            max="100"
            step="1"
            value={__v?.vPct}
            style={{
              width: '100%',
              height: '14px',
              margin: '0',
              borderRadius: '999px',
              WebkitAppearance: 'none',
              appearance: 'none',
              cursor: 'pointer',
              background: `linear-gradient(to right, #000000, ${__t(__v?.fullColor)})`,
            }}
            onChange={__v?.onBri}
          />
        </div>{' '}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          <span
            aria-hidden="true"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              border: '1px solid #e3e5ec',
              background: `${__t(__v?.hex)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '14px',
              color: `${__t(__v?.onColor)}`,
            }}
          >
            {'Aa'}
          </span>{' '}
          <label htmlFor={__v?.hexId} style={{ fontWeight: '700', color: '#5b6475' }}>
            {'#'}
          </label>{' '}
          <input
            id={__v?.hexId}
            type="text"
            maxLength="7"
            value={__v?.hexText}
            style={{
              width: '110px',
              border: `1px solid ${__t(__v?.hexBorder)}`,
              borderRadius: '6px',
              padding: '10px 12px',
              minHeight: '44px',
              boxSizing: 'border-box',
              fontVariantNumeric: 'tabular-nums',
              textTransform: 'uppercase',
              color: '#101827',
            }}
            onChange={__v?.onHex}
          />{' '}
          {__b(__v?.hexBad) ? (
            <>
              <span style={{ fontSize: '13px', color: '#c81d29' }}>{'6 characters, like 8A4B2A'}</span>
            </>
          ) : null}{' '}
          {__b(__v?.hexOk) ? (
            <>
              <span style={{ fontSize: '13px', color: '#5b6475' }}>{`${__t(__v?.textNote)}`}</span>
            </>
          ) : null}
        </div>{' '}
        {__b(__v?.hasPresets) ? (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(__v?.presetRows || []).map((p, __i0) => (
                <React.Fragment key={__i0}>
                  <button
                    type="button"
                    aria-label={p?.label}
                    aria-pressed={p?.pressed}
                    onClick={p?.pick}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: `${__t(p?.hex)}`,
                      border: '2px solid #ffffff',
                      boxShadow: `0 0 0 2px ${__t(p?.ring)}`,
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
