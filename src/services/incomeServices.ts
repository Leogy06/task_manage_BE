import { endOfMonth, startOfMonth } from "date-fns";
import prisma from "../config/prismaConfig.js";
import { ValidatedIncomeTypes } from "../types/income.js";
import { ValidationError } from "../utils/errorHandler.js";
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

export const getIncomeService = async (userId: number) => {
  if (!userId)
    throw new ValidationError("Unable to get income, user id is missing.");

  if (isNaN(Number(userId)))
    throw new ValidationError(
      "Unable to get income, user id must be a number."
    );

  const incomes = await prisma.income.findMany({
    where: {
      user_id: Number(userId),
    },
  });

  return incomes;
};

export const getUserTotalIncomeService = async (
  userId: number,
  month?: number
) => {
  if (!userId)
    throw new ValidationError("Unable to get income, user id is missing.");

  if (isNaN(Number(userId)))
    throw new ValidationError(
      "Unable to get income, user id must be a number."
    );

  //date filter
  const dateFilter = month
    ? {
        gte: startOfMonth(new Date(new Date().getFullYear(), month - 1)),
        lt: endOfMonth(new Date(new Date().getFullYear(), month - 1)),
      }
    : undefined;

  const incomes = await prisma.income.aggregate({
    where: {
      user_id: Number(userId),
      ...(dateFilter && { date: dateFilter }),
    },
    _sum: {
      amount: true,
    },
  });

  return incomes._sum.amount ?? 0;
};
