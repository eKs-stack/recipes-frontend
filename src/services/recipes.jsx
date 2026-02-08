import { API_URL } from './api'

export const getRecipes = async () => {
  const res = await fetch(`${API_URL}/recipes`)
  if (!res.ok) throw new Error('Error cargando recetas')
  return res.json()
}

export const getMyRecipes = async () => {
  // Rutas privadas: enviar cookie de sesión en cada request protegida.
  const res = await fetch(`${API_URL}/recipes/mine`, {
    credentials: 'include'
  })
  if (!res.ok) throw new Error('Error cargando recetas')
  return res.json()
}

export const getFavoriteRecipes = async () => {
  const response = await fetch(`${API_URL}/recipes/favorites`, {
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Error cargando favoritos')
  }

  return response.json()
}

export const toggleFavoriteRecipe = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}/favorite`, {
    method: 'POST',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Error actualizando favorito')
  }

  return response.json()
}

export const createRecipe = async (data) => {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
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
    credentials: 'include'
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
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(updatedRecipe)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar la receta')
  }

  return response.json()
}
