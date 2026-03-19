import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import toolsData from '../data/tools.json'
import { auth } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const LANG = {
  en: {
    title: 'AI Battle ⚔️',
    desc: 'Which AI is better for your specific task? Real-world tests and benchmarks.',
    loading: 'Battle Arena loading...',
    selectPrompt: 'Select contenders, login, and let our AI judge the winner.',
    toolA: 'Select Contender A',
    toolB: 'Select Contender B',
    battleBtn: 'Start Battle ⚔️',
    loginBtn: 'Log in to Battle',
    results: 'Battle Results',
    error: 'An error occurred during the battle.'
  },
  hi: {
    title: 'AI युद्ध ⚔️',
    desc: 'आपके विशिष्ठ कार्य के लिए कौन सी AI बेहतर है? वास्तविक दुनिया के परीक्षण और बेंचमार्क।',
    loading: 'युद्ध क्षेत्र लोड हो रहा है...',
    selectPrompt: 'AI चुनें, लॉगिन करें और विजेता ढूंढें।',
    toolA: 'प्रतिद्वंद्वी A चुनें',
    toolB: 'प्रतिद्वंद्वी B चुनें',
    battleBtn: 'युद्ध शुरू करें ⚔️',
    loginBtn: 'लॉगिन करें',
    results: 'परिणाम',
    error: 'त्रुटि हुई।'
  },
  sa: {
    title: 'AI युद्धम् ⚔️',
    desc: 'भवतः विशिष्टकार्याय कतमः AI उत्तमः? वास्तविकजगतः परीक्षणानि मानदण्डाः च।',
    loading: 'युद्धक्षेत्रं लोड् भवति...',
    selectPrompt: 'उपकरणं चिनोतु, लॉगिन कुर्वन्तु, विजेतारं च पश्यन्तु।',
    toolA: 'प्रतिस्पर्धी A चिनोतु',
    toolB: 'प्रतिस्पर्धी B चिनोतु',
    battleBtn: 'युद्धम् आरम्भम् ⚔️',
    loginBtn: 'लॉगिन कुर्वन्तु',
    results: 'परिणामम्',
    error: 'दोषः जातः।'
  }
}

export async function getStaticProps() {
  return {
    props: {
      tools: toolsData.tools.sort((a,b) => a.name.localeCompare(b.name))
    }
  }
}

export default function AIBattle({ tools }) {
  const [lang, setLang] = useState('en')
  const [user, setUser] = useState(null)
  
  const [toolA, setToolA] = useState('')
  const [toolB, setToolB] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('aitdl_lang') || 'en'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(saved)

    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u)
    })
    return () => unsubscribe()
  }, [])

  const t = LANG[lang]

  const handleBattle = async () => {
    if (!toolA || !toolB) {
      setErrorMsg('Please select two different tools.')
      return
    }
    if (toolA === toolB) {
      setErrorMsg('Cannot battle the same tool against itself!')
      return
    }
    if (!user) {
      setErrorMsg('Please log in first.')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setResult(null)

    try {
      const token = await user.getIdToken()
      // Base URL from env or fallback to PROD
      const baseUrl = process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL || 'https://us-central1-aitdl-83536321-fd75b.cloudfunctions.net'
      const url = `${baseUrl}/aiBattle`

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ toolA, toolB })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Battle API failed')
      }

      setResult(data)
    } catch (err) {
      console.error('Battle Error:', err)
      setErrorMsg(err.message || t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px 20px', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h1 style={{ fontSize: 44, marginBottom: 15, background: 'linear-gradient(45deg, var(--accent), #ff9a76)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t.title}
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>{t.desc}</p>
          <p style={{ color: 'var(--text3)', fontSize: 14, marginTop: 15 }}>{t.selectPrompt}</p>
        </div>

        {/* Battle Arena Card */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid var(--border)', 
          borderRadius: 24, 
          padding: '40px 30px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 30
        }}>
          
          <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Tool A Selector */}
            <div style={{ flex: '1 1 250px' }}>
              <label style={{ display: 'block', marginBottom: 10, fontSize: 15, fontWeight: 600, color: 'var(--accent)' }}>🔴 {t.toolA}</label>
              <select 
                value={toolA} 
                onChange={e => setToolA(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: '1px solid rgba(255, 107, 53, 0.3)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text)',
                  fontSize: 16,
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
              >
                <option value="">-- {t.toolA} --</option>
                {tools.map(tool => (
                  <option key={`a-${tool.slug}`} value={tool.slug}>
                    {tool.emoji} {tool.name}
                  </option>
                ))}
              </select>
            </div>

            {/* VS Badge */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 50,
              height: 50,
              background: 'var(--bg-card)',
              border: '2px solid var(--border)',
              borderRadius: '50%',
              fontSize: 18,
              fontWeight: 800,
              color: 'var(--text3)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              VS
            </div>

            {/* Tool B Selector */}
            <div style={{ flex: '1 1 250px' }}>
              <label style={{ display: 'block', marginBottom: 10, fontSize: 15, fontWeight: 600, color: '#3b82f6' }}>🔵 {t.toolB}</label>
              <select 
                value={toolB} 
                onChange={e => setToolB(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text)',
                  fontSize: 16,
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
              >
                 <option value="">-- {t.toolB} --</option>
                {tools.map(tool => (
                  <option key={`b-${tool.slug}`} value={tool.slug}>
                    {tool.emoji} {tool.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div style={{ 
              color: '#ff4444', 
              background: 'rgba(255, 68, 68, 0.1)', 
              padding: '14px', 
              borderRadius: 12, 
              textAlign: 'center', 
              fontSize: 15,
              fontWeight: 500,
              border: '1px solid rgba(255, 68, 68, 0.2)'
            }}>
              {errorMsg}
            </div>
          )}

          {/* Action Button */}
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            {!user ? (
              <Link href="/login" style={{
                display: 'inline-block',
                background: 'var(--bg-subtle)',
                color: 'var(--text)',
                padding: '14px 32px',
                borderRadius: 12,
                textDecoration: 'none',
                fontWeight: 600,
                border: '1px solid var(--border)',
                transition: 'all 0.2s'
              }}>
                {t.loginBtn}
              </Link>
            ) : (
              <button 
                onClick={handleBattle}
                disabled={loading || !toolA || !toolB}
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 40px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: (loading || !toolA || !toolB) ? 'not-allowed' : 'pointer',
                  opacity: (loading || !toolA || !toolB) ? 0.6 : 1,
                  transition: 'all 0.2s',
                  boxShadow: (loading || !toolA || !toolB) ? 'none' : '0 4px 16px rgba(255, 107, 53, 0.4)'
                }}
              >
                {loading ? t.loading : t.battleBtn}
              </button>
            )}
          </div>
        </div>

        {/* AI Results Section */}
        {result && (
          <div style={{
            marginTop: 40,
            padding: 40,
            background: 'var(--bg-card)',
            border: '1px solid var(--accent)',
            borderRadius: 24,
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Subtle background glow */}
            <div style={{
                position: 'absolute',
                top: -50,
                left: -50,
                width: 150,
                height: 150,
                background: 'var(--accent)',
                filter: 'blur(100px)',
                opacity: 0.15,
                zIndex: 0
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 28, marginBottom: 25, textAlign: 'center' }}>
                <span style={{color: 'var(--accent)'}}>{result.toolA}</span>
                <span style={{color: 'var(--text3)', margin: '0 15px', fontSize: 20}}>vs</span> 
                <span style={{color: '#3b82f6'}}>{result.toolB}</span>
              </h2>
              
              <div style={{ 
                lineHeight: 1.8, 
                color: 'var(--text)',
                fontSize: 16,
                background: 'rgba(0,0,0,0.2)',
                padding: 25,
                borderRadius: 16,
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace'
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
