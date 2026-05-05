import type { DashboardMetrics, DashboardSummary } from '../types';
import { api } from './api';
import { getAdminOrders } from './orders';

const labelForDate = (value?: string) => {
  if (!value) {
    return 'Unknown';
  }

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const [{ data: summary }, orders] = await Promise.all([
    api.get<DashboardSummary>('admin/dashboard'),
    getAdminOrders(),
  ]);

  const revenueMap = new Map<string, { revenue: number; orders: number }>();

  orders.forEach((order) => {
    const label = labelForDate(order.createdAt);
    const entry = revenueMap.get(label) || { revenue: 0, orders: 0 };
    entry.revenue += Number(order.totalAmount ?? 0);
    entry.orders += 1;
    revenueMap.set(label, entry);
  });

  return {
    totalSales: Number(summary.revenue ?? 0),
    totalOrders: Number(summary.totalOrders ?? orders.length),
    totalDebt: Number(summary.debtOutstanding ?? 0),
    totalUsers: Number(summary.totalUsers ?? 0),
    revenueSeries:
      revenueMap.size > 0
        ? Array.from(revenueMap.entries()).map(([label, entry]) => ({
            label,
            revenue: entry.revenue,
            orders: entry.orders,
          }))
        : [
            {
              label: 'Overview',
              revenue: Number(summary.revenue ?? 0),
              orders: Number(summary.totalOrders ?? 0),
            },
          ],
  };
};
