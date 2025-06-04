import { getDictionary } from '@/src/lib/dictionaries'
import WordCard from '@/src/components/WordCard'
import { Button } from '@/src/components/ui/Button'
import Link from 'next/link'

// This would normally come from your database
const mockWords = [
  {
    id: 1,
    childName: 'علی',
    word: 'مامان، من می‌خوام برم پارک بازی کنم!',
    explanation: 'علی به جای "بازی کنم" می‌گفت "بازی کنم"',
    createdAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 2,
    childName: 'سارا',
    word: 'بابا، من می‌خوام برم مدرسه درس بخونم!',
    explanation: 'سارا به جای "درس بخونم" می‌گفت "درس بخونم"',
    createdAt: '2024-03-19T15:30:00Z',
  },
]

interface PageProps {
  params: Promise<{
    lang: 'en' | 'fa'
  }>
}

export default async function StoriesPage({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>{dict.stories.title}</h1>
        <Link href={`/${lang}/share`}>
          <Button>{dict.stories.shareFirst}</Button>
        </Link>
      </div>

      {mockWords.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-lg mb-4'>{dict.stories.noStories}</p>
          <Link href={`/${lang}/share`}>
            <Button>{dict.stories.shareFirst}</Button>
          </Link>
        </div>
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {mockWords.map(word => (
            <WordCard
              key={word.id}
              childName={word.childName}
              word={word.word}
              explanation={word.explanation}
              createdAt={word.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  )
}
