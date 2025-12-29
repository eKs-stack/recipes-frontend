export const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://recipes-backend-d7dm.onrender.com/api'

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}
