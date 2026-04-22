'use client';

import { useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/types/auth';
import '@/lib/types/telegram';
import { AdminPanel } from '@/components/ui/admin-panel';
import { UserPanel } from '@/components/ui/user-panel';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { ErrorScreen } from '@/components/ui/error-screen';

type BootstrapState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; user: UserProfile };

const getTelegramInitData = () => window.Telegram?.WebApp?.initData ?? '';

const prepareTelegramWebApp = () => {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    return false;
  }

  webApp.ready();
  webApp.expand();
  return true;
};

const bootstrapTelegramUser = async () => {
  const initData = getTelegramInitData();
  if (!initData) {
    throw new Error('Telegram initData is missing. Open the app inside Telegram WebApp.');
  }

  const authResponse = await fetch('/api/auth/telegram', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ initData }),
  });

  if (!authResponse.ok) {
    const payload = (await authResponse.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message ?? 'Telegram authentication failed.');
  }

  const meResponse = await fetch('/api/user/me', {
    method: 'GET',
    credentials: 'include',
  });

  if (!meResponse.ok) {
    const payload = (await meResponse.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message ?? 'Unable to load current user.');
  }

  return (await meResponse.json()) as UserProfile;
};

export function TelegramMiniApp() {
  const [state, setState] = useState<BootstrapState>({ status: 'loading' });

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        const isTelegramReady = prepareTelegramWebApp();
        if (!isTelegramReady) {
          throw new Error('Telegram WebApp SDK is unavailable in this browser context.');
        }

        const user = await bootstrapTelegramUser();
        if (active) {
          setState({ status: 'ready', user });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to open mini app.';
        if (active) {
          setState({ status: 'error', message });
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, []);

  if (state.status === 'loading') {
    return <LoadingScreen />;
  }

  if (state.status === 'error') {
    return <ErrorScreen message={state.message} />;
  }

  return state.user.role === 'ADMIN' ? (
    <AdminPanel user={state.user} />
  ) : (
    <UserPanel user={state.user} />
  );
}
