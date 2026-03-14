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

import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

const LANG = {
  en: {
    title: 'Compare AI Tools',
    desc: 'Compare features, pricing, and India scores of top AI tools side-by-side.',
    loading: 'Comparison module loading...'
  },
  hi: {
    title: 'AI टूल्स की तुलना करें',
    desc: 'शीर्ष AI टूल्स की विशेषताओं, मूल्य निर्धारण और भारत स्कोर की साथ-साथ तुलना करें।',
    loading: 'तुलना मॉड्यूल लोड हो रहा है...'
  },
  sa: {
    title: 'AI उपकरणानां तुलनां कुर्वन्तु',
    desc: 'शीर्ष AI उपकरणानां वैशिष्ट्यानां, मूल्यान्कनस्य, भारत-अङ्कानां च पार्श्वे तुलनां कुर्वन्तु।',
    loading: 'तुलना मॉड्यूल लोड् भवति...'
  }
}

export default function Compare() {
  const [lang, setLang] = useState('en')
  useEffect(() => {
    const saved = localStorage.getItem('aitdl_lang') || 'en'
    setLang(saved)
  }, [])

  const t = LANG[lang]

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 20 }}>{t.title}</h1>
        <p style={{ color: 'var(--text2)' }}>{t.desc}</p>
        <div style={{ marginTop: 40, padding: 40, border: '0.5px dashed var(--border)', borderRadius: 12 }}>
          {t.loading}
        </div>
      </main>
      <Footer />
    </>
  )
}
