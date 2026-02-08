import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function AdminRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth()

  // Espera a resolver sesión para evitar flicker y redirecciones falsas.
  if (loading) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin') {
    // La autorización real está en backend; esto solo mejora UX.
    return <Navigate to="/" replace />
  }

  return children
}
