import type { Product } from '../types';
import { api } from './api';

const normalizeProducts = (data: unknown): Product[] => {
  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (data && typeof data === 'object') {
    const payload = data as { items?: Product[]; content?: Product[] };
    return payload.items || payload.content || [];
  }

  return [];
};

export const getProducts = async () => {
  const { data } = await api.get<{ data: Product[] }>('app/products');
  return normalizeProducts(data.data);
};

export const createProduct = async (payload: Omit<Product, 'id'>) => {
  const { data } = await api.post('app/products', payload);
  return data.data ?? data;
};

export const updateProduct = async (id: Product['id'], payload: Partial<Product>) => {
  const { data } = await api.put(`app/products/${id}`, payload);
  return data.data ?? data;
};

export const deleteProduct = async (id: Product['id']) => {
  const { data } = await api.delete(`app/products/${id}`);
  return data.data ?? data;
};
