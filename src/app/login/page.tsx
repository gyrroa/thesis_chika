'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';

import { useLoginForm } from '@/features/auth/context/LoginContext';
import { useLogin } from '@/features/auth/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { isValidationErrorResponse, logFieldErrors } from '@/lib/errors';
import { ErrorDialogBox } from '@/components/ui/error-dialog-box';
import ChikaLoading from '@/components/animation/chika-loading';

export default function Login() {
    const router = useRouter();
    const { form, setForm } = useLoginForm();
    const loginMutation = useLogin();
    const qc = useQueryClient();
    const [showErrorDialog, setShowErrorDialog] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const alertMessage = "Feature coming soon!"
    const handleSubmit = (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        loginMutation.mutate(form, {
            onSuccess: ({ access_token, refresh_token, user }) => {
                console.log('Login successful:', { access_token, refresh_token, user });

                // Store tokens
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                // ✅ Store user in React Query and localStorage
                qc.setQueryData(['auth', 'user'], user);
                localStorage.setItem('user', JSON.stringify(user));

                router.push('/home');
            },
            onError: (err: unknown) => {
                if (isValidationErrorResponse(err)) {
                    logFieldErrors(err.detail);
                } else if (err instanceof Error) {
                    setErrorMessage(err.message);
                    console.error('Login error:', err.message);
                } else {
                    console.error('Unexpected error:', err);
                    setErrorMessage('An unexpected error occurred.');
                }
                setShowErrorDialog(true);
                setLoading(false);
            },
            onSettled: () => {
                setLoading(false);
            },

        });
    };
    return (
        <main className="w-screen min-h-dvh bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat flex flex-col">
            <Header showBackButton={false} />
            {loading && (
                <ChikaLoading />
            )}
            {showErrorDialog && (
                <ErrorDialogBox onClose={() => setShowErrorDialog(false)} errorMessage={errorMessage} />
            )}
            <div className="w-full flex-1 overflow-y-auto flex flex-col justify-center items-center text-center pt-[60px] sm:pt-0">
                <div className='flex sm:w-fit sm:px-[32px] sm:max-h-[600px] grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col text-[16px] max-w-[311px] mx-auto justify-between sm:py-[50px] pt-[50px] pb-[50px]"
                    >
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
                                    value={form.username}
                                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                                    required
                                    placeholder="Your Email Address"
                                    className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px] text-[#F90]"
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
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
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
                                <div onClick={() => alert(alertMessage)} className="w-14 h-14 rounded-full border border-[#C45500] items-center flex p-[15px] cursor-pointer active:brightness-90 hover:scale-105 active:scale-100 duration-100 shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)]">
                                    <Image
                                        src="/create-account/google.svg"
                                        alt="user-type"
                                        width={24}
                                        height={24}
                                        className="m-auto"
                                        priority
                                    />
                                </div>
                                <div onClick={() => alert(alertMessage)} className="w-14 h-14 rounded-full border border-[#C45500] items-center flex p-[15px] cursor-pointer active:brightness-90 hover:scale-105 active:scale-100 duration-100 shadow-[0px_0px_16px_0px_rgba(255,153,0,0.35)]">
                                    <Image
                                        src="/create-account/facebook.svg"
                                        alt="user-type"
                                        width={26}
                                        height={26}
                                        className="m-auto"
                                        priority
                                    />
                                </div>
                                <div onClick={() => alert(alertMessage)} className="w-14 h-14 rounded-full border border-[#C45500] items-center flex p-[15px] cursor-pointer active:brightness-90 hover:scale-105 active:scale-100 duration-100 shadow-[0px_0px_16px_0px_rgba(255,153,0,0,35)]">
                                    <Image
                                        src="/create-account/apple.svg"
                                        alt="user-type"
                                        width={25}
                                        height={25}
                                        className="m-auto"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        <h1>
                            {"No account yet? "}
                            <span
                                className='font-bold text-[#FF9900] hover:brightness-110 active:brightness-95 duration-100 underline cursor-pointer'
                                onClick={() => router.push("/registration/create-account")}
                            >
                                {"Sign up"}
                            </span>
                        </h1>
                    </form>
                </div>
            </div>
        </main>
    );
}
