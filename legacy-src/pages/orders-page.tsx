import { PackageCheck } from 'lucide-react';
import { useOrders } from '../hooks/use-orders';
import { EmptyState } from '../components/shared/empty-state';
import { ErrorState } from '../components/shared/error-state';
import { LoadingGrid } from '../components/shared/loading-grid';
import { PageHeader } from '../components/shared/page-header';
import { SectionCard } from '../components/shared/section-card';
import { OrderStatusBadge } from '../components/orders/order-status-badge';
import { formatCurrency } from '../utils/currency';

export const OrdersPage = () => {
  const { data: orders = [], isLoading, isError, error, refetch } = useOrders();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Orders"
        title="Track your activity"
        subtitle="Every order appears here with its current backend status and pricing details."
      />

      {isLoading ? <LoadingGrid /> : null}

      {isError ? (
        <ErrorState
          message={error instanceof Error ? error.message : 'Could not load orders.'}
          onRetry={() => refetch()}
        />
      ) : null}

      {!isLoading && !isError && !orders.length ? (
        <EmptyState
          title="No orders yet"
          description="Orders you place from the cart will show up here immediately."
        />
      ) : null}

      {!isLoading && !isError && orders.length ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <SectionCard key={String(order.id)}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/45">
                    Order #{order.id}
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold text-ink">
                    {formatCurrency(order.totalAmount ?? 0)}
                  </h2>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-ink/60">
                <PackageCheck className="h-4 w-4" />
                <span>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : 'Creation date not provided'}
                </span>
              </div>

              {order.items?.length ? (
                <div className="mt-4 space-y-2 border-t border-black/5 pt-4">
                  {order.items.map((item, index) => (
                    <div
                      key={item.id ? String(item.id) : `${order.id}-${index}`}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-ink/65">
                        {item.productName || `Product ${item.productId}`} x {item.quantity}
                      </span>
                      <span className="font-semibold text-ink">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </SectionCard>
          ))}
        </div>
      ) : null}
    </div>
  );
};
