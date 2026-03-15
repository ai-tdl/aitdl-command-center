/** @type {import('next').NextConfig} */

/**
 * AITDL — India's AI Command Center
 * Author: Jawahar Ramkripal Mallah
 * Software Developer & Service Provider since 2007
 * Published Author | Tech Entrepreneur
 * https://aitdl.com | hello@aitdl.com
 * © 2026 All Rights Reserved
 */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
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
