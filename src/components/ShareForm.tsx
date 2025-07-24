'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ShareFormData>({
    resolver: zodResolver(shareSchema),
    defaultValues: {
      childName: '',
      word: '',
      explanation: '',
    },
  })

  const onSubmit = async (data: ShareFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast.success(dict.share.success)
      reset()
    } catch (e) {
      toast.error(dict.share.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Input
        label={dict.share.childName}
        placeholder={dict.share.childNamePlaceholder}
        {...register('childName')}
        error={
          isDirty && errors.childName
            ? dict.share.validation.childName
            : undefined
        }
      />

      <Input
        label={dict.share.childWord}
        placeholder={dict.share.childWordPlaceholder}
        {...register('word')}
        error={
          isDirty && errors.word ? dict.share.validation.childWord : undefined
        }
      />

      <Textarea
        label={dict.share.explanation}
        placeholder={dict.share.explanationPlaceholder}
        {...register('explanation')}
        error={
          isDirty && errors.explanation
            ? dict.share.validation.explanation
            : undefined
        }
      />

      <Button type='submit' size='block' isLoading={isSubmitting}>
        {isSubmitting ? dict.share.submitting : dict.share.submit}
      </Button>
    </form>
  )
}
