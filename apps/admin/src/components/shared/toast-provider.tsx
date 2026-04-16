import { createContext, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CircleAlert, CircleCheckBig, Info } from 'lucide-react';
import { toastBus, type ToastPayload } from './toast-bus';

export const ToastContext = createContext({
  pushToast: (_payload: ToastPayload): void => undefined,
});

type ToastEntry = ToastPayload & { id: number };

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<ToastEntry[]>([]);

  useEffect(() => {
    return toastBus.subscribe((toast) => {
      const id = Date.now() + Math.random();
      setItems((current) => [...current, { ...toast, id }]);
      window.setTimeout(() => {
        setItems((current) => current.filter((entry) => entry.id !== id));
      }, 3200);
    });
  }, []);

  const value = useMemo(
    () => ({
      pushToast: (payload: ToastPayload) => toastBus.publish(payload),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-6 top-6 z-50 space-y-3">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`flex min-w-[320px] items-start gap-3 rounded-3xl px-4 py-3 shadow-xl ${
                item.tone === 'success'
                  ? 'bg-emerald-600 text-white'
                  : item.tone === 'error'
                    ? 'bg-rose-600 text-white'
                    : item.tone === 'warning'
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-slate-900'
              }`}
            >
              {item.tone === 'success' ? (
                <CircleCheckBig className="mt-0.5 h-5 w-5" />
              ) : item.tone === 'error' ? (
                <CircleAlert className="mt-0.5 h-5 w-5" />
              ) : item.tone === 'warning' ? (
                <AlertTriangle className="mt-0.5 h-5 w-5" />
              ) : (
                <Info className="mt-0.5 h-5 w-5" />
              )}
              <div>
                <p className="text-sm font-bold">{item.title}</p>
                {item.description ? (
                  <p className="mt-1 text-sm opacity-85">{item.description}</p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
