import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Lock, Phone, MessageSquareShare } from 'lucide-react';
import { useToast } from '../components/feedback/use-toast';
import { authenticateWithTelegram, loginAdmin } from '../services/auth';
import { authStore } from '../store/auth-store';
import { getTelegramInitData, getTelegramUser } from '../utils/telegram';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  const adminMutation = useMutation({
    mutationFn: ({ phone, password }: { phone: string; password: string }) =>
      loginAdmin(phone, password),
    onSuccess: ({ token }) => {
      authStore.setToken(token);
      pushToast({
        title: 'Login successful',
        description: 'Welcome back to the portal.',
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

  const tgMutation = useMutation({
    mutationFn: (payload: {telegramId?: number }) => authenticateWithTelegram(payload),
    onSuccess: ({ token }) => {
      authStore.setToken(token);
      pushToast({
        title: 'Telegram Auth Success',
        description: 'Identity verified via Telegram.',
        tone: 'success',
      });
      navigate('/');
    },
    onError: (error) => {
      const is403 = (error as any)?.response?.status === 403;
      pushToast({
        title: 'Telegram Auth Failed',
        description: is403 
          ? 'Backend rejected your Telegram account (403). Check BOT_TOKEN on server.'
          : (error instanceof Error ? error.message : 'Backend rejected Telegram data.'),
        tone: 'error',
      });
    },
  });

  const handleAdminSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const phone = String(form.get('phone') || '');
    const password = String(form.get('password') || '');
    if (!phone || !password) return;
    adminMutation.mutate({ phone, password });
  };

  const handleTgAuth = () => {
    const initData = getTelegramInitData();
    const telegramUser = getTelegramUser();
    
    if (!initData) {
      pushToast({
        title: 'Context missing',
        description: 'No Telegram initData found. Are you in a browser?',
        tone: 'warning',
      });
      return;
    }
    tgMutation.mutate({ 
      telegramId: telegramUser?.id 
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0B] px-6 py-12">
      {/* Background Orbs */}
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary-600/20 blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-[100px]" />

      <div className="relative w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-primary-500 to-indigo-600 p-0.5 shadow-2xl shadow-primary-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[2.4rem] bg-[#141416]">
              <Lock className="h-9 w-9 text-white" />
            </div>
          </div>
          <h1 className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
            Secure Portal
          </h1>
          <p className="mt-3 text-base text-white/40">Choose your authentication method</p>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8 backdrop-blur-3xl shadow-2xl shadow-black/50">
            <form className="space-y-5" onSubmit={handleAdminSubmit}>
              <div className="space-y-2">
                <label className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center text-white/20 transition-colors group-focus-within:text-primary-500">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    className="w-full rounded-3xl border border-white/5 bg-white/[0.05] pb-4 pl-12 pr-5 pt-4 text-sm font-medium text-white outline-none ring-primary-500/0 transition-all placeholder:text-white/10 focus:border-primary-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-primary-500/10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30" htmlFor="password">
                  Security Key
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center text-white/20 transition-colors group-focus-within:text-primary-500">
                    <Lock className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-3xl border border-white/5 bg-white/[0.05] pb-4 pl-12 pr-5 pt-4 text-sm font-medium text-white outline-none ring-primary-500/0 transition-all placeholder:text-white/10 focus:border-primary-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-primary-500/10"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={adminMutation.isPending}
                className="group relative mt-2 w-full overflow-hidden rounded-3xl bg-white px-5 py-4.5 text-sm font-bold text-black transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                {adminMutation.isPending ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">OR</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <button
              type="button"
              onClick={handleTgAuth}
              disabled={tgMutation.isPending}
              className="flex w-full items-center justify-center gap-3 rounded-3xl border border-white/5 bg-white/5 px-5 py-4.5 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98] disabled:opacity-50"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#24A1DE]">
                <MessageSquareShare className="h-3.5 w-3.5 text-white" />
              </div>
              {tgMutation.isPending ? 'Verifying...' : 'Use Telegram Identity'}
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-white/20">
          Access is restricted to authorized personnel.<br />
          Identity tracking is active via Telegram API.
        </p>
      </div>
    </div>
  );
};
