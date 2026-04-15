import { api } from './api';
import type { CartItem, Order } from '../types';

type ApiEnvelope<T> = {
  data: T;
};

export const getMyOrders = async () => {
  const { data } = await api.get<ApiEnvelope<Order[]>>('/orders/my');
  return data.data ?? [];
};

export const createOrder = async (cartItems: CartItem[]) => {
  const payload = {
    items: cartItems.map((item) => ({
      productId: Number(item.productId),
      quantity: item.quantity,
    })),
    createDebt: true,
  };

  const { data } = await api.post<ApiEnvelope<Order>>('/orders', payload);
  return data.data;
};
