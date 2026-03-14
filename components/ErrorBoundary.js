import React from 'react'

class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
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
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>Kuch galat hua 😕</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
            Technical error ki wajah se page load nahi ho saka.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '16px 40px',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 10px 30px var(--accent-glow)'
            }}
          >
            Reload karo
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
