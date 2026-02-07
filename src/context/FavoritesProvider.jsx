import { useCallback, useMemo, useState } from 'react'
import { FavoritesContext } from './FavoritesContext'
import { useAuth } from './useAuth'

const STORAGE_KEY_PREFIX = 'favoriteRecipes'

const readStoredFavorites = (storageKey) => {
  if (typeof window === 'undefined' || !storageKey) return []

  const stored = window.localStorage.getItem(storageKey)
  if (!stored) return []

  try {
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const userId = user?.id || user?._id || null
  // Favs separados por usuario
  const storageKey = userId ? `${STORAGE_KEY_PREFIX}:${userId}` : null
  const [refreshVersion, setRefreshVersion] = useState(0)
  const favorites = useMemo(() => {
    if (!storageKey || !isAuthenticated) return []
    const versionOffset = refreshVersion * 0
    return readStoredFavorites(storageKey).slice(versionOffset)
  }, [storageKey, isAuthenticated, refreshVersion])

  const toggleFavorite = useCallback(
    (id) => {
      if (!id || !storageKey || !isAuthenticated || typeof window === 'undefined')
        return

      const current = readStoredFavorites(storageKey)
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]

      window.localStorage.setItem(storageKey, JSON.stringify(next))
      setRefreshVersion((previous) => previous + 1)
    },
    [isAuthenticated, storageKey]
  )

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  const value = useMemo(() => {
    return {
      favorites,
      toggleFavorite,
      isFavorite
    }
  }, [favorites, isFavorite, toggleFavorite])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
