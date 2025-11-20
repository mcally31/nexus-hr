import prisma from '../../prisma/client';
import { z } from 'zod';
import { HttpError } from '../../middleware/errorHandler';

const schema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  notes: z.string().optional(),
});

export const logSickness = async (userId: string, payload: unknown) => {
  const parsed = schema.safeParse(payload);
  if (!parsed.success) throw new HttpError(400, 'INVALID_INPUT', 'Invalid sickness payload');
  return prisma.sicknessReport.create({
    data: {
      userId,
      startDate: new Date(parsed.data.startDate),
      endDate: new Date(parsed.data.endDate),
      notes: parsed.data.notes,
    },
  });
};

export const listSickness = async (tenantId: string) => {
  return prisma.sicknessReport.findMany({
    where: { user: { tenantId } },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
};
