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
    dev: 'Software Developer since 2007 | Published Author',
    rights: '© 2025 AITDL — All Rights Reserved'
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
    rights: '© 2025 AITDL — सर्वाधिकार सुरक्षित'
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
    rights: '© २०२५ AITDL — सर्वे अधिकाराः सुरक्षिताः'
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
      background: 'rgba(0,0,0,0.3)',
      backdropFilter: 'blur(10px)',
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
          <div style={{
            fontSize: 24,
            fontWeight: 900,
            color: 'var(--text)',
            letterSpacing: '0.05em',
          }}>
            AITDL<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p style={{
            fontSize: 14,
            color: 'var(--text3)',
            lineHeight: 1.8,
            maxWidth: 300,
          }}>
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
            ].map(([label, href]) => (
              <a key={label} href={href} style={{
                fontSize: 14,
                color: 'var(--text2)',
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
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 48,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 13,
          color: 'var(--text3)',
          lineHeight: 2,
          fontWeight: 500,
        }}>
          {t.built} 
          <span style={{ 
            color: 'var(--text)', 
            fontWeight: 800, 
            marginLeft: 6,
            fontFamily: 'Outfit',
            letterSpacing: '0.05em',
          }}>
            JRM
          </span>
          <br />
          <span style={{ fontSize: 11, opacity: 0.8 }}>{t.dev}</span>
          <br />
          <span style={{ fontSize: 11, opacity: 0.5, marginTop: 8, display: 'block' }}>{t.rights}</span>
        </div>
      </div>
    </footer>
  )
}
