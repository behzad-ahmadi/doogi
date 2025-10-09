'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

type Theme = 'doogi' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Helper function to get theme from localStorage
const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'doogi'
  return (localStorage.getItem('theme') as Theme) || 'doogi'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  // Update theme in localStorage and document
  const updateTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    setTheme(newTheme)
  }

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = getStoredTheme()
    document.documentElement.setAttribute('data-theme', storedTheme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
