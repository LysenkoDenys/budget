// next.config.mjs
import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public', // ✅ Ensures SW is built to public/
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // ⚠ SW is disabled in dev mode
  buildExcludes: [/middleware-manifest.json$/], // ✅ Avoids Next.js middleware issues
});

export default {
  ...nextConfig,
  reactStrictMode: true,
  webpack(config, { isServer }) {
    return config;
  },
};
