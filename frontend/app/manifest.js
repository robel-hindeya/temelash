// Lets customers add their loyalty card to the home screen; the icon opens the card like an app.
export default function manifest() {
  return {
    name: 'Temelash Card',
    short_name: 'My Card',
    description: 'Your digital stamp card. Show it at the counter to collect stamps and rewards.',
    start_url: '/card',
    scope: '/',
    display: 'standalone',
    background_color: '#f7f7f9',
    theme_color: '#101827',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
