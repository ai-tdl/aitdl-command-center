import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { 
  auth, 
  googleProvider, 
  githubProvider 
} from '../lib/firebase'
import { saveUserProfile } 
  from '../lib/userProfile'

export default function LoginPage() {
  const router   = useRouter()
  const [tab, setTab]       = useState('login')
  const [email, setEmail]   = useState('')
  const [pass, setPass]     = useState('')
  const [name, setName]     = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [reset, setReset]   = useState(false)

  const afterLogin = async (user) => {
    await saveUserProfile(user)
    router.push(
      router.query.from || '/profile')
  }

  const handleGoogle = async () => {
    setLoading(true); setError('')
    try {
      const r = await signInWithPopup(
        auth, googleProvider)
      await afterLogin(r.user)
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  const handleGithub = async () => {
    setLoading(true); setError('')
    try {
      const r = await signInWithPopup(
        auth, githubProvider)
      await afterLogin(r.user)
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  const handleEmail = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      let r
      if (tab === 'login') {
        r = await signInWithEmailAndPassword(
          auth, email, pass)
      } else {
        r = await createUserWithEmailAndPassword(
          auth, email, pass)
      }
      await afterLogin(r.user)
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await sendPasswordResetEmail(auth, email)
      setReset(true)
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  return (
    <>
      <Head>
        <title>Login — AITDL</title>
        <meta name="description" 
          content="Login to AITDL — Save your favourite AI tools, sync preferences." />
        <link rel="canonical" 
          href="https://aitdl.com/login/" />
      </Head>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'var(--bg-primary)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 400,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: 32,
        }}>

          {/* Logo */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 28 
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: 800,
              color: 'var(--accent)',
              letterSpacing: '-0.02em',
              fontFamily: 'Outfit',
            }}>⚡ AITDL</div>
            <p style={{
              fontSize: 13,
              color: 'var(--text-tertiary)',
              marginTop: 4,
            }}>
              India's AI Command Center
            </p>
          </div>

          {/* Social Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 10,
            marginBottom: 20,
          }}>
            <button
              onClick={handleGoogle}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '12px 20px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                color: 'var(--text-secondary)',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span>🟡</span>
              Continue with Google
            </button>

            <button
              onClick={handleGithub}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '12px 20px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                color: 'var(--text-secondary)',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span>⚫</span>
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
            <div style={{ 
              flex: 1, height: 1, 
              background: 'var(--border)' 
            }} />
            <span style={{ 
              fontSize: 11, 
              color: 'var(--text-tertiary)' 
            }}>
              or
            </span>
            <div style={{ 
              flex: 1, height: 1, 
              background: 'var(--border)' 
            }} />
          </div>

          {/* Tab — Login / Register */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-tertiary)',
            borderRadius: 10,
            padding: 4,
            marginBottom: 20,
          }}>
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => {
                  setTab(t); setError('')
                }}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: tab === t 
                    ? 'var(--bg-secondary)' 
                    : 'transparent',
                  border: tab === t 
                    ? '1px solid var(--border)' 
                    : '1px solid transparent',
                  borderRadius: 8,
                  color: tab === t 
                    ? 'var(--accent)' 
                    : 'var(--text-tertiary)',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s',
                }}
              >
                {t === 'login' 
                  ? '🔑 Login' 
                  : '✨ Register'}
              </button>
            ))}
          </div>

          {/* Email Form */}
          {reset ? (
            <div style={{
              textAlign: 'center',
              padding: '20px',
              color: 'var(--text-secondary)',
              fontSize: 13,
            }}>
              ✅ Reset email sent to {email}!
              <br />
              <button
                onClick={() => setReset(false)}
                style={{
                  marginTop: 12,
                  color: 'var(--accent)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmail}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 12 
              }}>
              {tab === 'register' && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => 
                    setName(e.target.value)}
                  required
                  style={{
                    padding: '12px 14px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    color: 'var(--text-primary)',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => 
                  setEmail(e.target.value)}
                required
                style={{
                  padding: '12px 14px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={e => 
                  setPass(e.target.value)}
                required
                minLength={6}
                style={{
                  padding: '12px 14px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  outline: 'none',
                }}
              />

              {error && (
                <p style={{
                  fontSize: 12,
                  color: '#ff4444',
                  padding: '8px 12px',
                  background: 'rgba(255,68,68,0.1)',
                  borderRadius: 8,
                  border: '1px solid rgba(255,68,68,0.2)',
                }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '13px',
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? '...' : 
                  tab === 'login' 
                    ? '🔑 Login' 
                    : '✨ Create Account'}
              </button>

              {tab === 'login' && (
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    fontSize: 12,
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  Forgot password?
                </button>
              )}
            </form>
          )}

          {/* Back to home */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: 20 
          }}>
            <a href="/" style={{
              fontSize: 12,
              color: 'var(--text-tertiary)',
              textDecoration: 'none',
            }}>
              ← Back to AITDL
            </a>
          </div>

        </div>
      </div>
    </>
  )
}
