const TOKEN_KEY = 'store-admin-token';
const USER_KEY = 'store-admin-user';

export const storage = {
  getToken: () => window.localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => window.localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => window.localStorage.removeItem(TOKEN_KEY),
  getUser: () => window.localStorage.getItem(USER_KEY),
  setUser: (value: string) => window.localStorage.setItem(USER_KEY, value),
  clearUser: () => window.localStorage.removeItem(USER_KEY),
};
