export const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <div className="rounded-[28px] border border-coral/15 bg-white p-5 shadow-card">
    <p className="text-sm font-semibold text-coral">We hit a problem</p>
    <p className="mt-2 text-sm leading-6 text-ink/70">{message}</p>
    {onRetry ? (
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white"
      >
        Try again
      </button>
    ) : null}
  </div>
);
