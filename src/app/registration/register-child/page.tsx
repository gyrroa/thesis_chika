'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'    // ← import this
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import Image from 'next/image'
import { AgeSelector } from '@/components/ui/age-selector-input'
import ToggleSwitch from '@/components/ui/gender-switch'
import { useRegistration } from '@/features/auth/context/RegistrationContext'
import { useRegister } from '@/features/auth/hooks'
import { TermsAndConditions } from '@/components/ui/terms-and-conditions'
import { isValidationErrorResponse, logFieldErrors } from '@/lib/errors'

export default function RegisterChild() {
    const router = useRouter();
    const [showTerms, setShowTerms] = useState(false);
    const { form, setForm, reset } = useRegistration();
    const { mutateAsync } = useRegister();
    const [dots, setDots] = useState('');
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setShowTerms(true);
    }

    async function registerChild() {
        setLoading(true);
        try {
            await mutateAsync(form);
            reset();
            router.push('/articulation/how');
        } catch (err: unknown) {
            // your existing type‐guard for ValidationErrorResponse
            if (isValidationErrorResponse(err)) {
                logFieldErrors(err.detail);
            }
            // any Error with a string message (including our 400 detail)
            else if (err instanceof Error) {
                console.error('Registration error:', err.message);
            }
            // really unexpected
            else {
                console.error('Unexpected error:', err);
            }
            setTimeout(() => router.push('/articulation/how'), 2000)
        }
    }

    async function handleAddChild(e: FormEvent) {
        e.preventDefault()
        reset()
    }

    useEffect(() => {
        const iv = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + "." : ""));
        }, 500);
        return () => clearInterval(iv);
    }, []);

    return (
        <main className={`}items-center justify-items-center w-dvw max-h-dvh ${!loading ? 'bg-[#F2E7DC]' : ''} bg-[url('/background.svg')] bg-cover bg-no-repeat`}>
            <Header showBackButton={false} />
            {showTerms && (
                <TermsAndConditions
                    onClose={() => setShowTerms(false)}
                    onAgree={async () => {
                        setShowTerms(false)
                        await registerChild()
                    }}
                />
            )}
            <div className="w-dvw h-dvh flex flex-col items-center text-center justify-center select-none pt-[60px] sm:pt-0">
                {!loading ? (
                    <div className='flex sm:w-fit px-[32px] sm:max-h-fit grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                        <form onSubmit={handleSubmit} className="flex flex-col text-[16px] max-w-[311px] mx-auto gap-[30px] sm:py-[50px] pt-[50px] pb-[50px]">
                            <div className='flex flex-col gap-[25px]'>
                                <h2 className="text-2xl font-bold">{"Register Your Child"}</h2>
                                <div className='flex flex-col gap-[26px]'>

                                    <div className="relative w-full">
                                        <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                            <Image
                                                src="/create-account/name.svg"
                                                alt="nickname"
                                                width={15}
                                                height={14}
                                                className="m-auto relative"
                                                priority
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="nickName"
                                            value={form.child.nickname}
                                            onChange={e => setForm(f => ({ ...f, child: { ...f.child, nickname: e.target.value } }))}
                                            required
                                            className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px]"
                                            placeholder="Your Child's Nickname"
                                        />
                                    </div>

                                    <div className="relative w-full">
                                        <ToggleSwitch
                                            checked={form.child.gender === 'female'}
                                            onChange={isFemale => setForm(f => ({ ...f, child: { ...f.child, gender: isFemale ? 'female' : 'male' } }))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <AgeSelector
                                name="age"
                                min={2}
                                max={8}
                                defaultValue={4}
                                onChange={age => setForm(f => ({ ...f, child: { ...f.child, age } }))}
                            />
                            <div className="flex flex-col gap-[20px]">
                                <Button variant="default" type="submit">
                                    {'REGISTER CHILD'}
                                </Button>
                                <Button variant="custom" type='reset' onClick={handleAddChild}>
                                    {'ADD ANOTHER CHILD'}
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-[38px]'>
                        <Image
                            src="/processing.png"
                            alt="processing"
                            width={277}
                            height={249}
                            className="m-auto relative"
                            priority
                        />
                        <div className='flex flex-col gap-[5px] font-bold'>
                            <h1 className='text-3xl text-[#C45500]'>{"Processing"}{dots}</h1>
                            <p className='text-2xl text-[#F90]'>{"Please wait."}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
