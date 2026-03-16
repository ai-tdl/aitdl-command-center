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
 * @copyright © 2026 AITDL - Artificial Intelligence Technology & Deep Learning
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

import Head from 'next/head'
import { useState, useEffect } from 'react'
import { PageSEO } from '../lib/seo'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ToolCard from '../components/ToolCard'
import NeuralNetwork from '../components/NeuralNetwork'
import TrustBar from '../components/TrustBar'
import { useRouter } from 'next/router'
import RightPanel from '../components/RightPanel'

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
    sub: "Artificial Intelligence Technology & Deep Learning",
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


const SkeletonCard = () => (
  <div style={{
    background: 'var(--card-bg)',
    borderRadius: 24,
    padding: 'var(--card-padding)',
    height: 280,
    animation: 'pulse 1.5s infinite ease-in-out',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>
    <div style={{ height: 40, width: 40, background: 'var(--border)', borderRadius: 12 }} />
    <div style={{ height: 24, width: '60%', background: 'var(--text-tertiary)', borderRadius: 4 }} />
    <div style={{ height: 16, width: '90%', background: 'var(--border)', borderRadius: 4 }} />
    <div style={{ height: 16, width: '70%', background: 'var(--border)', borderRadius: 4 }} />
    <div style={{ marginTop: 'auto', height: 44, width: '100%', background: 'var(--border)', borderRadius: 12 }} />
  </div>
)

export default function Home({ tools }) {
  const [lang, setLang] = useState('en')
  const [uiMode, setUiMode] = useState('directory')
  const [viewMode, setViewMode] = useState('grid')
  const [origin, setOrigin] = useState('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [exam, setExam] = useState('All')
  const [pricing, setPricing] = useState('All')
  const [compareList, setCompareList] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  // TODO: Replace with real Vercel Analytics pageview count via API when available
  const [visitorCount, setVisitorCount] = useState(8506)
  const router = useRouter()
  const t = LANG_TEXT[lang] || LANG_TEXT.en

  useEffect(() => {
    // Initial load from storage
    const savedLang = localStorage.getItem('aitdl_lang') || 'en'
    setLang(savedLang)
    const savedView = localStorage.getItem('aitdl_view') || 'grid'
    setViewMode(savedView)
    const savedUiMode = localStorage.getItem('aitdl_ui_mode') || 'directory'
    setUiMode(savedUiMode)
    const savedOrigin = localStorage.getItem('aitdl_origin') || 'all'
    setOrigin(savedOrigin)

    // Stats
    const savedVisitors = localStorage.getItem('aitdl_visitors')
    // TODO: Replace with real Vercel Analytics pageview count via API when available
    const count = savedVisitors ? parseInt(savedVisitors) + 1 : 8506
    setVisitorCount(count)
    localStorage.setItem('aitdl_visitors', count)

    const handleStorage = () => {
      setLang(localStorage.getItem('aitdl_lang') || 'en')
      setViewMode(localStorage.getItem('aitdl_view') || 'grid')
      setUiMode(localStorage.getItem('aitdl_ui_mode') || 'directory')
      setOrigin(localStorage.getItem('aitdl_origin') || 'all')
    }
    window.addEventListener('storage', handleStorage)
    
    // Initial loading simulation
    const timer = setTimeout(() => setLoading(false), 800)
    
    return () => {
      window.removeEventListener('storage', handleStorage)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    let result = tools || []

    if (origin === 'bharat') {
      result = result.filter(tool => tool.category.includes('india'))
    }
    if (category !== 'All') {
      result = result.filter(tool => tool.category.includes(category))
    }
    if (exam !== 'All') {
      result = result.filter(tool => tool.exam_tags.includes(exam))
    }
    if (pricing !== 'All') {
      result = result.filter(tool => tool.pricing === pricing.toLowerCase())
    }
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.exam_tags.some(tag => tag.toLowerCase().includes(q)) ||
        t.category.some(cat => cat.toLowerCase().includes(q))
      )
    }
    setFiltered(result)
  }, [debouncedSearch, category, exam, pricing, tools, origin])

  // WOW Hero: binary rain + particles + countUp — runs client-side only
  useEffect(() => {
    const rain = document.getElementById('wow-brain')
    const hero = document.getElementById('wow-hero')
    if (!rain || !hero) return

    // Binary rain columns
    for (let i = 0; i < 12; i++) {
      const col = document.createElement('div')
      let str = ''
      for (let j = 0; j < 30; j++) str += (Math.random() > 0.5 ? '1' : '0') + '\n'
      col.textContent = str
      col.style.cssText = [
        'position:absolute',
        'font-family:Courier New,monospace',
        `font-size:${8 + Math.random() * 4}px`,
        'color:#FF6B35',
        'opacity:0',
        'writing-mode:vertical-rl',
        'letter-spacing:4px',
        `animation:wowBRain ${4 + Math.random() * 6}s linear ${Math.random() * 5}s infinite`,
        'user-select:none',
        `left:${Math.random() * 100}%`,
      ].join(';')
      rain.appendChild(col)
    }

    // Floating particles
    const colors = ['#FF6B35', '#E84C1E', '#FF8C5A']
    for (let p = 0; p < 12; p++) {
      const dot = document.createElement('div')
      const size = 3 + Math.random() * 5
      dot.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'pointer-events:none',
        `width:${size}px`,
        `height:${size}px`,
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `background:${colors[Math.floor(Math.random() * colors.length)]}`,
        `animation:wowFloat ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
        'opacity:0.3',
      ].join(';')
      hero.appendChild(dot)
    }

    // CountUp stats
    const countUp = (id, target, duration) => {
      const el = document.getElementById(id)
      if (!el) return
      let val = 0
      const step = target / (duration / 16)
      const timer = setInterval(() => {
        val += step
        if (val >= target) { val = target; clearInterval(timer) }
        el.textContent = Math.floor(val).toLocaleString()
      }, 16)
    }
    const t = setTimeout(() => {
      countUp('ws1', tools.length, 1200)
      countUp('ws2', visitorCount, 1500)
      countUp('ws3', 100, 800)
      countUp('ws4', 22, 600)
    }, 600)
    return () => clearTimeout(t)
  }, [tools, visitorCount])

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
        borderColor: current === val ? 'var(--accent)' : 'var(--border)',
        background: current === val ? 'var(--accent-glow)' : 'var(--card-bg)',
        color: current === val ? 'var(--accent)' : 'var(--text-secondary)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'all 0.3s var(--ease)',
      }}
      className="premium-filter-btn"
    >
      {val}
    </button>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Head>
        <title>AITDL — Best Free AI Tools for JEE, NEET, UPSC Students India</title>
        <meta name="description" content="India's #1 free AI tools directory for students. 100+ verified AI tools for JEE, NEET, UPSC, CBSE. No signup required. Made for Bharat." />
        <link rel="canonical" href="https://aitdl.com" />
        
        <meta property="og:title" content="AITDL — Right AI Tool At The Right Time" />
        <meta property="og:description" content="India's #1 free AI tools platform for students. 100+ tools for JEE, NEET, UPSC." />
        <meta property="og:url" content="https://aitdl.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header lang={lang} setLang={setLang} />

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
        }}>
          {/* All existing content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <NeuralNetwork />
            
            {/* ── WOW Hero ── */}
            <div id="wow-hero" style={{
              position: 'relative',
              minHeight: 520,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '60px 24px',
              overflow: 'hidden',
              marginBottom: 48,
              borderRadius: 24,
            }}>
              {/* Grid overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,107,53,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.04) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                zIndex: 0,
                borderRadius: 24,
                pointerEvents: 'none',
              }} />

              {/* Binary rain container */}
              <div id="wow-brain" style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }} />

              {/* Hero content */}
              <div style={{ position:'relative', zIndex:2, maxWidth:800 }}>

                {/* Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: 'var(--accent)',
                  border: '1px solid rgba(255,107,53,0.25)',
                  padding: '5px 14px',
                  borderRadius: 99,
                  marginBottom: 24,
                  background: 'rgba(255,107,53,0.05)',
                  animation: 'wowBadgePulse 2s ease-in-out infinite',
                }}>
                  🇮🇳 INDIA&apos;S NO. 1 AI COMMAND CENTER
                </div>

                {/* Title */}
                <h1 style={{
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                  marginBottom: 8,
                }}>
                  {uiMode === 'command' ? t.cmdHero : (
                    <>
                      Right AI Tool<br/>
                      <span style={{ color: 'var(--accent)', position: 'relative' }} className="wow-orange">
                        At The Right Time
                      </span>
                    </>
                  )}
                </h1>

                {/* Subtitle */}
                <p style={{
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  margin: '20px auto 32px',
                  maxWidth: 520,
                }}>
                  {t.cmdSub}
                </p>

                {/* Stats */}
                <div style={{ display:'flex', gap:32, justifyContent:'center', marginBottom:36, flexWrap:'wrap' }}>
                  {[
                    { id:'ws1', target: tools.length, suffix:'', label:'AI Tools' },
                    { id:'ws2', target: visitorCount, suffix:'', label:'Students' },
                    { id:'ws3', target: 100, suffix:'%', label:'Free Tools' },
                    { id:'ws4', target: 22, suffix:'', label:'Languages' },
                  ].map(s => (
                    <div key={s.id} style={{ textAlign:'center' }}>
                      <div style={{ fontSize:28, fontWeight:900, color:'var(--text-primary)', fontFamily:"'Arial Black',Arial", lineHeight:1 }}>
                        <span id={s.id}>0</span><span style={{ color:'var(--accent)' }}>{s.suffix}</span>
                      </div>
                      <div style={{ fontSize:9, color:'var(--text-tertiary)', letterSpacing:'2px', fontWeight:600, textTransform:'uppercase', marginTop:2 }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                  <a href="#tools" style={{
                    padding: '14px 32px',
                    background: 'var(--accent)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: '1.5px',
                    border: 'none',
                    borderRadius: 99,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
                    animation: 'wowBtnGlow 2s ease-in-out infinite',
                  }} className="btn-primary-glow">
                    ⚡ {t.explore}
                  </a>
                  <a href="/about" style={{
                    padding: '14px 32px',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: '1px',
                    border: '1.5px solid var(--border)',
                    borderRadius: 99,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.3s',
                  }} className="btn-secondary-border">
                    {t.learn} →
                  </a>
                </div>
              </div>

              {/* Scroll indicator */}
              <div style={{
                position:'absolute', bottom:20, left:'50%',
                transform:'translateX(-50%)',
                display:'flex', flexDirection:'column', alignItems:'center', gap:4,
                opacity:0.4, animation:'wowScrollBounce 1.5s ease-in-out infinite', zIndex:2,
              }}>
                <div style={{ width:1, height:24, background:'linear-gradient(var(--accent), transparent)' }} />
                <span style={{ fontSize:8, letterSpacing:'2px', color:'var(--accent)' }}>SCROLL</span>
              </div>

              {/* Inline keyframes */}
              <style>{`
                @keyframes wowBRain {
                  0%   { opacity:0; top:-20%; }
                  10%  { opacity:0.06; }
                  90%  { opacity:0.06; }
                  100% { opacity:0; top:110%; }
                }
                @keyframes wowFloat {
                  0%,100% { transform:translateY(0) scale(1); opacity:0.4; }
                  50%     { transform:translateY(-20px) scale(1.2); opacity:0.8; }
                }
                @keyframes wowBadgePulse {
                  0%,100% { box-shadow:0 0 0 0 rgba(255,107,53,0.2); }
                  50%     { box-shadow:0 0 0 8px rgba(255,107,53,0); }
                }
                @keyframes wowBtnGlow {
                  0%,100% { box-shadow:0 4px 20px rgba(255,107,53,0.4); }
                  50%     { box-shadow:0 4px 32px rgba(255,107,53,0.6); }
                }
                @keyframes wowScrollBounce {
                  0%,100% { transform:translateX(-50%) translateY(0); }
                  50%     { transform:translateX(-50%) translateY(6px); }
                }
                @keyframes wowUnderline {
                  to { transform:scaleX(1); }
                }
                .wow-orange::after {
                  content:'';
                  position:absolute;
                  bottom:-4px; left:0; right:0;
                  height:3px;
                  background:linear-gradient(90deg, var(--accent), #E84C1E);
                  border-radius:2px;
                  transform:scaleX(0);
                  transform-origin:left;
                  animation:wowUnderline 0.8s ease 0.5s forwards;
                }
              `}</style>
            </div>

            {/* Search Bar */}
            {uiMode === 'directory' && (
              <div style={{ maxWidth: 640, margin: '0 auto 48px', position: 'relative' }}>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t.search}
                  style={{
                    width: '100%', padding: '20px 28px', background: 'var(--search-bg)',
                    backdropFilter: 'blur(10px)', border: '1px solid var(--border)',
                    borderRadius: 16, fontSize: 16, color: 'var(--text-primary)', outline: 'none',
                    transition: 'all 0.3s var(--ease)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  }}
                  className="premium-search"
                />
              </div>
            )}

            {/* Filters */}
            <div className="floating-dock" style={{ maxWidth: 900, margin: '0 auto 48px', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase' }}>{t.category}</div>
                <div style={{ 
                  display: 'flex', 
                  gap: 10, 
                  overflowX: 'auto', 
                  paddingBottom: 8,
                  WebkitOverflowScrolling: 'touch'
                }}>
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      style={{
                        padding: '8px 20px',
                        borderRadius: 12,
                        border: '1px solid',
                        borderColor: category === c ? 'var(--accent)' : 'var(--border)',
                        background: category === c ? 'var(--accent-glow)' : 'var(--card-bg)',
                        color: category === c ? 'var(--accent)' : 'var(--text-secondary)',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        transition: 'all 0.3s var(--ease)',
                      }}
                      className="premium-filter-btn"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase' }}>{t.exam}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {EXAMS.map(e => filterBtn(e, exam, setExam))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase' }}>{t.pricing}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['All','Free','Freemium','Paid'].map(p => filterBtn(p, pricing, setPricing))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Count */}
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 16 }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{filtered.length}</span> {t.found}
            </div>

            {/* Tools Grid / List */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'var(--grid-gap)',
            }}>
              {loading ? (
                Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
              ) : (
                filtered.map(tool => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    viewMode={viewMode}
                    onCompare={handleCompare}
                    isSelected={compareList.some(t => t.id === tool.id)}
                  />
                ))
              )}
            </div>

            {/* Coming Soon */}
            <div style={{ margin: '48px auto', maxWidth: 600, textAlign: 'center', padding: '36px 32px', borderRadius: 16, border: '0.5px solid var(--border)', background: 'var(--bg-secondary)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', border: '0.5px solid var(--accent)', borderRadius: 20, padding: '4px 14px', display: 'inline-block', marginBottom: 16 }}>Coming Soon</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>200+ tools being added</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Curating best AI tools across design, productivity, coding, research — verified for Indian users.
              </p>
            </div>
          </div>

          {/* Right Panel — desktop only */}
          <div style={{
            width: '240px',
            flexShrink: 0,
            position: 'sticky',
            top: '80px',
            marginLeft: '24px',
          }}
          className="lg-block hidden"
          >
            <RightPanel />
          </div>
        </div>
      </main>

      {/* Compare sticky bar */}
      {compareList.length >= 2 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--bg-secondary)', borderTop: '1px solid var(--accent)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 200 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{compareList.length} tools selected</span>
          <button onClick={() => router.push('/compare')} style={{ padding: '8px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Compare Now →</button>
          <button onClick={() => setCompareList([])} style={{ padding: '8px 12px', background: 'transparent', color: 'var(--text-tertiary)', border: '0.5px solid var(--border)', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>Clear</button>
        </div>
      )}

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const data = require('../data/tools.json')
  const tools = data.tools || data
  return { props: { tools } }
}
