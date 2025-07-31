'use client';

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';
import Link from 'next/link';

export default function Ling6Failed() {
    const router = useRouter()

    return (
        <main className="w-screen min-h-dvh bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat flex flex-col">
            <Header />
            <div className="w-full flex-1 overflow-y-auto flex flex-col items-center text-center pt-[60px] sm:pt-0">
                <div className='flex flex-col sm:max-w-fit sm:px-[32px] sm:max-h-fit grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                    <div className="flex flex-col max-w-[311px] mx-auto sm:py-[50px] pt-[50px] pb-[50px] gap-[28px]">
                        <div className='flex flex-col gap-[5px] items-center'>
                            <Image
                                src="/ling6-sound/failed.svg"
                                alt="failed"
                                width={24}
                                height={24}
                                className="w-[24px] sm:w-[24px] h-auto"
                                priority
                            />
                            <h2 className="text-[32px] font-bold">{"Test Not Passed"}</h2>
                        </div>
                        <ul className='flex flex-col gap-[20px] text-[20px] text-[#F90]'>
                            <li>{"It looks like some sounds weren’t heard or repeated."}</li>
                            <li>{"CHIKA does not provide support for speech issues related to "}<b>{"hearing loss"}</b>{"."}</li>
                            <li>{"We recommend visiting a "}<b>{"speech or hearing specialist"}</b>{" for proper evaluation."}</li>
                        </ul>
                        <div className='flex flex-col gap-[20px] w-[311px]'>
                            <Link
                                href="https://www.google.com/search?q=speech+therapy+centers+near+me&hl=en&authuser=0"
                                target="_blank"
                                rel="noopener noreferrer"
                                passHref
                            >
                                <Button>
                                    {"FIND HELP NEARBY"}
                                </Button>
                            </Link>
                            <Button variant="custom" onClick={() => router.push('/')}>
                                {"BACK TO CHIKA START"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
