/**
 * AITDL — India's AI Command Center
 * Author: Jawahar Ramkripal Mallah
 * © 2025 All Rights Reserved
 */

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ToolCard from '../components/ToolCard'
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

export default function Home({ tools }) {
  const [lang, setLang] = useState('en')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [exam, setExam] = useState('All')
  const [pricing, setPricing] = useState('All')
  const [compareList, setCompareList] = useState([])
  const [filtered, setFiltered] = useState(tools)
  const router = useRouter()
  const t = LANG_TEXT[lang]

  useEffect(() => {
    const saved = localStorage
      .getItem('aitdl_lang') || 'en'
    setLang(saved)
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
        padding: '6px 14px',
        borderRadius: 20,
        border: current === val
          ? '1.5px solid var(--accent)'
          : '0.5px solid var(--border)',
        background: current === val
          ? 'var(--accent)'
          : 'var(--bg3)',
        color: current === val
          ? '#fff'
          : 'var(--text2)',
        fontSize: 12,
        fontWeight: current === val ? 600 : 400,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
      {val === 'india' 
        ? '🇮🇳 Made in India'
        : val}
    </button>
  )

  return (
    <>
      <Head>
        <title>
          AITDL — India's AI Command Center | 
          100+ Free AI Tools for JEE NEET UPSC
        </title>
        <meta name="description"
          content="India's #1 AI tools platform. 
          100+ verified AI tools for JEE, NEET, 
          UPSC students. Hindi support. 
          Made in India AI section. 100% free."/>
        <meta property="og:title"
          content="AITDL — India's AI Command Center"/>
        <meta property="og:description"
          content="100+ free AI tools for 
          Indian students. JEE, NEET, UPSC filters.
          Hindi support. Built by 
          Jawahar Ramkripal Mallah."/>
        <meta property="og:url"
          content="https://aitdl.com"/>
        <meta property="og:type"
          content="website"/>
      </Head>

      <Header lang={lang} setLang={setLang}/>

      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '24px 16px',
      }}>
        {/* Hero */}
        <div style={{
          textAlign: 'center',
          padding: '40px 0 32px',
        }}>
          <div style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            border: '0.5px solid var(--accent)',
            borderRadius: 20,
            padding: '4px 14px',
            marginBottom: 16,
          }}>
            INDIA'S #1 AI TOOLS PLATFORM
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 52px)',
            fontWeight: 800,
            color: 'var(--text)',
            lineHeight: 1.2,
            marginBottom: 12,
          }}>
            {t.hero}
          </h1>
          <p style={{
            fontSize: 16,
            color: 'var(--text2)',
            marginBottom: 32,
          }}>
            {t.sub}
          </p>

          {/* Trust bar */}
          <div style={{
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: 12,
            color: 'var(--text3)',
            marginBottom: 32,
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

          {/* Search */}
          <div style={{
            maxWidth: 600,
            margin: '0 auto',
            position: 'relative',
          }}>
            <input
              type="text"
              value={search}
              onChange={e => 
                setSearch(e.target.value)
              }
              placeholder={t.search}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: 'var(--bg2)',
                border: '0.5px solid var(--border)',
                borderRadius: 12,
                fontSize: 14,
                color: 'var(--text)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Filters */}
        <div style={{
          background: 'var(--bg2)',
          border: '0.5px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
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
    </>
  )
}

export async function getStaticProps() {
  const data = require('../data/tools.json')
  const tools = data.tools || data
  return { props: { tools } }
}
