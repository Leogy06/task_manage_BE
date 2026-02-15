import bcrypt from "bcryptjs";
import prisma from "../config/prismaConfig.js";
import { NotFound, ValidationError } from "../utils/errorHandler.js";
import { hashPassword } from "../utils/hasPassword.js";
import {
  CreateUserInput,
  createUserSchema,
  userLoginValidationSchema,
} from "../validations/userSchema.js";
import "dotenv/config";

import jwt from "jsonwebtoken";

// * env
import "../config/environment.js";
import { RequestUserType } from "../types/request.js";
import { HttpError } from "../classes/httpError.js";

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
  >,
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
    loggedInUser.password,
  );

  if (!isPasswordMatch) throw new ValidationError("Password does not match.");

  const token = jwt.sign(
    {
      id: loggedInUser.id,
      username: loggedInUser.username,
      given_name: loggedInUser.given_name,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );

  return token;
};

// ? require user auth
export const requireUserAuthService = async (userToken: string) => {
  if (!userToken) throw new HttpError("No token was found.", 401);

  try {
    const isTokenValid = jwt.verify(
      userToken,
      process.env.JWT_SECRET!,
    ) as RequestUserType;

    return {
      isTokenValid: true,
      user: isTokenValid,
    };
  } catch (error) {
    throw new HttpError("Token is invalid", 401);
  }
};

// * check user
export const checkUserService = (userToken: string) => {
  if (!userToken) throw new HttpError("Token not found.", 401);

  try {
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET!);

    return decoded;
  } catch {
    throw new HttpError("User token was invalid.", 401);
  }
};
