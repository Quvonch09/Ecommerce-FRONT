import { api } from './api';

export const createPayment = async (amount: number) => {
  const { data } = await api.post('/payments', { amount });
  return data;
};
