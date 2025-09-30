import bcrypt from "bcryptjs";
import prisma from "../config/prismaConfig.js";
import { NotFound, ValidationError } from "../utils/errorHandler.js";
import { hashPassword } from "../utils/hasPassword.js";
import {
  CreateUserInput,
  createUserSchema,
  userLoginValidationSchema,
} from "../validations/userSchema.js";

import jwt from "jsonwebtoken";
import "../config/environment.js";

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

export const userLogin = async (
  data: Omit<
    CreateUserInput,
    "given_name" | "family_name" | "middle_name" | "suffix"
  >
) => {
  const validatedData = userLoginValidationSchema.safeParse(data);

  if (!validatedData.success) throw validatedData.error;

  const loggedInUser = await prisma.users.findUnique({
    where: {
      username: validatedData.data.username,
    },
  });

  if (!loggedInUser) throw new NotFound("User not found.");

  //check if password match

  const isPasswordMatch = await bcrypt.compare(
    validatedData.data.password,
    loggedInUser.password
  );

  if (!isPasswordMatch) throw new ValidationError("Password does not match.");

  const token = jwt.sign(
    {
      id: loggedInUser.id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  return { token };
};
