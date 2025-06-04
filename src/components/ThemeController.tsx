'use client'

import { useLanguage } from '@/src/contexts/language-context'
import { useTheme } from '@/src/contexts/theme-context'
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
    ? theme === 'light'
      ? '☀️'
      : theme === 'dark'
        ? '🌙'
        : '🎨'
    : '🎨'

  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-ghost'>
        {themeIcon}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow'
      >
        <li>
          <button onClick={() => setTheme('light')}>{dict.theme.light}</button>
        </li>
        <li>
          <button onClick={() => setTheme('dark')}>{dict.theme.dark}</button>
        </li>
        <li>
          <button onClick={() => setTheme('cupcake')}>
            {dict.theme.cupcake}
          </button>
        </li>
        <li>
          <button onClick={() => setTheme('emerald')}>
            {dict.theme.emerald}
          </button>
        </li>
      </ul>
    </div>
  )
}
