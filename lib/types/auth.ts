export type UserRole = 'ADMIN' | 'USER' | string;

export type UserProfile = {
  id: number | string;
  telegramId?: number | string;
  firstName?: string;
  lastName?: string;
  username?: string;
  role: UserRole;
};

export type AuthResult = {
  token: string;
};

export type TelegramAuthPayload = {
  initData: string;
  telegramId?: number;
};
