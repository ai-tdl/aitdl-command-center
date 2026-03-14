import { useState, useEffect, useRef } from 'react'

const THEMES = [
  { id: 'dark', label: 'Dark', icon: '🌙' },
  { id: 'light', label: 'Light', icon: '☀️' },
  { id: 'glass', label: 'Glass', icon: '💎' },
  { id: 'midnight', label: 'Midnight', icon: '🌌' },
]

const LANGUAGES = [
  { id: 'en', label: 'EN' },
  { id: 'hi', label: 'हि' },
  { id: 'sa', label: 'सं' },
]

const DENSITIES = [
  { id: 'compact', label: 'Compact', padding: '12px' },
  { id: 'comfortable', label: 'Comfortable', padding: '24px' },
  { id: 'spacious', label: 'Spacious', padding: '40px' },
]

const FONT_SIZES = [
  { id: 'small', label: 'A-', size: '13px' },
  { id: 'medium', label: 'A', size: '15px' },
  { id: 'large', label: 'A+', size: '17px' },
]

const ACCENTS = [
  '#FF6B35', // Orange (Default)
  '#00B4D8', // Cyan
  '#34C759', // Green
  '#FFD700', // Gold
  '#BF5AF2', // Purple
  '#FF2D55', // Red
  '#ffffff', // White
]

export default function SettingsPanel({ isOpen, onClose, lang, setLang }) {
  const [theme, setTheme] = useState('dark')
  const [view, setView] = useState('grid')
  const [density, setDensity] = useState('comfortable')
  const [fontSize, setFontSize] = useState('medium')
  const [indiaMode, setIndiaMode] = useState(false)
  const [accent, setAccent] = useState('#FF6B35')
  const panelRef = useRef(null)

  useEffect(() => {
    // Initial Load
    const sTheme = localStorage.getItem('aitdl_theme') || 'dark'
    const sLang = localStorage.getItem('aitdl_lang') || 'en'
    const sView = localStorage.getItem('aitdl_view') || 'grid'
    const sDensity = localStorage.getItem('aitdl_density') || 'comfortable'
    const sFontSize = localStorage.getItem('aitdl_fontsize') || 'medium'
    const sIndiaMode = localStorage.getItem('aitdl_india_mode') === 'true'
    const sAccent = localStorage.getItem('aitdl_accent') || '#FF6B35'

    setTheme(sTheme)
    setLang(sLang)
    setView(sView)
    setDensity(sDensity)
    setFontSize(sFontSize)
    setIndiaMode(sIndiaMode)
    setAccent(sAccent)

    // Apply immediately
    applyTheme(sTheme)
    applyDensity(sDensity)
    applyFontSize(sFontSize)
    applyAccent(sAccent)
  }, [])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  const applyTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('aitdl_theme', t)
    setTheme(t)
    window.dispatchEvent(new Event('storage'))
  }

  const applyLang = (l) => {
    setLang(l)
    localStorage.setItem('aitdl_lang', l)
    window.dispatchEvent(new Event('storage'))
  }

  const applyView = (v) => {
    setView(v)
    localStorage.setItem('aitdl_view', v)
    window.dispatchEvent(new Event('storage'))
  }

  const applyDensity = (d) => {
    const conf = DENSITIES.find(x => x.id === d)
    if (conf) document.documentElement.style.setProperty('--card-padding', conf.padding)
    setDensity(d)
    localStorage.setItem('aitdl_density', d)
    window.dispatchEvent(new Event('storage'))
  }

  const applyFontSize = (fs) => {
    const conf = FONT_SIZES.find(x => x.id === fs)
    if (conf) document.documentElement.style.setProperty('--font-base', conf.size)
    setFontSize(fs)
    localStorage.setItem('aitdl_fontsize', fs)
    window.dispatchEvent(new Event('storage'))
  }

  const applyIndiaMode = (val) => {
    setIndiaMode(val)
    localStorage.setItem('aitdl_india_mode', val)
    // Synchronize with origin for index.js logic
    localStorage.setItem('aitdl_origin', val ? 'bharat' : 'all')
    window.dispatchEvent(new Event('storage'))
  }

  const applyAccent = (a) => {
    document.documentElement.style.setProperty('--accent', a)
    setAccent(a)
    localStorage.setItem('aitdl_accent', a)
    window.dispatchEvent(new Event('storage'))
  }

  const resetAll = () => {
    applyTheme('dark')
    applyLang('en')
    applyView('grid')
    applyDensity('comfortable')
    applyFontSize('medium')
    applyIndiaMode(false)
    applyAccent('#FF6B35')
  }

  if (!isOpen) return null

  return (
    <div className="overlay" onClick={onClose}>
      <div className="panel" onClick={e => e.stopPropagation()} ref={panelRef}>
        <div className="mobile-handle" />
        
        <header>
          <h3>⚙️ Settings</h3>
          <button className="reset-link" onClick={resetAll}>↺ Reset all</button>
        </header>

        <div className="content">
          {/* Section 1: Theme */}
          <section>
            <h4>Interface Theme</h4>
            <div className="grid-btns">
              {THEMES.map(t => (
                <button key={t.id} className={theme === t.id ? 'active' : ''} onClick={() => applyTheme(t.id)}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </section>

          {/* Section 2: Language */}
          <section>
            <h4>Language</h4>
            <div className="row-btns">
              {LANGUAGES.map(l => (
                <button key={l.id} className={lang === l.id ? 'active' : ''} onClick={() => applyLang(l.id)}>
                  {l.label}
                </button>
              ))}
            </div>
          </section>

          {/* Section 3: View Mode */}
          <section>
            <h4>View Mode</h4>
            <div className="row-btns">
              <button className={view === 'grid' ? 'active' : ''} onClick={() => applyView('grid')}>🗂 Grid</button>
              <button className={view === 'list' ? 'active' : ''} onClick={() => applyView('list')}>📝 List</button>
            </div>
          </section>

          {/* Section 4: Density */}
          <section>
            <h4>Density</h4>
            <div className="row-btns">
              {DENSITIES.map(d => (
                <button key={d.id} className={density === d.id ? 'active' : ''} onClick={() => applyDensity(d.id)}>
                  {d.label}
                </button>
              ))}
            </div>
          </section>

          {/* Section 5: Font Size */}
          <section>
            <h4>Font Size</h4>
            <div className="row-btns">
              {FONT_SIZES.map(f => (
                <button key={f.id} className={fontSize === f.id ? 'active' : ''} onClick={() => applyFontSize(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
          </section>

          {/* Section 6: India Mode */}
          <section className="flex-row">
            <h4>India Mode</h4>
            <label className="switch">
              <input type="checkbox" checked={indiaMode} onChange={(e) => applyIndiaMode(e.target.checked)} />
              <span className="slider" />
            </label>
          </section>

          {/* Section 7: Accent Color */}
          <section>
            <h4>Accent Colour</h4>
            <div className="color-row">
              {ACCENTS.map(a => (
                <div key={a} className={`color-dot ${accent === a ? 'active' : ''}`} 
                  style={{ background: a }} onClick={() => applyAccent(a)} />
              ))}
            </div>
          </section>

          {/* Section 8: Final Reset */}
          <button className="full-reset" onClick={resetAll}>↺ Reset all to default</button>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: flex-end;
          padding: 20px;
          opacity: 0;
          animation: fade-in 0.2s forwards;
        }
        @keyframes fade-in { to { opacity: 1; } }

        .panel {
          width: 280px;
          max-height: 85vh;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          transform: translateY(-8px);
          animation: slide-in 0.2s forwards;
          overflow: hidden;
        }
        @keyframes slide-in { to { opacity: 1; transform: translateY(0); } }

        .mobile-handle { display: none; }

        header {
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
        }
        header h3 { font-size: 16px; font-weight: 800; margin: 0; }
        .reset-link { 
          background: none; border: none; color: var(--accent); 
          font-size: 12px; font-weight: 700; cursor: pointer; 
        }

        .content { 
          padding: 24px; 
          overflow-y: auto; 
          display: flex; 
          flex-direction: column; 
          gap: 24px; 
        }

        section h4 { 
          font-size: 10px; 
          font-weight: 800; 
          color: var(--text3); 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          margin-bottom: 12px; 
        }

        .grid-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .row-btns { display: flex; gap: 8px; }

        button:not(.reset-link, .full-reset) {
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
        button.active {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
          box-shadow: 0 4px 12px var(--accent-glow);
        }

        .flex-row { display: flex; justify-content: space-between; align-items: center; }
        .flex-row h4 { margin: 0; }

        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: var(--bg3);
          border: 1px solid var(--border);
          transition: .4s;
          border-radius: 34px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider { background-color: var(--accent); border-color: var(--accent); }
        input:checked + .slider:before { transform: translateX(18px); }

        .color-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .color-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: transform 0.2s;
        }
        .color-dot.active { border-color: #fff; transform: scale(1.1); box-shadow: 0 0 10px rgba(255,255,255,0.3); }

        .full-reset {
          margin-top: 12px;
          padding: 12px;
          background: none;
          border: 1px solid var(--border);
          color: var(--text3);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .overlay { align-items: flex-end; padding: 0; }
          .panel { 
            width: 100%; 
            border-radius: 20px 20px 0 0; 
            max-height: 70vh; 
            transform: translateY(100%); 
            animation: slide-up-mobile 0.3s forwards;
          }
          @keyframes slide-up-mobile { to { transform: translateY(0); opacity: 1; } }
          .mobile-handle { 
            display: block; 
            width: 40px; 
            height: 4px; 
            background: var(--border); 
            margin: 12px auto 0; 
            border-radius: 2px; 
          }
        }
      `}</style>
    </div>
  )
}
