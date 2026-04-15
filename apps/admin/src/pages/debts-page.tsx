import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '../components/shared/data-table';
import { ErrorPanel } from '../components/shared/error-panel';
import { LoadingPanel } from '../components/shared/loading-panel';
import { PanelShell } from '../components/shared/panel-shell';
import { useToast } from '../components/shared/use-toast';
import { useAdminDebts } from '../hooks/use-admin-debts';
import { markPayment } from '../services/debts';
import { formatCurrency } from '../utils/currency';

export const DebtsPage = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useToast();
  const { data = [], isLoading, isError, error, refetch } = useAdminDebts();

  const paymentMutation = useMutation({
    mutationFn: ({ userId, amount }: { userId: number | string; amount: number }) =>
      markPayment(userId, amount),
    onSuccess: async () => {
      pushToast({ title: 'Payment marked', tone: 'success' });
      await queryClient.invalidateQueries({ queryKey: ['admin-debts'] });
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });

  return (
    <PanelShell
      title="Debt management"
      subtitle="Review user balances, total paid amounts, and mark incoming payments."
    >
      {isLoading ? <LoadingPanel /> : null}
      {isError ? (
        <ErrorPanel
          message={error instanceof Error ? error.message : 'Failed to load debt records.'}
          onRetry={() => refetch()}
        />
      ) : null}
      {!isLoading && !isError ? (
        <DataTable
          headers={['User', 'Total debt', 'Paid', 'Remaining', 'Action']}
          rows={
            <>
              {data.map((record) => (
                <tr key={String(record.userId)}>
                  <td className="px-4 py-4 font-semibold text-slate-900">{record.fullName}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {formatCurrency(record.totalDebt)}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {formatCurrency(record.totalPaid)}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {formatCurrency(record.remainingDebt)}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      disabled={!record.remainingDebt || paymentMutation.isPending}
                      onClick={() =>
                        paymentMutation.mutate({
                          userId: record.userId,
                          amount: record.remainingDebt,
                        })
                      }
                      className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Mark payment
                    </button>
                  </td>
                </tr>
              ))}
            </>
          }
        />
      ) : null}
    </PanelShell>
  );
};
