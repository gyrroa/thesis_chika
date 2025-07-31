import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,

  webpack: (config) => {
    // Add alias for '@'
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  watch: {
    ignored: ['**/dist/**', '**/.git/**', '**/node_modules/**'],
  },
  images: {
    // Whitelist your R2 host
    domains: [
      'kjebfsttsciscbasipqs.supabase.co',
    ],
  },
};

export default nextConfig;
