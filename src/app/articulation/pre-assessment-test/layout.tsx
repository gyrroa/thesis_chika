'use client';

import { PreAssessmentProvider } from '@/features/exercises/context/PreAssessmentContext';
import React, { ReactNode } from 'react';

export default function PreAssessmentTestLayout({ children }: { children: ReactNode }) {
    return <PreAssessmentProvider>{children}</PreAssessmentProvider>;
}
