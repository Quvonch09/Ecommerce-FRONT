import { api } from './api';
import type { CartItem, Order } from '../types';

const normalizeOrders = (data: unknown): Order[] => {
  if (Array.isArray(data)) {
    return data as Order[];
  }

  if (data && typeof data === 'object') {
    const objectData = data as { content?: Order[]; items?: Order[] };
    return objectData.content || objectData.items || [];
  }

  return [];
};

export const getMyOrders = async () => {
  const { data } = await api.get('/orders/my');
  return normalizeOrders(data);
};

export const createOrder = async (cartItems: CartItem[]) => {
  const payload = {
    items: cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };

  const { data } = await api.post('/orders', payload);
  return data;
};
