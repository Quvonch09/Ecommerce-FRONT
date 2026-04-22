import { requestBackend } from '@/lib/http/backend-client';
import { env } from '@/lib/config/env';
import type { AuthResult, TelegramAuthPayload } from '@/lib/types/auth';
import { BackendRequestError } from '@/lib/http/backend-client';

type BackendAuthResponse = {
  token?: string;
  accessToken?: string;
  jwt?: string;
};

export const telegramAuthService = {
  async authenticate(payload: TelegramAuthPayload): Promise<AuthResult> {
    const data = await authenticateAgainstBackend(payload);

    const token = data.token ?? data.accessToken ?? data.jwt;

    if (!token) {
      throw new Error('Backend did not return a JWT.');
    }

    return { token };
  },
};

const normalizeAuthPath = (path: string) => path.trim() || '/auth/telegram';

const buildAuthPayloads = ({ initData, telegramId }: TelegramAuthPayload) => {
  const payloads: Array<Record<string, string | number>> = [{ initData }];

  if (telegramId) {
    payloads.push({ initData, telegramId });
    payloads.push({ telegramId });
  }

  return payloads;
};

const authenticateAgainstBackend = async (payload: TelegramAuthPayload) => {
  const authPaths = Array.from(
    new Set([normalizeAuthPath(env.backendTelegramAuthPath), '/auth/telegram']),
  );

  let lastError: unknown;

  for (const path of authPaths) {
    for (const body of buildAuthPayloads(payload)) {
      try {
        return await requestBackend<BackendAuthResponse>(path, {
          method: 'POST',
          body,
        });
      } catch (error) {
        lastError = error;
        if (error instanceof BackendRequestError && error.status < 500) {
          continue;
        }

        throw error;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Telegram authentication failed.');
};
