import { searchDirectory } from '../users/users.service';

export const searchEmployees = async (tenantId: string, query: string) => {
  return searchDirectory(tenantId, query);
};
