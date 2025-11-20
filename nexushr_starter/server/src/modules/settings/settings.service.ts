export const getSettings = async () => ({
  payrollCutoffDay: 25,
  timezone: 'UTC',
});

export const updateSettings = async (_data: Record<string, unknown>) => {
  return { success: true };
};
