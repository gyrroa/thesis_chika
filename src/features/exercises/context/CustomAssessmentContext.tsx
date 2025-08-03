// --- in features/exercises/context/CustomAssessmentContext.tsx ---
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type {
  CustomAssessmentVariables,
  CustomAssessmentResponse
} from '../types';
import { useUserChildren } from '@/features/users/hooks';
import type { User } from '@/features/auth/types';
import { useCustomAssessment } from '../hooks';

interface CustomAssessmentContextValue {
  /** call this to fire the POST */
  mutate: (vars: Omit<CustomAssessmentVariables, 'nickname'>) => void;
  data?: CustomAssessmentResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const CustomAssessmentContext = createContext<CustomAssessmentContextValue | undefined>(undefined);

export function CustomAssessmentProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const user = qc.getQueryData<User>(['auth', 'user']);
  const { data: childrenList, isLoading: loadingKids } = useUserChildren(user?.id ?? '');
  const firstChild = childrenList?.[0];
  const childId = firstChild?.id.toString() ?? '';
  const nickname = firstChild?.nickname ?? '';

  const { mutate: rawMutate, data, isPending: loadingCreate, isError, error } =
    useCustomAssessment(childId);

  const mutate = (vars: Omit<CustomAssessmentVariables, 'nickname'>) => {
    // include the nickname from the first child automatically
    rawMutate({ ...vars, nickname });
  };

  return (
    <CustomAssessmentContext.Provider
      value={{
        mutate,
        data,
        isLoading: loadingKids || loadingCreate,
        isError,
        error: error ?? null,
      }}
    >
      {children}
    </CustomAssessmentContext.Provider>
  );
}

export function useCustomAssessmentContext() {
  const ctx = useContext(CustomAssessmentContext);
  if (!ctx) {
    throw new Error('useCustomAssessmentContext must be used within a CustomAssessmentProvider');
  }
  return ctx;
}
