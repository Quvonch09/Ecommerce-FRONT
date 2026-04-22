import { api } from './api';

export const createDelivery = async (orderId: number | string, address: string) => {
  const { data } = await api.post('app/deliveries', { orderId, address });
  return data;
};
