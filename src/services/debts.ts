import { api } from './api';
import type { Debt, DebtResponse } from '../types';

export const getMyDebt = async () => {
  const { data } = await api.get<DebtResponse[]>('/debts/my');
  const items = Array.isArray(data) ? data : [];

  const summary = items.reduce(
    (acc, item) => {
      acc.totalDebt += item.totalAmount || 0;
      acc.totalPaid += item.paidAmount || 0;
      return acc;
    },
    { totalDebt: 0, totalPaid: 0 },
  );

  return {
    totalDebt: summary.totalDebt,
    totalPaid: summary.totalPaid,
    remainingDebt: Math.max(0, summary.totalDebt - summary.totalPaid),
    currency: 'UZS',
    items,
  } satisfies Debt;
};
