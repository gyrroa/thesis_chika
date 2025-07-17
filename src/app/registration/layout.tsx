'use client';

import { ReactNode } from 'react';
import { RegistrationProvider } from '@/features/auth/context/RegistrationContext';

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return <RegistrationProvider>{children}</RegistrationProvider>;
}