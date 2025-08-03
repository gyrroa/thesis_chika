'use client';

import React, { ReactNode, useMemo } from 'react';
import { Button } from './button';
import Image from 'next/image';

export interface DialogBoxProps {
  onClose: () => void;
  errorMessage: ReactNode;
}

export function ErrorDialogBox({
  onClose,
  errorMessage,
}: DialogBoxProps) {
  const displayMessage: ReactNode = useMemo(() => {
    if (typeof errorMessage === 'string') {
      return errorMessage.endsWith('.')
        ? errorMessage
        : errorMessage + '.';
    }
    // if it’s already a ReactNode (e.g. you passed <span>…), just render it as-is
    return errorMessage;
  }, [errorMessage]);

  return (
    <div
      className="absolute inset-0 flex bg-[black]/50 w-dvw h-dvh z-20 text-center select-none"
      onClick={onClose}
    >
      <div
        className="m-auto relative flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] p-[30px] w-fit h-fit sm:max-w-[371px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[#F90] text-[20px] font-medium flex flex-col gap-[10px]">
          {/* Image */}
          <Image
            src={"/chika/angy.svg"}
            alt={"chika"}
            width={160}
            height={160}
            className="m-auto"
            priority
          />
          {/* Texts */}
          <div className='flex flex-col gap-[10px]'>
            <h1 className="text-[#C45500] text-[32px] font-bold [text-shadow:0px_0px_4px_rgba(255,153,0,0.35)] tracking-wide">
              {"Error"}
            </h1>
            <p>
              {displayMessage}
            </p>
          </div>
        </div>
        <div className="flex gap-[20px]">
          <Button onClick={onClose}>{"OKAY"}</Button>
        </div>
      </div>
    </div>
  );
}