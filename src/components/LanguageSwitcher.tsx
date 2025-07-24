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

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'fa' : 'en'
    const currentPath = pathname.split('/').slice(2).join('/')
    const newPath = `/${newLang}/${currentPath}`
    router.push(newPath, { scroll: false })
  }

  return (
    <div
      className='btn btn-ghost text-base w-full justify-start'
      onClick={toggleLanguage}
    >
      🌐 {currentLang === 'en' ? 'English' : 'فارسی'}
    </div>
  )
}
