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
    'w-full rounded-lg border border-[var(--border)] bg-[var(--card-strong)] p-3 text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition focus:border-white focus:ring-2 focus:ring-white/20'
  const categoryOptions = [
    'Principal',
    'Acompañamiento',
    'Entrante',
    'Postre',
    'Bebida',
    'Otro'
  ]
  const hasCustomCategory =
    Boolean(category) && !categoryOptions.includes(category)

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        className={inputClass}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />

      <input
        className={inputClass}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />

      <input
        className={inputClass}
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredientes (separados por comas)"
        required
      />

      <textarea
        className={`${inputClass} min-h-[120px]`}
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        placeholder="Pasos"
        required
      />

      <input
        type="number"
        className={inputClass}
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        placeholder="Tiempo (min)"
        required
      />

      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--muted)]">
          Categoría
        </label>
        <select
          className={inputClass}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {hasCustomCategory && <option value={category}>{category}</option>}
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--muted)]">
          Dificultad
        </label>
        <select
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
        <label className="mb-1 block text-sm font-medium text-[var(--muted)]">
          Porciones
        </label>
        <input
          type="number"
          min="1"
          className={inputClass}
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          required
        />
      </div>

      <button className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--bg-0)] transition hover:bg-white/90">
        {submitText}
      </button>
    </form>
  )
}

export default RecipeForm
