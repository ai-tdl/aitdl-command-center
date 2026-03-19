/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @copyright © 2026 All Rights Reserved
 * ============================================
 */

import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const ROWS = [
  { key: 'name',         label: '🏷️ Name' },
  { key: 'description',  label: '📝 Description' },
  { key: 'pricing',      label: '💰 Pricing' },
  { key: 'category',     label: '🗂️ Category' },
  { key: 'exam_tags',    label: '🎓 Exams' },
  { key: 'india_score',  label: '🇮🇳 India Score' },
  { key: 'origin',       label: '🌍 Origin' },
  { key: 'url',          label: '🔗 Link' },
]

const PRICING_COLOR = {
  free:     '#22C55E',
  freemium: '#F59E0B',
  paid:     '#EF4444',
}

export default function Compare() {
  const [lang, setLang] = useState('en')
  const [tools, setTools] = useState([])

  useEffect(() => {
    // Read lang
    const savedLang = localStorage.getItem('aitdl_lang') || 'en'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(savedLang)
    // Read compare list saved by index.js
    try {
      const raw = localStorage.getItem('aitdl_compare')
      if (raw) setTools(JSON.parse(raw))
    } catch {}
  }, [])

  const renderCell = (tool, key) => {
    const val = tool[key]
    if (key === 'url') {
      return (
        <a href={val} target="_blank" rel="noopener noreferrer" style={{
          color: 'var(--accent)', fontWeight: 700, fontSize: 12,
          textDecoration: 'none', wordBreak: 'break-all',
        }}>
          Open ↗
        </a>
      )
    }
    if (key === 'pricing') {
      return (
        <span style={{
          display: 'inline-block',
          padding: '3px 12px',
          borderRadius: 99,
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          background: `${PRICING_COLOR[val] || '#888'}22`,
          color: PRICING_COLOR[val] || 'var(--text-secondary)',
          border: `1px solid ${PRICING_COLOR[val] || '#888'}44`,
        }}>{val}</span>
      )
    }
    if (key === 'india_score') {
      const score = Number(val) || 0
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: 'var(--accent)' }}>{score}</div>
          <div style={{ height: 6, width: 80, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${score}%`, background: 'var(--accent)', borderRadius: 99 }} />
          </div>
        </div>
      )
    }
    if (Array.isArray(val)) {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {val.map(v => (
            <span key={v} style={{
              padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
              background: 'var(--accent-glow)', color: 'var(--accent)',
              border: '1px solid var(--accent)',
            }}>{v}</span>
          ))}
        </div>
      )
    }
    return <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{val || '—'}</span>
  }

  return (
    <>
      <Head>
        <title>Compare AI Tools — AITDL</title>
        <meta name="description" content="Compare AI tools side by side — pricing, categories, India score and more." />
      </Head>
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Header lang={lang} setLang={setLang} />
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 20px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              display: 'inline-block', fontSize: 10, fontWeight: 700,
              letterSpacing: '2px', color: 'var(--accent)',
              border: '1px solid rgba(255,107,53,0.25)',
              padding: '4px 14px', borderRadius: 99,
              background: 'rgba(255,107,53,0.05)', marginBottom: 16,
            }}>⚡ SIDE BY SIDE</div>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, marginBottom: 12 }}>AI Tool Comparison</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
              Comparing {tools.length} tool{tools.length !== 1 ? 's' : ''} · <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>← Add more</Link>
            </p>
          </div>

          {/* Empty state */}
          {tools.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '80px 20px',
              border: '1.5px dashed var(--border)',
              borderRadius: 20,
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No tools selected</div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Go back to the home page and select 2–3 tools to compare.</p>
              <Link href="/" style={{
                display: 'inline-block', padding: '12px 32px',
                background: 'var(--accent)', color: '#fff',
                borderRadius: 99, textDecoration: 'none',
                fontWeight: 700, fontSize: 14,
              }}>← Browse Tools</Link>
            </div>
          )}

          {/* Compare table */}
          {tools.length >= 2 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th style={{
                      width: 140, textAlign: 'left', padding: '16px 20px',
                      fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      borderBottom: '1px solid var(--border)',
                    }}>Feature</th>
                    {tools.map((tool, i) => (
                      <th key={tool.id || i} style={{
                        padding: '20px 16px', textAlign: 'center',
                        borderBottom: '1px solid var(--border)',
                        borderLeft: '1px solid var(--border)',
                        background: i === 0 ? 'rgba(255,107,53,0.04)' : 'var(--bg-secondary)',
                        borderRadius: i === 0 ? '16px 0 0 0' : i === tools.length - 1 ? '0 16px 0 0' : 0,
                      }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>{tool.icon || '🤖'}</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{tool.name}</div>
                        {i === 0 && (
                          <div style={{
                            display: 'inline-block', padding: '2px 8px',
                            borderRadius: 6, fontSize: 9, fontWeight: 700,
                            background: 'var(--accent)', color: '#fff',
                            letterSpacing: '0.05em',
                          }}>TOP PICK</div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, ri) => (
                    <tr key={row.key} style={{ background: ri % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                      <td style={{
                        padding: '14px 20px',
                        fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)',
                        borderBottom: '1px solid var(--border)',
                        whiteSpace: 'nowrap',
                      }}>{row.label}</td>
                      {tools.map((tool, i) => (
                        <td key={tool.id || i} style={{
                          padding: '14px 16px',
                          textAlign: 'center',
                          borderBottom: '1px solid var(--border)',
                          borderLeft: '1px solid var(--border)',
                          background: i === 0 ? 'rgba(255,107,53,0.025)' : 'transparent',
                          verticalAlign: 'middle',
                        }}>
                          {renderCell(tool, row.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Action buttons */}
          {tools.length >= 2 && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
              <Link href="/" style={{
                padding: '12px 28px', background: 'var(--accent)', color: '#fff',
                borderRadius: 99, textDecoration: 'none', fontWeight: 700, fontSize: 13,
              }}>← Change Selection</Link>
              <button onClick={() => {
                localStorage.removeItem('aitdl_compare')
                setTools([])
              }} style={{
                padding: '12px 28px', background: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 99, cursor: 'pointer', fontSize: 13, fontWeight: 600,
              }}>🗑️ Clear</button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}
