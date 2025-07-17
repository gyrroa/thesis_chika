'use client';

import React from 'react';
import { Header } from '@/components/ui/header';
import { SoundCardSayButton } from '@/components/ui/sound-card-say';
import { SoundCardPractice } from '@/components/ui/sound-card-practice';
import FooterNav from '@/components/ui/footer-nav';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const handleRoute = async (href = '/') => {
        try {
            await router.prefetch(href)
        } catch (err) {
            console.warn('Prefetch failed, navigating anyway:', err)
        }
        router.push(href)
    }
    return (
        <main className="flex flex-col items-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat gap-[8px] px-[33px] pt-[60px] sm:pt-[0px] sm:justify-center">
            <Header showBackButton={false} />
            {/* Header */}
            <div className='flex flex-col w-full sm:max-w-[411px] gap-[24px]'>
                {/* SubHeading */}
                <div className='flex justify-between font-bold'>
                    <div>
                        <h1 className='text-[#C45500] text-[16px]'>{"Good Morning!"}</h1>
                        <p className='text-[#F90] text-[24px]'>{"NAME"}</p>
                    </div>
                    {/* Avatar */}
                    <div className='rounded-full border border-[#F90] w-[50px] h-[50px] p-[2px]'>
                        <div className='bg-[#F90] w-full h-full rounded-full '></div>
                    </div>
                </div>
                {/* Sound Cards */}
                <div className='flex flex-col justify-between font-bold gap-[13px]'>
                    <h1 className='text-[#C45500] text-[16px]'>{"SOUNDS TO PRACTICE"}</h1>
                    <SoundCardPractice
                        src="/TEMP.svg"
                        alt="D sound icon"
                        title="The /d/ sound"
                        progress="Progress: 80%"
                        onPractice={(() => handleRoute("/articulation/test"))}
                    />
                    <SoundCardPractice
                        src="/TEMP.svg"
                        alt="D sound icon"
                        title="The /k/ sound"
                        progress="Progress: 50%"
                        onPractice={(() => handleRoute("/articulation/test"))}
                    />
                    <h1 className='text-[#C45500] text-[16px]'>{"SOUNDS I CAN SAY"}</h1>
                    {/* sound i can say*/}
                    <div className='flex gap-[12px] overflow-x-scroll scroll-smooth snap-x snap-mandatory pb-[10px] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]'>
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
                            label1="/k/"
                            label2="Sound"
                            href="/home"
                        /><SoundCardSayButton
                            src="/TEMP.svg"
                            alt="K sound icon"
                            label1="/k/"
                            label2="Sound"
                            href="/home"
                        /><SoundCardSayButton
                            src="/TEMP.svg"
                            alt="K sound icon"
                            label1="/k/"
                            label2="Sound"
                            href="/home"
                        /><SoundCardSayButton
                            src="/TEMP.svg"
                            alt="K sound icon"
                            label1="/k/"
                            label2="Sound"
                            href="/home"
                        />
                    </div>
                </div>
            </div>
            <FooterNav />
        </main>
    );
}
