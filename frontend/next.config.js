/** @type { import('next').NextConfig } */
const nextConfig = {
  async headers() {
    return [
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      }
    ]
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['k.kakaocdn.net'],
  }
}

module.exports = nextConfig
