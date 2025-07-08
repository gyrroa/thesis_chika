'use client'

import Image from 'next/image'
import React from 'react'

interface ToggleSwitchProps {
    /** true = “Girl”, false = “Boy” */
    checked: boolean
    onChange: (checked: boolean) => void
}

export default function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
    return (
        <label className="inline-flex cursor-pointer">
            <div className="relative w-[311px] h-11 border border-[#F90] rounded-full focus-within:outline-none">
                {/* now a controlled checkbox */}
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={e => onChange(e.target.checked)}
                />

                {/* Track labels */}
                <span className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#F90] font-bold">
                    Boy
                </span>
                <span className="absolute left-3/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#F90] font-bold">
                    Girl
                </span>

                {/* Knob */}
                <div
                    className={`
            absolute left-1 top-1/2 w-[151px] h-9
            bg-gradient-to-b from-[#F90] to-[#C45500] rounded-full
            transform duration-300 -translate-y-1/2
            peer-checked:translate-x-[151px]
            flex items-center justify-center

            [&>div]:flex [&>div]:items-center [&>div]:space-x-1 [&>div]:text-white [&>div]:font-bold
            [&>div:nth-child(2)]:hidden
            peer-checked:[&>div:nth-child(1)]:hidden
            peer-checked:[&>div:nth-child(2)]:flex
          `}
                >
                    {/* Boy icon + text */}
                    <div className='flex gap-[5px]'>
                        <Image
                            src="/register-child/gender-male.svg"
                            alt=""
                            width={19}
                            height={19}
                            className="m-auto"
                            priority
                        />
                        <span>Boy</span>
                    </div>

                    {/* Girl icon + text */}
                    <div className='flex gap-[5px]'>
                        <Image
                            src="/register-child/gender-female.svg"
                            alt=""
                            width={19}
                            height={19}
                            className="m-auto"
                            priority
                        />
                        <span>Girl</span>
                    </div>
                </div>
            </div>
        </label>
    )
}
