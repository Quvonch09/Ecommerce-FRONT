import axios from 'axios';
import { adminAuthStore } from '../store/auth-store';

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'https://qdtu.uz';

export const api = axios.create({
  baseURL,
  timeout: 20_000,
});

api.interceptors.request.use((config) => {
  const { token } = adminAuthStore.getSnapshot();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      typeof response.data === 'object' &&
      'success' in response.data &&
      'data' in response.data
    ) {
      return {
        ...response,
        data: response.data.data,
      };
    }
    return response;
  },
  (error) => {
    console.error('Admin API call failed:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    if (error.response?.status === 401) {
      adminAuthStore.clear();
    }
    return Promise.reject(error);
  },
);
