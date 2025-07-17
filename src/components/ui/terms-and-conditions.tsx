'use client';

import React from 'react';
import { Button } from './button';

export interface TermsAndConditionsProps {
  onClose: () => void;
  onAgree: () => void;
}

export function TermsAndConditions({
  onClose,
  onAgree,
}: TermsAndConditionsProps) {
  return (
    <div
      className="absolute inset-0 flex bg-[black]/50 w-dvw h-dvh z-10 text-center select-none"
      onClick={onClose}
    >
      <div
        className="m-auto relative flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] p-[30px] w-fit h-fit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[#F90] text-[20px] font-medium flex flex-col gap-[10px]">
          <h1 className="text-[#C45500] text-[32px] font-bold [text-shadow:0px_0px_4px_rgba(255,153,0,0.35)]">
            {'Before We'}
            <br />
            {'Continue'}
          </h1>
          <p>
            {'By registering your child, you'}
            <br />
            {'agree to CHIKA’s '}
            <a className="font-bold" href="/terms_and_conditions.pdf">{'Terms and Conditions'}</a>
            {'.'}
          </p>
          <p>{'Do you agree?'}</p>
        </div>
        <div className="flex gap-[20px]">
          <Button variant="custom" onClick={onClose}>
            {'CANCEL'}
          </Button>
          <Button onClick={onAgree}>{'I AGREE'}</Button>
        </div>
      </div>
    </div>
  );
}