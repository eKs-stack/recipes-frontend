import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecipes, deleteRecipe } from '../services/recipes'

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
      setMessage('Receta eliminada')
      loadRecipes()
      setTimeout(() => setMessage(null), 2000)
    } catch {
      setMessage('Error al borrar receta')
    }
  }

  useEffect(() => {
    loadRecipes()
  }, [])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="mt-6">
      <h2>Lista de recetas</h2>

      {message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {message}
        </div>
      )}

      <ul className="space-y-3">
        {recipes.map((recipe) => (
          <li
            key={recipe._id}
            className="border p-3 rounded flex justify-between items-center mt-3"
          >
            <Link
              to={`/recipes/${recipe._id}`}
              className="font-semibold text-black"
            >
              {recipe.title}
            </Link>
            <Link
              to={`/recipes/${recipe._id}/edit`}
              className="text-blue-600 hover:underline mr-3"
            >
              Editar
            </Link>
            <button onClick={() => handleDelete(recipe._id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
