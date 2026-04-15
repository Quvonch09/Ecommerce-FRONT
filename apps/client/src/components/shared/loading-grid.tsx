export const LoadingGrid = () => (
  <div className="grid gap-4">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="h-32 animate-pulse rounded-[28px] bg-white/70 shadow-card"
      />
    ))}
  </div>
);
