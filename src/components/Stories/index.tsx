import { Button } from '@/src/components/ui/Button'
import WordCard from '@/src/components/WordCard'
import { getDictionary } from '@/src/lib/dictionaries'
import { getPublicStories, type WordWithChild } from '@/src/lib/data/stories'
import Link from 'next/link'

export default async function Stories({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fa' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  let words: WordWithChild[] = []

  try {
    words = await getPublicStories(lang)
  } catch (err) {
    console.error('Failed to fetch stories:', err)
    // Gracefully degrade to empty state when data is not available
    words = []
  }

  return (
    <div className='container mx-auto px-4'>
      {/* Modern Header */}
      <div className='text-center'>
        <div>
          <div className='w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4'></div>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
            {dict.stories.title}
          </h1>
        </div>
        <Link href={`/${lang}/share`}>
          <Button className='btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-8'>
            {dict.stories.shareYours}
          </Button>
        </Link>
      </div>

      {words.length === 0 ? (
        <div className='text-center py-16'>
          <div className='max-w-md mx-auto'>
            <div className='w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-6 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-primary'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-base-content mb-3'>
              {dict.stories.noStories}
            </h3>
            <p className='text-base-content/60 mb-8'>
              Be the first to share a word! Your child&apos;s creativity could
              inspire others.
            </p>
            <Link href={`/${lang}/share`}>
              <Button className='btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300'>
                {dict.stories.shareYours}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 ml-2'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16'>
          {words.map(word => (
            <div
              key={word.id}
              className='transform transition-all duration-300 hover:scale-105'
            >
              <WordCard
                childName={word.childName ?? '—'}
                word={word.childWord}
                explanation={word.explanation}
                createdAt={new Date(word.createdAt).toISOString()}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
