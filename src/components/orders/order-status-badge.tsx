import type { OrderStatus } from '../../types';

const statusStyles: Record<string, string> = {
  NEW: 'bg-amber-50 text-amber-700',
  CONFIRMED: 'bg-sky-50 text-sky-700',
  DELIVERED: 'bg-primary-50 text-primary-700',
};

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => (
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
      statusStyles[status] || 'bg-black/5 text-ink'
    }`}
  >
    {status}
  </span>
);
