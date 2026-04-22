import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '../utils/error';
import { toastBus } from '../components/feedback/toast-bus';

const showError = (error: unknown) => {
  toastBus.publish({
    title: 'Request failed',
    description: getErrorMessage(error),
    tone: 'error',
  });
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: showError,
  }),
  mutationCache: new MutationCache({
    onError: showError,
  }),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
