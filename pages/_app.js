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

export default function App({ 
  Component, pageProps 
}) {
  useEffect(() => {
    // Always dark by default
    const saved = localStorage
      .getItem('aitdl_theme') || 'dark'
    document.documentElement
      .setAttribute('data-theme', saved)
    document.body.style.background = 
      saved === 'dark' ? '#0A0A0F' 
      : saved === 'light' ? '#F8F7F4'
      : 'rgba(10,10,15,0.85)'
  }, [])

  return <Component {...pageProps} />
}
