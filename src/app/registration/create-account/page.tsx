'use client';

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';
import { useRegistration } from '@/features/auth/context/RegistrationContext';

export default function RegisterUser() {
    const router = useRouter()
    const { form, setForm } = useRegistration();
    const [step] = useState<'userType' | 'child'>('userType');
    const handleRoute = async (href = '/') => {
        try {
            await router.prefetch(href)
        } catch (err) {
            console.warn('Prefetch failed, navigating anyway:', err)
        }
        router.push(href)
    }
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        handleRoute('/registration/register-child');
    }

    return (
        <main className="items-center justify-items-center w-screen max-h-dvh bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat">
            <Header showBackButton={false} />
            <div className="w-screen h-dvh flex flex-col items-center text-center justify-center select-none pt-[60px] sm:pt-0">
                {step === 'userType' && (
                    <div className='flex sm:w-fit sm:px-[32px] sm:max-h-[600px] grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                        <form onSubmit={handleSubmit} className="flex flex-col text-[16px] max-w-[311px] mx-auto justify-between sm:py-[50px] pt-[50px] pb-[50px]">
                            <h2 className="text-2xl font-bold">{"Create Account"}</h2>

                            <div className='flex flex-col gap-[20px]'>
                                {/* Name */}
                                <div className="relative w-full">
                                    <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                        <Image
                                            src="/create-account/name.svg"
                                            alt="name"
                                            width={15}
                                            height={14}
                                            className="m-auto relative"
                                            priority
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        required
                                        className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51px] pr-[5px] py-2 rounded-[25px]"
                                        placeholder='Your Name'
                                    />
                                </div>
                                {/* Email */}
                                <div className="relative w-full">
                                    <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                        <Image
                                            src="/create-account/email-address.svg"
                                            alt="email"
                                            width={15}
                                            height={12}
                                            className="m-auto"
                                            priority
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                        required
                                        placeholder="Your Email Address"
                                        className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px]"
                                    />
                                </div>
                                {/* Password */}
                                <div className="relative w-full">
                                    <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                        <Image
                                            src="/create-account/password.svg"
                                            alt="password"
                                            width={15}
                                            height={17}
                                            className="m-auto"
                                            priority
                                        />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                        required
                                        className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[45px] py-2 rounded-[25px]"
                                        placeholder='Create a Password'
                                    />
                                </div>

                            </div>
                            <Button variant="default" type='submit'>
                                {"SIGN UP"}
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

                            <h1>{"Already have an account? "}<span className='font-bold text-[#FF9900] hover:brightness-110 active:brightness-95 duration-100 underline cursor-pointer' onClick={() => router.push("/login")}>{"Log in"}</span></h1>
                        </form>
                    </div>
                )}
                {step === 'child' && (
                    <>
                        <Image src="/create-account/if-child.svg" alt="user-type" width={315} height={315} className="w-[315px] h-auto drop-shadow-[0px_8px_16px_rgba(196,85,0,0.35)]" priority />
                        <div className="flex flex-col">
                            <h1 className="font-extrabold text-[24px] sm:text-4xl text-[#F90] [text-shadow:0_0_4px_rgba(255,153,0,0.35)] leading-tight">{"Ask a "}<span className="text-[#C45500]">{"parent"}</span>{" to set up"}<br />{" the app"}</h1>
                        </div>
                        <div className="flex gap-[10px] w-[84px] justify-center">
                            <Button variant="custom" className="text-[16px]" onClick={() => handleRoute}>{"OKAY"}</Button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
