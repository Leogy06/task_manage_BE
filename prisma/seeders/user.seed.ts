import { PrismaClient } from "@prisma/client";

export default async function seedUsers(prisma: PrismaClient) {
  await prisma.users.createMany({
    data: [
      {
        username: "admin",
        password: "@Password123",
        family_name: "Doe",
        given_name: "John",
      },
      {
        username: "demo",
        password: "@Password123",
        family_name: "Doe",
        given_name: "Jane",
      },
    ],
  });

  console.log("Users seeded");
}
