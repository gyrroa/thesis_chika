// exercises/context/PreAssessmentContext.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { PreAssessmentResponse } from '@/features/exercises/types';
import { usePreAssessmentItems } from '@/features/exercises/hooks';
import { useUserChildren } from '@/features/users/hooks';
import type { User } from '@/features/auth/types';
import { useQueryClient } from '@tanstack/react-query';

interface PreAssessmentContextValue {
  data?: PreAssessmentResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const PreAssessmentContext = createContext<PreAssessmentContextValue | undefined>(undefined);

export function PreAssessmentProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const user = qc.getQueryData<User>(['auth', 'user']);
  const { data: childrenList, isLoading: loadingKids } = useUserChildren(user?.id ?? '');
  const firstChildId = childrenList?.[0]?.id.toString() ?? '';

  const {
    data,
    isLoading: loadingPre,
    isError,
    error,
  } = usePreAssessmentItems(firstChildId);

  return (
    <PreAssessmentContext.Provider
      value={{
        data,
        isLoading: loadingKids || loadingPre,
        isError,
        error: error ?? null,
      }}
    >
      {children}
    </PreAssessmentContext.Provider>
  );
}

export function usePreAssessment() {
  const ctx = useContext(PreAssessmentContext);
  if (!ctx) {
    throw new Error('usePreAssessment must be used within a PreAssessmentProvider');
  }
  return ctx;
}
