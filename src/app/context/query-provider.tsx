'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import {
  PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { Persister } from '@tanstack/react-query-persist-client';

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [persister, setPersister] = useState<Persister | null>(null);
  const [queryClient] = useState(() => new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60, // 1 hour
        staleTime: 1000 * 60 * 5,
      },
      mutations: {
        retry: 2,
      },
    },
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const asyncPersister = createAsyncStoragePersister({
      storage: window.localStorage,
      key: 'react-query-persist',
      throttleTime: 1000,
    });

    setPersister(asyncPersister);
    setReady(true);
  }, []);

  if (!ready || !persister) return null; // wait for window + persister

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24,
      }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
