import RecipeCard from './RecipeCard'
import RecipeCardSkeleton from './RecipeCardSkeleton'
export default function RecipeGrid({
  recipes = [],
  onSelectRecipe = () => {},
  showEdit = true,
  loading = false,
  skeletonCount = 6
}) {
  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label="Cargando recetas">
        <span className="sr-only">Cargando recetas</span>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <RecipeCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    )
  }

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
          showEdit={showEdit}
          onClick={() => onSelectRecipe(recipe)}
        />
      ))}
    </div>
  )
}
