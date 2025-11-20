import prisma from '../../prisma/client';
import { z } from 'zod';
import { HttpError } from '../../middleware/errorHandler';

const schema = z.object({
  title: z.string(),
  url: z.string().url(),
  userId: z.string().optional(),
});

export const uploadDocument = async (tenantId: string, payload: unknown) => {
  const parsed = schema.safeParse(payload);
  if (!parsed.success) throw new HttpError(400, 'INVALID_INPUT', 'Invalid document');
  return prisma.document.create({
    data: {
      title: parsed.data.title,
      url: parsed.data.url,
      userId: parsed.data.userId,
      tenantId,
    },
  });
};

export const listDocuments = async (tenantId: string) => {
  return prisma.document.findMany({ where: { tenantId } });
};
