import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { registerUser } from '../services/auth'
import { useAuth } from '../context/useAuth'
import { showError } from '../utils/alerts'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
        showError('Respuesta inválida del servidor de autenticación')
        return
      }

      login(authToken, authUser)
      navigate('/')
    } catch {
      showError('Error al registrar usuario')
    }
  }

  return (
    <div className="page-fade mx-auto mt-16 max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)]">
      <h2 className="mb-2 text-2xl font-semibold">Registro</h2>
      <p className="mb-6 text-sm text-[var(--muted)]">
        Crea una cuenta para guardar tus recetas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="register-username"
            className="mb-1 block text-sm font-medium text-[var(--muted)]"
          >
            Nombre de usuario
          </label>
          <input
            id="register-username"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-strong)] p-3 text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="mb-1 block text-sm font-medium text-[var(--muted)]"
          >
            Email
          </label>
          <input
            id="register-email"
            type="email"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-strong)] p-3 text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-1 block text-sm font-medium text-[var(--muted)]"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-strong)] p-3 pr-10 text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] transition hover:text-[var(--accent)]"
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <button className="w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-[var(--bg-0)] transition hover:bg-[var(--accent-2)]">
          Crear cuenta
        </button>
      </form>

      <p className="mt-4 text-sm text-[var(--muted)]">
        ¿Ya tienes cuenta?{' '}
        <Link
          to="/login"
          className="text-[var(--accent)] hover:text-[var(--accent-2)]"
        >
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register
