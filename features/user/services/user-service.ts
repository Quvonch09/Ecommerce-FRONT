import { requestBackend } from '@/lib/http/backend-client';
import { env } from '@/lib/config/env';
import type { UserProfile } from '@/lib/types/auth';
import { BackendRequestError } from '@/lib/http/backend-client';

export const userService = {
  async getCurrentUser(token: string): Promise<UserProfile> {
    const paths = Array.from(new Set([env.backendMePath.trim() || '/user/me', '/me', '/user/me']));
    let lastError: unknown;

    for (const path of paths) {
      try {
        return await requestBackend<UserProfile>(path, {
          method: 'GET',
          token,
        });
      } catch (error) {
        lastError = error;
        if (error instanceof BackendRequestError && [401, 403, 404].includes(error.status)) {
          continue;
        }

        throw error;
      }
    }

    throw lastError instanceof Error ? lastError : new Error('Unable to load current user.');
  },
};
