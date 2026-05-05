import { api } from './api';
import type { TelegramAuthPayload, UserProfile } from '../types';

// Backendning haqiqiy response strukturasi
type ApiResponse<T> = {
  success: boolean;
  message: string;
  status: number;
  data: T;
  timestamp: string;
};

type AuthData = {
  token: string;
};

type AuthResponse = ApiResponse<AuthData>;

export const authenticateWithTelegram = async (payload: TelegramAuthPayload) => {
  // Backend faqat telegramId kutayapti
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

    // Token endi data.data.token ichida
    const token = data.data?.token;

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

  // Bu yerda ham bir xil wrapper struktura bo'lsa
  const token = data.data?.token;

  if (!token) {
    throw new Error('Invalid credentials or no token returned.');
  }

  return {
    token,
    user: undefined,
  };
};

export const getMe = async () => {
  const { data } = await api.get<ApiResponse<UserProfile>>('user/me');
  // UserProfile ham data.data ichida bo'ladi
  return data.data;
};