import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toastBus } from '../components/shared/toast-bus';
import { getErrorMessage } from '../utils/error';

const onError = (error: unknown) => {
  toastBus.publish({
    title: 'Request failed',
    description: getErrorMessage(error),
    tone: 'error',
  });
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError }),
  mutationCache: new MutationCache({ onError }),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
