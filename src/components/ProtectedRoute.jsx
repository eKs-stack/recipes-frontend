import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  // Evita redirigir antes de conocer si existe sesión activa.
  if (loading) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
