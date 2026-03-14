export default function Footer() {
  return (
    <footer style={{
      borderTop: '0.5px solid var(--border)',
      padding: '32px 24px',
      marginTop: 48,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 
          'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 32,
        marginBottom: 32,
      }}>
        <div>
          <div style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 8,
          }}>AITDL</div>
          <div style={{
            fontSize: 13,
            color: 'var(--text3)',
            lineHeight: 1.6,
          }}>
            India's #1 AI Tools Platform
          </div>
        </div>
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text3)',
            letterSpacing: '0.08em',
            marginBottom: 12,
          }}>PLATFORM</div>
          {[
            ['All Tools', '/'],
            ['AI Battle', '/ai-battle'],
            ['Compare', '/compare'],
            ['About', '/about'],
          ].map(([label, href]) => (
            <a key={label} href={href} style={{
              display: 'block',
              fontSize: 13,
              color: 'var(--text2)',
              textDecoration: 'none',
              marginBottom: 8,
            }}>{label}</a>
          ))}
        </div>
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text3)',
            letterSpacing: '0.08em',
            marginBottom: 12,
          }}>CONTACT</div>
          <a href="mailto:hello@aitdl.com"
            style={{
              fontSize: 13,
              color: 'var(--accent)',
              textDecoration: 'none',
            }}>
            hello@aitdl.com
          </a>
        </div>
      </div>
      <div style={{
        borderTop: '0.5px solid var(--border)',
        paddingTop: 16,
        textAlign: 'center',
        fontSize: 11,
        color: 'var(--text3)',
        lineHeight: 1.8,
      }}>
        Built by{' '}
        <span style={{ 
          color: 'var(--text2)',
          fontWeight: 500,
        }}>
          Jawahar Ramkripal Mallah
        </span>
        <br/>
        Software Developer & Service Provider 
        since 2007 | Published Author
        <br/>
        © 2025 All Rights Reserved
      </div>
    </footer>
  )
}
