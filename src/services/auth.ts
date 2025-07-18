import jwt from "jsonwebtoken";
import { NotFound, ValidationError } from "../utils/errorHandler.js";
import "../config/environment.js";
import {
  loginUserSchema,
  ValidatedUserSchema,
} from "../validations/userValidation.js";
import prisma from "../config/prismaConfig.js";
import { comparePassword } from "../utils/hashPasswords.js";

export const loginService = async ({
  username,
  password,
}: ValidatedUserSchema) => {
  const validate = loginUserSchema.safeParse({
    username,
    password,
  });

  if (!validate.success) {
    throw validate.error;
  }

  const userLoggedIn = await prisma.users.findUnique({
    where: {
      username: validate.data.username,
    },
  });

  if (!userLoggedIn) {
    throw new NotFound("Username not found.");
  }

  const isPasswordMatch = await comparePassword(
    password,
    userLoggedIn.password
  );

  if (!isPasswordMatch) {
    throw new ValidationError("Password does not match with username.");
  }

  return {
    userAuthenticated: true,
    id: userLoggedIn.id,
  };
};

export const checkTokenValidityService = (token: string) => {
  if (!token) throw new NotFound("Token not found. Please login again.");

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

  if (
    !decodedToken ||
    typeof decodedToken !== "object" ||
    !("userId" in decodedToken)
  ) {
    throw new ValidationError("Invalid token, please login again.");
  }

  return { loggedIn: true, decodedToken };
};
