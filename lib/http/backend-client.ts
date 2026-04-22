import { env } from '@/lib/config/env';

type RequestOptions = {
  method?: 'GET' | 'POST';
  token?: string;
  body?: unknown;
};

export class BackendRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export const requestBackend = async <T>(path: string, options: RequestOptions = {}) => {
  const response = await fetch(new URL(path, env.backendApiBaseUrl), {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new BackendRequestError(message || 'Backend request failed.', response.status);
  }

  return (await response.json()) as T;
};
