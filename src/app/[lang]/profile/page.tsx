'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/src/contexts/language-context'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import UserIcon from '@/src/icons/UserIcon'

export default function ProfilePage() {
  const { dict, lang } = useLanguage()
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      const callbackUrl = `/${lang}/profile`
      router.replace(
        `/${lang}/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      )
    }
  }, [status, lang, router])

  if (status === 'loading') {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='loading loading-spinner loading-lg' />
      </div>
    )
  }

  if (!session) return null

  const { user } = session

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center'>
          {dict.nav.profile}
        </h1>

        <div className='card bg-base-100 shadow-md'>
          <div className='card-body'>
            <div className='flex items-center gap-4'>
              <div className='avatar'>
                <div className='w-16 rounded-full'>
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || user.email || 'User'}
                      width={64}
                      height={64}
                      unoptimized
                    />
                  ) : (
                    <UserIcon size={64} />
                  )}
                </div>
              </div>
              <div>
                <p className='text-lg font-semibold'>{user?.name || '-'}</p>
                <p className='text-base-content/70'>{user?.email || '-'}</p>
              </div>
            </div>

            <div className='divider' />

            <div className='flex gap-2'>
              <button
                className='btn btn-outline'
                onClick={() => signOut({ callbackUrl: `${window.location.origin}/${lang}` })}
              >
                {dict.nav.logout}
              </button>
              <button
                className='btn btn-primary'
                onClick={() => router.push(`/${lang}`)}
              >
                {dict.nav.home}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
