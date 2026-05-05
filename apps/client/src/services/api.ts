import axios from 'axios';
import { authStore } from '../store/auth-store';

// Base URL: VITE_API_BASE_URL = 'https://qdtu.uz' → baseURL = 'https://qdtu.uz/api/'
const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL as string)?.trim() || 'https://qdtu.uz/api';

// Har qanday holatda ham aynan bitta /api/ prefiksi ishlatilishiga ishonch hosil qilamiz
const normalizedBase = rawBaseUrl.replace(/\/+$/, '');
const apiBaseUrl = normalizedBase.endsWith('/api')
  ? `${normalizedBase}/`
  : `${normalizedBase}/api/`;

console.log('[API] Base URL:', apiBaseUrl);

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 20_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor — JWT token qo'shish
api.interceptors.request.use((config) => {
  const token = authStore.getSnapshot().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.debug(`[API →] ${config.method?.toUpperCase()} ${config.url} (token attached)`);
  } else {
    console.debug(`[API →] ${config.method?.toUpperCase()} ${config.url} (no token)`);
  }

  return config;
});

// Response interceptor — Backend wrapper { success, data, message } ni avtomatik unwrap qilish
// Backend har doim: { success: true, data: <actual_data>, message: "...", status: 200, timestamp: "..." }
// Shuning uchun biz faqat data.data ni qaytaramiz — service fayllarda ikki marta .data yozmaslik uchun
api.interceptors.response.use(
  (response) => {
    const body = response.data;

    if (
      body &&
      typeof body === 'object' &&
      'success' in body &&
      body.success === true &&
      'data' in body
    ) {
      // Unwrap: { success: true, data: X } → X
      return { ...response, data: body.data };
    }

    return response;
  },
  (error) => {
    const status = error.response?.status;
    const errorData = error.response?.data;
    const url = error.config?.url;

    if (status === 403) {
      console.error('[API 403] Forbidden:', {
        url,
        hint: 'Token yo\'q yoki noto\'g\'ri. Avval /auth/telegram orqali login qiling.',
        tokenPresent: !!authStore.getSnapshot().token,
        serverMessage: errorData?.message,
      });
    }

    if (status === 401) {
      console.warn('[API 401] Unauthorized — token tozalanmoqda');
      authStore.clear();
    }

    console.error('[API Error]', {
      status,
      url,
      method: error.config?.method?.toUpperCase(),
      serverMessage: errorData?.message,
    });

    return Promise.reject(error);
  },
);
