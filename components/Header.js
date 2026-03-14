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

import Link from 'next/link'
import { useState, useEffect } from 'react'

const LANG = {
  en: {
    battle: 'AI Battle',
    compare: 'Compare',
    about: 'About',
  },
  hi: {
    battle: 'AI युद्ध',
    compare: 'तुलना',
    about: 'हमारे बारे में',
  },
  sa: {
    battle: 'AI युद्धम्',
    compare: 'तुलना',
    about: 'अस्माकं विषये',
  }
}

export default function Header({ 
  lang, setLang 
}) {
  const [theme, setTheme] = useState('dark')
  const [viewMode, setViewMode] = useState('directory')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage
      .getItem('aitdl_theme') || 'dark'
    setTheme(saved)
    const mode = localStorage
      .getItem('aitdl_viewmode') || 'directory'
    setViewMode(mode)
  }, [])

  const toggleViewMode = () => {
    const next = viewMode === 'directory' ? 'command' : 'directory'
    setViewMode(next)
    localStorage.setItem('aitdl_viewmode', next)
    window.dispatchEvent(new Event('storage'))
  }

  const changeTheme = (t) => {
    setTheme(t)
    localStorage.setItem('aitdl_theme', t)
    document.documentElement
      .setAttribute('data-theme', t)
  }

  const t = LANG[lang]

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(3, 3, 6, 0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '0 24px',
      transition: 'all 0.3s var(--ease)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          textDecoration: 'none',
        }}>
          <div style={{
            width: 36, height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #FF8E64, #FF6B35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 4px 12px rgba(255,107,53,0.3)',
          }}>⚡</div>
          <div>
            <div style={{
              fontSize: 18,
              fontWeight: 900,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              fontFamily: 'Outfit',
              lineHeight: 1,
            }}>AITDL<span style={{ color: 'var(--accent)' }}>.</span></div>
            <div style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'var(--text3)',
              letterSpacing: '0.15em',
              marginTop: 2,
            }}>COMMAND CENTER</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          {/* Language toggle */}
          <div style={{
            display: 'flex',
            background: 'var(--bg3)',
            borderRadius: 20,
            padding: 3,
            gap: 2,
            border: '0.5px solid var(--border)',
          }}>
            {['en','hi','sa'].map(l => (
              <button key={l}
                onClick={() => {
                  setLang(l)
                  localStorage.setItem(
                    'aitdl_lang', l
                  )
                }}
                style={{
                  padding: '5px 12px',
                  borderRadius: 16,
                  border: 'none',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: lang === l 
                    ? 'var(--accent)' 
                    : 'transparent',
                  color: lang === l 
                    ? '#fff' 
                    : 'var(--text3)',
                }}>
                {l === 'en' ? 'EN' 
                  : l === 'hi' ? 'हि' 
                  : 'सं'}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <div style={{
            display: 'flex',
            background: 'var(--bg3)',
            borderRadius: 12,
            padding: 2,
            gap: 2,
            border: '1px solid var(--border)',
          }}>
            {['dark','light','glass','midnight'].map(th => (
              <button key={th}
                onClick={() => changeTheme(th)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 10,
                  border: 'none',
                  fontSize: 10,
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s var(--ease)',
                  background: theme === th 
                    ? 'var(--accent)' 
                    : 'transparent',
                  color: theme === th 
                    ? '#fff' 
                    : 'var(--text3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                {th === 'midnight' ? '🌌' : th === 'glass' ? '💎' : th.charAt(0).toUpperCase() + th.slice(1)}
              </button>
            ))}
          </div>

          {/* Nav links */}
          <Link href="/ai-battle" style={{
            fontSize: 13,
            color: 'var(--text2)',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 8,
            border: '0.5px solid var(--border)',
          }}>
            ⚔️ {t.battle}
          </Link>

          <Link href="/compare" style={{
            fontSize: 13,
            color: 'var(--text2)',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 8,
            border: '0.5px solid var(--border)',
          }}>
            🔄 {t.compare}
          </Link>

          {/* View mode toggle */}
          <button 
            onClick={toggleViewMode}
            style={{
              padding: '8px 16px',
              borderRadius: 12,
              border: '1px solid var(--accent)',
              background: viewMode === 'command' ? 'var(--accent)' : 'transparent',
              color: viewMode === 'command' ? '#fff' : 'var(--accent)',
              fontSize: 11,
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'Outfit',
              letterSpacing: '0.05em',
              transition: 'all 0.3s var(--ease)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
            {viewMode === 'command' ? '🚀 COMMAND' : '🔎 TOOLS'}
          </button>

          {/* Login / Auth - Simulated as per image */}
          <div style={{
            padding: '8px 24px',
            background: 'linear-gradient(to bottom, #FF8E64, #FF6B35)',
            color: '#fff',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255,107,53,0.3)',
            animation: 'float 4s infinite ease-in-out',
          }}>
            {viewMode === 'command' ? 'Sign Up' : 'Log In'}
          </div>
        </nav>
      </div>
    </header>
  )
}
