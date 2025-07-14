import { z } from "zod";
import { createIncomeSchema } from "../validations/incomeValidation.ts";

type IncomeTypes = {
  id: number;
  user_id: number;
  source: string;
  amount: number;
  date: Date;
  notes?: string;
};

export type ValidatedIncomeTypes = z.infer<typeof createIncomeSchema>;
