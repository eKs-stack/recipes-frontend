import RecipeCard from './RecipeCard'
export default function RecipeGrid({ recipes, onSelectRecipe }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] py-20 text-center">
        <p className="text-sm text-[var(--muted)]">
          No se encontraron recetas.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 grid-stagger">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          onClick={() => onSelectRecipe(recipe)}
        />
      ))}
    </div>
  )
}
