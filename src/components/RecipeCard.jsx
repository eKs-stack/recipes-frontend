import { Link } from 'react-router-dom'
import { Clock, Heart } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import { useFavorites } from '../context/useFavorites'

const RecipeCard = ({ recipe }) => {
  const { user, isAuthenticated } = useAuth()
  const { toggleFavorite, isFavorite } = useFavorites()

  const userId = user?.id || user?._id
  const ownerId =
    typeof recipe.owner === 'string' ? recipe.owner : recipe.owner?._id
  const isOwner = Boolean(isAuthenticated && userId && ownerId === userId)
  const favorite = isFavorite(recipe._id)

  const handleToggleFavorite = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isAuthenticated) return
    toggleFavorite(recipe._id)
  }

  return (
    <div className="group relative block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-white/60 hover:bg-[var(--card-strong)]">
      <button
        type="button"
        aria-pressed={favorite}
        aria-disabled={!isAuthenticated}
        disabled={!isAuthenticated}
        title={
          isAuthenticated
            ? favorite
              ? 'Quitar de favoritos'
              : 'Guardar en favoritos'
            : 'Inicia sesión para guardar'
        }
        onClick={handleToggleFavorite}
        className={`absolute right-3 top-3 z-10 rounded-full border px-2.5 py-2 text-sm transition ${
          !isAuthenticated
            ? 'cursor-not-allowed border-[var(--border)] bg-[var(--card-strong)] text-[var(--muted)] opacity-60'
            : favorite
              ? 'border-white/60 bg-white text-[var(--bg-0)]'
              : 'border-[var(--border)] bg-[var(--card-strong)] text-[var(--muted)] hover:border-white hover:text-white'
        }`}
      >
        <Heart className="h-4 w-4" fill={favorite ? 'currentColor' : 'none'} />
      </button>
      <Link to={`/recipes/${recipe._id}`} className="block p-4">
        <h3 className="mb-2 line-clamp-1 text-base font-semibold text-[var(--text)] transition-colors group-hover:text-white">
          {recipe.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-[var(--muted)]">
          {recipe.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{recipe.prepTime} min</span>
          </div>
        </div>
      </Link>

      {isOwner && (
        <div className="px-4 pb-4">
          <Link
            to={`/recipes/${recipe._id}/edit`}
            className="text-sm text-white hover:text-white/80"
          >
            Editar
          </Link>
        </div>
      )}
    </div>
  )
}

export default RecipeCard
