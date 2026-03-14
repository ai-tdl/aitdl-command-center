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

export default function Footer() {
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
            India's most versatile AI technology ecosystem. 
            Empowering 1.4 Billion minds with the right tools.
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
          }}>Platform</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['Explore Tools', '/'],
              ['AI Battle', '/ai-battle'],
              ['Comparison Engine', '/compare'],
              ['About the Project', '/about'],
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
          }}>Connect</div>
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
        paddingTop: 32,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 12,
          color: 'var(--text3)',
          lineHeight: 2,
        }}>
          Built with ❤️ for Bharat by 
          <span style={{ color: 'var(--text)', fontWeight: 700, marginLeft: 6 }}>
            Jawahar Ramkripal Mallah
          </span>
          <br />
          Software Developer since 2007 | Published Author
          <br />
          <span style={{ opacity: 0.6 }}>© 2025 AITDL — All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}
