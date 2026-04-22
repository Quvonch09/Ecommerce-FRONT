import { createContext, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, CircleAlert, Info } from 'lucide-react';
import { toastBus, type ToastPayload, type ToastTone } from './toast-bus';

type ToastContextValue = {
  pushToast: (toast: ToastPayload) => void;
};

export const ToastContext = createContext<ToastContextValue>({
  pushToast: () => undefined,
});

type ToastEntry = ToastPayload & { id: number };

const toneStyles: Record<ToastTone, string> = {
  info: 'bg-white text-ink',
  success: 'bg-primary-600 text-white',
  error: 'bg-coral text-white',
};

const toneIcons: Record<ToastTone, React.ReactNode> = {
  info: <Info className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  error: <CircleAlert className="h-5 w-5" />,
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  useEffect(() => {
    return toastBus.subscribe((toast) => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { ...toast, id }]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((entry) => entry.id !== id));
      }, 3500);
    });
  }, []);

  const value = useMemo(
    () => ({
      pushToast: (toast: ToastPayload) => toastBus.publish(toast),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-4 top-4 z-50 space-y-3 safe-pt">
        <AnimatePresence>
          {toasts.map((toast) => {
            const tone = toast.tone || 'info';
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                className={`pointer-events-auto flex items-start gap-3 rounded-3xl px-4 py-3 shadow-card ${toneStyles[tone]}`}
              >
                <div className="mt-0.5">{toneIcons[tone]}</div>
                <div>
                  <p className="text-sm font-semibold">{toast.title}</p>
                  {toast.description ? (
                    <p className="mt-1 text-sm text-current/85">{toast.description}</p>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
