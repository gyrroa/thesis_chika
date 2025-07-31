'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getUserChildren } from '@/features/users/service';
import type { Child } from '@/features/users/types';
import type { User } from '@/features/auth/types';

export function InitAuth() {
  const qc = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userString = localStorage.getItem('user');

    if (!token || !userString) return;

    try {
      const user: User = JSON.parse(userString);

      // ✅ Only hydrate user if not already cached
      if (!qc.getQueryData(['auth', 'user'])) {
        qc.setQueryData(['auth', 'user'], user);
      }

      // ✅ Only fetch children if not already cached
      if (!qc.getQueryData(['user', 'children'])) {
        getUserChildren(user.id)
          .then((children: Child[]) => {
            qc.setQueryData(['user', 'children'], children);
            children.forEach((child) => {
              qc.setQueryData(['user', 'child', child.id], child);
            });
          })
          .catch(() => {
            // Cleanup if fetch fails
            localStorage.clear();
            qc.removeQueries({ queryKey: ['user', 'children'] });
            qc.removeQueries({ queryKey: ['user', 'child'] });
          });
      }

    } catch {
      localStorage.clear();
    }
  }, [qc]);

  return null;
}
