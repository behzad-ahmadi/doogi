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
    <div className='navbar bg-base-100 shadow-md sticky top-0 z-50 max-w-7xl mx-auto'>
      <div className='navbar-start'>
        <LoginButton />
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
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
            className='menu menu-lg dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <Link href={`/${lang}`} className='hover:bg-base-200'>
                {dict.nav.home}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/share`} className='hover:bg-base-200'>
                {dict.nav.share}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/stories`} className='hover:bg-base-200'>
                {dict.nav.stories}
              </Link>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>

        <div className='-ms-4'>
          <ThemeController />
        </div>

        <Link
          href={`/${lang}`}
          className='hidden lg:flex items-center gap-3 ps-2 text-xl font-bold'
        >
          {dict.nav.doogi}
          <Image src={'/static/logo.png'} alt='logo' width={32} height={32} />
        </Link>
      </div>

      <div className='navbar-center'>
        <ul className='menu menu-horizontal px-1 gap-2 hidden lg:flex'>
          <li>
            <Link href={`/${lang}`} className='hover:bg-base-200'>
              {dict.nav.home}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/share`} className='hover:bg-base-200'>
              {dict.nav.share}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/stories`} className='hover:bg-base-200'>
              {dict.nav.stories}
            </Link>
          </li>
        </ul>

        <Link
          href={`/${lang}`}
          className='flex items-center justify-center gap-3 text-center lg:hidden w-full text-xl font-bold'
        >
          <Image src={'/static/logo.png'} alt='logo' width={32} height={32} />
          {dict.nav.doogi}
        </Link>
      </div>
    </div>
  )
}
