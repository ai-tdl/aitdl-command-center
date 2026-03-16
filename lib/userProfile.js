import { doc, setDoc, getDoc, updateDoc } 
  from 'firebase/firestore'
import { db } from './firebase'

// Create or update user profile
export async function saveUserProfile(user) {
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)
  
  if (!snap.exists()) {
    // New user — create profile
    await setDoc(ref, {
      uid:         user.uid,
      name:        user.displayName || '',
      email:       user.email || '',
      photo:       user.photoURL || '',
      provider:    user.providerData[0]
                     ?.providerId || '',
      savedTools:  [],
      toolLists:   [],
      searchHistory: [],
      preferences: {
        theme:    'light',
        lang:     'en',
        fontSize: 'medium',
        accent:   '#FF6B35',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  } else {
    // Existing user — update last seen
    await updateDoc(ref, {
      updatedAt: new Date().toISOString(),
      name:  user.displayName || snap.data().name,
      photo: user.photoURL    || snap.data().photo,
    })
  }
  return (await getDoc(ref)).data()
}

// Get user profile
export async function getUserProfile(uid) {
  const snap = await getDoc(
    doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

// Save tool to favourites
export async function saveTool(uid, toolId) {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const saved = snap.data().savedTools || []
  if (saved.includes(toolId)) return
  await updateDoc(ref, {
    savedTools: [...saved, toolId],
    updatedAt: new Date().toISOString(),
  })
}

// Remove tool from favourites
export async function removeTool(uid, toolId) {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  await updateDoc(ref, {
    savedTools: snap.data().savedTools
      .filter(id => id !== toolId),
    updatedAt: new Date().toISOString(),
  })
}

// Save preferences
export async function savePreferences(
  uid, prefs) {
  await updateDoc(doc(db, 'users', uid), {
    preferences: prefs,
    updatedAt: new Date().toISOString(),
  })
}

// Save dashboard module preferences
export async function saveDashboardModules(uid, modules) {
  await updateDoc(doc(db, 'users', uid), {
    dashboardModules: modules,
    updatedAt: new Date().toISOString(),
  })
}

// Add to search history
export async function addSearchHistory(
  uid, query) {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const history = snap.data()
    .searchHistory || []
  const updated = [
    query,
    ...history.filter(q => q !== query)
  ].slice(0, 20) // keep last 20
  await updateDoc(ref, {
    searchHistory: updated,
    updatedAt: new Date().toISOString(),
  })
}
