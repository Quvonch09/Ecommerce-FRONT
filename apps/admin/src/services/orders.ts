import type { AdminOrder, OrderStatus } from '../types';
import { api } from './api';

const normalizeOrders = (data: unknown): AdminOrder[] => {
  if (Array.isArray(data)) {
    return data as AdminOrder[];
  }

  if (data && typeof data === 'object') {
    const payload = data as { items?: AdminOrder[]; content?: AdminOrder[] };
    return payload.items || payload.content || [];
  }

  return [];
};

export const getAdminOrders = async () => {
  const { data } = await api.get('/admin/orders');
  return normalizeOrders(data);
};

export const updateOrderStatus = async (id: AdminOrder['id'], status: OrderStatus) => {
  const { data } = await api.patch(`/admin/orders/${id}/status`, { status });
  return data;
};
