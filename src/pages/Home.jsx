import { useEffect, useState } from 'react'
import { getRecipes, deleteRecipe } from '../services/recipes'
import RecipeCard from '../components/RecipeCard'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

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

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id)
      setMessage('Receta eliminada correctamente')
      setRecipes((prev) => prev.filter((r) => r._id !== id))
      setTimeout(() => setMessage(null), 2000)
    } catch {
      setMessage('Error al eliminar la receta')
    }
  }

  useEffect(() => {
    loadRecipes()
  }, [])

  if (loading) {
    return (
      <p className="text-center text-zinc-400 mt-10">Cargando recetas...</p>
    )
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>
  }

  return (
    <div className="space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Recetas Familiares</h1>
        <p className="text-zinc-400">
          Sabores que nos unen, de generación en generación
        </p>
      </header>

      {message && (
        <div className="bg-emerald-100 text-emerald-700 p-3 rounded text-center">
          {message}
        </div>
      )}

      {recipes.length === 0 ? (
        <p className="text-center text-zinc-400">No hay recetas todavía</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="relative">
              <RecipeCard recipe={recipe} />

              <button
                onClick={() => handleDelete(recipe._id)}
                className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition"
              >
                Borrar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
