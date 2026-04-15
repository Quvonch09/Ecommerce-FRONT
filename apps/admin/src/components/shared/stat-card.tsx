export const StatCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) => (
  <div className={`rounded-[28px] p-5 text-white shadow-xl ${accent}`}>
    <p className="text-sm text-white/70">{label}</p>
    <p className="mt-3 text-3xl font-extrabold">{value}</p>
  </div>
);
