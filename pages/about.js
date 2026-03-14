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

const LANG = {
  en: {
    title: 'About AITDL',
    desc: "AITDL stands for Artificial Intelligence Technology & Deep Learning — India's premier platform for discovering, comparing and battling AI tools. Our mission is to empower 1.4 billion minds by providing easy access to the best technology.",
    suggest: "Suggest a Tool",
    suggestDesc: "Notice a missing tool? Help us expand India's AI Command Center by suggesting new innovations.",
    submit: "Suggest Now"
  },
  hi: {
    title: 'AITDL के बारे में',
    desc: "AITDL (आर्टिफिशियल इंटेलिजेंस टेक्नोलॉजी एंड डीप लर्निंग) भारत का प्रमुख AI कमांड सेंटर है। हमारा मिशन सर्वोत्तम AI टूल तक आसान पहुंच प्रदान करके 1.4 अरब दिमागों को सशक्त बनाना है।",
    suggest: "टूल का सुझाव दें",
    suggestDesc: "क्या कोई टूल छूट गया है? नए नवाचारों का सुझाव देकर भारत के AI कमांड सेंटर का विस्तार करने में हमारी सहायता करें।",
    submit: "अभी सुझाव दें"
  },
  sa: {
    title: 'AITDL विषये',
    desc: "AITDL (आर्टिफिशियल इंटेलिजेंस टेक्नोलॉजी एंड डीप लर्निंग) भारतस्य प्रमुखं एआइ आदेशकेन्द्रम् अस्ति। अस्माकं लक्ष्यं सर्वोत्तम-AI-उपकरणानां सुलभप्रवेशं प्रदाय १.४ अब्जजनानाम् सक्षमीकरणं अस्ति।",
    suggest: "उपकरणं सूचयन्तु",
    suggestDesc: "किन्तु किमपि साधनं लुप्तम् अस्ति वा? नूतनान् आविष्कारान् सूचयित्वा भारतस्य एआइ-आदेशकेन्द्रस्य विस्ताराय अस्मान् सहायं कुर्वन्तु।",
    submit: "इदानीमेव सूचयन्तु"
  }
}

export default function About() {
  const [lang, setLang] = useState('en')
  useEffect(() => {
    const saved = localStorage.getItem('aitdl_lang') || 'en'
    setLang(saved)
  }, [])

  const t = LANG[lang]

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="ambient-glow" style={{ top: '-10%', left: '30%' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px, 8vw, 56px)', fontWeight: 900, marginBottom: 24, letterSpacing: '-0.03em' }}>{t.title}</h1>
          <p style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: 18, marginBottom: 60 }}>
            {t.desc}
          </p>

          <div style={{
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            padding: 40,
            borderRadius: 24,
            textAlign: 'left',
            animation: 'slide-up 0.6s var(--ease) 0.2s both'
          }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>{t.suggest}</h2>
            <p style={{ color: 'var(--text3)', marginBottom: 32, fontSize: 16 }}>{t.suggestDesc}</p>
            <a href="mailto:hello@aitdl.com?subject=Tool%20Suggestion" style={{
              background: 'var(--accent)',
              color: '#fff',
              textDecoration: 'none',
              padding: '14px 32px',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 16,
              display: 'inline-block',
              boxShadow: '0 4px 20px rgba(255,107,53,0.3)',
              transition: 'all 0.3s'
            }} className="btn-primary-glow">
              {t.submit}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
