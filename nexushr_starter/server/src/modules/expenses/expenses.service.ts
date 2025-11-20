import prisma from '../../prisma/client';
import { HttpError } from '../../middleware/errorHandler';
import { z } from 'zod';

const schema = z.object({
  amount: z.number().positive(),
  description: z.string(),
  category: z.string(),
});

export const createExpense = async (userId: string, department?: string, payload?: unknown) => {
  if (department !== 'Sales') {
    throw new HttpError(403, 'FORBIDDEN', 'Only Sales can create expenses');
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) throw new HttpError(400, 'INVALID_INPUT', 'Invalid expense');
  return prisma.expense.create({
    data: {
      userId,
      amount: parsed.data.amount,
      description: parsed.data.description,
      category: parsed.data.category,
    },
  });
};

export const listExpenses = async (tenantId: string, userId?: string) => {
  return prisma.expense.findMany({
    where: { user: { tenantId }, ...(userId ? { userId } : {}) },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
};
