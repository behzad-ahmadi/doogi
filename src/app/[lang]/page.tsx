import { getTranslations, Language } from '@/utils/i18n'
import Link from 'next/link'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fa' }]
}

type Props = {
  params: Promise<{ lang: Language }>
}

export default async function Home({ params }: Props) {
  const lang = (await params).lang
  const t = getTranslations(lang)

  return (
    <div className='min-h-screen bg-base-200'>
      {/* Hero Section */}
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold text-primary mb-6'>
            {t.hero.title}
          </h1>
          <p className='text-xl text-base-content/80 max-w-2xl mx-auto leading-relaxed'>
            {t.hero.subtitle}
          </p>
          <p className='text-lg text-base-content/60 mt-4 max-w-2xl mx-auto'>
            {t.hero.inspiration}
          </p>
        </div>

        {/* Features Section */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <div className='text-primary text-4xl mb-4'>👶</div>
              <h3 className='card-title'>{t.features.cuteWords.title}</h3>
              <p className='text-base-content/80'>
                {t.features.cuteWords.description}
              </p>
            </div>
          </div>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <div className='text-primary text-4xl mb-4'>💝</div>
              <h3 className='card-title'>{t.features.sweetMemories.title}</h3>
              <p className='text-base-content/80'>
                {t.features.sweetMemories.description}
              </p>
            </div>
          </div>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <div className='text-primary text-4xl mb-4'>🤗</div>
              <h3 className='card-title'>{t.features.sharing.title}</h3>
              <p className='text-base-content/80'>
                {t.features.sharing.description}
              </p>
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className='text-center mb-8'>
          <Link
            href={`/${lang === 'fa' ? 'en' : 'fa'}`}
            className='btn btn-ghost text-primary hover:text-primary-focus'
          >
            {lang === 'fa' ? 'English' : 'فارسی'}
          </Link>
        </div>

        {/* CTA Section */}
        <div className='text-center'>
          <button className='btn btn-primary btn-lg'>{t.cta.button}</button>
          <p className='mt-4 text-base-content/60'>{t.cta.subtext}</p>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-base-300 py-8 mt-16'>
        <div className='container mx-auto px-4 text-center text-base-content/80'>
          <p>{t.footer.text}</p>
        </div>
      </footer>
    </div>
  )
}
