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
          alignItems: 'center',
          gap: 12,
          textDecoration: 'none',
        }} title="AITDL — India's AI Command Center Home" aria-label="AITDL Home">
          <div style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 0,
          }}>
            {/* AIT — slide up + sweep */}
            {['A','I','T'].map((l, i) => (
              <span key={l} style={{
                fontFamily: "'Arial Black', Arial",
                fontSize: '24px',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: 1,
                display: 'inline-block',
                animation: `
                  aitdlSlideUp 0.4s forwards ${i * 0.08}s,
                  aitdlSweep 2.5s ease-in-out ${1.3 + i * 0.05}s infinite
                `,
                opacity: 0,
              }}>{l}</span>
            ))}
            {/* D L — flip reveal + sweep */}
            {['D','L'].map((l, i) => (
              <span key={l} style={{
                fontFamily: "'Arial Black', Arial",
                fontSize: '24px',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: 1,
                display: 'inline-block',
                animation: `
                  aitdlFlip 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards ${0.4 + i * 0.25}s,
                  aitdlSweepMirror 2.5s ease-in-out ${1.5 + i * 0.2}s infinite
                `,
                opacity: 0,
              }}>{l}</span>
            ))}
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
