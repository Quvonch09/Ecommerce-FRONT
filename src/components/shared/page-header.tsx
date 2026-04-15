export const PageHeader = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) => (
  <header className="mb-5">
    <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary-700/80">
      {eyebrow}
    </p>
    <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink">{title}</h1>
    <p className="mt-2 max-w-sm text-sm leading-6 text-ink/65">{subtitle}</p>
  </header>
);
