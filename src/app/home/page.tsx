'use client';

import React, { useEffect, useRef } from 'react';
import { Header } from '@/components/ui/header';
import { SoundCardSayButton } from '@/components/ui/sound-card-say';
import { SoundCardPractice } from '@/components/ui/sound-card-practice';
import FooterNav from '@/components/ui/footer-nav';
import { useRouter } from 'next/navigation';
import { useUserChildren } from '@/features/users/hooks';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/features/auth/types';
import { Button } from '@/components/ui/button';

export default function Home() {
    const router = useRouter();
    const qc = useQueryClient();
    const user = qc.getQueryData<User>(['auth', 'user']);
    const { data: children } = useUserChildren(user?.id ?? '');
    const handleRoute = async (href = '/') => {
        try {
            await router.prefetch(href)
        } catch (err) {
            console.warn('Prefetch failed, navigating anyway:', err)
        }
        router.push(href)
    }
    // Scrollable
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
        };

        scrollContainer.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            scrollContainer.removeEventListener("wheel", onWheel);
        };
    }, []);
    return (
        <main className="flex flex-col items-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat gap-[8px] px-[33px] pt-[60px] sm:pt-[0px] sm:justify-center">
            <Header showBackButton={false} />
            {/* Header */}
            <div className='flex flex-col w-full sm:max-w-[411px] gap-[24px] sm:pb-0 pb-[92px]'>
                {/* SubHeading */}
                <div className='flex justify-between font-bold'>
                    <div className='flex flex-col h-[41px] gap-[4px]'>
                        <h1 className='text-[#C45500] text-[16px] leading-none'>{"Good Morning!"}</h1>
                        <p className='text-[#F90] text-[24px] uppercase leading-none'>{children?.[0]?.nickname}</p>
                    </div>
                    {/* Avatar */}
                    <div className='rounded-full border border-[#F90] w-[41px] h-[41px] p-[2px]'>
                        <div className='bg-[#F90] w-full h-full rounded-full overflow-clip pt-[5px]'>
                            <Image
                                src={children?.[0]?.gender?.toLowerCase() === "male" ? "/avatar/boy.svg" : "/avatar/girl.svg"} // adjust
                                alt={"avatar"}
                                width={children?.[0]?.gender?.toLowerCase() === "male" ? 28 : 32} //adjust
                                height={32}
                                className="m-auto overflow-hidden"
                                priority
                            />
                        </div>
                    </div>
                </div>
                {/* Sound Cards */}

                <div className='flex flex-col justify-between font-bold gap-[13px]'>
                    <h1 className='text-[#C45500] text-[16px]'>{"SOUNDS TO PRACTICE"}</h1>
                    <div className={'flex w-full items-start justify-start border-2 border-[#F90] rounded-[30px] py-[25px] px-[30px] gap-[25px] bg-[#FFFDF2] shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)]'}>
                        <div className="inline-flex gap-2 items-center justify-center w-full">
                            <div className="text-[#C45500] w-full whitespace-nowrap">
                                <h1 className="text-[16px] font-bold leading-tight">{"ALL SOUNDS"}</h1>
                                <p className="text-[14px] font-normal leading-tight">{"Progress: 30%"}</p>
                            </div>
                            <Button
                                variant="default"
                                className="h-[35px] text-[14px]"
                                onClick={() => handleRoute("/articulation/test")}>
                                {"PRACTICE"}
                            </Button>
                        </div>
                    </div>
                    <svg
                        className="w-full h-[1px]"
                        viewBox="0 0 306 1"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
                        <line
                            x1="0"
                            y1="0.5"
                            x2="306"
                            y2="0.5"
                            stroke="#FF9900"
                            strokeLinecap="round"
                            strokeDasharray="6 6"
                        />
                    </svg>


                    <SoundCardPractice
                        src="/TEMP.svg"
                        alt="D sound icon"
                        sound="D"
                        int="30"
                        max="70"
                        mastery="80"
                        onPractice={(() => handleRoute("/articulation/test"))}
                    />
                    <SoundCardPractice
                        src="/TEMP.svg"
                        alt="D sound icon"
                        sound="K"
                        int="30"
                        max="70"
                        mastery="50"
                        onPractice={(() => handleRoute("/articulation/test"))}
                    />
                    <SoundCardPractice
                        src="/TEMP.svg"
                        alt="D sound icon"
                        sound="K"
                        int="30"
                        max="70"
                        mastery="10"
                        onPractice={(() => handleRoute("/articulation/test"))}
                    />
                </div>
                {/* Sounds i can say*/}
                <div className="flex flex-col gap-[13px] relative">
                    <h1 className="text-[#C45500] text-[16px] font-bold">{"SOUNDS I CAN SAY"}</h1>

                    {/* Wrapper to contain scroll area + gradient overlays */}
                    <div className="relative">
                        {/* Left fade overlay */}
                        <div className="pointer-events-none absolute left-0 top-0 h-full w-3 bg-gradient-to-r from-[#FFFDF2] to-transparent z-10" />

                        {/* Right fade overlay */}
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#FFFDF2] to-transparent z-10" />

                        {/* Scrollable container */}
                        <div
                            ref={scrollRef}
                            className="flex-nowrap flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory p-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                        >
                            <SoundCardSayButton
                                src="/TEMP.svg"
                                alt="K sound icon"
                                label1="/k/"
                                label2="Sound"
                                href="/home"
                            />
                            <SoundCardSayButton
                                src="/TEMP.svg"
                                alt="K sound icon"
                                label1="/D/"
                                label2="Sound"
                                href="/home"
                            /><SoundCardSayButton
                                src="/TEMP.svg"
                                alt="K sound icon"
                                label1="/K/"
                                label2="Sound"
                                href="/home"
                            /><SoundCardSayButton
                                src="/TEMP.svg"
                                alt="K sound icon"
                                label1="/K/"
                                label2="Sound"
                                href="/home"
                            /><SoundCardSayButton
                                src="/TEMP.svg"
                                alt="K sound icon"
                                label1="/K/"
                                label2="Sound"
                                href="/home"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <FooterNav />
        </main>
    );
}
