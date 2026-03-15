import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAuth } from '../lib/useAuth'
import { 
  getUserProfile, 
  removeTool 
} from '../lib/userProfile'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState(null)
  const [activeTab, setActiveTab] 
    = useState('saved')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?from=/profile')
    }
    if (user) {
      getUserProfile(user.uid)
        .then(setProfile)
    }
  }, [user, loading])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/')
  }

  const handleRemoveTool = async (toolId) => {
    await removeTool(user.uid, toolId)
    setProfile(prev => ({
      ...prev,
      savedTools: prev.savedTools
        .filter(id => id !== toolId)
    }))
  }

  if (loading || !profile) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      color: 'var(--text-tertiary)',
      fontSize: 14,
    }}>
      Loading...
    </div>
  )

  return (
    <>
      <Head>
        <title>
          {profile.name || 'Profile'} — AITDL
        </title>
        <link rel="canonical" 
          href="https://aitdl.com/profile/" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: '24px',
      }}>
        <div style={{
          maxWidth: 640,
          margin: '0 auto',
        }}>

          {/* Back */}
          <a href="/" style={{
            fontSize: 12,
            color: 'var(--text-tertiary)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            marginBottom: 24,
          }}>
            ← Back to AITDL
          </a>

          {/* Profile Header */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: 24,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={profile.name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  border: '2px solid var(--accent)',
                }}
              />
            ) : (
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 800,
                color: '#fff',
              }}>
                {(profile.name || 
                  profile.email || 'U')
                  [0].toUpperCase()}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: 20,
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: 4,
                fontFamily: 'Outfit',
              }}>
                {profile.name || 'AITDL User'}
              </h1>
              <p style={{
                fontSize: 13,
                color: 'var(--text-tertiary)',
              }}>
                {profile.email}
              </p>
              <p style={{
                fontSize: 11,
                color: 'var(--text-tertiary)',
                marginTop: 2,
              }}>
                via {profile.provider
                  ?.replace('.com', '') || 'email'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 8,
                color: 'var(--text-tertiary)',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 
              'repeat(3, 1fr)',
            gap: 10,
            marginBottom: 20,
          }}>
            {[
              ['❤️', profile.savedTools?.length || 0, 'Saved Tools'],
              ['📋', profile.toolLists?.length || 0, 'Tool Lists'],
              ['🔍', profile.searchHistory?.length || 0, 'Searches'],
            ].map(([icon, count, label]) => (
              <div key={label} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '16px 12px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 20,
                  marginBottom: 4,
                }}>
                  {icon}
                </div>
                <div style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: 'var(--accent)',
                  fontFamily: 'Outfit',
                }}>
                  {count}
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'var(--text-tertiary)',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: 4,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: 4,
            marginBottom: 16,
          }}>
            {[
              ['saved', '❤️ Saved'],
              ['lists', '📋 Lists'],
              ['history', '🔍 History'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: activeTab === id
                    ? 'var(--bg-primary)'
                    : 'transparent',
                  border: activeTab === id
                    ? '1px solid var(--border)'
                    : '1px solid transparent',
                  borderRadius: 8,
                  color: activeTab === id
                    ? 'var(--accent)'
                    : 'var(--text-tertiary)',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: 20,
            minHeight: 200,
          }}>

            {/* Saved Tools */}
            {activeTab === 'saved' && (
              profile.savedTools?.length > 0 
              ? (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 10 
                }}>
                  {profile.savedTools.map(id => (
                    <div key={id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 
                        'space-between',
                      padding: '10px 14px',
                      background: 
                        'var(--bg-tertiary)',
                      border: 
                        '1px solid var(--border)',
                      borderRadius: 10,
                    }}>
                      <a href={`/tools/${id}/`}
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: 'var(--accent)',
                          textDecoration: 'none',
                        }}>
                        {id}
                      </a>
                      <button
                        onClick={() => 
                          handleRemoveTool(id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 
                            'var(--text-tertiary)',
                          cursor: 'pointer',
                          fontSize: 14,
                        }}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  color: 'var(--text-tertiary)',
                  fontSize: 13,
                  padding: '40px 0',
                }}>
                  No saved tools yet.<br />
                  <a href="/" style={{
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}>
                    Explore tools →
                  </a>
                </div>
              )
            )}

            {/* Tool Lists */}
            {activeTab === 'lists' && (
              <div style={{
                textAlign: 'center',
                color: 'var(--text-tertiary)',
                fontSize: 13,
                padding: '40px 0',
              }}>
                Custom lists coming soon 🚀
              </div>
            )}

            {/* Search History */}
            {activeTab === 'history' && (
              profile.searchHistory?.length > 0
              ? (
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 8 
                }}>
                  {profile.searchHistory
                    .map(q => (
                    <span key={q} style={{
                      padding: '5px 12px',
                      background: 
                        'var(--bg-tertiary)',
                      border: 
                        '1px solid var(--border)',
                      borderRadius: 99,
                      fontSize: 12,
                      color: 
                        'var(--text-secondary)',
                    }}>
                      🔍 {q}
                    </span>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  color: 'var(--text-tertiary)',
                  fontSize: 13,
                  padding: '40px 0',
                }}>
                  No search history yet.
                </div>
              )
            )}
          </div>

        </div>
      </div>
    </>
  )
}
