'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './button';

export interface PracticeCardProps {
    /** Image source URL (next/image) */
    src: string;
    /** Alt text for the image */
    alt?: string;
    /** Title text above the progress line */
    title: string;
    /** Progress text, e.g. "80%" or "Progress: 80%" */
    progress: string;
    /** Callback when the user clicks "START PRACTICE" */
    onPractice: () => void;
    /** Additional wrapper classes if needed */
}

export const SoundCardPractice: React.FC<PracticeCardProps> = ({
    src,
    alt = '',
    title,
    progress,
    onPractice,
}) => {
    return (
        <div
            className={[
                'flex w-full border-2 border-[#F90] rounded-[30px] py-[25px] px-[30px] gap-[25px] bg-[#FFFDF2]'
            ].join(' ')}
        >
            <Image
                src={src}
                alt={alt}
                width={40}
                height={50}
                className="m-auto"
                priority
            />

            <div className="flex flex-col gap-[8px]">
                <div className="text-[#C45500]">
                    <h1 className="text-[16px] font-[700]">{title}</h1>
                    <p className="text-[14px] font-[400]">{progress}</p>
                </div>
                <Button
                    variant="default"
                    className="h-[35px] text-[14px] w-fit"
                    onClick={onPractice}
                >
                    {"START PRACTICE"}
                </Button>
            </div>
        </div>
    );
};
