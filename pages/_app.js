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
 * @copyright © 2025 All Rights Reserved
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

import '../styles/globals.css'
import { useEffect } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export default function App({ 
  Component, pageProps 
}) {
  useEffect(() => {
    // Initial theme loading
    const saved = localStorage.getItem('aitdl_theme') || 'dark'
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
