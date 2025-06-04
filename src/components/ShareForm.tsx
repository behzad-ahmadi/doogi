'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Button } from './ui/Button'
import { useLanguage } from '@/src/contexts/language-context'

const shareSchema = z.object({
  childName: z.string().min(1, 'share.validation.childName'),
  word: z.string().min(1, 'share.validation.childWord'),
  explanation: z.string().min(1, 'share.validation.explanation'),
})

type ShareFormData = z.infer<typeof shareSchema>

export default function ShareForm() {
  const { dict } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShareFormData>({
    resolver: zodResolver(shareSchema),
  })

  const onSubmit = async (data: ShareFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(dict.share.error)
      }

      setSubmitStatus({
        type: 'success',
        message: dict.share.success,
      })
      reset()
    } catch (e) {
      setSubmitStatus({
        type: 'error',
        message: dict.share.error + ' ' + e,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Input
        label={dict.share.childName}
        placeholder={dict.share.childNamePlaceholder}
        {...register('childName')}
        error={
          errors.childName?.message
            ? dict.share.validation.childName
            : undefined
        }
      />

      <Input
        label={dict.share.childWord}
        placeholder={dict.share.childWordPlaceholder}
        {...register('word')}
        error={
          errors.word?.message ? dict.share.validation.childWord : undefined
        }
      />

      <Textarea
        label={dict.share.explanation}
        placeholder={dict.share.explanationPlaceholder}
        {...register('explanation')}
        error={
          errors.explanation?.message
            ? dict.share.validation.explanation
            : undefined
        }
      />

      {submitStatus && (
        <div
          className={`alert ${
            submitStatus.type === 'success' ? 'alert-success' : 'alert-error'
          }`}
        >
          <span>
            {submitStatus.type === 'success'
              ? dict.share.success
              : dict.share.error}
          </span>
        </div>
      )}

      <Button type='submit' size='block' isLoading={isSubmitting}>
        {isSubmitting ? dict.share.submitting : dict.share.submit}
      </Button>
    </form>
  )
}
