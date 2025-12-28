import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRecipeById, updateRecipe, deleteRecipe } from '../services/recipes'
import RecipeForm from '../components/RecipeForm'

const EditRecipe = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('Fácil')
  const [servings, setServings] = useState(1)

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const recipe = await getRecipeById(id)
        setTitle(recipe.title)
        setDescription(recipe.description)
        setIngredients(recipe.ingredients.join(', '))
        setSteps(recipe.steps)
        setPrepTime(recipe.prepTime)
      } catch {
        setError('No se pudo cargar la receta')
      }
    }

    loadRecipe()
  }, [id])

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      '¿Seguro que quieres eliminar esta receta?'
    )
    if (!confirmDelete) return

    try {
      await deleteRecipe(id)
      navigate('/')
    } catch {
      setError('No se pudo eliminar la receta')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateRecipe(id, {
        title,
        description,
        ingredients: ingredients.split(',').map((i) => i.trim()),
        steps,
        prepTime: Number(prepTime)
      })

      navigate(`/recipes/${id}`)
    } catch {
      setError('No se pudo actualizar la receta')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6">Editar receta</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      <RecipeForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        ingredients={ingredients}
        setIngredients={setIngredients}
        steps={steps}
        setSteps={setSteps}
        prepTime={prepTime}
        setPrepTime={setPrepTime}
        onSubmit={handleSubmit}
        submitText="Guardar cambios"
        image={image}
        setImage={setImage}
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        servings={servings}
        setServings={setServings}
      />
      <button
        type="button"
        onClick={handleDelete}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Eliminar receta
      </button>
    </div>
  )
}

export default EditRecipe
