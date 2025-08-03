'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ChikaListening() {
    const [frame, setFrame] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev % 8) + 1); // Loop 1 → 8
        }, 100); // 100ms per frame

        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <div className='absolute h-screen w-screen bg-black/50 items-center justify-center flex z-10'>
            <div className='flex flex-col rounded-[45px] bg-[#FFFDF2] [box-shadow:0_-1px_24.1px_0_rgba(196,85,0,0.3)] px-[30px] pb-[35px] z-50 items-center'>
                <Image
                    src={`/animation/listening/Order=${frame}.png`}
                    alt={`Frame ${frame}`}
                    width={240}
                    height={240}
                    priority
                />
                {/* Text */}
                <div className='w-full text-center flex flex-col gap-[10px] -mt-[20px]'>
                    <h1 className='text-[#C45500] text-[32px] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]'>{"Hold on"}</h1>
                    <p className='text-[#FF9900] text-[20px] font-medium'>{"CHIKA’s listening closely…"}</p>
                </div>
            </div>
        </div>
    );
}
