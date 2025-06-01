import { Geist, Geist_Mono } from 'next/font/google'
import { Vazirmatn } from 'next/font/google'
import type { Metadata } from 'next'
import { getDictionary } from '@/app/[lang]/dictionaries'

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
  params: Promise<{ lang: 'en' | 'fa' }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params

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

export default async function Layout({ children, params }: Props) {
  const { lang } = await params
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  return (
    <html lang={lang} dir={dir} className={vazirmatn.variable}>
      <body>{children}</body>
    </html>
  )
}
