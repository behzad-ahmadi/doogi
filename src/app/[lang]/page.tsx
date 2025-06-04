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
      <div className='hero min-h-96 bg-base-200 rounded-box mb-8'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold mb-6'>{dict.home.title}</h1>
            <p className='text-lg mb-6'>{dict.home.subtitle}</p>
            <p className='mb-8'>{dict.home.description}</p>
            <Link href={`/${lang}/about`} className='btn btn-primary'>
              {dict.home.cta}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold mb-8'>{dict.home.features}</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body items-center text-center'>
              <p className='text-lg'>{dict.home.feature1}</p>
            </div>
          </div>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body items-center text-center'>
              <p className='text-lg'>{dict.home.feature2}</p>
            </div>
          </div>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body items-center text-center'>
              <p className='text-lg'>{dict.home.feature3}</p>
            </div>
          </div>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body items-center text-center'>
              <p className='text-lg'>{dict.home.feature4}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Components */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h3 className='card-title'>Button Styles</h3>
            <div className='card-actions justify-end gap-2'>
              <button className='btn btn-primary'>Primary</button>
              <button className='btn btn-secondary'>Secondary</button>
              <button className='btn btn-accent'>Accent</button>
            </div>
          </div>
        </div>

        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h3 className='card-title'>Alerts</h3>
            <div className='alert alert-info'>
              <span>Info alert example</span>
            </div>
          </div>
        </div>

        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h3 className='card-title'>Badge Examples</h3>
            <div className='flex gap-2 flex-wrap'>
              <div className='badge badge-primary'>Primary</div>
              <div className='badge badge-secondary'>Secondary</div>
              <div className='badge badge-accent'>Accent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
