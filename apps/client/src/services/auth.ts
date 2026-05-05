import { api } from './api';
import type { TelegramAuthPayload, UserProfile } from '../types';

type AuthResponse = {
  token?: string;
  accessToken?: string;
  jwt?: string;
  user?: UserProfile;
};

export const authenticateWithTelegram = async (payload: TelegramAuthPayload) => {
  const requestBody = {
    telegramId: payload.telegramId,
  };

  console.log('[Telegram Auth] Request payload:', {
    ...payload,
    initData: payload.initData ? '[present]' : '[missing]',
  });

  try {
    const { data } = await api.post<AuthResponse>('auth/telegram', requestBody);
    console.log('[Telegram Auth] Response:', data);
    const token = data.token || data.accessToken || data.jwt;

    if (!token) {
      throw new Error('Backend did not return a JWT token.');
    }

    return {
      token,
      user: undefined,
    };
  } catch (error) {
    console.error('[Telegram Auth] Failed request:', {
      url: `${api.defaults.baseURL}auth/telegram`,
      body: requestBody,
      error,
    });
    throw error;
  }
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
  const { data } = await api.get<UserProfile>('user/me');
  return data;
};
