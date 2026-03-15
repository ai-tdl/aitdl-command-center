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

  useEffect(() => {
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
            <img src="/logo-horizontal.svg" alt="AITDL Branding" style={{
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
        <div style={{
          fontSize: 16,
          color: 'var(--text-primary)',
          fontWeight: 800,
          marginBottom: 12,
          fontFamily: 'Outfit',
          letterSpacing: '0.1em',
        }}>
          AITDL
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
          marginBottom: 24
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
              letterSpacing: '0.05em'
            }}>
              {pill}
            </span>
          ))}
        </div>

        
        <p style={{ 
          fontSize: 11, 
          color: 'var(--text-tertiary)', 
          opacity: 0.5 
        }}>
          © 2026 AITDL
        </p>
      </div>
    </footer>
  )
}
