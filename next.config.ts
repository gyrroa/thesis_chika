import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
