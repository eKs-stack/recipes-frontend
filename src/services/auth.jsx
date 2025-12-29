import axios from 'axios'
import { API_URL } from './api'

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data)
  return res.data
}

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data)
  return res.data
}
