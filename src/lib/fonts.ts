import { Inter, Vazirmatn } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })
export const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  // variable: '--font-vazirmatn',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
