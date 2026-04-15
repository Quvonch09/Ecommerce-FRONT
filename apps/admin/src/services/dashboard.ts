import type { DashboardMetrics } from '../types';
import { getDebtRecords } from './debts';
import { getAdminOrders } from './orders';
import { getAdminUsers } from './users';

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
  const [orders, debts, users] = await Promise.all([
    getAdminOrders(),
    getDebtRecords(),
    getAdminUsers(),
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
    totalSales: orders.reduce((sum, order) => sum + Number(order.totalAmount ?? 0), 0),
    totalOrders: orders.length,
    totalDebt: debts.reduce((sum, debt) => sum + debt.remainingDebt, 0),
    totalUsers: users.length,
    revenueSeries: Array.from(revenueMap.entries()).map(([label, entry]) => ({
      label,
      revenue: entry.revenue,
      orders: entry.orders,
    })),
  };
};
