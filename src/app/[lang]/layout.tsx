import { Inter, Vazirmatn } from 'next/font/google'
import '../globals.css'
import { getDictionary } from '@/src/lib/dictionaries'

import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'
import { ThemeProvider } from '@/src/contexts/theme-context'
import { LanguageProvider } from '@/src/contexts/language-context'
import PWAProvider from '@/src/components/PWAProvider'
import ToastProvider from '@/src/components/ToastProvider'
import { Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] })
const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return {
    title: 'Doogi',
    manifest: `/${lang}/manifest.json`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Doogi',
    },
    icons: {
      icon: '/web-app-manifest-192x192.png',
      shortcut: '/web-app-manifest-192x192.png',
      apple: '/web-app-manifest-192x192.png',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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

  return (
    <html lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <head>
        <link rel='manifest' href={`/${lang}/manifest.json`} />
        <meta name='theme-color' content='#000000' />
        <link rel='apple-touch-icon' href='/web-app-manifest-192x192.png' />
      </head>
      <body className={`${inter.className} ${vazirmatn.className}`}>
        <ThemeProvider>
          <LanguageProvider dict={dict} lang={lang}>
            <PWAProvider>
              <div className='min-h-screen flex flex-col'>
                <Navbar />
                <main className='flex-1'>{children}</main>
                <Footer />
              </div>
              <ToastProvider lang={lang} />
            </PWAProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
