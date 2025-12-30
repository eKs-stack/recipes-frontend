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
    return <p className="text-center mt-20">Cargando recetas...</p>
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Mis recetas</h2>
      <RecipeGrid recipes={recipes} onSelectRecipe={() => {}} />
    </main>
  )
}

export default MyRecipes
