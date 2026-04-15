import { api } from './api';
import type { UserProfile } from '../types';

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  status: number;
  data: T;
  timestamp: string;
};

type AuthPayload = {
  token?: string;
};

export const authenticateWithTelegram = async (initData: string) => {
  const { data } = await api.post<ApiEnvelope<AuthPayload>>('/auth/telegram', { initData });
  const token = data.data?.token;

  if (!token) {
    throw new Error(data.message || 'Backend did not return a JWT token.');
  }

  return {
    token,
    user: undefined,
  };
};

export const getMe = async () => {
  const { data } = await api.get<ApiEnvelope<UserProfile>>('/me');
  return data.data;
};
