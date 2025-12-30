import { useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from './FavoritesContext'

const STORAGE_KEY = 'favoriteRecipes'

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    try {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) => {
    if (!id) return
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
