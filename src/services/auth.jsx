/**
 * Aqui hago las peticiones de autenticacion con envio de credenciales.
 */
import axios from 'axios'
import { API_URL } from './api'

export const loginUser = async (data) => {
  // withCredentials permite enviar/recibir cookie de sesión entre dominios.
  const res = await axios.post(`${API_URL}/auth/login`, data, {
    withCredentials: true
  })
  return res.data
}

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data, {
    withCredentials: true
  })
  return res.data
}

export const getCurrentUser = async () => {
  // /auth/me valida la cookie httpOnly y devuelve el perfil autenticado.
  const res = await axios.get(`${API_URL}/auth/me`, {
    withCredentials: true
  })
  return res.data
}

export const logoutUser = async () => {
  await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      withCredentials: true
    }
  )
}
