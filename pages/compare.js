import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function Compare() {
  const [lang, setLang] = useState('en')
  useEffect(() => {
    const saved = localStorage.getItem('aitdl_lang') || 'en'
    setLang(saved)
  }, [])

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 20 }}>Compare AI Tools</h1>
        <p style={{ color: 'var(--text2)' }}>Compare features, pricing, and India scores of top AI tools side-by-side.</p>
        <div style={{ marginTop: 40, padding: 40, border: '0.5px dashed var(--border)', borderRadius: 12 }}>
          Comparison module loading...
        </div>
      </main>
      <Footer />
    </>
  )
}
