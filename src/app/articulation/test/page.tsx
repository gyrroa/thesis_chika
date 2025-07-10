'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';

export default function Home() {
    const handleMic = () => {
    };

    return (
        <main className="flex items-center justify-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat px-[30px]">
            <Header />
            <div className="flex flex-col items-center text-center justify-center gap-[50px] select-none leading-tight">
                <div className="flex flex-col gap-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] rounded-[45px] w-[377px] h-[391px] py-[30px] px-[33px] [box-shadow:0px_127px_36px_0px_rgba(196,85,0,0.01),0px_81px_33px_0px_rgba(196,85,0,0.05),0px_46px_27px_0px_rgba(196,85,0,0.18),0px_20px_20px_0px_rgba(196,85,0,0.31),0px_5px_11px_0px_rgba(196,85,0,0.36)]">
                    <h1 className="font-bold text-[24px] [text-shadow:0px_0px_16px_#C45500] text-[#FFFDF2]">
                        {"Can you say the word? Let's hear it!"}
                    </h1>
                    <div className='bg-[#FFFDF2] rounded-[10px] h-full w-full border-2 border-[#CB5D00] pt-[15px] flex flex-col gap-[10px]'>
                        <div>
                            <Image
                                src={"/articulation/pusa.svg"}
                                alt={"pusa"}
                                width={127}
                                height={132}
                                className="m-auto w-[127px] h-[132px] filter drop-shadow-[0px_0px_16px_rgba(196,85,0,0.35)]"
                                priority
                            />
                            <h1 className='text-[#C45500] text-[32px] tracking-[7px]'>{"[pu•sa]"}</h1>
                        </div>
                        <div className='flex items-center justify-center rounded-b-[10px] bg-[#F2E7DC] h-[50px]'>
                            <div className='border-[#F90] bg-[#FFFDF2] border-2 w-[35px] h-[35px] rounded-full flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                                    <path d="M12 7L0.75 13.4952V0.504809L12 7Z" fill="#FF9900" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="group relative flex items-center justify-center w-[116px] h-[116px] rounded-full bg-[#fcd497] transition-transform duration-200 ease-in-out active:scale-105 active:opacity-90 cursor-pointer transform-gpu">
                    <div
                        className="flex items-center justify-center w-[95px] h-[95px] rounded-full bg-[#ffc363] transition-transform duration-200 ease-in-out group-active:scale-95">
                        <div
                            className="flex items-center justify-center w-[65px] h-[65px] rounded-full bg-[#F9F9F9] [box-shadow:0px_4px_4px_0px_rgba(0,0,0,0.05)] transition-transform duration-200 ease-in-out group-active:scale-95">
                            <Image
                                src="/articulation/mic.svg"
                                alt="mic"
                                width={30}
                                height={30}
                                className="m-auto w-[30px] h-[30px] filter drop-shadow-[0px_0px_16px_rgba(196,85,0,0.35)]"
                                priority
                            />
                        </div>
                    </div>
                </button>
            </div>
        </main>
    );
}
