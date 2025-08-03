// src/components/ui/header.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FC, MouseEventHandler } from 'react';

export type HeaderProps = {
  /** Render the back button? */
  showBackButton?: boolean;
  /** Custom click handler for the back button */
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Header: FC<HeaderProps> = ({
  showBackButton = true,
  onBackClick,
}) => {
  const router = useRouter();

  // Default fallback: goBack or push home
  const defaultBack: MouseEventHandler<HTMLButtonElement> = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const clickHandler = onBackClick ?? defaultBack;

  return (
    <header className="
      grid grid-cols-3 items-center h-[60px]
      absolute top-0 left-1/2 transform -translate-x-1/2
      select-none sm:w-[500px] w-full
      px-[26px] py-[12px]
    ">
      {/* Left: Back Button or spacer */}
      <div className="flex justify-start">
        {showBackButton ? (
          <button
            onClick={clickHandler}
            className="cursor-pointer hover:brightness-110 duration-100"
            aria-label="Go back"
          >
            <Image
              src="/header/back.svg"
              alt="Back"
              width={23}
              height={13}
              className="w-[15px] sm:w-[23px] h-auto"
              priority
            />
          </button>
        ) : (
          <div className="w-[23px] h-[13px]" />
        )}
      </div>

      {/* Center: Logo */}
      <div className="flex justify-center gap-[8px]">
        <Image
          src="/header/logo.svg"
          alt="Logo"
          width={330}
          height={100}
          className="w-[30px] sm:w-[130px] h-auto"
          priority
        />
        <Image
          src="/header/text.svg"
          alt="Logo"
          width={330}
          height={100}
          className="w-[216px] sm:w-[330px] h-auto"
          priority
        />
      </div>

      {/* Right: spacer to keep centering */}
      <div className="flex justify-end" />
    </header>
  );
};
