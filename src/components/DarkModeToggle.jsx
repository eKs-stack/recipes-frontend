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
    setDark(prev => !prev)
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

export default DarkModeToggle