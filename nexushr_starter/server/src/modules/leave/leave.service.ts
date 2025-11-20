import prisma from '../../prisma/client';
import { HttpError } from '../../middleware/errorHandler';
import { z } from 'zod';

const leaveSchema = z.object({
  type: z.enum(['HOLIDAY', 'SICKNESS', 'CARRY_OVER']),
  startDate: z.string(),
  endDate: z.string(),
  durationDays: z.number(),
  paymentType: z.string().optional(),
  reason: z.string().optional(),
});

export const createLeave = async (userId: string, payload: unknown) => {
  const parsed = leaveSchema.safeParse(payload);
  if (!parsed.success) throw new HttpError(400, 'INVALID_INPUT', 'Invalid leave request');
  const { startDate, endDate, durationDays } = parsed.data;
  if (new Date(startDate) > new Date(endDate)) {
    throw new HttpError(400, 'DATE_ORDER', 'Start date must be before end date');
  }

  const balance = await prisma.leaveBalance.findFirst({ where: { userId } });
  if (!balance || balance.remaining < durationDays) {
    throw new HttpError(400, 'INSUFFICIENT_BALANCE', 'Not enough allowance');
  }

  const request = await prisma.leaveRequest.create({
    data: {
      userId,
      type: parsed.data.type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      durationDays,
      paymentType: parsed.data.paymentType as any,
      status: 'PENDING',
      reason: parsed.data.reason,
    },
  });

  return request;
};

export const listLeave = async (tenantId: string, userId?: string) => {
  return prisma.leaveRequest.findMany({
    where: { user: { tenantId }, ...(userId ? { userId } : {}) },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
};

const updateStatus = async (id: string, status: 'APPROVED' | 'DECLINED') => {
  const leave = await prisma.leaveRequest.findUnique({ where: { id } });
  if (!leave) throw new HttpError(404, 'NOT_FOUND', 'Leave not found');

  if (status === 'APPROVED') {
    const balance = await prisma.leaveBalance.findFirst({ where: { userId: leave.userId } });
    if (!balance || balance.remaining < leave.durationDays) {
      throw new HttpError(400, 'INSUFFICIENT_BALANCE', 'Insufficient balance');
    }
    await prisma.leaveBalance.update({
      where: { id: balance.id },
      data: { remaining: balance.remaining - leave.durationDays },
    });
  }

  return prisma.leaveRequest.update({ where: { id }, data: { status } });
};

export const approveLeave = (id: string) => updateStatus(id, 'APPROVED');
export const declineLeave = (id: string) => updateStatus(id, 'DECLINED');
