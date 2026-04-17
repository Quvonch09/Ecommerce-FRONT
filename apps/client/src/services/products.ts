import { api } from './api';
import type { Product } from '../types';

export const getProducts = async () => {
  const { data } = await api.get<Product[]>('/products');
  return Array.isArray(data) ? data : [];
};
