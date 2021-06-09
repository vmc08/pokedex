import prisma from "../src/utils/prisma";
import stat from "./seeders/stat";
import ability from "./seeders/ability";
import type from "./seeders/type";
import pokemon from "./seeders/pokemon";
import user from "./seeders/user";

async function seed() {
  await stat();
  await ability();
  await type();
  await pokemon();
  await user();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit();
  });

export default seed;
