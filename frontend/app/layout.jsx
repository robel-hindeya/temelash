import './globals.css';

export const metadata = {
  title: 'Temelash Card',
  description: 'Digital loyalty stamp cards for cafés, salons, spas, restaurants and car washes in Addis Ababa.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101827',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700;800&family=Noto+Sans+Ethiopic:wght@400;700&family=Playfair+Display:wght@500;700&family=Lora:wght@500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
