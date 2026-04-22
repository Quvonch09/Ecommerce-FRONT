import { NextResponse } from 'next/server';
import { telegramAuthService } from '@/features/auth/services/telegram-auth-service';
import { sessionCookie } from '@/lib/security/session-cookie';
import { BackendRequestError } from '@/lib/http/backend-client';

export const telegramAuthController = {
  async handle(request: Request) {
    try {
      const body = (await request.json()) as { initData?: string };
      const initData = body.initData?.trim();

      if (!initData) {
        return NextResponse.json({ message: 'initData is required.' }, { status: 400 });
      }

      const result = await telegramAuthService.authenticate(initData);
      await sessionCookie.set(result.token);

      return NextResponse.json({ ok: true });
    } catch (error) {
      if (error instanceof BackendRequestError) {
        return NextResponse.json({ message: error.message }, { status: error.status });
      }

      const message = error instanceof Error ? error.message : 'Authentication failed.';
      return NextResponse.json({ message }, { status: 500 });
    }
  },
};
