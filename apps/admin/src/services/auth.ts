import type { AdminUser } from '../types';
import { adminAuthStore } from '../store/auth-store';
import { api } from './api';

export const loginAdmin = async (username: string, password: string) => {
  void username;
  void password;
  return Promise.reject(new Error(
    'Swagger spec does not expose /auth/admin/login. Backend must provide an admin login endpoint before the admin panel can authenticate.',
  )) as Promise<{ token: string; user: AdminUser | null }>;
};

export const getAdminMe = async () => {
  const { data } = await api.get<{ data: AdminUser }>('/me');
  const user = data.data;
  if (user) {
    adminAuthStore.setSession(adminAuthStore.getSnapshot().token || '', user);
  }
  return user;
};
