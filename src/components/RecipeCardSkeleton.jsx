const RecipeCardSkeleton = () => {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="absolute right-3 top-3 h-9 w-9 rounded-full bg-[var(--border)] animate-pulse" />
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="h-3 w-20 rounded-full bg-[var(--border)] animate-pulse" />
        <div className="h-2.5 w-2.5 rounded-full bg-[var(--border)] animate-pulse" />
        <div className="h-3 w-16 rounded-full bg-[var(--border)] animate-pulse" />
      </div>
      <div className="mb-2 h-4 w-3/4 rounded-full bg-[var(--border)] animate-pulse" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full bg-[var(--border)] animate-pulse" />
        <div className="h-3 w-5/6 rounded-full bg-[var(--border)] animate-pulse" />
      </div>
      <div className="mt-auto flex items-center gap-4 pt-4">
        <div className="h-3 w-16 rounded-full bg-[var(--border)] animate-pulse" />
        <div className="h-3 w-20 rounded-full bg-[var(--border)] animate-pulse" />
      </div>
    </div>
  )
}

export default RecipeCardSkeleton
