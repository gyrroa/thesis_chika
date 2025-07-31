'use client';

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';
import ToggleSwitch from '@/components/ui/gender-switch';
import { AgeSelector } from '@/components/ui/age-selector-input';
import { useState } from 'react';
import { useUpdateChild, useUpdateUser, useUserChildren } from '@/features/users/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/features/auth/types';
import { isValidationErrorResponse, logFieldErrors } from '@/lib/errors';
import { ErrorDialogBox } from '@/components/ui/error-dialog-box';
import ChikaLoading from '@/components/animation/chika-loading';

export default function Edit() {
    const router = useRouter()
    const [showSave, setShowSave] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const qc = useQueryClient();
    const user = qc.getQueryData<User>(['auth', 'user']);

    const { data: children } = useUserChildren(user?.id ?? '');

    // Edit
    const { mutate: updateUser } = useUpdateUser();
    const { mutate: updateChild } = useUpdateChild();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [age, setAge] = useState(children?.[0]?.age || 6);
    const [gender, setGender] = useState(children?.[0]?.gender?.toUpperCase() || 'MALE');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false)
    const [showErrorDialog, setShowErrorDialog] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    function handleSave() {
        setShowSave(true);
    }

    function handleChangePassword() {
        setShowChangePassword(true);
    }
    function saveEdit() {
        if (!user || !children?.[0]) return;
        setLoading(true);
        updateUser(
            {
                name,
                email,
                password: confirmPassword,
                verify_password: confirmPassword,
            },
            {
                onSuccess: () => {
                    updateChild(
                        {
                            child_id: children[0].id,
                            data: {
                                nickname: name,
                                age,
                                gender,
                            },
                        },
                        {
                            onSuccess: () => {
                                const updatedChild = {
                                    ...children[0],
                                    nickname: name,
                                    age,
                                    gender,
                                };

                                const updatedUser = {
                                    ...user,
                                    name,
                                    email,
                                };

                                // Manually update query cache
                                qc.setQueryData(['auth', 'user'], updatedUser);
                                qc.setQueryData(['user', 'children', user.id], [updatedChild]);
                                qc.setQueryData(['user', 'child', children[0].id], updatedChild);

                                // Optional: keep localStorage in sync too
                                localStorage.setItem('user', JSON.stringify(updatedUser));

                                // Route
                                router.push('/profile');
                            },

                            onError: (err) => {
                                console.error('Failed to update child:', err);
                                setLoading(false);
                            },
                        }
                    );
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
            }
        );
    }

    // Change Password
    const [verifyPassword, setVerifyPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    function savePassword() {
        setLoading(true);
        if (!verifyPassword || !newPassword) {
            setErrorMessage("Please fill in all password fields.");
            setShowErrorDialog(true);
            setLoading(false);
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setErrorMessage("New passwords do not match.");
            setShowErrorDialog(true);
            setLoading(false);
            return;
        }

        if (!user) {
            setLoading(false);
            return;
        }


        updateUser(
            {
                name: user.name,
                email: user.email,
                password: newPassword,
                verify_password: verifyPassword,
            },
            {
                onSuccess: () => {
                    setShowChangePassword(false);
                    setVerifyPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setLoading(false);
                },
                onError: (err: unknown) => {
                    if (isValidationErrorResponse(err)) {
                        logFieldErrors(err.detail);
                    } else if (err instanceof Error) {
                        setErrorMessage(err.message);
                    } else {
                        setErrorMessage('An unexpected error occurred.');
                    }
                    setShowErrorDialog(true);
                    setLoading(false);
                },
            }
        );
    }

    return (
        <main className="items-center justify-items-center w-screen max-h-dvh bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat">
            <Header />
            {showErrorDialog && (
                <ErrorDialogBox onClose={() => setShowErrorDialog(false)} errorMessage={errorMessage} />
            )}
            {loading && (
                <ChikaLoading />
            )}
            {showSave && (
                <div
                    className="absolute inset-0 flex bg-[black]/50 w-dvw h-dvh z-10 text-center select-none"
                    onClick={() => setShowSave(false)}
                >
                    <div
                        className="m-auto relative flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] p-[30px] w-fit h-fit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-[#F90] text-[20px] font-medium flex flex-col gap-[10px]">
                            <h1 className="text-[#C45500] text-[32px] font-bold [text-shadow:0px_0px_4px_rgba(255,153,0,0.35)]">
                                {'Save Changes'}
                            </h1>
                            <p>
                                {'Please enter your password to'}
                                <br />
                                {'save changes.'}
                            </p>
                        </div>
                        <div className="relative w-full text-[#C45500]">
                            <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                <Image
                                    src="/create-account/password.svg"
                                    alt="password"
                                    width={15}
                                    height={12}
                                    className="m-auto"
                                    priority
                                />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Enter Password"
                                className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px]"
                            />
                        </div>
                        <div className="flex gap-[20px]">
                            <Button variant="custom" onClick={() => setShowSave(false)}>
                                {'CANCEL'}
                            </Button>
                            <Button onClick={saveEdit}>{'I AGREE'}</Button>
                        </div>
                    </div>
                </div>
            )}
            {showChangePassword && (
                <div
                    className="absolute inset-0 flex bg-[black]/50 w-dvw h-dvh z-10 text-center select-none"
                    onClick={() => setShowChangePassword(false)}
                >
                    <div
                        className="m-auto relative flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] px-[33px] py-[30px] w-full sm:w-fit h-fit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-[#C45500] text-[32px] font-bold [text-shadow:0px_0px_4px_rgba(255,153,0,0.35)]">
                            {'Change Password'}
                        </h1>
                        {/* Old Password */}
                        <div className='flex flex-col gap-[11px] text-left text-[#C45500] text-[16px] font-semibold'>
                            <p>{"Old Password"}</p>
                            <div className="relative w-full">
                                <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                    <Image
                                        src="/create-account/password.svg"
                                        alt="password"
                                        width={15}
                                        height={12}
                                        className="m-auto"
                                        priority
                                    />
                                </div>
                                <input
                                    type="password"
                                    name="old_password"
                                    value={verifyPassword}
                                    onChange={(e) => setVerifyPassword(e.target.value)}
                                    required
                                    placeholder="Old Password"
                                    className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px]"
                                />
                            </div>
                        </div>
                        {/* New Password */}
                        <div className='flex flex-col gap-[11px] text-left text-[#C45500] text-[16px] font-semibold'>
                            <p>{"New Password"}</p>
                            <div className="relative w-full">
                                <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                    <Image
                                        src="/create-account/password.svg"
                                        alt="password"
                                        width={15}
                                        height={12}
                                        className="m-auto"
                                        priority
                                    />
                                </div>
                                <input
                                    type="password"
                                    name="new_password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="New Password"
                                    className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px]"
                                />
                            </div>
                        </div>
                        {/* Confirm New Password */}
                        <div className='flex flex-col gap-[11px] text-left text-[#C45500] text-[16px] font-semibold'>
                            <p>{"Confirm New Password"}</p>
                            <div className="relative w-full">
                                <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                    <Image
                                        src="/create-account/password.svg"
                                        alt="password"
                                        width={15}
                                        height={12}
                                        className="m-auto"
                                        priority
                                    />
                                </div>
                                <input
                                    type="password"
                                    name="confirm_new_password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    required
                                    placeholder="Confirm New Password"
                                    className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px]"
                                />
                            </div>
                        </div>
                        <div className="flex gap-[20px]">
                            <Button variant="custom" onClick={() => setShowChangePassword(false)}>
                                {'CANCEL'}
                            </Button>
                            <Button onClick={savePassword}>{'I AGREE'}</Button>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-screen h-dvh flex flex-col items-center text-center justify-center select-none pt-[60px] sm:pt-0">
                <div className='flex flex-col sm:max-w-fit sm:px-[32px] sm:max-h-fit grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                    <div className="flex flex-col max-w-[311px] mx-auto sm:py-[30px] pt-[30px] pb-[50px] gap-[23px]">
                        <h2 className="text-[32px] font-bold">{"Edit Profile"}</h2>
                        <div className='flex flex-col gap-[26px]'>

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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px] text-[#F90]"
                                    placeholder={"Your Child's Nickname"}
                                />
                            </div>
                            {/* Your Email */}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Your Email"
                                    className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px] text-[#F90]"
                                />
                            </div>
                            {/* Voice type */}
                            <ToggleSwitch
                                checked={gender === 'FEMALE'}
                                onChange={(checked) => setGender(checked ? 'FEMALE' : 'MALE')}
                            />
                        </div>
                        {/* Age */}
                        <AgeSelector
                            min={4}
                            max={8}
                            defaultValue={children?.[0]?.age}
                            onChange={(value) => setAge(value)}
                        />
                        <div className='flex flex-col gap-[20px] w-[311px]'>
                            <Button variant="custom" onClick={handleChangePassword}>
                                {"CHANGE PASSWORD"}
                            </Button>
                            <div className='flex gap-[20px]'>
                                <Button variant="custom" onClick={() => router.back()}>
                                    {"CANCEL"}
                                </Button>
                                <Button onClick={handleSave}>
                                    {"SAVE"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
