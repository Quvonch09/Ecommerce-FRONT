import type { DebtRecord } from '../types';
import { getAdminUsers } from './users';

export const getDebtRecords = async (): Promise<DebtRecord[]> => {
  const users = await getAdminUsers();
  return users.map((user) => ({
    userId: user.id,
    fullName: user.fullName || user.username || `User ${user.id}`,
    totalDebt: Number(user.totalDebt ?? 0),
    totalPaid: Number(user.totalPaid ?? 0),
    remainingDebt: Number(user.remainingDebt ?? 0),
  }));
};
