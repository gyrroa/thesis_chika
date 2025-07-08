'use client';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="flex items-center justify-center justify-items-center min-h-dvh font-[family-name:var(--font-sans)] bg-[url('/background.svg')] bg-cover bg-no-repeat">

            <div className="flex flex-col items-center text-center justify-center gap-[20px] sm:gap-[41px] select-none">
                <Header />
                <Image
                    src="/onboarding/welcome.svg"
                    alt="user-type"
                    width={315}
                    height={315}
                    className="w-[315px] h-auto"
                    priority
                />
                <div className="flex flex-col gap-[5px] px-[32px]">
                    <h1 className="font-bold text-[24px] sm:text-4xl text-[#C45500] [text-shadow:0_0_4px_rgba(255,153,0,0.35)] leading-tight">
                        {"Welcome to CHIKA!"}
                    </h1>
                    <p className='text-[14vm] text-[#F90]'>
                        {"Empower your child's speech development with our AI-powered articulation exercises — fun, effective, and designed just for them!"}
                    </p>
                </div>
                <div className="flex justify-center">
                    <Button variant="custom" className="text-[16px]">
                        {"NEXT"}
                    </Button>
                </div>
            </div>
        </main>
    );
}
