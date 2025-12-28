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
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />

      <input
        className="w-full border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />

      <input
        className="w-full border p-2 rounded"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredientes (separados por comas)"
        required
      />

      <textarea
        className="w-full border p-2 rounded"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        placeholder="Pasos"
        required
      />

      <input
        type="number"
        className="w-full border p-2 rounded"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        placeholder="Tiempo (min)"
        required
      />

      <div>
        <label className="block font-medium mb-1">Categoría</label>
        <input
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Dificultad</label>
        <select
          className="w-full border p-2 rounded"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Fácil</option>
          <option>Media</option>
          <option>Difícil</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Porciones</label>
        <input
          type="number"
          min="1"
          className="w-full border p-2 rounded"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          required
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {submitText}
      </button>
    </form>
  )
}

export default RecipeForm
