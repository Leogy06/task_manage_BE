import { z } from "zod";

export const taskCategorySchema = z.object({
  id: z.number(),
  archive: z.number(),
});

export type TraskCategoryType = z.infer<typeof taskCategorySchema>;
