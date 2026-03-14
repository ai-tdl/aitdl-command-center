import { useState, useEffect } from 'react'

const THEMES = [
  { id: 'dark', label: 'Dark', icon: '🌙' },
  { id: 'light', label: 'Light', icon: '☀️' },
  { id: 'glass', label: 'Glass', icon: '💎' },
  { id: 'midnight', label: 'Midnight', icon: '🌌' },
]

const DENSITIES = [
  { id: 'compact', label: 'Compact', padding: '12px', gap: '8px' },
  { id: 'comfortable', label: 'Comfortable', padding: '24px', gap: '16px' },
  { id: 'spacious', label: 'Spacious', padding: '40px', gap: '24px' },
]

const ACCENTS = [
  '#FF6B35', // Orange (Default)
  '#00B4D8', // Cyan
  '#22C55E', // Green
  '#A855F7', // Purple
  '#EF4444', // Red
]

const LANGS = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'hi', label: 'Hindi', short: 'हि' },
  { id: 'sa', label: 'Sanskrit', short: 'सं' },
]

export default function SettingsPanel({ isOpen, onClose, lang, setLang }) {
  const [theme, setTheme] = useState('dark')
  const [viewMode, setViewMode] = useState('grid')
  const [density, setDensity] = useState('comfortable')
  const [accent, setAccent] = useState('#FF6B35')
  const [origin, setOrigin] = useState('all')

  useEffect(() => {
    // Load initial settings
    const sTheme = localStorage.getItem('aitdl_theme') || 'dark'
    const sView = localStorage.getItem('aitdl_viewmode') || 'grid'
    const sDensity = localStorage.getItem('aitdl_density') || 'comfortable'
    const sAccent = localStorage.getItem('aitdl_accent') || '#FF6B35'
    const sOrigin = localStorage.getItem('aitdl_origin') || 'all'

    setTheme(sTheme)
    setViewMode(sView)
    setDensity(sDensity)
    setAccent(sAccent)
    setOrigin(sOrigin)

    applyTheme(sTheme)
    applyDensity(sDensity)
    applyAccent(sAccent)
  }, [])

  const applyTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('aitdl_theme', t)
    setTheme(t)
    window.dispatchEvent(new Event('storage'))
  }

  const applyDensity = (d) => {
    const config = DENSITIES.find(item => item.id === d)
    if (config) {
      document.documentElement.style.setProperty('--card-padding', config.padding)
      document.documentElement.style.setProperty('--card-gap', config.gap)
    }
    localStorage.setItem('aitdl_density', d)
    setDensity(d)
    window.dispatchEvent(new Event('storage'))
  }

  const applyAccent = (a) => {
    document.documentElement.style.setProperty('--accent', a)
    // Create glow version (25% opacity)
    const glow = a + '40'; // Simple hex opacity
    document.documentElement.style.setProperty('--accent-glow', glow)
    localStorage.setItem('aitdl_accent', a)
    setAccent(a)
    window.dispatchEvent(new Event('storage'))
  }

  const toggleViewMode = (mode) => {
    setViewMode(mode)
    localStorage.setItem('aitdl_viewmode', mode)
    window.dispatchEvent(new Event('storage'))
  }

  const toggleOrigin = () => {
    const next = origin === 'all' ? 'bharat' : 'all'
    setOrigin(next)
    localStorage.setItem('aitdl_origin', next)
    window.dispatchEvent(new Event('storage'))
  }

  const resetDefaults = () => {
    applyTheme('dark')
    applyDensity('comfortable')
    applyAccent('#FF6B35')
    toggleViewMode('grid')
    setOrigin('all')
    localStorage.setItem('aitdl_origin', 'all')
    setLang('en')
    localStorage.setItem('aitdl_lang', 'en')
    window.dispatchEvent(new Event('storage'))
  }

  if (!isOpen) return null

  return (
    <div className="settings-overlay" onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '80px 24px',
    }}>
      <div className="settings-panel glass" onClick={e => e.stopPropagation()} style={{
        width: 320,
        height: 'fit-content',
        borderRadius: 24,
        padding: 32,
        animation: 'slide-up 0.4s var(--ease)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Command Center</h3>
          <button onClick={onClose} style={{ 
            background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 20 
          }}>✕</button>
        </div>

        {/* Language */}
        <section>
          <div className="label">Language Preference</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {LANGS.map(l => (
              <button key={l.id} className={`opt-btn ${lang === l.id ? 'active' : ''}`}
                onClick={() => { setLang(l.id); localStorage.setItem('aitdl_lang', l.id) }}>
                {l.short}
              </button>
            ))}
          </div>
        </section>

        {/* Theme */}
        <section>
          <div className="label">Interface Theme</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            {THEMES.map(t => (
              <button key={t.id} className={`opt-btn ${theme === t.id ? 'active' : ''}`}
                onClick={() => applyTheme(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </section>

        {/* View Mode & Origin */}
        <section>
          <div className="label">Layout & Origin</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className={`opt-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => toggleViewMode('grid')}>🗂 Grid</button>
            <button className={`opt-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => toggleViewMode('list')}>📝 List</button>
            <button className={`opt-btn ${origin === 'bharat' ? 'active' : ''}`} onClick={toggleOrigin} style={{ flex: 1.5 }}>
              🇮🇳 Bharat Mode
            </button>
          </div>
        </section>

        {/* Density */}
        <section>
          <div className="label">Information Density</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {DENSITIES.map(d => (
              <button key={d.id} className={`opt-btn ${density === d.id ? 'active' : ''}`}
                onClick={() => applyDensity(d.id)}>
                {d.label}
              </button>
            ))}
          </div>
        </section>

        {/* Accent Color */}
        <section>
          <div className="label">Brand Accent</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            {ACCENTS.map(a => (
              <div key={a} onClick={() => applyAccent(a)} style={{
                width: 24, height: 24, borderRadius: '50%', background: a,
                cursor: 'pointer', border: accent === a ? '3px solid #fff' : 'none',
                boxShadow: accent === a ? `0 0 15px ${a}` : 'none'
              }} />
            ))}
          </div>
        </section>

        <button onClick={resetDefaults} style={{
          marginTop: 12, padding: 12, borderRadius: 12, border: '1px solid var(--border)',
          background: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 12, fontWeight: 700
        }}>
          Reset to Factory Defaults
        </button>
      </div>

      <style jsx>{`
        .label {
          font-size: 11px;
          font-weight: 800;
          color: var(--text3);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .opt-btn {
          flex: 1;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--bg3);
          color: var(--text2);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .opt-btn:hover {
          background: var(--bg2);
          border-color: var(--accent);
        }
        .opt-btn.active {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
          box-shadow: 0 4px 12px var(--accent-glow);
        }
      `}</style>
    </div>
  )
}
