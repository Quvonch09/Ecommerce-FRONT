import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Lock, Phone } from 'lucide-react';
import { useToast } from '../components/feedback/use-toast';
import { loginAdmin } from '../services/auth';
import { authStore } from '../store/auth-store';
import { SectionCard } from '../components/shared/section-card';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ phone, password }: { phone: string; password: string }) =>
      loginAdmin(phone, password),
    onSuccess: ({ token }) => {
      authStore.setToken(token);
      pushToast({
        title: 'Login successful',
        description: 'Welcome back to the store.',
        tone: 'success',
      });
      navigate('/');
    },
    onError: (error) => {
      pushToast({
        title: 'Authentication failed',
        description: error instanceof Error ? error.message : 'Invalid credentials.',
        tone: 'error',
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const phone = String(form.get('phone') || '');
    const password = String(form.get('password') || '');

    if (!phone || !password) {
      pushToast({
        title: 'Missing fields',
        description: 'Please enter both phone and password.',
        tone: 'warning',
      });
      return;
    }

    mutation.mutate({ phone, password });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-shell px-6 pb-12 pt-6">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-600 text-white shadow-lg shadow-primary-200">
          <Lock className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-ink">Store Admin</h1>
        <p className="mt-2 text-sm text-ink/60">Enter your credentials to manage the store</p>
      </div>

      <SectionCard className="w-full max-w-sm">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-ink/40" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center text-ink/30">
                <Phone className="h-4 w-4" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                className="w-full rounded-2xl bg-shell/50 pb-3 pl-11 pr-4 pt-3 text-sm font-medium outline-none ring-1 ring-ink/5 focus:ring-2 focus:ring-primary-500/50"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-ink/40" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center text-ink/30">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl bg-shell/50 pb-3 pl-11 pr-4 pt-3 text-sm font-medium outline-none ring-1 ring-ink/5 focus:ring-2 focus:ring-primary-500/50"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 flex w-full items-center justify-center rounded-2xl bg-primary-600 px-4 py-4 text-sm font-bold text-white shadow-lg shadow-primary-200 transition active:scale-95 disabled:opacity-60"
          >
            {mutation.isPending ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </SectionCard>
      
      <p className="mt-8 text-center text-xs text-ink/40">
        If you are a customer, please open this app inside Telegram.
      </p>
    </div>
  );
};
