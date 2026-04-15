export const ErrorPanel = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <div className="rounded-[28px] border border-rose-100 bg-white p-5">
    <p className="text-sm font-semibold text-rose-600">Data load failed</p>
    <p className="mt-2 text-sm text-slate-600">{message}</p>
    {onRetry ? (
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Retry
      </button>
    ) : null}
  </div>
);
