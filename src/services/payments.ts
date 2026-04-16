import { api } from './api';
import type { PaymentRequest, PaymentResponse } from '../types';

export const createPayment = async (payload: PaymentRequest) => {
  const { data } = await api.post<PaymentResponse>('/payments', payload);
  return data;
};
