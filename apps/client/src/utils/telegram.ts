import type { TelegramAuthPayload, TelegramUser } from '../types';

export const getTelegramWebApp = () => window.Telegram?.WebApp;

const parseTelegramUserFromInitData = (initData: string): TelegramUser | null => {
  if (!initData) return null;

  try {
    const params = new URLSearchParams(initData);
    const rawUser = params.get('user');
    if (!rawUser) return null;
    return JSON.parse(rawUser) as TelegramUser;
  } catch {
    return null;
  }
};

export const getTelegramUser = (): TelegramUser | null => {
  const webApp = getTelegramWebApp();
  return (
    webApp?.initDataUnsafe?.user ??
    parseTelegramUserFromInitData(webApp?.initData ?? '') ??
    null
  );
};

export const getTelegramId = (): number | null => {
  const telegramId = getTelegramUser()?.id;
  return typeof telegramId === 'number' && Number.isFinite(telegramId) ? telegramId : null;
};

export const getTelegramInitData = () => getTelegramWebApp()?.initData ?? '';

export const getTelegramAuthPayload = (): TelegramAuthPayload | null => {
  const user = getTelegramUser();

  // Faqat id bo'lishi yetarli — backend faqat telegramId kutadi
  if (!user?.id) {
    console.warn('[Telegram] initDataUnsafe.user mavjud emas yoki id yo\'q');
    return null;
  }

  return {
    telegramId: user.id,
    chatId: user.id,
    firstName: user.first_name ?? '',
    lastName: user.last_name,
    username: user.username,
    initData: getTelegramInitData() || undefined,
  };
};

export const prepareTelegramApp = () => {
  const webApp = getTelegramWebApp();
  if (!webApp) {
    console.warn('[Telegram] WebApp mavjud emas — Mini App Telegram ichida ochilganini tekshiring');
    return;
  }

  webApp.ready();
  webApp.expand();
  console.log('[Telegram] WebApp tayyor. User:', webApp.initDataUnsafe?.user ?? null);
};

export const notifyTelegram = (type: 'success' | 'warning' | 'error') => {
  getTelegramWebApp()?.HapticFeedback?.notificationOccurred(type);
};
