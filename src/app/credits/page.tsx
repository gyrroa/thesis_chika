'use client';

import { Header } from '@/components/ui/header';

export default function Credits() {
    return (
        <main className="w-screen min-h-dvh bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat flex flex-col">
            <Header />
            <div className="w-full flex-1 overflow-y-auto flex flex-col justify-center items-center text-center pt-[60px] sm:pt-0">
                <div className='flex flex-col sm:max-w-fit sm:px-[32px] sm:max-h-fit grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                    <div className="flex flex-col max-w-[375px] mx-auto py-[30px] px-[45px] gap-[10px]">
                        <div className='py-[10px]'>
                            <h2 className="text-[32px] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">{"CREDITS"}</h2>
                        </div>
                        {/* App Development Team */}
                        <ul className='flex flex-col gap-[16px] py-[10px] text-[20px] text-[#F90] w-full'>
                            <h2 className="text-[20px] text-[#C45500] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">{"App Development Team"}</h2>
                            <li>
                                <p className='text-[16px] font-bold'>{"Aisha Nicole Dones"}</p>
                                <p className='text-[13px] font-medium'>{"Project Manager, UI/UX Designer & Linguistic Data Engineer"}</p>
                            </li>
                            <li>
                                <p className='text-[16px] font-bold '>{"James Andrei C. Nadela"}</p>
                                <p className='text-[13px] font-medium'>{"ML Engineer & Backend Developer"}</p>
                            </li>
                            <li>
                                <p className='text-[16px] font-bold'>{"Ken Gyrro P. Acquiat"}</p>
                                <p className='text-[13px] font-medium'>{"ML Engineer & Frontend Developer"}</p>
                            </li>
                        </ul>
                        {/* Special Thanks */}
                        <ul className='flex flex-col gap-[16px] py-[10px] text-[20px] text-[#F90] w-full'>
                            <h2 className="text-[20px] text-[#C45500] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">{"Special Thanks To"}</h2>
                            <li>
                                <p className='text-[16px] font-bold'>{"Engr. Neil P. Magloyuan"}</p>
                                <p className='text-[13px] font-medium'>{"Research Adviser"}</p>
                            </li>
                            <li>
                                <p className='text-[16px] font-bold '>{"Apex Therapy Center"}</p>
                                <p className='text-[13px] font-medium'>{"Clinical Consultant"}</p>
                            </li>
                            <li>
                                <p className='text-[16px] font-bold'>{"Tot’s Garden"}</p>
                                <p className='text-[13px] font-medium'>{"Early Childhood Education Partner"}</p>
                            </li>
                        </ul>
                        {/* Assets and Illustration */}
                        <ul className='flex flex-col gap-[16px] py-[10px] text-[20px] text-[#F90] w-full'>
                            <h2 className="text-[20px] text-[#C45500] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">{"Assets & Illustrations"}</h2>
                            <li>
                                <p className='text-[13px] font-medium'>{"Sourced from Canva and Freepik"}</p>
                                <p className='text-[13px] font-medium'>{" Used under free commercial-use licenses"}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
