export const PanelShell = ({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.25)]">
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-700/60">
          Admin Panel
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-900">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">{subtitle}</p>
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
    {children}
  </section>
);
