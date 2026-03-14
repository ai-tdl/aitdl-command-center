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

import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function About() {
  const [lang, setLang] = useState('en')
  useEffect(() => {
    const saved = localStorage.getItem('aitdl_lang') || 'en'
    setLang(saved)
  }, [])

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 20 }}>About AITDL</h1>
        <p style={{ color: 'var(--text2)', lineHeight: 1.6 }}>
          AITDL (AI Tools Directory for Learners) is India's premier AI Command Center.
          Our mission is to empower 1.4 billion minds by providing easy access to the best AI tools.
        </p>
      </main>
      <Footer />
    </>
  )
}
