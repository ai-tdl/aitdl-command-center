import Link from 'next/link'

export default function Custom404() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '100px 20px',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: 120, fontWeight: 900, marginBottom: 0, opacity: 0.1 }}>404</h1>
      <h2 style={{ fontSize: 32, marginTop: -40, marginBottom: 16 }}>Yeh page nahi mila 😕</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 500 }}>
        Shayad aap galat raste pe aa gaye hain. Niche button dabaiye aur sahi jagah wapas jaaiye.
      </p>
      <Link href="/" style={{
        padding: '16px 40px',
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: 50,
        fontSize: 14,
        fontWeight: 800,
        textDecoration: 'none',
        boxShadow: '0 10px 30px var(--accent-glow)',
        transition: 'transform 0.2s'
      }} className="hover:scale-105">
        Wapas jaao → Home
      </Link>
    </div>
  )
}
