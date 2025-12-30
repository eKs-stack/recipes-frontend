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
    return <p className="mt-20 text-center text-[var(--muted)]">Cargando recetas...</p>
  }

  if (error) {
    return <p className="mt-20 text-center text-red-300">{error}</p>
  }

  return (
    <main className="page-fade py-2">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Recetas
        </h1>
        <p className="mt-3 text-base text-[var(--muted)] sm:text-lg">
          Explora ideas nuevas y guarda tus favoritas.
        </p>
      </div>
      <RecipeGrid
        recipes={recipes}
        onSelectRecipe={(recipe) => console.log(recipe)}
      />
    </main>
  )
}
