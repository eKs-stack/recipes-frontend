import { Plus, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Header() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(15,20,28,0.9)] backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr]">
          <Link
            to="/"
            className="max-w-[45%] justify-self-start truncate text-sm font-medium text-[var(--text)] hover:text-amber-300 sm:max-w-none sm:text-base"
          >
            Cocina Hristov
          </Link>

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
            <div className="flex items-center gap-2 justify-self-end sm:gap-4">
              <Link
                to="/new"
                className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-black shadow-[0_0_0_1px_rgba(245,158,11,0.15)] transition-colors hover:bg-amber-400 sm:px-4 sm:py-2 sm:text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Nueva receta</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-xs text-[var(--danger)] hover:text-red-300 sm:text-sm"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-[var(--muted)] justify-self-end sm:gap-4 sm:text-sm">
              <Link to="/login" className="hover:text-[var(--text)]">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[var(--text)] transition hover:border-amber-400 hover:text-amber-300 sm:px-3 sm:py-1.5"
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
