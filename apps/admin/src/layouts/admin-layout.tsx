import {
  BarChart3,
  Boxes,
  LogOut,
  ReceiptText,
  Users,
  WalletCards,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/use-admin-auth';
import { adminAuthStore } from '../store/auth-store';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/products', label: 'Products', icon: Boxes },
  { to: '/orders', label: 'Orders', icon: ReceiptText },
  { to: '/debts', label: 'Debts', icon: WalletCards },
  { to: '/users', label: 'Users', icon: Users },
];

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { user } = useAdminAuth();

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[280px_minmax(0,1fr)] gap-6">
        <aside className="rounded-[32px] bg-slate-950 p-6 text-white shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-300/70">
            Store OS
          </p>
          <h1 className="mt-3 text-3xl font-extrabold">Admin</h1>
          <p className="mt-2 text-sm text-white/60">
            {user?.fullName || user?.username || 'Administrator'}
          </p>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? 'bg-white text-slate-950' : 'text-white/70 hover:bg-white/10'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              adminAuthStore.clear();
              navigate('/login');
            }}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </aside>
        <main className="space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
