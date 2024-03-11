import type { NextAuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth/next'
import GooglePorvider from 'next-auth/providers/google'

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
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
