import apiClient from './apiClient';
import { User } from '../types';

export const login = async (email: string, password: string) => {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data as { token: string; user: User };
};

export const getCurrentUser = async () => {
  const { data } = await apiClient.get<User>('/auth/me');
  return data;
};
