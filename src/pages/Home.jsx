'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { getRecipes } from '../services/recipes'
import RecipeGrid from '../components/RecipeGrid'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todas')

  const categoryOptions = [
    'Todas',
    'Principal',
    'Desayuno',
    'Acompañamiento',
    'Entrante',
    'Postre',
    'Bebida',
    'Otro'
  ]

  const normalizeText = (value) =>
    value
      ? value
          .toString()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      : ''

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
    return <p className="mt-20 text-center text-[var(--danger)]">{error}</p>
  }

  const normalizedSearch = normalizeText(searchTerm.trim())
  const normalizedActiveCategory = normalizeText(activeCategory)
  const baseCategories = categoryOptions.filter(
    (category) => category !== 'Todas' && category !== 'Otro'
  )
  const normalizedBaseCategories = baseCategories.map(normalizeText)
  const filteredRecipes = recipes.filter((recipe) => {
    const title = normalizeText(recipe.title)
    const description = normalizeText(recipe.description)
    const category = normalizeText(recipe.category)
    const isCustomCategory =
      category &&
      !normalizedBaseCategories.includes(category) &&
      category !== normalizeText('Otro')
    const matchesSearch = normalizedSearch
      ? title.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        category.includes(normalizedSearch)
      : true

    const matchesCategory =
      normalizedActiveCategory === normalizeText('Todas') ||
      (normalizedActiveCategory === normalizeText('Otro')
        ? category === normalizeText('Otro') || isCustomCategory
        : category === normalizedActiveCategory)

    return matchesSearch && matchesCategory
  })

  return (
    <main className="page-fade py-2">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Recetas
        </h1>
        <h2 className="mt-3 text-base text-[var(--muted)] sm:text-lg">
          Explora ideas nuevas y guarda tus favoritas.
        </h2>
      </div>
      <div className="mx-auto mb-10 max-w-3xl space-y-4">
        <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--card-strong)] px-5 py-3 text-[var(--muted)] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)]">
          <Search className="h-5 w-5 text-[var(--muted)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar recetas..."
            className="w-full bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categoryOptions.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[var(--accent)] text-[var(--bg-0)] shadow-[0_12px_30px_-18px_var(--accent-shadow)]'
                    : 'bg-[var(--card-strong)] text-[var(--muted)] hover:text-[var(--accent)]'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>
      <RecipeGrid
        recipes={filteredRecipes}
        onSelectRecipe={(recipe) => console.log(recipe)}
        showEdit={false}
      />
    </main>
  )
}
