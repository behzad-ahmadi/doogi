import { getDictionary } from '@/src/lib/dictionaries'
import WordCard from '@/src/components/WordCard'
import { Button } from '@/src/components/ui/Button'
import Link from 'next/link'
import { mockWords } from './mockWords'

interface PageProps {
  params: Promise<{
    lang: 'en' | 'fa'
  }>
}

type MockWord = {
  id: number
  childName: string
  word: string
  explanation: string
  createdAt: string
}

export default async function StoriesPage({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col gap-4 justify-between items-center mb-4'>
        <h1 className='text-lg font-bold'>{dict.stories.title}</h1>
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
          {mockWords.map((word: MockWord) => (
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
