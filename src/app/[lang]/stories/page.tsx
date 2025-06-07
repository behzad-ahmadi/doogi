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
  {
    id: 3,
    childName: 'Emma',
    word: 'Mommy, I want to go to the "parky"!',
    explanation:
      'Emma calls the park "parky" because she thinks it sounds more fun',
    createdAt: '2024-03-18T09:15:00Z',
  },
  {
    id: 4,
    childName: 'Liam',
    word: 'Can I have some "nummy-nums"?',
    explanation:
      'Liam calls his favorite snacks "nummy-nums" because they taste so good',
    createdAt: '2024-03-17T14:45:00Z',
  },
  {
    id: 5,
    childName: 'Sophia',
    word: 'I want to wear my "twirly-dress"!',
    explanation:
      'Sophia calls her favorite dress "twirly-dress" because she loves to twirl in it',
    createdAt: '2024-03-16T11:20:00Z',
  },
  {
    id: 6,
    childName: 'Noah',
    word: 'Look at the "flappy-bird"!',
    explanation:
      'Noah calls birds "flappy-birds" because of how their wings flap when they fly',
    createdAt: '2024-03-15T16:30:00Z',
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
      <div className='flex flex-col gap-4 justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>{dict.stories.title}</h1>
        <Link href={`/${lang}/share`}>
          <Button className='btn-link'>{dict.stories.shareYours}</Button>
        </Link>
      </div>

      {mockWords.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-lg mb-4'>{dict.stories.noStories}</p>
          <Link href={`/${lang}/share`}>
            <Button>{dict.stories.shareYours}</Button>
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
