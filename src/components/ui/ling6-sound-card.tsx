'use client';

import React from 'react';
import Image from 'next/image';

interface SoundCardProps {
  label: string;
  src: string;
}

const CARD_CLASSES =
  'flex flex-col h-auto w-auto rounded-[10px] border-1 border-[#C45500] ' +
  'bg-[#F2E7DC] p-[20px] gap-[10px] ' +
  'transition-all duration-200 ease-out items-center';

export const SoundCard: React.FC<SoundCardProps> = ({ label, src }) => {
  return (
    <button
      type="button"
      className={CARD_CLASSES}
      aria-label={`Play sound ${label}`}
    >
      <Image
        src={src}
        alt={label}
        width={50}
        height={50}
        className="m-auto w-[50px] h-[50px] filter drop-shadow-[0px_0px_16px_rgba(196,85,0,0.35)]"
        priority
      />
      <span className="text-[20px] leading-tight text-[#C45500]">
        {label}
      </span>
    </button>
  );
};
