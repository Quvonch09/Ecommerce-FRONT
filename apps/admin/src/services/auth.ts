import type { AdminUser } from '../types';
import { adminAuthStore } from '../store/auth-store';
import { api } from './api';

export const loginAdmin = async (phoneNumber: string, password: string) => {
  const { data } = await api.post<{ token: string; user: AdminUser }>('/auth/admin/login', {
    phoneNumber,
    password,
  });

  if (data.token) {
    adminAuthStore.setSession(data.token, data.user);
  }

  return data;
};

export const getAdminMe = async () => {
  const { data } = await api.get<AdminUser>('/me');
  if (data) {
    adminAuthStore.setSession(adminAuthStore.getSnapshot().token || '', data);
  }
  return data;
};
