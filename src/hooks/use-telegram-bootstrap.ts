import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { authenticateWithTelegram, getMe } from '../services/auth';
import { authStore } from '../store/auth-store';
import { getTelegramInitData, prepareTelegramApp } from '../utils/telegram';
import { useToast } from '../components/feedback/use-toast';
import type { UserProfile } from '../types';
import { useAuth } from './use-auth';

const browserFallbackInitData = 'browser-dev-session';

export const useTelegramBootstrap = () => {
  const { pushToast } = useToast();
  const { token } = useAuth();
  const [telegramUnavailable, setTelegramUnavailable] = useState(false);
  const hasAttemptedAuthRef = useRef(false);

  const authMutation = useMutation({
    mutationFn: authenticateWithTelegram,
    onSuccess: ({ token: jwt }) => {
      authStore.setToken(jwt);
      hasAttemptedAuthRef.current = true;
    },
    onError: (error) => {
      hasAttemptedAuthRef.current = true;
      pushToast({
        title: 'Authentication failed',
        description:
          error instanceof Error ? error.message : 'Unable to sign in through Telegram.',
        tone: 'error',
      });
    },
  });

  useEffect(() => {
    prepareTelegramApp();
    if (token) {
      hasAttemptedAuthRef.current = true;
      return;
    }

    if (authMutation.isPending || hasAttemptedAuthRef.current) {
      return;
    }

    const initData = getTelegramInitData();
    if (!initData && !import.meta.env.DEV) {
      setTelegramUnavailable(true);
      pushToast({
        title: 'Telegram session missing',
        description: 'Open this app inside Telegram Mini App to continue.',
        tone: 'error',
      });
      return;
    }

    setTelegramUnavailable(false);
    const payload = initData || browserFallbackInitData;
    hasAttemptedAuthRef.current = true;
    authMutation.mutate(payload);
  }, [authMutation.isPending, authMutation.mutate, pushToast, token]);

  const meQuery = useQuery<UserProfile>({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: Boolean(token),
  });

  return {
    isInitializing: authMutation.isPending || (Boolean(token) && meQuery.isLoading),
    isAuthenticated: Boolean(token) && !telegramUnavailable,
    me: meQuery.data,
    telegramUnavailable,
  };
};
