export type ToastTone = 'info' | 'success' | 'error';

export type ToastPayload = {
  title: string;
  description?: string;
  tone?: ToastTone;
};

type Listener = (toast: ToastPayload) => void;

const listeners = new Set<Listener>();

export const toastBus = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  publish(payload: ToastPayload) {
    listeners.forEach((listener) => listener(payload));
  },
};
