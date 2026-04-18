import type { AdminUser } from '../types';
import { adminAuthStore } from '../store/auth-store';
import { api } from './api';

export const loginAdmin = async (phoneNumber: string, password: string) => {
  const { data } = await api.post<{ token?: string; accessToken?: string; jwt?: string; user?: AdminUser }>(
    '/auth/admin/login',
    {
    phoneNumber,
    password,
  });

  const token = data.token || data.accessToken || data.jwt;

  if (!token) {
    throw new Error('Backend did not return an admin token.');
  }

  adminAuthStore.setSession(token, data.user ?? null);

  try {
    const user = data.user ?? (await getAdminMe());

    return {
      token,
      user,
    };
  } catch (error) {
    adminAuthStore.clear();
    throw error;
  }
};

export const getAdminMe = async () => {
  const { data } = await api.get<AdminUser>('/me');
  if (data) {
    adminAuthStore.setSession(adminAuthStore.getSnapshot().token || '', data);
  }
  return data;
};
