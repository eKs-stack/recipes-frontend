import { ChefHat, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 p-2 rounded-lg">
              <ChefHat className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Cocinar con Aleks
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>
          </nav>

          <Link
            to="/new"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nueva receta</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
