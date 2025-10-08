import { getDictionary } from '@/src/lib/dictionaries'
import WordCard from '@/src/components/WordCard'
import { Button } from '@/src/components/ui/Button'
import Link from 'next/link'
import prisma from '@/src/lib/prisma'

interface PageProps {
  params: Promise<{
    lang: 'en' | 'fa'
  }>
}

type WordWithChild = {
  id: string
  childWord: string
  explanation: string
  createdAt: Date
  child: { name: string } | null
}

export default async function StoriesPage({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  let words: WordWithChild[] = []

  try {
    words = await prisma.word.findMany({
      where: { isPublic: true, language: lang },
      include: { child: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch (err) {
    console.error('Failed to fetch words from database:', err)
    // Gracefully degrade to empty state in dev when DB is not configured
    words = []
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col gap-4 justify-between items-center mb-4'>
        <h1 className='text-lg font-bold'>{dict.stories.title}</h1>
        <Link href={`/${lang}/share`}>
          <Button className='btn-link'>{dict.stories.shareYours}</Button>
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
              createdAt={word.createdAt.toISOString()}
            />
          ))}
        </div>
      )}
    </div>
  )
}
