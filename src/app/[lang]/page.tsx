import { getDictionary } from '@/src/lib/dictionaries'
import Link from 'next/link'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fa' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Hero Section */}
      <div className='hero min-h-[60vh] bg-base-200 rounded-box mb-8'>
        <div className='hero-content text-center'>
          <div className='max-w-2xl'>
            <h1 className='text-6xl font-bold mb-6'>{dict.home.title}</h1>
            <p className='text-2xl mb-6'>{dict.home.subtitle}</p>
            <p className='text-lg mb-8'>{dict.home.description}</p>
            <Link href={`/${lang}/share`} className='btn btn-primary btn-lg'>
              {dict.home.cta}
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Stories Preview */}
      <div className='text-center mb-16'>
        <h2 className='text-4xl font-bold mb-12'>{dict.stories.title}</h2>
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body items-center text-center'>
            <p className='text-xl'>{dict.stories.noStories}</p>
            <p className='text-lg text-primary'>{dict.stories.shareFirst}</p>
            <Link href={`/${lang}/share`} className='btn btn-primary mt-4'>
              {dict.home.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
