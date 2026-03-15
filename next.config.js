/** @type {import('next').NextConfig} */

/**
 * AITDL — India's AI Command Center
 * Author: Jawahar Ramkripal Mallah
 * Software Developer & Service Provider since 2007
 * Published Author | Tech Entrepreneur
 * https://aitdl.com | hello@aitdl.com
 * © 2026 All Rights Reserved
 */

const isProd = process.env.NODE_ENV === 'production'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://aitdl.com',
    NEXT_PUBLIC_SITE_NAME: 'AITDL',
    NEXT_PUBLIC_AUTHOR: 'Jawahar Ramkripal Mallah',
  },
}

module.exports = nextConfig
