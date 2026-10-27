/** @type {import('next').NextConfig} */

// Browsers call /api/v1/* on this origin; the Next.js server forwards those calls to the NestJS backend.
// Set TC_API_BASE_URL (server-only) to the backend's /api/v1 URL. Development falls back to the local backend.
function apiBaseUrl() {
  const configured = process.env.TC_API_BASE_URL;
  if (configured) return configured.replace(/\/+$/, '');
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:3000/api/v1';
  return null;
}

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    agentUpgrade: 'security',
  },
  async rewrites() {
    const base = apiBaseUrl();
    if (!base) {
      console.warn('TC_API_BASE_URL is not set: /api/v1 calls will fail until it points at the backend.');
      return [];
    }
    return [
      {
        source: '/api/v1/:path*',
        destination: `${base}/:path*`,
      },
    ];
  },
};

export default nextConfig;
