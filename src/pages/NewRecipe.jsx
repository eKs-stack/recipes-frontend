import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecipe } from '../services/recipes'
import RecipeForm from '../components/RecipeForm'

const NewRecipe = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [prepTime, setPrepTime] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    const newRecipe = {
      title,
      description,
      ingredients: ingredients.split(',').map((i) => i.trim()),
      steps,
      prepTime: Number(prepTime)
    }

    try {
      await createRecipe(newRecipe)
      setMessage('Receta creada correctamente')
      setTimeout(() => navigate('/'), 1000)
    } catch {
      setError('No se pudo crear la receta')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6">Nueva receta</h2>
      {message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {message}
        </div>
      )}

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
        submitText="Crear receta"
      />
    </div>
  )
}

export default NewRecipe
