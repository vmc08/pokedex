import NextAuth from "next-auth"
import { User as TUser } from "@prisma/client"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: Omit<TUser, "password" | "createdAt" | "updatedAt">
  }
}
