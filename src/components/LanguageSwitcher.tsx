'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '../contexts/language-context'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const { lang } = useLanguage()

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'fa' : 'en'
    const currentPath = pathname.split('/').slice(2).join('/')
    const newPath = `/${newLang}/${currentPath}`
    router.push(newPath, { scroll: false })
  }

  return (
    <div
      className='btn btn-ghost text-base me-auto hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg gap-2'
      onClick={toggleLanguage}
    >
      🌐
      {lang === 'en' ? 'فارسی' : 'English'}
    </div>
  )
}
