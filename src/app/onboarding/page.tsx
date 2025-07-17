'use client';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {

    const router = useRouter()
    const [page, setPage] = useState(1);
    const [fade, setFade] = useState(true);
    const handleRoute = async (href = '/') => {
        try {
            await router.prefetch(href)
        } catch (err) {
            console.warn('Prefetch failed, navigating anyway:', err)
        }
        router.push(href)
    }
    const nextPage = () => {
        setFade(false)

        setTimeout(() => {
            if (page < 3) {
                setPage(page + 1)
            } else {
                handleRoute('/ling6-sound/how')
            }
            setFade(true)
        }, 200)
    }

    const backPage = () => {
        setFade(false)
        setTimeout(() => {
            if (page > 1) {
                setPage(page - 1)
            } else {
                router.back()
            }
            setFade(true)
        }, 200)
    }

    const images = [
        '/onboarding/welcome-1.svg',
        '/onboarding/welcome-2.svg',
        '/onboarding/welcome-3.svg',
    ]

    const contents = [
        {
            title: 'Welcome to CHIKA!',
            desc: "Empower your child's speech development with our AI-powered articulation exercises — fun, effective, and designed just for them!",
        },
        {
            title: 'Pre-Assessment Test',
            desc: 'We’ll start with a Ling6 Sound Test to check hearing, then assess your child’s articulation skills based on their age.',
        },
        {
            title: 'Gamified Virtual Therapy',
            desc: 'Your child will practice targeted articulation exercises through an engaging, AI-guided experience tailored to their needs.',
        },
    ];

    return (
        <main className="flex items-center justify-center justify-items-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat">

            <div className="flex flex-col items-center text-center justify-center gap-[15px] select-none">
                {page === 1
                    ? <Header showBackButton={false} />
                    : <Header onBackClick={backPage} />
                }
                <div className="overflow-hidden w-[315px] h-[315px]">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${(page - 1) * 315}px)`,
                        }}
                    >
                        {images.map((src, i) => (
                            <div
                                key={i}
                                className="w-[315px] h-[315px] flex-shrink-0 relative"
                            >
                                <Image
                                    src={src}
                                    alt={`slide ${i + 1}`}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* page dots */}
                <div className="flex gap-2">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${page === i + 1
                                ? 'bg-[#F90]'
                                : 'bg-[rgba(255,153,0,0.35)]'
                                }`}
                        />
                    ))}
                </div>
                <div className={`flex flex-col gap-[5px] px-[32px] items-center transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    <h1 className="font-bold text-[24px] sm:text-4xl text-[#C45500] [text-shadow:0_0_4px_rgba(255,153,0,0.35)] leading-tight">
                        {contents[page - 1].title}
                    </h1>
                    <p className="text-[14px] text-[#F90] w-[311px]">
                        {contents[page - 1].desc}
                    </p>
                </div>
                <div className="flex justify-center">
                    <Button variant="custom" className="text-[16px]" onClick={nextPage}>
                        {"NEXT"}
                    </Button>
                </div>
            </div>
        </main >
    );
}
