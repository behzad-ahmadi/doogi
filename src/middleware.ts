import { NextRequest, NextResponse } from 'next/server'

const locales = ['fa', 'en']
const defaultLocale = 'fa'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Early return for static assets and API routes - optimized order
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/api/auth/') ||
    pathname.startsWith('/api/') ||
    pathname === '/sw.js' ||
    pathname === '/manifest.json' ||
    pathname.startsWith('/web-app-manifest-') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Always redirect to default locale (fa) if no locale is specified
  const newPathname =
    pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
  
  // Create redirect URL - use 308 for permanent redirect for better caching
  const redirectUrl = new URL(newPathname, request.url)
  return NextResponse.redirect(redirectUrl, 308)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|_static|favicon.ico).*)',
  ],
}
