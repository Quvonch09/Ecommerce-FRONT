import { useQuery } from '@tanstack/react-query';
import { getMyDebt } from '../services/debts';

export const useDebt = () =>
  useQuery({
    queryKey: ['debt'],
    queryFn: getMyDebt,
  });
