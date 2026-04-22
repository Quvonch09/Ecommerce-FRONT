import { api } from './api';
import type { Product } from '../types';

const normalizeProducts = (data: unknown): Product[] => {
  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (data && typeof data === 'object') {
    const objectData = data as { content?: Product[]; items?: Product[] };
    return objectData.content || objectData.items || [];
  }

  return [];
};

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return normalizeProducts(data);
};
