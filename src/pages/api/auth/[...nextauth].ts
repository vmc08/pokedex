import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import { TLoginSchemaValues } from "src/modules/login/validations/loginSchema";
import { loginService, TLoginServiceResult } from "src/modules/login/services";
import prisma from "src/utils/prisma";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: TLoginServiceResult;
  }
}

const options: NextAuthOptions = {
  providers: [
    Providers.Credentials({
      authorize: async (credentials: TLoginSchemaValues) => {
        const user = await loginService({
          email: credentials.email,
          password: credentials.password,
        });
        return user;
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
      session.user = user as TLoginServiceResult;
      return session;
    },
  },
};

export default (
  req: NextApiRequest,
  res: NextApiResponse
): ReturnType<NextApiHandler> => NextAuth(req, res, options);
