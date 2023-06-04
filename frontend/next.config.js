/** @type { import('next').NextConfig } */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['k.kakaocdn.net'],
  }
}

module.exports = nextConfig
