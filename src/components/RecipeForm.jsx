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

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {submitText}
      </button>
    </form>
  )
}

export default RecipeForm
