import { NextConfig } from 'next'

const config: NextConfig = {
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sw.js',
        destination: '/sw.js',
      },
      {
        source: '/:path*',
        destination: '/:path*',
        has: [
          {
            type: 'query',
            key: 'lang',
            value: '(fa|en)',
          },
        ],
      },
    ]
  },
}

export default config
