import { useCallback, useEffect, useRef, useState } from 'react'
import { AuthContext } from './AuthContext'
import { getCurrentUser, logoutUser } from '../services/auth'

const REFRESH_INTERVAL_MS = 60000

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // evita refrescar el perfil a la vez
  const refreshInFlight = useRef(false)

  const login = useCallback((authUser) => {
    setUser(authUser)
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch {
      // noop: limpiar estado local incluso si falla el request
    } finally {
      setUser(null)
    }
  }, [])

  const refreshUser = useCallback(
    async ({ silent = false } = {}) => {
      if (refreshInFlight.current) {
        if (!silent) setLoading(false)
        return
      }

      refreshInFlight.current = true
      try {
        // El backend decide la sesión real leyendo cookie httpOnly en /auth/me.
        const data = await getCurrentUser()
        const authUser = data?.user || data?.profile || data
        if (!authUser) {
          throw new Error('Invalid user response')
        }
        setUser(authUser)
      } catch (error) {
        const status = error?.response?.status
        if (status === 401 || status === 403) {
          setUser(null)
        }
      } finally {
        refreshInFlight.current = false
        if (!silent) {
          setLoading(false)
        }
      }
    },
    []
  )

  useEffect(() => {
    // Al abrir la app, intentamos restaurar sesión sin depender de localStorage.
    refreshUser()
  }, [refreshUser])

  useEffect(() => {
    if (!user) return

    const handleFocus = () => {
      // Refresca permisos/rol al volver a la pestaña.
      refreshUser({ silent: true })
    }

    const intervalId = setInterval(() => {
      refreshUser({ silent: true })
    }, REFRESH_INTERVAL_MS)

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
      clearInterval(intervalId)
    }
  }, [user, refreshUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
