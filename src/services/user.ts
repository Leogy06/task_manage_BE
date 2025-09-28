import prisma from "../config/prismaConfig.js";
import { ValidationError } from "../utils/errorHandler.js";
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

  //check if username already taken
  const isUsernameTaken = await prisma.users.findUnique({
    where: {
      username: validatedData.data.username,
    },
  });

  if (isUsernameTaken) throw new ValidationError("Username has already taken.");

  const newUser = await prisma.users.create({
    data: {
      ...validatedData.data,
      password: await hashPassword(validatedData.data.password),
    },
  });

  return newUser;
};

export const checkUsernameService = async (username: string) => {
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    return {
      message: "Username is already taken.",
      exist: true,
    };
  }
  return {
    exist: false,
    message: "Username is available.",
  };
};
