import { PrismaClient } from "@prisma/client"

import stat from './seeders/stat'
import ability from './seeders/ability'
import type from './seeders/type'
import pokemon from './seeders/pokemon'
import user from './seeders/user'

const prisma = new PrismaClient()

async function main() {
  await stat()
  await ability()
  await type()
  await pokemon()
  await user()
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit()
  })
