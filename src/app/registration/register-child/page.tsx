'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import Image from 'next/image'
import { AgeSelector } from '@/components/ui/age-selector-input'
import ToggleSwitch from '@/components/ui/gender-switch'
import { useRegistration } from '@/features/auth/context/RegistrationContext'
import { useRegister } from '@/features/auth/hooks'
import { TermsAndConditions } from '@/components/ui/terms-and-conditions'
import { isValidationErrorResponse, logFieldErrors } from '@/lib/errors'
// import type { ChildInput } from '@/features/auth/types'
import { ErrorDialogBox } from '@/components/ui/error-dialog-box'
import { useQueryClient } from '@tanstack/react-query'

export default function RegisterChild() {
    const router = useRouter()
    const { form, setForm, reset } = useRegistration()
    const registerMutation = useRegister()
    const [showTerms, setShowTerms] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dots, setDots] = useState('')
    const qc = useQueryClient();
    const [showErrorDialog, setShowErrorDialog] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const handleRoute = async (href = '/') => {
        try {
            await router.prefetch(href)
            router.push(href)
        } catch (err) {
            console.warn('Prefetch failed, navigating anyway:', err)
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setShowTerms(true)
    }

    const registerChild = () => {
        setLoading(true);

        registerMutation.mutate(form, {
            onSuccess: ({ access_token, refresh_token, user }) => {
                reset();

                // Save tokens
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                // Save user
                qc.setQueryData(['auth', 'user'], user);
                localStorage.setItem('user', JSON.stringify(user));

                handleRoute('/articulation/how');
            },
            onError: (err: unknown) => {
                if (isValidationErrorResponse(err)) {
                    logFieldErrors(err.detail);
                } else if (err instanceof Error) {
                    console.error('Registration error:', err.message);
                    setErrorMessage(err.message);
                } else {
                    console.error('Unexpected error:', err);
                    setErrorMessage('An unexpected error occurred.');
                }
                setShowErrorDialog(true);
                setLoading(false);
            },
            onSettled: () => {

                handleRoute('/articulation/how');
            },
        });
    };

    useEffect(() => {
        const iv = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + "." : ""))
        }, 500)
        return () => clearInterval(iv)
    }, [])

    const idx = form.child.length - 1
    const c = form.child[idx]

    return (
        <main className={`w-screen min-h-dvh ${!loading ? 'bg-[#F2E7DC]' : ''} bg-[url('/background.svg')] bg-cover bg-no-repeat flex flex-col`}>
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
            {showErrorDialog && (
                <ErrorDialogBox onClose={() => setShowErrorDialog(false)} errorMessage={errorMessage} />
            )}
            <div className="w-full flex-1 overflow-y-auto flex flex-col justify-center items-center text-center pt-[60px] sm:pt-0">
                {loading ? (
                    <div className='flex flex-col items-center gap-[38px]'>
                        <Image src="/processing.png" alt="processing" width={277} height={249} priority />
                        <div className='flex flex-col gap-[5px] font-bold'>
                            <h1 className='text-3xl text-[#C45500]'>{"Processing"}{dots}</h1>
                            <p className='text-2xl text-[#F90]'>{"Please wait."}</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex sm:w-fit px-[32px] sm:max-h-fit grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] shadow-[0px_-1px_24px_rgba(196,85,0,0.30)] w-full'>
                        <form onSubmit={handleSubmit} className="flex flex-col text-[16px] max-w-[311px] mx-auto gap-[30px] sm:py-[50px] pt-[50px] pb-[50px]">
                            <h2 className="text-2xl font-bold">{idx > 0 ? `Register Your Child (${idx + 1})` : `Register Your Child`}</h2>
                            <div key={idx} className="flex flex-col gap-[26px]">
                                <div className="relative w-full">
                                    <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                        <Image src="/create-account/name.svg" alt="nickname" width={15} height={14} className="m-auto" priority />
                                    </div>
                                    <input
                                        type="text"
                                        value={c.nickname}
                                        onChange={e => {
                                            const nickname = e.target.value
                                            setForm(f => {
                                                const arr = [...f.child]
                                                arr[idx] = { ...arr[idx], nickname }
                                                return { ...f, child: arr }
                                            })
                                        }}
                                        required
                                        placeholder="Your Child’s Nickname"
                                        className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51px] pr-[5px] py-2 rounded-[25px] text-[#F90]"
                                    />
                                </div>

                                <ToggleSwitch
                                    checked={c.gender === 'FEMALE'}
                                    onChange={isFemale => {
                                        setForm(f => {
                                            const arr = [...f.child]
                                            arr[idx] = { ...arr[idx], gender: isFemale ? 'FEMALE' : 'MALE' }
                                            return { ...f, child: arr }
                                        })
                                    }}
                                />

                                <AgeSelector
                                    name={`age-${idx}`}
                                    min={4}
                                    max={8}
                                    defaultValue={c.age}
                                    onChange={age => {
                                        setForm(f => {
                                            const arr = [...f.child]
                                            arr[idx] = { ...arr[idx], age }
                                            return { ...f, child: arr }
                                        })
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-[20px]">
                                <Button variant="default" type="submit">
                                    {'REGISTER CHILD'}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </main>
    )
}
