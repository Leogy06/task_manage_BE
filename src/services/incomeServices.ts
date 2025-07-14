import prisma from "../config/prismaConfig.js";
import { ValidatedIncomeTypes } from "../types/income.js";
import { createIncomeSchema } from "../validations/incomeValidation.js";

export const createIncomeService = async (
  incomeEntries: ValidatedIncomeTypes
) => {
  //validate
  const validated = createIncomeSchema.safeParse(incomeEntries);

  //certain condition
  if (!validated.success) {
    throw validated.error;
  }

  const newIncome = await prisma.income.create({
    data: {
      ...validated.data,

      //convert string date to date
      date: new Date(validated.data.date),
    },
  });

  return newIncome;
};
