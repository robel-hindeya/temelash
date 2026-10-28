export const metadata = { title: 'Get a stamp card' };

// /join without a shop reference: every card starts from a shop's own QR code.
export default function Page() {
  return (
    <main
      style={{
        fontFamily: "'Source Sans 3', 'Noto Sans Ethiopic', system-ui, sans-serif",
        color: '#101827',
        background: '#f7f7f9',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '420px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}>Scan the shop&apos;s QR code</h1>
        <p style={{ margin: 0, color: '#374151' }}>
          Each shop has its own card. Scan the QR code at the counter to join, or to sign back in to a card you already
          have.
        </p>
        <a href="/" style={{ color: '#4661ad', fontWeight: 700 }}>
          About Temelash
        </a>
      </div>
    </main>
  );
}
