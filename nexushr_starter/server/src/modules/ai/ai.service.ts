import { env } from '../../config/env';

export const queryAI = async (message: string, contextType?: string) => {
  // Stubbed Gemini call
  const prompt = `[${contextType || 'general'}] ${message}`;
  return {
    reply: `AI response to: ${prompt}`,
    model: env.GEMINI_API_KEY ? 'gemini-proxy' : 'mock',
  };
};
