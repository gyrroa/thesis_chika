import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from './service';
import {
  RegisterPayload,
  RegisterResponse,
  ValidationErrorResponse,
} from './types';

export function useRegister() {
  const qc = useQueryClient();

  return useMutation<
    RegisterResponse,            // TData
    ValidationErrorResponse,     // TError
    RegisterPayload              // TVariables
  >({
    mutationFn: register,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });
}
