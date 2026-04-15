import { useQuery } from '@tanstack/react-query';
import { getAdminOrders } from '../services/orders';

export const useAdminOrders = () =>
  useQuery({
    queryKey: ['admin-orders'],
    queryFn: getAdminOrders,
  });
