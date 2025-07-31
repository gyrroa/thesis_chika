'use client';

import { ReactNode } from 'react';
import { LoginFormProvider } from '@/features/auth/context/LoginContext';

export default function LoginLayout({ children }: { children: ReactNode }) {
    return <LoginFormProvider>{children}</LoginFormProvider>;
}
