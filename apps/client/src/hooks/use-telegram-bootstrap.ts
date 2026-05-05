import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { authenticateWithTelegram, getMe } from '../services/auth';
import { authStore } from '../store/auth-store';
import { getTelegramAuthPayload, prepareTelegramApp } from '../utils/telegram';
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
  const lastAuthAttemptRef = useRef<string | null>(null);
  const previousTokenRef = useRef<string | null>(token);

  const authMutation = useMutation({
    mutationFn: authenticateWithTelegram,
    onSuccess: ({ token: jwt }) => {
      authStore.setToken(jwt);
    },
    onError: (error) => {
      pushToast({
        title: 'Authentication failed',
        description: getErrorMessage(error, 'Unable to sign in through Telegram.'),
        tone: 'error',
      });
    },
  });

  useEffect(() => {
    prepareTelegramApp();
  }, []);

  useEffect(() => {
    if (previousTokenRef.current && !token) {
      lastAuthAttemptRef.current = null;
    }

    previousTokenRef.current = token;
  }, [token]);

  useEffect(() => {
    if (token || authMutation.isPending) {
      return;
    }

    const payload = getTelegramAuthPayload();

    if (!payload) {
      setTelegramUnavailable(true);
      if (location.pathname !== '/login') {
        navigate('/login');
      }
      return;
    }

    setTelegramUnavailable(false);
    const attemptKey = `${payload.telegramId}:${payload.username ?? ''}:${Boolean(payload.initData)}`;

    if (lastAuthAttemptRef.current === attemptKey) {
      return;
    }

    lastAuthAttemptRef.current = attemptKey;
    authMutation.mutate(payload);
  }, [authMutation, token, navigate, location.pathname]);

  const meQuery = useQuery<UserProfile>({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: Boolean(token),
  });

  useEffect(() => {
    if (!token || !meQuery.isError) {
      return;
    }

    console.warn('[Telegram Bootstrap] Profile request failed, forcing re-auth.');
    authStore.clear();
  }, [meQuery.isError, token]);

  return {
    isInitializing: authMutation.isPending || (Boolean(token) && meQuery.isLoading),
    isAuthenticated: Boolean(token) && !telegramUnavailable,
    me: meQuery.data,
    telegramUnavailable,
  };
};
