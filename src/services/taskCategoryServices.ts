import prisma from "../config/prismaConfig.js";
import { NotFound, ValidationError } from "../utils/errorHandler.js";
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

export const getCategoryListService = async (categoryId: string) => {
  const categoryLists = await prisma.tasks.findMany({
    where: {
      category: Number(categoryId),
      status: 1 | 2,
    },
  });

  return categoryLists;
};

export const createTaskCategoryService = async (
  userId: CreateUserInput["id"],
  description: string
) => {
  if (!description)
    throw new ValidationError("Task Category Description is required.");

  if (!userId) throw new ValidationError("User id is required.");

  //find user
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new NotFound("User not found.");

  //create the task category
  const newTaskCategory = await prisma.tasks_category.create({
    data: {
      user_id: userId,
      description: description,
    },
  });

  return newTaskCategory;
};
