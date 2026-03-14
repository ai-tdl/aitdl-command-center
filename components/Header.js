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
import SettingsPanel from './SettingsPanel'

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

  const t = LANG[lang]

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-primary-blur, rgba(3, 3, 6, 0.7))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      transition: 'all 0.3s var(--ease)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          textDecoration: 'none',
        }} title="Artificial Intelligence Technology & Deep Learning">
          <div style={{
            width: 48, height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.5s var(--ease)',
          }} className="logo-glow">
            <img src="/logo-singularity.svg" alt="AITDL Singularity" style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 10px var(--accent-glow))',
            }} />
          </div>
          <div className="logo-text">
            <div style={{
              fontSize: 22,
              fontWeight: 950,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              fontFamily: 'Outfit',
              lineHeight: 1,
            }}>AITDL<span style={{ color: 'var(--accent)' }}>.</span></div>
            <div style={{
              fontSize: 9,
              fontWeight: 800,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.08em',
              marginTop: 4,
              textTransform: 'uppercase',
            }}>Artificial Intelligence Technology & Deep Learning</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}>
          {/* Main Links */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
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
        @media (max-width: 768px) {
          .logo-text, nav { display: none; }
        }
      `}</style>
    </header>
  )
}
