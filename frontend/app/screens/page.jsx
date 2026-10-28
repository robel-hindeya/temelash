import Link from 'next/link';

export const metadata = { title: 'All screens — Temelash Card' };

const GROUPS = [
  {
    title: 'Home & Authentication',
    items: [
      ['Home page', '/'],
      ['Sign in & Register', '/login'],
    ],
  },
  {
    title: 'Business dashboard',
    items: [
      ['Setup wizard', '/business/setup'],
      ['Overview', '/business'],
      ['Card design', '/business/card-design'],
      ['Stamps & rewards', '/business/rewards'],
      ['Customers', '/business/customers'],
      ['Offers & reminders', '/business/offers'],
      ['Analytics', '/business/analytics'],
      ['Shop', '/business/shop'],
      ['QR landing page', '/business/landing-page'],
      ['Staff & settings', '/business/settings'],
      ['Staff app', '/staff'],
    ],
  },
  {
    title: 'Customer',
    items: [
      ['Join page (no shop)', '/join'],
      ['Web card', '/card'],
    ],
  },
  {
    title: 'Admin (Temelash team)',
    items: [
      ['Overview', '/admin'],
      ['Businesses', '/admin/businesses'],
      ['Applications', '/admin/applications'],
      ['Subscriptions & billing', '/admin/billing'],
      ['Shop orders', '/admin/orders'],
      ['Support inbox', '/admin/support'],
      ['Platform analytics', '/admin/analytics'],
      ['Announcements', '/admin/announcements'],
      ['Platform settings', '/admin/settings'],
    ],
  },
];

export default function ScreensPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '40px 16px 64px' }}>
      <h1 style={{ margin: '0 0 4px', fontSize: 28, lineHeight: '34px' }}>Temelash Card — all screens</h1>
      <p style={{ margin: '0 0 28px', color: '#5b6475' }}>Frontend only. All numbers are sample data.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {GROUPS.map((g) => (
          <section
            key={g.title}
            style={{ background: '#fff', border: '1px solid #e3e5ec', borderRadius: 12, padding: 20 }}
          >
            <h2
              style={{
                margin: '0 0 10px',
                fontSize: 12,
                letterSpacing: '0.08em',
                color: '#5b6475',
                textTransform: 'uppercase',
              }}
            >
              {g.title}
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {g.items.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      color: '#4661ad',
                      fontWeight: 600,
                      display: 'inline-flex',
                      minHeight: 36,
                      alignItems: 'center',
                    }}
                  >
                    {label}
                  </Link>
                  <span style={{ color: '#5b6475', fontSize: 13, marginLeft: 8 }}>{href}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
