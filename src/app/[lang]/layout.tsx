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
  return {
    title: 'Doogi',
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

  return (
    <html lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
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
