'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function SignupPage() {
  const { dict, lang } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  })

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = dict.auth.signup.error.nameRequired
    }

    if (!formData.email) {
      newErrors.email = dict.auth.signup.error.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = dict.auth.signup.error.emailInvalid
    }

    if (!formData.password) {
      newErrors.password = dict.auth.signup.error.passwordRequired
    } else if (formData.password.length < 8) {
      newErrors.password = dict.auth.signup.error.passwordTooShort
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = dict.auth.signup.error.passwordRequired
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = dict.auth.signup.error.passwordMismatch
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.email && !newErrors.password && !newErrors.confirmPassword
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors(prev => ({ ...prev, general: '' }))

    try {
      // Register user
      const response = await fetch(`/api/${lang}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email,
          password: formData.password,
        }),
      })

      if (response.ok) {
        toast.success('Account created successfully! Please sign in.')
        router.push(`/${lang}/login`)
      } else {
        const data = await response.json()
        if (response.status === 400) {
          setErrors(prev => ({ ...prev, general: dict.auth.signup.error.userExists }))
        } else {
          setErrors(prev => ({ ...prev, general: data.error || dict.auth.signup.error.general }))
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors(prev => ({ ...prev, general: dict.auth.signup.error.general }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      await signIn('google', {
        callbackUrl: `/${lang}/`,
      })
    } catch (error) {
      console.error('Google sign up error:', error)
      setErrors(prev => ({ ...prev, general: dict.auth.signup.error.general }))
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
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
            {dict.auth.signup.title}
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            {dict.auth.signup.subtitle}
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
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
                  d="M12 9.29c1.6 0 2.96.69 3.64 1.27l2.72-2.72C16.96 6.09 14.65 5 12 5c-4.3 0-7.99 2.47-9.82 6.06l2.84 2.2c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09L2.99 7.07C2.36 8.29 2 9.6 2 12s.36 3.71.99 4.93l2.85-2.84z"
                />
              </svg>
              {dict.auth.signup.googleSignUp}
            </button>

            <div className="divider">OR</div>

            {/* General Error */}
            {errors.general && (
              <div className="alert alert-error mb-4">
                <span>{errors.general}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{dict.auth.signup.name}</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={dict.auth.signup.namePlaceholder}
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.name}</span>
                  </label>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{dict.auth.signup.email}</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={dict.auth.signup.emailPlaceholder}
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
                  <span className="label-text">{dict.auth.signup.password}</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={dict.auth.signup.passwordPlaceholder}
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{dict.auth.signup.confirmPassword}</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={dict.auth.signup.confirmPasswordPlaceholder}
                  className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                  </label>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="text-xs text-base-content/70 text-center">
                {dict.auth.signup.termsAccept}
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
                    {dict.auth.signup.signingUp}
                  </>
                ) : (
                  dict.auth.signup.signUp
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-4">
              <span className="text-sm text-base-content/70">
                {dict.auth.signup.haveAccount}{' '}
                <Link
                  href={`/${lang}/login`}
                  className="link link-primary"
                >
                  {dict.auth.signup.signIn}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}