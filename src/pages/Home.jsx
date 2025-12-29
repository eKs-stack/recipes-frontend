'use client'

import { useEffect, useState } from 'react'
import { getRecipes } from '../services/recipes'
import RecipeGrid from '../components/RecipeGrid'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getRecipes()
        setRecipes(data)
      } catch {
        setError('No se pudieron cargar las recetas')
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
      <RecipeGrid
        recipes={recipes}
        onSelectRecipe={(recipe) => console.log(recipe)}
      />
    </main>
  )
}
