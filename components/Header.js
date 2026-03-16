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

import Link from 'next/link'
import { useState, useEffect } from 'react'
import SettingsPanel from './SettingsPanel'
import { useAuth } from '../lib/useAuth'

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
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { user } = useAuth()

  // ── BINARY MORPH ANIMATION ──────────
  useEffect(() => {
    const letters = [
      {id:'aitdl-letter-A', bin:'01000001', mirror:false},
      {id:'aitdl-letter-I', bin:'01001001', mirror:false},
      {id:'aitdl-letter-T', bin:'01010100', mirror:false},
      {id:'aitdl-letter-D', bin:'01000100', mirror:true},
      {id:'aitdl-letter-L', bin:'01001100', mirror:true},
    ]

    const runMorph = () => {
      letters.forEach(({id, bin, mirror}, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const orig = el.dataset.letter

        setTimeout(() => {
          el.style.opacity = '0.3'
          el.style.color = 'var(--accent)'
          el.style.fontSize = '8px'
          el.style.fontFamily = "'Courier New', monospace"
          el.style.transform = mirror ? 'scaleX(-1) scaleY(0.5)' : 'scaleY(0.5)'
          el.textContent = bin.slice(0,4)

          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = mirror ? 'scaleX(-1) scaleY(1)' : 'scaleY(1)'
            el.textContent = bin.slice(0,4)

            setTimeout(() => {
              el.style.opacity = '0.3'
              el.style.transform = mirror ? 'scaleX(-1) scaleY(0.5)' : 'scaleY(0.5)'

              setTimeout(() => {
                el.textContent = orig
                el.style.fontSize = '24px'
                el.style.fontFamily = "'Arial Black', Arial"
                el.style.color = 'var(--text-primary)'
                el.style.opacity = '1'
                el.style.transform = mirror ? 'scaleX(-1)' : 'none'
              }, 200)
            }, 400)
          }, 100)
        }, i * 100)
      })
    }

    const t1 = setTimeout(runMorph, 1000)
    const t2 = setInterval(runMorph, 6000)
    return () => { clearTimeout(t1); clearInterval(t2) }
  }, [])

  // ── WORD CYCLE TAGLINE ──────────────
  useEffect(() => {
    const words = ['ARTIFICIAL','INTELLIGENCE','TECHNOLOGY','DEEP','LEARNING']
    let idx = 0
    let timer

    const showWord = () => {
      const el = document.getElementById('aitdl-tagword')
      if (!el) return
      el.textContent = words[idx]
      el.style.opacity = '0'
      el.style.transform = 'translateY(6px)'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })
      })
      timer = setTimeout(() => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(-6px)'
        timer = setTimeout(() => {
          idx = (idx + 1) % words.length
          showWord()
        }, 350)
      }, 1200)
    }

    const startTimer = setTimeout(showWord, 800)
    return () => { clearTimeout(startTimer); clearTimeout(timer) }
  }, [])

  const t = LANG[lang]

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-primary-blur)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 var(--header-px, 24px)',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--header-height, 80px)',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          textDecoration: 'none',
        }} title="AITDL — India's AI Command Center Home" aria-label="AITDL Home">

          {/* Logo letters with binary morph */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 0,
            position: 'relative',
          }}>
            {[
              {l:'A', bin:'01000001', mirror:false},
              {l:'I', bin:'01001001', mirror:false},
              {l:'T', bin:'01010100', mirror:false},
              {l:'D', bin:'01000100', mirror:true},
              {l:'L', bin:'01001100', mirror:true},
            ].map(({l, bin, mirror}, i) => (
              <span
                key={l}
                id={`aitdl-letter-${l}`}
                data-letter={l}
                data-bin={bin}
                style={{
                  fontFamily: "'Arial Black', Arial",
                  fontSize: '24px',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  display: 'inline-block',
                  transform: mirror ? 'scaleX(-1)' : 'none',
                  transition: 'opacity 0.15s ease, transform 0.2s ease, color 0.2s ease',
                  position: 'relative',
                  minWidth: mirror ? '18px' : l==='I' ? '10px' : '18px',
                  textAlign: 'center',
                }}
              >
                {l}
              </span>
            ))}
          </div>

          {/* Word cycle tagline */}
          <div style={{
            height: '11px',
            overflow: 'hidden',
            position: 'relative',
            width: '130px',
          }}>
            <span
              id="aitdl-tagword"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '7px',
                fontWeight: 700,
                letterSpacing: '2px',
                color: 'var(--accent)',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
                transform: 'translateY(6px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              ARTIFICIAL
            </span>
          </div>

        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--nav-gap, 24px)',
        }}>
          {/* Main Links */}
          <div style={{ display: 'flex', gap: 'var(--nav-gap, 16px)', alignItems: 'center' }}>
            <Link href="/ai-battle" style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: 12,
              transition: 'all 0.2s',
            }} className="nav-link">
              ⚔️ {t.battle}
            </Link>

            <Link href="/compare" style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: 12,
              transition: 'all 0.2s',
            }} className="nav-link">
              🔄 {t.compare}
            </Link>

            <Link href="/about" style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: 12,
              transition: 'all 0.2s',
            }} className="nav-link">
              ✨ {t.about}
            </Link>
          </div>

          {/* Action Hub */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <Link href="/profile" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none',
              }}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '2px solid var(--accent)',
                      transition: 'transform 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ) : (
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 800,
                    color: '#fff',
                  }}>
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
              </Link>
            ) : (
              <Link href="/login" style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid var(--border)',
                borderRadius: 10,
                transition: 'all 0.2s',
                background: 'var(--bg-tertiary)',
              }} className="login-btn">
                Login
              </Link>
            )}

            {/* GEAR BUTTON */}
            <button 
              onClick={() => setSettingsOpen(true)}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s var(--ease)',
              }}
              className="gear-btn"
              aria-label="Open Settings"
            >
              ⚙️
            </button>
          </div>
        </nav>
      </div>

      {/* Settings Panel Portal */}
      <SettingsPanel 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        lang={lang}
        setLang={setLang}
      />

      <style jsx>{`
        .nav-link:hover {
          color: var(--accent);
          background: rgba(255,255,255,0.03);
        }
        .gear-btn:hover {
          border-color: var(--accent);
          transform: rotate(45deg);
          box-shadow: 0 0 15px var(--accent-glow);
        }

        /* AITDL Logo Animations */
        @keyframes aitdlSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes aitdlFlip {
          0%   { opacity: 0; transform: scaleX(1) perspective(400px) rotateY(-90deg); }
          60%  { opacity: 1; transform: scaleX(-1) perspective(400px) rotateY(10deg); }
          100% { opacity: 1; transform: scaleX(-1) rotateY(0deg); }
        }

        @keyframes aitdlSweep {
          0%,100% { color: var(--text-primary); }
          50%     { color: var(--accent); }
        }

        @keyframes aitdlSweepMirror {
          0%,100% {
            color: var(--text-primary);
            transform: scaleX(-1);
          }
          50% {
            color: var(--accent);
            transform: scaleX(-1);
          }
        }
        @media (max-width: 768px) {
          :root {
            --header-height: 64px;
            --header-px: 12px;
            --nav-gap: 8px;
          }
          .logo-text { display: none; }
          .nav-link { 
            padding: 6px 8px !important; 
            font-size: 12px !important; 
          }
          .gear-btn {
            width: 36px !important;
            height: 36px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </header>
  )
}
