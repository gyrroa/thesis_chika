// src/features/users/hooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    updateUser,
    updateChild,
    getChild,
    getUserChildren,
} from './service';

import type {
    UpdateUserPayload,
    UpdateUserResponse,
    UpdateChildPayload,
    Child,
    ValidationErrorResponse,
} from './types';

export function useUpdateUser() {
    const qc = useQueryClient();
    return useMutation<UpdateUserResponse, ValidationErrorResponse, UpdateUserPayload>({
        mutationFn: updateUser,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['auth', 'user'] });
        },
    });
}

export function useUpdateChild() {
    const qc = useQueryClient();
    return useMutation<Child, ValidationErrorResponse, { child_id: string; data: UpdateChildPayload }>({
        mutationFn: ({ child_id, data }) => updateChild(child_id, data),
        onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ['user', 'child', data.id] });
        },
    });
}

export function useChild(child_id: string) {
    return useQuery<Child, ValidationErrorResponse>({
        queryKey: ['user', 'child', child_id],
        queryFn: () => getChild(child_id),
    });
}

export function useUserChildren(user_id: string) {
  return useQuery<Child[]>({
    queryKey: ['user', 'children', user_id],
    queryFn: () => getUserChildren(user_id),
    enabled: !!user_id, // waits for user.id
  });
}
