'use client'

import { usePathname, useRouter } from 'next/navigation'

interface LanguageSwitcherProps {
  currentLang: 'en' | 'fa'
}

export default function LanguageSwitcher({
  currentLang,
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLang: 'en' | 'fa') => {
    const currentPath = pathname.split('/').slice(2).join('/')
    const newPath = `/${newLang}/${currentPath}`
    router.push(newPath)
  }

  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-ghost'>
        🌐 {currentLang.toUpperCase()}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow'
      >
        <li>
          <button
            onClick={() => switchLanguage('en')}
            className={currentLang === 'en' ? 'active' : ''}
          >
            🇺🇸 English
          </button>
        </li>
        <li>
          <button
            onClick={() => switchLanguage('fa')}
            className={currentLang === 'fa' ? 'active' : ''}
          >
            🇮🇷 فارسی
          </button>
        </li>
      </ul>
    </div>
  )
}
