/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @role      Software Developer & Service 
 *            Provider since 2007
 *            Published Author | Tech Entrepreneur
 * @website   https://aitdl.com
 * @email     hello@aitdl.com
 * @copyright © 2026 All Rights Reserved
 * ============================================
 * @books
 * - When Code Learned to Feel:
 *   The Day Code Took a Breath (Kindle)
 * - Code Without Limits:
 *   The End of Human Coding (Upcoming)
 * - Gaṇitsūtram:
 *   Golden Book of Vedic Mathematics (Upcoming)
 * ============================================
 */

import Head from 'next/head'
import '../styles/globals.css'
import { useEffect } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import SidebarCard from '../components/SidebarCard'
import { GlobalSEO } from '../lib/seo'
import { HomeJsonLD } from '../lib/jsonld'
import { Analytics } from '@vercel/analytics/react'

export default function App({ 
  Component, pageProps 
}) {
  useEffect(() => {
    // Initial theme loading
    const saved = localStorage.getItem('aitdl_theme') || 'light'
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  return (
    <ErrorBoundary>
      <Head>
        {GlobalSEO()}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <link rel="canonical" href="https://aitdl.com" />
      </Head>
      <HomeJsonLD toolCount={100} />
      <Component {...pageProps} />
      <SidebarCard />
      <Analytics />
    </ErrorBoundary>
  )
}
