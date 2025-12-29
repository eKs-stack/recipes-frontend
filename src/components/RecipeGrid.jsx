import RecipeCard from "./RecipeCard"
export default function RecipeGrid({ recipes, onSelectRecipe }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No se encontraron recetas.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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