import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRecipes } from '../services/recipes'
import RecipeGrid from '../components/RecipeGrid'
import { useFavorites } from '../context/useFavorites'
import { showError } from '../utils/alerts'

const Favorites = () => {
  const { favorites } = useFavorites()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    if (favorites.length === 0) {
      setRecipes([])
      setLoading(false)
      setError(null)
      return () => {
        active = false
      }
    }

    const loadRecipes = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getRecipes()
        const favoriteSet = new Set(favorites)
        const filtered = data.filter((recipe) => favoriteSet.has(recipe._id))
        if (active) {
          setRecipes(filtered)
        }
      } catch {
        if (active) {
          setError('No se pudieron cargar tus favoritos')
          showError('No se pudieron cargar tus favoritos')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadRecipes()

    return () => {
      active = false
    }
  }, [favorites])

  if (error) {
    return <p className="mt-20 text-center text-[var(--danger)]">{error}</p>
  }

  if (favorites.length === 0) {
    return (
      <main className="page-fade py-2">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">Favoritos</h1>
          <p className="mt-3 text-base text-[var(--muted)] sm:text-lg">
            Todavia no guardaste recetas.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] py-16 text-center">
          <p className="text-sm text-[var(--muted)]">
            Explora recetas y guarda tus preferidas.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Ver recetas
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page-fade py-2">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Favoritos</h1>
        <p className="mt-3 text-base text-[var(--muted)] sm:text-lg">
          Tus recetas guardadas en un solo lugar.
        </p>
      </div>
      <RecipeGrid
        recipes={recipes}
        onSelectRecipe={() => {}}
        loading={loading}
      />
    </main>
  )
}

export default Favorites
