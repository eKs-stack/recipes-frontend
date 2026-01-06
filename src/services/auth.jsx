import axios from 'axios'
import { API_URL, getAuthHeaders } from './api'

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data)
  return res.data
}

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data)
  return res.data
}

export const getCurrentUser = async () => {
  const res = await axios.get(`${API_URL}/auth/me`, {
    headers: getAuthHeaders()
  })
  return res.data
}
