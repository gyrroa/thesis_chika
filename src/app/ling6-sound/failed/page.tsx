'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'    // ← import this
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';

export default function Home() {
    const router = useRouter()
    const [step] = useState<'userType' | 'child'>('userType');
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Send form data to API
        console.log('Form submitted:', form);
        router.push('register-child');
    };
    // TODO: Handle submit for other auth

    return (
        <main className="items-center justify-items-center w-screen max-h-dvh bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat">
            <Header />
            <div className="w-screen h-dvh flex flex-col items-center text-center justify-center select-none pt-[60px] sm:pt-0">
                {step === 'userType' && (
                    <div className='flex sm:w-fit sm:px-[32px] sm:max-h-[600px] grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                        <form onSubmit={handleSubmit} className="flex flex-col text-[16px] max-w-[311px] mx-auto justify-between sm:py-[50px] pt-[50px] pb-[50px]">
                    {/*<form onSubmit={handleSubmit} className="flex flex-col text-[16px] max-w-[311px] mx-auto gap-[47px] sm:py-[50px] pt-[50px]">*/}
                            <h2 className="text-2xl font-bold">{"Create Account"}</h2>

                            <div className='flex flex-col gap-[20px]'>

                                <div className="relative w-full">
                                    <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                        <Image
                                            src="/create-account/name.svg"
                                            alt="user-type"
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
                                        onChange={handleChange}
                                        required
                                        className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px]"
                                        placeholder='Your Name'
                                    />
                                </div>

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
                                        value={form.email}
                                        onChange={handleChange}
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
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[45px] py-2 rounded-[25px]"
                                        placeholder='Create a Password'
                                    />
                                </div>

                            </div>
                            <Button variant="default" type='submit'>
                                {"SIGN UP"}
                            </Button>
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
                            <Button variant="custom" className="text-[16px]" href="/">{"OKAY"}</Button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
