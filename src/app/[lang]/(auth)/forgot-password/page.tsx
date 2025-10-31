'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function ForgotPasswordPage() {
  const { dict, lang } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    general: '',
  })

  const validateForm = () => {
    const newErrors = {
      email: '',
      general: '',
    }

    if (!formData.email) {
      newErrors.email = dict.auth.forgotPassword.error.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = dict.auth.forgotPassword.error.emailInvalid
    }

    setErrors(newErrors)
    return !newErrors.email
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors(prev => ({ ...prev, general: '' }))

    try {
      // For now, we'll simulate the forgot password functionality
      // In a real implementation, you would call an API endpoint to send reset email
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      setIsSuccess(true)
      toast.success(dict.auth.forgotPassword.success)
    } catch (error) {
      console.error('Forgot password error:', error)
      setErrors(prev => ({ ...prev, general: dict.auth.forgotPassword.error.general }))
    } finally {
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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success/20 mb-4">
              <svg className="h-6 w-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-base-content">
              {dict.auth.forgotPassword.title}
            </h2>
            <p className="mt-4 text-sm text-base-content/70">
              {dict.auth.forgotPassword.success}
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <Link
                href={`/${lang}/login`}
                className="btn btn-primary w-full"
              >
                {dict.auth.forgotPassword.backToLogin}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-base-content">
            {dict.auth.forgotPassword.title}
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            {dict.auth.forgotPassword.subtitle}
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* General Error */}
            {errors.general && (
              <div className="alert alert-error mb-4">
                <span>{errors.general}</span>
              </div>
            )}

            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{dict.auth.forgotPassword.email}</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={dict.auth.forgotPassword.emailPlaceholder}
                  className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>
                )}
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
                    {dict.auth.forgotPassword.sending}
                  </>
                ) : (
                  dict.auth.forgotPassword.sendReset
                )}
              </button>
            </form>

            {/* Back to Login Link */}
            <div className="text-center mt-4">
              <Link
                href={`/${lang}/login`}
                className="link link-primary text-sm"
              >
                {dict.auth.forgotPassword.backToLogin}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}