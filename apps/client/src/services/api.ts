import axios from 'axios';
import { authStore } from '../store/auth-store';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || 'https://qdtu.uz';

// Telegram WebApps require HTTPS. If the frontend is on HTTPS, the backend MUST also be on HTTPS.
// This check helps identify and potentially fix mixed content issues.
const configuredBaseUrl = (typeof window !== 'undefined' && window.location.protocol === 'https:' && rawBaseUrl.startsWith('http://'))
  ? rawBaseUrl.replace('http://', 'https://')
  : rawBaseUrl;

console.log('API Base URL:', configuredBaseUrl);

export const api = axios.create({
  baseURL: configuredBaseUrl,
  timeout: 20_000,
});

api.interceptors.request.use((config) => {
  const token = authStore.getSnapshot().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API call failed:', {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response?.status === 401) {
      authStore.clear();
    }

    return Promise.reject(error);
  },
);
