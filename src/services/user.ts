import prisma from "../config/prismaConfig.js";
import { hashPassword } from "../utils/hasPassword.js";
import {
  CreateUserInput,
  createUserSchema,
} from "../validations/userSchema.js";

export const createUserService = async (data: CreateUserInput) => {
  const validatedData = createUserSchema.safeParse(data);
  if (!validatedData.success) {
    throw validatedData.error;
  }

  const { password, ...rest } = validatedData.data;

  const newUser = await prisma.users.create({
    data: {
      ...rest,
      ...(password && { password: await hashPassword(password) }),
    },
  });

  return newUser;
};
