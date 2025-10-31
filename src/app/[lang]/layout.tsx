import { getDictionary } from '@/lib/dictionaries'
import '../globals.css'
import { cn } from '@/lib/utils'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/contexts/theme-context'
import { LanguageProvider } from '@/contexts/language-context'
import ToastProvider from '@/components/ToastProvider'
import MobileNavbar from '@/components/MobileNavbar'
import { Viewport } from 'next'
import { inter, vazirmatn } from '@/lib/fonts'
import SessionWrapper from '@/components/SessionWrapper'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  
  const isEnglish = lang === 'en'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const title = isEnglish
    ? 'Doogi - Share Cute Words from Children | Kids Funny Sayings'
    : 'دوگی - اشتراک کلمات بامزه کودکان | گفته‌های خنده‌دار بچه‌ها'

  const description = isEnglish
    ? "Share and discover adorable word mix-ups from children. A bilingual platform where parents can record and share their kids' cute sayings and funny phrases. Connect with other parents and preserve precious childhood moments."
    : 'کلمات و عبارات بامزه کودکان را به اشتراک بگذارید و کشف کنید. پلتفرمی دوزبانه که والدین می‌توانند گفته‌های خنده‌دار فرزندانشان را ثبت و به اشتراک بگذارند. با والدین دیگر ارتباط برقرار کنید و لحظات گرانبهای کودکی را حفظ کنید.'

  const keywords = isEnglish
    ? 'kids sayings, children words, funny phrases, parenting, child development, cute quotes, family moments, bilingual, Persian, English'
    : 'گفته‌های کودکان, کلمات بچه‌ها, عبارات خنده‌دار, فرزندپروری, رشد کودک, نقل قول‌های بامزه, لحظات خانوادگی, دوزبانه, فارسی, انگلیسی'

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Doogi Team' }],
    creator: 'Doogi',
    publisher: 'Doogi',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        fa: `${baseUrl}/fa`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}`,
      siteName: 'Doogi',
      locale: lang === 'en' ? 'en_US' : 'fa_IR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/static/doogi.png`,
          width: 1200,
          height: 630,
          alt: isEnglish
            ? 'Doogi - Share Cute Words from Children'
            : 'دوگی - اشتراک کلمات بامزه کودکان',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/static/doogi.png`],
      creator: '@doogi_app',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fa' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'fa' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://doogi.ir'
  const isEnglish = lang === 'en'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: isEnglish ? 'Doogi' : 'دوگی',
    description: isEnglish
      ? 'A bilingual platform where parents can share and discover adorable word mix-ups from children'
      : 'پلتفرمی دوزبانه که والدین می‌توانند کلمات و عبارات بامزه کودکان را به اشتراک بگذارند',
    url: `${baseUrl}/${lang}`,
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Doogi Team',
    },
    inLanguage: [lang === 'en' ? 'en-US' : 'fa-IR'],
    audience: {
      '@type': 'Audience',
      audienceType: 'Parents',
    },
  }

  return (
    <html lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <SessionWrapper>
        <body
          className={cn(inter.className, lang === 'fa' && vazirmatn.className)}
        >
          <ThemeProvider>
            <LanguageProvider dict={dict} lang={lang}>
              <div className='min-h-dvh flex flex-col max-w-7xl mx-auto relative'>
                <Navbar />
                <main className='flex-1 pb-16 md:pb-0'>{children}</main>
                <Footer />
                <MobileNavbar />
              </div>
              <ToastProvider />
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </SessionWrapper>
    </html>
  )
}
