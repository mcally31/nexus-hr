export type UserRole = 'SUPER_ADMIN' | 'HR_ADMIN' | 'MANAGER' | 'EMPLOYEE' | 'FINANCE' | 'RECRUITER';

export interface Department {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  department?: string | null;
  firstName?: string;
  lastName?: string;
}

export interface LeaveRequest {
  id: string;
  type: 'HOLIDAY' | 'SICKNESS' | 'CARRY_OVER';
  startDate: string;
  endDate: string;
  durationDays: number;
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
  paymentType?: 'PAID' | 'UNPAID';
  reason?: string;
  user?: User;
}

export interface LeaveBalance {
  remaining: number;
  carriedOver: number;
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  status: string;
  createdAt?: string;
}

export interface Document {
  id: string;
  title: string;
  url: string;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}
