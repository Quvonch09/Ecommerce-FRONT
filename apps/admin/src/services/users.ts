import type { AdminUser } from '../types';
import { api } from './api';

const normalizeUsers = (data: unknown): AdminUser[] => {
  if (Array.isArray(data)) {
    return data as AdminUser[];
  }

  if (data && typeof data === 'object') {
    const payload = data as { items?: AdminUser[]; content?: AdminUser[] };
    return payload.items || payload.content || [];
  }

  return [];
};

export const getAdminUsers = async () => {
  const { data } = await api.get('/admin/users');
  return normalizeUsers(data);
};

export const getAdminUserDetails = async (id: AdminUser['id']) => {
  const { data } = await api.get<AdminUser>(`/admin/users/${id}`);
  return data;
};
