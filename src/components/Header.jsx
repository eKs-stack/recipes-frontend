import { Plus, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(15,20,28,0.9)] backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center">
          <div className="justify-self-start text-sm font-medium text-[var(--text)]">
            Cocina Hristov
          </div>

          <nav className="hidden justify-self-center md:flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link to="/" className="hover:text-[var(--text)]">
              Home
            </Link>

            {isAuthenticated && (
              <Link to="/favoritos" className="hover:text-[var(--text)]">
                Favoritos
              </Link>
            )}

            {isAuthenticated && (
              <Link to="/mis-recetas" className="hover:text-[var(--text)]">
                Mis recetas
              </Link>
            )}
          </nav>

          {isAuthenticated ? (
            <div className="justify-self-end flex items-center gap-4">
              <Link
                to="/new"
                className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(245,158,11,0.15)] transition-colors hover:bg-amber-400"
              >
                <Plus className="h-4 w-4" />
                <span>Nueva receta</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm text-[var(--danger)] hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            </div>
          ) : (
            <div className="justify-self-end flex items-center gap-4 text-sm text-[var(--muted)]">
              <Link to="/login" className="hover:text-[var(--text)]">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-[var(--border)] px-3 py-1.5 text-[var(--text)] hover:border-amber-400 hover:text-amber-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
