'use client'

import { useLanguage } from '@/contexts/language-context'
import { useTheme } from '@/contexts/theme-context'
import { useEffect, useState } from 'react'

export default function ThemeController() {
  const { dict } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show theme icon after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render theme icon during SSR
  const themeIcon = mounted
    ? theme === 'dark'
      ? '🌙'
      : '🍊' // Doogi theme
    : '🍊'

  return (
    <div className='dropdown dropdown-center'>
      <div tabIndex={0} role='button' className='btn btn-ghost hover:bg-primary/10 transition-colors duration-200 text-lg'>
        {themeIcon}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100/95 backdrop-blur-md rounded-box z-[2] w-36 p-2 shadow-xl border border-base-300/50'
      >
        <li>
          <button 
            onClick={() => setTheme('doogi')}
            className='hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg gap-2'
          >
            🍊 Doogi
          </button>
        </li>
        <li>
          <button 
            onClick={() => setTheme('dark')}
            className='hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg gap-2'
          >
            🌙 {dict.theme.dark}
          </button>
        </li>
      </ul>
    </div>
  )
}
