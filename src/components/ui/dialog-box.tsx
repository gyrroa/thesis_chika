'use client';

import React, { ReactNode } from 'react';
import { Button } from './button';
import Image from 'next/image';

export interface DialogBoxProps {
  onClose: () => void;
  onAgree: () => void;
  title: ReactNode;
  description: ReactNode;
  buttonLabel: ReactNode;
}

export function DialogBox({
  onClose,
  onAgree,
  title,
  description,
  buttonLabel,
}: DialogBoxProps) {
  return (
    <div
      className="absolute inset-0 flex bg-[black]/50 w-dvw h-dvh z-10 text-center select-none"
      onClick={onClose}
    >
      <div
        className="m-auto relative flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] p-[30px] w-fit h-fit sm:max-w-[371px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[#F90] text-[20px] font-medium flex flex-col gap-[10px]">
          {/* Image */}
          <Image
            src={"/chika/chick.svg"}
            alt={"chika"}
            width={160}
            height={160}
            className="m-auto"
            priority
          />
          {/* Texts */}
          <div className='flex flex-col gap-[10px]'>
            <h1 className="text-[#C45500] text-[32px] font-bold [text-shadow:0px_0px_4px_rgba(255,153,0,0.35)] tracking-wide">
              {title}
            </h1>
            <p>
              {description}
            </p>
          </div>
        </div>
        <div className="flex gap-[20px]">
          <Button onClick={onAgree}>{buttonLabel}</Button>
        </div>
      </div>
    </div>
  );
}