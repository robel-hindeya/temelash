'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api, { DEMO_ACCOUNTS, SHOW_DEMO_LOGINS } from '@/lib/api';

export default function DemoModal({ isOpen, onClose }) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Café');
  const [contact, setContact] = useState('');
  const [method, setMethod] = useState('Telegram');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [instantLoading, setInstantLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setLoading(false);
      setInstantLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!businessName.trim() || !contact.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Persist booking demo request to localStorage for admin inspection
      try {
        const key = 'tc_demo_bookings';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({
          id: `demo-${Date.now()}`,
          fullName,
          businessName,
          category,
          contact,
          method,
          notes,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem(key, JSON.stringify(existing));
      } catch {}
    }, 600);
  };

  const handleInstantDemo = async () => {
    setInstantLoading(true);
    const creds = DEMO_ACCOUNTS.owner;
    try {
      await api.auth.login(creds.email, creds.password);
    } catch {
      setInstantLoading(false);
      return;
    }
    setTimeout(() => {
      setInstantLoading(false);
      onClose?.();
      router.push('/business');
    }, 500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(16, 24, 39, 0.72)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(16, 24, 39, 0.35), 0 0 0 1px rgba(16, 24, 39, 0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 16px',
            borderBottom: '1px solid #f0f1f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#fff1f2',
                color: '#e42330',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '16px',
              }}
            >
              📅
            </span>
            <div style={{ fontWeight: '800', fontSize: '18px', color: '#101827' }}>
              Book a 1-on-1 Demo
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '999px',
              border: '1px solid #e3e5ec',
              background: '#f7f7f9',
              color: '#5b6475',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              lineHeight: 1,
              transition: 'background 0.15s',
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 28px 32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '999px',
                  background: '#dcfce7',
                  color: '#16a34a',
                  fontSize: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                ✓
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '800', color: '#101827' }}>
                You’re on the schedule!
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: '15px', color: '#5b6475', lineHeight: '22px' }}>
                Thank you, <strong>{fullName || 'there'}</strong>! Our team will reach out to you at{' '}
                <strong>{contact}</strong> via <strong>{method}</strong> within 2 business hours to set up your custom demo.
              </p>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '24px',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Demo Summary
                </div>
                <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: '600' }}>
                  🏢 {businessName} ({category})
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                  📍 Walkthrough covers: QR counter stands, Apple/Google wallet passes, and merchant stamp scanner app.
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SHOW_DEMO_LOGINS ? (
                <button
                  type="button"
                  onClick={handleInstantDemo}
                  disabled={instantLoading}
                  style={{
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '15px',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  ⚡ Want to test right now? Launch Instant Demo
                </button>
                ) : null}

                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    border: '1px solid #e3e5ec',
                    color: '#5b6475',
                    fontWeight: '600',
                    fontSize: '14px',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Close & Back to site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ margin: '0', fontSize: '14px', color: '#5b6475', lineHeight: '20px' }}>
                See how Temelash Card turns one-time visitors into loyal regulars with zero app downloads.
              </p>

              {/* Instant Live Demo Callout */}
              {SHOW_DEMO_LOGINS ? (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fee2e2',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#991b1b' }}>
                    ⚡ No time to wait?
                  </div>
                  <div style={{ fontSize: '12px', color: '#b91c1c' }}>
                    Explore the live interactive dashboard right now.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleInstantDemo}
                  disabled={instantLoading}
                  style={{
                    background: '#e42330',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '12px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {instantLoading ? 'Loading...' : 'Launch Live Demo →'}
                </button>
              </div>
              ) : null}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Robel Hindeya"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                    Business Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      outline: 'none',
                    }}
                  >
                    <option value="Café">Café / Coffee</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Salon & Spa">Salon & Spa</option>
                    <option value="Car Wash">Car Wash</option>
                    <option value="Retail">Retail / Boutique</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                  Business Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Buna House Café, Bole Branch"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                    Phone or Telegram handle *
                  </label>
                  <input
                    type="text"
                    placeholder="+251 91... or @username"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                    Preferred Contact Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      background: '#ffffff',
                      outline: 'none',
                    }}
                  >
                    <option value="Telegram">Telegram Call / Chat</option>
                    <option value="Phone Call">Direct Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="In-person Visit">In-person (Addis Ababa)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#101827', marginBottom: '4px' }}>
                  Anything specific you would like to see? (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. multi-branch loyalty, staff pin tracking, printed stands"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#101827',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '16px',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  marginTop: '6px',
                  boxShadow: '0 4px 12px rgba(16, 24, 39, 0.25)',
                }}
              >
                {loading ? 'Submitting request...' : 'Schedule My Demo →'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '12px', color: '#5b6475' }}>
                Free 15-minute walkthrough · No obligation · Full Q&A
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
