import type { AdminUser } from '../types';
import { storage } from '../utils/storage';

type AdminState = {
  token: string | null;
  user: AdminUser | null;
};

const rawUser = storage.getUser();

let state: AdminState = {
  token: storage.getToken(),
  user: rawUser ? (JSON.parse(rawUser) as AdminUser) : null,
};

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((listener) => listener());
};

export const adminAuthStore = {
  getSnapshot: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  setSession(token: string, user: AdminUser | null) {
    state = { token, user };
    storage.setToken(token);
    if (user) {
      storage.setUser(JSON.stringify(user));
    } else {
      storage.clearUser();
    }
    emit();
  },
  clear() {
    state = { token: null, user: null };
    storage.clearToken();
    storage.clearUser();
    emit();
  },
};
