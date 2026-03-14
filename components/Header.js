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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage
      .getItem('aitdl_theme') || 'dark'
    setTheme(saved)
  }, [])

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
      background: 'var(--bg)',
      borderBottom: '0.5px solid var(--border)',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
        }}>
          <div style={{
            width: 32, height: 32,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}>⚡</div>
          <div>
            <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '0.05em',
            }}>AITDL</div>
            <div style={{
              fontSize: 9,
              color: 'var(--text3)',
              letterSpacing: '0.1em',
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
                  padding: '4px 10px',
                  borderRadius: 16,
                  border: 'none',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
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
            borderRadius: 20,
            padding: 3,
            gap: 2,
          }}>
            {['dark','light','glass'].map(th => (
              <button key={th}
                onClick={() => changeTheme(th)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 16,
                  border: 'none',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: theme === th 
                    ? 'var(--bg2)' 
                    : 'transparent',
                  color: theme === th 
                    ? 'var(--text)' 
                    : 'var(--text3)',
                }}>
                {th.charAt(0).toUpperCase() 
                  + th.slice(1)}
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

          <Link href="/about" style={{
            fontSize: 13,
            color: 'var(--text2)',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 8,
            border: '0.5px solid var(--border)',
          }}>
            {t.about}
          </Link>
        </nav>
      </div>
    </header>
  )
}
