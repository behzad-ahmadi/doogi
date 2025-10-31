'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import Input from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Button } from './ui/Button'
import { useLanguage } from '@/contexts/language-context'
import { revalidateStories } from '@/lib/revalidate'

const shareSchema = z.object({
  childName: z.string().min(1, 'share.validation.childName'),
  word: z.string().min(1, 'share.validation.childWord'),
  explanation: z.string().min(1, 'share.validation.explanation'),
})

type ShareFormData = z.infer<typeof shareSchema>

export default function ShareForm() {
  const { dict, lang } = useLanguage()

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
      const res = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName: data.childName,
          word: data.word,
          explanation: data.explanation,
          language: lang,
        }),
      })

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}))
        throw new Error((msg && msg.error) || 'Failed to submit')
      }

      // Revalidate the stories cache using server action
      await revalidateStories(lang)

      toast.success(dict.share.success)
      reset()
    } catch (e) {
      console.log('error', e)
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
