import { useQuery } from '@tanstack/react-query';
import { getDashboardMetrics } from '../services/dashboard';

export const useDashboard = () =>
  useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: getDashboardMetrics,
  });
