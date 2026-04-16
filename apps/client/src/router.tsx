import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './components/layout/app-shell';
import { CartProvider } from './providers/cart-provider';
import { FullScreenLoader } from './components/shared/full-screen-loader';

const HomePage = lazy(() =>
  import('./pages/home-page').then((module) => ({ default: module.HomePage })),
);
const CartPage = lazy(() =>
  import('./pages/cart-page').then((module) => ({ default: module.CartPage })),
);
const OrdersPage = lazy(() =>
  import('./pages/orders-page').then((module) => ({ default: module.OrdersPage })),
);
const DebtPage = lazy(() =>
  import('./pages/debt-page').then((module) => ({ default: module.DebtPage })),
);
const ProfilePage = lazy(() =>
  import('./pages/profile-page').then((module) => ({ default: module.ProfilePage })),
);
const LoginPage = lazy(() =>
  import('./pages/login-page').then((module) => ({ default: module.LoginPage })),
);

const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<FullScreenLoader label="Loading page..." />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <CartProvider>
        <AppShell />
      </CartProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <HomePage />
          </LazyPage>
        ),
      },
      {
        path: 'cart',
        element: (
          <LazyPage>
            <CartPage />
          </LazyPage>
        ),
      },
      {
        path: 'orders',
        element: (
          <LazyPage>
            <OrdersPage />
          </LazyPage>
        ),
      },
      {
        path: 'debt',
        element: (
          <LazyPage>
            <DebtPage />
          </LazyPage>
        ),
      },
      {
        path: 'profile',
        element: (
          <LazyPage>
            <ProfilePage />
          </LazyPage>
        ),
      },
      {
        path: 'login',
        element: (
          <LazyPage>
            <LoginPage />
          </LazyPage>
        ),
      },
    ],
  },
]);
