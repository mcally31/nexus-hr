import prisma from '../../prisma/client';
import { HttpError } from '../../middleware/errorHandler';
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  tenantId: z.string(),
  departmentId: z.string().optional(),
});

export const listUsers = async (tenantId: string) => {
  return prisma.user.findMany({ where: { tenantId }, include: { department: true } });
};

export const createUser = async (payload: unknown) => {
  const parsed = createUserSchema.safeParse(payload);
  if (!parsed.success) throw new HttpError(400, 'INVALID_INPUT', 'Invalid user payload');
  return prisma.user.create({ data: parsed.data });
};

export const updateUser = async (id: string, data: Partial<{ firstName: string; lastName: string; departmentId?: string }>) => {
  return prisma.user.update({ where: { id }, data });
};

export const removeUser = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};

export const searchDirectory = async (tenantId: string, query: string) => {
  return prisma.user.findMany({
    where: {
      tenantId,
      OR: [
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { department: { name: { contains: query, mode: 'insensitive' } } },
      ],
    },
    include: { department: true },
  });
};
