import axios from 'axios';
import { authStore } from '../store/auth-store';

const configuredBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://5.189.158.5:8085';

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
    if (error.response?.status === 401) {
      authStore.clear();
    }

    return Promise.reject(error);
  },
);
