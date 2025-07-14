import { z } from "zod";

export const createUserSchema = z.object({
  given_name: z.string().min(2, "Given name must be atleast 3 characters"),
  family_name: z.string().min(2, "Family name must be atleast 2 characters"),
  middle_name: z.string().optional(),
  suffix: z.string().optional(),
  username: z
    .string()
    .min(5, "Username must be atleast 3 characters")
    .max(36, "Username must not exceed by 36 characters."),
  password: z
    .string()
    .min(8, "Pasword must be atleast 8 characters")
    .max(36, "Password must not exceed by 36 characters."),
});
