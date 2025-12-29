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
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6">Nueva receta</h2>

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
