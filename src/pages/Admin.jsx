import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecipes, deleteRecipe } from '../services/recipes'
import { confirmDanger, showError } from '../utils/alerts'

const Admin = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const SKELETON_STORAGE_KEY = 'admin-recipes:count'
  const getStoredSkeletonCount = () => {
    if (typeof window === 'undefined') return 6
    const stored = Number.parseInt(
      window.localStorage.getItem(SKELETON_STORAGE_KEY),
      10
    )
    return Number.isFinite(stored) ? stored : 6
  }
  const [skeletonCount, setSkeletonCount] = useState(
    getStoredSkeletonCount
  )

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getRecipes()
        setRecipes(data)
        const nextCount = Array.isArray(data) ? data.length : 0
        setSkeletonCount(nextCount)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            SKELETON_STORAGE_KEY,
            String(nextCount)
          )
        }
      } catch {
        setError('No se pudieron cargar las recetas')
        showError('No se pudieron cargar las recetas')
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [])

  const handleDelete = async (recipeId) => {
    const confirmDelete = await confirmDanger({
      title: 'Eliminar receta',
      text: '¿Seguro que quieres eliminar esta receta?',
      confirmButtonText: 'Eliminar'
    })
    if (!confirmDelete.isConfirmed) return

    try {
      await deleteRecipe(recipeId)
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId))
    } catch {
      showError('No se pudo eliminar la receta')
    }
  }

  if (error) {
    return <p className="mt-20 text-center text-[var(--danger)]">{error}</p>
  }

  return (
    <main className="page-fade py-2">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Panel de admin</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Gestiona recetas de toda la comunidad.
          </p>
        </div>
        <span className="text-xs text-[var(--muted)]">
          {loading ? 'Cargando...' : `Total: ${recipes.length} recetas`}
        </span>
      </div>

      {loading ? (
        <div
          role="status"
          aria-live="polite"
          aria-label="Cargando recetas"
          className="space-y-3"
        >
          <span className="sr-only">Cargando recetas</span>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div
              key={`admin-skeleton-${index}`}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-2">
                <div className="h-3 w-40 rounded-full bg-[var(--border)] animate-pulse" />
                <div className="h-3 w-56 rounded-full bg-[var(--border)] animate-pulse" />
                <div className="h-3 w-32 rounded-full bg-[var(--border)] animate-pulse" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-7 w-14 rounded-full bg-[var(--border)] animate-pulse" />
                <div className="h-7 w-16 rounded-full bg-[var(--border)] animate-pulse" />
                <div className="h-7 w-16 rounded-full bg-[var(--border)] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] py-16 text-center">
          <p className="text-sm text-[var(--muted)]">
            No hay recetas para administrar.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[var(--text)]">
                  {recipe.title}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {recipe.category} · {recipe.difficulty} · {recipe.prepTime}{' '}
                  min
                </p>
                <p className="text-xs text-[var(--muted)]">
                  Autor: {recipe.owner?.username || 'Sin autor'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={`/recipes/${recipe._id}`}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Ver
                </Link>
                <Link
                  to={`/recipes/${recipe._id}/edit`}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(recipe._id)}
                  className="rounded-full border border-[var(--danger-border)] px-3 py-1 text-xs font-semibold text-[var(--danger)] transition hover:border-[var(--danger)] hover:text-[var(--danger-strong)]"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default Admin
