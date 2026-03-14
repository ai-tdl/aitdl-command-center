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
    hero: 'India\'s AI Command Center',
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
  },
  hi: {
    hero: 'भारत का AI कमांड सेंटर',
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
  },
  sa: {
    hero: 'भारतस्य AI कमांड केंद्रम्',
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
  }
}

// Neural network background component
const NeuralBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('neural-bg')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes = Array.from({length: 50}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 3 + 1,
      color: Math.random() > 0.5 
        ? '#FF6B35' : '#00B4D8'
    }))

    const animate = () => {
      ctx.clearRect(0, 0, 
        canvas.width, canvas.height)

      // Draw connections
      nodes.forEach((n, i) => {
        nodes.slice(i+1).forEach(m => {
          const dist = Math.hypot(
            n.x-m.x, n.y-m.y
          )
          if (dist < 150) {
            ctx.beginPath()
            ctx.strokeStyle = 
              `rgba(255,107,53,${
                0.15 * (1 - dist/150)
              })`
            ctx.lineWidth = 0.5
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI*2)
        ctx.fillStyle = n.color + '80'
        ctx.fill()

        n.x += n.vx
        n.y += n.vy

        if (n.x < 0 || n.x > canvas.width) 
          n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) 
          n.vy *= -1
      })

      requestAnimationFrame(animate)
    }
    animate()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => 
      window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      id="neural-bg"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default function Home({ tools }) {
  const [lang, setLang] = useState('en')
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
    const saved = localStorage
      .getItem('aitdl_lang') || 'en'
    setLang(saved)

    const savedVisitors = localStorage
      .getItem('aitdl_visitors')
    const count = savedVisitors 
      ? parseInt(savedVisitors) + 1 
      : 8506
    setVisitorCount(count)
    localStorage.setItem(
      'aitdl_visitors', count
    )
  }, [])

  useEffect(() => {
    let result = tools

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
  }, [search, category, exam, pricing, tools])

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
        padding: '6px 16px',
        borderRadius: 20,
        border: current === val
          ? '1.5px solid var(--accent)'
          : '0.5px solid var(--border)',
        background: current === val
          ? 'var(--accent)'
          : 'rgba(255,255,255,0.05)',
        color: current === val
          ? '#fff'
          : 'rgba(240,237,232,0.75)',
        fontSize: 12,
        fontWeight: current === val ? 700 : 400,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'all 0.15s ease',
      }}>
      {val === 'india' 
        ? '🇮🇳 Made in India'
        : val}
    </button>
  )

  return (
    <div className="layout">
      <Head>
        <title>AITDL — Right AI Tool At The Right Time</title>
        <meta name="description" content="India's AI Command Center — Explore 100+ AI tools for every need." />
      </Head>

      <NeuralBackground />
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
          padding: '80px 16px 40px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--accent)',
            border: '1px solid var(--accent)',
            borderRadius: 20,
            padding: '5px 16px',
            marginBottom: 24,
          }}>
            INDIA'S #1 AI TOOLS PLATFORM
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: 'clamp(36px, 8vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            <span style={{ color: 'var(--text)' }}>
              Right AI Tool
            </span>
            <br/>
            <span style={{ color: 'var(--accent)' }}>
              At The Right Time
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 16,
            color: 'var(--text2)',
            marginBottom: 40,
            maxWidth: 500,
            margin: '0 auto 40px',
          }}>
            JEE, NEET, UPSC — best free AI tools
            for every exam, in one place.
          </p>

          {/* Stats Section */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(16px, 4vw, 48px)',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            padding: '0 16px',
            marginBottom: 48,
          }}>
            {[
              { num: '100+', label: t.found.split(' ')[0] + ' Tools' },
              { num: visitorCount.toLocaleString('en-IN'), 
                label: 'Students Visited' },
              { num: '100%', label: 'Free' },
              { num: '🇮🇳', label: 'India First' },
            ].map(s => (
              <div key={s.label} style={{
                textAlign: 'center',
                flexShrink: 0,
                background: 'var(--bg2)',
                border: '0.5px solid var(--border)',
                borderRadius: 12,
                padding: '16px 24px',
                minWidth: 100,
              }}>
                <div style={{
                  fontSize: 'clamp(20px, 5vw, 32px)',
                  fontWeight: 800,
                  color: 'var(--accent)',
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'var(--text3)',
                  marginTop: 4,
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

        {/* Search Bar - DARK Mode Style */}
        <div style={{
          maxWidth: 600,
          margin: '0 auto 32px',
          position: 'relative',
        }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.search}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: '#0D0D15',
              border: '1px solid var(--border)',
              borderRadius: 12,
              fontSize: 14,
              color: 'var(--text)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        {/* Filter Section */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
          {/* Category */}
          <div>
            <div style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--text3)',
              marginBottom: 8,
            }}>
              {t.category.toUpperCase()}
            </div>
            <div style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: 4,
            }}>
              {CATEGORIES.map(c => 
                filterBtn(c, category, setCategory)
              )}
            </div>
          </div>

          {/* Exam */}
          <div>
            <div style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--text3)',
              marginBottom: 8,
            }}>
              {t.exam.toUpperCase()}
            </div>
            <div style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}>
              {EXAMS.map(e => 
                filterBtn(e, exam, setExam)
              )}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <div style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--text3)',
              marginBottom: 8,
            }}>
              {t.pricing.toUpperCase()}
            </div>
            <div style={{
              display: 'flex',
              gap: 8,
            }}>
              {['All','Free','Freemium','Paid']
                .map(p => 
                filterBtn(p, pricing, setPricing)
              )}
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
