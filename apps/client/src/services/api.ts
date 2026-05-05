import axios from 'axios';
import { authStore } from '../store/auth-store';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || 'https://qdtu.uz';
const apiBaseUrl = rawBaseUrl.endsWith('/api/')
  ? rawBaseUrl 
  : (rawBaseUrl.endsWith('/api') ? `${rawBaseUrl}/` : `${rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl}/api/`);

console.log('API Base URL:', apiBaseUrl);

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 20_000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = authStore.getSnapshot().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.debug(`[API Request] Token attached to ${config.url}`);
  } else {
    console.debug(`[API Request] No token attached to ${config.url}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    // If the response follows the { success: true, data: { ... } } pattern, unwrap it.
    if (
      response.data &&
      typeof response.data === 'object' &&
      response.data.success === true &&
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
    const status = error.response?.status;
    const errorData = error.response?.data;

    // Enhanced logging for 403 Forbidden
    if (status === 403) {
      console.error('[API 403 Forbidden] Access denied. This usually means:', {
        cause1: 'Authorization header is missing or malformed',
        cause2: 'JWT token is invalid, expired, or rejected by backend',
        cause3: 'Endpoint requires specific role (e.g. ROLE_ADMIN)',
        url: error.config?.url,
        requestHeaders: error.config?.headers,
        responseDetails: errorData,
      });
    }

    if (status === 401) {
      console.warn('[API 401 Unauthorized] Session expired. Clearing token.');
      authStore.clear();
    }

    console.error('[API Error]', {
      status,
      url: error.config?.url,
      method: error.config?.method,
      requestHeaders: error.config?.headers,
      requestData: error.config?.data,
      responseData: errorData,
    });

    return Promise.reject(error);
  },
);
