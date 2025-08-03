'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export interface CardButtonProps {
    /** image source path (next/image) */
    src: string
    /** alt text for the image */
    alt?: string
    /** text shown under the image */
    label1: string
    /** link/href for the button */
    onPractice: () => void;
}

export function SoundCardSayButton({
    src,
    alt = '',
    label1,
    onPractice,
}: CardButtonProps) {
    return (
        <Button
            variant="card"
            className="flex flex-col py-[20px] h-fit w-fit gap-[5px]"
            onClick={onPractice}
        >
            <Image
                src={src}
                alt={alt}
                width={40}
                height={50}
                className="m-auto"
                priority
            />
            <p className='text-[#C45500] text-[14px] font-bold uppercase'><span className='text-[#F90] '>{`/${label1}/`}</span>{" Sound"}</p>
        </Button>
    )
}
