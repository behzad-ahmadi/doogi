'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const { dict, lang } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  })

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      general: '',
    }

    if (!formData.email) {
      newErrors.email = dict.auth.login.error.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = dict.auth.login.error.passwordRequired
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({ email: '', password: '', general: '' })

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setErrors({
          email: '',
          password: '',
          general: dict.auth.login.error.invalidCredentials,
        })
      } else {
        // Check if sign in was successful
        const session = await getSession()
        if (session) {
          toast.success('Successfully signed in!')
          router.push(`/${lang}`)
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({
        email: '',
        password: '',
        general: dict.auth.login.error.general,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', {
        callbackUrl: `/${lang}`,
      })
    } catch (error) {
      console.error('Google sign in error:', error)
      toast.error(dict.auth.login.error.general)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-base-content">
            {dict.auth.login.title}
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            {dict.auth.login.subtitle}
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="btn btn-outline w-full mb-4"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {dict.auth.login.googleSignIn}
            </button>

            <div className="divider">OR</div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* General Error */}
              {errors.general && (
                <div className="alert alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{dict.auth.login.email}</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={dict.auth.login.emailPlaceholder}
                  className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{dict.auth.login.password}</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={dict.auth.login.passwordPlaceholder}
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary checkbox-sm mr-2"
                    disabled={isLoading}
                  />
                  <span className="label-text text-sm">{dict.auth.login.rememberMe}</span>
                </label>
                <Link
                  href={`/${lang}/forgot-password`}
                  className="link link-primary text-sm"
                >
                  {dict.auth.login.forgotPassword}
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    {dict.auth.login.signingIn}
                  </>
                ) : (
                  dict.auth.login.signIn
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <span className="text-sm text-base-content/70">
                {dict.auth.login.noAccount}{' '}
                <Link
                  href={`/${lang}/signup`}
                  className="link link-primary"
                >
                  {dict.auth.login.signUp}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}