'use client'

import { useLanguage } from '@/contexts/language-context'

interface WordCardProps {
  childName: string
  word: string
  explanation: string
  createdAt: string
}

export default function WordCard({
  childName,
  word,
  explanation,
  createdAt,
}: WordCardProps) {
  const { locale } = useLanguage()
  const { dict } = useLanguage()

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className='card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-base-200'>
      <div className='card-body p-6'>
        {/* Header with avatar and user info */}
        <div className='flex items-center gap-4 mb-4'>
          <div className='avatar'>
            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content font-bold text-lg text-center content-center shadow-lg'>
              {getInitials(childName)}
            </div>
          </div>
          <div className='flex-1'>
            <h3 className='font-bold text-base-content text-lg leading-tight'>
              {childName}
            </h3>
            <p className='text-sm text-base-content/60 font-medium'>
              {new Date(createdAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Main content with word */}
        <div className='mb-4'>
          <div className='bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 border border-primary/20'>
            <h4 className='font-bold text-xl text-base-content mb-1'>{word}</h4>
            <div className='w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full'></div>
          </div>
        </div>

        {/* Explanation */}
        <div className='mb-4'>
          <p className='text-base-content/80 leading-relaxed text-sm line-clamp-3'>
            {explanation}
          </p>
        </div>

        {/* Footer with decorative element */}
        <div className='flex items-center justify-between pt-2 border-t border-base-200'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-primary rounded-full'></div>
            <span className='text-xs text-base-content/50 font-medium'>
              {dict.stories.childsWord}
            </span>
          </div>
          <div className='flex gap-1'>
            <div className='w-1 h-4 bg-primary/30 rounded-full'></div>
            <div className='w-1 h-4 bg-secondary/30 rounded-full'></div>
            <div className='w-1 h-4 bg-accent/30 rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
