import { useEffect, useState } from 'react'
import { getMyRecipes } from '../services/recipes'
import RecipeGrid from '../components/RecipeGrid'

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getMyRecipes()
        setRecipes(data)
      } catch {
        setError('No se pudieron cargar tus recetas')
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [])

  if (loading) {
    return <p className="mt-20 text-center text-[var(--muted)]">Cargando recetas...</p>
  }

  if (error) {
    return <p className="mt-20 text-center text-[var(--danger)]">{error}</p>
  }

  return (
    <main className="page-fade py-2">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Mis recetas</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Solo ves las recetas creadas por ti.
        </p>
      </div>
      <RecipeGrid recipes={recipes} onSelectRecipe={() => {}} />
    </main>
  )
}

export default MyRecipes
