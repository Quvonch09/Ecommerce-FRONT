import { api } from './api';
import type { CartItem, Order } from '../types';

export const getMyOrders = async () => {
  const { data } = await api.get<Order[]>('/orders/my');
  return Array.isArray(data) ? data : [];
};

export const createOrder = async (cartItems: CartItem[]) => {
  const payload = {
    items: cartItems.map((item) => ({
      productId: Number(item.productId),
      quantity: item.quantity,
    })),
    createDebt: true,
  };

  const { data } = await api.post<Order>('/orders', payload);
  return data;
};
