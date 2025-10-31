import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const locales = ['fa', 'en']
const defaultLocale = 'fa'

// Protected routes that require authentication
const protectedRoutes = [
  '/share',
  '/profile',
  '/dashboard',
  '/settings'
]

// Public routes that should redirect authenticated users
const authRoutes = [
  '/login',
  '/signup'
]

export async function middleware(request: NextRequest) {
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

  // Handle locale redirection first
  if (!pathnameHasLocale) {
    const newPathname =
      pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
    
    const redirectUrl = new URL(newPathname, request.url)
    return NextResponse.redirect(redirectUrl, 308)
  }

  // Extract the path without locale for route protection checks
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
  
  // Get the current locale from pathname
  const currentLocale = pathname.split('/')[1] || defaultLocale

  // Check authentication status
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Protect routes that require authentication
  const isProtectedRoute = protectedRoutes.some(route => 
    pathWithoutLocale.startsWith(route)
  )

  if (isProtectedRoute && !token) {
    const loginUrl = new URL(`/${currentLocale}/login`, request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth pages
  const isAuthRoute = authRoutes.some(route => 
    pathWithoutLocale.startsWith(route)
  )

  if (isAuthRoute && token) {
    const homeUrl = new URL(`/${currentLocale}/`, request.url)
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|_static|favicon.ico).*)',
  ],
}
