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
        setIngredients(
          Array.isArray(recipe.ingredients)
            ? recipe.ingredients.join(', ')
            : recipe.ingredients || ''
        )
        setSteps(recipe.steps || '')
        setPrepTime(recipe.prepTime ?? '')
        setCategory(recipe.category ?? '')
        setDifficulty(recipe.difficulty ?? 'Fácil')
        setServings(recipe.servings ?? 1)
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
      const ingredientsList = ingredients
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

      await updateRecipe(id, {
        title,
        description,
        ingredients: ingredientsList,
        steps,
        prepTime: Number(prepTime),
        category,
        difficulty,
        servings: Number(servings)
      })

      navigate(`/recipes/${id}`)
    } catch {
      setError('No se pudo actualizar la receta')
    }
  }

  return (
    <div className="page-fade mx-auto mt-8 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)]">
      <h2 className="mb-6 text-2xl font-semibold">Editar receta</h2>

      {error && (
        <div className="mb-4 rounded-lg border border-[var(--danger-border)] bg-[var(--danger-soft)] p-3 text-sm text-[var(--danger)]">
          {error}
        </div>
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
        className="mt-4 w-full rounded-lg border border-[var(--danger-border)] bg-[var(--danger-soft)] py-2.5 text-sm font-semibold text-[var(--danger)] transition hover:bg-[var(--danger-strong)] hover:text-white"
      >
        Eliminar receta
      </button>
    </div>
  )
}

export default EditRecipe
