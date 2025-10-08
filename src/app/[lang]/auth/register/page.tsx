'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/src/contexts/language-context'
import Input from '@/src/components/ui/Input'
import { Button } from '@/src/components/ui/Button'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  terms?: string
}

export default function RegisterPage() {
  const { dict } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = dict.auth.register.validation.firstName
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = dict.auth.register.validation.lastName
    }

    if (!formData.email.trim()) {
      newErrors.email = dict.auth.register.validation.email
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = dict.auth.register.validation.email
    }

    if (formData.password.length < 8) {
      newErrors.password = dict.auth.register.validation.password
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = dict.auth.register.validation.confirmPassword
    }

    if (!formData.agreeToTerms) {
      newErrors.terms = dict.auth.register.validation.terms
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Implement actual registration API call
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Show success message
      alert(dict.auth.register.success)

      // Redirect to home page or login page
      router.push('/')
    } catch (error) {
      console.error('Registration error:', error)
      alert(dict.auth.register.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-base-content'>
            {dict.auth.register.title}
          </h1>
          <p className='mt-2 text-sm text-base-content/70'>
            {dict.auth.register.subtitle}
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <Input
                label={dict.auth.register.firstName}
                placeholder={dict.auth.register.firstNamePlaceholder}
                value={formData.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
                error={errors.firstName}
                required
              />
              <Input
                label={dict.auth.register.lastName}
                placeholder={dict.auth.register.lastNamePlaceholder}
                value={formData.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
                error={errors.lastName}
                required
              />
            </div>

            <Input
              label={dict.auth.register.email}
              type='email'
              placeholder={dict.auth.register.emailPlaceholder}
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label={dict.auth.register.password}
              type='password'
              placeholder={dict.auth.register.passwordPlaceholder}
              value={formData.password}
              onChange={e => handleInputChange('password', e.target.value)}
              error={errors.password}
              required
            />

            <Input
              label={dict.auth.register.confirmPassword}
              type='password'
              placeholder={dict.auth.register.confirmPasswordPlaceholder}
              value={formData.confirmPassword}
              onChange={e =>
                handleInputChange('confirmPassword', e.target.value)
              }
              error={errors.confirmPassword}
              required
            />
          </div>

          <div className='form-control'>
            <label className='label cursor-pointer justify-start gap-3'>
              <input
                type='checkbox'
                className='checkbox checkbox-primary'
                checked={formData.agreeToTerms}
                onChange={e =>
                  handleInputChange('agreeToTerms', e.target.checked)
                }
              />
              <span className='label-text text-sm'>
                {dict.auth.register.agreeToTerms}
              </span>
            </label>
            {errors.terms && (
              <label className='label'>
                <span className='label-text-alt text-error'>
                  {errors.terms}
                </span>
              </label>
            )}
          </div>

          <Button
            type='submit'
            size='block'
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? dict.auth.register.submitting
              : dict.auth.register.submit}
          </Button>

          <div className='text-center'>
            <p className='text-sm text-base-content/70'>
              {dict.auth.register.alreadyHaveAccount}{' '}
              <button
                type='button'
                className='text-primary hover:text-primary/80 font-medium'
                onClick={() => router.push('/auth/login')}
              >
                {dict.auth.register.loginLink}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
