import { api } from './api';

export const createPayment = async (debtId: number, amount: number) => {
  const { data } = await api.post<unknown>('/payments', { debtId, amount });
  return data;
};
