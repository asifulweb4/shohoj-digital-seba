/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@clerk/nextjs', 'drizzle-orm', '@neondatabase/serverless'],
  experimental: {
    // force swc off if babel exists
    forceSwcTransforms: false,
  },
  webpack: (config) => {
    return config
  },
}

module.exports = nextConfig
