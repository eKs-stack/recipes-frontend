import { useCallback, useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from './FavoritesContext'
import { useAuth } from './useAuth'
import { getFavoriteRecipes, toggleFavoriteRecipe } from '../services/recipes'

const mapFavoriteIds = (recipes) => {
  if (!Array.isArray(recipes)) return []
  return recipes
    .map((recipe) => recipe?._id)
    .filter((value) => typeof value === 'string')
}

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const userId = user?.id || user?._id || null
  const [favoriteIds, setFavoriteIds] = useState([])

  useEffect(() => {
    let active = true
    if (!isAuthenticated || !userId) return

    const loadFavorites = async () => {
      try {
        const recipes = await getFavoriteRecipes()
        if (!active) return
        setFavoriteIds(mapFavoriteIds(recipes))
      } catch {
        if (active) setFavoriteIds([])
      }
    }

    loadFavorites()

    return () => {
      active = false
    }
  }, [isAuthenticated, userId])

  const favorites = useMemo(
    () => (isAuthenticated ? favoriteIds : []),
    [favoriteIds, isAuthenticated]
  )

  const toggleFavorite = useCallback(
    async (id) => {
      if (!id || !isAuthenticated) return

      try {
        const response = await toggleFavoriteRecipe(id)
        const nextFavorite = Boolean(response?.isFavorite)

        setFavoriteIds((previous) => {
          if (nextFavorite) {
            return previous.includes(id) ? previous : [...previous, id]
          }
          return previous.filter((value) => value !== id)
        })
      } catch (error) {
        void error
      }
    },
    [isAuthenticated]
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
