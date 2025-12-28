const API_URL = 'https://recipes-backend-d7dm.onrender.com/api/recipes'

export const getRecipes = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Error al obtener recetas')
  }
  return response.json()
}

export const createRecipe = async (recipe) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  })

  if (!response.ok) {
    throw new Error('Error al crear receta')
  }

  return response.json()
}

export const deleteRecipe = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Error al borrar receta')
  }
}

export const getRecipeById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Error al obtener la receta')
  }

  return response.json()
}

export const updateRecipe = async (id, updatedRecipe) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedRecipe)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar la receta')
  }

  return response.json()
}
