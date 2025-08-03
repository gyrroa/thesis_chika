'use client';

import React from 'react';
import Image from 'next/image';

export interface PracticeCardProps {
    /** Image source URL (next/image) */
    src: string;
    /** Alt text for the image */
    alt?: string;
    /** Title text above the progress line */
    sound: string;
    /** Progress text */
    int?: number;
    max?: number;
    mastery: number;
    /** Callback when the user clicks "START PRACTICE" */
    onPractice: () => void;
    /** Additional wrapper classes if needed */
}

export const SoundCardPractice: React.FC<PracticeCardProps> = ({
    src,
    alt = '',
    sound,
    int,
    max,
    mastery,
    onPractice,
}) => {
    const FilledStar = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
            <path
                d="M15.1219 6.90723L12.1068 9.4244L13.0254 13.1888C13.0761 13.3931 13.063 13.6074 12.9879 13.8046C12.9127 14.0018 12.7789 14.173 12.6032 14.2966C12.4276 14.4202 12.218 14.4907 12.0009 14.4991C11.7839 14.5076 11.5691 14.4536 11.3838 14.344L8.00013 12.3292L4.61446 14.344C4.42915 14.4529 4.21465 14.5064 3.99799 14.4977C3.78132 14.489 3.57218 14.4184 3.39688 14.2949C3.22158 14.1714 3.08798 14.0004 3.01288 13.8036C2.93779 13.6068 2.92457 13.3929 2.97489 13.1888L3.89686 9.4244L0.881709 6.90723C0.717751 6.77014 0.599173 6.58934 0.540785 6.38743C0.482397 6.18552 0.486786 5.97144 0.553403 5.77193C0.620021 5.57242 0.745916 5.39632 0.915364 5.26561C1.08481 5.13491 1.29031 5.05541 1.50618 5.03703L5.45937 4.72846L6.98436 1.15789C7.06691 0.963292 7.2074 0.796841 7.38797 0.679695C7.56855 0.562549 7.78105 0.5 7.99846 0.5C8.21587 0.5 8.42837 0.562549 8.60894 0.679695C8.78952 0.796841 8.93001 0.963292 9.01255 1.15789L10.5369 4.72846L14.4901 5.03703C14.7064 5.05473 14.9125 5.13379 15.0825 5.26431C15.2526 5.39483 15.3791 5.571 15.4461 5.77075C15.5131 5.97051 15.5177 6.18496 15.4594 6.38724C15.401 6.58952 15.2822 6.77063 15.1179 6.90788L15.1219 6.90723Z"
                fill="url(#filledGradient)"
            />
            <defs>
                <linearGradient id="filledGradient" x1="8" y1="0.5" x2="8" y2="14.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF9900" />
                    <stop offset="1" stopColor="#C45500" />
                </linearGradient>
            </defs>
        </svg>
    );
    const OutlineStar = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
            <path
                d="M15.4335 5.74892C15.3533 5.50978 15.2015 5.299 14.9974 5.14327C14.7933 4.98754 14.5459 4.89385 14.2867 4.87407L10.6284 4.58849L9.21661 1.28841C9.11738 1.05517 8.9487 0.855698 8.73197 0.715322C8.51523 0.574946 8.26023 0.5 7.99935 0.5C7.73847 0.5 7.48347 0.574946 7.26674 0.715322C7.05 0.855698 6.88132 1.05517 6.7821 1.28841L5.37155 4.58911L1.71332 4.87407C1.4536 4.89477 1.20599 4.98923 1.00163 5.14555C0.79727 5.30188 0.645266 5.51311 0.564722 5.7527C0.484177 5.99229 0.478686 6.24955 0.548938 6.49215C0.619191 6.73474 0.762052 6.95185 0.959569 7.1162L3.75092 9.44332L2.89761 12.924C2.83537 13.1694 2.8501 13.4272 2.9399 13.6644C3.02971 13.9017 3.19054 14.1078 3.40191 14.2564C3.61328 14.4051 3.86563 14.4896 4.12683 14.4991C4.38802 14.5086 4.64625 14.4428 4.86862 14.31L7.99935 12.4472L11.1301 14.31C11.3524 14.4419 11.6102 14.5071 11.8708 14.4973C12.1315 14.4875 12.3833 14.4032 12.5943 14.255C12.8053 14.1068 12.9662 13.9014 13.0564 13.6648C13.1466 13.4282 13.1621 13.171 13.1011 12.9259L12.2478 9.44519L15.0391 7.11807C15.2378 6.95333 15.3814 6.73522 15.4516 6.49145C15.5218 6.24767 15.5155 5.98922 15.4335 5.74892ZM10.878 8.6047C10.7703 8.69441 10.6903 8.81097 10.6465 8.94166C10.6027 9.07236 10.5969 9.21217 10.6297 9.34583L11.463 12.7478L8.40596 10.9306C8.28369 10.8578 8.14293 10.8193 7.99935 10.8193C7.85577 10.8193 7.71501 10.8578 7.59274 10.9306L4.5357 12.7478L5.36897 9.34833C5.40179 9.21467 5.39599 9.07486 5.35222 8.94416C5.30844 8.81347 5.22837 8.69691 5.12073 8.6072L2.38821 6.32633L5.96951 6.047C6.11203 6.03593 6.24861 5.987 6.36417 5.90562C6.47973 5.82424 6.56978 5.71357 6.62436 5.58582L7.99935 2.3676L9.37434 5.58582C9.42892 5.71357 9.51897 5.82424 9.63453 5.90562C9.75009 5.987 9.88667 6.03593 10.0292 6.047L13.6105 6.32633L10.878 8.6047Z"
                fill="url(#outlineGradient)"
            />
            <defs>
                <linearGradient id="outlineGradient" x1="8" y1="0.5" x2="8" y2="14.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF9900" />
                    <stop offset="1" stopColor="#C45500" />
                </linearGradient>
            </defs>
        </svg>
    );
    // 1) parse into a percentage 0–100
    const pct = Math.max(0, Math.min(100, isNaN(mastery) ? 0 : mastery));

    // 2) convert each 20% into one star (ceil so 1–20 → 1 star, …, 81–100 → 5 stars)
    const starCount = Math.min(5, Math.ceil(pct / 20));
    return (
        <div
            className={[
                'flex w-full items-center justify-center cursor-pointer border-2 border-[#F90] rounded-[30px] py-[25px] px-[30px] gap-[25px] bg-[#FFFDF2] shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)] active:scale-95 transition-all duration-200'
            ].join(' ')}
            onClick={onPractice}
        >
            <Image
                src={src}
                alt={alt}
                width={40}
                height={50}
                className="my-auto"
                priority
            />

            <div className="inline-flex flex-col gap-2 items-start justify-start w-auto">
                <div className="text-[#C45500]">
                    <h1 className="text-[16px] font-bold leading-tight uppercase">{"THE "}<span className='text-[#F90]'>{"/"}{sound}{"/"}</span>{" SOUND"}</h1>
                    {int != null && max != null && <h1 className="text-[12px] font-medium leading-tight whitespace-nowrap">{"Progress: "}
                        <span className='text-[15px] font-bold bg-gradient-to-b from-[#FF9900] to-[#C45500] bg-clip-text text-transparent outline-text-2'>{int}</span>
                        {" out of "}
                        <span className='text-[15px] font-bold bg-gradient-to-b from-[#FF9900] to-[#C45500] bg-clip-text text-transparent outline-text-2'>{max}</span>
                        {" words"}
                    </h1>}
                    <div className='flex gap-[5px]'>
                        <p className="text-[12px] font-medium leading-tight">{"Mastery: "}</p>
                        {Array.from({ length: 5 }, (_, i) =>
                            i < starCount ? <FilledStar key={i} /> : <OutlineStar key={i} />
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};
