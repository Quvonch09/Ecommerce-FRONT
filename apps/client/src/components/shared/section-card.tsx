export const SectionCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`rounded-[28px] bg-white p-4 shadow-card ${className}`}>{children}</section>
);
