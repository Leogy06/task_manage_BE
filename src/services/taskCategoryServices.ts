import prisma from "../config/prismaConfig.js";
import { NotFound, ValidationError } from "../utils/errorHandler.js";
import { CreateUserInput } from "../validations/userSchema.js";
import { createTaskSchema, TaskSchema } from "../validations/taskSchema.js";

import dayjs from "dayjs";

// * task category
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

// * tasks
export const getCategoryListService = async (categoryId: string) => {
  const categoryLists = await prisma.tasks.findMany({
    where: {
      category: Number(categoryId),
      status: {
        not: 3,
      },
    },
  });

  return categoryLists;
};

export const createTaskService = async (data: TaskSchema) => {
  const validatedData = createTaskSchema.safeParse(data);

  if (!validatedData.success) throw validatedData.error;

  const findCategoryTask = await prisma.tasks_category.findUnique({
    where: {
      id: Number(validatedData.data.category),
    },
  });

  if (!findCategoryTask) throw new NotFound("Task Category not found.");

  //create the task
  const newTask = await prisma.tasks.create({
    data: {
      category: findCategoryTask.id,
      name: validatedData.data.name,
      start_date: new Date(),
      end_date: dayjs().add(1, "day").format(), // default end date - tommorow of the day it was created.
    },
  });

  return newTask;
};

// * edit status
export const editTaskStatusService = async (data: TaskSchema) => {
  //check if task exist
  const isTaskExist = await prisma.tasks.findUnique({
    where: {
      id: data.id,
    },
  });
  if (!isTaskExist) throw new NotFound("Task not found.");

  // ? check if task status exist in task-status db
  const isTaskStatusExist = await prisma.task_status.findUnique({
    where: {
      id: data.status,
    },
  });

  if (!isTaskStatusExist) throw new NotFound("Task status is invalid.");

  // ? edit task status

  const updatedTask = await prisma.tasks.update({
    where: {
      id: data.id,
    },

    data: {
      status: data.status, // new status
    },
  });

  return updatedTask;
};
