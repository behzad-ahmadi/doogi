'use client'

import { useParams } from 'next/navigation'
import { getTranslations, getDirection, Language } from '../utils/i18n'

export default function Home() {
  const params = useParams()
  const lang = (params?.lang as Language) || 'fa'
  const t = getTranslations(lang)
  const dir = getDirection(lang)

  return (
    <div
      className='min-h-screen bg-gradient-to-b from-pink-50 to-white'
      dir={dir}
    >
      {/* Hero Section */}
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold text-pink-600 mb-6'>
            {t.hero.title}
          </h1>
          <p className='text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed'>
            {t.hero.subtitle}
          </p>
          <p className='text-lg text-gray-600 mt-4 max-w-2xl mx-auto'>
            {t.hero.inspiration}
          </p>
        </div>

        {/* Features Section */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='text-pink-500 text-4xl mb-4'>👶</div>
            <h3 className='text-xl font-semibold mb-2'>
              {t.features.cuteWords.title}
            </h3>
            <p className='text-gray-600'>{t.features.cuteWords.description}</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='text-pink-500 text-4xl mb-4'>💝</div>
            <h3 className='text-xl font-semibold mb-2'>
              {t.features.sweetMemories.title}
            </h3>
            <p className='text-gray-600'>
              {t.features.sweetMemories.description}
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='text-pink-500 text-4xl mb-4'>🤗</div>
            <h3 className='text-xl font-semibold mb-2'>
              {t.features.sharing.title}
            </h3>
            <p className='text-gray-600'>{t.features.sharing.description}</p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className='text-center mb-8'>
          <a
            href={`/${lang === 'fa' ? 'en' : 'fa'}`}
            className='text-pink-600 hover:text-pink-700 font-medium'
          >
            {lang === 'fa' ? 'English' : 'فارسی'}
          </a>
        </div>

        {/* CTA Section */}
        <div className='text-center'>
          <button className='bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300'>
            {t.cta.button}
          </button>
          <p className='mt-4 text-gray-600'>{t.cta.subtext}</p>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-pink-50 py-8 mt-16'>
        <div className='container mx-auto px-4 text-center text-gray-600'>
          <p>{t.footer.text}</p>
        </div>
      </footer>
    </div>
  )
}
