/**
 * Aqui expongo un hook simple para consumir FavoritesContext.
 */
import { useContext } from 'react'
import { FavoritesContext } from './FavoritesContext'

export const useFavorites = () => {
  return useContext(FavoritesContext)
}
