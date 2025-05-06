/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['files.stripe.com'],
  },
  typescript: {
    // 在生產構建時忽略 TypeScript 錯誤
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;