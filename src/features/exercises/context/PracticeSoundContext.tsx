// exercises/context/PracticeSoundContext.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { usePracticeSound } from '../hooks';
import type {
    SoundPracticeResponse,
    PracticeSoundVariables,
} from '../types';
import { useUserChildren } from '@/features/users/hooks';
import type { User } from '@/features/auth/types';

interface PracticeSoundContextValue {
    /** call this to fire the POST */
    mutate: (vars: Omit<PracticeSoundVariables, 'nickname'>) => void;
    data?: SoundPracticeResponse;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

const PracticeSoundContext = createContext<PracticeSoundContextValue | undefined>(undefined);

export function PracticeSoundProvider({ children }: { children: ReactNode }) {
    const qc = useQueryClient();
    const user = qc.getQueryData<User>(['auth', 'user']);
    const { data: childrenList, isLoading: loadingKids } = useUserChildren(user?.id ?? '');
    const firstChild = childrenList?.[0];
    const firstChildId = firstChild?.id.toString() ?? '';
    const nickname = firstChild?.nickname ?? 'unknown';
    const mutation = usePracticeSound(firstChildId);
    const {
        mutate: rawMutate,
        data,
        isPending: loadingCreate,
        isError,
        error,
    } = mutation;

    const mutate = (vars: Omit<PracticeSoundVariables, 'nickname'>) => {
        const safeVars = JSON.parse(JSON.stringify(vars)); 

        if ('params' in safeVars) {
            console.error('❌ `params` should not be passed to mutate:', safeVars);
            throw new Error('Do NOT include `params` in mutate payload.');
        }

        const payload = { ...safeVars, nickname };
        rawMutate(payload);
    };


    return (
        <PracticeSoundContext.Provider
            value={{
                mutate,
                data,
                isLoading: loadingKids || loadingCreate,
                isError,
                error: error ?? null,
            }}
        >
            {children}
        </PracticeSoundContext.Provider>
    );
}

export function usePracticeSoundContext() {
    const ctx = useContext(PracticeSoundContext);
    if (!ctx) {
        throw new Error('usePracticeSoundContext must be used within a PracticeSoundProvider');
    }
    return ctx;
}
