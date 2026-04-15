import { api } from './api';
import type { Product } from '../types';

type ApiEnvelope<T> = {
  data: T;
};

export const getProducts = async () => {
  const { data } = await api.get<ApiEnvelope<Product[]>>('/products');
  return data.data ?? [];
};
