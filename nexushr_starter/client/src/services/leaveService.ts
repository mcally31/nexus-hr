import apiClient from './apiClient';
import { LeaveRequest } from '../types';

export const submitLeave = async (payload: Partial<LeaveRequest> & { startDate: string; endDate: string }) => {
  const { data } = await apiClient.post('/leave', payload);
  return data as LeaveRequest;
};

export const fetchLeave = async () => {
  const { data } = await apiClient.get<LeaveRequest[]>('/leave');
  return data;
};

export const approveLeave = async (id: string) => {
  const { data } = await apiClient.patch(`/leave/${id}/approve`);
  return data;
};

export const declineLeave = async (id: string) => {
  const { data } = await apiClient.patch(`/leave/${id}/decline`);
  return data;
};
