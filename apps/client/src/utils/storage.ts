const TOKEN_KEY = 'store-mini-app-token';
const CART_KEY = 'store-mini-app-cart';

export const storage = {
  getToken: () => window.localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => window.localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => window.localStorage.removeItem(TOKEN_KEY),
  getCart: () => window.localStorage.getItem(CART_KEY),
  setCart: (value: string) => window.localStorage.setItem(CART_KEY, value),
  clearCart: () => window.localStorage.removeItem(CART_KEY),
};
