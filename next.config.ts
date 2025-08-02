import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://52.229.206.200:8000/:path*',
      },
    ];
  },
  productionBrowserSourceMaps: false,

  // Turbopack-compatible logging config
  logging: {
    incomingRequests: false,
  },

  // Remove Webpack config (Turbopack ignores it anyway)

  images: {
    domains: ['kjebfsttsciscbasipqs.supabase.co'],
  },
};

export default nextConfig;
