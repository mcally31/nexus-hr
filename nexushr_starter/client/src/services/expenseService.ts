import apiClient from './apiClient';
import { Expense } from '../types';

export const createExpense = async (payload: Partial<Expense> & { amount: number; description: string; category: string }) => {
  const { data } = await apiClient.post('/expenses', payload);
  return data as Expense;
};

export const fetchExpenses = async () => {
  const { data } = await apiClient.get<Expense[]>('/expenses');
  return data;
};
