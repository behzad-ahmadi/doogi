'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useLanguage } from '@/contexts/language-context'

export default function LoginButton() {
  const { data: session, status } = useSession()
  const { lang } = useLanguage()

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-sm"></span>
        <span className="text-sm text-base-content/70">
          {lang === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}
        </span>
      </div>
    )
  }

  if (session) {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-8">
            <span className="text-xs font-medium">
              {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-300">
          <li className="menu-title">
            <span className="text-sm font-medium">
              {lang === 'fa' ? `خوش آمدید، ${session.user?.name}!` : `Welcome, ${session.user?.name}!`}
            </span>
          </li>
          <li>
            <button 
              onClick={() => signOut()}
              className="text-error hover:bg-error/10 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {lang === 'fa' ? 'خروج' : 'Sign Out'}
            </button>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <button 
      onClick={() => signIn()}
      className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      {lang === 'fa' ? 'ورود' : 'Sign In'}
    </button>
  )
}
