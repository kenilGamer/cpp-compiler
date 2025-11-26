/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration (empty for now, using webpack for fallbacks)
  turbopack: {},
  
  // Webpack configuration for client-side fallbacks
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        module: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    return config;
  },
};

export default nextConfig;
