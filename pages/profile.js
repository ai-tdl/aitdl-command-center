import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { signOut } from 'firebase/auth'
import { auth, db } from '../lib/firebase'
import { useAuth } from '../lib/useAuth'
import { 
  getUserProfile, 
  removeTool,
  saveDashboardModules
} from '../lib/userProfile'

const ALL_MODULES = [
  { id: 'DeploymentStatus', label: '🚀 Deployment Status', desc: 'Real-time production deploy status' },
  { id: 'HealthMonitor', label: '💓 Health Monitor', desc: 'Site uptime and response rates' },
  { id: 'PerformancePulse', label: '⚡ Performance Pulse', desc: 'Real-time latency analytics chart' },
  { id: 'IncidentTracker', label: '🛡️ Incident Tracker', desc: 'Error monitoring and log analysis' },
  { id: 'ReleaseManager', label: '📦 Release Manager', desc: 'Production version history' },
  { id: 'BackupManager', label: '🔒 Backup Manager', desc: 'Data safety and manual backups' },
  { id: 'Timeline', label: '📅 Workflow Timeline', desc: 'GitHub Actions history' },
  { id: 'RepoActivity', label: '📁 Repo Activity', desc: 'Recent commits and code changes' },
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState(null)
  const [activeTab, setActiveTab ] = useState('saved')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?from=/profile')
    }
    if (user) {
      getUserProfile(user.uid).then(setProfile)
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
      savedTools: prev.savedTools.filter(id => id !== toolId)
    }))
  }

  const toggleModule = async (moduleId) => {
    if (updating) return
    setUpdating(true)
    const currentModules = profile.dashboardModules || []
    const newModules = currentModules.includes(moduleId)
      ? currentModules.filter(id => id !== moduleId)
      : [...currentModules, moduleId]
    
    try {
      await saveDashboardModules(user.uid, newModules)
      setProfile(prev => ({ ...prev, dashboardModules: newModules }))
    } catch (err) {
      console.error("Failed to update modules", err)
    } finally {
      setUpdating(false)
    }
  }

  if (loading || !profile) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'Outfit',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      fontSize: 12,
    }}>
      <div className="animate-pulse">Initializing Profile...</div>
    </div>
  )

  return (
    <>
      <Head>
        <title>{profile.name || 'Profile'} — AITDL Command Center</title>
        <link rel="canonical" href="https://aitdl.com/profile/" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: '40px 24px',
        color: 'var(--text-primary)',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          maxWidth: 800,
          margin: '0 auto',
        }}>

          {/* Back Navigation */}
          <a href="/" style={{
            fontSize: 12,
            color: 'var(--text-tertiary)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 32,
            fontWeight: 600,
            transition: 'color 0.2s'
          }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-tertiary)'}>
            ← RETURN TO SITE
          </a>

          {/* Profile Header (Premium Glass) */}
          <div style={{
            background: 'var(--glass-card-bg)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            borderRadius: 32,
            padding: 40,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={profile.name}
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 24,
                  border: '2px solid #5e11ff',
                  boxShadow: '0 0 20px rgba(94, 17, 255, 0.3)'
                }}
              />
            ) : (
              <div style={{
                width: 96,
                height: 96,
                borderRadius: 24,
                background: 'linear-gradient(135deg, #5e11ff 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 800,
                color: '#fff',
              }}>
                {(profile.name || profile.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <h1 style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  fontFamily: 'Outfit',
                  letterSpacing: '-0.02em'
                }}>
                  {profile.name || 'AITDL Operator'}
                </h1>
                <span style={{ background: 'rgba(94,17,255,0.1)', color: '#5e11ff', border: '1px solid rgba(94,17,255,0.2)', padding: '2px 10px', borderRadius: 99, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified User</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>{profile.email}</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                 <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Provider: <b>{profile.provider?.replace('.com', '') || 'Native'}</b></div>
                 <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID: <b>{user.uid.substring(0, 8)}...</b></div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                color: '#ff4444',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,68,68,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,68,68,0.2)' }}
              onMouseOut={e => { e.currentTarget.style.background = 'var(--bg-tertiary)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              Sign Out
            </button>
          </div>

          {/* Main Dashboard Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 24,
          }}>
            {[
              ['❤️', profile.savedTools?.length || 0, 'Saved Tools'],
              ['📋', profile.toolLists?.length || 0, 'Custom Lists'],
              ['🔍', profile.searchHistory?.length || 0, 'Analytic Queries'],
              user?.isAdmin ? ['⚙️', (profile.dashboardModules || []).length, 'Active Modules'] : null,
            ].filter(Boolean).map(([icon, count, label]) => (
              <div key={label} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 24,
                padding: '24px 16px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', fontFamily: 'Outfit', lineHeight: 1 }}>{count}</div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700, marginTop: 8, letterSpacing: '0.02em' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            gap: 8,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: 8,
            marginBottom: 24,
          }}>
            {[
              ['saved', '❤️ SAVED TOOLS'],
              ['lists', '📋 LISTS'],
              ['history', '🔍 HISTORY'],
              user?.isAdmin && ['settings', '⚙️ SETTINGS'],
            ].filter(Boolean).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: activeTab === id ? 'var(--accent)' : 'transparent',
                  border: 'none',
                  borderRadius: 12,
                  color: activeTab === id ? '#fff' : 'var(--text-tertiary)',
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.05em'
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div style={{
            background: 'var(--glass-card-bg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border)',
            borderRadius: 32,
            padding: 32,
            minHeight: 400,
          }}>

            {activeTab === 'saved' && (
              profile.savedTools?.length > 0 
              ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {profile.savedTools.map(id => (
                    <div key={id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: 16,
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 800 }}>MODULE</span>
                        <a href={`/tools/${id}/`} style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
                      </div>
                      <button onClick={() => handleRemoveTool(id)} style={{ background: 'var(--border)', border: 'none', height: 32, width: 32, borderRadius: 8, color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '80px 0' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>Your workspace is empty.</p>
                  <a href="/" style={{ color: '#5e11ff', textDecoration: 'none', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid rgba(94,17,255,0.3)', padding: '10px 20px', borderRadius: 99 }}>Explore Features</a>
                </div>
              )
            )}

            {activeTab === 'settings' && (
              <div style={{ spaceY: 24 }}>
                <div style={{ marginBottom: 32 }}>
                   <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                     <span style={{ height: 4, width: 4, borderRadius: '50%', background: 'var(--accent)' }}></span>
                     Command Center Authorization
                   </h3>
                   <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Enable or disable specialized dashboard modules for your session. These settings persist across all devices.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {ALL_MODULES.map(mod => {
                    const isActive = (profile.dashboardModules || []).includes(mod.id);
                    return (
                      <div key={mod.id} style={{
                        padding: 20,
                        background: isActive ? 'var(--accent-glow)' : 'var(--card-bg)',
                        border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}>
                        <div style={{ overflow: 'hidden' }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: 2 }}>{mod.label}</p>
                          <p style={{ fontSize: 10, color: 'var(--text-tertiary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{mod.desc}</p>
                        </div>
                        <button 
                          disabled={updating}
                          onClick={() => toggleModule(mod.id)}
                          style={{
                            width: 36,
                            height: 20,
                            borderRadius: 99,
                            background: isActive ? 'var(--accent)' : 'var(--border)',
                            position: 'relative',
                            cursor: 'pointer',
                            border: 'none',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <div style={{
                            width: 14,
                            height: 14,
                            background: '#fff',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: 3,
                            left: isActive ? 19 : 3,
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                          }} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'lists' && (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
                <h4 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Restricted Area</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Personalized tool collections are currently in beta.</p>
              </div>
            )}

            {activeTab === 'history' && (
              profile.searchHistory?.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {profile.searchHistory.map(q => (
                    <span key={q} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>🔍 {q}</span>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-tertiary)', fontSize: 13 }}>No activity recorded yet.</div>
              )
            )}
          </div>

          <div style={{ marginTop: 24, padding: '0 20px', display: 'flex', justifyContent: 'space-between' }}>
             <p style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>OPERATOR CONSOLE v5.2.0</p>
             <p style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>© 2026 AITDL NETWORK</p>
          </div>

        </div>
      </div>
    </>
  )
}
