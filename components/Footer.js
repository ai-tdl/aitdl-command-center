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

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getVikramSamvatFull } from '../lib/vikramSamvat'


const LANG = {
  en: {
    desc: "India's most versatile AI technology ecosystem. Empowering 1.4 Billion minds with the right tools.",
    platform: 'Platform',
    tools: 'Explore Tools',
    battle: 'AI Battle',
    compare: 'Comparison Engine',
    about: 'About the Project',
    connect: 'Connect',
    built: 'Built with ❤️ for Bharat by',
    dev: 'Software Developer & Service Provider since 2007 | Published Author',
    rights: '© 2026 AITDL — All Rights Reserved',
    suggest: 'Suggest a Tool'
  },
  hi: {
    desc: "भारत का सबसे बहुमुखी AI तकनीक पारिस्थितिकी तंत्र। 1.4 अरब दिमागों को सही उपकरणों के साथ सशक्त बनाना।",
    platform: 'प्लेटफॉर्म',
    tools: 'टूल्स देखें',
    battle: 'AI युद्ध',
    compare: 'तुलना इंजन',
    about: 'परियोजना के बारे में',
    connect: 'संपर्क',
    built: 'भारत के लिए ❤️ के साथ निर्मित',
    dev: '2007 से सॉफ्टवेयर डेवलपर | प्रकाशित लेखक',
    rights: '© 2026 AITDL — सर्वाधिकार सुरक्षित',
    suggest: 'टूल का सुझाव दें'
  },
  sa: {
    desc: "भारतस्य सर्वाधिकं बहुमुखी AI तन्त्रज्ञानव्यवस्था। १.४ अरब मेधाविनाम् उचितसाधनैः शक्तिकरणम्।",
    platform: 'मञ्चः',
    tools: 'उपकरणानि अन्वेषयन्तु',
    battle: 'AI युद्धम्',
    compare: 'तुलना यन्त्रम्',
    about: 'परियोजनायाः विषये',
    connect: 'सम्पर्कः',
    built: 'भारताय ❤️ सह निर्मितम्',
    dev: '२००७ तः सॉफ्टवेयर विकसकः | प्रकाशितः लेखकः',
    rights: '© २०२६ AITDL — सर्वे अधिकाराः सुरक्षिताः',
    suggest: 'उपकरणं सूचयन्तु'
  }
}

export default function Footer() {
  const [lang, setLang] = useState('en')
  const [vs, setVs] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setVs(getVikramSamvatFull())

    const saved = localStorage.getItem('aitdl_lang') || 'en'
    setLang(saved)
    
    // Listen for storage changes to sync across tabs/components
    const handleStorage = () => {
      setLang(localStorage.getItem('aitdl_lang') || 'en')
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const t = LANG[lang]

  // Binary morph animation
  useEffect(() => {
    const letters = [
      {id:'fl-A', letter:'A', bin:'0100', mirror:false},
      {id:'fl-I', letter:'I', bin:'0100', mirror:false},
      {id:'fl-T', letter:'T', bin:'0101', mirror:false},
      {id:'fl-D', letter:'D', bin:'0100', mirror:true},
      {id:'fl-L', letter:'L', bin:'0100', mirror:true},
    ]

    const morphFooter = () => {
      letters.forEach(({id, letter, bin, mirror}, i) => {
        const el = document.getElementById(id)
        if (!el) return
        setTimeout(() => {
          el.style.opacity = '0.3'
          el.style.color = 'var(--accent)'
          el.style.fontSize = '12px'
          el.style.fontFamily = "'Courier New', monospace"
          el.style.transform = mirror ? 'scaleX(-1) scaleY(0.5)' : 'scaleY(0.5)'
          el.textContent = bin
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = mirror ? 'scaleX(-1) scaleY(1)' : 'scaleY(1)'
            setTimeout(() => {
              el.style.opacity = '0.3'
              el.style.transform = mirror ? 'scaleX(-1) scaleY(0.5)' : 'scaleY(0.5)'
              setTimeout(() => {
                el.textContent = letter
                el.style.fontSize = '56px'
                el.style.fontFamily = "'Arial Black', Arial"
                el.style.color = 'var(--text-primary)'
                el.style.opacity = '1'
                el.style.transform = mirror ? 'scaleX(-1)' : 'none'
              }, 200)
            }, 500)
          }, 100)
        }, i * 120)
      })
    }

    const t1 = setTimeout(morphFooter, 800)
    const t2 = setInterval(morphFooter, 8000)
    return () => { clearTimeout(t1); clearInterval(t2) }
  }, [])

  // Tagline words reveal
  useEffect(() => {
    const ids = ['ftw1','fts1','ftw2','fts2','ftw3','fts3','ftw4','fts4','ftw5']
    const t1 = setTimeout(() => {
      ids.forEach((id, i) => {
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }
        }, i * 150)
      })
    }, 1200)
    return () => clearTimeout(t1)
  }, [])

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '64px 24px',
      marginTop: 80,
      background: 'var(--bg-primary)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 48,
        marginBottom: 64,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ marginBottom: 20 }}>
            <Image src="/logo-horizontal.svg" alt="AITDL Branding" width={200} height={60} style={{
              height: 60,
              width: 'auto',
              filter: 'drop-shadow(0 0 10px var(--accent-glow))',
            }} />
          </div>
          <p style={{
            fontSize: 14,
            color: 'var(--text-tertiary)',
            lineHeight: 1.8,
            maxWidth: 300,
          }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              Artificial Intelligence Technology & Deep Learning
            </span>
            {t.desc}
          </p>
        </div>

        <div>
          <div style={{
            fontSize: 12,
            fontWeight: 800,
            color: 'var(--text)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: 24,
          }}>{t.platform}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              [t.tools, '/'],
              [t.battle, '/ai-battle'],
              [t.compare, '/compare'],
              [t.about, '/about'],
              ['About Founder', '/about-founder'],
            ].map(([label, href]) => (
              <a key={label} href={href} style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }} className="footer-link">{label}</a>
            ))}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: 12,
            fontWeight: 800,
            color: 'var(--text)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: 24,
          }}>{t.connect}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href="mailto:hello@aitdl.com" style={{
              fontSize: 14,
              color: 'var(--accent)',
              fontWeight: 600,
              textDecoration: 'none',
              padding: '12px 20px',
              border: '1px solid var(--border)',
              borderRadius: 8,
              textAlign: 'center',
              display: 'inline-block',
              transition: 'all 0.3s',
            }} className="contact-btn">
              hello@aitdl.com
            </a>
            <a href="https://forms.gle/aitdl-beta-suggest" target="_blank" rel="noopener noreferrer" style={{
              fontSize: 12,
              color: 'var(--text)',
              fontWeight: 800,
              textDecoration: 'none',
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              textAlign: 'center',
              display: 'inline-block',
              border: '1px dashed var(--border)',
              transition: 'all 0.3s',
            }}>
              ➕ {t.suggest}
            </a>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 48,
        textAlign: 'center',
      }}>

        {/* Large AITDⅅ with binary morph */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          marginBottom: 12,
          gap: 0,
        }}>
          {[
            {id:'fl-A', l:'A', mirror:false},
            {id:'fl-I', l:'I', mirror:false},
            {id:'fl-T', l:'T', mirror:false},
            {id:'fl-D', l:'D', mirror:true},
            {id:'fl-L', l:'L', mirror:true},
          ].map(({id, l, mirror}) => (
            <span
              key={id}
              id={id}
              style={{
                fontFamily: "'Arial Black', Arial",
                fontSize: '56px',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: 1,
                display: 'inline-block',
                transform: mirror ? 'scaleX(-1)' : 'none',
                transition: 'opacity 0.15s ease, transform 0.2s ease, color 0.2s ease, font-size 0.15s ease',
                minWidth: l==='I' ? '32px' : '48px',
                textAlign: 'center',
              }}
            >
              {l}
            </span>
          ))}
        </div>

        {/* Full tagline — word by word */}
        <div style={{
          height: '16px',
          overflow: 'hidden',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}>
          {[
            {id:'ftw1', text:'ARTIFICIAL', sep:false},
            {id:'fts1', text:' · ', sep:true},
            {id:'ftw2', text:'INTELLIGENCE', sep:false},
            {id:'fts2', text:' · ', sep:true},
            {id:'ftw3', text:'TECHNOLOGY', sep:false},
            {id:'fts3', text:' · ', sep:true},
            {id:'ftw4', text:'DEEP', sep:false},
            {id:'fts4', text:' · ', sep:true},
            {id:'ftw5', text:'LEARNING', sep:false},
          ].map(({id, text, sep}) => (
            <span
              key={id}
              id={id}
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '2px',
                color: 'var(--accent)',
                opacity: 0,
                transform: 'translateY(8px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                display: 'inline-block',
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
          marginBottom: 20,
        }}>
          {[
            'Built with ❤️ for Bharat',
            'MIT License 2026',
            'aitdl.com'
          ].map(pill => (
            <span key={pill} style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 100,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {pill}
            </span>
          ))}
        </div>

        <p style={{
          fontSize: 11,
          color: 'var(--text-tertiary)',
          opacity: 0.5,
          marginBottom: 24
        }}>
          © 2026 AITDL
        </p>

        {/* Vedic Timestamp Badge - Hidden as per request 
        {mounted && vs && (
          <div style={{ 
            display: 'inline-flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 6, 
            marginTop: 24,
            padding: '12px 28px',
            borderRadius: '12px',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.3))',
            boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05), inset -1px -1px 2px rgba(0,0,0,0.4), 2px 2px 6px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.02)',
          }}>
            <div style={{ 
              fontSize: 14, 
              fontWeight: 800, 
              color: '#BA7517', 
              letterSpacing: '0.05em', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 0px rgba(255,255,255,0.1)' 
            }}>
              {vs.line1}
            </div>
            <div style={{ 
              fontSize: 12, 
              fontWeight: 700, 
              color: 'orange', 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 0px rgba(255,255,255,0.1)'
            }}>
              {vs.line2}
            </div>
          </div>
        )}
        */}

      </div>
    </footer>
  )
}
