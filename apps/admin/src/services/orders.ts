import type { AdminOrder, OrderStatus } from '../types';
import { api } from './api';

export const getAdminOrders = async (): Promise<AdminOrder[]> => {
  const { data } = await api.get<AdminOrder[]>('/admin/orders');
  return data.map((order) => ({
    ...order,
    totalAmount: Number(order.totalAmount ?? 0),
  }));
};

export const updateOrderStatus = async (id: AdminOrder['id'], status: OrderStatus) => {
  const { data } = await api.put(`/orders/${id}/status`, { status });
  return data.data ?? data;
};
