/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    agentUpgrade: 'security',
  },
  async rewrites() {
    if (process.env.TC_PROXY_LOCAL === 'true') {
      return [
        {
          source: '/api/v1/:path*',
          destination: 'http://localhost:3000/api/v1/:path*',
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
