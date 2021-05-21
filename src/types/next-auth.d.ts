import NextAuth from "next-auth"
import { TLoginService } from "src/modules/login/services"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: TLoginService
  }
}
