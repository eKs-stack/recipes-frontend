import { useEffect, useState } from 'react'

const CATEGORY_OPTIONS = [
  'Principal',
  'Desayuno',
  'Acompañamiento',
  'Entrante',
  'Postre',
  'Bebida',
  'Otro'
]

const RecipeForm = ({
  title,
  setTitle,
  description,
  setDescription,
  ingredients,
  setIngredients,
  steps,
  setSteps,
  prepTime,
  setPrepTime,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  servings,
  setServings,
  onSubmit,
  submitText
}) => {
  const inputClass =
    'w-full rounded-lg border border-[var(--border)] bg-[var(--card-strong)] p-3 text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'
  const [customCategory, setCustomCategory] = useState('')
  const [categorySelection, setCategorySelection] = useState('')

  useEffect(() => {
    if (!category) {
      setCategorySelection('')
      setCustomCategory('')
      return
    }
    if (CATEGORY_OPTIONS.includes(category)) {
      setCategorySelection(category)
      setCustomCategory('')
      return
    }
    setCategorySelection('Otro')
    setCustomCategory(category)
  }, [category])

  const handleCategoryChange = (event) => {
    const nextCategory = event.target.value
    if (nextCategory === 'Otro') {
      setCategorySelection('Otro')
      setCategory(customCategory || '')
      return
    }
    setCategorySelection(nextCategory)
    setCustomCategory('')
    setCategory(nextCategory)
  }

  const handleCustomCategoryChange = (event) => {
    const value = event.target.value
    setCustomCategory(value)
    setCategory(value)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="recipe-title"
          className="mb-1 block text-sm font-medium text-[var(--muted)]"
        >
          Título
        </label>
        <input
          id="recipe-title"
          className={inputClass}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
        />
      </div>

      <div>
        <label
          htmlFor="recipe-description"
          className="mb-1 block text-sm font-medium text-[var(--muted)]"
        >
          Descripción
        </label>
        <input
          id="recipe-description"
          className={inputClass}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
        />
      </div>

      <div>
        <label
          htmlFor="recipe-ingredients"
          className="mb-1 block text-sm font-medium text-[var(--muted)]"
        >
          Ingredientes
        </label>
        <input
          id="recipe-ingredients"
          className={inputClass}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredientes (separados por comas)"
          required
        />
      </div>

      <div>
        <label
          htmlFor="recipe-steps"
          className="mb-1 block text-sm font-medium text-[var(--muted)]"
        >
          Pasos
        </label>
        <textarea
          id="recipe-steps"
          className={`${inputClass} min-h-[120px]`}
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Pasos"
          required
        />
      </div>

      <div>
        <label
          htmlFor="recipe-prep-time"
          className="mb-1 block text-sm font-medium text-[var(--muted)]"
        >
          Tiempo (min)
        </label>
        <input
          id="recipe-prep-time"
          type="number"
          className={inputClass}
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="Tiempo (min)"
          required
        />
      </div>

      <div>
        <label
          htmlFor="recipe-category"
          className="mb-1 block text-sm font-medium text-[var(--muted)]"
        >
          Categoría
        </label>
        <select
          id="recipe-category"
          className={inputClass}
          value={categorySelection}
          onChange={handleCategoryChange}
          required
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {categorySelection === 'Otro' && (
          <div className="mt-2">
            <label
              htmlFor="recipe-category-custom"
              className="mb-1 block text-sm font-medium text-[var(--muted)]"
            >
              Especifica la categoría
            </label>
            <input
              id="recipe-category-custom"
              className={inputClass}
              value={customCategory}
              onChange={handleCustomCategoryChange}
              placeholder="Escribe la categoría"
              maxLength={32}
              required
            />
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="recipe-difficulty"
          className="mb-1 block text-sm font-medium text-[var(--muted)]"
        >
          Dificultad
        </label>
        <select
          id="recipe-difficulty"
          className={inputClass}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Fácil</option>
          <option>Media</option>
          <option>Difícil</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="recipe-servings"
          className="mb-1 block text-sm font-medium text-[var(--muted)]"
        >
          Porciones
        </label>
        <input
          id="recipe-servings"
          type="number"
          min="1"
          className={inputClass}
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          required
        />
      </div>

      <button className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--bg-0)] transition hover:bg-[var(--accent-2)]">
        {submitText}
      </button>
    </form>
  )
}

export default RecipeForm
