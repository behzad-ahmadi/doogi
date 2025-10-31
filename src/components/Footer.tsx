'use client'

import { useLanguage } from '@/contexts/language-context'
import { getCurrentYear } from '@/lib/utils/date'

export default function Footer() {
  const { dict, lang } = useLanguage()
  const year = getCurrentYear(lang)

  return (
    <footer className='footer footer-center bg-base-200 text-base-content p-4'>
      <aside>
        <p className='font-bold'>{dict.footer.doogi}</p>
        <p>{dict.footer.description}</p>
        <p>{dict.footer.copyright.replace('$year', year.toString())}</p>
      </aside>
    </footer>
  )
}
