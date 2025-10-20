'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/src/contexts/language-context'
import Input from '@/src/components/ui/Input'
import { Button } from '@/src/components/ui/Button'
import { signIn, useSession } from 'next-auth/react'

export default function LoginPage() {
  const { dict, lang } = useLanguage()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { status } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError(
        (dict.auth.login && dict.auth.login.error) || dict.auth.register.error,
      )
      return
    }

    setIsSubmitting(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(
          (dict.auth.login && dict.auth.login.error) ||
            dict.auth.register.error,
        )
      } else {
        router.push(`/${lang}`)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(`/${lang}`)
    }
  }, [status, lang, router])

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-base-content'>
            {dict.nav.login}
          </h1>
          <p className='mt-2 text-sm text-base-content/70'>
            {dict.auth.login?.subtitle || dict.home.subtitle}
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <Input
              label={dict.auth.login?.email || dict.auth.register.email}
              type='email'
              placeholder={
                dict.auth.login?.emailPlaceholder ||
                dict.auth.register.emailPlaceholder
              }
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <Input
              label={dict.auth.login?.password || dict.auth.register.password}
              type='password'
              placeholder={
                dict.auth.login?.passwordPlaceholder ||
                dict.auth.register.passwordPlaceholder
              }
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className='alert alert-error'>
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div className='text-sm'>
              <a href={`/${lang}/auth/register`} className='link link-primary'>
                {dict.nav.register}
              </a>
            </div>
          </div>

          <Button type='submit' size='block' isLoading={isSubmitting}>
            {isSubmitting
              ? dict.auth.login?.submitting || dict.nav.login
              : dict.auth.login?.submit || dict.nav.login}
          </Button>

          <div className='divider'>
            <span className='text-sm text-base-content/70'>
              {lang === 'fa' ? 'یا' : 'or'}
            </span>
          </div>

          <Button
            type='button'
            variant='outline'
            size='block'
            onClick={() => signIn('google', { 
              callbackUrl: `/${lang}`,
              redirect: true 
            })}
          >
            {lang === 'fa' ? 'ورود با گوگل' : 'Continue with Google'}
          </Button>
        </form>
      </div>
    </div>
  )
}
