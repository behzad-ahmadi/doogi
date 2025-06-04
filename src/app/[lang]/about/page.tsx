import { getDictionary } from '@/src/lib/dictionaries'

export default async function About({
  params,
}: {
  params: { lang: 'en' | 'fa' }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>
          {dict.about.title}
        </h1>

        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <p className='text-lg leading-relaxed'>{dict.about.content}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          <div className='stat bg-base-100 shadow-xl rounded-box'>
            <div className='stat-title'>Technologies</div>
            <div className='stat-value text-primary'>4+</div>
            <div className='stat-desc'>Modern web tools</div>
          </div>

          <div className='stat bg-base-100 shadow-xl rounded-box'>
            <div className='stat-title'>Languages</div>
            <div className='stat-value text-secondary'>2</div>
            <div className='stat-desc'>English & Persian</div>
          </div>

          <div className='stat bg-base-100 shadow-xl rounded-box'>
            <div className='stat-title'>Performance</div>
            <div className='stat-value text-accent'>Fast</div>
            <div className='stat-desc'>Optimized build</div>
          </div>
        </div>
      </div>
    </div>
  )
}
