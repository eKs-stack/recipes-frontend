import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRecipeById } from '../services/recipes'
import { useAuth } from '../context/useAuth'

const RecipeDetail = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user, isAuthenticated } = useAuth()

  const userId = user?.id || user?._id
  const ownerId =
    typeof recipe?.owner === 'string' ? recipe.owner : recipe?.owner?._id
  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await getRecipeById(id)
        setRecipe(data)
      } catch {
        setError('No se pudo cargar la receta')
      } finally {
        setLoading(false)
      }
    }

    loadRecipe()
  }, [id])

  const isOwner = Boolean(isAuthenticated && userId && ownerId === userId)

  if (loading) return <p className="mt-20 text-center text-[var(--muted)]">Cargando...</p>
  if (error) return <p className="mt-20 text-center text-white">{error}</p>
  if (!recipe)
    return (
      <p className="mt-20 text-center text-[var(--muted)]">
        Receta no encontrada
      </p>
    )

  return (
    <div className="page-fade mx-auto mt-8 max-w-3xl space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)]">
      <div>
        <h2 className="mb-2 text-3xl font-semibold">{recipe.title}</h2>

        <p className="text-[var(--muted)]">{recipe.description}</p>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-semibold">Ingredientes</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text)]">
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-semibold">Pasos</h3>
        <p className="whitespace-pre-line text-[var(--text)]">{recipe.steps}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
        <p className="text-sm font-medium text-[var(--muted)]">
          ⏱ {recipe.prepTime} minutos
        </p>
        {isOwner && (
          <Link
            to={`/recipes/${recipe._id}/edit`}
            className="text-sm text-white hover:text-white/80"
          >
            Editar receta
          </Link>
        )}

        <Link to="/" className="text-sm text-white hover:text-white/80">
          ← Volver
        </Link>
      </div>
    </div>
  )
}

export default RecipeDetail
