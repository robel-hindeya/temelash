'use client';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthModal from '@/components/AuthModal';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get('tab') === 'signup' ? 'signup' : 'signin';

  return (
    <AuthModal
      isOpen={true}
      initialTab={initialTab}
      onClose={() => router.push('/')}
    />
  );
}

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f7f9',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e3e5ec',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#101827' }}
        >
          <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
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
          </svg>
          <span style={{ fontWeight: '800', letterSpacing: '0.02em', fontSize: '15px' }}>
            TEMELASH <span style={{ color: '#e42330' }}>CARD</span>
          </span>
        </Link>
        <Link
          href="/"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#5b6475',
            textDecoration: 'none',
          }}
        >
          ← Back to home
        </Link>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <Suspense fallback={<div style={{ color: '#5b6475' }}>Loading...</div>}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
