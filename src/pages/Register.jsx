import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/auth'
import { useAuth } from '../context/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await registerUser({
        username,
        email,
        password
      })

      const authToken = data?.token || data?.accessToken || data?.jwt
      const authUser = data?.user || data?.profile

      if (!authToken || !authUser) {
        setError('Respuesta inválida del servidor de autenticación')
        return
      }

      login(authToken, authUser)
      navigate('/')
    } catch {
      setError('Error al registrar usuario')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-6">Registro</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Crear cuenta
        </button>
      </form>

      <p className="text-sm mt-4">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register
