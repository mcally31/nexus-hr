import { Request, Response } from 'express';
import { login, register, getCurrentUser } from './auth.service';
import { AuthRequest } from '../../middleware/auth';

export const handleRegister = async (req: Request, res: Response) => {
  const { email, password, tenantName } = req.body;
  const result = await register({ email, password, tenantName });
  res.json(result);
};

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  res.json(result);
};

export const handleMe = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id as string;
  const user = await getCurrentUser(userId);
  res.json(user);
};
