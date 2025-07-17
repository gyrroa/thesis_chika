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
    /** text shown under the image */
    label2: string
    /** link/href for the button */
    href: string
}

export function SoundCardSayButton({
    src,
    alt = '',
    label1,
    label2,
    href,
}: CardButtonProps) {
    return (
        <Button
            variant="card"
            href={href}
            className="flex flex-col py-[20px] h-fit w-fit gap-[5px]"
        >
            <Image
                src={src}
                alt={alt}
                width={40}
                height={50}
                className="m-auto"
                priority
            />
            <p className='text-[14px] font-bold'><span className='text-[#C45500]'>{label1}</span>{" " + label2}</p>
        </Button>
    )
}
