import { getDirection, Language, isValidLocale } from '@/utils/i18n'
import { notFound } from 'next/navigation'
import { use } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { Vazirmatn } from 'next/font/google'
import type { Metadata } from 'next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fa' }]
}

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Language
  return {
    title:
      lang === 'fa'
        ? 'دوگی - اشتراک‌گذاری کلمات بامزه کودکان'
        : "Doogi - Share Your Child's Cute Words",
    description:
      lang === 'fa'
        ? 'جایی برای به اشتراک‌گذاری کلمه‌های بامزه و شیرین بچه‌هایمان'
        : 'A place to share cute and sweet words of our children',
  }
}

export default function Layout({ children, params }: Props) {
  const resolvedParams = use(params)
  if (!isValidLocale(resolvedParams.lang)) {
    notFound()
  }

  const lang = resolvedParams.lang as Language
  const dir = getDirection(lang)

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable}`}
    >
      <body className='min-h-screen'>{children}</body>
    </html>
  )
}
