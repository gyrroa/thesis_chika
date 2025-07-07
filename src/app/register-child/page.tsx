'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';
import { AgeSelector } from '@/components/ui/ageSelectorInput';

export default function Home() {
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
    };
    return (
        <main className="items-center justify-items-center w-screen min-h-screen font-[family-name:var(--font-sans)] bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat">
            <Header />
            <div className="w-screen h-screen flex flex-col items-center text-center justify-center select-none pt-[120px] sm:pt-0">
                <div className='flex sm:w-[500px] sm:max-h-[700px] grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                    <form onSubmit={handleSubmit} className="flex flex-col text-[16px] max-w-[311px] mx-auto justify-between sm:py-[50px] pt-[50px] pb-[130px]">
                        <h2 className="text-2xl font-bold">{"Register Your Child"}</h2>

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
                                    placeholder="Your Child's Nick Name"
                                />
                            </div>

                        </div>

                        <AgeSelector
                            name="age"
                            min={2}
                            max={8}
                            defaultValue={4}
                        />

                        <Button variant="default" type='submit'>
                            {"REGISTER CHILD"}
                        </Button>

                        <h1>{"Already have an account? "}<span className='font-bold text-[#FF9900] hover:brightness-110 active:brightness-90 duration-100 underline cursor-pointer'>{"Log in"}</span></h1>
                    </form>
                </div>
            </div>
        </main>
    );
}
