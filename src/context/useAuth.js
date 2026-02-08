/**
 * Aqui expongo un hook simple para consumir AuthContext.
 */
import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const useAuth = () => {
  return useContext(AuthContext)
}
