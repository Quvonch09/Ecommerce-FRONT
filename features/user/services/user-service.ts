import { requestBackend } from '@/lib/http/backend-client';
import { env } from '@/lib/config/env';
import type { UserProfile } from '@/lib/types/auth';

export const userService = {
  async getCurrentUser(token: string): Promise<UserProfile> {
    return requestBackend<UserProfile>(env.backendMePath, {
      method: 'GET',
      token,
    });
  },
};
