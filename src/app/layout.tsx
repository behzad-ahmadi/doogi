import type { Metadata } from 'next'
import { Geist_Mono, Vazirmatn } from 'next/font/google'
import './globals.css'
import { cn } from 'clsx-for-tailwind'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const vazirmatn = Vazirmatn({
  variable: '--font-vazirmatn',
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "Doogi - Share Your Child's Cute Words",
  description: 'A place to share cute and sweet words of our children',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body lang='fa' dir='rtl' className={vazirmatn.className}>
        {children}
      </body>
    </html>
  )
}
