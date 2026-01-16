import { useCallback, useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'kanban-theme'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'

  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // ignore storage errors
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme)

  const applyThemeClass = useCallback(nextTheme => {
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }, [])

  const setThemeAndPersist = useCallback(
    next => {
      setTheme(prev => {
        const resolved = typeof next === 'function' ? next(prev) : next
        applyThemeClass(resolved)
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, resolved)
        } catch {
          // ignore storage errors
        }
        return resolved
      })
    },
    [applyThemeClass]
  )

  useEffect(() => {
    applyThemeClass(theme)
  }, [theme, applyThemeClass])

  const isDark = theme === 'dark'

  const toggleTheme = useCallback(() => {
    setThemeAndPersist(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [setThemeAndPersist])

  return { theme, isDark, setTheme: setThemeAndPersist, toggleTheme }
}
