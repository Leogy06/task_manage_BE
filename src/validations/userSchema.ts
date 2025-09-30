import { z } from "zod";

export const createUserSchema = z.object({
  given_name: z.string().min(1).max(36),
  family_name: z.string().min(1).max(36),
  middle_name: z.string().max(20).optional(),
  suffix: z.string().max(5).optional(),
  username: z.string().min(5).max(36),
  password: z
    .string()
    .min(8, "Password should be atleast 8 characters.")
    .max(20),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

//user login validation schema
export const userLoginValidationSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

export type UserLoginInput = z.infer<typeof createUserSchema>;
