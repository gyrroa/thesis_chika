'use client';

import React from 'react';
import { Header } from '@/components/ui/header';
import FooterNav from '@/components/ui/footer-nav';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
export default function Profile() {
    const router = useRouter()
    const handleRoute = async (href = '/') => {
        try {
            await router.prefetch(href)
        } catch (err) {
            console.warn('Prefetch failed, navigating anyway:', err)
        }
        router.push(href)
    }
    return (
        <main className="flex flex-col items-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat gap-[8px] px-[33px] pt-[60px] sm:pt-[0px] sm:justify-center">
            {/* Header */}
            <Header showBackButton={false} />
            <div className='flex flex-col w-full sm:max-w-[411px] gap-[12px] items-center sm:pb-[55px]'>
                <h1 className='text-[#C45500] text-[32px] font-bold'>{"My Profile"}</h1>
                {/* Editable Profile Content */}
                <div className='flex flex-col gap-[24px] items-center'>
                    <div className='mx-[50px] flex bg-gradient-to-b from-[#F90] to-[#C45500] items-center font-bold px-[24.5px] py-[10px] rounded-[26px] gap-[15px]'>
                        <div className='rounded-full border border-[#FFFDF2] w-[50px] h-[50px] p-[2px]'>
                            <div className='bg-[#FFFDF2] w-full h-full rounded-full '></div>
                        </div>
                        <div className='flex flex-col gap-[24px]'>
                            <h1 className='text-[24px] font-bold [text-shadow:0_0_16px_#C45500] text-[#FFFDF2] outline-text'>NAME</h1>
                        </div>
                    </div>
                    {/* Personal Details */}
                    <div className='flex flex-col gap-[24px] justify-center items-center'>
                        <div className='flex gap-[13px] '>
                            {/* AGE */}
                            <div className='flex flex-col bg-[#FFFDF2] border-2 border-[#F90] py-[25px] px-[30px] rounded-[30px] items-center shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)] w-auto'>
                                <div className='flex gap-[5px] text-[#F90] text-[16px] font-semibold items-left'>
                                    <Image
                                        src={"/profile/age.svg"}
                                        alt={"age"}
                                        width={15}
                                        height={15}
                                        className="h-[15px] m-auto"
                                        priority
                                    />
                                    <h1>{"AGE"}</h1>
                                </div>
                                <h1 className='text-[#C45500] text-[32px] text-center font-bold w-full'>{"8"}</h1>
                            </div>
                            {/* VOICE TYPE */}
                            <div className='flex flex-col bg-[#FFFDF2] border-2 border-[#F90] py-[25px] px-[30px] rounded-[30px] items-center shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)] w-auto'>
                                <div className='flex gap-[5px] text-[#F90] text-[16px] font-semibold items-left whitespace-nowrap'>
                                    <Image
                                        src={"/profile/vtype.svg"}
                                        alt={"voice type"}
                                        width={15}
                                        height={15}
                                        className="h-[15px] m-auto"
                                        priority
                                    />
                                    <h1>{"VOICE TYPE"}</h1>
                                </div>
                                <h1 className='text-[#C45500] text-[32px] text-center font-bold w-full'>{"Girl"}</h1>
                            </div>
                        </div>
                        {/* EMAIL */}
                        <div className='flex flex-col bg-[#FFFDF2] border-2 border-[#F90] py-[25px] px-[30px] rounded-[30px] items-center shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)] w-full'>
                            <div className='flex gap-[5px] text-[#F90] text-[16px] font-semibold items-left w-full'>
                                <Image
                                    src={"/profile/email.svg"}
                                    alt={"email"}
                                    width={15}
                                    height={15}
                                    className="h-[15px] my-auto"
                                    priority
                                />
                                <h1>{"EMAIL"}</h1>
                            </div>
                            <h1 className='text-[#C45500] text-[20px] font-bold w-full'>{"andones@mcm.edu.ph"}</h1>
                        </div>
                    </div>
                    {/* Edit Profile */}
                    <Button className='w-fit' onClick={() => handleRoute("profile/edit")}>{"EDIT PROFILE"}</Button>
                </div>
            </div>
            {/* Footer */}
            <FooterNav />
        </main>
    );
}
