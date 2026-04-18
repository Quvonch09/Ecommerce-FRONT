import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAdminAuth } from './hooks/use-admin-auth';
import { AdminLayout } from './layouts/admin-layout';
import { getAdminMe } from './services/auth';

const LoginPage = lazy(() =>
  import('./pages/login-page').then((module) => ({ default: module.LoginPage })),
);
const DashboardPage = lazy(() =>
  import('./pages/dashboard-page').then((module) => ({ default: module.DashboardPage })),
);
const ProductsPage = lazy(() =>
  import('./pages/products-page').then((module) => ({ default: module.ProductsPage })),
);
const OrdersPage = lazy(() =>
  import('./pages/orders-page').then((module) => ({ default: module.OrdersPage })),
);
const DebtsPage = lazy(() =>
  import('./pages/debts-page').then((module) => ({ default: module.DebtsPage })),
);
const UsersPage = lazy(() =>
  import('./pages/users-page').then((module) => ({ default: module.UsersPage })),
);

const Loader = () => <div className="p-10 text-sm text-slate-500">Loading...</div>;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAdminAuth();

  const meQuery = useQuery({
    queryKey: ['admin-me'],
    queryFn: getAdminMe,
    enabled: Boolean(token) && !user,
    retry: false,
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (meQuery.isLoading) {
    return <Loader />;
  }

  const resolvedUser = user ?? meQuery.data;

  if (meQuery.isError || !resolvedUser) {
    return <Navigate to="/login" replace />;
  }

  if (resolvedUser?.role && resolvedUser.role !== 'ROLE_ADMIN' && resolvedUser.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Lazy>
        <LoginPage />
      </Lazy>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: 'dashboard',
        element: (
          <Lazy>
            <DashboardPage />
          </Lazy>
        ),
      },
      {
        path: 'products',
        element: (
          <Lazy>
            <ProductsPage />
          </Lazy>
        ),
      },
      {
        path: 'orders',
        element: (
          <Lazy>
            <OrdersPage />
          </Lazy>
        ),
      },
      {
        path: 'debts',
        element: (
          <Lazy>
            <DebtsPage />
          </Lazy>
        ),
      },
      {
        path: 'users',
        element: (
          <Lazy>
            <UsersPage />
          </Lazy>
        ),
      },
    ],
  },
]);
