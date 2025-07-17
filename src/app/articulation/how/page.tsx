'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { useRouter } from 'next/navigation';
import { DialogBox } from '@/components/ui/dialog-box';

export default function Home() {
    const [showDialog, setShowDialog] = useState(false);
    const router = useRouter();
    const handleStart = () => {
        setShowDialog(true);
    };

    return (
        <main className="flex items-center justify-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat px-[30px]">
            {showDialog && (<DialogBox
                onAgree={() => router.push('test')} 
                onClose={() => setShowDialog(false)}
                title={"Turn on your mic to begin!"}
                description={"We need your microphone so we can hear you say the word."}
                buttonLabel={"OKAY"}
            />
            )}
            <Header showBackButton={false} />
            <div className="flex flex-col items-center text-center justify-center gap-[35px] select-none leading-tight">

                <div className="flex flex-col gap-[5px] text-[#C45500]">
                    <h1 className="font-bold text-[32px] [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">
                        {"Articulation Test"}
                    </h1>
                    <h1 className="font-extrabold text-[24px] text-[#F90] [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">
                        {"How It Works"}
                    </h1>
                </div>

                <ol className="flex flex-col font-medium text-[#F90] text-[20px] text-center items-center gap-[15px]">
                    <li className='flex flex-col items-center'><div className='text-[16px] bg-[#FF9900]/20 border-[#F90] border rounded-full w-6 h-6'>1</div><h1>{"CHIKA will say a "}<b>{"word"}</b></h1></li>
                    <li className='flex flex-col items-center'><div className='text-[16px] bg-[#FF9900]/20 border-[#F90] border rounded-full w-6 h-6'>2</div><h1>{"Ask your child to "}<b>{"repeat"}</b>{" it into the microphone."}</h1></li>
                    <li className='flex flex-col items-center'><div className='text-[16px] bg-[#FF9900]/20 border-[#F90] border rounded-full w-6 h-6'>3</div><h1>{"CHIKA will "}<b>{"listen and check"}</b>{" how they say it."}</h1></li>
                </ol>

                <h1 className="font-extrabold text-[20px] text-[#F90]">
                    {"Keep it playful and encouraging!"}
                </h1>

                <Button className="text-[16px] w-fit" onClick={handleStart}>
                    {"START TEST"}
                </Button>
            </div>
        </main>
    );
}
