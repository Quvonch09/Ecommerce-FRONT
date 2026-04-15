import type { TelegramUser } from '../types';

export const getTelegramWebApp = () => window.Telegram?.WebApp;

export const getTelegramUser = (): TelegramUser | null =>
  getTelegramWebApp()?.initDataUnsafe?.user ?? null;

export const getTelegramInitData = () => getTelegramWebApp()?.initData ?? '';

export const prepareTelegramApp = () => {
  const webApp = getTelegramWebApp();
  if (!webApp) {
    return;
  }

  webApp.ready();
  webApp.expand();
};

export const notifyTelegram = (type: 'success' | 'warning' | 'error') => {
  getTelegramWebApp()?.HapticFeedback?.notificationOccurred(type);
};
