export default function NotFound() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      background: 'var(--bg-primary)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{fontSize: 64}}>🤖</div>
      <h1 style={{
        color: 'var(--text-primary)',
        fontSize: 32,
        fontWeight: 700,
        margin: '16px 0 8px',
        fontFamily: 'monospace',
      }}>
        404
      </h1>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: 14,
        marginBottom: 24,
      }}>
        Yeh page nahi mila bhai 😕
      </p>
      <a href="/" style={{
        background: 'var(--accent)',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: 8,
        textDecoration: 'none',
        fontFamily: 'monospace',
        fontWeight: 600,
        fontSize: 13,
      }}>
        Wapas Home Jao →
      </a>
    </div>
  )
}
