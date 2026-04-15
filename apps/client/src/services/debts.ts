import { api } from './api';
import type { Debt } from '../types';

type ApiEnvelope<T> = {
  data: T;
};

type DebtItem = {
  id: number;
  totalAmount: number;
  paidAmount: number;
  status: string;
};

export const getMyDebt = async () => {
  const { data } = await api.get<ApiEnvelope<DebtItem[]>>('/debts/my');
  const debts = data.data ?? [];

  const totalDebt = debts.reduce((sum, debt) => sum + Number(debt.totalAmount ?? 0), 0);
  const totalPaid = debts.reduce((sum, debt) => sum + Number(debt.paidAmount ?? 0), 0);
  const remainingDebt = Math.max(totalDebt - totalPaid, 0);

  return {
    totalDebt,
    totalPaid,
    remainingDebt,
    currency: 'UZS',
    debts,
  } satisfies Debt & { debts: DebtItem[] };
};
