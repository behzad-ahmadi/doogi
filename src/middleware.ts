import { NextRequest, NextResponse } from 'next/server'

const locales = ['fa', 'en']
const defaultLocale = 'fa'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Exclude service worker and other static files
  if (
    pathname === '/sw.js' ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/')
  ) {
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // Always redirect to default locale (fa) if no locale is specified
  const newPathname =
    pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
  request.nextUrl.pathname = newPathname

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|_static|favicon.ico).*)',
  ],
}
