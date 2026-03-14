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

import { Html, Head, Main, 
  NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet" />
        
        <meta name="author" 
          content="JRM - AITDL"/>
        <meta name="copyright"
          content="© 2025 JRM. All Rights Reserved."/>
        <meta name="robots" 
          content="index, follow"/>
        <meta name="theme-color" 
          content="#FF6B35"/>
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aitdl.com" />
        <meta property="og:title" content="AITDL — India's No. 1 AI Command Center" />
        <meta property="og:description" content="100+ verified AI tools for Indian students. Empowering 1.4 Billion minds." />
        <meta property="og:image" content="https://aitdl.com/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AITDL — India's AI Command Center" />
        <meta name="twitter:description" content="100+ verified AI tools for Indian students." />

        <link rel="icon" href="/favicon.svg"/>
        <link rel="canonical" 
          href="https://aitdl.com"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
