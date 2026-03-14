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
    desc: "AITDL (AI Tools Directory for Learners) is India's premier AI Command Center. Our mission is to empower 1.4 billion minds by providing easy access to the best AI tools."
  },
  hi: {
    title: 'AITDL के बारे में',
    desc: "AITDL (शिक्षार्थियों के लिए AI टूल्स निर्देशिका) भारत का प्रमुख AI कमांड सेंटर है। हमारा मिशन सर्वोत्तम AI टूल तक आसान पहुंच प्रदान करके 1.4 अरब दिमागों को सशक्त बनाना है।"
  },
  sa: {
    title: 'AITDL विषये',
    desc: "AITDL (शिक्षार्थिनां कृते AI उपकरणनिर्देशिका) भारतस्य प्रमुखं एआइ आदेशकेन्द्रम् अस्ति। अस्माकं लक्ष्यं सर्वोत्तम-AI-उपकरणानां सुलभप्रवेशं प्रदाय १.४ अब्जजनानाम् सक्षमीकरणं अस्ति।"
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
          <p style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: 18 }}>
            {t.desc}
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
