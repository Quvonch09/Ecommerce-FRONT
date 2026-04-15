import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '../services/orders';

export const useOrders = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: getMyOrders,
  });
