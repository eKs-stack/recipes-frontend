import { useCallback, useEffect, useRef, useState } from 'react'
import { AuthContext } from './AuthContext'
import { getCurrentUser } from '../services/auth'

const REFRESH_INTERVAL_MS = 60000

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  // evita refrescar el perfil a la vez
  const refreshInFlight = useRef(false)

  const login = useCallback((authToken, authUser) => {
    localStorage.setItem('token', authToken)
    localStorage.removeItem('user')
    setToken(authToken)
    setUser(authUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  const refreshUser = useCallback(
    async ({ silent = false } = {}) => {
      if (refreshInFlight.current) {
        if (!silent) setLoading(false)
        return
      }

      const storedToken = localStorage.getItem('token')
      if (!storedToken) {
        if (!silent) setLoading(false)
        return
      }

      refreshInFlight.current = true
      try {
        const data = await getCurrentUser()
        const authUser = data?.user || data?.profile || data
        if (!authUser) {
          throw new Error('Invalid user response')
        }
        setUser(authUser)
      } catch (error) {
        const status = error?.response?.status
        if (status === 401 || status === 403) {
          logout()
        }
      } finally {
        refreshInFlight.current = false
        if (!silent) {
          setLoading(false)
        }
      }
    },
    [logout]
  )

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      refreshUser()
      return
    }
    localStorage.removeItem('user')
    setLoading(false)
  }, [refreshUser])

  useEffect(() => {
    if (!token) return

    const handleFocus = () => {
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
  }, [token, refreshUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
