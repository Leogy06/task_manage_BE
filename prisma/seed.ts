import { PrismaClient } from "@prisma/client";
import seedUsers from "./seeders/user.seed";

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
