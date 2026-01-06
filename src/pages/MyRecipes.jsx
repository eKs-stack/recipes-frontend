import { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getMyRecipes } from '../services/recipes'
import RecipeGrid from '../components/RecipeGrid'
import { showError } from '../utils/alerts'

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user } = useAuth()
  const userId = user?.id || user?._id || 'anon'
  const skeletonStorageKey = `my-recipes:count:${userId}`
  const [skeletonCount, setSkeletonCount] = useState(() => {
    if (typeof window === 'undefined') return 6
    const stored = Number.parseInt(
      window.localStorage.getItem(skeletonStorageKey),
      10
    )
    return Number.isFinite(stored) ? stored : 6
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      setSkeletonCount(6)
      return
    }
    const stored = Number.parseInt(
      window.localStorage.getItem(skeletonStorageKey),
      10
    )
    setSkeletonCount(Number.isFinite(stored) ? stored : 6)
  }, [skeletonStorageKey])

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getMyRecipes()
        setRecipes(data)
        const nextCount = Array.isArray(data) ? data.length : 0
        setSkeletonCount(nextCount)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            skeletonStorageKey,
            String(nextCount)
          )
        }
      } catch {
        setError('No se pudieron cargar tus recetas')
        showError('No se pudieron cargar tus recetas')
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [])

  if (error) {
    return <p className="mt-20 text-center text-[var(--danger)]">{error}</p>
  }

  return (
    <main className="page-fade py-2">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Mis recetas</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Solo ves las recetas creadas por ti.
          </p>
        </div>
        <Link
          to="/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--bg-0)] transition hover:bg-[var(--accent-2)] sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          Nueva receta
        </Link>
      </div>
      <RecipeGrid
        recipes={recipes}
        onSelectRecipe={() => {}}
        skeletonCount={skeletonCount}
        loading={loading}
      />
    </main>
  )
}

export default MyRecipes
