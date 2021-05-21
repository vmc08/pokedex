import { Prisma } from "@prisma/client"

import { TLoginFormValues } from "src/modules/login/forms/LoginForm"
import prisma from "src/utils/prisma"

export const loginService = (credentials: TLoginFormValues) => {
  return prisma.user.findFirst({
    where: credentials,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  })
}
export type TLoginService = Prisma.PromiseReturnType<typeof loginService>
