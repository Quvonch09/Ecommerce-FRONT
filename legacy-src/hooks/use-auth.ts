import { useSyncExternalStore } from 'react';
import { authStore } from '../store/auth-store';

export const useAuth = () =>
  useSyncExternalStore(authStore.subscribe, authStore.getSnapshot, authStore.getSnapshot);
