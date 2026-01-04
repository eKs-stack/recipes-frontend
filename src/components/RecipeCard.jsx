import { Link, useNavigate } from 'react-router-dom'
import { Clock, Heart, Users } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import { useFavorites } from '../context/useFavorites'

const RecipeCard = ({ recipe, showEdit = true, onClick }) => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { toggleFavorite, isFavorite } = useFavorites()

  const userId = user?.id || user?._id
  const ownerId =
    typeof recipe.owner === 'string' ? recipe.owner : recipe.owner?._id
  const isOwner = Boolean(isAuthenticated && userId && ownerId === userId)
  const favorite = isAuthenticated ? isFavorite(recipe._id) : false
  const servingsValue = recipe.servings ?? null
  const servingsLabel =
    servingsValue !== null
      ? `${servingsValue} porcion${servingsValue === 1 ? '' : 'es'}`
      : 'Sin porciones'
  const categoryLabel = recipe.category || 'Sin categoría'
  const difficultyLabel = recipe.difficulty || 'Sin dificultad'
  const difficultyKey = (recipe.difficulty || '').toString().toLowerCase()
  const difficultyTone =
    difficultyKey === 'fácil' || difficultyKey === 'facil'
      ? 'text-[var(--success)]'
      : difficultyKey === 'media'
        ? 'text-[var(--warning)]'
        : difficultyKey === 'difícil' || difficultyKey === 'dificil'
          ? 'text-[var(--danger)]'
          : 'text-[var(--muted)]'
  const categoryTone = recipe.category
    ? 'text-[var(--accent)]'
    : 'text-[var(--muted)]'

  const handleToggleFavorite = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isAuthenticated) return
    toggleFavorite(recipe._id)
  }

  const handleNavigate = () => {
    if (typeof onClick === 'function') {
      onClick()
    }
    navigate(`/recipes/${recipe._id}`)
  }

  const handleCardClick = (event) => {
    if (event.defaultPrevented) return
    handleNavigate()
  }

  const handleCardKeyDown = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleNavigate()
    }
  }

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`Ver receta ${recipe.title}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--card-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)]"
    >
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
              ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--bg-0)]'
              : 'border-[var(--border)] bg-[var(--card-strong)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
        }`}
      >
        <Heart className="h-4 w-4" fill={favorite ? 'currentColor' : 'none'} />
      </button>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em]">
          <span className={categoryTone}>{categoryLabel}</span>
          <span className="text-[var(--muted)]">•</span>
          <span className={difficultyTone}>{difficultyLabel}</span>
        </div>
        <h3 className="mb-2 min-h-[1.5rem] line-clamp-1 text-base font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {recipe.title}
        </h3>

        <p className="mb-4 min-h-[2.5rem] line-clamp-2 text-sm text-[var(--muted)]">
          {recipe.description}
        </p>

        <div className="mt-auto flex items-center gap-4 text-xs text-[var(--muted)]">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{recipe.prepTime} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span>{servingsLabel}</span>
          </div>
        </div>
      </div>

      {isOwner && showEdit && (
        <div className="px-4 pb-4">
          <Link
            to={`/recipes/${recipe._id}/edit`}
            onClick={(event) => event.stopPropagation()}
            className="text-sm text-[var(--accent)] hover:text-[var(--accent-2)]"
          >
            Editar
          </Link>
        </div>
      )}
    </div>
  )
}

export default RecipeCard
