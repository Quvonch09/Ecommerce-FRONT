import { NextResponse } from 'next/server';
import { sessionCookie } from '@/lib/security/session-cookie';
import { userService } from '@/features/user/services/user-service';
import { BackendRequestError } from '@/lib/http/backend-client';

export const userController = {
  async getCurrentUser() {
    try {
      const token = await sessionCookie.get();

      if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      const user = await userService.getCurrentUser(token);
      return NextResponse.json(user);
    } catch (error) {
      if (error instanceof BackendRequestError && error.status === 401) {
        await sessionCookie.clear();
      }

      if (error instanceof BackendRequestError) {
        return NextResponse.json({ message: error.message }, { status: error.status });
      }

      const message = error instanceof Error ? error.message : 'Unable to load current user.';
      return NextResponse.json({ message }, { status: 500 });
    }
  },
};
