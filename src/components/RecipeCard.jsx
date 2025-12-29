import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { useAuth } from '../context/useAuth'

const RecipeCard = ({ recipe }) => {
  const { user, isAuthenticated } = useAuth()

  const userId = user?.id || user?._id
  const ownerId =
    typeof recipe.owner === 'string' ? recipe.owner : recipe.owner?._id
  const isOwner = Boolean(isAuthenticated && userId && ownerId === userId)

  return (
    <div className="group block bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300">
      <Link to={`/recipes/${recipe._id}`} className="block p-4">
        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1">
          {recipe.title}
        </h3>

        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-zinc-400">
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
            className="text-sm text-emerald-400 hover:underline"
          >
            Editar
          </Link>
        </div>
      )}
    </div>
  )
}

export default RecipeCard
