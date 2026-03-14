/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @copyright © 2025 All Rights Reserved
 * ============================================
 */

export default function TrustBar() {
  const items = [
    { icon: '🚀', text: '100+ Verified AI Tools' },
    { icon: '🇮🇳', text: 'Built for Bharat' },
    { icon: '💎', text: 'Premium Experience' },
    { icon: '🔒', text: 'Secure & Verified' },
    { icon: '✨', text: 'Free Forever' }
  ]

  return (
    <div style={{
      margin: '0 auto 64px',
      maxWidth: 1000,
      padding: '20px',
      borderRadius: 24,
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: 20,
      backdropFilter: 'blur(10px)',
      position: 'relative',
      zIndex: 2,
    }} className="trust-bar">
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--text2)',
          letterSpacing: '0.02em',
        }}>
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <span>{item.text}</span>
        </div>
      ))}
      <style jsx>{`
        .trust-bar {
          animation: slide-up 0.8s var(--ease) forwards;
        }
        @media (max-width: 768px) {
          .trust-bar {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
