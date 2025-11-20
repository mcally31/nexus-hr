import apiClient from './apiClient';
import { User } from '../types';

export const searchDirectory = async (q: string) => {
  const { data } = await apiClient.get<User[]>('/directory', { params: { q } });
  return data;
};
