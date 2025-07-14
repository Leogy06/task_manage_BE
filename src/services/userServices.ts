import { createUserSchema } from "../validations/userValidation.js";
import prisma from "../config/prismaConfig.js";
import { hashedPassword } from "../utils/hashPasswords.js";
import { z } from "zod";
import { ValidationError } from "../utils/errorHandler.js";

type ValidatedUser = z.infer<typeof createUserSchema>;

export const createUserService = async ({
  given_name,
  family_name,
  middle_name,
  suffix,
  username,
  password,
}: ValidatedUser) => {
  const validatedUser = createUserSchema.safeParse({
    given_name,
    family_name,
    middle_name,
    suffix,
    username,
    password,
  });

  if (!validatedUser.success) {
    throw validatedUser.error;
  }

  const hashed = await hashedPassword(validatedUser.data?.password as string);

  const newUser = await prisma.users.create({
    data: {
      given_name: validatedUser.data.given_name,
      family_name: validatedUser.data.family_name,
      username: validatedUser.data.username,
      middle_name: validatedUser.data.middle_name,
      suffix: validatedUser.data.suffix,
      password: hashed,
    },
  });

  return newUser;
};
