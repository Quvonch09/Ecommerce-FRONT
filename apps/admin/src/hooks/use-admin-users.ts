import { useQuery } from '@tanstack/react-query';
import { getAdminUsers } from '../services/users';

export const useAdminUsers = () =>
  useQuery({
    queryKey: ['admin-users'],
    queryFn: getAdminUsers,
  });
