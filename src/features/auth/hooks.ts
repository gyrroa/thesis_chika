//
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  register,
  login,
  refreshToken,
  verifyToken,
  isEmailExisting,
} from './service';

import type {
  RegisterPayload,
  RegisterResponse,
  ValidationErrorResponse,
  LoginPayload,
  LoginResponse,
  RefreshPayload,
  VerifyTokenResponse,
  IsEmailExistingResponse,
} from './types';
import { useEffect, useState } from 'react';

export function useRegister() {
  const qc = useQueryClient();
  return useMutation<RegisterResponse, ValidationErrorResponse, RegisterPayload>({
    mutationFn: register,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation<LoginResponse, ValidationErrorResponse | Error, LoginPayload>({
    mutationFn: login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });
}

export function useRefresh() {
  const qc = useQueryClient();
  return useMutation<LoginResponse, ValidationErrorResponse | Error, RefreshPayload>({
    mutationFn: refreshToken,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });
}

export function useVerifyToken() {
  return useQuery<VerifyTokenResponse, Error>({
    queryKey: ['auth', 'verify-token'],
    queryFn: verifyToken,
    retry: false,  // don’t retry on 401
    enabled: false,  // call manually
  });
}
export function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const isBrowser = typeof window !== 'undefined';
  const [state, setState] = useState<T>(() => {
    if (isBrowser) {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        try {
          return JSON.parse(stored);
        } catch {
          return defaultValue;
        }
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}

export function useCheckEmailExists(email: string, enabled: boolean = false) {
  return useQuery<IsEmailExistingResponse, ValidationErrorResponse | Error>({
    queryKey: ['auth', 'is_email_existing', email],
    queryFn: () => isEmailExisting({ email }),
    enabled,
  });
}

