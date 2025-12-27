import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecipe } from '../services/recipes'

const NewRecipe = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [prepTime, setPrepTime] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newRecipe = {
      title,
      description,
      ingredients: ingredients.split(',').map((i) => i.trim()),
      steps,
      prepTime: Number(prepTime)
    }

    await createRecipe(newRecipe)
    navigate('/')
  }

  return (
    <div>
      <h2>Nueva receta</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Ingredientes (separados por comas)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />

        <textarea
          placeholder="Pasos"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Tiempo de preparación (min)"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          required
        />

        <button type="submit">Crear receta</button>
      </form>
    </div>
  )
}

export default NewRecipe
