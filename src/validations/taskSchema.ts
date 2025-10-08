import { z } from "zod";

export const createTaskSchema = z.object({
  id: z.number().nonnegative().optional(),
  name: z.string().min(1, "Task name is required."),
  description: z.string().optional(),
  category: z
    .number()
    .nonnegative()
    .min(1, "Category ID of the task is required"),
  status: z.number().nonnegative().optional(), // status is default by 1 (pending)
});

export type TaskSchema = z.infer<typeof createTaskSchema>;
