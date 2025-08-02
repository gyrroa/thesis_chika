// app/exercises/attempt_v2/layout.tsx
'use client';

import { AttemptV2Provider } from '@/features/exercises/context/AttemptSubmitContext';
import { PracticeSoundProvider } from '@/features/exercises/context/PracticeSoundContext';
import { PreAssessmentProvider } from '@/features/exercises/context/PreAssessmentContext';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function AttemptV2Layout({ children }: LayoutProps) {
    return <PreAssessmentProvider><PracticeSoundProvider><AttemptV2Provider>{children}</AttemptV2Provider></PracticeSoundProvider></PreAssessmentProvider>;
}
