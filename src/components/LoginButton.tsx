'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useLanguage } from '@/contexts/language-context'

export default function LoginButton() {
  const { data: session, status } = useSession()
  const { lang } = useLanguage()

  if (status === 'loading') return <p>{lang === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}</p>

  if (session) {
    return (
      <div>
        <span>{lang === 'fa' ? `خوش آمدید، ${session.user?.name}!` : `Welcome, ${session.user?.name}!`}</span>
        <button onClick={() => signOut()}>{lang === 'fa' ? 'خروج' : 'Sign Out'}</button>
      </div>
    )
  }

  return (
    <div>
      <p>{lang === 'fa' ? 'شما وارد نشده‌اید' : 'You are not logged in'}</p>
      <button onClick={() => signIn()}>{lang === 'fa' ? 'ورود' : 'Sign In'}</button>
    </div>
  )
}
