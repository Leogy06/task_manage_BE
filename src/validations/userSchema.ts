import { z } from "zod";

export const createUserSchema = z.object({
  given_name: z.string().min(1).max(36),
  family_name: z.string().min(1).max(36),
  middle_name: z.string().max(20).optional(),
  suffix: z.string().max(10).optional(),
  email: z.string().email().min(5).max(50),
  password: z.string().min(8).max(20),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
