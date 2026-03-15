import { useState, useEffect, useRef } from 'react'

// ─── Config ────────────────────────────────────────────────────────────────
const THEMES = [
  {
    id: 'dark',
    label: 'Dark',
    icon: '🌙',
    preview: ['#030306', '#080812', '#FF6B35'],
    desc: 'Classic dark mode',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    icon: '🌌',
    preview: ['#000000', '#05050A', '#FF6B35'],
    desc: 'Pure black OLED',
  },
  {
    id: 'glass',
    label: 'Glass',
    icon: '💎',
    preview: ['#030306', 'rgba(255,255,255,0.05)', '#FF6B35'],
    desc: 'Frosted glass',
  },
  {
    id: 'light',
    label: 'Light',
    icon: '☀️',
    preview: ['#F8F7F4', '#FFFFFF', '#FF6B35'],
    desc: 'Clean & bright',
  },
]

const LANGUAGES = [
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  { id: 'sa', label: 'संस्कृत', flag: '🕉️' },
]

const FONT_SIZES = [
  { id: 'small',  label: 'A',  size: '13px', scale: 0.87 },
  { id: 'medium', label: 'A',  size: '15px', scale: 1    },
  { id: 'large',  label: 'A',  size: '17px', scale: 1.13 },
]

const VIEWS = [
  { id: 'grid', icon: '⊞', label: 'Grid' },
  { id: 'list', icon: '☰', label: 'List' },
]

const MODES = [
  { id: 'directory', icon: '📂', label: 'Directory' },
  { id: 'command',   icon: '⚡', label: 'Command'   },
]

const ACCENTS = [
  { hex: '#FF6B35', name: 'Ember'   },
  { hex: '#00B4D8', name: 'Cyan'    },
  { hex: '#34C759', name: 'Leaf'    },
  { hex: '#FFD700', name: 'Gold'    },
  { hex: '#BF5AF2', name: 'Violet'  },
  { hex: '#FF2D55', name: 'Rose'    },
  { hex: '#ffffff', name: 'White'   },
]

// ─── Helpers ───────────────────────────────────────────────────────────────
const ls = {
  get: (k, def) => { 
    try { 
      const key = k === 'aitdl_theme' ? 'theme' : k;
      return localStorage.getItem(key) || def 
    } catch { return def } 
  },
  set: (k, v)  => { 
    try { 
      const key = k === 'aitdl_theme' ? 'theme' : k;
      localStorage.setItem(key, v) 
    } catch {} 
  },
}

export default function SettingsPanel({ isOpen, onClose, lang, setLang }) {
  const [theme,    setTheme]    = useState('light')
  const [view,     setView]     = useState('grid')
  const [uiMode,   setUiMode]   = useState('directory')
  const [fontSize, setFontSize] = useState('medium')
  const [indiaMode, setIndiaMode] = useState(false)
  const [indiaOrigin, setIndiaOrigin] = useState('all')
  const [accent,   setAccent]   = useState('#FF6B35')
  const [tab,      setTab]      = useState('appearance') // appearance | language | more
  const panelRef = useRef(null)

  // ── Load from storage ──────────────────────────────────────────────────
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    let sTheme = savedTheme;
    
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      sTheme = prefersDark ? 'dark' : 'light';
    }

    const sLang     = ls.get('aitdl_lang',      'en')
    const sView     = ls.get('aitdl_view',      'grid')
    const sUiMode   = ls.get('aitdl_ui_mode',   'directory')
    const sFontSize = ls.get('aitdl_fontsize',  'medium')
    const sIndia    = ls.get('aitdl_india_mode','false') === 'true'
    const sAccent   = ls.get('aitdl_accent',    '#FF6B35')

    setTheme(sTheme);    applyTheme(sTheme, !!savedTheme)
    setLang(sLang)
    setView(sView)
    setUiMode(sUiMode)
    setFontSize(sFontSize); applyFontSize(sFontSize, false)
    setIndiaMode(sIndia)
    setAccent(sAccent);  applyAccent(sAccent, false)
  }, [])

  // ── ESC to close ──────────────────────────────────────────────────────
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [isOpen])

  // ── Apply fns ─────────────────────────────────────────────────────────
  const applyTheme = (t, save = true) => {
    document.documentElement.setAttribute('data-theme', t)
    document.documentElement.classList.remove('dark','glass','midnight');
    
    if (t === 'dark' || t === 'midnight') {
      document.documentElement.classList.add('dark');
    }
    
    setTheme(t)
    if (save) { 
      localStorage.setItem('theme', t); 
      dispatch() 
    }
  }

  const resetTheme = () => {
    // 1. Clear saved preference
    localStorage.removeItem('theme');
    
    // 2. Remove all theme classes/attrs
    document.documentElement
      .classList.remove(
        'dark', 'light', 'glass', 'midnight'
      );
    document.documentElement
      .removeAttribute('data-theme');
    
    // 3. Follow OS preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    
    if (prefersDark) {
      document.documentElement
        .classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement
        .classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      setTheme('light');
    }
  }

  const applyFontSize = (fs, save = true) => {
    const conf = FONT_SIZES.find(f => f.id === fs)
    if (conf) document.documentElement.style.setProperty('--font-base', conf.size)
    setFontSize(fs)
    if (save) { ls.set('aitdl_fontsize', fs); dispatch() }
  }

  const applyAccent = (a, save = true) => {
    const glow = a === '#ffffff'
      ? 'rgba(255,255,255,0.2)'
      : a + '40'
    document.documentElement.style.setProperty('--accent', a)
    document.documentElement.style.setProperty('--accent-glow', glow)
    setAccent(a)
    if (save) { ls.set('aitdl_accent', a); dispatch() }
  }

  const applyLang = (l) => {
    setLang(l); ls.set('aitdl_lang', l); dispatch()
  }

  const applyView = (v) => {
    setView(v); ls.set('aitdl_view', v); dispatch()
  }

  const applyUiMode = (m) => {
    setUiMode(m); ls.set('aitdl_ui_mode', m); dispatch()
  }

  const applyIndiaMode = (val) => {
    setIndiaMode(val)
    ls.set('aitdl_india_mode', val)
    ls.set('aitdl_origin', val ? 'bharat' : 'all')
    dispatch()
  }

  const dispatch = () => window.dispatchEvent(new Event('storage'))

  const resetAll = () => {
    resetTheme()
    applyLang('en')
    applyView('grid')
    applyUiMode('directory')
    applyFontSize('medium')
    applyIndiaMode(false)
    applyAccent('#FF6B35')
  }

  if (!isOpen) return null

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="sp-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Settings">
      <div className="sp-panel" onClick={e => e.stopPropagation()} ref={panelRef}>

        {/* ── Header ── */}
        <div className="sp-header">
          <div className="sp-title">
            <span className="sp-title-icon">⚙️</span>
            <span>Settings</span>
          </div>
          <div className="sp-header-actions">
            <button className="sp-reset" onClick={resetAll} title="Reset all to defaults">↺ Reset</button>
            <button className="sp-close" onClick={onClose} aria-label="Close settings">✕</button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="sp-tabs">
          {[
            { id: 'appearance', icon: '🎨', label: 'Theme' },
            { id: 'language',   icon: '🌐', label: 'Language' },
            { id: 'more',       icon: '⊞',  label: 'More' },
          ].map(t => (
            <button
              key={t.id}
              className={`sp-tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="sp-content">

          {/* ══════════ APPEARANCE TAB ══════════ */}
          {tab === 'appearance' && (
            <>
              {/* Theme Cards */}
              <section>
                <h4 className="sp-section-label">Interface Theme</h4>
                <div className="sp-theme-grid">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      className={`sp-theme-card ${theme === t.id ? 'active' : ''}`}
                      onClick={() => applyTheme(t.id)}
                      title={t.desc}
                    >
                      {/* Mini preview */}
                      <div className="sp-theme-preview" style={{ background: t.preview[0] }}>
                        <div className="sp-prev-bar" style={{ background: t.preview[1] }}>
                          <div className="sp-prev-dot" style={{ background: t.preview[2] }} />
                          <div className="sp-prev-dot" style={{ background: t.preview[2], opacity: 0.4 }} />
                        </div>
                        <div className="sp-prev-card" style={{ background: t.preview[1] }} />
                        <div className="sp-prev-card" style={{ background: t.preview[1] }} />
                      </div>
                      <div className="sp-theme-card-footer">
                        <span className="sp-theme-icon">{t.icon}</span>
                        <span className="sp-theme-label">{t.label}</span>
                        {theme === t.id && <span className="sp-check">✓</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Font Size */}
              <section>
                <h4 className="sp-section-label">Font Size</h4>
                <div className="sp-font-row">
                  {FONT_SIZES.map((f, i) => (
                    <button
                      key={f.id}
                      className={`sp-font-btn ${fontSize === f.id ? 'active' : ''}`}
                      onClick={() => applyFontSize(f.id)}
                      style={{ fontSize: 12 + i * 3 }}
                      title={f.size}
                    >
                      {f.label}
                      <span className="sp-font-size-hint">{f.size}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Accent Color */}
              <section>
                <h4 className="sp-section-label">Accent Color</h4>
                <div className="sp-accent-row">
                  {ACCENTS.map(a => (
                    <button
                      key={a.hex}
                      className={`sp-accent-dot ${accent === a.hex ? 'active' : ''}`}
                      style={{ background: a.hex }}
                      onClick={() => applyAccent(a.hex)}
                      title={a.name}
                      aria-label={`Accent: ${a.name}`}
                    >
                      {accent === a.hex && <span className="sp-dot-check">✓</span>}
                    </button>
                  ))}
                </div>
                <div className="sp-accent-name">
                  {ACCENTS.find(a => a.hex === accent)?.name || 'Custom'}
                </div>
              </section>
            </>
          )}

          {/* ══════════ LANGUAGE TAB ══════════ */}
          {tab === 'language' && (
            <>
              <section>
                <h4 className="sp-section-label">Display Language</h4>
                <div className="sp-lang-list">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.id}
                      className={`sp-lang-card ${lang === l.id ? 'active' : ''}`}
                      onClick={() => applyLang(l.id)}
                    >
                      <span className="sp-lang-flag">{l.flag}</span>
                      <span className="sp-lang-label">{l.label}</span>
                      {lang === l.id && <span className="sp-check-right">✓</span>}
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ══════════ MORE TAB ══════════ */}
          {tab === 'more' && (
            <>
              {/* View Mode */}
              <section>
                <h4 className="sp-section-label">Card View</h4>
                <div className="sp-pill-row">
                  {VIEWS.map(v => (
                    <button
                      key={v.id}
                      className={`sp-pill ${view === v.id ? 'active' : ''}`}
                      onClick={() => applyView(v.id)}
                    >
                      {v.icon} {v.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Platform Mode */}
              <section>
                <h4 className="sp-section-label">Platform Mode</h4>
                <div className="sp-pill-row">
                  {MODES.map(m => (
                    <button
                      key={m.id}
                      className={`sp-pill ${uiMode === m.id ? 'active' : ''}`}
                      onClick={() => applyUiMode(m.id)}
                    >
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* India Mode */}
              <section className="sp-toggle-row">
                <div>
                  <h4 className="sp-section-label" style={{ marginBottom: 2 }}>🇮🇳 India Mode</h4>
                  <p className="sp-toggle-desc">Show only India-optimized tools</p>
                </div>
                <label className="sp-switch">
                  <input
                    type="checkbox"
                    checked={indiaMode}
                    onChange={e => applyIndiaMode(e.target.checked)}
                  />
                  <span className="sp-slider" />
                </label>
              </section>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="sp-footer">
          <button className="sp-full-reset" onClick={resetAll}>↺ Reset all to defaults</button>
        </div>
      </div>

      {/* ── All CSS ── */}
      <style jsx>{`
        /* ── Overlay ── */
        .sp-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 16px;
          animation: sp-fade 0.18s ease forwards;
        }
        @keyframes sp-fade { from { opacity: 0 } to { opacity: 1 } }

        /* ── Panel ── */
        .sp-panel {
          width: 340px;
          max-height: calc(100vh - 32px);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
          animation: sp-slide 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards;
          transform-origin: top right;
        }
        @keyframes sp-slide {
          from { opacity: 0; transform: scale(0.92) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ── Header ── */
        .sp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px 14px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .sp-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .sp-title-icon { font-size: 18px; }
        .sp-header-actions { display: flex; gap: 8px; align-items: center; }
        .sp-reset {
          background: none;
          border: 1px solid var(--border);
          color: var(--text-tertiary);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 8px;
          transition: all 0.2s;
          letter-spacing: 0.02em;
        }
        .sp-reset:hover { color: var(--accent); border-color: var(--accent); }
        .sp-close {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          width: 28px;
          height: 28px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .sp-close:hover { background: rgba(255,0,0,0.1); color: #ff4444; border-color: rgba(255,0,0,0.2); }

        /* ── Tabs ── */
        .sp-tabs {
          display: flex;
          gap: 4px;
          padding: 10px 12px 4px;
          flex-shrink: 0;
        }
        .sp-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 8px 4px;
          background: none;
          border: 1px solid transparent;
          border-radius: 12px;
          color: var(--text-tertiary);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.02em;
        }
        .sp-tab span:first-child { font-size: 16px; }
        .sp-tab:hover { color: var(--text-secondary); background: var(--bg-tertiary); }
        .sp-tab.active {
          background: var(--bg-tertiary);
          border-color: var(--border);
          color: var(--accent);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        /* ── Content ── */
        .sp-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sp-content::-webkit-scrollbar { width: 4px; }
        .sp-content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

        .sp-section-label {
          font-size: 10px;
          font-weight: 800;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 10px;
        }

        /* ── Theme Grid (Claude.ai style 2×2) ── */
        .sp-theme-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .sp-theme-card {
          background: var(--bg-tertiary);
          border: 2px solid var(--border);
          border-radius: 14px;
          padding: 0;
          cursor: pointer;
          transition: all 0.2s;
          overflow: hidden;
          text-align: left;
        }
        .sp-theme-card:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .sp-theme-card.active {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 8px 24px var(--accent-glow);
        }

        /* Mini Browser-style Preview */
        .sp-theme-preview {
          height: 64px;
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-radius: 12px 12px 0 0;
        }
        .sp-prev-bar {
          height: 10px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 0 5px;
        }
        .sp-prev-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .sp-prev-card {
          height: 12px;
          border-radius: 4px;
          opacity: 0.7;
        }

        .sp-theme-card-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 10px;
        }
        .sp-theme-icon { font-size: 14px; }
        .sp-theme-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-secondary);
          flex: 1;
        }
        .sp-theme-card.active .sp-theme-label { color: var(--accent); }
        .sp-check {
          font-size: 11px;
          color: var(--accent);
          font-weight: 900;
        }

        /* ── Font Size ── */
        .sp-font-row {
          display: flex;
          gap: 8px;
        }
        .sp-font-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 12px 8px;
          background: var(--bg-tertiary);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          color: var(--text-secondary);
          font-weight: 800;
          font-family: serif;
          cursor: pointer;
          transition: all 0.2s;
          line-height: 1;
        }
        .sp-font-btn:hover { border-color: rgba(255,255,255,0.2); }
        .sp-font-btn.active {
          border-color: var(--accent);
          background: var(--accent-glow);
          color: var(--accent);
        }
        .sp-font-size-hint {
          font-size: 9px;
          font-weight: 600;
          font-family: monospace;
          opacity: 0.5;
          letter-spacing: 0.05em;
        }

        /* ── Accent Colors ── */
        .sp-accent-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .sp-accent-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 900;
          color: #000;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .sp-accent-dot:hover { transform: scale(1.15); }
        .sp-accent-dot.active {
          border-color: #fff;
          transform: scale(1.15);
          box-shadow: 0 0 0 4px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.4);
        }
        .sp-dot-check { font-size: 10px; color: #000; mix-blend-mode: difference; }
        .sp-accent-name {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent);
          margin-top: 6px;
          letter-spacing: 0.04em;
        }

        /* ── Language ── */
        .sp-lang-list { display: flex; flex-direction: column; gap: 6px; }
        .sp-lang-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: var(--bg-tertiary);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .sp-lang-card:hover { border-color: rgba(255,255,255,0.15); }
        .sp-lang-card.active {
          border-color: var(--accent);
          background: var(--accent-glow);
        }
        .sp-lang-flag { font-size: 20px; }
        .sp-lang-label {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-secondary);
          flex: 1;
        }
        .sp-lang-card.active .sp-lang-label { color: var(--accent); }
        .sp-check-right { font-size: 14px; color: var(--accent); font-weight: 900; }

        /* ── Pill Buttons ── */
        .sp-pill-row { display: flex; gap: 8px; }
        .sp-pill {
          flex: 1;
          padding: 10px;
          background: var(--bg-tertiary);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        .sp-pill:hover { border-color: rgba(255,255,255,0.2); }
        .sp-pill.active {
          border-color: var(--accent);
          background: var(--accent-glow);
          color: var(--accent);
        }

        /* ── Toggle ── */
        .sp-toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .sp-toggle-desc { font-size: 11px; color: var(--text-tertiary); }
        .sp-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
          flex-shrink: 0;
        }
        .sp-switch input { opacity: 0; width: 0; height: 0; }
        .sp-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 34px;
          transition: .3s;
        }
        .sp-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background: var(--text-tertiary);
          border-radius: 50%;
          transition: .3s;
        }
        input:checked + .sp-slider { background: var(--accent); border-color: var(--accent); }
        input:checked + .sp-slider:before { transform: translateX(20px); background: #fff; }

        /* ── Footer ── */
        .sp-footer {
          padding: 12px 16px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }
        .sp-full-reset {
          width: 100%;
          padding: 10px;
          background: none;
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text-tertiary);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sp-full-reset:hover { border-color: #ff4444; color: #ff4444; background: rgba(255,68,68,0.05); }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .sp-overlay {
            padding: 0;
            align-items: flex-end;
            justify-content: stretch;
            overflow: hidden;
          }
          .sp-panel {
            width: 100%;
            max-width: 100%;
            border-radius: 20px 20px 0 0;
            max-height: 85vh;
            min-height: 200px;
            overflow-y: auto;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: auto;
            transform: none;
            animation: sp-slide-up 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards;
          }
          @keyframes sp-slide-up {
            from { transform: translateY(100%); }
            to   { transform: translateY(0); }
          }
        }
      `}</style>
    </div>
  )
}
