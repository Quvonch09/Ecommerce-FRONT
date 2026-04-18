import type { AdminUser } from '../types';
import { api } from './api';

type ApiUser = {
  id: number | string;
  telegramId?: number;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  role?: string;
  createdAt?: string;
  totalDebt?: number;
  totalPaid?: number;
  remainingDebt?: number;
  ordersCount?: number;
};

const normalizeAdminUser = (user: ApiUser): AdminUser => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();

  return {
    id: user.id,
    telegramId: user.telegramId,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    fullName: fullName || undefined,
    username: user.username ?? undefined,
    role: user.role,
    createdAt: user.createdAt,
    totalDebt: Number(user.totalDebt ?? 0),
    totalPaid: Number(user.totalPaid ?? 0),
    remainingDebt: Number(user.remainingDebt ?? 0),
    ordersCount: Number(user.ordersCount ?? 0),
  };
};

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const { data } = await api.get<ApiUser[]>('/admin/users');
  return data.map(normalizeAdminUser);
};

export const getAdminUserDetails = async (id: AdminUser['id']): Promise<AdminUser> => {
  const users = await getAdminUsers();
  const user = users.find((entry) => String(entry.id) === String(id));

  if (!user) {
    throw new Error(`User ${id} not found.`);
  }

  return user;
};
