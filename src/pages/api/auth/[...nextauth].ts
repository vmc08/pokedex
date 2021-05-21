import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import NextAuth, { NextAuthOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import { TLoginFormValues } from 'src/modules/login/forms/LoginForm'
import { loginService, TLoginService } from 'src/modules/login/services'
import prisma from 'src/utils/prisma'

const options: NextAuthOptions = {
  providers: [
    Providers.Credentials({
      authorize: async (credentials: TLoginFormValues) => {
        const user = await loginService({
          email: credentials.email,
          password: credentials.password,
        })
        return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { jwt: true },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    jwt: async (token, user) => ({ ...token, ...user }),
    session: async (session, user) => {
      session.user = user as TLoginService
      return session
    },
  }
}

export default (req: NextApiRequest, res: NextApiResponse): ReturnType<NextApiHandler> => NextAuth(req, res, options)
