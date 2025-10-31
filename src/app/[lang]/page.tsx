import Loading from '@/components/Loading'
import Stories from '@/components/Stories'
import { getDictionary } from '@/lib/dictionaries'
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
            <div>
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
          </div>
        </div>
      </div>

      {/* Recent Stories Preview */}
      <div>
        <div className='bg-base-100/50 backdrop-blur-sm rounded-2xl p-8 border border-base-200/50'>
          <Suspense fallback={<Loading />}>
            <Stories params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
