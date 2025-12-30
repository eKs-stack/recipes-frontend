import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecipe } from '../services/recipes'
import RecipeForm from '../components/RecipeForm'

const NewRecipe = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('Fácil')
  const [servings, setServings] = useState(1)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const ingredientsList = ingredients
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

      await createRecipe({
        title,
        description,
        ingredients: ingredientsList,
        steps,
        prepTime: Number(prepTime),
        category,
        difficulty,
        servings: Number(servings)
      })

      navigate('/')
    } catch {
      setError('Error creando receta')
    }
  }

  return (
    <div className="page-fade mx-auto mt-8 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)]">
      <h2 className="mb-6 text-2xl font-semibold">Nueva receta</h2>

      {error && (
        <div className="mb-4 rounded-lg border border-white/30 bg-white/10 p-3 text-sm text-white">
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
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        servings={servings}
        setServings={setServings}
        onSubmit={handleSubmit}
        submitText="Crear receta"
      />
    </div>
  )
}

export default NewRecipe
