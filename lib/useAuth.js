import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

export function useAuth() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth, async (u) => {
        if (u) {
          const token = await u.getIdTokenResult()
          u.isAdmin = !!token.claims.admin
        }
        setUser(u)
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  return { user, loading }
}
