'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function MobileNavbar() {
  const { dict, lang } = useLanguage()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === `/${lang}${path}`

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 md:hidden'>
      {/* Main navigation bar */}
      <div className='w-full h-16 bg-base-100/80 backdrop-blur-lg border-t border-base-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-between items-center px-4'>
        {/* Home */}
        <Link
          href={`/${lang}`}
          className={cn(
            'flex flex-col items-center justify-center h-full relative w-1/4',
            'text-base-content/70 hover:text-primary transition-colors duration-200',
            isActive('') && 'active text-primary',
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mb-0.5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            />
          </svg>
          <span className='text-xs font-medium'>{dict.nav.home}</span>
          {isActive('') && (
            <span className='absolute bottom-1.5 w-1 h-1 rounded-full bg-primary'></span>
          )}
        </Link>

        {/* Share */}
        <Link
          href={`/${lang}/share`}
          className={cn(
            'flex flex-col items-center justify-center h-full relative w-1/4',
            'text-base-content/70 hover:text-primary transition-colors duration-200',
            isActive('/share') && 'active text-primary',
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mb-0.5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 4v16m8-8H4'
            />
          </svg>
          <span className='text-xs font-medium'>{dict.nav.share}</span>
          {isActive('/share') && (
            <span className='absolute bottom-1.5 w-1 h-1 rounded-full bg-primary'></span>
          )}
        </Link>

        {/* Stories */}
        <Link
          href={`/${lang}/stories`}
          className={cn(
            'flex flex-col items-center justify-center h-full relative w-1/4',
            'text-base-content/70 hover:text-primary transition-colors duration-200',
            isActive('/stories') && 'active text-primary',
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mb-0.5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
            />
          </svg>
          <span className='text-xs font-medium'>{dict.nav.stories}</span>
          {isActive('/stories') && (
            <span className='absolute bottom-1.5 w-1 h-1 rounded-full bg-primary'></span>
          )}
        </Link>

        {/* Contact */}
        <Link
          href={`/${lang}/contact`}
          className={cn(
            'flex flex-col items-center justify-center h-full relative w-1/4',
            'text-base-content/70 hover:text-primary transition-colors duration-200',
            isActive('/contact') && 'active text-primary',
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mb-0.5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            />
          </svg>
          <span className='text-xs font-medium'>{dict.nav.contact}</span>
          {isActive('/contact') && (
            <span className='absolute bottom-1.5 w-1 h-1 rounded-full bg-primary'></span>
          )}
        </Link>
      </div>
    </div>
  )
}
