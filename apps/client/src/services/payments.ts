import { api } from './api';

type ApiEnvelope<T> = {
  data: T;
};

export const createPayment = async (debtId: number, amount: number) => {
  const { data } = await api.post<ApiEnvelope<unknown>>('/payments', { debtId, amount });
  return data.data;
};
