import { useCallback, useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from './FavoritesContext'
import { useAuth } from './useAuth'

const STORAGE_KEY_PREFIX = 'favoriteRecipes'

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const userId = user?.id || user?._id || null
  // Favs separados por usuario
  const storageKey = userId ? `${STORAGE_KEY_PREFIX}:${userId}` : null
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (!storageKey || !isAuthenticated) {
      setFavorites([])
      return
    }
    const stored = localStorage.getItem(storageKey)
    if (!stored) {
      setFavorites([])
      return
    }
    try {
      const parsed = JSON.parse(stored)
      setFavorites(Array.isArray(parsed) ? parsed : [])
    } catch {
      setFavorites([])
    }
  }, [storageKey, isAuthenticated])

  useEffect(() => {
    if (!storageKey || !isAuthenticated) return
    localStorage.setItem(storageKey, JSON.stringify(favorites))
  }, [favorites, storageKey, isAuthenticated])

  const toggleFavorite = useCallback(
    (id) => {
      if (!id || !storageKey || !isAuthenticated) return
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
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
