import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, CircleDollarSign } from 'lucide-react';
import { useDebt } from '../hooks/use-debt';
import { PageHeader } from '../components/shared/page-header';
import { SectionCard } from '../components/shared/section-card';
import { ErrorState } from '../components/shared/error-state';
import { LoadingGrid } from '../components/shared/loading-grid';
import { createPayment } from '../services/payments';
import { formatCurrency } from '../utils/currency';
import { useToast } from '../components/feedback/use-toast';
import { notifyTelegram } from '../utils/telegram';

export const DebtPage = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useToast();
  const { data: debt, isLoading, isError, error, refetch } = useDebt();

  const payMutation = useMutation({
    mutationFn: (amount: number) => createPayment(amount),
    onSuccess: async () => {
      notifyTelegram('success');
      pushToast({
        title: 'Payment sent',
        description: 'Your payment request was created successfully.',
        tone: 'success',
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['debt'] }),
        queryClient.invalidateQueries({ queryKey: ['orders'] }),
      ]);
    },
  });

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Debt"
        title="Debt overview"
        subtitle="See how much is paid, what remains, and settle the outstanding amount directly."
      />

      {isLoading ? <LoadingGrid /> : null}

      {isError ? (
        <ErrorState
          message={error instanceof Error ? error.message : 'Could not load debt data.'}
          onRetry={() => refetch()}
        />
      ) : null}

      {!isLoading && !isError && debt ? (
        <>
          <SectionCard className="bg-gradient-to-br from-ink to-primary-900 text-white">
            <p className="text-sm text-white/70">Remaining debt</p>
            <h2 className="mt-2 text-3xl font-extrabold">
              {formatCurrency(debt.remainingDebt, debt.currency)}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Paid</p>
                <p className="mt-2 text-lg font-bold">
                  {formatCurrency(debt.totalPaid, debt.currency)}
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Total</p>
                <p className="mt-2 text-lg font-bold">
                  {formatCurrency(debt.totalDebt, debt.currency)}
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary-50 p-3 text-primary-700">
                <CircleDollarSign className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink">Pay outstanding balance</h3>
                <p className="mt-1 text-sm text-ink/60">
                  The action sends `POST /payments` with the remaining amount.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => payMutation.mutate(debt.remainingDebt)}
              disabled={!debt.remainingDebt || payMutation.isPending}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-4 py-4 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {payMutation.isPending ? 'Sending payment...' : 'Pay'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </SectionCard>
        </>
      ) : null}
    </div>
  );
};
