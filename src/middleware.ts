import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { Language } from './utils/i18n'

const locales: Language[] = ['en', 'fa']
const defaultLocale: Language = 'fa'

function getLocale(request: NextRequest): Language {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locale = match(languages, locales, defaultLocale) as Language

  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  const newUrl = new URL(
    `/${locale}${pathname === '/' ? '' : pathname}`,
    request.url,
  )

  // Prevent redirect loop by checking if we're already redirecting
  if (request.nextUrl.pathname === newUrl.pathname) {
    return
  }

  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|_vercel|.*\\..*).*)',
  ],
}
