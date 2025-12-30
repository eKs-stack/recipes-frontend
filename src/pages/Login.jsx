import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/auth'
import { useAuth } from '../context/useAuth'
import { showError } from '../utils/alerts'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = identifier.includes('@')
        ? { email: identifier, password }
        : { username: identifier, password }

      const data = await loginUser(payload)
      const authToken = data?.token || data?.accessToken || data?.jwt
      const authUser = data?.user || data?.profile

      if (!authToken || !authUser) {
        showError('Respuesta inválida del servidor de autenticación')
        return
      }

      login(authToken, authUser)
      navigate('/')
    } catch {
      showError('Email o contraseña incorrectos')
    }
  }

  return (
    <div className="page-fade mx-auto mt-16 max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)]">
      <h2 className="mb-2 text-2xl font-semibold">Login</h2>
      <p className="mb-6 text-sm text-[var(--muted)]">
        Accede con tu email o usuario.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-strong)] p-3 text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
          placeholder="Email o usuario"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-strong)] p-3 text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-[var(--bg-0)] transition hover:bg-[var(--accent-2)]">
          Entrar
        </button>
      </form>

      <p className="mt-4 text-sm text-[var(--muted)]">
        ¿No tienes cuenta?{' '}
        <Link
          to="/register"
          className="text-[var(--accent)] hover:text-[var(--accent-2)]"
        >
          Regístrate
        </Link>
      </p>
    </div>
  )
}

export default Login
