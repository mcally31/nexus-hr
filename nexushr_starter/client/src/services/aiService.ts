import apiClient from './apiClient';

export const queryAI = async (message: string, contextType?: string) => {
  const { data } = await apiClient.post('/ai/query', { message, contextType });
  return data as { reply: string; model: string };
};
