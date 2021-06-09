import { Prisma } from "@prisma/client";

import { TLoginSchemaValues } from "src/modules/login/validations/loginSchema";
import prisma from "src/utils/prisma";

export const loginService = (credentials: TLoginSchemaValues) => {
  return prisma.user.findFirst({
    where: credentials,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
};
export type TLoginServiceResult = Prisma.PromiseReturnType<typeof loginService>;
