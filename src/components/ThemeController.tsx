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
      <div tabIndex={0} role='button' className='btn btn-ghost'>
        {themeIcon}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-[2] w-32 p-2 shadow'
      >
        <li>
          <button onClick={() => setTheme('doogi')}>
            🍊 Doogi
          </button>
        </li>
        <li>
          <button onClick={() => setTheme('dark')}>{dict.theme.dark}</button>
        </li>
      </ul>
    </div>
  )
}
