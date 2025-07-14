import prisma from "../config/prismaConfig.js";
import { ValidatedIncomeTypes } from "../types/income.js";
import { createIncomeSchema } from "../validations/incomeValidation.js";

export const createIncomeService = async (
  incomeEntries: ValidatedIncomeTypes
) => {
  const validated = createIncomeSchema.safeParse(incomeEntries);

  if (!validated.success) {
    throw validated.error;
  }

  const newIncome = await prisma.income.create({
    data: { ...validated.data, date: new Date(validated.data.date) },
    //convert string date to date
  });

  return newIncome;
};
