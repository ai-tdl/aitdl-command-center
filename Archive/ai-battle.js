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

import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { auth } from '../lib/firebase'

const LANG = {
  en: {
    title: 'AI Battle ⚔️',
    desc: 'Which AI is better for your specific task? Real-world tests and benchmarks.',
    selectA: 'Select Tool A',
    selectB: 'Select Tool B',
    startBtn: '⚔️ Start Battle',
    analyzing: 'Analyzing...',
    verdict: 'Battle Verdict',
    loginRequired: 'Please log in to use AI Battle.',
    error: 'Battle failed. Please try again.',
    vs: 'VS',
  },
  hi: {
    title: 'AI युद्ध ⚔️',
    desc: 'आपके विशिष्ट कार्य के लिए कौन सी AI बेहतर है? वास्तविक दुनिया के परीक्षण और बेंचमार्क।',
    selectA: 'टूल A चुनें',
    selectB: 'टूल B चुनें',
    startBtn: '⚔️ युद्ध शुरू करें',
    analyzing: 'विश्लेषण हो रहा है...',
    verdict: 'युद्ध परिणाम',
    loginRequired: 'AI युद्ध के लिए लॉग इन करें।',
    error: 'युद्ध विफल। पुनः प्रयास करें।',
    vs: 'बनाम',
  },
  sa: {
    title: 'AI युद्धम् ⚔️',
    desc: 'भवतः विशिष्टकार्याय कतमः AI उत्तमः? वास्तविकजगतः परीक्षणानि मानदण्डाः च।',
    selectA: 'उपकरणं A चिनुत',
    selectB: 'उपकरणं B चिनुत',
    startBtn: '⚔️ युद्धम् आरभत',
    analyzing: 'विश्लेषणं भवति...',
    verdict: 'युद्धपरिणामः',
    loginRequired: 'AI युद्धाय प्रवेशः आवश्यकः।',
    error: 'युद्धं विफलम्। पुनः प्रयतताम्।',
    vs: 'विरुद्धम्',
  }
}

export default function AIBattle({ tools }) {
  const [lang, setLang]     = useState('en')
  const [toolA, setToolA]   = useState('')
  const [toolB, setToolB]   = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('aitdl_lang') || 'en'
    setLang(saved)
  }, [])

  const t = LANG[lang] || LANG.en

  const handleBattle = async () => {
    if (!toolA || !toolB || toolA === toolB) return

    const user = auth.currentUser
    if (!user) {
      setError(t.loginRequired)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const idToken = await user.getIdToken()
      const res = await fetch('/api/aiBattle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ toolA, toolB, uid: user.uid }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Battle failed')
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message || t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 10 }}>
            {t.title}
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 15 }}>{t.desc}</p>
        </div>

        {/* Selector row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 16,
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <select
            value={toolA}
            onChange={e => setToolA(e.target.value)}
            style={selectStyle}
          >
            <option value="">{t.selectA}</option>
            {tools.map(tool => (
              <option key={tool.slug} value={tool.slug}>{tool.name}</option>
            ))}
          </select>

          <span style={{
            fontSize: 18,
            fontWeight: 800,
            color: 'var(--accent)',
            textAlign: 'center',
          }}>
            {t.vs}
          </span>

          <select
            value={toolB}
            onChange={e => setToolB(e.target.value)}
            style={selectStyle}
          >
            <option value="">{t.selectB}</option>
            {tools
              .filter(tool => tool.slug !== toolA)
              .map(tool => (
                <option key={tool.slug} value={tool.slug}>{tool.name}</option>
              ))}
          </select>
        </div>

        {/* Battle button */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <button
            onClick={handleBattle}
            disabled={!toolA || !toolB || toolA === toolB || loading}
            style={{
              padding: '14px 40px',
              background: (!toolA || !toolB || toolA === toolB || loading)
                ? 'var(--border)' : 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              cursor: (!toolA || !toolB || toolA === toolB || loading)
                ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? t.analyzing : t.startBtn}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239,68,68,0.1)',
            border: '0.5px solid rgba(239,68,68,0.3)',
            borderRadius: 10,
            color: '#EF4444',
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 24,
          }}>
            {error}
          </div>
        )}

        {/* Loading shimmer */}
        {loading && (
          <div style={{
            padding: 40,
            border: '0.5px dashed var(--border)',
            borderRadius: 16,
            textAlign: 'center',
            color: 'var(--text3)',
            fontSize: 14,
          }}>
            ⚔️ {t.analyzing}
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div style={{
            background: 'var(--bg2)',
            border: '0.5px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {/* Result header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '0.5px solid var(--border)',
              gap: 12,
            }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>
                {result.toolA}
              </div>
              <div style={{
                padding: '4px 14px',
                background: 'rgba(255,107,53,0.15)',
                color: 'var(--accent)',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 800,
                textAlign: 'center',
              }}>
                {t.vs}
              </div>
              <div style={{
                fontWeight: 700,
                fontSize: 16,
                color: 'var(--text)',
                textAlign: 'right',
              }}>
                {result.toolB}
              </div>
            </div>

            {/* Result body */}
            <div style={{ padding: '24px' }}>
              <h3 style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text3)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}>
                {t.verdict}
              </h3>
              <div style={{
                fontSize: 14,
                color: 'var(--text2)',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
              }}>
                {result.result}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

const selectStyle = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--bg2)',
  border: '0.5px solid var(--border)',
  borderRadius: 10,
  color: 'var(--text)',
  fontSize: 14,
  cursor: 'pointer',
}

// ── getStaticProps: tools list from data/tools.json ──────────────────────────
export async function getStaticProps() {
  const data = require('../data/tools.json')
  const tools = data.tools || data
  return {
    props: {
      tools: tools.map(t => ({ slug: t.slug, name: t.name })),
    },
    revalidate: 86400,
  }
}
