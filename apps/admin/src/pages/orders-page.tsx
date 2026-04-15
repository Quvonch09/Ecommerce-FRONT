import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '../components/shared/data-table';
import { ErrorPanel } from '../components/shared/error-panel';
import { LoadingPanel } from '../components/shared/loading-panel';
import { PanelShell } from '../components/shared/panel-shell';
import { StatusPill } from '../components/shared/status-pill';
import { useAdminOrders } from '../hooks/use-admin-orders';
import { updateOrderStatus } from '../services/orders';
import { formatCurrency } from '../utils/currency';

const statuses = ['NEW', 'CONFIRMED', 'DELIVERED'];

export const OrdersPage = () => {
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError, error, refetch } = useAdminOrders();

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number | string; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });

  return (
    <PanelShell
      title="Orders management"
      subtitle="Monitor the entire fulfillment pipeline and move orders through status stages."
    >
      {isLoading ? <LoadingPanel /> : null}
      {isError ? (
        <ErrorPanel
          message={error instanceof Error ? error.message : 'Failed to load orders.'}
          onRetry={() => refetch()}
        />
      ) : null}
      {!isLoading && !isError ? (
        <DataTable
          headers={['Order', 'Customer', 'Amount', 'Status', 'Update']}
          rows={
            <>
              {data.map((order) => (
                <tr key={String(order.id)}>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900">#{order.id}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : 'Date not provided'}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {order.customerName || `User ${order.userId ?? ''}`}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {formatCurrency(order.totalAmount ?? 0)}
                  </td>
                  <td className="px-4 py-4">
                    <StatusPill status={order.status} />
                  </td>
                  <td className="px-4 py-4">
                    <select
                      defaultValue={order.status}
                      onChange={(event) =>
                        statusMutation.mutate({
                          id: order.id,
                          status: event.target.value,
                        })
                      }
                      className="rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
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
