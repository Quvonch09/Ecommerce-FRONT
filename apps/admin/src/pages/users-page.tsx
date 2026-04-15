import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../components/shared/data-table';
import { ErrorPanel } from '../components/shared/error-panel';
import { LoadingPanel } from '../components/shared/loading-panel';
import { PanelShell } from '../components/shared/panel-shell';
import { useAdminUsers } from '../hooks/use-admin-users';
import { getAdminUserDetails } from '../services/users';
import { formatCurrency } from '../utils/currency';

export const UsersPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | string | null>(null);
  const { data = [], isLoading, isError, error, refetch } = useAdminUsers();

  const detailsQuery = useQuery({
    queryKey: ['admin-user-details', selectedUserId],
    queryFn: () => getAdminUserDetails(selectedUserId!),
    enabled: selectedUserId !== null,
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(380px,0.8fr)]">
      <PanelShell
        title="Users management"
        subtitle="Inspect users, roles, order counts, and open balances from one table."
      >
        {isLoading ? <LoadingPanel /> : null}
        {isError ? (
          <ErrorPanel
            message={error instanceof Error ? error.message : 'Failed to load users.'}
            onRetry={() => refetch()}
          />
        ) : null}
        {!isLoading && !isError ? (
          <DataTable
            headers={['Name', 'Role', 'Phone', 'Debt', 'Action']}
            rows={
              <>
                {data.map((user) => (
                  <tr key={String(user.id)}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">
                        {user.fullName || user.username || `User ${user.id}`}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{user.role || 'CLIENT'}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      {user.phone || 'Not provided'}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      {formatCurrency(user.remainingDebt ?? 0)}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedUserId(user.id)}
                        className="rounded-2xl bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            }
          />
        ) : null}
      </PanelShell>

      <PanelShell
        title="User details"
        subtitle="Shows expanded data for the selected user."
      >
        {detailsQuery.isLoading ? (
          <LoadingPanel />
        ) : detailsQuery.data ? (
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Full name
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {detailsQuery.data.fullName || detailsQuery.data.username}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Phone
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {detailsQuery.data.phone || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Remaining debt
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {formatCurrency(detailsQuery.data.remainingDebt ?? 0)}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Orders count
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {detailsQuery.data.ordersCount ?? 0}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Select a user from the table to inspect details.</p>
        )}
      </PanelShell>
    </div>
  );
};
