import { api } from './api';
import type { Debt } from '../types';

type DebtItem = {
  id: number;
  totalAmount: number;
  paidAmount: number;
  status: string;
};

export const getMyDebt = async () => {
  const { data } = await api.get<DebtItem[]>('/debts/my');
  const debts = Array.isArray(data) ? data : [];

  const totalDebt = debts.reduce((sum, item) => sum + Number(item.totalAmount ?? 0), 0);
  const totalPaid = debts.reduce((sum, item) => sum + Number(item.paidAmount ?? 0), 0);
  const remainingDebt = Math.max(totalDebt - totalPaid, 0);

  return {
    totalDebt,
    totalPaid,
    remainingDebt,
    currency: 'UZS',
    debts,
  } satisfies Debt & { debts: DebtItem[] };
};
