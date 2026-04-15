import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { DashboardMetrics } from '../../types';

export const RevenueChart = ({
  data,
}: {
  data: DashboardMetrics['revenueSeries'];
}) => (
  <div className="h-[320px] rounded-[24px] bg-slate-950 p-4 text-white">
    <p className="mb-4 text-sm font-semibold text-white/70">Revenue trend</p>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="label" stroke="rgba(255,255,255,0.55)" />
        <YAxis stroke="rgba(255,255,255,0.55)" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#67e8f9"
          strokeWidth={3}
          dot={{ fill: '#67e8f9', strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
