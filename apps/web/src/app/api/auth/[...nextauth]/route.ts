import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { auth as authApi } from '@/lib/api'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password')
        }

        try {
          const { data } = await authApi.login({
            email: credentials.email,
            password: credentials.password,
          })

          if (data.token) {
            // Store the token in localStorage on the client side
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', data.token)
            }

            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
            }
          }

          return null
        } catch (error) {
          throw new Error('Invalid email or password')
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }
