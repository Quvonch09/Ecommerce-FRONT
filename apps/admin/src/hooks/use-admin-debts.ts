import { useQuery } from '@tanstack/react-query';
import { getDebtRecords } from '../services/debts';

export const useAdminDebts = () =>
  useQuery({
    queryKey: ['admin-debts'],
    queryFn: getDebtRecords,
  });
