export const StatusPill = ({ status }: { status: string }) => {
  const tone =
    status === 'DELIVERED'
      ? 'bg-emerald-50 text-emerald-700'
      : status === 'CONFIRMED'
        ? 'bg-sky-50 text-sky-700'
        : 'bg-amber-50 text-amber-700';

  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone}`}>{status}</span>;
};
