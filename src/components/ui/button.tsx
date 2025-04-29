import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none h-[60px] w-full py-[15px] px-[20px] text-nowrap",
  {
    variants: {
      variant: {
        default:
          "cursor-pointer transition-all font-bold text-xl text-[#FFFDF2] bg-gradient-to-b from-[#F90] to-[#C45500] text-[#FFFDF2] rounded-[50px] border border-[#F90] shadow-[0px_5px_0px_0px_#C45500] active:shadow-[0px_3px_0px_0px_#C45500] hover:brightness-110 active:brightness-90 active:translate-y-[2px]",
        custom:
          "cursor-pointer transition-all font-bold text-xl text-[#FF9900] rounded-[50px] border border-[#F90] shadow-[0px_5px_0px_0px_rgba(255,_153,_0,_0.35)] active:shadow-[0px_3px_0px_0px_rgba(255,_153,_0,_0.35)] hover:brightness-110 active:brightness-90 active:translate-y-[2px]",
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
  href?: string;
}

export const Button = ({ className, variant, href, ...props }: ButtonProps) => {
  const classes = twMerge(clsx(buttonVariants({ variant }), className));

  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <a className={classes}>{props.children}</a>
      </Link>
    );
  }

  return <button className={classes} {...props} />;
};
