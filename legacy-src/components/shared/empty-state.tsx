export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) => (
  <div className="rounded-[30px] bg-white p-8 text-center shadow-card">
    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary-50" />
    <h2 className="text-lg font-bold text-ink">{title}</h2>
    <p className="mt-2 text-sm leading-6 text-ink/60">{description}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);
