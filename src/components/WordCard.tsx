'use client'

import { useLanguage } from '@/src/contexts/language-context'

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
  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className='card-body'>
        <div className='flex items-center gap-2'>
          <div className='avatar placeholder'>
            <div className='bg-neutral text-neutral-content rounded-full w-12'>
              <span className='text-lg flex justify-center items-center w-full h-full'>
                {childName[0]}
              </span>
            </div>
          </div>
          <div>
            <h3 className='font-bold'>{childName}</h3>
            <p className='text-sm opacity-70'>
              {new Date(createdAt).toLocaleDateString(locale)}
            </p>
          </div>
        </div>

        <div className='divider my-2'></div>

        <div className='space-y-2'>
          <div>
            <h4 className='font-semibold text-lg'>{word}</h4>
          </div>
          <p className='text-base-content/80'>{explanation}</p>
        </div>
      </div>
    </div>
  )
}
