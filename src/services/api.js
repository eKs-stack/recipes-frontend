export const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://recipes-backend-gilt.vercel.app/api'

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}
