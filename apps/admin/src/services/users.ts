import type { AdminUser } from '../types';

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  return Promise.reject(new Error(
    'Swagger spec does not expose /admin/users. Backend must add admin user-management endpoints before this page can work.',
  )) as Promise<AdminUser[]>;
};

export const getAdminUserDetails = async (id: AdminUser['id']): Promise<AdminUser> => {
  void id;
  return Promise.reject(new Error(
    'Swagger spec does not expose /admin/users/{id}. Backend must add it before user details can work.',
  )) as Promise<AdminUser>;
};
