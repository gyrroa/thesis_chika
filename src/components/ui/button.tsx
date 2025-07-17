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
        card: "rounded-[35px] text-[#FF9900] bg-[#FFFDF2] border-2 border-[#F90] shadow-[0px_10px_0px_0px_rgba(255,_153,_0,_0.35)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  href?: string; // Add href as an optional prop to handle navigation
}

export const Button = ({ className, variant, href, children, ...props }: ButtonProps) => {
  const merged = twMerge(clsx(buttonVariants({ variant }), className));

  if (href) {
    return (
      <Link href={href} className={merged}>
        {children}
      </Link>
    );
  }

  return (
    <button className={merged} {...props}>
      {children}
    </button>
  );
};
