import { PrismaClient } from "@prisma/client";

export default async function seedStatus(prisma: PrismaClient) {
  await prisma.task_status.createMany({
    data: [
      {
        id: 1,
        description: "Pending",
      },
      {
        id: 2,
        description: "Complete",
      },
      {
        id: 3,
        description: "Cancel",
      },
    ],
  });

  console.log("Status seeded");
}
