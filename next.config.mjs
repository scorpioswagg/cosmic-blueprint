/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assets.vercel.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
  },
  // Optimize for deployment
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Make environment variables available
  env: {
    CHROME_VALUE: process.env.CHROME_VALUE || '/usr/bin/google-chrome',
  },
};

export default nextConfig;
