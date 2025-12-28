import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRecipeById } from '../services/recipes'

const RecipeDetail = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>
  if (!recipe) return <p>Receta no encontrada</p>

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>

        <p className="text-gray-700">{recipe.description}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Ingredientes</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Pasos</h3>
        <p className="text-gray-800 whitespace-pre-line">{recipe.steps}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <p className="font-medium">⏱ {recipe.prepTime} minutos</p>
        <Link
          to={`/recipes/${recipe._id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Editar receta
        </Link>

        <Link to="/" className="text-blue-600 hover:underline">
          ← Volver
        </Link>
      </div>
    </div>
  )
}

export default RecipeDetail
