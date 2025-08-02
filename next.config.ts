// import type { NextConfig } from 'next';
// import path from 'path';

// const nextConfig: NextConfig = {
//   productionBrowserSourceMaps: false,

//   // ↓ stop logging every incoming request in Turbopack dev
//   logging: {
//     incomingRequests: false,
//   },

//   webpack(config) {
//     // Add alias for '@'
//     config.resolve.alias['@'] = path.join(__dirname, 'src');
//     return config;
//   },

//   images: {
//     // Whitelist your R2 host
//     domains: ['kjebfsttsciscbasipqs.supabase.co'],
//   },
// };

// export default nextConfig;
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
