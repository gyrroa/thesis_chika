'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export interface CardButtonProps {
    /** alt text for the image */
    alt?: string
    /** text shown under the image */
    sound: string
    /** link/href for the button */
    onPractice: () => void;
}

export function SoundCardSayButton({
    alt = '',
    sound,
    onPractice,
}: CardButtonProps) {

    // Image URL mapping 
    const soundToFilename: Record<string, string> = {
        "b": 'BAboy',
        "d": "dokTOR",
        'dy': 'dYAket',
        'g': 'giTAra',
        'h': 'HIto',
        'k': 'kaBAyo',
        'l': 'laMOK',
        'm': 'maNOK',
        'n': 'niYOG',
        'ng': 'NGIpin',
        'p': 'parupaRO',
        'r': 'reGAlo',
        's': 'SAging',
        'sy': 'siyuDAD',
        't': 'TIGre',
        'ts': 'tsokoLAte',
        'w': 'waLIS',
        'y': 'YElo'
    };
    const imgFilename = useMemo(() => {
        return soundToFilename[sound] ?? sound;
    }, [sound]);

    const imgSrc = `https://kjebfsttsciscbasipqs.supabase.co/storage/v1/object/public/chika-assets/images/${imgFilename}.png`;

    return (
        <Button
            variant="card"
            className="flex flex-col py-[20px] h-fit w-fit gap-[5px]"
            onClick={onPractice}
        >
            <Image
                src={imgSrc}
                alt={alt}
                width={60}
                height={60}
                className="m-auto"
                priority
            />
            <p className='text-[#C45500] text-[14px] font-bold uppercase'><span className='text-[#F90] '>{`/${sound}/`}</span>{" Sound"}</p>
        </Button>
    )
}
