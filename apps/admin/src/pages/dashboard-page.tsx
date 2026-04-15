import { RevenueChart } from '../components/charts/revenue-chart';
import { ErrorPanel } from '../components/shared/error-panel';
import { LoadingPanel } from '../components/shared/loading-panel';
import { PanelShell } from '../components/shared/panel-shell';
import { StatCard } from '../components/shared/stat-card';
import { useDashboard } from '../hooks/use-dashboard';
import { formatCurrency } from '../utils/currency';

export const DashboardPage = () => {
  const { data, isLoading, isError, error, refetch } = useDashboard();

  if (isLoading) {
    return <LoadingPanel />;
  }

  if (isError || !data) {
    return (
      <ErrorPanel
        message={error instanceof Error ? error.message : 'Failed to load dashboard data.'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total sales"
          value={formatCurrency(data.totalSales)}
          accent="bg-gradient-to-br from-sky-500 to-cyan-400"
        />
        <StatCard
          label="Total orders"
          value={String(data.totalOrders)}
          accent="bg-gradient-to-br from-slate-900 to-slate-700"
        />
        <StatCard
          label="Total debt"
          value={formatCurrency(data.totalDebt)}
          accent="bg-gradient-to-br from-amber-500 to-orange-400"
        />
        <StatCard
          label="Active users"
          value={String(data.totalUsers)}
          accent="bg-gradient-to-br from-emerald-500 to-teal-400"
        />
      </div>

      <PanelShell
        title="Revenue analytics"
        subtitle="Charts are derived from admin orders and grouped by order creation date."
      >
        <RevenueChart data={data.revenueSeries} />
      </PanelShell>
    </div>
  );
};
