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
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col gap-4 justify-between items-center mb-4'>
        <h1 className='text-lg font-bold'>{dict.stories.title}</h1>
        <Link href={`/${lang}/share`}>
          <Button className='btn-link text-primary'>
            {dict.stories.shareYours}
          </Button>
        </Link>
      </div>

      {words.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-lg mb-4'>{dict.stories.noStories}</p>
          <Link href={`/${lang}/share`}>
            <Button>{dict.stories.shareYours}</Button>
          </Link>
        </div>
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {words.map(word => (
            <WordCard
              key={word.id}
              childName={word.child?.name ?? '—'}
              word={word.childWord}
              explanation={word.explanation}
              createdAt={new Date(word.createdAt).toISOString()}
            />
          ))}
        </div>
      )}
    </div>
  )
}
