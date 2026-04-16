import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/shared/use-toast';
import { loginAdmin } from '../services/auth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ phone, password }: { phone: string; password: string }) =>
      loginAdmin(phone, password),
    onSuccess: ({ user }) => {
      if (user?.role && user.role !== 'ROLE_ADMIN') {
        pushToast({
          title: 'Access denied',
          description: 'This account does not have admin privileges.',
          tone: 'error',
        });
        return;
      }
      pushToast({
        title: 'Login successful',
        description: 'Admin dashboard is ready.',
        tone: 'success',
      });
      navigate('/dashboard');
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="grid w-full max-w-5xl grid-cols-2 overflow-hidden rounded-[36px] bg-white shadow-2xl">
        <div className="bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.28),_transparent_35%),linear-gradient(180deg,#0f172a_0%,#111827_100%)] p-10 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-300/70">
            Secure Admin Access
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-tight">
            Monitor sales, orders, debts, and stock in one place.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            Desktop-first dashboard for administrators with JWT authentication,
            analytics, workflow management, and clean operational visibility.
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Admin sign in</h2>
          <p className="mt-2 text-sm text-slate-500">
            Only users with the <span className="font-bold">ADMIN</span> role can enter.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              mutation.mutate({
                phone: String(form.get('phone') || ''),
                password: String(form.get('password') || ''),
              });
            }}
          >
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Phone Number</span>
              <input
                name="phone"
                placeholder="+998 90 123 45 67"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
                required
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                name="password"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
                required
              />
            </label>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-bold text-white disabled:opacity-60"
            >
              {mutation.isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
