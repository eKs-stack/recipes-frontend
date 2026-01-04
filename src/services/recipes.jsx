import { API_URL, getAuthHeaders } from './api'

export const getRecipes = async () => {
  const res = await fetch(`${API_URL}/recipes`)
  if (!res.ok) throw new Error('Error cargando recetas')
  return res.json()
}

export const getMyRecipes = async () => {
  const res = await fetch(`${API_URL}/recipes/mine`, {
    headers: {
      ...getAuthHeaders()
    }
  })
  if (!res.ok) throw new Error('Error cargando recetas')
  return res.json()
}

export const createRecipe = async (data) => {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('Error al crear receta')
  }

  return response.json()
}

export const deleteRecipe = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders()
    }
  })

  if (!response.ok) {
    throw new Error('Error al borrar receta')
  }
}

export const getRecipeById = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}`)

  if (!response.ok) {
    throw new Error('Error al obtener la receta')
  }

  return response.json()
}

export const updateRecipe = async (id, updatedRecipe) => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(updatedRecipe)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar la receta')
  }

  return response.json()
}
