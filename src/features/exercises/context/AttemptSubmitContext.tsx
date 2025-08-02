// exercises/context/AttemptV2Context.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useSubmitAttempt, SubmitAttemptArgs } from '../hooks';
import type { AttemptV2Response } from '../types';

interface AttemptV2ContextValue {
  /** fire the POST, with onSuccess/onError callbacks */
  mutate: (
    args: SubmitAttemptArgs,
    options?: {
      onSuccess?: (data: AttemptV2Response) => void;
      onError?: (err: Error) => void;
    }
  ) => void;
  /** same, but returns a promise so you can await the response */
  mutateAsync: (args: SubmitAttemptArgs) => Promise<AttemptV2Response>;
  data?: AttemptV2Response;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const AttemptV2Context = createContext<AttemptV2ContextValue | undefined>(undefined);

export function AttemptV2Provider({ children }: { children: ReactNode }) {
  const {
    mutate,
    mutateAsync,
    data,
    status,
    error,
  } = useSubmitAttempt();

  const isLoading = status === 'pending'; // React-Query v4
  const isError = status === 'error';

  return (
    <AttemptV2Context.Provider
      value={{
        mutate,
        mutateAsync,
        data,
        isLoading,
        isError,
        error: error ?? null,
      }}
    >
      {children}
    </AttemptV2Context.Provider>
  );
}

export function useAttemptV2Context() {
  const ctx = useContext(AttemptV2Context);
  if (!ctx) {
    throw new Error('useAttemptV2Context must be used within an AttemptV2Provider');
  }
  return ctx;
}
