'use client';

// import { FormEvent, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';

export default function Login() {
    const router = useRouter()
    // unfinished pa
    return (
        <main className="items-center justify-items-center w-screen max-h-dvh bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat">
            <Header showBackButton={false} />
            <div className="w-screen h-dvh flex flex-col items-center text-center justify-center select-none pt-[60px] sm:pt-0">
                <div className='flex sm:w-fit sm:px-[32px] sm:max-h-[600px] grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                    <form className="flex flex-col text-[16px] max-w-[311px] mx-auto justify-between sm:py-[50px] pt-[50px] pb-[50px]">
                        <h2 className="text-2xl font-bold">{"Login"}</h2>

                        <div className='flex flex-col gap-[20px]'>

                            <div className="relative w-full">
                                <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                    <Image
                                        src="/create-account/email-address.svg"
                                        alt="user-type"
                                        width={15}
                                        height={12}
                                        className="m-auto"
                                        priority
                                    />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    // value={""}
                                    // onChange={}
                                    required
                                    placeholder="Your Email Address"
                                    className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px]"
                                />
                            </div>


                            <div className="relative w-full">
                                <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                    <Image
                                        src="/create-account/password.svg"
                                        alt="user-type"
                                        width={15}
                                        height={17}
                                        className="m-auto"
                                        priority
                                    />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    // value={form.password}
                                    // onChange={handleChange}
                                    required
                                    className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[45px] py-2 rounded-[25px]"
                                    placeholder='Create a Password'
                                />
                            </div>

                        </div>
                        <Button variant="default" type='submit'>
                            {"LOGIN"}
                        </Button>

                        <div className='flex flex-col gap-[17px]'>
                            <h1>{"Or continue with"}</h1>
                            <div className='flex gap-[19px] items-center justify-center'>
                                <div className="w-14 h-14 rounded-full border border-[#C45500] items-center flex p-[15px] cursor-pointer active:brightness-90 hover:scale-105 active:scale-100 duration-100 shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)]">
                                    <Image
                                        src="/create-account/google.svg"
                                        alt="user-type"
                                        width={24}
                                        height={24}
                                        className="m-auto"
                                        priority
                                    />
                                </div>
                                <div className="w-14 h-14 rounded-full border border-[#C45500] items-center flex p-[15px] cursor-pointer active:brightness-90 hover:scale-105 active:scale-100 duration-100 shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)]">
                                    <Image
                                        src="/create-account/facebook.svg"
                                        alt="user-type"
                                        width={26}
                                        height={26}
                                        className="m-auto"
                                        priority
                                    /></div>
                                <div className="w-14 h-14 rounded-full border border-[#C45500] items-center flex p-[15px] cursor-pointer active:brightness-90 hover:scale-105 active:scale-100 duration-100 shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)]">
                                    <Image
                                        src="/create-account/apple.svg"
                                        alt="user-type"
                                        width={25}
                                        height={25}
                                        className="m-auto"
                                        priority
                                    /></div>
                            </div>
                        </div>

                        <h1>{"No account yet? "}<span className='font-bold text-[#FF9900] hover:brightness-110 active:brightness-95 duration-100 underline cursor-pointer' onClick={() => router.push("/registration/create-account")}>{"Sign up"}</span></h1>
                    </form>
                </div>
            </div>
        </main>
    );
}
