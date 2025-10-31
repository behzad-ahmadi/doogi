'use client'

import Link from 'next/link'
import ThemeController from '@/components/ThemeController'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/contexts/language-context'
import Image from 'next/image'
import LoginButton from '@/components/LoginButton'

export default function Navbar() {
  const { dict, lang } = useLanguage()

  return (
    <div className='navbar bg-base-100/95 backdrop-blur-md shadow-lg border-b border-base-300/50 sticky top-0 z-50 max-w-7xl mx-auto transition-all duration-300'>
      <div className='navbar-start'>
        <div className='flex items-center gap-2'>
          <LoginButton />
          
          {/* Mobile Menu */}
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden hover:bg-primary/10 transition-colors duration-200'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className='menu menu-lg dropdown-content bg-base-100/95 backdrop-blur-md rounded-box z-[1] mt-3 w-56 p-3 shadow-xl border border-base-300/50'
            >
              <li>
                <Link href={`/${lang}`} className='hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/share`} className='hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  {dict.nav.share}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/stories`} className='hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  {dict.nav.stories}
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <LanguageSwitcher />
              </li>
            </ul>
          </div>

          <div className='ml-2'>
            <ThemeController />
          </div>
        </div>

        {/* Desktop Logo */}
        <Link
          href={`/${lang}`}
          className='hidden lg:flex items-center gap-3 ml-4 text-xl font-bold hover:scale-105 transition-transform duration-200 group'
        >
          <span className='group-hover:text-primary transition-colors duration-200'>{dict.nav.doogi}</span>
          <div className='relative'>
            <Image 
              src={'/static/logo.png'} 
              alt='logo' 
              width={32} 
              height={32} 
              className='group-hover:rotate-12 transition-transform duration-300'
            />
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className='navbar-center'>
        <ul className='menu menu-horizontal px-1 gap-1 hidden lg:flex'>
          <li>
            <Link href={`/${lang}`} className='hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg font-medium'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {dict.nav.home}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/share`} className='hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg font-medium'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              {dict.nav.share}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/stories`} className='hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg font-medium'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              {dict.nav.stories}
            </Link>
          </li>
        </ul>

        {/* Mobile Logo */}
        <Link
          href={`/${lang}`}
          className='flex items-center justify-center gap-3 text-center lg:hidden w-full text-xl font-bold hover:scale-105 transition-transform duration-200 group'
        >
          <div className='relative'>
            <Image 
              src={'/static/logo.png'} 
              alt='logo' 
              width={32} 
              height={32} 
              className='group-hover:rotate-12 transition-transform duration-300'
            />
          </div>
          <span className='group-hover:text-primary transition-colors duration-200'>{dict.nav.doogi}</span>
        </Link>
      </div>

      {/* Desktop Right Side */}
      <div className='navbar-end hidden lg:flex items-center gap-2'>
        <LanguageSwitcher />
      </div>
    </div>
  )
}
