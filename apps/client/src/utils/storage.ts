const TOKEN_KEY = 'token';
const LEGACY_TOKEN_KEY = 'store-mini-app-token';
const CART_KEY = 'store-mini-app-cart';

export const storage = {
  getToken: () =>
    window.localStorage.getItem(TOKEN_KEY) ?? window.localStorage.getItem(LEGACY_TOKEN_KEY),
  setToken: (token: string) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(LEGACY_TOKEN_KEY, token);
  },
  clearToken: () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(LEGACY_TOKEN_KEY);
  },
  getCart: () => window.localStorage.getItem(CART_KEY),
  setCart: (value: string) => window.localStorage.setItem(CART_KEY, value),
  clearCart: () => window.localStorage.removeItem(CART_KEY),
};
