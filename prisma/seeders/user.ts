import { PrismaClient, User } from '@prisma/client'
import faker from 'faker'

const prisma = new PrismaClient()

const data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[] = Array.from({ length: 50 }).map(() => ({
  email: faker.internet.email().toLowerCase(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.random.alphaNumeric(8),
}))

export default async () => {
  const result = await prisma.user.createMany({
    data
  })

  console.log(`${result.count} records created for user`)
}
