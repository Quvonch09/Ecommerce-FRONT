import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/products';

export const useAdminProducts = () =>
  useQuery({
    queryKey: ['admin-products'],
    queryFn: getProducts,
  });
