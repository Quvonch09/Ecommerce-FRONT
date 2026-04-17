import { api } from './api';
import type { UserProfile } from '../types';

type AuthResponse = {
  token?: string;
  accessToken?: string;
  jwt?: string;
  user?: UserProfile;
};

export const authenticateWithTelegram = async (telegramId: number) => {
  const { data } = await api.post<AuthResponse>('/auth/telegram', { telegramId });
  const token = data.token || data.accessToken || data.jwt;

  if (!token) {
    throw new Error('Backend did not return a JWT token.');
  }

  return {
    token,
    user: undefined, 
  };
};

export const loginAdmin = async (phoneNumber: string, password: string) => {
  const { data } = await api.post<AuthResponse>('/auth/admin/login', {
    phoneNumber,
    password,
  });

  const token = data.token;

  if (!token) {
    throw new Error('Invalid credentials or no token returned.');
  }

  return {
    token,
    user: undefined,
  };
};

export const getMe = async () => {
  const { data } = await api.get<UserProfile>('/me');
  return data;
};
