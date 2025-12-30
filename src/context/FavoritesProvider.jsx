import { useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from './FavoritesContext'
import { useAuth } from './useAuth'

const STORAGE_KEY_PREFIX = 'favoriteRecipes'

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const userId = user?.id || user?._id || null
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

  const toggleFavorite = (id) => {
    if (!id || !storageKey || !isAuthenticated) return
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const value = useMemo(() => {
    return {
      favorites,
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id)
    }
  }, [favorites])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
