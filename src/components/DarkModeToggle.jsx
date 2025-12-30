import { useEffect, useState } from 'react'

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const toggleTheme = () => {
    setDark((prev) => !prev)
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border border-[var(--border)] bg-[var(--card-strong)] px-3 py-2 text-sm text-[var(--text)] transition hover:border-[var(--accent)]"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

export default DarkModeToggle
