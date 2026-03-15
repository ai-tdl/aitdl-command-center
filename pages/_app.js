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
import { useEffect, useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import SidebarCard from '../components/SidebarCard'
import { GlobalSEO } from '../lib/seo'
import { HomeJsonLD } from '../lib/jsonld'

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    
    // No saved preference → follow OS
    if (!saved) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        setTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        setTheme('light');
      }
      return;
    }
    
    // Apply saved theme
    setTheme(saved);
    document.documentElement.classList.remove('dark','glass','midnight');
    document.documentElement.setAttribute('data-theme', saved);
    
    if (saved === 'dark' || saved === 'midnight') {
      document.documentElement.classList.add('dark');
    }
    if (saved === 'glass') {
      document.documentElement.setAttribute('data-theme','glass');
    }
    if (saved === 'midnight') {
      document.documentElement.setAttribute('data-theme','midnight');
    }
  }, []);

  useEffect(() => {
    // Only auto-follow OS if no saved preference
    const saved = localStorage.getItem('theme');
    if (saved) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        setTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        setTheme('light');
      }
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

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
    </ErrorBoundary>
  )
}
