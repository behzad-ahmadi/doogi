'use client'

import { useLanguage } from '@/src/contexts/language-context'

export default function Footer() {
  const { dict } = useLanguage()

  return (
    <footer className='footer footer-center bg-base-200 text-base-content p-4'>
      <aside>
        <p className='font-bold'>🌍 MultiLingual App</p>
        <p>{dict.footer.description}</p>
        <p>{dict.footer.copyright}</p>
      </aside>
    </footer>
  )
}
