import { storage } from '../utils/storage';

type AuthState = {
  token: string | null;
};

let state: AuthState = {
  token: storage.getToken(),
};

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((listener) => listener());
};

export const authStore = {
  getSnapshot: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  setToken: (token: string) => {
    state = { ...state, token };
    storage.setToken(token);
    console.log('JWT token:', storage.getToken());
    emit();
  },
  clear: () => {
    state = { ...state, token: null };
    storage.clearToken();
    console.log('JWT token:', storage.getToken());
    emit();
  },
};
