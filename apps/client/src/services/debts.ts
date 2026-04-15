import { api } from './api';
import type { Debt } from '../types';

export const getMyDebt = async () => {
  const { data } = await api.get('/debts/my');
  const debt = (data?.data ?? data) as Partial<Debt>;

  return {
    totalDebt: Number(debt.totalDebt ?? 0),
    totalPaid: Number(debt.totalPaid ?? 0),
    remainingDebt: Number(debt.remainingDebt ?? 0),
    currency: debt.currency ?? 'UZS',
  } satisfies Debt;
};
