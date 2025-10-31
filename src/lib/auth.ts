import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user?.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  session: {
    strategy: 'database' as const, // با adapter
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user }: { session: any; user: any }) {
      if (session.user && user) {
        session.user.id = user.id
      }
      return session
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // If the URL is relative, make it absolute
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // If the URL is on the same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url
      }
      
      // Try to extract language from the current URL or callback URL
      let detectedLang = 'fa' // Default to Persian as per middleware
      
      // Check if URL contains language parameter
      if (url.includes('callbackUrl=')) {
        const callbackUrl = decodeURIComponent(url.split('callbackUrl=')[1])
        const callbackSegments = callbackUrl.split('/').filter(Boolean)
        if (callbackSegments[0] === 'en' || callbackSegments[0] === 'fa') {
          detectedLang = callbackSegments[0]
        }
      } else {
        // Extract from current URL
        const urlObj = new URL(url.startsWith('http') ? url : `${baseUrl}${url}`)
        const pathSegments = urlObj.pathname.split('/').filter(Boolean)
        if (pathSegments[0] === 'en' || pathSegments[0] === 'fa') {
          detectedLang = pathSegments[0]
        }
      }
      
      // Default redirect to home page with detected language
      return `${baseUrl}/${detectedLang}`
    },
  },
}
