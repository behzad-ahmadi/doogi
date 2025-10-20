import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user || !user.password) return null
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null
        return { id: user.id, email: user.email, name: user.name ?? undefined }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, account }: any) {
      if (user && 'id' in user) {
        token.sub = (user as { id: string }).id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.email = session.user.email ?? (token.email as string)
        session.user.name = session.user.name ?? (token.name as string)
      }
      return session
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user, account }: any) {
      try {
        // Allow OAuth sign-ins
        if (account?.provider === 'google') {
          // Check if user exists in database
          if (user?.email) {
            const existingUser = await prisma.user.findUnique({
              where: { email: user.email }
            })
            
            // If user doesn't exist, create them
            if (!existingUser) {
              await prisma.user.create({
                data: {
                  email: user.email,
                  name: user.name || '',
                  image: user.image || null,
                }
              })
            }
          }
          return true
        }
        
        // Allow credentials sign-ins
        if (account?.provider === 'credentials') {
          return true
        }
        
        return false
      } catch (error) {
        console.error('SignIn callback error:', error)
        return false
      }
    },
  },
}