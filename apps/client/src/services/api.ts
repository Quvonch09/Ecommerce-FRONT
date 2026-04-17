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
  baseURL: configuredBaseUrl.endsWith('/') ? configuredBaseUrl.slice(0, -1) : configuredBaseUrl,
  timeout: 20_000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = authStore.getSnapshot().token;

  if (token) {
    // Standard Bearer token
    config.headers.Authorization = `Bearer ${token}`;
    console.debug(`[API Request] Token attached to ${config.url}. (Bearer ${token.substring(0, 10)}...)`);
  } else {
    console.warn(`[API Request] No token found for ${config.url}. Protected endpoints will fail with 403.`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    // Automatically unwrap the standard ApiResponse wrapper
    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      ('success' in response.data || 'status' in response.data)
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

    return Promise.reject(error);
  },
);
