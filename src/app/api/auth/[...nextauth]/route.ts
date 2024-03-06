import type { NextAuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth/next'
import GooglePorvider from 'next-auth/providers/google'
import { fetcher } from '@/utils'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    GooglePorvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      fetcher.post('/users', user)
      return true
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
