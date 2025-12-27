import { useEffect, useState } from 'react'
import { getRecipes, deleteRecipe } from '../services/recipes'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    loadRecipes()
  }, [])

  const handleDelete = async (id) => {
    await deleteRecipe(id)
    loadRecipes()
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Lista de recetas</h2>

      {recipes.length === 0 && <p>No hay recetas</p>}

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <strong>{recipe.title}</strong> ({recipe.prepTime} min)
            <button onClick={() => handleDelete(recipe._id)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
