import { useSyncExternalStore } from 'react';
import { adminAuthStore } from '../store/auth-store';

export const useAdminAuth = () =>
  useSyncExternalStore(
    adminAuthStore.subscribe,
    adminAuthStore.getSnapshot,
    adminAuthStore.getSnapshot,
  );
