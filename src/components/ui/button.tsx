'use client'

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx"; // Add clsx for merging class names
import { twMerge } from "tailwind-merge"; // Add tailwind-merge for better merging of classes
import Link from "next/link"; // Import Next.js Link for routing

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[50px] text-xl font-bold transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none h-[55px] w-full py-[15px] px-[20px] text-nowrap",
  {
    variants: {
      variant: {
        default: "cursor-pointer text-[#FFFDF2] bg-gradient-to-b from-[#F90] to-[#C45500] border border-[#F90] shadow-[0px_5px_0px_0px_#C45500] active:shadow-[0px_0px_0px_0px_#C45500] hover:brightness-110 active:brightness-100 active:translate-y-[5px] duration-100",
        custom: "cursor-pointer text-[#FF9900] bg-[#FFFDF2] border border-[#F90] shadow-[0px_5px_0px_0px_rgba(255,_153,_0,_0.35)] active:shadow-[0px_0px_0px_0px_rgba(255,_153,_0,_0.35)] hover:brightness-110 active:brightness-100 active:translate-y-[5px] duration-100",
        card: "rounded-[35px] text-[#FF9900] bg-[#FFFDF2] border-2 border-[#F90] shadow-[0px_10px_0px_0px_rgba(255,_153,_0,_0.35)] active:shadow-[0px_0px_0px_0px_rgba(255,_153,_0,_0.35)] hover:brightness-110 active:brightness-100 active:translate-y-[5px] duration-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Extend your props with a `soundType` union
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  href?: string;
  /** which clip to play on click */
  soundType?: "click" | "confirm" | "back" | "cancel";
}
type SoundType = Exclude<ButtonProps["soundType"], undefined>;
const soundMap: Record<SoundType, string> = {
  click: "/sfx/CLICK.ogg",
  confirm: "/sfx/CONFIRM.ogg",
  back: "/sfx/BACK.ogg",
  cancel: "/sfx/CANCEL.ogg",
};

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
  VariantProps<typeof buttonVariants> {
  href?: string;
  soundType?: "click" | "confirm" | "back" | "cancel";
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => void;
}

export const Button = ({ className, variant, href, children, onClick, soundType = "click", ...props }: ButtonProps) => {
  // 1) create the Audio instance once per `soundType`
  const audio = React.useMemo(
    () => new Audio(soundMap[soundType]),
    [soundType]
  );

  // 2) stable play function
  const playSound = React.useCallback(() => {
    audio.play().catch((err) =>
      console.error("Playback failed:", err)
    );
  }, [audio]);

  // 3) combined click handler
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => {
    playSound();
    onClick?.(e);
  };

  const merged = twMerge(clsx(buttonVariants({ variant }), className));

  if (href) {
    return (
      <Link href={href} className={merged} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={merged} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
