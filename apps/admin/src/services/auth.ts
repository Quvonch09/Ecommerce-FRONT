import type { AdminAuthResponse, AdminUser } from '../types';
import { adminAuthStore } from '../store/auth-store';
import { api } from './api';

export const loginAdmin = async (username: string, password: string) => {
  const { data } = await api.post<AdminAuthResponse>('/auth/admin/login', {
    username,
    password,
  });

  const token = data.token || data.accessToken || data.jwt;
  if (!token) {
    throw new Error('Backend did not return an admin token.');
  }

  const user = data.user ?? null;
  adminAuthStore.setSession(token, user);
  return { token, user };
};

export const getAdminMe = async () => {
  const { data } = await api.get<AdminUser>('/me');
  return data;
};
