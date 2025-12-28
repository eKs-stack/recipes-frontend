import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'

const RecipeCard = ({ recipe }) => {
  return (
    <article className="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={recipe.image || 'https://via.placeholder.com/600x400'}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <Link to={`/recipes/${recipe._id}`} className="block">
          <h3 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1">
            {recipe.title}
          </h3>
        </Link>

        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{recipe.prepTime} min</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default RecipeCard
