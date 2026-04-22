export const FullScreenLoader = ({ label }: { label: string }) => (
  <div className="flex min-h-screen items-center justify-center bg-shell px-6">
    <div className="w-full max-w-sm rounded-[32px] bg-white/90 p-8 text-center shadow-card backdrop-blur">
      <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-primary-100 border-t-primary-500" />
      <h1 className="text-xl font-extrabold text-ink">Store Mini App</h1>
      <p className="mt-2 text-sm text-ink/60">{label}</p>
    </div>
  </div>
);
