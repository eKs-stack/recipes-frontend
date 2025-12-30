import { useState } from 'react'
import { Plus, LogOut, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Header() {
  const { isAuthenticated, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev)
  }

  const closeMobile = () => {
    setMobileOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMobile()
  }
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(15,20,28,0.9)] backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr]">
          <Link
            to="/"
            className="max-w-[45%] justify-self-start truncate text-sm font-medium text-[var(--text)] hover:text-white sm:max-w-none sm:text-base"
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
            <div className="hidden items-center gap-2 justify-self-end sm:gap-4 md:flex">
              <Link
                to="/new"
                className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-[var(--bg-0)] shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/90 sm:px-4 sm:py-2 sm:text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Nueva receta</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs text-[var(--danger)] hover:text-white/80 sm:text-sm"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 text-xs text-[var(--muted)] justify-self-end sm:gap-4 sm:text-sm md:flex">
              <Link to="/login" className="hover:text-[var(--text)]">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[var(--text)] transition hover:border-white hover:text-white sm:px-3 sm:py-1.5"
              >
                Register
              </Link>
            </div>
          )}
          <button
            type="button"
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card-strong)] p-2 text-[var(--text)] transition hover:border-white md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
        {mobileOpen && (
          <div
            id="mobile-nav"
            className="md:hidden border-t border-[var(--border)] py-4"
          >
            <nav className="space-y-2 text-sm text-[var(--muted)]">
              <Link
                to="/"
                onClick={closeMobile}
                className="block rounded-lg px-3 py-2 transition hover:bg-[var(--card-strong)] hover:text-white"
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link
                  to="/favoritos"
                  onClick={closeMobile}
                  className="block rounded-lg px-3 py-2 transition hover:bg-[var(--card-strong)] hover:text-white"
                >
                  Favoritos
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to="/mis-recetas"
                  onClick={closeMobile}
                  className="block rounded-lg px-3 py-2 transition hover:bg-[var(--card-strong)] hover:text-white"
                >
                  Mis recetas
                </Link>
              )}
            </nav>
            <div className="mt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/new"
                    onClick={closeMobile}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--bg-0)] shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/90"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nueva receta</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--danger)] transition hover:border-white hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Salir
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="flex items-center justify-center rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--text)] transition hover:border-white hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="flex items-center justify-center rounded-lg bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--bg-0)] transition hover:bg-white/90"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
