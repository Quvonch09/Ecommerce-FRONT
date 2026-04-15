import type { AdminOrder, OrderStatus } from '../types';
import { api } from './api';

export const getAdminOrders = async (): Promise<AdminOrder[]> => {
  return Promise.reject(new Error(
    'Swagger spec does not expose a list-all-orders endpoint. Backend must add one before the admin orders table can work.',
  )) as Promise<AdminOrder[]>;
};

export const updateOrderStatus = async (id: AdminOrder['id'], status: OrderStatus) => {
  const { data } = await api.put(`/orders/${id}/status`, { status });
  return data.data ?? data;
};
