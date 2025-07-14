import { z } from "zod";

export const createIncomeSchema = z.object({
  user_id: z.number().nonnegative(),
  source: z.string().min(1, { message: "Source of income is required." }),
  amount: z
    .number()
    .nonnegative()
    .refine((val) => Number.isInteger(Math.round(val * 100)), {
      message: "Amount must be 2 decimal places.",
    }),
  date: z.string().min(1, {
    message: "Date is required.",
  }),
  notes: z.string().optional(),
});
