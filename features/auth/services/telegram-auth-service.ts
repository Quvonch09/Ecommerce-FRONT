import { requestBackend } from '@/lib/http/backend-client';
import { env } from '@/lib/config/env';
import type { AuthResult } from '@/lib/types/auth';

type BackendAuthResponse = {
  token?: string;
  accessToken?: string;
  jwt?: string;
};

export const telegramAuthService = {
  async authenticate(initData: string): Promise<AuthResult> {
    const data = await requestBackend<BackendAuthResponse>(env.backendTelegramAuthPath, {
      method: 'POST',
      body: { initData },
    });

    const token = data.token ?? data.accessToken ?? data.jwt;

    if (!token) {
      throw new Error('Backend did not return a JWT.');
    }

    return { token };
  },
};
