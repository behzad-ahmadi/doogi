import Loading from '@/src/components/Loading'
import Stories from '@/src/components/Stories'
import { getDictionary } from '@/src/lib/dictionaries'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fa' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className='container mx-auto py-12'>
      {/* Modern Hero Section */}
      <div className='relative mb-16'>
        <div className='text-center max-w-4xl mx-auto'>
          {/* Decorative elements */}
          <div className='absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl'></div>
          <div className='absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/10 rounded-full blur-xl'></div>
          
          <div className='relative z-10'>
            <div className='mb-6'>
              <div className='w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6'></div>
              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 leading-tight'>
                {dict.home.title}
              </h1>
              <p className='text-xl md:text-2xl text-base-content/80 mb-6 font-medium'>
                {dict.home.subtitle}
              </p>
              <p className='text-lg text-base-content/60 max-w-2xl mx-auto leading-relaxed'>
                {dict.home.description}
              </p>
            </div>
            <Link
              href={`/${lang}/share`}
              className='btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
            >
              {dict.home.cta}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Stories Preview */}
      <div className='mb-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>Latest Stories</h2>
          <p className='text-base-content/60 max-w-2xl mx-auto'>
            Discover the wonderful words and stories shared by children around the world
          </p>
        </div>
        <div className='bg-base-100/50 backdrop-blur-sm rounded-2xl p-8 border border-base-200/50'>
          <Suspense fallback={<Loading />}>
            <Stories params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
