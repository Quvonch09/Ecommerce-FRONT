import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { authenticateWithTelegram, getMe } from '../services/auth';
import { authStore } from '../store/auth-store';
import { getTelegramId, getTelegramInitData, prepareTelegramApp } from '../utils/telegram';
import { useToast } from '../components/feedback/use-toast';
import type { UserProfile } from '../types';
import { useAuth } from './use-auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../utils/error';

export const useTelegramBootstrap = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        description: getErrorMessage(error, 'Unable to sign in through Telegram.'),
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

    const telegramId = getTelegramId();

    if (!telegramId && !import.meta.env.DEV) {
      setTelegramUnavailable(true);
      if (location.pathname !== '/login') {
        navigate('/login');
      }
      return;
    }

    setTelegramUnavailable(false);
    if (telegramId || import.meta.env.DEV) {
      const finalId = telegramId || 123456789;
      const initData = getTelegramInitData();
      hasAttemptedAuthRef.current = true;
      authMutation.mutate({ telegramId: Number(finalId), initData });
    }
  }, [authMutation.isPending, authMutation.mutate, pushToast, token, navigate, location.pathname]);

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
