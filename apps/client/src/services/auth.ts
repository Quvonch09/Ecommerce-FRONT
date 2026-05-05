import { api } from './api';
import type { TelegramAuthPayload, UserProfile } from '../types';

// Interceptor data ni avtomatik unwrap qiladi, shuning uchun faqat ichki data typini yozamiz
type AuthData = {
  token: string;
};

export const authenticateWithTelegram = async (payload: TelegramAuthPayload) => {
  // Backend faqat telegramId kutayapti (integer)
  const requestBody = {
    telegramId: payload.telegramId,
  };

  console.log('[Telegram Auth] Request payload:', requestBody);

  try {
    // Interceptor { success, data: { token } } dan faqat { token } ni qaytaradi
    const { data } = await api.post<AuthData>('auth/telegram', requestBody);
    console.log('[Telegram Auth] Response (unwrapped):', data);

    const token = data?.token;

    if (!token) {
      throw new Error('Backend did not return a JWT token.');
    }

    return { token, user: undefined };
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
  // MUHIM: Leading slash yo'q — aks holda baseURL /api/ o'tkazib yuboriladi
  const { data } = await api.post<AuthData>('auth/admin/login', {
    phoneNumber,
    password,
  });

  const token = data?.token;

  if (!token) {
    throw new Error('Invalid credentials or no token returned.');
  }

  return { token, user: undefined };
};

export const getMe = async () => {
  // Interceptor { success, data: UserProfile } dan faqat UserProfile ni qaytaradi
  const { data } = await api.get<UserProfile>('user/me');
  return data;
};