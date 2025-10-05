import prisma from "../config/prismaConfig.js";
import { CreateUserInput } from "../validations/userSchema.js";

export const getTraskCategoryServices = async (
  userId: CreateUserInput["id"]
) => {
  const taskCategories = await prisma.tasks_category.findMany({
    where: {
      user_id: userId,
    },
  });

  return taskCategories;
};
