import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/client';
import { env } from '../../config/env';
import { z } from 'zod';
import { HttpError } from '../../middleware/errorHandler';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (data: { email: string; password: string; tenantName?: string }) => {
  const parsed = authSchema.safeParse({ email: data.email, password: data.password });
  if (!parsed.success) {
    throw new HttpError(400, 'INVALID_INPUT', 'Email and password required');
  }

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new HttpError(400, 'EMAIL_EXISTS', 'User already exists');
  }

  const tenant = await prisma.tenant.create({
    data: { name: data.tenantName || 'Default Tenant' },
  });

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      tenantId: tenant.id,
      role: 'SUPER_ADMIN',
      firstName: 'Admin',
      lastName: 'User',
    },
  });

  return generateAuthResponse(user);
};

export const login = async (email: string, password: string) => {
  const parsed = authSchema.safeParse({ email, password });
  if (!parsed.success) {
    throw new HttpError(400, 'INVALID_INPUT', 'Invalid login');
  }
  const user = await prisma.user.findUnique({
    where: { email },
    include: { department: true },
  });
  if (!user) {
    throw new HttpError(401, 'INVALID_CREDENTIALS', 'Invalid credentials');
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new HttpError(401, 'INVALID_CREDENTIALS', 'Invalid credentials');
  }
  return generateAuthResponse(user);
};

export const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { department: true } });
  if (!user) throw new HttpError(404, 'NOT_FOUND', 'User not found');
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    department: user.department?.name,
    tenantId: user.tenantId,
  };
};

const generateAuthResponse = (user: { id: string; email: string; role: string; tenantId: string; department?: { name?: string } | null }) => {
  const department = user.department?.name || null;
  const token = jwt.sign({ id: user.id, role: user.role, tenantId: user.tenantId, department }, env.JWT_SECRET, {
    expiresIn: '7d',
  });
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      department,
      tenantId: user.tenantId,
    },
  };
};
