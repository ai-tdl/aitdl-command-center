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
 * Updated: 2026-03-14 - Final UI Restoration Verified
 */

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ToolCard from '../components/ToolCard'
import NeuralNetwork from '../components/NeuralNetwork'
import { useRouter } from 'next/router'

const CATEGORIES = [
  'All','study','writing','coding',
  'productivity','research','maths',
  'india','image','video','career'
]

const EXAMS = [
  'All','JEE','NEET','UPSC',
  'SSC','CBSE','Boards'
]

const LANG_TEXT = {
  en: {
    hero: "India's No. 1 AI Command Center",
    sub: 'Empowering 1.4 Billion minds',
    search: 'Search 100+ AI tools...',
    category: 'Category',
    exam: 'Target Exam',
    pricing: 'Pricing',
    found: 'tools found',
    all: 'All',
    free: 'Free',
    freemium: 'Freemium',
    paid: 'Paid',
    stats: {
      tools: 'AI Tools',
      visited: 'Students Visited',
      free: 'Free',
      india: 'India First'
    },
    cmdHero: "EMPOWERING INDIA'S FUTURE WITH ADVANCED AI",
    cmdSub: "Command, Control, and Scale your AI potential with India's leading AI Command Center.",
    explore: 'EXPLORE PLATFORM',
    learn: 'LEARN MORE',
    originAll: 'All AI',
    originBharat: 'Bharat AI',
    originGlobal: 'Global AI'
  },
  hi: {
    hero: 'भारत का No. 1 AI कमांड सेंटर',
    sub: '1.4 अरब दिमागों को सशक्त बनाना',
    search: '100+ AI टूल्स खोजें...',
    category: 'श्रेणी',
    exam: 'परीक्षा',
    pricing: 'मूल्य',
    found: 'टूल्स मिले',
    all: 'सभी',
    free: 'मुफ्त',
    freemium: 'फ्रीमियम',
    paid: 'पेड',
    stats: {
      tools: 'AI Tools',
      visited: 'छात्र आए',
      free: 'मुफ्त',
      india: 'भारत प्रथम'
    },
    cmdHero: 'उन्नत AI के साथ भारत के भविष्य को सशक्त बनाना',
    cmdSub: 'भारत के अग्रणी AI कमांड सेंटर के साथ अपनी AI क्षमता को कमांड, कंट्रोल और स्केल करें।',
    explore: 'प्लेटफॉर्म देखें',
    learn: 'अधिक जानें',
    originAll: 'सभी AI',
    originBharat: 'भारत AI',
    originGlobal: 'वैश्विक AI'
  },
  sa: {
    hero: 'भारतस्य No. 1 AI कमांड केंद्रम्',
    sub: '१.४ अरब मेधाविनाम् शक्तिकरणम्',
    search: '100+ AI उपकरणानि अन्विष्यतु...',
    category: 'वर्गः',
    exam: 'परीक्षा',
    pricing: 'मूल्यम्',
    found: 'उपकरणानि',
    all: 'सर्वे',
    free: 'निःशुल्कम्',
    freemium: 'फ्रीमियम्',
    paid: 'सशुल्कम्',
    stats: {
      tools: 'AI उपकरणानि',
      visited: 'छात्राः आगताः',
      free: 'निःशुल्कम्',
      india: 'भारतम् प्रथमम्'
    },
    cmdHero: 'प्रगत-AI-तन्त्रेण भारतस्य भविष्यं सक्षमीकरणम्',
    cmdSub: 'भारतस्य प्रमुख-एआइ-आदेशकेन्द्रेण सह स्वकीय-एआइ-क्षमतायाः आदेशं, नियन्त्रणं, मापनं च कुर्वन्तु।',
    explore: 'मञ्चं अन्वेषयन्तु',
    learn: 'अधिकं जानन्तु',
    originAll: 'सर्वाणि AI',
    originBharat: 'भारत AI',
    originGlobal: 'वैश्विक AI'
  }
}


export default function Home({ tools }) {
  const [lang, setLang] = useState('en')
  const [viewMode, setViewMode] = useState('directory')
  const [origin, setOrigin] = useState('all')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [exam, setExam] = useState('All')
  const [pricing, setPricing] = useState('All')
  const [compareList, setCompareList] = useState([])
  const [filtered, setFiltered] = useState(tools)
  const [visitorCount, setVisitorCount] = useState(8506)
  const router = useRouter()
  const t = LANG_TEXT[lang]

  useEffect(() => {
    const savedLang = localStorage
      .getItem('aitdl_lang') || 'en'
    setLang(savedLang)

    const savedMode = localStorage
      .getItem('aitdl_viewmode') || 'directory'
    setViewMode(savedMode)

    const savedOrigin = localStorage
      .getItem('aitdl_origin') || 'all'
    setOrigin(savedOrigin)

    const savedVisitors = localStorage
      .getItem('aitdl_visitors')
    const count = savedVisitors 
      ? parseInt(savedVisitors) + 1 
      : 8506
    setVisitorCount(count)
    localStorage.setItem(
      'aitdl_visitors', count
    )

    // Listener for viewMode changes from Header
    const handleStorage = () => {
      const mode = localStorage.getItem('aitdl_viewmode') || 'directory'
      setViewMode(mode)
      const ori = localStorage.getItem('aitdl_origin') || 'all'
      setOrigin(ori)
      const l = localStorage.getItem('aitdl_lang') || 'en'
      setLang(l)
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    let result = tools

    if (origin === 'bharat') {
      result = result.filter(tool =>
        tool.category.includes('india')
      )
    }

    if (category !== 'All') {
      result = result.filter(tool =>
        tool.category.includes(category)
      )
    }
    if (exam !== 'All') {
      result = result.filter(tool =>
        tool.exam_tags.includes(exam)
      )
    }
    if (pricing !== 'All') {
      result = result.filter(tool =>
        tool.pricing === pricing.toLowerCase()
      )
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(tool =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.exam_tags.some(tag =>
          tag.toLowerCase().includes(q)
        ) ||
        tool.category.some(cat =>
          cat.toLowerCase().includes(q)
        )
      )
    }

    setFiltered(result)
  }, [search, category, exam, pricing, tools, origin])

  const handleCompare = (tool) => {
    setCompareList(prev => {
      if (prev.find(t => t.id === tool.id)) {
        return prev.filter(t => t.id !== tool.id)
      }
      if (prev.length >= 3) return prev
      return [...prev, tool]
    })
  }

  const filterBtn = (val, current, setter) => (
    <button
      key={val}
      onClick={() => setter(val)}
      style={{
        padding: '8px 20px',
        borderRadius: 12,
        border: '1px solid',
        borderColor: current === val
          ? 'var(--accent)'
          : 'rgba(255,255,255,0.1)',
        background: current === val
          ? 'rgba(255,107,53,0.1)'
          : 'rgba(255,255,255,0.03)',
        color: current === val
          ? 'var(--accent)'
          : 'var(--text2)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'all 0.3s var(--ease)',
      }}
      className="premium-filter-btn"
    >
      {val === 'india' 
        ? '🇮🇳 Made in India'
        : val}
    </button>
  )

  return (
    <div className="layout">
      <Head>
        <title>AITDL — Artificial Intelligence Technology & Deep Learning</title>
        <meta name="description" content="AITDL — Artificial Intelligence Technology & Deep Learning. India's #1 AI Tools Platform for students, developers & professionals." />
        <meta property="og:title" content="AITDL — Artificial Intelligence Technology & Deep Learning" />
        <meta property="og:description" content="India's #1 AI Tools Platform for students, developers & professionals." />
      </Head>

      <NeuralNetwork />
      <Header lang={lang} setLang={setLang}/>

      <main style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 16px',
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          padding: '120px 16px 60px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Ambient Glows */}
          <div className="ambient-glow" style={{ top: '-10%', left: '30%' }} />
          <div className="ambient-glow" style={{ top: '20%', right: '20%', background: 'radial-gradient(circle, #00B4D8 0%, transparent 70%)', opacity: 0.1 }} />

          {/* Badge */}
          <div style={{
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: 'var(--accent)',
            background: 'rgba(255,107,53,0.08)',
            border: '1px solid rgba(255,107,53,0.2)',
            borderRadius: 30,
            padding: '6px 20px',
            marginBottom: 32,
            boxShadow: '0 4px 20px rgba(255,107,53,0.1)',
            animation: 'slide-up 0.4s var(--ease)',
          }}>
            INDIA'S #1 AI TOOLS PLATFORM
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: viewMode === 'command' 
              ? 'clamp(48px, 10vw, 112px)' 
              : 'clamp(42px, 10vw, 84px)',
            fontWeight: 950,
            lineHeight: 0.95,
            marginBottom: 24,
            letterSpacing: '-0.05em',
            animation: 'slide-up 0.8s var(--ease) 0.1s both',
          }}>
            {viewMode === 'command' ? (
              <span className="pulse-glow" style={{ 
                color: 'var(--text)', 
                filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.15))',
                background: 'linear-gradient(to bottom, #fff, #888)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {t.cmdHero}
              </span>
            ) : (
              <>
                <span style={{ color: 'var(--text)', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>
                  Right AI Tool
                </span>
                <br/>
                <span style={{ 
                  color: 'var(--accent)',
                  background: 'linear-gradient(to bottom, #FF8E64, #FF6B35)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 12px rgba(255,107,53,0.2))'
                }}>
                  At The Right Time
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: viewMode === 'command' ? 20 : 18,
            color: 'var(--text2)',
            marginBottom: viewMode === 'command' ? 48 : 48,
            maxWidth: viewMode === 'command' ? 700 : 540,
            margin: '0 auto 48px',
            lineHeight: 1.6,
            animation: 'slide-up 0.5s var(--ease) 0.2s both',
          }}>
            {viewMode === 'command' ? t.cmdSub : (
              <>JEE, NEET, UPSC — the definitive collection of free AI tools for India's future leaders.</>
            )}
          </p>

          {/* Command Mode Buttons */}
          {viewMode === 'command' && (
            <div style={{
              display: 'flex',
              gap: 20,
              justifyContent: 'center',
              marginBottom: 64,
              animation: 'slide-up 0.8s var(--ease) 0.3s both',
            }}>
              <button style={{
                padding: '20px 48px',
                background: 'linear-gradient(135deg, #FF8E64, #FF6B35)',
                color: '#fff',
                border: 'none',
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(255,107,53,0.4)',
                transition: 'all 0.4s var(--ease)',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                animation: 'float 4s infinite ease-in-out',
              }} className="btn-primary-glow">
                {t.explore} 🚀
              </button>
              <button style={{
                padding: '20px 48px',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.4s var(--ease)',
                textTransform: 'uppercase',
              }} className="btn-secondary-border">
                {t.learn}
              </button>
            </div>
          )}

          {/* Stats Section */}
          <div style={{
            display: "grid",
            gridTemplateColumns: 
              "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "clamp(8px, 2vw, 16px)",
            margin: "24px auto",
            maxWidth: 640,
            width: "100%",
            padding: "0 16px",
            boxSizing: "border-box",
          }}>
            {[
              { num: '100+', label: t.stats.tools },
              { num: visitorCount.toLocaleString(lang === 'hi' ? 'en-IN' : 'en-US'), 
                label: t.stats.visited },
              { num: '100%', label: t.stats.free },
              { num: '🇮🇳', label: t.stats.india },
            ].map((s, idx) => (
              <div key={idx} style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                padding: "clamp(12px, 3vw, 20px)",
                textAlign: "center",
                border: "0.5px solid rgba(255,255,255,0.08)",
                minWidth: 0,
                animation: `slide-up 0.5s var(--ease) ${0.4 + idx * 0.1}s both`,
              }}>
                <div style={{
                  fontSize: "clamp(18px, 4vw, 28px)",
                  fontWeight: 700,
                  color: "#FF6B35",
                  lineHeight: 1.2,
                  fontFamily: 'Outfit',
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontSize: "clamp(10px, 2vw, 12px)",
                  color: "rgba(240,237,232,0.4)",
                  marginTop: 4,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Bar Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
          padding: '16px 24px',
          background: 'var(--bg2)',
          border: '0.5px solid var(--border)',
          borderRadius: 12,
          marginBottom: 32,
          fontSize: 12,
          color: 'var(--text2)',
        }}>
          {[
            '✓ AITDL Verified Tools',
            '🔒 No signup required',
            '🆓 Free tools first',
            '🇮🇳 Made for India',
          ].map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {/* Search Bar - Premium Glow Input */}
        {viewMode === 'directory' && (
          <div style={{
            maxWidth: 640,
            margin: '0 auto 48px',
            position: 'relative',
            animation: 'slide-up 0.5s var(--ease) 0.3s both',
          }}>
            <div style={{
              position: 'absolute',
              inset: -1,
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
              borderRadius: 18,
              opacity: 0.15,
              pointerEvents: 'none',
            }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.search}
              style={{
                width: '100%',
                padding: '20px 28px',
                background: 'rgba(13, 13, 21, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                fontSize: 16,
                color: 'var(--text)',
                outline: 'none',
                transition: 'all 0.3s var(--ease)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
              className="premium-search"
            />
          </div>
        )}

        {/* Filter Section - Floating Dock */}
        <div className="floating-dock" style={{
          maxWidth: 900,
          margin: '0 auto 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          padding: 24,
          animation: 'slide-up 0.5s var(--ease) 0.4s both',
        }}>
          {/* Category */}
          <div>
            <div style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: 'var(--text3)',
              marginBottom: 12,
              paddingLeft: 4,
            }}>
              {t.category.toUpperCase()}
            </div>
            <div style={{
              display: 'flex',
              gap: 10,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: 4,
              paddingLeft: 4,
            }}>
              {CATEGORIES.map(c => 
                filterBtn(c, category, setCategory)
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {/* Exam */}
            <div>
              <div style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: 'var(--text3)',
                marginBottom: 12,
                paddingLeft: 4,
              }}>
                {t.exam.toUpperCase()}
              </div>
              <div style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                paddingLeft: 4,
              }}>
                {EXAMS.map(e => 
                  filterBtn(e, exam, setExam)
                )}
              </div>
            </div>

            {/* Pricing */}
            <div>
              <div style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: 'var(--text3)',
                marginBottom: 12,
                paddingLeft: 4,
              }}>
                {t.pricing.toUpperCase()}
              </div>
              <div style={{
                display: 'flex',
                gap: 8,
                paddingLeft: 4,
              }}>
                {['All','Free','Freemium','Paid']
                  .map(p => 
                  filterBtn(p, pricing, setPricing)
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div style={{
          fontSize: 13,
          color: 'var(--text3)',
          marginBottom: 16,
        }}>
          <span style={{
            color: 'var(--accent)',
            fontWeight: 700,
          }}>
            {filtered.length}
          </span> {t.found}
        </div>

        {/* Tools Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 
            'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {filtered.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onCompare={handleCompare}
              isSelected={compareList
                .some(t => t.id === tool.id)}
            />
          ))}
        </div>

        {/* Coming soon section */}
        <div style={{
          margin: '48px auto',
          maxWidth: 600,
          textAlign: 'center',
          padding: '36px 32px',
          borderRadius: 16,
          border: '0.5px solid var(--border)',
          background: 'var(--bg2)',
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            border: '0.5px solid var(--accent)',
            borderRadius: 20,
            padding: '4px 14px',
            display: 'inline-block',
            marginBottom: 16,
          }}>
            Coming Soon
          </div>
          <h3 style={{
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--text)',
            marginBottom: 10,
          }}>
            200+ tools being added
          </h3>
          <p style={{
            fontSize: 13,
            color: 'var(--text2)',
            lineHeight: 1.7,
          }}>
            Curating best AI tools across 
            design, productivity, coding, 
            research — verified for Indian users.
          </p>
        </div>
      </main>

      {/* Compare sticky bar */}
      {compareList.length >= 2 && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--bg2)',
          borderTop: '1px solid var(--accent)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          zIndex: 200,
        }}>
          <span style={{
            fontSize: 13,
            color: 'var(--text2)',
          }}>
            {compareList.length} tools selected
          </span>
          <button
            onClick={() => 
              router.push('/compare')
            }
            style={{
              padding: '8px 20px',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}>
            Compare Now →
          </button>
          <button
            onClick={() => setCompareList([])}
            style={{
              padding: '8px 12px',
              background: 'transparent',
              color: 'var(--text3)',
              border: '0.5px solid var(--border)',
              borderRadius: 8,
              fontSize: 12,
              cursor: 'pointer',
            }}>
            Clear
          </button>
        </div>
      )}

      <Footer/>
    </div>
  )
}

export async function getStaticProps() {
  const data = require('../data/tools.json')
  const tools = data.tools || data
  return { props: { tools } }
}
