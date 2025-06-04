import type React from 'react'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bilingual Next.js App',
  description: 'A bilingual Next.js 15 app with Tailwind CSS 4 and DaisyUI 5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
