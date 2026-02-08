/**
 * Aqui centralizo la URL base de la API usando variables de entorno.
 */
export const API_URL =
  import.meta.env.VITE_API_URL || 'https://recipes-backend-gilt.vercel.app/api'
