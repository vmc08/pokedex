import { PrismaClient } from "@prisma/client"

import stat from './seeders/stat'

const prisma = new PrismaClient()

async function main() {
  await stat()
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
