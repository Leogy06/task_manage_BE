import prisma from "../config/prismaConfig.js";
import { CreateUserInput } from "../validations/userSchema.js";

export const createUserService = async (data: CreateUserInput) => {
  const newUser = await prisma.users.create({
    data,
  });

  return newUser;
};
