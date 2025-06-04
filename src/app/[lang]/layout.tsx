import { Inter, Vazirmatn } from 'next/font/google'
import '../globals.css'
import { getDictionary } from '@/src/lib/dictionaries'

import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'
import { ThemeProvider } from '@/src/contexts/theme-context'
import { LanguageProvider } from '@/src/contexts/language-context'
import { Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] })
const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'Doogi',
}

export const viewport: Viewport = {
  themeColor: 'dark',
  width: 1,
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
      <body className={`${inter.className} ${vazirmatn.className}`}>
        <ThemeProvider>
          <LanguageProvider dict={dict} lang={lang}>
            <div className='min-h-screen flex flex-col'>
              <Navbar />
              <main className='flex-1'>{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
