import { DataTable } from '../components/shared/data-table';
import { ErrorPanel } from '../components/shared/error-panel';
import { LoadingPanel } from '../components/shared/loading-panel';
import { PanelShell } from '../components/shared/panel-shell';
import { useAdminDebts } from '../hooks/use-admin-debts';
import { formatCurrency } from '../utils/currency';

export const DebtsPage = () => {
  const { data = [], isLoading, isError, error, refetch } = useAdminDebts();

  return (
    <PanelShell
      title="Debt management"
      subtitle="Review user balances derived from admin user data. Payment creation is disabled here because the documented API accepts `debtId`, not `userId`, and does not expose an admin debt list endpoint."
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
          headers={['User', 'Total debt', 'Paid', 'Remaining', 'Status']}
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
                  <td className="px-4 py-4 text-sm text-slate-500">
                    {record.remainingDebt > 0 ? 'Open debt' : 'Settled'}
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
